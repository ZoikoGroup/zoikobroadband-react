#!/usr/bin/env node
/**
 * Encrypted backup of the Linko database with a restore check (Doc08 §07.1, LK-ARCH-F-07, QA-034).
 *
 *   LINKO_BACKUP_KEY=<base64 32 bytes> npm run linko:backup            # backup + verify
 *   LINKO_BACKUP_KEY=… npm run linko:backup -- --restore <file> <dest> # decrypt a backup to <dest>
 *
 * The snapshot is taken with VACUUM INTO (consistent while the app runs), encrypted with
 * AES-256-GCM, then decrypted again into a temp file and opened to prove it restores.
 * Backups go to LINKO_BACKUP_DIR (default .data/backups, git-ignored). Keep the key in your secret store.
 */
import { DatabaseSync } from "node:sqlite";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const f of [".env", ".env.local"]) {
  const p = path.join(ROOT, f);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*(LINKO_(?:DB_PATH|BACKUP_KEY|BACKUP_DIR))\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const key = Buffer.from(process.env.LINKO_BACKUP_KEY || "", "base64");
if (key.length !== 32) {
  console.error("Set LINKO_BACKUP_KEY to a base64-encoded 32-byte key.");
  process.exit(2);
}
const dbPath = process.env.LINKO_DB_PATH || path.join(ROOT, ".data", "linko.db");

function encrypt(buf) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([c.update(buf), c.final()]);
  return Buffer.concat([Buffer.from("LNKB1"), iv, c.getAuthTag(), body]);
}
function decrypt(buf) {
  if (buf.subarray(0, 5).toString() !== "LNKB1") throw new Error("Not a Linko backup");
  const d = createDecipheriv("aes-256-gcm", key, buf.subarray(5, 17));
  d.setAuthTag(buf.subarray(17, 33));
  return Buffer.concat([d.update(buf.subarray(33)), d.final()]);
}

const args = process.argv.slice(2);
if (args[0] === "--restore") {
  const [, file, dest] = args;
  if (!file || !dest) {
    console.error("Usage: npm run linko:backup -- --restore <backup file> <destination .db>");
    process.exit(2);
  }
  writeFileSync(dest, decrypt(readFileSync(file)));
  console.log(`Restored to ${dest}. Stop the app, replace LINKO_DB_PATH with it, then start the app.`);
  process.exit(0);
}

if (!existsSync(dbPath)) {
  console.error(`No database at ${dbPath}.`);
  process.exit(1);
}
const outDir = process.env.LINKO_BACKUP_DIR || path.join(ROOT, ".data", "backups");
mkdirSync(outDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const snap = path.join(tmpdir(), `linko-snap-${stamp}.db`);
const src = new DatabaseSync(dbPath);
src.exec(`VACUUM INTO '${snap.replace(/'/g, "''")}'`);
src.close();
const enc = encrypt(readFileSync(snap));
rmSync(snap);
const out = path.join(outDir, `linko-${stamp}.db.enc`);
writeFileSync(out, enc);

// Restore check: decrypt to a temp file, open it, confirm the schema and audit chain table exist.
const check = path.join(tmpdir(), `linko-restore-check-${stamp}.db`);
writeFileSync(check, decrypt(enc));
const r = new DatabaseSync(check);
const version = r.prepare("SELECT max(version) AS v FROM schema_version").get().v;
const audits = r.prepare("SELECT count(*) AS n FROM audit_event").get().n;
r.close();
rmSync(check);
console.log(`Backup written: ${path.relative(ROOT, out)} (schema v${version}, ${audits} audit events). Restore check passed.`);
