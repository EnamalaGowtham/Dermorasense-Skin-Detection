@echo off
echo Starting DermoraSense Backend on all interfaces (0.0.0.0)
echo This allows the Android Emulator and physical devices to connect.
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
