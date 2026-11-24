#!/usr/bin/env node
/**
 * Apply Linko database migrations as a separate step (Doc05 §10 migration operator).
 * Run before starting the app; set LINKO_DB_AUTO_MIGRATE=false in production so the web
 * process never changes the schema itself.
 *
 *   npm run linko:migrate
 */
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const f of [".env", ".env.local"]) {
  const p = path.join(ROOT, f);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*(LINKO_DB_PATH)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}
process.chdir(ROOT);
process.env.LINKO_DB_AUTO_MIGRATE = "true";
const { createJiti } = require(path.join(ROOT, "node_modules/jiti"));
const jiti = createJiti(path.join(ROOT, "scripts/migrate.js"), { alias: { "@/": ROOT.split(path.sep).join("/") + "/" } });
const dbm = jiti(path.join(ROOT, "app/lib/linko-db/db.ts"));
dbm.db();
console.log(`Linko database is at schema version ${dbm.schemaVersion()}.`);
