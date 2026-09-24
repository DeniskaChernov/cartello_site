import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { Env } from "./env";
import { parseLead } from "./lead";
import { saveLead } from "./db";
import { sendTelegram } from "./telegram";
import { appendToSheet } from "./google-sheets";
import { logFailure } from "./log";

const app = new Hono<{ Bindings: Env }>();
app.use("*", async (c, next) => {
  c.header("Cache-Control", "no-store");
  await next();
});
app.onError((_error, c) => {
  logFailure("worker", crypto.randomUUID());
  return c.json({ error: "Internal server error" }, 500);
});
app.notFound(c => c.json({ error: "Not found" }, 404));

app.get("/health", async c => {
  try {
    await c.env.DB.prepare("SELECT id FROM leads LIMIT 1").all();
    return c.json({ status: "ok", database: "ok" });
  } catch {
    logFailure("health_d1", crypto.randomUUID());
    return c.json({ status: "error", database: "error" }, 503);
  }
});

app.post("/api/send-telegram", bodyLimit({ maxSize: 16 * 1024,
  onError: c => c.json({ error: "Request too large" }, 413),
}), async c => {
  // Same-origin browser requests only. CLI requests without Origin remain possible.
  const origin = c.req.header("Origin");
  if (origin && origin !== new URL(c.req.url).origin) return c.json({ error: "Origin not allowed" }, 403);
  if (c.req.header("Sec-Fetch-Site") === "cross-site") return c.json({ error: "Origin not allowed" }, 403);
  if (c.req.header("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return c.json({ error: "Expected application/json" }, 415);
  }
  let body: unknown;
  try { body = await c.req.json(); } catch { return c.json({ error: "Invalid JSON" }, 400); }
  const lead = parseLead(body);
  if (!lead) return c.json({ error: "Valid name and phone are required; check field types and lengths" }, 400);
  const requestId = crypto.randomUUID();
  const ip = c.req.header("CF-Connecting-IP");
  if (ip) {
    try {
      const { success } = await c.env.LEAD_RATE_LIMITER.limit({ key: `lead:${ip}` });
      if (!success) {
        c.header("Retry-After", "60");
        return c.json({ error: "Too many requests. Please try again in a minute." }, 429);
      }
    } catch { logFailure("rate_limiter", requestId); } // Fail open for real leads.
  }
  const telegramSent = await sendTelegram(c.env, lead, requestId);
  // Independent copies even if Telegram is down. No fire-and-forget work can be cancelled.
  const copies = await Promise.allSettled([saveLead(c.env.DB, lead), appendToSheet(c.env, lead)]);
  copies.forEach((result, index) => {
    if (result.status === "rejected") logFailure(index === 0 ? "d1" : "google_sheets", requestId);
  });
  if (!telegramSent) return c.json({ error: "Failed to send message", requestId }, 502);
  console.log(JSON.stringify({ event: "lead_accepted", requestId,
    database: copies[0].status, sheets: copies[1].status }));
  return c.json({ success: true, message: "Заявка отправлена в Telegram" });
});

export default app;
