from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Dict, Any

from app import database
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/learning", tags=["learning"])

class QuizResult(BaseModel):
    difficulty: str
    score: int
    max_score: int

class ViewUpdate(BaseModel):
    view_type: str # 'disease' or 'glossary'
    item_id: str

@router.get("/progress")
def get_progress(current_user=Depends(get_current_user)):
    """Fetch user's learning progress and achievements."""
    progress = database.get_learning_progress(current_user["id"])
    return progress

@router.post("/quiz/submit")
def submit_quiz(result: QuizResult, current_user=Depends(get_current_user)):
    """Submit a quiz result to update progress and best score."""
    if result.max_score <= 0 or result.score < 0 or result.score > result.max_score:
        raise HTTPException(status_code=400, detail="Invalid score parameters")
        
    res = database.save_quiz_result(
        user_id=current_user["id"],
        difficulty=result.difficulty,
        score=result.score,
        max_score=result.max_score
    )
    if not res.get("success"):
        raise HTTPException(status_code=500, detail="Failed to save quiz result")
    return res

@router.post("/view")
def update_view(view: ViewUpdate, current_user=Depends(get_current_user)):
    """Mark a disease or glossary term as viewed."""
    if view.view_type not in ["disease", "glossary"]:
        raise HTTPException(status_code=400, detail="Invalid view_type")
        
    success = database.update_learning_view(current_user["id"], view.view_type, view.item_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to update view progress")
    return {"success": True}
