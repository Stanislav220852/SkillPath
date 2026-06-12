from pydantic import BaseModel
from datetime import datetime
from typing import Dict


class QuizSubmitRequest(BaseModel):
    quiz_type: str  # "main" или "mini"
    top_role: str
    scores: Dict[str, int]  # {"frontend": 3, "ai": 1, ...}


class QuizResultResponse(BaseModel):
    id: int
    quiz_type: str
    top_role: str
    scores: Dict[str, int]
    created_at: datetime

    class Config:
        from_attributes = True
