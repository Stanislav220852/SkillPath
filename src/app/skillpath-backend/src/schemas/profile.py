from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ProfileStatsResponse(BaseModel):
    total_quizzes: int
    total_bookings: int
    active_bookings: int
    total_roadmap_skills_completed: int
    total_lessons_completed: int
    top_role: Optional[str] = None
    best_match: Optional[int] = None
    member_since: datetime
    recent_activity: List["ActivityItem"]


class ActivityItem(BaseModel):
    type: str  # "quiz", "booking", "profile", "roadmap"
    title: str
    subtitle: str
    date: datetime
