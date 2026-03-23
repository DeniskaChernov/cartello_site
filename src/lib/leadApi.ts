import { projectId, publicAnonKey } from "../../utils/supabase/info";

const DEFAULT_PATH = "/make-server-cc5df832/send-telegram";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Полный URL для отправки заявки (Telegram + опционально Google Sheets на бэкенде).
 * Railway: задайте VITE_LEAD_API_URL = https://ваш-сервис.up.railway.app
 * и при необходимости VITE_LEAD_API_PATH (по умолчанию тот же путь, что и у Supabase Edge).
 */
export function getLeadSubmissionUrl(): string {
  const explicit = import.meta.env.VITE_LEAD_API_URL?.trim();
  if (explicit) {
    return explicit;
  }
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  const path = import.meta.env.VITE_LEAD_API_PATH?.trim() || DEFAULT_PATH;
  if (base) {
    return `${trimTrailingSlash(base)}${path.startsWith("/") ? path : `/${path}`}`;
  }
  const pid = import.meta.env.VITE_SUPABASE_PROJECT_ID?.trim() || projectId;
  return `https://${pid}.supabase.co/functions/v1/make-server-cc5df832/send-telegram`;
}

/**
 * Заголовок Authorization: Supabase anon key или пустой секрет для своего API на Railway.
 */
export function getLeadAuthHeader(): Record<string, string> {
  const token =
    import.meta.env.VITE_API_AUTH_TOKEN?.trim() ||
    import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
    publicAnonKey;
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}
