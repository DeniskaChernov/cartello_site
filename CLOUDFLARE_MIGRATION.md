# Cartello: переход с Railway на Cloudflare Free

Все команды выполняются в терминале в папке проекта. Нужен Node.js 24 LTS.
До приёмки нового сайта оставьте Railway frontend, API и PostgreSQL работающими.
Проект не требует платного тарифа. Бесплатные квоты конечны; следите за их расходом
в Cloudflare → Workers & Pages / D1.

## Состояние публикации на 25 сентября 2026

- Worker `cartello` опубликован в аккаунте Cartello Group:
  <https://cartello.cartello-site.workers.dev>.
- Первая проверенная версия: `8c9187ec-26f8-4ddf-b40a-c4c4d3ef38da`, исходный commit `445d2c5`.
- `cartello.uz` и `www.cartello.uz` подключены как Custom Domains к Worker.
  HTTPS, сайт, файлы, SPA fallback, `/health` и валидация API на обоих доменах
  проверены успешно. Версия: `51d86e8e-44dd-4756-ab7a-d938069d2f56`.
- Обе миграции применены к удалённой D1 `cartello-leads`; таблица `leads` пока пуста.
- Через HTTPS проверены сайт, статические файлы, SPA fallback, `/health` с реальной D1,
  ответы 400 на некорректные заявки и JSON 404 для неизвестного API.
- После первичной настройки адреса HTTPS заработал; повторная проверка прошла успешно.
- Worker secrets отсутствуют. Реальная доставка Telegram/Google Sheets и перенос
  старых заявок ещё не выполнены. Формы сохранены, но к приёму заявок пока не готовы.
- Публикация выполнена вручную через Wrangler. Автопубликация из GitHub ещё не подключена.
- После подтверждённого владельцем удаления конфликтующей CNAME корневой домен
  подключён к Cloudflare. Прежняя запись для отката по скриншоту владельца:
  CNAME `cartello.uz` → `9griyp6d.up.railway.app`, DNS only, TTL Auto.
  TXT Google и Railway в ходе работы не изменялись.
- В `routes` сохранены оба домена. PR остаётся draft, `main` не изменён.

## 1. Что изменилось

```text
GitHub → Vite build → Cloudflare
  cartello.uz → Static Assets (dist, SPA fallback)
             → /api/* и /health → Hono Worker
                                  ├─ Telegram Bot API
                                  ├─ D1 (binding DB)
                                  └─ Google Sheets API
```

Две формы (ContactNew и BookingModal) используют `/api/send-telegram`.
Hero и FloatingCTA ведут к контактам; услуги открывают BookingModal;
ссылки `tel:` и Telegram остались прежними. Других отправителей заявок в `src/` нет.

Аудит обнаружил Deno imports `npm:`, `Deno.env`, `Deno.serve` и PostgreSQL driver
в `server/`. Эти файлы сохранены для отката и не входят в Worker.
Прежний frontend требовал внешний API URL; production override теперь отключён.
`ALLOWED_ORIGINS`, `PORT`, `DATABASE_URL`, `VITE_API_AUTH_TOKEN` Cloudflare не нужны.
Google Sheets работает через RSA/Web Crypto и fetch. Дизайн не менялся.

При доставке в Telegram форма получает успех даже при сбое D1/Sheets.
Все операции дожидаются завершения; необработанных фоновых обещаний нет.
Если Telegram недоступен, ответ — 502, но Worker всё равно пытается сохранить копии
в D1 и Sheets. Повторная ручная отправка может создать дубль: автоматической
дедупликации и очереди повторов здесь нет. Если вторичная интеграция была недоступна,
восстановите пропущенные строки из Telegram или D1 после исправления.
Логи содержат только этап и requestId, без текста заявки, токенов и private key.

