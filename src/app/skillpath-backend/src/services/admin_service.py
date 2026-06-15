from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException, status
from src.models.user import User
from src.models.mentor import Mentor
from src.models.platform_settings import PlatformSettings
from src.models.mentor_booking import MentorBooking
from src.models.chat_message import ChatMessage
from src.core.security import hash_password


async def get_dashboard_stats(db: AsyncSession) -> dict:
    users_count = (await db.execute(select(func.count(User.id)))).scalar() or 0
    mentors_count = (await db.execute(select(func.count(Mentor.id)))).scalar() or 0
    bookings_count = (await db.execute(select(func.count(MentorBooking.id)))).scalar() or 0
    active_bookings = (await db.execute(
        select(func.count(MentorBooking.id)).where(MentorBooking.status == "pending")
    )).scalar() or 0

    result = await db.execute(
        select(User).order_by(User.created_at.desc()).limit(10)
    )
    recent_users = result.scalars().all()

    return {
        "users_count": users_count,
        "mentors_count": mentors_count,
        "bookings_count": bookings_count,
        "active_bookings_count": active_bookings,
        "recent_users": recent_users,
    }


async def list_users(db: AsyncSession, search: str = "", page: int = 1, per_page: int = 20):
    query = select(User).order_by(User.created_at.desc())
    if search:
        query = query.where(
            User.name.ilike(f"%{search}%") | User.email.ilike(f"%{search}%")
        )
    total = (await db.execute(select(func.count()).select_from(query.subquery()))).scalar() or 0
    result = await db.execute(query.offset((page - 1) * per_page).limit(per_page))
    return {"users": result.scalars().all(), "total": total, "page": page, "per_page": per_page}


async def get_user(user_id: int, db: AsyncSession) -> User:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


async def update_user(user_id: int, data: dict, db: AsyncSession) -> User:
    user = await get_user(user_id, db)
    if data.get("role") is not None:
        user.role = data["role"]
    if data.get("is_active") is not None:
        user.is_active = data["is_active"]
    await db.flush()
    await db.refresh(user)
    return user


async def delete_user(user_id: int, db: AsyncSession):
    user = await get_user(user_id, db)
    user.is_active = False
    await db.flush()


async def hard_delete_user(user_id: int, db: AsyncSession):
    from src.models.quiz_result import QuizResult
    from src.models.roadmap_progress import RoadmapProgress
    from src.models.lesson_progress import LessonProgress
    from src.models.chat_message import ChatMessage

    user = await get_user(user_id, db)
    await db.delete(user)
    await db.flush()


async def reset_password(user_id: int, new_password: str, db: AsyncSession):
    user = await get_user(user_id, db)
    user.password_hash = hash_password(new_password)
    await db.flush()


async def list_mentors(db: AsyncSession):
    result = await db.execute(select(Mentor).order_by(Mentor.created_at.desc()))
    return result.scalars().all()


async def create_mentor(data: dict, db: AsyncSession) -> Mentor:
    mentor = Mentor(**data)
    db.add(mentor)
    await db.flush()
    await db.refresh(mentor)
    return mentor


async def update_mentor(mentor_id: int, data: dict, db: AsyncSession) -> Mentor:
    result = await db.execute(select(Mentor).where(Mentor.id == mentor_id))
    mentor = result.scalar_one_or_none()
    if not mentor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mentor not found")
    for key, value in data.items():
        if value is not None:
            setattr(mentor, key, value)
    await db.flush()
    await db.refresh(mentor)
    return mentor


async def delete_mentor(mentor_id: int, db: AsyncSession):
    result = await db.execute(select(Mentor).where(Mentor.id == mentor_id))
    mentor = result.scalar_one_or_none()
    if not mentor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mentor not found")
    mentor.is_active = False
    await db.flush()


async def get_settings(db: AsyncSession) -> list[PlatformSettings]:
    result = await db.execute(select(PlatformSettings))
    return result.scalars().all()


async def update_settings(key: str, value: dict, db: AsyncSession) -> PlatformSettings:
    result = await db.execute(select(PlatformSettings).where(PlatformSettings.key == key))
    setting = result.scalar_one_or_none()
    if setting:
        setting.value = value
    else:
        setting = PlatformSettings(key=key, value=value)
        db.add(setting)
    await db.flush()
    await db.refresh(setting)
    return setting


async def get_user_stats(user_id: int, db: AsyncSession) -> dict:
    """Возвращает агрегированную статистику для любого пользователя (admin view)."""
    from src.models.quiz_result import QuizResult
    from src.models.roadmap_progress import RoadmapProgress
    from src.models.lesson_progress import LessonProgress

    total_quizzes = (await db.execute(
        select(func.count(QuizResult.id)).where(QuizResult.user_id == user_id)
    )).scalar() or 0

    total_bookings = (await db.execute(
        select(func.count(MentorBooking.id)).where(MentorBooking.user_id == user_id)
    )).scalar() or 0

    total_roadmap_skills = (await db.execute(
        select(func.count(RoadmapProgress.id)).where(RoadmapProgress.user_id == user_id)
    )).scalar() or 0

    total_lessons = (await db.execute(
        select(func.count(LessonProgress.id)).where(LessonProgress.user_id == user_id)
    )).scalar() or 0

    return {
        "total_quizzes": total_quizzes,
        "total_bookings": total_bookings,
        "total_roadmap_skills_completed": total_roadmap_skills,
        "total_lessons_completed": total_lessons,
    }


async def get_user_quiz_history(user_id: int, db: AsyncSession) -> list:
    """Возвращает историю квизов пользователя (admin view)."""
    from src.models.quiz_result import QuizResult
    result = await db.execute(
        select(QuizResult)
        .where(QuizResult.user_id == user_id)
        .order_by(QuizResult.created_at.desc())
        .limit(20)
    )
    return list(result.scalars().all())


async def get_user_bookings(user_id: int, db: AsyncSession) -> list:
    """Возвращает бронирования пользователя (admin view)."""
    result = await db.execute(
        select(MentorBooking)
        .where(MentorBooking.user_id == user_id)
        .order_by(MentorBooking.created_at.desc())
    )
    return list(result.scalars().all())


async def list_all_bookings(db: AsyncSession):
    result = await db.execute(select(MentorBooking).order_by(MentorBooking.created_at.desc()))
    return result.scalars().all()


async def update_booking(booking_id: int, new_status: str, db: AsyncSession):
    result = await db.execute(select(MentorBooking).where(MentorBooking.id == booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    booking.status = new_status
    await db.flush()
    return booking
