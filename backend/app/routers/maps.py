from fastapi import APIRouter, HTTPException, status, Query
from app.services import overpass_service

router = APIRouter(prefix="/api", tags=["maps"])

@router.get("/maps/health")
def maps_health():
    return {
        "maps_configured": True, 
        "places_configured": True,
        "source": "openstreetmap",
        "overpass_api_reachable": True,
        "status": "OK"
    }

@router.get("/nearby-dermatologists")
async def nearby_dermatologists(
    lat: float = Query(...), 
    lng: float = Query(...), 
    limit: int = Query(10, le=50),
    radius: int = Query(None, description="Search radius in meters")
):
    import math
    if not math.isfinite(lat) or not math.isfinite(lng) or not (-90 <= lat <= 90) or not (-180 <= lng <= 180):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid latitude or longitude"
        )
        
    try:
        results = await overpass_service.fetch_nearby_dermatologists(lat, lng, min_results=limit, radius=radius)
        return results
            
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Unable to contact OpenStreetMap services. Error: {str(e)}"
        )
