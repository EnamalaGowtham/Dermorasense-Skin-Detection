import os
import pytest
from unittest.mock import patch, MagicMock
from PIL import Image
import io

from app.ml.inference import validate_image_quality, analyze_skin_image, preprocess_image

FIXTURE_DIR = os.path.join(os.path.dirname(__file__), "fixtures", "image-quality")

def get_image_bytes(filename):
    path = os.path.join(FIXTURE_DIR, filename)
    with open(path, "rb") as f:
        return f.read()

def test_001_clear_valid():
    image_bytes = get_image_bytes("01_clear_valid.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is True
    assert msg == ""

def test_002_dark():
    image_bytes = get_image_bytes("02_dark.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is False
    assert "too dark" in msg.lower()

def test_003_extremely_dark():
    image_bytes = get_image_bytes("03_extremely_dark.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is False
    assert "too dark" in msg.lower()

def test_004_bright():
    image_bytes = get_image_bytes("04_bright.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is False
    assert "too bright" in msg.lower()

def test_005_overexposed():
    image_bytes = get_image_bytes("05_overexposed.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is False
    assert "too bright" in msg.lower()

def test_006_blurry():
    image_bytes = get_image_bytes("06_blurry.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is False
    assert "blurry" in msg.lower()

def test_007_low_contrast():
    image_bytes = get_image_bytes("07_low_contrast.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is False
    assert "clarity is too low" in msg.lower() or "too dark" in msg.lower() or "too bright" in msg.lower()

def test_008_low_resolution():
    image_bytes = get_image_bytes("08_low_resolution.jpg")
    _, _, original_size = preprocess_image(image_bytes)
    is_valid, msg = validate_image_quality(image_bytes, original_size)
    assert is_valid is False
    assert "resolution is too low" in msg.lower()

def test_009_corrupted_image():
    image_bytes = get_image_bytes("09_corrupted.jpg")
    # Preprocess should fail gracefully
    image_pil, img_array, original_size = preprocess_image(image_bytes)
    assert image_pil is None
    # analyze_skin_image should handle it without crashing
    res, err = analyze_skin_image(image_bytes)
    assert res is None
    assert "unable to read" in err.lower() or "couldn't verify" in err.lower()

@patch('app.ml.inference.run_mock_inference')
@patch('app.ml.inference.MODEL_LOADED', False)
def test_010_prediction_flow_gate(mock_inference):
    mock_inference.return_value = ([{"class": "Normal Skin", "confidence": 0.99}], [0.0]*24, b"fakebytes")
    
    # 1. Invalid image NEVER reaches prediction
    bad_bytes = get_image_bytes("02_dark.jpg")
    res, err = analyze_skin_image(bad_bytes)
    assert res is None
    assert "too dark" in err.lower()
    assert mock_inference.call_count == 0  # PREDICTION IS NOT CALLED
    
    # 2. Valid image reaches prediction
    good_bytes = get_image_bytes("01_clear_valid.jpg")
    res, err = analyze_skin_image(good_bytes)
    assert err is None
    assert res is not None
    assert mock_inference.call_count == 1  # PREDICTION IS CALLED

