# SkillPath — Деплой

## Архитектура

```
Frontend (Vercel)  ──>  Backend (Railway)  ──>  PostgreSQL (Railway)
     React/Vite          FastAPI/Uvicorn
```

---

## 1. Frontend → Vercel

### Настройка проекта
1. Импортируй репозиторий на [vercel.com/new](https://vercel.com/new)
2. Framework: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Install Command: `npm install`

### Переменные окружения

| Переменная | Значение |
|---|---|
| `VITE_API_URL` | `https://<твой-бэкенд>.up.railway.app` |

> Без `VITE_API_URL` фронт обращается к `http://localhost:8000`

### Домен (опционально)
- В настройках проекта → Domains → добавь `skillpath-academy.ru`
- Настрой DNS: CNAME → `cname.vercel-dns.com`

---

## 2. Backend → Railway

### Настройка проекта
1. Создай новый проект на [railway.app](https://railway.app)
2. Deploy from GitHub repo → выбери репозиторий
3. Railway автоматически определит Dockerfile в `src/app/skillpath-backend/`
4. Установи **Root Directory**: `src/app/skillpath-backend`

### Переменные окружения

| Переменная | Значение | Пример |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+asyncpg://user:pass@host:5432/db` |
| `JWT_SECRET` | Секретный ключ для JWT | Сгенерируй: `python -c "import secrets; print(secrets.token_urlsafe(64))"` |
| `JWT_ALGORITHM` | Алгоритм (по умолчанию HS256) | `HS256` |
| `JWT_EXPIRE_MINUTES` | Время жизни токена (в минутах) | `1440` (24 часа) |
| `CORS_ORIGINS` | Разрешённые origins через запятую | `https://skillpath-academy.ru,https://*.vercel.app` |
| `ENVIRONMENT` | Среда | `production` |
| `PORT` | Порт (Railway ставит автоматически) | `8000` |

### Создание БД
1. В проекте Railway → New → Database → PostgreSQL
2. Railway автоматически подставит `DATABASE_URL` в переменные бэкенда

### Домен (опционально)
- Railway → Settings → Networking → Generate Domain
- Или подключи свой: CNAME → `<service>.railway.app`

---

## 3. Backend → Docker (самостоятельный хостинг)

### Через docker-compose

```bash
cd src/app/skillpath-backend

# Создай .env файл
cat > .env <<EOF
DATABASE_URL=postgresql+asyncpg://skillpath:YOUR_PASSWORD@db:5432/skillpath_db
JWT_SECRET=YOUR_JWT_SECRET
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=1440
CORS_ORIGINS=https://skillpath-academy.ru,http://localhost:5173
ENVIRONMENT=production
POSTGRES_USER=skillpath
POSTGRES_PASSWORD=YOUR_PASSWORD
POSTGRES_DB=skillpath_db
TURNSTILE_SECRET_KEY=
TURNSTILE_ENABLED=false
EOF

# Запусти
docker-compose up -d --build
```

### Через Docker напрямую

```bash
cd src/app/skillpath-backend

docker build -t skillpath-backend .
docker run -d \
  -p 8000:8000 \
  -e DATABASE_URL="postgresql+asyncpg://user:pass@host:5432/db" \
  -e JWT_SECRET="your_secret" \
  -e CORS_ORIGINS="https://skillpath-academy.ru" \
  -e ENVIRONMENT="production" \
  --name skillpath \
  skillpath-backend
```

### Nginx reverse proxy (пример)

```nginx
server {
    listen 443 ssl http2;
    server_name skillpath-academy.ru;

    ssl_certificate /etc/letsencrypt/live/skillpath-academy.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/skillpath-academy.ru/privkey.pem;

    location / {
        root /var/www/skillpath/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /docs {
        proxy_pass http://127.0.0.1:8000;
    }

    location /openapi.json {
        proxy_pass http://127.0.0.1:8000;
    }
}
```

---

## 4. Порядок деплоя

1. **Бэкенд** —.deploy最先. Бэкенд должен быть доступен по URL
2. **Frontend** — настрой `VITE_API_URL` на URL бэкенда
3. **Проверь** — открой фронт, зарегистрируйся, проверь чат и квизы

---

## 5. Ссылки

| Сервис | URL |
|---|---|
| Backend API Docs | `https://<backend-url>/docs` |
| Backend Health | `https://<backend-url>/health` |
| Frontend | `https://<frontend-url>` |

---

## 6. Troubleshooting

**CORS ошибка** — добавь домен фронта в `CORS_ORIGINS` бэкенда

**502 Bad Gateway** — бэкенд не стартует, проверь логи Railway/Docker

**API не отвечает** — проверь `VITE_API_URL` на фронте, `DATABASE_URL` на бэке

**JWT ошибка** — убедись что `JWT_SECRET` одинаковый (если пересоздаёшь бэкенд)
