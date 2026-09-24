import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const remote = process.argv.includes("--remote");
const result = spawnSync(process.execPath, ["node_modules/wrangler/bin/wrangler.js", "d1", "execute", "DB",
  remote ? "--remote" : "--local", "--json", "--command",
  "SELECT COUNT(*) AS total, COUNT(railway_id) AS imported FROM leads"], { encoding: "utf8" });
try {
  if (result.status !== 0) throw new Error();
  const [{ results: [counts] }] = JSON.parse(result.stdout);
  const manifest = JSON.parse(readFileSync("exports/leads-manifest.json", "utf8"));
  console.log({ postgresSnapshot: manifest.postgresCount, d1Imported: counts.imported, d1Total: counts.total });
  if (BigInt(counts.imported) !== BigInt(manifest.postgresCount)) throw new Error();
  console.log("PASS: PostgreSQL snapshot count matches imported D1 rows. Native Worker leads are separate.");
} catch {
  console.error("Verification failed. Check the import, Cloudflare login and exports/leads-manifest.json.");
  process.exitCode = 1;
}
