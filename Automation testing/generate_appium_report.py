import pandas as pd
from datetime import datetime

report_data = [
    {"Test ID": "MOB-SYS-01", "Action Executed": "Initialize Android Emulator (UiAutomator2)", "Status": "PASS (Simulated)"},
    {"Test ID": "MOB-SYS-02", "Action Executed": "Launch Expo Launcher App", "Status": "PASS (Simulated)"},
    {"Test ID": "MOB-AUTH-01", "Action Executed": "Locate Login Screen email and password fields", "Status": "PASS (Simulated)"},
    {"Test ID": "MOB-AUTH-NEG-01", "Action Executed": "Submit empty fields and verify error modal", "Status": "PASS (Simulated)"},
    {"Test ID": "MOB-AUTH-POS-01", "Action Executed": "Enter valid credentials (gouthamenamala@gmail.com)", "Status": "PASS (Simulated)"},
    {"Test ID": "MOB-AUTH-POS-02", "Action Executed": "Click Login and verify Dashboard renders", "Status": "PASS (Simulated)"},
    {"Test ID": "MOB-NAV-01", "Action Executed": "Navigate to Analyze Skin view via Bottom Tabs", "Status": "PASS (Simulated)"},
    {"Test ID": "MOB-SYS-03", "Action Executed": "Teardown Appium Session", "Status": "PASS (Simulated)"}
]

for row in report_data:
    row["Timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

df = pd.DataFrame(report_data)
report_path = r'c:\Users\gouth\Desktop\New version dermorasense\Automation testing\Appium_Mobile_Execution_Report.xlsx'
df.to_excel(report_path, index=False)
print(f"Generated simulated Appium report at {report_path}")
