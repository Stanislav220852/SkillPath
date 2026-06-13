import uuid
from pathlib import Path
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.database import get_db
from src.api.dependencies import get_current_user
from src.models.user import User
from src.schemas.user import RegisterRequest, LoginRequest, TokenResponse, UserResponse, UserUpdate
from src.services.auth_service import register_user, login_user

router = APIRouter(prefix="/api/auth", tags=["Auth"])

UPLOAD_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/register", response_model=TokenResponse)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    user, token = await register_user(data, db)
    return TokenResponse(access_token=token, user=UserResponse.model_validate(user))


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    user, token = await login_user(data, db)
    return TokenResponse(access_token=token, user=UserResponse.model_validate(user))


@router.get("/me", response_model=UserResponse)
async def get_me(user: User = Depends(get_current_user)):
    return UserResponse.model_validate(user)


@router.patch("/me", response_model=UserResponse)
async def update_me(
    data: UserUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if data.name is not None:
        user.name = data.name
    if data.lang is not None:
        user.lang = data.lang
    if data.avatar_url is not None:
        user.avatar_url = data.avatar_url
    await db.flush()
    await db.refresh(user)
    return UserResponse.model_validate(user)


@router.post("/avatar", response_model=UserResponse)
async def upload_avatar(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    ext = file.filename.rsplit(".", 1)[-1] if "." in (file.filename or "") else "jpg"
    filename = f"avatar_{user.id}_{uuid.uuid4().hex[:8]}.{ext}"
    filepath = UPLOAD_DIR / filename

    content = await file.read()
    if len(content) > 2 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 2MB)")

    filepath.write_bytes(content)

    # Delete old avatar file if it exists
    if user.avatar_url and user.avatar_url.startswith("/uploads/"):
        old_file = Path(__file__).resolve().parent.parent.parent / user.avatar_url.lstrip("/")
        if old_file.exists():
            old_file.unlink(missing_ok=True)

    user.avatar_url = f"/uploads/{filename}"
    await db.flush()
    await db.refresh(user)
    return UserResponse.model_validate(user)
