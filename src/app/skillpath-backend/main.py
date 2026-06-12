import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import settings
from src.api import auth, quiz, progress, mentors, chat

app = FastAPI(
    title="SkillPath API",
    description="Backend API for SkillPath IT Academy",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Роутеры
app.include_router(auth.router)
app.include_router(quiz.router)
app.include_router(progress.router)
app.include_router(mentors.router)
app.include_router(chat.router)


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
