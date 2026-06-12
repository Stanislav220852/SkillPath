from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint, func
from src.db.database import Base


class LessonProgress(Base):
    __tablename__ = "lesson_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_id = Column(String(50), nullable=False)   # "html-css", "python", etc.
    lesson_id = Column(String(100), nullable=False)  # "html-basics-1", etc.
    completed_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("user_id", "skill_id", "lesson_id", name="uq_user_skill_lesson"),
    )
