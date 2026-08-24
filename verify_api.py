import os
import sys
import json
import io
import time
# pyrefly: ignore [missing-import]
from PIL import Image

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

import database
import inference

def run_tests():
    print("--- STARTING DERMORASENSE BACKEND VERIFICATION SUITE ---")
    
    # 1. Initialize DB
    print("\n1. Initializing database and schema...")
    database.init_db()
    print("Database ready.")
    
    # 2. Register mock user
    print("\n2. Testing user registration...")
    email = "test_verify_user@gmail.com"
    name = "Test Verifier"
    password = "SuperSecurePassword123!"
    
    # Clear user if already exists to ensure fresh run
    conn = database.get_db_connection()
    conn.execute("DELETE FROM users WHERE email = ?", (email.lower(),))
    conn.commit()
    conn.close()
    
    user, err = database.create_user(name, email, password)
    if err:
        print(f"FAIL: Registration failed: {err}")
        return False
        
    print(f"SUCCESS: User registered. ID: {user['id']}, Verification Token: {user['verification_token']}")
    
    # 3. Simulate email verification by updating SQLite database directly
    print("\n3. Testing email verification layer...")
    verified = database.verify_email(user['verification_token'])
    if not verified:
        print("FAIL: Verification token not found or verification query failed")
        return False
    print("SUCCESS: User email marked as verified in SQLite database.")
    
    # 4. Verify password hashing
    print("\n4. Testing password verification layer...")
    db_user = database.get_user_by_email(email)
    valid_password = database.verify_password(password, db_user["password_hash"])
    if not valid_password:
        print("FAIL: Password mismatch against bcrypt hash")
        return False
    print("SUCCESS: Password verified successfully.")
    
    # 5. Test Inference and Grad-CAM (using actual h5 model or fallback)
    print("\n5. Testing ML Inference & Grad-CAM visual pipeline...")
    # Create a small dummy image in memory
    img = Image.new('RGB', (400, 400), color = (73, 109, 137))
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_bytes = img_byte_arr.getvalue()
    
    # Trigger local mock analysis
    results, err = inference.analyze_skin_image(img_bytes)
    if err:
        print(f"FAIL: Inference pipeline crashed: {err}")
        return False
        
    print(f"SUCCESS: Primary Class: {results['predictions'][0]['class']}")
    print(f"SUCCESS: Confidence Score: {results['predictions'][0]['confidence'] * 100:.2f}%")
    print(f"SUCCESS: Alternates: {[a['class'] for a in results['predictions'][1:4]]}")
    print(f"SUCCESS: Severity level: {results['severity']}")
    print(f"SUCCESS: Grad-CAM overlay generated. Bytes size: {len(results['gradcam_bytes'])} bytes.")
    
    # 6. Test scan DB storage commits
    print("\n6. Testing Scan creation in database...")
    scan_id = database.create_scan(
        user_id=user["id"],
        image_path="/static/uploads/test_run.png",
        prediction=results["predictions"][0]["class"],
        confidence=results["predictions"][0]["confidence"],
        alternates=results["predictions"][1:4],
        severity=results["severity"]
    )
    if not scan_id:
        print("FAIL: Failed to log scan into DB history table.")
        return False
    print(f"SUCCESS: Scan logged in DB. Scan Record ID: {scan_id}")
    
    # 7. Test PDF generator
    print("\n7. Simulating PDF Clinical Report Builder...")
    # Mocking FastAPI dependencies to run report generator
    import app
    
    # Generate pdf report file
    try:
        from fastapi import HTTPException
        # Override Base dirs to local path during script execution
        app.STATIC_DIR = os.path.join(os.path.dirname(__file__), "backend", "static")
        app.UPLOAD_DIR = os.path.join(app.STATIC_DIR, "uploads")
        os.makedirs(app.UPLOAD_DIR, exist_ok=True)
        
        # Write dummy images to ensure ReportLab can find them
        orig_img_path = os.path.join(app.STATIC_DIR, "uploads", f"scan_test_run.png")
        gcam_img_path = orig_img_path.replace(".png", "_gradcam.jpg")
        
        with open(orig_img_path, "wb") as f:
            f.write(img_bytes)
        with open(gcam_img_path, "wb") as f:
            f.write(results["gradcam_bytes"])
            
        # Temporarily mock the db get_scan to return our scan with correct paths
        mock_scan = database.get_scan(scan_id)
        mock_scan["image_path"] = "/static/uploads/scan_test_run.png"
        
        # Override database get_scan
        original_get_scan = database.get_scan
        database.get_scan = lambda sid: mock_scan
        
        response = app.download_pdf_report(scan_id, db_user)
        
        # Restore db get_scan
        database.get_scan = original_get_scan
        
        # Clean up files
        if os.path.exists(orig_img_path):
            os.remove(orig_img_path)
        if os.path.exists(gcam_img_path):
            os.remove(gcam_img_path)
            
        print(f"SUCCESS: PDF Report FileResponse generated. Target file: {response.path}")
        if os.path.exists(response.path):
            print(f"SUCCESS: PDF file size: {os.path.getsize(response.path)} bytes.")
            # Delete output pdf
            os.remove(response.path)
            
    except Exception as e:
        print(f"FAIL: PDF generation crashed. Details: {e}")
        return False
        
    print("\n--- ALL BACKEND TEST PASSES CLEARED (100% SUCCESS) ---")
    return True

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
