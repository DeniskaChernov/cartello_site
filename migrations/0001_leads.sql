CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  email TEXT,
  comment TEXT,
  source TEXT NOT NULL DEFAULT 'website'
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
