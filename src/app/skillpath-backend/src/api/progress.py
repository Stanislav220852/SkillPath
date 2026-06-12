from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.schemas.progress import ToggleSkillRequest, RoadmapProgressResponse, LessonCompleteRequest, LessonProgressResponse
from src.services.progress_service import (
    get_roadmap_progress, toggle_skill, reset_roadmap,
    get_lesson_progress, complete_lesson,
)

router = APIRouter(prefix="/api/progress", tags=["Progress"])


@router.get("/roadmap/{roadmap_key}", response_model=RoadmapProgressResponse)
async def get_progress(
    roadmap_key: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    skills = await get_roadmap_progress(user.id, roadmap_key, db)
    return RoadmapProgressResponse(
        roadmap_key=roadmap_key,
        completed_skills=skills,
        total_completed=len(skills),
    )


@router.post("/roadmap/toggle")
async def toggle(
    data: ToggleSkillRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    completed = await toggle_skill(user.id, data.roadmap_key, data.skill_id, db)
    return {"completed": completed, "skill_id": data.skill_id}


@router.delete("/roadmap/{roadmap_key}/reset")
async def reset(
    roadmap_key: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await reset_roadmap(user.id, roadmap_key, db)
    return {"deleted": count, "roadmap_key": roadmap_key}


@router.get("/lessons/{skill_id}", response_model=LessonProgressResponse)
async def get_lessons(
    skill_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    lessons = await get_lesson_progress(user.id, skill_id, db)
    return LessonProgressResponse(
        skill_id=skill_id,
        completed_lessons=lessons,
        total_completed=len(lessons),
    )


@router.post("/lessons/complete")
async def lesson_complete(
    data: LessonCompleteRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    is_new = await complete_lesson(user.id, data.skill_id, data.lesson_id, db)
    return {"is_new": is_new, "skill_id": data.skill_id, "lesson_id": data.lesson_id}
