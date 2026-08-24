import httpx
import math
import os
import logging
import time

logger = logging.getLogger(__name__)

# Configurable endpoints with a default
OVERPASS_ENDPOINTS = [
    os.getenv("OVERPASS_API_URL", "https://overpass-api.de/api/interpreter"),
    "https://overpass.kumi.systems/api/interpreter", # Fallback
]

# Simple in-memory cache
# Key: f"{round(lat, 4)}_{round(lng, 4)}"
# Value: {"timestamp": float, "data": dict}
CACHE_TTL = 900 # 15 minutes
cache = {}

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat/2) * math.sin(dLat/2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon/2) * math.sin(dLon/2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c * 1000  # Return in meters

async def execute_overpass_query(lat: float, lng: float, radius: int):
    query = f"""
    [out:json][timeout:60];
    (
      node["healthcare"="dermatology"](around:{radius},{lat},{lng});
      way["healthcare"="dermatology"](around:{radius},{lat},{lng});
      relation["healthcare"="dermatology"](around:{radius},{lat},{lng});

      node["speciality"="dermatology"](around:{radius},{lat},{lng});
      way["speciality"="dermatology"](around:{radius},{lat},{lng});
      relation["speciality"="dermatology"](around:{radius},{lat},{lng});
      
      node["healthcare"="hospital"](around:{radius},{lat},{lng});
      way["healthcare"="hospital"](around:{radius},{lat},{lng});
      
      node["healthcare"="clinic"](around:{radius},{lat},{lng});
      way["healthcare"="clinic"](around:{radius},{lat},{lng});
      
      node["healthcare"="doctor"](around:{radius},{lat},{lng});
      way["healthcare"="doctor"](around:{radius},{lat},{lng});

      node["amenity"="hospital"](around:{radius},{lat},{lng});
      way["amenity"="hospital"](around:{radius},{lat},{lng});
      
      node["amenity"="clinic"](around:{radius},{lat},{lng});
      way["amenity"="clinic"](around:{radius},{lat},{lng});
      
      node["amenity"="doctors"](around:{radius},{lat},{lng});
      way["amenity"="doctors"](around:{radius},{lat},{lng});
    );
    out center tags;
    """

    data = None
    headers = {
        "User-Agent": "DermoraSense/1.0 (Contact: admin@dermorasense.com) - Health App"
    }
    
    async with httpx.AsyncClient(timeout=65.0, headers=headers) as client:
        for endpoint in OVERPASS_ENDPOINTS:
            try:
                logger.info(f"[OVERPASS] Requesting {endpoint} for radius {radius}m")
                response = await client.post(endpoint, data={"data": query})
                response.raise_for_status()
                data = response.json()
                logger.info(f"[OVERPASS] Success from {endpoint}. Elements count: {len(data.get('elements', []))}")
                break # Success, break fallback loop
            except Exception as e:
                logger.warning(f"[OVERPASS] API error at {endpoint}: {e}")
                continue
                
    return data

def parse_osm_results(data, lat, lng):
    if not data or "elements" not in data:
        return []

    results = []
    seen_ids = set()

    for element in data["elements"]:
        elem_id = f"{element['type']}-{element['id']}"
        if elem_id in seen_ids:
            continue
        seen_ids.add(elem_id)

        tags = element.get("tags", {})
        
        name = tags.get("name")
        if not name:
            # Fallback to official_name, operator, or default to generic name instead of discarding
            name = tags.get("official_name", tags.get("operator", "Healthcare Facility"))
            
        # Coordinates handling
        el_lat = element.get("lat") or element.get("center", {}).get("lat")
        el_lon = element.get("lon") or element.get("center", {}).get("lon")
        
        if el_lat is None or el_lon is None:
            continue
            
        distance_meters = haversine(lat, lng, float(el_lat), float(el_lon))

        # Check specialization priority
        is_derma = False
        if tags.get("healthcare") == "dermatology" or tags.get("speciality") == "dermatology":
            is_derma = True
        elif any(keyword in name.lower() for keyword in ["derma", "skin specialist", "skin clinic", "dermatologist"]):
            is_derma = True
            
        speciality = tags.get("speciality", tags.get("healthcare", tags.get("amenity", "Medical Facility")))
        if not is_derma:
            speciality = f"{speciality.title()} - Dermatology specialty not specified"
        else:
            speciality = "Dermatologist / Skin Specialist"

        address_parts = []
        if tags.get("addr:housenumber"): address_parts.append(tags["addr:housenumber"])
        if tags.get("addr:street"): address_parts.append(tags["addr:street"])
        if tags.get("addr:city"): address_parts.append(tags["addr:city"])
        
        vicinity = ", ".join(address_parts) if address_parts else tags.get("address", "Address unavailable")

        results.append({
            "id": elem_id,
            "name": name,
            "latitude": float(el_lat),
            "longitude": float(el_lon),
            "address": vicinity,
            "phone": tags.get("phone", tags.get("contact:phone", None)),
            "website": tags.get("website", tags.get("contact:website", None)),
            "speciality": speciality,
            "distance": round(distance_meters),
            "is_dermatologist": is_derma,
            "source": "OpenStreetMap"
        })

    # Strict nearest-first sorting. 
    # Do not prioritize dermatologists if they are farther away.
    results.sort(key=lambda x: x["distance"])
    return results

async def fetch_nearby_dermatologists(lat: float, lng: float, min_results: int = 10, radius: int | None = None):
    cache_key = f"{round(lat, 4)}_{round(lng, 4)}_{min_results}_{radius or 'auto'}"
    current_time = time.time()
    
    # Check cache first
    if cache_key in cache:
        entry = cache[cache_key]
        if current_time - entry["timestamp"] < CACHE_TTL:
            return entry["data"]
            
    # If a specific radius is provided, use only that radius
    if radius is not None:
        radii_steps = [radius]
    else:
        # Progressive radii sequence capped at 500km
        radii_steps = [10000, 25000, 50000, 100000, 250000, 500000]
    
    final_results = []
    final_radius = radii_steps[0]
    
    for current_radius in radii_steps:
        logger.info(f"[OVERPASS] Attempting search with radius: {current_radius}m")
        final_radius = current_radius
        data = await execute_overpass_query(lat, lng, current_radius)
        
        if not data:
            logger.error(f"[OVERPASS] All endpoints failed for radius {current_radius}m")
            # If all servers fail, we break and return what we have
            break
            
        parsed_results = parse_osm_results(data, lat, lng)
        parsed_results = [r for r in parsed_results if r["distance"] <= 500000]
        
        # Always keep the latest results in case the next loop fails
        final_results = parsed_results[:50]
        
        if len(parsed_results) >= min_results and radius is None:
            logger.info(f"[OVERPASS] Target {min_results} results reached at radius {current_radius}m. Found {len(parsed_results)}")
            break
            
    # Prepare structured response
    response_data = {
        "success": True,
        "user_location": {
            "latitude": lat,
            "longitude": lng
        },
        "search_radius_km": round(final_radius / 1000),
        "count": len(final_results),
        "facilities": final_results
    }
    
    # Store in cache
    cache[cache_key] = {
        "timestamp": current_time,
        "data": response_data
    }
    
    return response_data
