import type { Lead } from "./lead";

export async function saveLead(db: D1Database, lead: Lead) {
  const result = await db.prepare(
    "INSERT INTO leads (name, phone, service, email, comment, source) VALUES (?, ?, ?, ?, ?, ?)",
  ).bind(lead.name, lead.phone, lead.service || null, lead.email || null,
    lead.comment || null, lead.source).run();
  if (!result.success) throw new Error("D1 insert failed");
}
