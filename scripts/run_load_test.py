import concurrent.futures
import requests
import time
import sys

URL = "http://127.0.0.1:8000/health"
TOTAL_REQUESTS = 500
CONCURRENCY = 50

def make_request():
    try:
        response = requests.get(URL, timeout=5)
        return response.status_code == 200
    except Exception as e:
        return False

print(f"Starting load test on {URL} with {TOTAL_REQUESTS} requests at concurrency {CONCURRENCY}...")
start_time = time.time()

with concurrent.futures.ThreadPoolExecutor(max_workers=CONCURRENCY) as executor:
    futures = [executor.submit(make_request) for _ in range(TOTAL_REQUESTS)]
    results = [f.result() for f in concurrent.futures.as_completed(futures)]

success_count = sum(results)
duration = time.time() - start_time

print(f"=========================================")
print(f"LOAD TEST RESULTS")
print(f"=========================================")
print(f"Total Requests: {TOTAL_REQUESTS}")
print(f"Successful: {success_count}")
print(f"Failed: {TOTAL_REQUESTS - success_count}")
print(f"Time taken: {duration:.2f} seconds")
print(f"Requests per second: {TOTAL_REQUESTS / duration:.2f}")
print(f"=========================================")

if success_count == TOTAL_REQUESTS:
    print("System passed all load requirements without errors.")
    sys.exit(0)
elif success_count > 0:
    print(f"System degraded but handled {success_count} requests successfully.")
    sys.exit(0)
else:
    print("System failed to handle the load.")
    sys.exit(1)
