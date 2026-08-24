import asyncio
from app.services.overpass_service import execute_overpass_query, parse_osm_results

async def main():
    # Use a known test coordinate in Chennai (e.g., Central Railway Station or similar dense area)
    lat = 13.0827
    lng = 80.2707
    radius = 1000 # 1 km
    
    print(f"Testing Overpass query for lat={lat}, lng={lng}, radius={radius}m")
    
    data = await execute_overpass_query(lat, lng, radius)
    if not data:
        print("Failed to fetch data")
        return
        
    elements = data.get("elements", [])
    print(f"Raw elements received: {len(elements)}")
    
    results = parse_osm_results(data, lat, lng)
    print(f"Parsed hospitals: {len(results)}")
    
    for i, res in enumerate(results[:10]):
        print(f"{i+1}. {res['name']} ({res['speciality']}) - {res['distance']}m away")

if __name__ == "__main__":
    asyncio.run(main())
