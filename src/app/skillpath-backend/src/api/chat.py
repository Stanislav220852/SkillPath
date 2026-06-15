from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.schemas.chat import (
    SendMessageRequest, MessageResponse, ChatHistoryResponse,
    GeneralMessageResponse, ConversationsResponse, ConversationResponse,
    UserSearchResponse, UserSearchResult,
)
from src.services.chat_service import (
    save_message, get_chat_history, clear_chat, get_auto_reply,
    get_mentor_inbox, mark_as_read,
    save_general_message, get_general_history,
    save_direct_message, get_direct_history, get_user_conversations,
    mark_direct_read, _make_dm_room_id,
)
from src.services.ws_manager import manager

router = APIRouter(prefix="/api/chat", tags=["Chat"])


# ── Mentor chat (existing) ────────────────────────────────────


@router.get("/mentor/inbox")
async def mentor_inbox(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if user.role not in ("mentor", "admin"):
        raise HTTPException(status_code=403, detail="Mentor access required")
    inbox = await get_mentor_inbox(user.id, db)
    return {"inbox": inbox}


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
    if user.role in ("mentor", "admin"):
        from_who = "mentor"
        user_id = mentor_id
    else:
        from_who = "me"
        user_id = user.id

    msg = await save_message(user_id, mentor_id, data.text, from_who, db)

    response = {"user_message": MessageResponse.model_validate(msg)}

    if from_who == "me":
        auto_reply = get_auto_reply(user.lang or "RU")
        mentor_msg = await save_message(user_id, mentor_id, auto_reply, "mentor", db)
        response["mentor_reply"] = MessageResponse.model_validate(mentor_msg)

        await manager.send_to_user(mentor_id, user_id, {
            "type": "new_message",
            "message": MessageResponse.model_validate(mentor_msg).model_dump(mode="json"),
        })
    else:
        await manager.send_to_user(mentor_id, user_id, {
            "type": "new_message",
            "message": MessageResponse.model_validate(msg).model_dump(mode="json"),
        })

    return response


@router.patch("/{mentor_id}/read")
async def mark_read(
    mentor_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await mark_as_read(user.id, mentor_id, db)
    return {"marked_read": count}


@router.delete("/{mentor_id}")
async def delete_chat(
    mentor_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await clear_chat(user.id, mentor_id, db)
    return {"deleted": count, "mentor_id": mentor_id}


# ── Mentor users (from users table) ───────────────────────────


@router.get("/mentors/list")
async def list_mentor_users(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.role == "mentor", User.is_active == True)
    )
    mentor_users = list(result.scalars().all())
    return {
        "mentors": [
            {
                "id": u.id,
                "name": u.name,
                "avatar_url": u.avatar_url,
                "role": u.role,
                "role_title": "Mentor",
            }
            for u in mentor_users
        ]
    }


# ── User search ───────────────────────────────────────────────


@router.get("/users/search", response_model=UserSearchResponse)
async def search_users(
    q: str = "",
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(User).where(User.is_active == True, User.id != user.id)
    if q.strip():
        query = query.where(User.name.ilike(f"%{q.strip()}%"))
    query = query.limit(20)
    result = await db.execute(query)
    users = list(result.scalars().all())
    return UserSearchResponse(
        users=[UserSearchResult(id=u.id, name=u.name, avatar_url=u.avatar_url, role=u.role) for u in users]
    )


# ── General chat ──────────────────────────────────────────────


@router.get("/general/history", response_model=GeneralMessageResponse)
async def general_history(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    messages = await get_general_history(db)
    enriched = []
    for m in messages:
        msg_resp = MessageResponse.model_validate(m)
        if m.user_id:
            sender = await db.execute(select(User).where(User.id == m.user_id))
            sender_user = sender.scalar_one_or_none()
            if sender_user:
                msg_resp.sender_name = sender_user.name
                msg_resp.sender_avatar = sender_user.avatar_url
        enriched.append(msg_resp)
    return GeneralMessageResponse(messages=enriched)


@router.post("/general", response_model=MessageResponse)
async def send_general_message(
    data: SendMessageRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    msg = await save_general_message(user.id, data.text, db)
    msg_resp = MessageResponse.model_validate(msg)
    msg_resp.sender_name = user.name
    msg_resp.sender_avatar = user.avatar_url

    await manager.broadcast_general({
        "type": "new_message",
        "message": msg_resp.model_dump(mode="json"),
    }, exclude_user_id=user.id)

    return msg_resp


# ── Direct messages ───────────────────────────────────────────


@router.get("/direct/conversations", response_model=ConversationsResponse)
async def direct_conversations(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    convs = await get_user_conversations(user.id, db)
    return ConversationsResponse(
        conversations=[ConversationResponse(**c) for c in convs]
    )


@router.get("/direct/{target_user_id}", response_model=GeneralMessageResponse)
async def direct_history(
    target_user_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    messages = await get_direct_history(user.id, target_user_id, db)
    enriched = []
    for m in messages:
        msg_resp = MessageResponse.model_validate(m)
        sender = await db.execute(select(User).where(User.id == m.user_id))
        sender_user = sender.scalar_one_or_none()
        if sender_user:
            msg_resp.sender_name = sender_user.name
            msg_resp.sender_avatar = sender_user.avatar_url
        enriched.append(msg_resp)
    return GeneralMessageResponse(messages=enriched)


@router.post("/direct/{target_user_id}", response_model=MessageResponse)
async def send_direct_message(
    target_user_id: int,
    data: SendMessageRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if target_user_id == user.id:
        raise HTTPException(status_code=400, detail="Cannot message yourself")

    target = await db.execute(select(User).where(User.id == target_user_id))
    if not target.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="User not found")

    msg, conv = await save_direct_message(user.id, target_user_id, data.text, db)
    msg_resp = MessageResponse.model_validate(msg)
    msg_resp.sender_name = user.name
    msg_resp.sender_avatar = user.avatar_url

    room_id = _make_dm_room_id(user.id, target_user_id)
    await manager.send_to_direct(room_id, {
        "type": "new_message",
        "message": msg_resp.model_dump(mode="json"),
    }, exclude_user_id=user.id)

    return msg_resp


@router.patch("/direct/{target_user_id}/read")
async def mark_direct_read_endpoint(
    target_user_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await mark_direct_read(user.id, target_user_id, db)
    return {"marked_read": count}


# ── WebSocket: mentor chat ────────────────────────────────────


@router.websocket("/ws/{mentor_id}")
async def websocket_chat(websocket: WebSocket, mentor_id: int):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=4001, reason="No token")
        return

    from src.core.security import decode_access_token
    from src.db.database import async_session

    user_id = decode_access_token(token)
    if user_id is None:
        await websocket.close(code=4001, reason="Invalid token")
        return

    async with async_session() as db:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            await websocket.close(code=4001, reason="User not found")
            return

    await manager.connect(websocket, mentor_id, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        manager.disconnect(websocket, mentor_id)


# ── WebSocket: general chat ───────────────────────────────────


@router.websocket("/ws/general")
async def websocket_general(websocket: WebSocket):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=4001, reason="No token")
        return

    from src.core.security import decode_access_token
    from src.db.database import async_session

    user_id = decode_access_token(token)
    if user_id is None:
        await websocket.close(code=4001, reason="Invalid token")
        return

    async with async_session() as db:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            await websocket.close(code=4001, reason="User not found")
            return

    await manager.connect_general(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        manager.disconnect_general(websocket)


# ── WebSocket: direct messages ────────────────────────────────


@router.websocket("/ws/direct/{target_user_id}")
async def websocket_direct(websocket: WebSocket, target_user_id: int):
    token = websocket.query_params.get("token")
    if not token:
        await websocket.close(code=4001, reason="No token")
        return

    from src.core.security import decode_access_token
    from src.db.database import async_session

    user_id = decode_access_token(token)
    if user_id is None:
        await websocket.close(code=4001, reason="Invalid token")
        return

    async with async_session() as db:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            await websocket.close(code=4001, reason="User not found")
            return

    room_id = _make_dm_room_id(user_id, target_user_id)
    await manager.connect_direct(websocket, room_id, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        manager.disconnect_direct(websocket, room_id)
