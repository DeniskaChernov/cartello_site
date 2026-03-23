const DEFAULT_PATH = "/api/send-telegram";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * URL для отправки заявок на ваш API (Railway).
 * Задайте VITE_LEAD_API_URL (полный URL) или VITE_API_BASE_URL + опционально VITE_LEAD_API_PATH.
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
  if (import.meta.env.DEV) {
    return DEFAULT_PATH;
  }
  throw new Error(
    "Укажите VITE_LEAD_API_URL или VITE_API_BASE_URL в переменных окружения (см. .env.example).",
  );
}

/** Опционально: API_KEY на бэкенде → тот же ключ во фронте как VITE_API_AUTH_TOKEN. */
export function getLeadAuthHeader(): Record<string, string> {
  const token = import.meta.env.VITE_API_AUTH_TOKEN?.trim();
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}
