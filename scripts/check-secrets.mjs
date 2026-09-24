import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Heuristic audit of all reachable Git blobs and current tracked/unignored files.
// Print locations and secret types only, never matches.
const patterns = [
  ["Telegram bot token", /\b\d{7,12}:[A-Za-z0-9_-]{30,50}\b/],
  ["Private key material", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----\s*(?:\\n)?[A-Za-z0-9+/]{40}/],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b/],
  ["Credentialed database URL", /postgres(?:ql)?:\/\/(?!user:pass@)[^\s:'"/]+:[^\s@'"/]{6,}@[^\s'"/]+/],
  ["Assigned integration secret", /(?:TELEGRAM_BOT_TOKEN|GOOGLE_SHEETS_CREDENTIALS)\s*=\s*["']?[A-Za-z0-9{][^\r\n]{25,}/],
];
const git = (...args) => execFileSync("git", args, { maxBuffer: 100 * 1024 * 1024, encoding: "utf8" });
const findings = new Set();
function scan(text, path) {
  if (text.includes("\0")) return;
  for (const [kind, regex] of patterns) if (regex.test(text)) findings.add(`${path}: ${kind}`);
}
let blobs = 0;
for (const line of git("rev-list", "--objects", "--all").trim().split("\n")) {
  const separator = line.indexOf(" ");
  if (separator < 0) continue;
  const oid = line.slice(0, separator);
  if (git("cat-file", "-t", oid).trim() !== "blob") continue;
  scan(git("cat-file", "blob", oid), `history:${line.slice(separator + 1)}`);
  blobs++;
}
const files = new Set(git("ls-files", "-z", "--cached", "--others", "--exclude-standard").split("\0").filter(Boolean));
for (const file of files) scan(readFileSync(file, "utf8"), file);
for (const finding of findings) console.error(finding);
console.log(`${findings.size ? "FAIL" : "PASS"}: ${blobs} historical blobs and ${files.size} current files scanned with ${patterns.length} credential patterns.`);
if (findings.size) process.exitCode = 1;
