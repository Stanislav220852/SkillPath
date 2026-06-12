from pydantic import BaseModel
from datetime import datetime
from typing import List


class SendMessageRequest(BaseModel):
    text: str


class MessageResponse(BaseModel):
    id: int
    mentor_id: int
    from_who: str
    text: str
    created_at: datetime

    class Config:
        from_attributes = True


class ChatHistoryResponse(BaseModel):
    mentor_id: int
    messages: List[MessageResponse]
