import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.overpass_service import haversine

client = TestClient(app)

def test_haversine_formula():
    # Distance from London (51.5074, -0.1278) to Paris (48.8566, 2.3522)
    # Expected is approx 343 km
    dist = haversine(51.5074, -0.1278, 48.8566, 2.3522)
    assert 340000 < dist < 345000, f"Calculated distance {dist} is incorrect"

def test_valid_coordinates():
    # We should get a 200, but since Overpass might timeout during testing or be slow, 
    # we just check that it's NOT a 400 Bad Request.
    response = client.get("/api/nearby-dermatologists?lat=13.02488&lng=80.02233&limit=5")
    assert response.status_code in [200, 503], f"Unexpected status code: {response.status_code}"
    
    if response.status_code == 200:
        data = response.json()
        assert data["success"] is True
        assert "facilities" in data
        assert "search_radius_km" in data

def test_invalid_latitude():
    response = client.get("/api/nearby-dermatologists?lat=95.0&lng=80.02233")
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid latitude or longitude"

def test_invalid_longitude():
    response = client.get("/api/nearby-dermatologists?lat=13.0&lng=185.0")
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid latitude or longitude"

def test_missing_parameters():
    # FastAPI automatically throws 422 for missing query params
    response = client.get("/api/nearby-dermatologists")
    assert response.status_code == 422
