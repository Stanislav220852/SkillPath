from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.schemas.mentor import BookingRequest, BookingResponse, BookingStatusUpdate
from src.services.mentor_service import create_booking, get_user_bookings, update_booking_status

router = APIRouter(prefix="/api/mentors", tags=["Mentors"])


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
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Booking not found")
    return BookingResponse.model_validate(booking)
