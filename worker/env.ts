// DB and rate limiter types are generated from wrangler.jsonc by cf:typegen.
export interface Env extends Cloudflare.Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  GOOGLE_SHEETS_CREDENTIALS?: string;
  GOOGLE_SHEETS_ID?: string;
}
