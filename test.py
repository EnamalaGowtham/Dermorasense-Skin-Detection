import requests
query = """
[out:json][timeout:60];
(
  node["amenity"="hospital"](around:10000,13.02561,80.02122);
  way["amenity"="hospital"](around:10000,13.02561,80.02122);
);
out center tags;
"""
headers = {'User-Agent': 'DermoraSense/1.0 (Contact: admin@dermorasense.com) - Health App'}
r = requests.post('https://overpass-api.de/api/interpreter', data={'data': query}, headers=headers)
print(r.status_code)
if r.status_code == 200:
    print(len(r.json().get('elements', [])))
else:
    print(r.text)
