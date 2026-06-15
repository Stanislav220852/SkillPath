import sys
import traceback
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))

print("=== SkillPath Backend Starting ===", flush=True)

try:
    import logging
    from contextlib import asynccontextmanager
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from fastapi.staticfiles import StaticFiles
    from src.core.config import settings
    print(f"Config loaded. CORS: {settings.cors_origins_list}", flush=True)
    print(f"DB URL starts with: {settings.DATABASE_URL[:30]}...", flush=True)
except Exception as e:
    print(f"FATAL IMPORT ERROR: {e}", flush=True)
    traceback.print_exc()
    sys.exit(1)

logger = logging.getLogger("skillpath")

UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        from src.db.database import engine, async_session
        from src.models import Base, User, Mentor
        from src.core.security import hash_password

        for attempt in range(3):
            try:
                async with engine.begin() as conn:
                    await conn.run_sync(Base.metadata.create_all)
                print("Database tables created/verified", flush=True)
                break
            except Exception as e:
                print(f"DB connection attempt {attempt + 1}/3 failed: {e}", flush=True)
                if attempt == 2:
                    raise
                import asyncio
                await asyncio.sleep(2)

        async with async_session() as db:
            from sqlalchemy import select

            result = await db.execute(select(User).where(User.email == "admin@skillpath.com"))
            admin = result.scalar_one_or_none()
            if not admin:
                admin = User(
                    email="admin@skillpath.com",
                    password_hash=hash_password("admin123"),
                    name="Admin",
                    lang="EN",
                    role="admin",
                    is_active=True,
                )
                db.add(admin)
                await db.commit()
                print("Admin user created: admin@skillpath.com / admin123", flush=True)
            else:
                print("Admin user already exists", flush=True)

            result2 = await db.execute(select(Mentor).limit(1))
            existing_mentor = result2.scalar_one_or_none()
            if not existing_mentor:
                MENTORS_DATA = [
                    {"name": "Anna Sokolova", "role_title": "Senior Frontend Developer", "company": "Yandex", "category": "frontend", "experience": "8 years", "rating": 4.9, "reviews_count": 127, "price_per_hour": 150, "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS"], "languages": ["Russian", "English"], "bio": "Former Yandex frontend lead."},
                    {"name": "Dmitry Petrov", "role_title": "AI/ML Engineer", "company": "Tinkoff AI", "category": "ai", "experience": "6 years", "rating": 4.8, "reviews_count": 89, "price_per_hour": 175, "skills": ["Python", "PyTorch", "NLP", "MLOps"], "languages": ["Russian", "English"], "bio": "ML engineer at Tinkoff."},
                    {"name": "Elena Kuznetsova", "role_title": "Cybersecurity Analyst", "company": "Group-IB", "category": "cybersec", "experience": "7 years", "rating": 4.9, "reviews_count": 103, "price_per_hour": 160, "skills": ["Penetration Testing", "SIEM", "OSINT", "Forensics"], "languages": ["Russian", "English"], "bio": "Red team lead at Group-IB."},
                    {"name": "Sergei Volkov", "role_title": "Data Scientist", "company": "Sberbank", "category": "datascience", "experience": "5 years", "rating": 4.7, "reviews_count": 72, "price_per_hour": 140, "skills": ["Python", "SQL", "Tableau", "ML"], "languages": ["Russian"], "bio": "Lead data analyst at Sber."},
                    {"name": "Maria Popova", "role_title": "Backend Developer", "company": "Ozon", "category": "backend", "experience": "6 years", "rating": 4.8, "reviews_count": 95, "price_per_hour": 145, "skills": ["Node.js", "Python", "PostgreSQL", "Docker"], "languages": ["Russian", "English"], "bio": "Backend architect at Ozon."},
                    {"name": "Alexander Morozov", "role_title": "Mobile Developer", "company": "VK", "category": "mobile", "experience": "5 years", "rating": 4.7, "reviews_count": 68, "price_per_hour": 135, "skills": ["React Native", "Swift", "Kotlin", "Flutter"], "languages": ["Russian", "English"], "bio": "Mobile dev at VK."},
                    {"name": "Olga Smirnova", "role_title": "DevOps Engineer", "company": "Avito", "category": "devops", "experience": "7 years", "rating": 4.9, "reviews_count": 112, "price_per_hour": 165, "skills": ["Kubernetes", "Terraform", "AWS", "CI/CD"], "languages": ["Russian", "English"], "bio": "DevOps lead at Avito."},
                    {"name": "Nikolai Fedorov", "role_title": "Game Developer", "company": "Playrix", "category": "gamedev", "experience": "6 years", "rating": 4.8, "reviews_count": 81, "price_per_hour": 130, "skills": ["Unity", "C#", "3D Modeling", "Shaders"], "languages": ["Russian", "English"], "bio": "Senior game dev at Playrix."},
                    {"name": "Tatiana Lebedeva", "role_title": "Frontend Developer", "company": "Avito", "category": "frontend", "experience": "5 years", "rating": 4.6, "reviews_count": 56, "price_per_hour": 120, "skills": ["Vue.js", "TypeScript", "CSS", "Figma"], "languages": ["Russian"], "bio": "Frontend developer at Avito."},
                    {"name": "Pavel Novikov", "role_title": "AI Researcher", "company": "Sber AI", "category": "ai", "experience": "4 years", "rating": 4.7, "reviews_count": 64, "price_per_hour": 155, "skills": ["Python", "Transformers", "LLMs", "RAG"], "languages": ["Russian", "English"], "bio": "AI researcher at Sber."},
                ]
                for m in MENTORS_DATA:
                    db.add(Mentor(**m))
                await db.commit()
                print(f"Created {len(MENTORS_DATA)} mentors", flush=True)

    except Exception as e:
        print(f"FATAL: Database startup error: {e}", flush=True)
        traceback.print_exc()
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
from src.api import auth, quiz, progress, mentors, chat, profile, admin
app.include_router(auth.router)
app.include_router(quiz.router)
app.include_router(progress.router)
app.include_router(mentors.router)
app.include_router(chat.router)
app.include_router(profile.router)
app.include_router(admin.router)

print("=== All routers loaded. App ready. ===", flush=True)


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
