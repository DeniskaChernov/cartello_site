# Cartello — лендинг автоуслуг

React + Vite + Tailwind. Локально: `npm run dev`. Сборка: `npm run build`.

## Railway (важно)

**404 на главной** обычно значит, что поднят только **API (Deno)**, а не статика Vite.

Нужны **два сервиса** из одного репозитория:

1. **Сайт (фронт)**  
   - **Root Directory:** `/` (корень репо)  
   - **Builder:** Nixpacks (в корне есть `nixpacks.toml`, **не** `Dockerfile`)  
   - Build: `npm ci && npm run build`  
   - Start: `npm start`  
   - Переменные **до сборки** (для фронта): `VITE_LEAD_API_URL` = полный URL к API, например  
     `https://<ваш-api>.up.railway.app/api/send-telegram`

2. **API (бэкенд)**  
   - **Root Directory:** `server`  
   - **Dockerfile:** `server/Dockerfile`  
   - Секреты: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `ALLOWED_ORIGINS` (URL фронта)

Переменные для фронта — см. `.env.example`.
