import os
import jwt
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import HTTPException, status, Cookie
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app import database

JWT_SECRET = os.getenv("JWT_SECRET", "dermora_sense_ultra_secure_secret_key_2026")
JWT_ALGORITHM = "HS256"
SESSION_EXPIRY_MINUTES = 120

def create_access_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=SESSION_EXPIRY_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def get_current_user(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or not logged in"
        )
    try:
        payload = jwt.decode(access_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = int(payload.get("sub"))
        user = database.get_user_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        return user
    except (jwt.PyJWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session token"
        )
