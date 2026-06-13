from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from src.models.quiz_result import QuizResult
from src.models.mentor_booking import MentorBooking
from src.models.roadmap_progress import RoadmapProgress
from src.models.lesson_progress import LessonProgress


async def get_profile_stats(user_id: int, db: AsyncSession) -> dict:
    """Возвращает агрегированную статистику профиля."""
    # Quiz stats
    quiz_result = await db.execute(
        select(func.count(QuizResult.id)).where(QuizResult.user_id == user_id)
    )
    total_quizzes = quiz_result.scalar() or 0

    # Booking stats
    booking_count = await db.execute(
        select(func.count(MentorBooking.id)).where(MentorBooking.user_id == user_id)
    )
    total_bookings = booking_count.scalar() or 0

    active_booking_count = await db.execute(
        select(func.count(MentorBooking.id)).where(
            MentorBooking.user_id == user_id,
            MentorBooking.status.in_(["pending", "confirmed"]),
        )
    )
    active_bookings = active_booking_count.scalar() or 0

    # Roadmap progress
    roadmap_count = await db.execute(
        select(func.count(RoadmapProgress.id)).where(RoadmapProgress.user_id == user_id)
    )
    total_roadmap_skills = roadmap_count.scalar() or 0

    # Lesson progress
    lesson_count = await db.execute(
        select(func.count(LessonProgress.id)).where(LessonProgress.user_id == user_id)
    )
    total_lessons = lesson_count.scalar() or 0

    # Latest quiz for top role and match
    latest_quiz_result = await db.execute(
        select(QuizResult)
        .where(QuizResult.user_id == user_id)
        .order_by(QuizResult.created_at.desc())
        .limit(1)
    )
    latest_quiz = latest_quiz_result.scalar_one_or_none()

    top_role = latest_quiz.top_role if latest_quiz else None
    best_match = None
    if latest_quiz and latest_quiz.scores:
        values = [v for v in latest_quiz.scores.values() if isinstance(v, (int, float))]
        if values:
            best_match = round((max(values) / 15) * 100)

    # Recent activity
    recent_activity = []

    recent_quizzes = await db.execute(
        select(QuizResult)
        .where(QuizResult.user_id == user_id)
        .order_by(QuizResult.created_at.desc())
        .limit(5)
    )
    for q in recent_quizzes.scalars().all():
        pct = None
        if q.scores:
            values = [v for v in q.scores.values() if isinstance(v, (int, float))]
            if values:
                pct = round((max(values) / 15) * 100)
        recent_activity.append({
            "type": "quiz",
            "title": "Quiz completed",
            "subtitle": f"{q.top_role}" + (f" • {pct}% match" if pct else ""),
            "date": q.created_at,
        })

    recent_bookings = await db.execute(
        select(MentorBooking)
        .where(MentorBooking.user_id == user_id)
        .order_by(MentorBooking.created_at.desc())
        .limit(5)
    )
    for b in recent_bookings.scalars().all():
        recent_activity.append({
            "type": "booking",
            "title": f"Mentor session",
            "subtitle": f"Mentor #{b.mentor_id} • {b.date} {b.time}",
            "date": b.created_at,
        })

    recent_activity.sort(key=lambda x: x["date"], reverse=True)
    recent_activity = recent_activity[:10]

    return {
        "total_quizzes": total_quizzes,
        "total_bookings": total_bookings,
        "active_bookings": active_bookings,
        "total_roadmap_skills_completed": total_roadmap_skills,
        "total_lessons_completed": total_lessons,
        "top_role": top_role,
        "best_match": best_match,
        "recent_activity": recent_activity,
    }
