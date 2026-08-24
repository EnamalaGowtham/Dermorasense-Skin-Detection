from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel
import random
import string
from datetime import datetime, timedelta

from app import database
from app.schemas.user import UserRegister, UserLogin, ForgotPassword, ResetPassword, VerifyResetOTP, UpdateProfile, UpdatePassword, VerifyOTP, ResendOTP
from app.services.auth_service import create_access_token, get_current_user, SESSION_EXPIRY_MINUTES
from app.services.email_service import send_otp_email, send_password_reset_email
from fastapi.responses import RedirectResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register")
def register(user_data: UserRegister):
    email_lower = user_data.email.strip().lower()
    if not (email_lower.endswith("@gmail.com") or email_lower.endswith("@email.com")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address must end with @gmail.com or @email.com"
        )
    user, error = database.create_user(user_data.name, user_data.email, user_data.password)
    if error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    
    send_otp_email(user["email"], user["verification_token"])
    
    return {
        "message": "Registration successful. An OTP code has been sent to your email address.",
        "email": user["email"],
        "verification_token": user["verification_token"]
    }

@router.get("/verify-email")
def verify_email(token: str):
    success = database.verify_email(token)
    if success:
        return RedirectResponse(url="http://localhost:5173/login?verified=true")
    else:
        return RedirectResponse(url="http://localhost:5173/login?verified=false")

@router.post("/verify-otp")
def verify_otp(data: VerifyOTP):
    success = database.verify_email(data.otp)
    if success:
        return {"success": True, "message": "Email verified successfully."}
    raise HTTPException(status_code=400, detail="Invalid verification OTP.")

@router.post("/resend-otp")
def resend_otp(data: ResendOTP):
    user = database.get_user_by_email(data.email)
    if not user:
        raise HTTPException(status_code=404, detail="User email not found.")
        
    if user["verified"]:
        return {"success": True, "message": "Email is already verified."}
        
    otp = "".join(random.choices(string.digits, k=6))
    
    conn = database.get_db_connection()
    cursor = conn.cursor()
    expires_at = datetime.utcnow() + timedelta(minutes=15)
    cursor.execute("UPDATE users SET verification_token = ?, verification_token_expires = ? WHERE id = ?", (otp, expires_at, user["id"]))
    conn.commit()
    conn.close()
    
    send_otp_email(user["email"], otp)
    
    return {"success": True, "message": "A new OTP code has been sent to your email address."}

@router.post("/login")
def login(user_data: UserLogin, response: Response):
    email_lower = user_data.email.strip().lower()
    if not (email_lower.endswith("@gmail.com") or email_lower.endswith("@email.com")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address must end with @gmail.com or @email.com"
        )
    user = database.get_user_by_email(user_data.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password")
        
    if not database.verify_password(user_data.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password")
        
    if not user["verified"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Please verify your email address first.")
        
    token = create_access_token(user["id"])
    
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=SESSION_EXPIRY_MINUTES * 60,
        samesite="lax",
        secure=False
    )
    
    return {
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        },
        "access_token": token
    }

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}

@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return {
        "user": {
            "id": current_user["id"],
            "name": current_user["name"],
            "email": current_user["email"]
        }
    }

@router.post("/forgot-password")
def forgot_password(data: ForgotPassword):
    email_lower = data.email.strip().lower()
    if not (email_lower.endswith("@gmail.com") or email_lower.endswith("@email.com")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address must end with @gmail.com or @email.com"
        )
    otp, error = database.generate_reset_token(data.email)
    
    if error:
        if "Too many" in error:
            raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail=error)
        return {"message": "If the email exists, a verification code has been sent."}
        
    try:
        send_password_reset_email(data.email, otp)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        
    return {"message": "A 6-digit verification code has been sent to your email."}

@router.post("/verify-reset-otp")
def verify_reset_otp(data: VerifyResetOTP):
    reset_token, error = database.verify_reset_otp(data.email, data.otp)
    if reset_token:
        return {"success": True, "message": "OTP verified successfully.", "reset_token": reset_token}
    
    status_code = status.HTTP_400_BAD_REQUEST
    if error and "Too many" in error:
        status_code = status.HTTP_429_TOO_MANY_REQUESTS
    raise HTTPException(status_code=status_code, detail=error or "Invalid OTP.")

@router.post("/reset-password")
def reset_password(data: ResetPassword):
    success = database.reset_password(data.reset_token, data.password)
    if success:
        return {"message": "Password reset successful. You can now log in."}
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password reset failed. The link may have expired.")
