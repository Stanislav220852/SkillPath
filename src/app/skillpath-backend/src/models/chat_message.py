from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from src.db.database import Base


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    mentor_id = Column(Integer, nullable=False)
    from_who = Column(String(10), nullable=False)  # "me" или "mentor"
    text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
