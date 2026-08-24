import os
import numpy as np
from PIL import Image, ImageFilter

FIXTURE_DIR = os.path.join(os.path.dirname(__file__), "fixtures", "image-quality")
os.makedirs(FIXTURE_DIR, exist_ok=True)

def generate_fixtures():
    # Base pattern
    width, height = 300, 300
    x = np.linspace(0, 255, width)
    y = np.linspace(0, 255, height)
    X, Y = np.meshgrid(x, y)
    base_image = (X + Y) / 2
    # Add strong high-frequency noise
    noise = np.random.randint(0, 255, (height, width))
    base_image = (base_image * 0.5 + noise * 0.5).astype(np.uint8)
    
    img = Image.fromarray(base_image).convert("RGB")
    
    img.save(os.path.join(FIXTURE_DIR, "01_clear_valid.jpg"))
    
    dark = (base_image * 0.1).astype(np.uint8)
    Image.fromarray(dark).convert("RGB").save(os.path.join(FIXTURE_DIR, "02_dark.jpg"))
    
    ext_dark = (base_image * 0.02).astype(np.uint8)
    Image.fromarray(ext_dark).convert("RGB").save(os.path.join(FIXTURE_DIR, "03_extremely_dark.jpg"))
    
    bright = np.clip(base_image * 2.0 + 100, 0, 255).astype(np.uint8)
    Image.fromarray(bright).convert("RGB").save(os.path.join(FIXTURE_DIR, "04_bright.jpg"))
    
    over = np.clip(base_image * 5.0 + 200, 0, 255).astype(np.uint8)
    Image.fromarray(over).convert("RGB").save(os.path.join(FIXTURE_DIR, "05_overexposed.jpg"))
    
    blurry = img.filter(ImageFilter.GaussianBlur(radius=15))
    blurry.save(os.path.join(FIXTURE_DIR, "06_blurry.jpg"))
    
    low_contrast = (base_image * 0.1 + 120).astype(np.uint8)
    Image.fromarray(low_contrast).convert("RGB").save(os.path.join(FIXTURE_DIR, "07_low_contrast.jpg"))
    
    low_res = np.random.randint(0, 255, (50, 50)).astype(np.uint8)
    Image.fromarray(low_res).convert("RGB").save(os.path.join(FIXTURE_DIR, "08_low_resolution.jpg"))
    
    corrupted_path = os.path.join(FIXTURE_DIR, "09_corrupted.jpg")
    with open(corrupted_path, "wb") as f:
        f.write(b"this is not a valid image file, just some random text to break the parser")
        
    img.save(os.path.join(FIXTURE_DIR, "10_valid_high_quality.jpg"))
    
    print(f"Generated 10 synthetic test fixtures in {FIXTURE_DIR}")

if __name__ == "__main__":
    generate_fixtures()
