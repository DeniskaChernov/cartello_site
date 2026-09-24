import type { Env } from "./env";
import type { Lead } from "./lead";
import { logFailure } from "./log";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegram(env: Env, lead: Lead, requestId: string): Promise<boolean> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    logFailure("telegram_configuration", requestId);
    return false;
  }
  const extra = [
    lead.service ? `🔧 <b>Услуга:</b> ${escapeHtml(lead.service)}` : "",
    lead.email ? `📧 <b>Email:</b> ${escapeHtml(lead.email)}` : "",
    lead.comment ? `💬 <b>Комментарий:</b> ${escapeHtml(lead.comment)}` : "",
  ].filter(Boolean).join("\n");
  const text = `🚗 <b>Новая заявка с сайта Cartello</b>\n\n👤 <b>Имя:</b> ${escapeHtml(lead.name)}\n📱 <b>Телефон:</b> ${escapeHtml(lead.phone)}\n${extra}\n\n📅 <b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}`;
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok || (await response.json() as { ok?: boolean }).ok !== true) {
      logFailure("telegram", requestId, response.status);
      return false;
    }
    return true;
  } catch {
    logFailure("telegram", requestId);
    return false;
  }
}
