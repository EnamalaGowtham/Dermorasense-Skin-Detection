import os
from dotenv import load_dotenv

# Load environment variables
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(BASE_DIR, ".env")
load_dotenv(env_path)

import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app import database
from app.routers import auth, profile, scans, maps, learning

# Initialize Database
database.init_db()

# Paths Config
STATIC_DIR = os.path.join(BASE_DIR, "static")
UPLOAD_DIR = os.path.join(STATIC_DIR, "uploads")
GALLERY_DIR = os.path.join(STATIC_DIR, "gallery")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(GALLERY_DIR, exist_ok=True)

app = FastAPI(title="DermoraSense API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174",
        "http://localhost:8081", "http://127.0.0.1:8081", # Expo default port
        "*" # In a real production setup, specify the actual domains
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Include Routers
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(scans.router)
app.include_router(maps.router)
app.include_router(learning.router)

@app.get("/")
def root():
    return {"message": "Welcome to DermoraSense API"}

@app.get("/health")
def health():
    return {"status": "ok"}
