import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const forbidden = /TELEGRAM_BOT_TOKEN|GOOGLE_SHEETS_CREDENTIALS|private_key|DATABASE_URL|postgresql:\/\/|up\.railway\.app|VITE_API_AUTH_TOKEN/;
let checked = 0;
function scan(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) scan(path);
    else {
      checked++;
      if (forbidden.test(readFileSync(path, "utf8"))) {
        console.error(`FAIL: forbidden server configuration in ${path}`);
        process.exitCode = 1;
      }
    }
  }
}
scan("dist");
if (!process.exitCode) console.log(`PASS: ${checked} frontend assets scanned; no server secrets/configuration markers.`);
