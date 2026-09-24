import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { leadInsert } from "../scripts/lead-export.mjs";

test("legacy import preserves Unicode, dates, large IDs, quotes and newlines; reruns do not overwrite native leads", () => {
  const db = new DatabaseSync(":memory:");
  db.exec(readFileSync("migrations/0001_leads.sql", "utf8"));
  db.exec(readFileSync("migrations/0002_railway_import.sql", "utf8"));
  db.exec("INSERT INTO leads (name, phone) VALUES ('Native Worker lead', '1')");
  const row = { id: "9223372036854775807", created_at: "2026-09-24T12:30:00+05:00",
    name: "О'Брайен'); DROP TABLE leads; --", phone: "+998000000000", service: null,
    email: "", comment: "Первая строка\nIkkinchi qator", source: "website" };
  const query = leadInsert(row);
  db.exec(query);
  db.exec(query);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM leads").get().n, 2);
  const imported = db.prepare("SELECT * FROM leads WHERE railway_id = ?").get(row.id);
  assert.equal(imported.name, row.name);
  assert.equal(imported.comment, row.comment);
  assert.equal(imported.created_at, "2026-09-24 07:30:00.000");
  assert.equal(imported.service, null);
  assert.equal(imported.email, "");
  assert.equal(imported.railway_id, row.id);
  assert.equal(db.prepare("SELECT name FROM leads WHERE id = 1").get().name, "Native Worker lead");
  db.close();
});

test("legacy converter rejects corrupt rows instead of silently losing data", () => {
  assert.throws(() => leadInsert({ id: "1; DROP TABLE leads" }));
  assert.throws(() => leadInsert({ id: "1", created_at: "bad date", name: "Test", phone: "1" }));
});
