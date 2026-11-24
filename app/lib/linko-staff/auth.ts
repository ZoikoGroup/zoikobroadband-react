/**
 * Staff authentication for the Linko console (Doc13 §03.3, TH-06/TH-11, L13-FR-021, L13-QA-014/016).
 *
 *  - Passwords: scrypt with a per-user salt; never logged or returned.
 *  - Sessions: random 32-byte token in an httpOnly, SameSite=Strict, Secure (in production) cookie;
 *    only its SHA-256 is stored. Idle and absolute expiry; revoked on sign-out, role change or
 *    deactivation; a replayed cookie after sign-out is rejected.
 *  - Step-up: sensitive actions need the password re-entered within STEP_UP_MS.
 *  - Lockout after repeated failures. Every sign-in attempt is audited (no passwords or emails in the log).
 *
 * The docs leave numeric values open (D13-17/D13-18); these defaults are configurable by env.
 */
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { audit, db, nowIso, plusMs, sha256, sweep, tenantId } from "@/app/lib/linko-db/db";
import { Action, can, modeFor, needsStepUp, Role } from "./rbac";
import { checkPassword } from "./users";

export { createStaffUser, MIN_PASSWORD } from "./users";

export const COOKIE = "linko_staff";
const IDLE_MS = Number(process.env.LINKO_STAFF_IDLE_MINUTES || 15) * 60_000;
const ABSOLUTE_MS = Number(process.env.LINKO_STAFF_MAX_HOURS || 8) * 3_600_000;
export const STEP_UP_MS = Number(process.env.LINKO_STAFF_STEPUP_MINUTES || 5) * 60_000;
const MAX_FAILS = Number(process.env.LINKO_STAFF_MAX_FAILED_LOGINS || 5);
const LOCK_MS = Number(process.env.LINKO_STAFF_LOCK_MINUTES || 15) * 60_000;

export type Staff = { staffId: string; email: string; displayName: string; role: Role; steppedUpAt: string | null; tokenHash: string };

/* ───────────────────────────── Sessions ───────────────────────────── */

export type LoginResult = { ok: true } | { ok: false; message: string };

export async function signIn(email: string, password: string): Promise<LoginResult> {
  sweep();
  const generic = "Those details don't match an active staff account."; // no account enumeration (L13-QA-094)
  const u = db()
    .prepare("SELECT * FROM staff_user WHERE tenant_id = ? AND email = ?")
    .get(tenantId(), email.trim().toLowerCase()) as Record<string, string | number | null> | undefined;
  if (!u || !u.active) {
    audit({ action: "STAFF_SIGN_IN", subjectType: "staff_user", subjectRef: email.trim().toLowerCase(), actor: "anonymous", decision: "DENY", reason: "UNKNOWN_OR_INACTIVE" });
    return { ok: false, message: generic };
  }
  if (u.locked_until && String(u.locked_until) > nowIso()) {
    audit({ action: "STAFF_SIGN_IN", subjectType: "staff_user", subjectRef: String(u.staff_id), actor: String(u.staff_id), decision: "DENY", reason: "LOCKED" });
    return { ok: false, message: "This account is temporarily locked. Try again later or contact your administrator." };
  }
  if (!checkPassword(password, String(u.password_hash))) {
    const fails = Number(u.failed_attempts) + 1;
    db()
      .prepare("UPDATE staff_user SET failed_attempts = ?, locked_until = ? WHERE tenant_id = ? AND staff_id = ?")
      .run(fails >= MAX_FAILS ? 0 : fails, fails >= MAX_FAILS ? plusMs(LOCK_MS) : null, tenantId(), String(u.staff_id));
    audit({ action: "STAFF_SIGN_IN", subjectType: "staff_user", subjectRef: String(u.staff_id), actor: String(u.staff_id), decision: "DENY", reason: fails >= MAX_FAILS ? "LOCKED_NOW" : "BAD_PASSWORD" });
    return { ok: false, message: generic };
  }
  db().prepare("UPDATE staff_user SET failed_attempts = 0, locked_until = NULL WHERE tenant_id = ? AND staff_id = ?").run(tenantId(), String(u.staff_id));
  const token = randomBytes(32).toString("base64url");
  const now = nowIso();
  db()
    .prepare("INSERT INTO staff_session VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL)")
    .run(tenantId(), sha256(token), String(u.staff_id), String(u.role), now, now, plusMs(ABSOLUTE_MS), now);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(ABSOLUTE_MS / 1000),
  });
  audit({ action: "STAFF_SIGN_IN", subjectType: "staff_user", subjectRef: String(u.staff_id), actor: String(u.staff_id), decision: "ALLOW" });
  return { ok: true };
}