Есть ограничения длины полей, тела 16 КБ, проверка same-origin и лимит
20 валидных запросов в минуту на IP в одном Cloudflare location. Это базовая
защита от всплесков, не CAPTCHA и не защита от распределённого спама.
При сбое rate limiter заявки разрешены. Общий IP может обслуживать нескольких клиентов.

## 2. Как создать D1

```sh
npm ci
npx wrangler login
npx wrangler d1 create cartello-leads
```

Команды устанавливают библиотеки, открывают вход в Cloudflare и создают базу.
Сохраните показанный `database_id`. Если база уже существует, скопируйте её ID
в Cloudflare → Storage & Databases → D1.

## 3. Как связать D1 с Worker

В `wrangler.jsonc` уже указан ID созданной базы Cartello:
`9c9749bf-ecca-4296-ab0b-a35df420844a`. При переносе в другой аккаунт замените его на ID новой базы.
`binding` оставьте `DB`; если выбрали другое имя базы, исправьте `database_name`.
ID базы не секрет — сохраните изменение в Git. Выполните `npm run cf:typegen`.
Не создавайте второй Wrangler config.

## 4. Какие secrets добавить

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
GOOGLE_SHEETS_CREDENTIALS
GOOGLE_SHEETS_ID
```

Добавьте их как **Secret** в Worker → Settings → Variables and Secrets.
Если Worker ещё не существует, сначала выполните deploy из шага 6, затем добавьте
секреты и примените изменения. До этого форма не готова к реальным заявкам.
Альтернатива — CLI (Wrangler предложит создать Worker, если его ещё нет):

```sh
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put GOOGLE_SHEETS_CREDENTIALS
npx wrangler secret put GOOGLE_SHEETS_ID
```

Значения вводите в скрытом запросе, не в строке команды. Credentials — полный JSON
service account одной строкой, с сохранёнными `\n` внутри private key.
Обычные переводы строк в распарсенном ключе тоже поддерживаются.
Включите Google Sheets API и дайте service account доступ **редактора** к таблице
по его `client_email`. Нужна вкладка `Sheet1`, колонки A:F:
время, имя, телефон, услуга, email, комментарий. Этот порядок сохранён из старого API.
`source` хранится в D1; структуру прежнего листа не расширяли.

Не коммитьте JSON-ключ, `.dev.vars` и `.env.migration`. Никогда не используйте `VITE_*`
для секретов. Для локального теста заполните `.dev.vars` по `.dev.vars.example`.

## 5. Как применить migration

```sh
npm run db:migrate:remote
```

Создаёт `leads`, индекс по дате и `railway_id` для безопасного импорта.
Заявки не удаляются. Локальный аналог — `npm run db:migrate:local`.
Локальная и облачная базы отдельные: `--local` не переносит данные в облако.

## 6. Как сделать первый deploy

```sh
npm run typecheck
npm test
npm run cf:deploy
```

Deploy собирает `dist`, проверяет отсутствие серверных секретов в bundle и публикует
Worker со статикой. Deploy применяет Custom Domains из `routes` в `wrangler.jsonc`;
сейчас там `cartello.uz` и `www.cartello.uz`.
Повторные публикации — `npm run cf:deploy`.

Для GitHub → Cloudflare после ручной проверки подключите Worker к репозиторию
через **Settings → Builds → Connect**. На время приёмки выберите `migration/cloudflare`,
после ручного merge PR — `main`. Build command: `npm run build`;
deploy command: `npx wrangler deploy`; root: корень репозитория.
Секреты хранятся в Worker Settings, не в build variables. Изменения схемы применяются
отдельно до деплоя. GitHub Actions CI из этого PR только проверяет код, ничего не публикует.

## 7. Как открыть workers.dev

Wrangler напечатает адрес вида `https://cartello.<ваш-поддомен>.workers.dev`.
Он также есть в Worker → Settings → Domains & Routes. Откройте точный адрес
из результата deploy, не пример с угловыми скобками.

## 8. Как проверить /health

