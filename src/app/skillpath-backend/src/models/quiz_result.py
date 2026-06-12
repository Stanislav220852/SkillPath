from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, func
from src.db.database import Base


class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    quiz_type = Column(String(20), nullable=False)  # "main" или "mini"
    top_role = Column(String(50), nullable=False)
    scores = Column(JSON, nullable=False)  # {"frontend": 3, "ai": 1, ...}
    created_at = Column(DateTime(timezone=True), server_default=func.now())
