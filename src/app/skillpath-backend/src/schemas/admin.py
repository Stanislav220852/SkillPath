from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class AdminDashboardResponse(BaseModel):
    users_count: int
    mentors_count: int
    bookings_count: int
    active_bookings_count: int
    recent_users: list["AdminUserItem"]


class AdminUserItem(BaseModel):
    id: int
    email: str
    name: str
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class AdminUserUpdate(BaseModel):
    role: Optional[str] = Field(None, pattern=r"^(user|mentor|admin)$")
    is_active: Optional[bool] = None


class AdminPasswordReset(BaseModel):
    new_password: str = Field(..., min_length=8)


class AdminMentorCreate(BaseModel):
    name: str
    role_title: str
    company: Optional[str] = None
    avatar_url: Optional[str] = None
    category: str
    experience: Optional[str] = None
    rating: float = 5.0
    reviews_count: int = 0
    price_per_hour: int = 100
    skills: list[str] = []
    languages: list[str] = []
    bio: Optional[str] = None


class AdminMentorUpdate(BaseModel):
    name: Optional[str] = None
    role_title: Optional[str] = None
    company: Optional[str] = None
    avatar_url: Optional[str] = None
    category: Optional[str] = None
    experience: Optional[str] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    price_per_hour: Optional[int] = None
    skills: Optional[list[str]] = None
    languages: Optional[list[str]] = None
    bio: Optional[str] = None
    is_active: Optional[bool] = None


class AdminMentorResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    name: str
    role_title: str
    company: Optional[str] = None
    avatar_url: Optional[str] = None
    category: str
    experience: Optional[str] = None
    rating: float
    reviews_count: int
    price_per_hour: int
    skills: list
    languages: list
    bio: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class PlatformSettingsUpdate(BaseModel):
    key: str
    value: dict


class PlatformSettingsResponse(BaseModel):
    key: str
    value: dict
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AdminBookingResponse(BaseModel):
    id: int
    user_id: int
    mentor_id: int
    date: str
    time: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class AdminBookingUpdate(BaseModel):
    status: str = Field(..., pattern=r"^(pending|confirmed|cancelled)$")
