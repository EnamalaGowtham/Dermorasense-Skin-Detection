import asyncio
from app.services.overpass_service import fetch_nearby_dermatologists

async def main():
    lat = 13.0827
    lng = 80.2707
    
    print(f"Testing Overpass query for lat={lat}, lng={lng}, radius=None")
    
    data = await fetch_nearby_dermatologists(lat, lng, min_results=10)
    
    if not data:
        print("Failed to fetch data")
        return
        
    print(data)

if __name__ == "__main__":
    asyncio.run(main())