export async function currentStaff(): Promise<Staff | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const s = db()
    .prepare(
      `SELECT s.*, u.email, u.display_name, u.role AS user_role, u.active FROM staff_session s
       JOIN staff_user u ON u.tenant_id = s.tenant_id AND u.staff_id = s.staff_id
       WHERE s.tenant_id = ? AND s.token_hash = ?`,
    )
    .get(tenantId(), sha256(token)) as Record<string, string | number | null> | undefined;
  if (!s || s.revoked_at || String(s.expires_at) <= nowIso()) return null;
  // Idle timeout, and immediate invalidation on deactivation or role change (L13-FR-021).
  if (Date.now() - Date.parse(String(s.last_seen_at)) > IDLE_MS || !s.active || s.user_role !== s.role) {
    db().prepare("UPDATE staff_session SET revoked_at = ? WHERE tenant_id = ? AND token_hash = ?").run(nowIso(), tenantId(), String(s.token_hash));
    return null;
  }
  db().prepare("UPDATE staff_session SET last_seen_at = ? WHERE tenant_id = ? AND token_hash = ?").run(nowIso(), tenantId(), String(s.token_hash));
  return {
    staffId: String(s.staff_id),
    email: String(s.email),
    displayName: String(s.display_name),
    role: s.role as Role,
    steppedUpAt: s.stepped_up_at ? String(s.stepped_up_at) : null,
    tokenHash: String(s.token_hash),
  };
}

export async function signOut() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (token) {
    const r = db().prepare("SELECT staff_id FROM staff_session WHERE tenant_id = ? AND token_hash = ?").get(tenantId(), sha256(token)) as
      | { staff_id: string }
      | undefined;
    db().prepare("UPDATE staff_session SET revoked_at = ? WHERE tenant_id = ? AND token_hash = ?").run(nowIso(), tenantId(), sha256(token));
    if (r) audit({ action: "STAFF_SIGN_OUT", subjectType: "staff_user", subjectRef: r.staff_id, actor: r.staff_id, decision: "EXECUTED" });
  }
  (await cookies()).delete(COOKIE);
}

export function stepUp(staff: Staff, password: string): boolean {
  const u = db().prepare("SELECT password_hash FROM staff_user WHERE tenant_id = ? AND staff_id = ?").get(tenantId(), staff.staffId) as
    | { password_hash: string }
    | undefined;
  const ok = Boolean(u && checkPassword(password, u.password_hash));
  if (ok) db().prepare("UPDATE staff_session SET stepped_up_at = ? WHERE tenant_id = ? AND token_hash = ?").run(nowIso(), tenantId(), staff.tokenHash);
  audit({ action: "STAFF_STEP_UP", subjectType: "staff_user", subjectRef: staff.staffId, actor: staff.staffId, decision: ok ? "ALLOW" : "DENY" });
  return ok;
}

export function steppedUp(staff: Staff) {
  return Boolean(staff.steppedUpAt && Date.now() - Date.parse(staff.steppedUpAt) < STEP_UP_MS);
}

/** For pages: signed-in staff with permission for `action`, or redirect / no-access. Denials are audited. */
export async function requireStaff(action?: Action): Promise<Staff> {
  const staff = await currentStaff();
  if (!staff) redirect("/staff/login");
  if (action && !can(staff.role, action)) {
    audit({ action: `DENIED_${action}`, subjectType: "console", actor: staff.staffId, decision: "DENY", reason: staff.role });
    redirect("/staff?denied=1");
  }
  return staff;
}

/** For mutations: permission + step-up (when the matrix says A/E). Throws a safe message on failure. */
export function authorise(staff: Staff, action: Action) {
  if (!modeFor(staff.role, action)) {
    audit({ action: `DENIED_${action}`, subjectType: "console", actor: staff.staffId, decision: "DENY", reason: staff.role });
    throw new Error("You don't have access to do that.");
  }
  if (needsStepUp(staff.role, action) && !steppedUp(staff)) throw new Error("STEP_UP_REQUIRED");
}
