from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from src.models.user import User
from src.core.security import hash_password, verify_password, create_access_token
from src.schemas.user import RegisterRequest, LoginRequest


async def register_user(data: RegisterRequest, db: AsyncSession) -> tuple[User, str]:
    """Регистрация нового пользователя. Возвращает (user, token)."""
    # Проверяем что email не занят
    result = await db.execute(select(User).where(User.email == data.email))
    existing = result.scalar_one_or_none()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    user = User(
        email=data.email,
        password_hash=hash_password(data.password),
        name=data.name,
        lang=data.lang,
    )
    db.add(user)
    await db.flush()  # получаем id
    await db.refresh(user)

    token = create_access_token(user.id)
    return user, token


async def login_user(data: LoginRequest, db: AsyncSession) -> tuple[User, str]:
    """Логин пользователя. Возвращает (user, token)."""
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(user.id)
    return user, token
