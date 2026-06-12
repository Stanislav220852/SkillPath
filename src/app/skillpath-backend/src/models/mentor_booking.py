from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from src.db.database import Base


class MentorBooking(Base):
    __tablename__ = "mentor_bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    mentor_id = Column(Integer, nullable=False)
    date = Column(String(10), nullable=False)   # "2026-06-10"
    time = Column(String(5), nullable=False)    # "14:00"
    status = Column(String(20), default="pending")  # pending, confirmed, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
