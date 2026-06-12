from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.schemas.quiz import QuizSubmitRequest, QuizResultResponse
from src.services.quiz_service import save_quiz_result, get_quiz_history

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])


@router.post("/submit", response_model=QuizResultResponse)
async def submit_quiz(
    data: QuizSubmitRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await save_quiz_result(user.id, data, db)
    return QuizResultResponse.model_validate(result)


@router.get("/history", response_model=List[QuizResultResponse])
async def quiz_history(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    results = await get_quiz_history(user.id, db)
    return [QuizResultResponse.model_validate(r) for r in results]
