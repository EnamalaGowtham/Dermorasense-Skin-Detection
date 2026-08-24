import asyncio
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from app.services import overpass_service

async def main():
    print("Fetching nearby dermatologists...")
    res = await overpass_service.fetch_nearby_dermatologists(13.02561, 80.02122)
    print("Response:", res)

asyncio.run(main())
