import assert from "node:assert/strict";

const base = process.env.SMOKE_URL || "http://127.0.0.1:8787";
async function check(path, status, options, contentType = "application/json") {
  const response = await fetch(base + path, options);
  assert.equal(response.status, status, `${path}: expected ${status}`);
  assert.ok(response.headers.get("content-type")?.includes(contentType), `${path}: wrong content type`);
  console.log(`PASS: ${options?.method || "GET"} ${path} → ${status}`);
  return response;
}
assert.deepEqual(await (await check("/health", 200)).json(), { status: "ok", database: "ok" });
const post = body => ({ method: "POST", headers: { "Content-Type": "application/json", Origin: base }, body });
await check("/api/send-telegram", 400, post(JSON.stringify({ phone: "1" })));
await check("/api/send-telegram", 400, post(JSON.stringify({ name: "Test" })));
await check("/api/send-telegram", 400, post("{"));
await check("/health", 200);
await check("/api/missing", 404, { headers: { "Sec-Fetch-Mode": "navigate" } });
const home = await check("/", 200, undefined, "text/html");
const homeHtml = await home.text();
const deep = await check("/some/frontend/route", 200, { headers: { "Sec-Fetch-Mode": "navigate" } }, "text/html");
assert.equal(await deep.text(), homeHtml);
await check("/services-order.json", 200);
const script = homeHtml.match(/src="([^"]+\.js)"/)[1];
await check(script, 200, undefined, "javascript");
const proxy = await fetch("http://127.0.0.1:5173/api/send-telegram", {
  ...post(JSON.stringify({ name: "Test" })), headers: { "Content-Type": "application/json", Origin: "http://127.0.0.1:5173" },
});
assert.equal(proxy.status, 400, "Vite proxy must preserve same-origin validation");
console.log("PASS: Vite proxy preserves Origin and validation response");
