import random
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, func, update, or_, and_
from src.models.chat_message import ChatMessage
from src.models.direct_conversation import DirectConversation
from src.models.user import User


AUTO_REPLIES_RU = [
    "Привет! Рад знакомству 👋 Расскажи, какой у тебя опыт?",
    "Отличный вопрос! Давай разберём подробнее. Какая у тебя конкретная цель?",
    "Понял тебя. Рекомендую начать с основ. Запишись на сессию — всё обсудим!",
    "Звучит как хороший план! На первой сессии мы составим роадмап под твои цели.",
    "Не переживай, все с чего-то начинали. Важно не откуда стартуешь, а куда идёшь 🚀",
    "Хороший подход. Главное — регулярность. Даже 30 минут в день дают результат.",
    "Я обычно отвечаю в течение пары часов. Можешь смело писать вопросы.",
    "Давай разберём это на ближайшей сессии — записывайся через кнопку выше 👆",
]

AUTO_REPLIES_EN = [
    "Hi! Nice to meet you 👋 Tell me about your experience?",
    "Great question! Let's break it down. What's your specific goal?",
    "Got it. I recommend starting with fundamentals. Book a session — we'll discuss!",
    "Sounds like a good plan! On our first session we'll build a roadmap for you.",
    "Don't worry, everyone starts somewhere. What matters is where you're heading 🚀",
    "Good approach. Consistency is key. Even 30 minutes a day shows results.",
    "I usually reply within a couple of hours. Feel free to ask anything.",
    "Let's dig into this on our next session — hit 'Book' above 👆",
]


def get_auto_reply(lang: str = "RU") -> str:
    replies = AUTO_REPLIES_RU if lang == "RU" else AUTO_REPLIES_EN
    return random.choice(replies)


def _make_dm_room_id(a: int, b: int) -> str:
    lo, hi = sorted([a, b])
    return f"dm_{lo}_{hi}"


async def save_message(user_id: int, mentor_id: int, text: str, from_who: str, db: AsyncSession) -> ChatMessage:
    msg = ChatMessage(
        user_id=user_id,
        mentor_id=mentor_id,
        from_who=from_who,
        text=text,
        channel_type="mentor",
    )
    db.add(msg)
    await db.flush()
    await db.refresh(msg)
    return msg


async def get_chat_history(user_id: int, mentor_id: int, db: AsyncSession) -> list[ChatMessage]:
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.user_id == user_id, ChatMessage.mentor_id == mentor_id, ChatMessage.channel_type == "mentor")
        .order_by(ChatMessage.created_at.asc())
        .limit(200)
    )
    return list(result.scalars().all())


async def clear_chat(user_id: int, mentor_id: int, db: AsyncSession) -> int:
    result = await db.execute(
        delete(ChatMessage).where(
            ChatMessage.user_id == user_id,
            ChatMessage.mentor_id == mentor_id,
            ChatMessage.channel_type == "mentor",
        )
    )
    return result.rowcount


async def get_mentor_inbox(mentor_id: int, db: AsyncSession) -> list[dict]:
    user_result = await db.execute(
        select(ChatMessage.user_id)
        .where(ChatMessage.mentor_id == mentor_id, ChatMessage.channel_type == "mentor")
        .group_by(ChatMessage.user_id)
    )
    user_ids = [row[0] for row in user_result.all()]

    inbox = []
    for uid in user_ids:
        total_result = await db.execute(
            select(func.count(ChatMessage.id))
            .where(ChatMessage.user_id == uid, ChatMessage.mentor_id == mentor_id, ChatMessage.channel_type == "mentor")
        )
        total = total_result.scalar() or 0

        last_msg_result = await db.execute(
            select(ChatMessage)
            .where(ChatMessage.user_id == uid, ChatMessage.mentor_id == mentor_id, ChatMessage.channel_type == "mentor")
            .order_by(ChatMessage.created_at.desc())
            .limit(1)
        )
        last_msg = last_msg_result.scalar_one_or_none()

        unread_result = await db.execute(
            select(func.count(ChatMessage.id))
            .where(
                ChatMessage.user_id == uid,
                ChatMessage.mentor_id == mentor_id,
                ChatMessage.from_who == "me",
                ChatMessage.is_read == False,
                ChatMessage.channel_type == "mentor",
            )
        )
        unread = unread_result.scalar() or 0

        inbox.append({
            "user_id": uid,
            "total_messages": total,
            "unread_count": unread,
            "last_message": {
                "text": last_msg.text,
                "from_who": last_msg.from_who,
                "created_at": last_msg.created_at.isoformat(),
            } if last_msg else None,
        })

    return inbox


async def mark_as_read(user_id: int, mentor_id: int, db: AsyncSession) -> int:
    result = await db.execute(
        update(ChatMessage)
        .where(
            ChatMessage.user_id == user_id,
            ChatMessage.mentor_id == mentor_id,
            ChatMessage.from_who == "me",
            ChatMessage.is_read == False,
            ChatMessage.channel_type == "mentor",
        )
        .values(is_read=True)
    )
    return result.rowcount


