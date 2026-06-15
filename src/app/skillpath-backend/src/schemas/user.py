from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    lang: str = "RU"
    turnstile_token: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str
    turnstile_token: Optional[str] = None


class TwoFALoginRequest(BaseModel):
    temp_token: str
    code: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"
    requires_2fa: bool = False
    temp_token: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    avatar_url: Optional[str] = None
    lang: str
    role: str = "user"
    is_active: bool = True
    created_at: datetime

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    lang: Optional[str] = None
    avatar_url: Optional[str] = None
