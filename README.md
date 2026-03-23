# Cartello — лендинг автоуслуг

React + Vite + Tailwind. Локально: `npm run dev`. Сборка: `npm run build`.

## Деплой на Railway (вариант А — один сервис, только сайт)

Один сервис из этого репозитория отдаёт **статику** (`dist`). Код API в папке `server/` сюда **не подключается** — его можно поднять отдельно, когда понадобятся заявки в Telegram.

1. **New project** → **Deploy from GitHub** → репозиторий `cartello_site`.
2. **Settings → Service:**
   - **Root Directory:** оставьте пустым (корень репозитория).
   - Убедитесь, что **не** выбран Docker из `server/` — в корне лежит `railway.toml` с **Railpack** и `npm start`.
3. **Variables** (для сборки фронта, если уже есть URL бэкенда с заявками):
   - `VITE_LEAD_API_URL` = полный адрес POST, например  
     `https://ваш-api.up.railway.app/api/send-telegram`  
   Пока API нет — переменную можно не задавать (сайт откроется; отправка форм в проде потребует URL позже).
4. **Deploy / Redeploy** после пуша в `main`.

Файл `railway.toml` задаёт билдер **RAILPACK** и команду запуска **`npm start`** (`serve dist -s`).

Подробнее про переменные — `.env.example`.
