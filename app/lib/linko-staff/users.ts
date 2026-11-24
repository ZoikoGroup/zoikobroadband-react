/** Staff user records and password hashing (no Next.js imports, so scripts can use it too). */
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { audit, db, nowIso, tenantId, uuid } from "@/app/lib/linko-db/db";
import { Role, ROLES } from "./rbac";

export const MIN_PASSWORD = 12;

/* ───────────────────────────── Passwords ───────────────────────────── */

export function hashPassword(pw: string) {
  const salt = randomBytes(16);
  const key = scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}

export function checkPassword(pw: string, stored: string) {
  const [alg, s, k] = stored.split("$");
  if (alg !== "scrypt" || !s || !k) return false;
  const want = Buffer.from(k, "base64");
  const got = scryptSync(pw, Buffer.from(s, "base64"), want.length, { N: 16384, r: 8, p: 1 });
  return want.length === got.length && timingSafeEqual(want, got);
}

export function passwordProblem(pw: string): string | null {
  if (pw.length < MIN_PASSWORD) return `Use at least ${MIN_PASSWORD} characters.`;
  if (!/[a-z]/i.test(pw) || !/\d/.test(pw)) return "Use letters and at least one number.";
  return null;
}

/* ───────────────────────────── Staff users ───────────────────────────── */

export function createStaffUser(input: { email: string; displayName: string; role: Role; password: string; createdBy: string }) {
  if (!ROLES.includes(input.role)) throw new Error("Unknown role");
  const problem = passwordProblem(input.password);
  if (problem) throw new Error(problem);
  const id = uuid();
  db()
    .prepare(
      `INSERT INTO staff_user (tenant_id, staff_id, email, display_name, role, password_hash, active, failed_attempts, locked_until, created_at, created_by)
       VALUES (?, ?, ?, ?, ?, ?, 1, 0, NULL, ?, ?)`,
    )
    .run(tenantId(), id, input.email.trim().toLowerCase(), input.displayName.trim().slice(0, 80), input.role, hashPassword(input.password), nowIso(), input.createdBy);
  audit({ action: "STAFF_USER_CREATED", subjectType: "staff_user", subjectRef: id, actor: input.createdBy, decision: "EXECUTED", reason: input.role });
  return id;
}

