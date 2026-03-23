-- Таблица заявок (создаётся автоматически при первом POST, если задан DATABASE_URL).
-- Можно выполнить вручную в Railway → Postgres → Query.

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  email TEXT,
  comment TEXT,
  source TEXT NOT NULL DEFAULT 'website'
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
