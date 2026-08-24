from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    reset_token: str
    password: str

class VerifyResetOTP(BaseModel):
    email: EmailStr
    otp: str

class UpdateProfile(BaseModel):
    name: str
    email: EmailStr

class UpdatePassword(BaseModel):
    currentPassword: str
    newPassword: str

class VerifyOTP(BaseModel):
    email: EmailStr
    otp: str

class ResendOTP(BaseModel):
    email: EmailStr
