# Cartello — лендинг автоуслуг

React 18 + Vite + Tailwind. Cloudflare Static Assets отдаёт сайт, Hono Worker
обрабатывает `/api/send-telegram` и `/health`. Заявки поступают в Telegram,
D1 и Google Sheets. Дизайн и тексты сайта сохранены.

**Первый deploy, данные, домен и откат:** [CLOUDFLARE_MIGRATION.md](CLOUDFLARE_MIGRATION.md).

## Локальная работа

Установите Node.js 24 LTS. В папке проекта:

```sh
npm ci
npm run cf:dev
```

Откройте `http://127.0.0.1:8787`. Команда собирает сайт, применяет миграции
к локальной D1 и запускает Worker. Авторизация Cloudflare не нужна.
Для реальных интеграций скопируйте `.dev.vars.example` в `.dev.vars` и заполните
четыре значения. Без них можно проверять сайт, D1, `/health` и валидацию API.

Для обновления интерфейса без пересборки запустите во втором терминале `npm run dev`
и откройте адрес Vite. `/api` проксируется к локальному Worker.

```sh
npm run cf:typegen      # типы из wrangler.jsonc
npm run typecheck       # TypeScript frontend и Worker
npm test               # workerd + D1 + имитация внешних API; тест импорта
npm run test:browser   # обе формы в Chromium: desktop и mobile
npm run cf:build        # Vite + dry-run сборка Worker
npm run check:bundle    # проверка dist на серверные настройки и секреты
npm run check:secrets   # эвристическая проверка файлов и истории Git
npm run cf:deploy      # сборка + проверка bundle + публикация
```

Перед первым браузерным тестом: `npx playwright install chromium`.
`npm run test:http` проверяет HTTP и Vite proxy, когда одновременно запущены
`npm run cf:dev` и `npm run dev`.

Единственный источник конфигурации Cloudflare — `wrangler.jsonc`.
Перед первым deploy замените нулевой `database_id` на ID своей D1.
`DATABASE_URL`, Node/Deno server и Google SDK Worker не использует.

## Railway: резерв для отката

`server/`, `server/Dockerfile`, PostgreSQL migration и `railway.toml` сохранены.
`npm start` по-прежнему раздаёт статический `dist` через `serve`.
Старый Deno backend использует прежние Railway variables.
Для отката используйте **предыдущий проверенный Railway deployment**, а не новую
Cloudflare-сборку: в ней формы намеренно используют same-origin API.
Не меняйте Railway production и его ветку автодеплоя до завершения переключения.

Фотография фасада: `src/assets/facade-building.png`.
Публичные SEO-переменные перечислены в `.env.example`.
