#!/usr/bin/env node
/**
 * Create a Linko staff account from the command line (bootstrap the first PLATFORM_ADMIN).
 *
 *   LINKO_STAFF_PASSWORD='…' npm run linko:staff -- --email admin@zoikobroadband.com --role PLATFORM_ADMIN --name "Ops admin"
 *
 * The password is read from the LINKO_STAFF_PASSWORD environment variable, never from the
 * command line (so it doesn't land in shell history). Roles: SUPPORT_AGENT, SUPPORT_SUPERVISOR,
 * DPO_ANALYST, KNOWLEDGE_PUBLISHER, SECURITY_AUDITOR, PLATFORM_ADMIN.
 */
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Same database location and audit salt as the app (LINKO_* only; secrets like API keys aren't read).
for (const f of [".env", ".env.local"]) {
  const p = path.join(ROOT, f);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*(LINKO_(?:DB_PATH|AUDIT_SALT|DATA_KEY|ENVIRONMENT))\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
process.chdir(ROOT);
const { createJiti } = require(path.join(ROOT, "node_modules/jiti"));
const jiti = createJiti(path.join(ROOT, "scripts/staff.js"), { alias: { "@/": ROOT.split(path.sep).join("/") + "/" } });

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const email = opt("email");
const role = opt("role");
const name = opt("name") ?? email;
const password = process.env.LINKO_STAFF_PASSWORD;
if (!email || !role || !password) {
  console.error("Usage: LINKO_STAFF_PASSWORD='…' npm run linko:staff -- --email <email> --role <ROLE> [--name <display name>]");
  process.exit(2);
}
const { createStaffUser } = jiti(path.join(ROOT, "app/lib/linko-staff/users.ts"));
try {
  createStaffUser({ email, displayName: name, role, password, createdBy: "cli-bootstrap" });
  console.log(`Created ${role} account for ${email}.`);
} catch (e) {
  console.error(/UNIQUE/i.test(e.message) ? "That email already has an account." : e.message);
  process.exit(1);
}
