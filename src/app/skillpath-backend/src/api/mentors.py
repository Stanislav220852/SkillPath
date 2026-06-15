from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.models.mentor import Mentor
from src.schemas.mentor import BookingRequest, BookingResponse, BookingStatusUpdate
from src.services.mentor_service import create_booking, get_user_bookings, update_booking_status

router = APIRouter(prefix="/api/mentors", tags=["Mentors"])


@router.get("")
async def list_mentors(db: AsyncSession = Depends(get_db)):
    """Public endpoint: list active mentors from DB."""
    result = await db.execute(
        select(Mentor).where(Mentor.is_active == True).order_by(Mentor.rating.desc())
    )
    mentors = result.scalars().all()
    return [
        {
            "id": m.id,
            "name": m.name,
            "role_title": m.role_title,
            "company": m.company,
            "avatar_url": m.avatar_url,
            "category": m.category,
            "experience": m.experience,
            "rating": m.rating,
            "reviews_count": m.reviews_count,
            "price_per_hour": m.price_per_hour,
            "skills": m.skills or [],
            "languages": m.languages or [],
            "bio": m.bio,
        }
        for m in mentors
    ]


@router.post("/book", response_model=BookingResponse)
async def book_mentor(
    data: BookingRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    booking = await create_booking(user.id, data, db)
    return BookingResponse.model_validate(booking)


@router.get("/bookings", response_model=List[BookingResponse])
async def my_bookings(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    bookings = await get_user_bookings(user.id, db)
    return [BookingResponse.model_validate(b) for b in bookings]


@router.patch("/bookings/{booking_id}", response_model=BookingResponse)
async def update_booking(
    booking_id: int,
    data: BookingStatusUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    booking = await update_booking_status(booking_id, user.id, data.status, db)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return BookingResponse.model_validate(booking)
