"""Seed script: creates default admin user and 10 mentors in the database."""
import asyncio
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from src.db.database import async_session, engine
from src.models import Base, User, Mentor
from src.core.security import hash_password


MENTORS_DATA = [
    {"name": "Anna Sokolova", "role_title": "Senior Frontend Developer", "company": "Yandex", "category": "frontend", "experience": "8 years", "rating": 4.9, "reviews_count": 127, "price_per_hour": 150, "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS"], "languages": ["Russian", "English"], "bio": "Former Yandex frontend lead. Built production UIs for millions of users."},
    {"name": "Dmitry Petrov", "role_title": "AI/ML Engineer", "company": "Tinkoff AI", "category": "ai", "experience": "6 years", "rating": 4.8, "reviews_count": 89, "price_per_hour": 175, "skills": ["Python", "PyTorch", "NLP", "MLOps"], "languages": ["Russian", "English"], "bio": "ML engineer at Tinkoff. Published researcher in NLP."},
    {"name": "Elena Kuznetsova", "role_title": "Cybersecurity Analyst", "company": "Group-IB", "category": "cybersec", "experience": "7 years", "rating": 4.9, "reviews_count": 103, "price_per_hour": 160, "skills": ["Penetration Testing", "SIEM", "OSINT", "Forensics"], "languages": ["Russian", "English"], "bio": "Red team lead at Group-IB. OSCP certified."},
    {"name": "Sergei Volkov", "role_title": "Data Scientist", "company": "Sberbank", "category": "datascience", "experience": "5 years", "rating": 4.7, "reviews_count": 72, "price_per_hour": 140, "skills": ["Python", "SQL", "Tableau", "ML"], "languages": ["Russian"], "bio": "Lead data analyst at Sber. Kaggle Master."},
    {"name": "Maria Popova", "role_title": "Backend Developer", "company": "Ozon", "category": "backend", "experience": "6 years", "rating": 4.8, "reviews_count": 95, "price_per_hour": 145, "skills": ["Node.js", "Python", "PostgreSQL", "Docker"], "languages": ["Russian", "English"], "bio": "Backend architect at Ozon. Microservices enthusiast."},
    {"name": "Alexander Morozov", "role_title": "Mobile Developer", "company": "VK", "category": "mobile", "experience": "5 years", "rating": 4.7, "reviews_count": 68, "price_per_hour": 135, "skills": ["React Native", "Swift", "Kotlin", "Flutter"], "languages": ["Russian", "English"], "bio": "Mobile dev at VK. Shipped 3 apps with 1M+ downloads."},
    {"name": "Olga Smirnova", "role_title": "DevOps Engineer", "company": "Avito", "category": "devops", "experience": "7 years", "rating": 4.9, "reviews_count": 112, "price_per_hour": 165, "skills": ["Kubernetes", "Terraform", "AWS", "CI/CD"], "languages": ["Russian", "English"], "bio": "DevOps lead at Avito. AWS Solutions Architect certified."},
    {"name": "Nikolai Fedorov", "role_title": "Game Developer", "company": "Playrix", "category": "gamedev", "experience": "6 years", "rating": 4.8, "reviews_count": 81, "price_per_hour": 130, "skills": ["Unity", "C#", "3D Modeling", "Shaders"], "languages": ["Russian", "English"], "bio": "Senior game dev at Playrix. Worked on titles with 10M+ players."},
    {"name": "Tatiana Lebedeva", "role_title": "Frontend Developer", "company": "Avito", "category": "frontend", "experience": "5 years", "rating": 4.6, "reviews_count": 56, "price_per_hour": 120, "skills": ["Vue.js", "TypeScript", "CSS", "Figma"], "languages": ["Russian"], "bio": "Frontend developer at Avito. Passionate about design systems."},
    {"name": "Pavel Novikov", "role_title": "AI Researcher", "company": "Sber AI", "category": "ai", "experience": "4 years", "rating": 4.7, "reviews_count": 64, "price_per_hour": 155, "skills": ["Python", "Transformers", "LLMs", "RAG"], "languages": ["Russian", "English"], "bio": "AI researcher at Sber. Working on LLMs and RAG systems."},
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        from sqlalchemy import select
        # Create admin
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
            print("Admin user created: admin@skillpath.com / admin123")
        else:
            print("Admin user already exists")

        # Create mentors
        result = await db.execute(select(Mentor).limit(1))
        existing = result.scalar_one_or_none()
        if not existing:
            for m in MENTORS_DATA:
                mentor = Mentor(**m)
                db.add(mentor)
            print(f"Created {len(MENTORS_DATA)} mentors")
        else:
            print("Mentors already exist")

        await db.commit()
    print("Seed complete!")


if __name__ == "__main__":
    asyncio.run(seed())
