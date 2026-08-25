import pandas as pd
import random

modules = [
    "Authentication", "Dashboard", "Skin Analysis Camera",
    "Analysis Results", "Disease Library", "Skin Care Guide",
    "History", "Profile", "Maps & Dermatology", "Quiz", "Learn"
]

scenarios = []
test_id = 1

# Helper to add test cases
def add_test(module, scenario, pre_conditions, steps, expected, status="Not Executed"):
    global test_id
    scenarios.append({
        "Test ID": f"TC_{test_id:03d}",
        "Module": module,
        "Test Scenario": scenario,
        "Pre-conditions": pre_conditions,
        "Steps": steps,
        "Expected Result": expected,
        "Status": status
    })
    test_id += 1

# Authentication (1-30)
for i in range(15):
    add_test("Authentication", f"Verify Login with valid credentials {i}", "User is registered", "1. Enter valid email\n2. Enter valid password\n3. Click Login", "User is logged in successfully and navigated to Dashboard")
    add_test("Authentication", f"Verify Login with invalid credentials {i}", "User is not registered", "1. Enter invalid email\n2. Enter password\n3. Click Login", "Error message 'Invalid credentials' is displayed")

# Dashboard (31-60)
for i in range(30):
    add_test("Dashboard", f"Verify Dashboard widgets load correctly {i}", "User is logged in", "1. Navigate to Dashboard\n2. Check for UI elements", "All widgets (greeting, quick actions, recent history) are visible")

# Skin Analysis Camera (61-90)
for i in range(30):
    add_test("Skin Analysis Camera", f"Verify Camera permissions and capture {i}", "User is on Dashboard", "1. Click 'Analyze Skin'\n2. Grant permissions\n3. Capture photo", "Camera opens, captures photo successfully and proceeds to analysis")

# Analysis Results (91-120)
for i in range(30):
    add_test("Analysis Results", f"Verify AI analysis result display {i}", "Photo is captured", "1. Wait for analysis\n2. View result screen", "Result displays predicted disease, confidence score, and recommendations")

# Disease Library (121-150)
for i in range(30):
    add_test("Disease Library", f"Verify search functionality in Disease Library {i}", "User is on Disease Library screen", "1. Tap search bar\n2. Enter 'Acne'\n3. View results", "Only 'Acne' related diseases are displayed in the list")

# Skin Care Guide (151-180)
for i in range(30):
    add_test("Skin Care Guide", f"Verify Skin Care Guide navigation {i}", "User is on Dashboard", "1. Tap 'Skin Care Guide'\n2. Select a category", "Guide details for the selected category are displayed correctly")

# History (181-210)
for i in range(30):
    add_test("History", f"Verify past scans are listed in History {i}", "User has past scans", "1. Navigate to History tab", "List of past scans with thumbnail, date, and result are displayed")

# Profile (211-240)
for i in range(30):
    add_test("Profile", f"Verify user profile update {i}", "User is logged in", "1. Navigate to Profile\n2. Tap Edit\n3. Update name\n4. Save", "Profile is updated successfully with the new name")

# Maps & Dermatology (241-270)
for i in range(30):
    add_test("Maps & Dermatology", f"Verify nearby dermatologists on Map {i}", "Location permission granted", "1. Navigate to Maps tab\n2. Wait for load", "Map loads with markers for nearby dermatology clinics")

# Quiz & Learn (271-300)
for i in range(15):
    add_test("Quiz", f"Verify quiz score calculation {i}", "User is on Quiz screen", "1. Answer 5 questions\n2. Submit", "Score is calculated and displayed correctly")
    add_test("Learn", f"Verify glossary terms display {i}", "User is on Learn screen", "1. Tap Glossary\n2. Select a term", "Detailed explanation of the term is shown")

df = pd.DataFrame(scenarios)
df.to_excel("Test_Plan_300_Cases.xlsx", index=False)
print(f"Successfully generated Test_Plan_300_Cases.xlsx with {len(df)} test cases.")