Откройте `https://ВАШ-WORKERS-АДРЕС/health`. Ожидается HTTP 200:

```json
{"status":"ok","database":"ok"}
```

HTTP 503 означает проблему D1 или неприменённую схему. Health не проверяет
доставку Telegram/Sheets — их проверяют отдельной заявкой.

## 9. Как отправить тестовую заявку

На workers.dev заполните контакты: имя `ТЕСТ Cloudflare`, тестовый номер и услугу;
отметьте согласие и отправьте. Затем откройте карточку услуги и отправьте заявку
через BookingModal с email и комментарием. Вариант через PowerShell:

```powershell
$previewUrl = 'https://ВАШ-WORKERS-АДРЕС'
$testLead = @{ name='ТЕСТ Cloudflare'; phone='+998000000000'; service='Проверка'; source='cloudflare-test' } | ConvertTo-Json
Invoke-RestMethod -Uri "$previewUrl/api/send-telegram" -Method Post -ContentType 'application/json; charset=utf-8' -Body ([Text.Encoding]::UTF8.GetBytes($testLead))
```

Замените адрес. Успешный JSON содержит `success: true`.

## 10. Как проверить Telegram

В прежнем чате бота найдите обе тестовые заявки. Проверьте поля и время Ташкента.
Бот должен иметь право отправлять сообщения в этот чат. Успех формы подтверждает
доставку Telegram.

## 11. Как проверить Google Sheets

На `Sheet1` должны появиться новые строки A:F. Если их нет, проверьте права
service account, включение API и логи: `npx wrangler tail` (этап `google_sheets`).
Успех формы при ошибке Sheets ожидаем: сообщение уже доставлено в Telegram.

## 12. Как посмотреть запись в D1

Cloudflare → D1 → cartello-leads → Console либо:

```sh
npx wrangler d1 execute DB --remote --command "SELECT id, created_at, name, phone, service, source FROM leads ORDER BY id DESC LIMIT 10"
```

Вывод содержит контакты клиентов. Не публикуйте его в Git или PR.

## 13. Как перенести старые заявки

Railway PostgreSQL не удаляйте. Возьмите **public connection URL** базы:
внутренний `*.railway.internal` с компьютера недоступен. В локальном файле
`.env.migration` (исключён из Git) задайте `DATABASE_URL=...`.
Экспорт использует read-only транзакцию со стабильным snapshot, PostgreSQL не меняет.

```sh
npm run leads:export
npx wrangler d1 execute DB --remote --file exports/leads.sql
npm run leads:verify -- --remote
```

`COUNT(*) PostgreSQL` из снимка записан в `exports/leads-manifest.json`.
Проверка сравнивает его с `COUNT(railway_id)` D1 и показывает `COUNT(*) D1` отдельно:
общее число D1 может быть больше за счёт новых заявок.
ID PostgreSQL хранится в `railway_id`, новый `id` выдаёт D1: коллизий не будет.
Повторный импорт не создаёт дубли и не перезаписывает прежние строки.
Экспорт рассчитан на append-only leads: правки уже импортированных старых строк
автоматически не синхронизируются. Даты переводятся в UTC с сохранением момента времени.

Если строк ноль, пропустите импорт пустого SQL и выполните проверку количества.
`exports/` содержит персональные данные, храните её приватно, не добавляйте в Git.
После cutover и окончания старых запросов **повторите экспорт → импорт → verify**,
чтобы перенести заявки, поступившие в Railway во время переключения.
Для локальной репетиции замените `--remote` на `--local`.

## 14. Как подключить cartello.uz

Сначала проверьте workers.dev: обе формы, Telegram, Sheets, D1.
Сохраните текущие DNS записи `cartello.uz` и `www`: значения, TTL и proxy state,
адреса Railway frontend/API и ID успешных deployments. Оставьте домен в Railway.