# ── General chat ──────────────────────────────────────────────


async def save_general_message(sender_id: int, text: str, db: AsyncSession) -> ChatMessage:
    msg = ChatMessage(
        user_id=sender_id,
        mentor_id=0,
        from_who="general",
        text=text,
        channel_type="general",
        room_id="general",
    )
    db.add(msg)
    await db.flush()
    await db.refresh(msg)
    return msg


async def get_general_history(db: AsyncSession, limit: int = 100) -> list[ChatMessage]:
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.channel_type == "general")
        .order_by(ChatMessage.created_at.asc())
        .limit(limit)
    )
    return list(result.scalars().all())


# ── Direct messages ───────────────────────────────────────────


async def get_or_create_conversation(user1_id: int, user2_id: int, db: AsyncSession) -> DirectConversation:
    lo, hi = sorted([user1_id, user2_id])
    result = await db.execute(
        select(DirectConversation).where(
            DirectConversation.user1_id == lo,
            DirectConversation.user2_id == hi,
        )
    )
    conv = result.scalar_one_or_none()
    if conv:
        return conv
    conv = DirectConversation(user1_id=lo, user2_id=hi)
    db.add(conv)
    await db.flush()
    await db.refresh(conv)
    return conv


async def save_direct_message(sender_id: int, receiver_id: int, text: str, db: AsyncSession) -> tuple[ChatMessage, DirectConversation]:
    room_id = _make_dm_room_id(sender_id, receiver_id)
    msg = ChatMessage(
        user_id=sender_id,
        mentor_id=0,
        from_who="user",
        text=text,
        channel_type="direct",
        room_id=room_id,
    )
    db.add(msg)

    conv = await get_or_create_conversation(sender_id, receiver_id, db)
    conv.last_message_at = func.now()

    await db.flush()
    await db.refresh(msg)
    return msg, conv


async def get_direct_history(user1_id: int, user2_id: int, db: AsyncSession, limit: int = 100) -> list[ChatMessage]:
    room_id = _make_dm_room_id(user1_id, user2_id)
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.channel_type == "direct", ChatMessage.room_id == room_id)
        .order_by(ChatMessage.created_at.asc())
        .limit(limit)
    )
    return list(result.scalars().all())


async def get_user_conversations(user_id: int, db: AsyncSession) -> list[dict]:
    result = await db.execute(
        select(DirectConversation)
        .where(or_(DirectConversation.user1_id == user_id, DirectConversation.user2_id == user_id))
        .order_by(DirectConversation.last_message_at.desc())
    )
    convs = list(result.scalars().all())

    out = []
    for conv in convs:
        other_id = conv.user2_id if conv.user1_id == user_id else conv.user1_id
        user_result = await db.execute(select(User).where(User.id == other_id))
        other_user = user_result.scalar_one_or_none()

        last_msg_result = await db.execute(
            select(ChatMessage)
            .where(ChatMessage.channel_type == "direct", ChatMessage.room_id == conv.id and False)
            .order_by(ChatMessage.created_at.desc())
            .limit(1)
        )

        last_msg_result2 = await db.execute(
            select(ChatMessage)
            .where(
                ChatMessage.channel_type == "direct",
                ChatMessage.room_id == _make_dm_room_id(conv.user1_id, conv.user2_id),
            )
            .order_by(ChatMessage.created_at.desc())
            .limit(1)
        )
        last_msg = last_msg_result2.scalar_one_or_none()

        unread_result = await db.execute(
            select(func.count(ChatMessage.id))
            .where(
                ChatMessage.channel_type == "direct",
                ChatMessage.room_id == _make_dm_room_id(conv.user1_id, conv.user2_id),
                ChatMessage.user_id == other_id,
                ChatMessage.is_read == False,
            )
        )
        unread = unread_result.scalar() or 0

        out.append({
            "id": conv.id,
            "user_id": other_id,
            "user_name": other_user.name if other_user else "Unknown",
            "user_avatar": other_user.avatar_url if other_user else None,
            "last_message": last_msg.text if last_msg else None,
            "last_message_at": (last_msg.created_at.isoformat() if last_msg else conv.last_message_at.isoformat() if conv.last_message_at else None),
            "unread_count": unread,
        })

    return out


async def mark_direct_read(sender_id: int, receiver_id: int, db: AsyncSession) -> int:
    room_id = _make_dm_room_id(sender_id, receiver_id)
    result = await db.execute(
        update(ChatMessage)
        .where(
            ChatMessage.channel_type == "direct",
            ChatMessage.room_id == room_id,
            ChatMessage.user_id == sender_id,
            ChatMessage.is_read == False,
        )
        .values(is_read=True)
    )
    return result.rowcount
