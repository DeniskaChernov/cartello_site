import type { Env } from "./env";
import type { Lead } from "./lead";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
let cachedToken: { credentials: string; token: string; expiresAt: number } | undefined;

function base64Url(bytes: Uint8Array) {
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken(credentials: string) {
  if (cachedToken?.credentials === credentials && cachedToken.expiresAt > Date.now()) return cachedToken.token;
  const creds: unknown = JSON.parse(credentials);
  if (!creds || typeof creds !== "object" || !("client_email" in creds) || !("private_key" in creds)
    || typeof creds.client_email !== "string" || typeof creds.private_key !== "string") {
    throw new Error("Invalid service account configuration");
  }
  const pem = creds.private_key.replace(/\\n/g, "\n").replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "");
  const key = await crypto.subtle.importKey("pkcs8", Uint8Array.from(atob(pem), c => c.charCodeAt(0)),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const encoder = new TextEncoder();
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(encoder.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = base64Url(encoder.encode(JSON.stringify({
    iss: creds.client_email, scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: TOKEN_URL, iat: now, exp: now + 3600,
  })));
  const unsigned = `${header}.${claims}`;
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(unsigned));
  const response = await fetch(TOKEN_URL, {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${base64Url(new Uint8Array(signature))}` }),
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new Error("OAuth request failed");
  const data = await response.json() as { access_token?: unknown; expires_in?: unknown };
  if (typeof data.access_token !== "string" || !data.access_token) throw new Error("OAuth token missing");
  const ttl = typeof data.expires_in === "number" ? Math.max(0, data.expires_in - 60) : 0;
  cachedToken = { credentials, token: data.access_token, expiresAt: Date.now() + ttl * 1000 };
  return data.access_token;
}

export async function appendToSheet(env: Env, lead: Lead) {
  if (!env.GOOGLE_SHEETS_CREDENTIALS || !env.GOOGLE_SHEETS_ID) throw new Error("Sheets not configured");
  const token = await getAccessToken(env.GOOGLE_SHEETS_CREDENTIALS);
  // Preserve the existing sheet tab and six-column layout. RAW prevents formula injection.
  const range = encodeURIComponent("Sheet1!A:F");
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.GOOGLE_SHEETS_ID)}/values/${range}:append?valueInputOption=RAW`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [[new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" }),
      lead.name, lead.phone, lead.service || "-", lead.email || "-", lead.comment || "-"]] }),
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) {
    if (response.status === 401) cachedToken = undefined;
    throw new Error("Sheets append failed");
  }
}
