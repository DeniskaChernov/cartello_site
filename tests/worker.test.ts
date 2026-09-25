import { env } from "cloudflare:workers";
import { beforeAll, beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import type { MockInstance } from "vitest";
import app from "../worker/index";
import type { Env } from "../worker/env";
import schema from "../migrations/0001_leads.sql?raw";
import importSchema from "../migrations/0002_railway_import.sql?raw";

const lead = { name: "Тест <&>_", phone: "+998900000000", service: "PPF", email: "test@example.com", comment: "=1+1", source: "test" };
let credentials: string;
let publicKey: CryptoKey;
let bindings: Env;
let outbound: MockInstance<typeof fetch>;
let errorLog: MockInstance<typeof console.error>;

beforeAll(async () => {
  for (const statement of `${schema}\n${importSchema}`.split(";").map(s => s.trim()).filter(Boolean)) {
    await env.DB.prepare(statement).run();
  }
  const keys = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  if (!("privateKey" in keys)) throw new Error("Expected an RSA key pair");
  publicKey = keys.publicKey;
  const exported = await crypto.subtle.exportKey("pkcs8", keys.privateKey);
  if (!(exported instanceof ArrayBuffer)) throw new Error("Expected PKCS8 bytes");
  const pkcs8 = new Uint8Array(exported);
  const pem = btoa(Array.from(pkcs8, c => String.fromCharCode(c)).join(""));
  credentials = JSON.stringify({ client_email: "test@example.com", private_key: `-----BEGIN PRIVATE KEY-----\\n${pem}\\n-----END PRIVATE KEY-----` });
});

beforeEach(async () => {
  await env.DB.prepare("DELETE FROM leads").run();
  bindings = { ...env, TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "test-chat",
    GOOGLE_SHEETS_ID: "test-sheet", GOOGLE_SHEETS_CREDENTIALS: credentials };
  errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
  outbound = vi.spyOn(globalThis, "fetch").mockImplementation(async input => {
    const url = String(input);
    if (url.startsWith("https://api.telegram.org/")) return Response.json({ ok: true });
    if (url === "https://oauth2.googleapis.com/token") return Response.json({ access_token: "test-access-token", expires_in: 0 });
    if (url.startsWith("https://sheets.googleapis.com/")) return Response.json({ updates: { updatedRows: 1 } });
    throw new Error("Unexpected external network request");
  });
});
afterEach(() => vi.restoreAllMocks());

function post(body: unknown, headers: Record<string, string> = {}) {
  return app.request("https://cartello.test/api/send-telegram", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body),
  }, bindings);
}

