from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.services.profile_service import get_profile_stats

router = APIRouter(prefix="/api/profile", tags=["Profile"])


@router.get("/stats")
async def profile_stats(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stats = await get_profile_stats(user.id, db)
    stats["member_since"] = user.created_at
    return stats
