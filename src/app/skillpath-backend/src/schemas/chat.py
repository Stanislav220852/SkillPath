from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional


class SendMessageRequest(BaseModel):
    text: str


class MessageResponse(BaseModel):
    id: int
    mentor_id: int
    from_who: str
    text: str
    created_at: datetime
    channel_type: str = "mentor"
    room_id: Optional[str] = None
    sender_name: Optional[str] = None
    sender_avatar: Optional[str] = None

    class Config:
        from_attributes = True


class ChatHistoryResponse(BaseModel):
    mentor_id: int
    messages: List[MessageResponse]


class GeneralMessageResponse(BaseModel):
    messages: List[MessageResponse]


class ConversationResponse(BaseModel):
    id: int
    user_id: int
    user_name: str
    user_avatar: Optional[str] = None
    last_message: Optional[str] = None
    last_message_at: Optional[datetime] = None
    unread_count: int = 0


class ConversationsResponse(BaseModel):
    conversations: List[ConversationResponse]


class UserSearchResult(BaseModel):
    id: int
    name: str
    avatar_url: Optional[str] = None
    role: str = "user"


class UserSearchResponse(BaseModel):
    users: List[UserSearchResult]
