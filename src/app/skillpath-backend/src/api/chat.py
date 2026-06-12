from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.schemas.chat import SendMessageRequest, MessageResponse, ChatHistoryResponse
from src.services.chat_service import save_message, get_chat_history, clear_chat, get_auto_reply

router = APIRouter(prefix="/api/chat", tags=["Chat"])


@router.get("/{mentor_id}", response_model=ChatHistoryResponse)
async def get_history(
    mentor_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    messages = await get_chat_history(user.id, mentor_id, db)
    return ChatHistoryResponse(
        mentor_id=mentor_id,
        messages=[MessageResponse.model_validate(m) for m in messages],
    )


@router.post("/{mentor_id}", response_model=dict)
async def send_message(
    mentor_id: int,
    data: SendMessageRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Сохраняем сообщение пользователя
    user_msg = await save_message(user.id, mentor_id, data.text, "me", db)

    # Авто-ответ ментора
    reply_text = get_auto_reply(user.lang or "RU")
    mentor_msg = await save_message(user.id, mentor_id, reply_text, "mentor", db)

    return {
        "user_message": MessageResponse.model_validate(user_msg),
        "mentor_reply": MessageResponse.model_validate(mentor_msg),
    }


@router.delete("/{mentor_id}")
async def delete_chat(
    mentor_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await clear_chat(user.id, mentor_id, db)
    return {"deleted": count, "mentor_id": mentor_id}
