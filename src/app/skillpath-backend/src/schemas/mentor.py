from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class BookingRequest(BaseModel):
    mentor_id: int
    date: str   # "2026-06-10"
    time: str   # "14:00"


class BookingResponse(BaseModel):
    id: int
    mentor_id: int
    date: str
    time: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class BookingStatusUpdate(BaseModel):
    status: str  # "confirmed", "cancelled"
