from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, UniqueConstraint, func
from src.db.database import Base


class RoadmapProgress(Base):
    __tablename__ = "roadmap_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    roadmap_key = Column(String(50), nullable=False)  # "frontend", "ai", etc.
    skill_id = Column(String(50), nullable=False)      # "html-css", "react", etc.
    completed = Column(Boolean, default=True)
    completed_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("user_id", "roadmap_key", "skill_id", name="uq_user_roadmap_skill"),
    )
