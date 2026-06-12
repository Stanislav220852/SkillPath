from pydantic import BaseModel
from typing import List
from datetime import datetime


class ToggleSkillRequest(BaseModel):
    roadmap_key: str
    skill_id: str


class RoadmapProgressResponse(BaseModel):
    roadmap_key: str
    completed_skills: List[str]
    total_completed: int


class LessonCompleteRequest(BaseModel):
    skill_id: str
    lesson_id: str


class LessonProgressResponse(BaseModel):
    skill_id: str
    completed_lessons: List[str]
    total_completed: int