Если DNS ещё не в Cloudflare, добавьте зону на Free. Скопируйте и сверьте все записи,
включая почтовые MX/TXT, до замены nameservers. У регистратора укажите nameservers,
выданные Cloudflare, и дождитесь Active. Пока записи сайта должны вести на Railway.
Если включён DNSSEC, пройдите перенос DS по мастеру Cloudflare/регистратора:
старый DS не должен нарушить разрешение домена.

## 15. Как переключить DNS

После успешной приёмки preview:

1. Worker → Settings → Domains & Routes → Add → Custom Domain → `cartello.uz`.
2. Если существующая A/CNAME мешает, сохраните и удалите только конфликтующую запись хоста.
3. Cloudflare создаст запись и сертификат. Не делайте CNAME на workers.dev.
4. Если используете `www.cartello.uz`, добавьте его отдельным Custom Domain.
5. Не меняйте MX/TXT и посторонние поддомены. Дождитесь активного сертификата.

По запросу владельца оба домена уже подключены, проверены по HTTPS и сохранены
в Wrangler config с `custom_domain: true`. Повторно добавлять их в панели не нужно.

## 16. Как проверить HTTPS

В приватном окне откройте `https://cartello.uz` и `/health`. Сертификат должен быть
действителен. Проверьте `www`, если его подключили. Для перенаправления HTTP включите
Cloudflare → SSL/TLS → Always Use HTTPS.

## 17. Как проверить forms после переключения

На телефоне и компьютере отправьте заявки из контактов и BookingModal.
Проверьте обе языковые версии и наличие строк в трёх интеграциях.
В Network запрос должен идти на `https://cartello.uz/api/send-telegram`.
Открытие `/some/frontend/route` напрямую должно показать SPA вместо 404:
отдельного роутера сейчас нет, откроется тот же лендинг.
`/api/unknown` должен вернуть JSON 404, а не HTML.

## 18. Как откатиться обратно на Railway

1. Проверьте старые frontend/API deployments и PostgreSQL. Если main был обновлён
   и запустился новый deploy, выберите сохранённый успешный **старый deployment → Rollback**
   для затронутого сервиса. Не пересобирайте Cloudflare-ветку как Railway frontend.
2. Сначала удалите откатываемые домены из `routes` в `wrangler.jsonc`, иначе следующий
   deploy подключит их снова. Удалите Custom Domain `cartello.uz` (и `www`) из Worker → Domains & Routes.
   Удалите оставшуюся конфликтующую DNS запись Worker, если есть.
3. Восстановите **точные прежние** A/CNAME Railway, TTL и proxy state из снимка.
   Nameservers Cloudflare менять обратно не требуется.
4. Дождитесь обновления DNS, проверьте HTTPS, обе формы и прежний API.
5. Worker и D1 не удаляйте: там остаются новые заявки. Сохраните их:
   `npx wrangler d1 export DB --remote --output exports/cloudflare-backup.sql`.

Перед merge PR приостановите Railway autodeploy либо подготовьте откат на прежний
deployment. Push ветки миграции не меняет main. PR автоматически не сливается.

## 19. Когда Railway можно окончательно удалить

Только когда выполнены все условия:

- Домен, HTTPS и обе формы проверены на Cloudflare с реальными интеграциями.
- Прошло минимум 48 часов наблюдения после cutover без ошибок доставки.
- Финальный повторный импорт выполнен; snapshot PostgreSQL совпадает с импортом D1.
- Сохранены приватные экспорты обеих баз и сведения для отката.
- Старый API больше никто не использует, новые заявки в Railway не поступают.
- Владелец принял production и больше не нуждается в rollback.

После этого отдельно отключают Railway services/DB, затем удаляют legacy `server/`
и `railway.toml`. Эта миграция их не удаляет.

Официальные справочники: [Static Assets](https://developers.cloudflare.com/workers/static-assets/),
[SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/),
[D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/),
[Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
