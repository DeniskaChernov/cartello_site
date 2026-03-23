import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { getDb, pingDb, saveLead } from "./db.tsx";
import { appendToSheet } from "./google-sheets.tsx";

const app = new Hono();

app.use("*", logger(console.log));

function corsOrigin(): string | string[] | ((origin: string) => string | undefined | null) {
  const raw = Deno.env.get("ALLOWED_ORIGINS")?.trim();
  if (!raw || raw === "*") {
    return "*";
  }
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) {
    return "*";
  }
  if (list.length === 1) {
    return list[0];
  }
  return (origin: string) => (list.includes(origin) ? origin : list[0]);
}

app.use(
  "/*",
  cors({
    origin: corsOrigin(),
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/health", async (c) => {
  const payload: Record<string, unknown> = { status: "ok" };
  if (getDb()) {
    try {
      await pingDb();
      payload.database = "ok";
    } catch (e) {
      console.error("Database health check failed:", e);
      payload.database = "error";
    }
  } else {
    payload.database = "not_configured";
  }
  return c.json(payload);
});

app.post("/api/send-telegram", async (c) => {
  try {
    const body = await c.req.json();
    const { name, phone, service, email, comment, source } = body as {
      name?: string;
      phone?: string;
      service?: string;
      email?: string;
      comment?: string;
      source?: string;
    };

    if (!name || !phone) {
      return c.json({ error: "Name and phone are required" }, 400);
    }

    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!botToken || !chatId) {
      console.error("Telegram credentials not configured");
      return c.json({ error: "Telegram not configured" }, 500);
    }

    const extraLines = [
      service ? `🔧 *Услуга:* ${service}` : "",
      email ? `📧 *Email:* ${email}` : "",
      comment ? `💬 *Комментарий:* ${comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const message = `
🚗 *Новая заявка с сайта Cartello*

👤 *Имя:* ${name}
📱 *Телефон:* ${phone}
${extraLines}

📅 *Время:* ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}
    `.trim();

    appendToSheet({ name, phone, service, email, comment }).then((result) => {
      if (result.success) {
        console.log("✅ Successfully saved to Google Sheets");
      } else {
        console.error("❌ Failed to save to Google Sheets:", result.error);
      }
    });

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API error:", errorText);
      return c.json({ error: "Failed to send message" }, 500);
    }

    if (getDb()) {
      try {
        await saveLead({
          name,
          phone,
          service,
          email,
          comment,
          source,
        });
      } catch (dbErr) {
        console.error("Failed to save lead to database (Telegram already sent):", dbErr);
      }
    }

    return c.json({ success: true, message: "Заявка отправлена в Telegram" });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

const port = Number(Deno.env.get("PORT")) || 8787;
const hostname = "0.0.0.0";
Deno.serve({ port, hostname }, app.fetch);
