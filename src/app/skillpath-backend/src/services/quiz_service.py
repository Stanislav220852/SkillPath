from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.models.quiz_result import QuizResult
from src.schemas.quiz import QuizSubmitRequest


async def save_quiz_result(user_id: int, data: QuizSubmitRequest, db: AsyncSession) -> QuizResult:
    """Сохраняет результат квиза."""
    result = QuizResult(
        user_id=user_id,
        quiz_type=data.quiz_type,
        top_role=data.top_role,
        scores=data.scores,
    )
    db.add(result)
    await db.flush()
    await db.refresh(result)
    return result


async def get_quiz_history(user_id: int, db: AsyncSession) -> list[QuizResult]:
    """Возвращает историю квизов пользователя."""
    result = await db.execute(
        select(QuizResult)
        .where(QuizResult.user_id == user_id)
        .order_by(QuizResult.created_at.desc())
        .limit(20)
    )
    return list(result.scalars().all())
