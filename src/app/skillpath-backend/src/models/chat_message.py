from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, func
from src.db.database import Base


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    mentor_id = Column(Integer, nullable=False)
    from_who = Column(String(20), nullable=False)  # "me" | "mentor" | "general" | "user"
    text = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    channel_type = Column(String(20), default="mentor", index=True)  # "mentor" | "general" | "direct"
    room_id = Column(String(255), nullable=True, index=True)  # general -> "general", direct -> "dm_{min}_{max}"
