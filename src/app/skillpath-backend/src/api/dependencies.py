import time
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.db.database import get_db
from src.core.security import decode_access_token
from src.models.user import User

security = HTTPBearer()

# Rate limiting: IP -> {count, reset_time}
_rate_limits: dict[str, dict] = {}
RATE_LIMIT_WINDOW = 900  # 15 minutes
RATE_LIMIT_MAX_LOGIN = 5
RATE_LIMIT_MAX_ADMIN = 3
RATE_LIMIT_MAX_API = 100
RATE_LIMIT_API_WINDOW = 60  # 1 minute


def _get_client_ip(request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def check_rate_limit(ip: str, limit: int = RATE_LIMIT_MAX_LOGIN, window: int = RATE_LIMIT_WINDOW):
    now = time.time()
    entry = _rate_limits.get(ip)
    if entry and now < entry["reset_time"]:
        if entry["count"] >= limit:
            remaining = int(entry["reset_time"] - now)
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Too many attempts. Try again in {remaining}s",
            )
        entry["count"] += 1
    else:
        _rate_limits[ip] = {"count": 1, "reset_time": now + window}


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Извлекает текущего пользователя из JWT токена."""
    token = credentials.credentials
    user_id = decode_access_token(token)

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


async def require_admin(
    user: User = Depends(get_current_user),
) -> User:
    """Requires user to have admin role."""
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return user


async def require_mentor_or_admin(
    user: User = Depends(get_current_user),
) -> User:
    """Requires user to have mentor or admin role."""
    if user.role not in ("mentor", "admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Mentor or admin access required",
        )
    return user