describe("lead Worker in workerd with real local D1", () => {
  it("reports health and schema availability", async () => {
    const response = await app.request("https://cartello.test/health", {}, bindings);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok", database: "ok" });
  });
  it.each([{ phone: "1" }, { name: "Test" }, { name: " ", phone: "1" }, null, [], { name: {}, phone: "1" },
    { ...lead, comment: "x".repeat(2001) }])("rejects invalid lead %j", async body => {
    expect((await post(body)).status).toBe(400);
    expect(outbound).not.toHaveBeenCalled();
  });
  it("rejects malformed JSON without crashing", async () => {
    const response = await app.request("https://cartello.test/api/send-telegram", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
    }, bindings);
    expect(response.status).toBe(400);
    expect((await app.request("https://cartello.test/health", {}, bindings)).status).toBe(200);
  });
  it("delivers to all three integrations, signs a valid JWT and preserves values", async () => {
    const response = await post(lead, { Origin: "https://cartello.test" });
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
    expect(await env.DB.prepare("SELECT name, phone, service, email, comment, source FROM leads").first()).toEqual(lead);
    const calls = outbound.mock.calls as [string, RequestInit][];
    const telegram = JSON.parse(String(calls[0][1].body));
    expect(telegram.text).toContain("Тест &lt;&amp;&gt;_");
    expect(telegram.parse_mode).toBe("HTML");
    const oauth = calls.find(([url]) => url.includes("oauth2"))!;
    const jwt = new URLSearchParams(String(oauth[1].body)).get("assertion")!;
    const [header, claims, signature] = jwt.split(".");
    const bytes = Uint8Array.from(atob(signature.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
    expect(await crypto.subtle.verify("RSASSA-PKCS1-v1_5", publicKey, bytes, new TextEncoder().encode(`${header}.${claims}`))).toBe(true);
    expect(JSON.parse(atob(claims))).toMatchObject({ iss: "test@example.com", aud: "https://oauth2.googleapis.com/token" });
    const sheets = calls.find(([url]) => url.includes("sheets.googleapis"))!;
    expect(sheets[0]).toContain("valueInputOption=RAW");
    expect(JSON.parse(String(sheets[1].body)).values[0].slice(1)).toEqual([lead.name, lead.phone, lead.service, lead.email, lead.comment]);
  });
  it.each(["d1", "sheets", "oauth", "both"])("keeps success when Telegram delivered and %s fails", async failure => {
    if (failure === "d1" || failure === "both") bindings.DB = { prepare: () => { throw new Error("private diagnostic"); } } as unknown as D1Database;
    if (failure !== "d1") outbound.mockImplementation(async input => {
      if (String(input).includes("api.telegram")) return Response.json({ ok: true });
      if (String(input).includes("oauth2") && failure !== "oauth") return Response.json({ access_token: "test", expires_in: 0 });
      return new Response("private diagnostic", { status: 503 });
    });
    const response = await post(lead);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true });
    expect(JSON.stringify(errorLog.mock.calls)).not.toContain("private diagnostic");
  });
  it("keeps a D1 copy when Telegram fails and does not claim Telegram success", async () => {
    outbound.mockImplementation(async () => new Response("private diagnostic", { status: 503 }));
    expect((await post(lead)).status).toBe(502);
    expect(await env.DB.prepare("SELECT COUNT(*) AS n FROM leads").first("n")).toBe(1);
  });
  it("handles missing secrets safely", async () => {
    delete bindings.TELEGRAM_BOT_TOKEN;
    delete bindings.GOOGLE_SHEETS_CREDENTIALS;
    expect((await post(lead)).status).toBe(502);
    expect(outbound).not.toHaveBeenCalled();
  });
  it("returns JSON 503 when the database is unavailable", async () => {
    bindings.DB = { prepare: () => { throw new Error("secret"); } } as unknown as D1Database;
    const response = await app.request("https://cartello.test/health", {}, bindings);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "error", database: "error" });
  });
  it("rejects cross-origin posts and oversized bodies", async () => {
    expect((await post(lead, { Origin: "https://evil.test" })).status).toBe(403);
    expect((await post(lead, { "Sec-Fetch-Site": "cross-site" })).status).toBe(403);
    expect((await post(lead, { "Content-Type": "text/plain" })).status).toBe(415);
    expect((await post({ ...lead, comment: "x".repeat(17000) })).status).toBe(413);
  });
  it("enforces rate limiting without calling integrations", async () => {
    bindings.LEAD_RATE_LIMITER = { limit: async () => ({ success: false }) };
    const response = await post(lead, { "CF-Connecting-IP": "192.0.2.1" });
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(outbound).not.toHaveBeenCalled();
  });
  it("allows real leads if the rate limiter is unavailable", async () => {
    bindings.LEAD_RATE_LIMITER = { limit: async () => { throw new Error("failure"); } };
    expect((await post(lead, { "CF-Connecting-IP": "192.0.2.2" })).status).toBe(200);
  });
  it("the actual runtime rate limit binding rejects request 21", async () => {
    const key = `test:${crypto.randomUUID()}`;
    for (let i = 0; i < 20; i++) expect((await env.LEAD_RATE_LIMITER.limit({ key })).success).toBe(true);
    expect((await env.LEAD_RATE_LIMITER.limit({ key })).success).toBe(false);
  });
  it("returns JSON for unknown API routes", async () => {
    const response = await app.request("https://cartello.test/api/missing", {}, bindings);
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toContain("application/json");
  });
});
