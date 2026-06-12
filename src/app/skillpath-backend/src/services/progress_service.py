from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from src.models.roadmap_progress import RoadmapProgress
from src.models.lesson_progress import LessonProgress


async def get_roadmap_progress(user_id: int, roadmap_key: str, db: AsyncSession) -> list[str]:
    """Возвращает список completed skill_id для роадмапа."""
    result = await db.execute(
        select(RoadmapProgress.skill_id)
        .where(RoadmapProgress.user_id == user_id, RoadmapProgress.roadmap_key == roadmap_key)
    )
    return [row[0] for row in result.all()]


async def toggle_skill(user_id: int, roadmap_key: str, skill_id: str, db: AsyncSession) -> bool:
    """Toggle скилла. Возвращает True если теперь completed, False если убрали."""
    result = await db.execute(
        select(RoadmapProgress).where(
            RoadmapProgress.user_id == user_id,
            RoadmapProgress.roadmap_key == roadmap_key,
            RoadmapProgress.skill_id == skill_id,
        )
    )
    existing = result.scalar_one_or_none()

    if existing:
        await db.delete(existing)
        return False
    else:
        progress = RoadmapProgress(user_id=user_id, roadmap_key=roadmap_key, skill_id=skill_id)
        db.add(progress)
        return True


async def reset_roadmap(user_id: int, roadmap_key: str, db: AsyncSession) -> int:
    """Сбрасывает прогресс роадмапа. Возвращает кол-во удалённых."""
    result = await db.execute(
        delete(RoadmapProgress).where(
            RoadmapProgress.user_id == user_id,
            RoadmapProgress.roadmap_key == roadmap_key,
        )
    )
    return result.rowcount


async def get_lesson_progress(user_id: int, skill_id: str, db: AsyncSession) -> list[str]:
    """Возвращает список completed lesson_id для скилла."""
    result = await db.execute(
        select(LessonProgress.lesson_id)
        .where(LessonProgress.user_id == user_id, LessonProgress.skill_id == skill_id)
    )
    return [row[0] for row in result.all()]


async def complete_lesson(user_id: int, skill_id: str, lesson_id: str, db: AsyncSession) -> bool:
    """Отмечает урок как пройденный. Возвращает True если новый, False если уже был."""
    result = await db.execute(
        select(LessonProgress).where(
            LessonProgress.user_id == user_id,
            LessonProgress.skill_id == skill_id,
            LessonProgress.lesson_id == lesson_id,
        )
    )
    if result.scalar_one_or_none():
        return False

    db.add(LessonProgress(user_id=user_id, skill_id=skill_id, lesson_id=lesson_id))
    return True
