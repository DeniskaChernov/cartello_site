import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import postgres from "postgres";

export function sqlText(value) {
  if (value === null || value === undefined) return "NULL";
  // Hex text literals also preserve newlines, quotes and Unicode without SQL injection.
  return `CAST(X'${Buffer.from(String(value), "utf8").toString("hex")}' AS TEXT)`;
}

export function leadInsert(row) {
  const id = String(row.id);
  if (!/^\d+$/.test(id)) throw new Error("Invalid legacy ID");
  const date = new Date(row.created_at);
  if (!Number.isFinite(date.getTime()) || typeof row.name !== "string" || typeof row.phone !== "string") {
    throw new Error("Invalid legacy row");
  }
  const values = [id, date.toISOString().replace("T", " ").replace("Z", ""), row.name, row.phone, row.service, row.email,
    row.comment, row.source ?? "website"].map(sqlText).join(", ");
  return `INSERT INTO leads (railway_id, created_at, name, phone, service, email, comment, source) VALUES (${values}) ON CONFLICT(railway_id) DO NOTHING;`;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required only for this one-time export");
  const sql = postgres(process.env.DATABASE_URL, { max: 1, connect_timeout: 15, onnotice: () => {} });
  try {
    const snapshot = await sql.begin("isolation level repeatable read read only", async tx => {
      const [{ count }] = await tx`SELECT COUNT(*)::text AS count FROM leads`;
      const rows = await tx`SELECT id::text, created_at, name, phone, service, email, comment, source FROM leads ORDER BY id`;
      if (BigInt(count) !== BigInt(rows.length)) throw new Error("Snapshot count mismatch");
      return { count, rows };
    });
    await mkdir("exports", { recursive: true });
    await writeFile("exports/leads.sql", snapshot.rows.map(leadInsert).join("\n") + "\n", { mode: 0o600 });
    await writeFile("exports/leads-manifest.json", JSON.stringify({
      exportedAt: new Date().toISOString(), postgresCount: snapshot.count,
      firstId: snapshot.rows[0]?.id ?? null, lastId: snapshot.rows.at(-1)?.id ?? null,
    }, null, 2), { mode: 0o600 });
    console.log(`Exported ${snapshot.count} rows. Files: exports/leads.sql and exports/leads-manifest.json (ignored by Git).`);
  } finally { await sql.end({ timeout: 5 }); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => {
    console.error("Export failed. Check DATABASE_URL, network access and the leads schema. No credentials were logged.");
    process.exitCode = 1;
  });
}
