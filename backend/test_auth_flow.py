import httpx
import sqlite3
import os
import time

def run_test():
    print("Starting backend tests...")
    base_url = "http://localhost:8000/api/auth"
    
    # Clean up test user if exists
    conn = sqlite3.connect('dermorasense.db')
    c = conn.cursor()
    c.execute("DELETE FROM users WHERE email='test_mobile@gmail.com'")
    conn.commit()
    
    # 1. Register
    reg_res = httpx.post(f"{base_url}/register", json={
        "name": "Mobile Tester",
        "email": "test_mobile@gmail.com",
        "password": "Password123!"
    })
    print("Register:", reg_res.status_code, reg_res.json())
    
    # Manually verify email in DB
    c.execute("UPDATE users SET verified = 1 WHERE email='test_mobile@gmail.com'")
    conn.commit()
    conn.close()
    print("User verified.")
    
    # 2. Login
    login_res = httpx.post(f"{base_url}/login", json={
        "email": "test_mobile@gmail.com",
        "password": "Password123!"
    })
    print("Login status:", login_res.status_code)
    data = login_res.json()
    print("Login response keys:", data.keys())
    
    if "access_token" in data:
        print("SUCCESS: access_token found in response body!")
        token = data["access_token"]
    else:
        print("FAIL: access_token missing in response body.")
        return
        
    # 3. Authenticated request
    me_res = httpx.get(f"{base_url}/me", headers={"Authorization": f"Bearer {token}"})
    print("Get /me status:", me_res.status_code)
    
    # 4. Logout
    logout_res = httpx.post(f"{base_url}/logout", headers={"Authorization": f"Bearer {token}"})
    print("Logout status:", logout_res.status_code)
    
    print("All tests completed.")

if __name__ == "__main__":
    time.sleep(2) # Give server time to start
    run_test()
