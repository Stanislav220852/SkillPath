from sqlalchemy import Column, Integer, String, Boolean, Float, JSON, DateTime, ForeignKey, func
from src.db.database import Base


class Mentor(Base):
    __tablename__ = "mentors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    name = Column(String(100), nullable=False)
    role_title = Column(String(100), nullable=False)
    company = Column(String(100), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    category = Column(String(30), nullable=False)  # frontend/ai/cybersec/datascience/backend/mobile/devops/gamedev
    experience = Column(String(50), nullable=True)
    rating = Column(Float, default=5.0)
    reviews_count = Column(Integer, default=0)
    price_per_hour = Column(Integer, default=100)
    skills = Column(JSON, default=list)
    languages = Column(JSON, default=list)
    bio = Column(String(2000), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
