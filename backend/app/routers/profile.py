from fastapi import APIRouter, Depends, HTTPException, status, Response
import os

from app import database
from app.schemas.user import UpdateProfile, UpdatePassword
from app.services.auth_service import get_current_user
from app.routers.scans import UPLOAD_DIR # We will define this later

router = APIRouter(prefix="/api/profile", tags=["profile"])

@router.put("/update")
def update_profile_info(data: UpdateProfile, current_user=Depends(get_current_user)):
    email_lower = data.email.strip().lower()
    if not (email_lower.endswith("@gmail.com") or email_lower.endswith("@email.com")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address must end with @gmail.com or @email.com"
        )
    success, error = database.update_profile(current_user["id"], data.name, data.email)
    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=error)
    return {"message": "Profile updated successfully"}

@router.put("/password")
def update_profile_password(data: UpdatePassword, current_user=Depends(get_current_user)):
    if not database.verify_password(data.currentPassword, current_user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect current password")
        
    success = database.update_password(current_user["id"], data.newPassword)
    if not success:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update password")
    return {"message": "Password updated successfully"}

@router.delete("/delete")
def delete_account(current_user=Depends(get_current_user), response: Response = None):
    scans = database.get_user_scans(current_user["id"])
    for s in scans:
        try:
            orig_path = s["image_path"]
            if os.path.exists(orig_path):
                os.remove(orig_path)
            gcam_path = orig_path.replace(".png", "_gradcam.jpg")
            if os.path.exists(gcam_path):
                os.remove(gcam_path)
        except Exception:
            pass
            
    success = database.delete_user(current_user["id"])
    if not success:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete account")
        
    if response:
        response.delete_cookie(key="access_token")
    return {"message": "Account and all associated history deleted."}
