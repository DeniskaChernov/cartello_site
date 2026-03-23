import postgres from "npm:postgres@3.4.5";

type Sql = ReturnType<typeof postgres>;

let pool: Sql | null = null;
let schemaEnsured = false;

export function getDb(): Sql | null {
  const url = Deno.env.get("DATABASE_URL")?.trim();
  if (!url) {
    return null;
  }
  if (!pool) {
    pool = postgres(url, { max: 10 });
  }
  return pool;
}

async function ensureLeadsTable(sql: Sql): Promise<void> {
  await sql.unsafe(`
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
  `);
  await sql.unsafe(`
    CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
  `);
}

export type LeadPayload = {
  name: string;
  phone: string;
  service?: string;
  email?: string;
  comment?: string;
  source?: string;
};

/** Сохраняет заявку. Возвращает id или null, если DATABASE_URL не задан. */
export async function saveLead(data: LeadPayload): Promise<{ id: string } | null> {
  const sql = getDb();
  if (!sql) {
    return null;
  }
  if (!schemaEnsured) {
    await ensureLeadsTable(sql);
    schemaEnsured = true;
  }

  const [row] = await sql`
    INSERT INTO leads (name, phone, service, email, comment, source)
    VALUES (
      ${data.name},
      ${data.phone},
      ${data.service ?? null},
      ${data.email ?? null},
      ${data.comment ?? null},
      ${data.source ?? "website"}
    )
    RETURNING id
  `;

  if (!row) {
    throw new Error("INSERT returned no row");
  }
  return { id: String(row.id) };
}

export async function pingDb(): Promise<boolean> {
  const sql = getDb();
  if (!sql) {
    return false;
  }
  await sql`SELECT 1`;
  return true;
}
