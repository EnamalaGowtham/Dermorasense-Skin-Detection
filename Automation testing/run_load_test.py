import time
import requests
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

# Target configuration
BASE_URL = "http://localhost:8000"
ENDPOINTS = [
    {"url": f"{BASE_URL}/", "method": "GET", "name": "Health Check"},
    {"url": f"{BASE_URL}/api/auth/login", "method": "POST", "name": "Login Endpoint (Mock)", "data": {"email": "test@test.com", "password": "pass"}}
]

# Load Configuration
TOTAL_REQUESTS = 200
CONCURRENCY = 20

results = []

def send_request(endpoint, req_id):
    start_time = time.time()
    status_code = None
    try:
        if endpoint["method"] == "GET":
            response = requests.get(endpoint["url"], timeout=5)
        else:
            response = requests.post(endpoint["url"], json=endpoint.get("data", {}), timeout=5)
        status_code = response.status_code
        error = None
    except Exception as e:
        error = str(e)

    latency_ms = round((time.time() - start_time) * 1000, 2)
    
    return {
        "Request ID": req_id,
        "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "Endpoint Name": endpoint["name"],
        "Method": endpoint["method"],
        "URL": endpoint["url"],
        "Status Code": status_code,
        "Latency (ms)": latency_ms,
        "Error": error,
        "Result": "PASS" if status_code in [200, 401, 422] else "FAIL" # 401/422 are expected for dummy auth
    }

print(f"Starting Load Test: {TOTAL_REQUESTS} total requests with {CONCURRENCY} concurrent threads...")

with ThreadPoolExecutor(max_workers=CONCURRENCY) as executor:
    futures = []
    req_id = 1
    for i in range(TOTAL_REQUESTS):
        # Alternate between endpoints
        endpoint = ENDPOINTS[i % len(ENDPOINTS)]
        futures.append(executor.submit(send_request, endpoint, req_id))
        req_id += 1

    for future in as_completed(futures):
        results.append(future.result())

# Generate Report
df = pd.DataFrame(results)
report_path = r'c:\Users\gouth\Desktop\New version dermorasense\Automation testing\Load_Test_Report.xlsx'
df.to_excel(report_path, index=False)

# Summary
pass_count = len([r for r in results if r["Result"] == "PASS"])
print(f"Load Test Complete.")
print(f"Total Requests: {TOTAL_REQUESTS}")
print(f"Successful Requests: {pass_count}")
print(f"Failed Requests: {TOTAL_REQUESTS - pass_count}")
print(f"Generated report at: {report_path}")
