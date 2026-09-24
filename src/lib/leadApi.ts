const DEFAULT_PATH = "/api/send-telegram";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Cloudflare production always uses the same-origin Worker.
 * Overrides are for Vite local development only.
 */
export function getLeadSubmissionUrl(): string {
  if (!import.meta.env.DEV) return DEFAULT_PATH;
  const explicit = import.meta.env.VITE_LEAD_API_URL?.trim();
  if (explicit) {
    return explicit;
  }
  const base = import.meta.env.VITE_API_BASE_URL?.trim();
  const path = import.meta.env.VITE_LEAD_API_PATH?.trim() || DEFAULT_PATH;
  if (base) {
    return `${trimTrailingSlash(base)}${path.startsWith("/") ? path : `/${path}`}`;
  }
  return DEFAULT_PATH;
}
