from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.database import get_db
from src.api.dependencies import require_admin
from src.models.user import User
from src.schemas.admin import (
    AdminDashboardResponse, AdminUserItem, AdminUserUpdate, AdminPasswordReset,
    AdminMentorCreate, AdminMentorUpdate, AdminMentorResponse,
    PlatformSettingsUpdate, PlatformSettingsResponse,
    AdminBookingResponse, AdminBookingUpdate,
)
from src.services import admin_service

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/dashboard", response_model=AdminDashboardResponse)
async def dashboard(
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    stats = await admin_service.get_dashboard_stats(db)
    return AdminDashboardResponse(
        users_count=stats["users_count"],
        mentors_count=stats["mentors_count"],
        bookings_count=stats["bookings_count"],
        active_bookings_count=stats["active_bookings_count"],
        recent_users=[AdminUserItem.model_validate(u) for u in stats["recent_users"]],
    )


@router.get("/users")
async def list_users(
    search: str = Query("", alias="search"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await admin_service.list_users(db, search, page, per_page)
    return {
        "users": [AdminUserItem.model_validate(u) for u in result["users"]],
        "total": result["total"],
        "page": result["page"],
        "per_page": result["per_page"],
    }


@router.get("/users/{user_id}", response_model=AdminUserItem)
async def get_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    user = await admin_service.get_user(user_id, db)
    return AdminUserItem.model_validate(user)


@router.patch("/users/{user_id}", response_model=AdminUserItem)
async def update_user(
    user_id: int,
    data: AdminUserUpdate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    user = await admin_service.update_user(user_id, data.model_dump(exclude_unset=True), db)
    return AdminUserItem.model_validate(user)


@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await admin_service.delete_user(user_id, db)
    return {"detail": "User deactivated"}


@router.delete("/users/{user_id}/permanent")
async def permanent_delete_user(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await admin_service.hard_delete_user(user_id, db)
    return {"detail": "User permanently deleted"}


@router.post("/users/{user_id}/reset-password")
async def reset_password(
    user_id: int,
    data: AdminPasswordReset,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await admin_service.reset_password(user_id, data.new_password, db)
    return {"detail": "Password reset"}


@router.get("/users/{user_id}/stats")
async def user_stats(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await admin_service.get_user(user_id, db)
    return await admin_service.get_user_stats(user_id, db)


@router.get("/users/{user_id}/quiz-history")
async def user_quiz_history(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await admin_service.get_user(user_id, db)
    quizzes = await admin_service.get_user_quiz_history(user_id, db)
    return [{"id": q.id, "quiz_type": q.quiz_type, "top_role": q.top_role, "scores": q.scores, "created_at": q.created_at.isoformat()} for q in quizzes]


@router.get("/users/{user_id}/bookings")
async def user_bookings(
    user_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await admin_service.get_user(user_id, db)
    bookings = await admin_service.get_user_bookings(user_id, db)
    return [{"id": b.id, "mentor_id": b.mentor_id, "date": b.date, "time": b.time, "status": b.status, "created_at": b.created_at.isoformat()} for b in bookings]


# --- Mentor Management ---

@router.get("/mentors", response_model=list[AdminMentorResponse])
async def list_mentors(
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    mentors = await admin_service.list_mentors(db)
    return [AdminMentorResponse.model_validate(m) for m in mentors]


@router.post("/mentors", response_model=AdminMentorResponse)
async def create_mentor(
    data: AdminMentorCreate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    mentor = await admin_service.create_mentor(data.model_dump(), db)
    return AdminMentorResponse.model_validate(mentor)


@router.patch("/mentors/{mentor_id}", response_model=AdminMentorResponse)
async def update_mentor(
    mentor_id: int,
    data: AdminMentorUpdate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    mentor = await admin_service.update_mentor(mentor_id, data.model_dump(exclude_unset=True), db)
    return AdminMentorResponse.model_validate(mentor)


@router.delete("/mentors/{mentor_id}")
async def delete_mentor(
    mentor_id: int,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    await admin_service.delete_mentor(mentor_id, db)
    return {"detail": "Mentor deactivated"}


# --- Platform Settings ---

@router.get("/settings", response_model=list[PlatformSettingsResponse])
async def get_settings(
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    settings = await admin_service.get_settings(db)
    return [PlatformSettingsResponse.model_validate(s) for s in settings]


@router.patch("/settings", response_model=PlatformSettingsResponse)
async def update_setting(
    data: PlatformSettingsUpdate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    setting = await admin_service.update_settings(data.key, data.value, db)
    return PlatformSettingsResponse.model_validate(setting)


# --- Booking Management ---

@router.get("/bookings", response_model=list[AdminBookingResponse])
async def list_bookings(
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    bookings = await admin_service.list_all_bookings(db)
    return [AdminBookingResponse.model_validate(b) for b in bookings]


@router.patch("/bookings/{booking_id}", response_model=AdminBookingResponse)
async def update_booking(
    booking_id: int,
    data: AdminBookingUpdate,
    admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    booking = await admin_service.update_booking(booking_id, data.status, db)
    return AdminBookingResponse.model_validate(booking)
