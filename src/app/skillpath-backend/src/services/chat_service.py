import random
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from src.models.chat_message import ChatMessage


# Шаблонные авто-ответы менторов
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
    """Возвращает случайный авто-ответ ментора."""
    replies = AUTO_REPLIES_RU if lang == "RU" else AUTO_REPLIES_EN
    return random.choice(replies)


async def save_message(user_id: int, mentor_id: int, text: str, from_who: str, db: AsyncSession) -> ChatMessage:
    """Сохраняет сообщение в БД."""
    msg = ChatMessage(
        user_id=user_id,
        mentor_id=mentor_id,
        from_who=from_who,
        text=text,
    )
    db.add(msg)
    await db.flush()
    await db.refresh(msg)
    return msg


async def get_chat_history(user_id: int, mentor_id: int, db: AsyncSession) -> list[ChatMessage]:
    """Возвращает историю чата с ментором."""
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.user_id == user_id, ChatMessage.mentor_id == mentor_id)
        .order_by(ChatMessage.created_at.asc())
        .limit(200)
    )
    return list(result.scalars().all())


async def clear_chat(user_id: int, mentor_id: int, db: AsyncSession) -> int:
    """Очищает чат с ментором."""
    result = await db.execute(
        delete(ChatMessage).where(
            ChatMessage.user_id == user_id,
            ChatMessage.mentor_id == mentor_id,
        )
    )
    return result.rowcount
