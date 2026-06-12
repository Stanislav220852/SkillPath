from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.models.mentor_booking import MentorBooking
from src.schemas.mentor import BookingRequest


async def create_booking(user_id: int, data: BookingRequest, db: AsyncSession) -> MentorBooking:
    """Создаёт запись к ментору."""
    booking = MentorBooking(
        user_id=user_id,
        mentor_id=data.mentor_id,
        date=data.date,
        time=data.time,
        status="pending",
    )
    db.add(booking)
    await db.flush()
    await db.refresh(booking)
    return booking


async def get_user_bookings(user_id: int, db: AsyncSession) -> list[MentorBooking]:
    """Возвращает записи пользователя."""
    result = await db.execute(
        select(MentorBooking)
        .where(MentorBooking.user_id == user_id)
        .order_by(MentorBooking.created_at.desc())
        .limit(50)
    )
    return list(result.scalars().all())


async def update_booking_status(booking_id: int, user_id: int, new_status: str, db: AsyncSession) -> MentorBooking | None:
    """Обновляет статус записи."""
    result = await db.execute(
        select(MentorBooking).where(
            MentorBooking.id == booking_id,
            MentorBooking.user_id == user_id,
        )
    )
    booking = result.scalar_one_or_none()
    if booking:
        booking.status = new_status
        await db.flush()
        await db.refresh(booking)
    return booking
