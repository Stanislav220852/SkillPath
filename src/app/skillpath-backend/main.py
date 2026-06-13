import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.core.config import settings

logger = logging.getLogger("skillpath")

UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        from src.db.database import engine
        from src.models import Base
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables created/verified")
    except Exception as e:
        logger.warning(f"Database startup error (app will still start): {e}")
    yield


app = FastAPI(
    title="SkillPath API",
    description="Backend API for SkillPath IT Academy",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Routers
from src.api import auth, quiz, progress, mentors, chat, profile
app.include_router(auth.router)
app.include_router(quiz.router)
app.include_router(progress.router)
app.include_router(mentors.router)
app.include_router(chat.router)
app.include_router(profile.router)


@app.get("/")
async def root():
    return {
        "name": "SkillPath API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
