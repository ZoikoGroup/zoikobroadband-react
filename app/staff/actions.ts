"use server";

/**
 * Staff console mutations (Doc10 HS-WF-10-19..24, Doc13 §03/§06/§12).
 * Each action: signed-in staff → permission (deny by default) → step-up where the matrix says
 * A/E → resource check (assignment) → audited write. If the audit can't be written the action
 * fails (L13-QA-089). Server Actions also enforce same-origin, which covers CSRF (TH-06).
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { KNOWLEDGE_ITEMS, contentHash, knowledgeLooksInjected } from "@/app/lib/chatbot/knowledge";
import { redactSensitive } from "@/app/lib/chatbot/linko";
import { audit, db, nowIso, plusMs, seal, sha256, tenantId, uuid } from "@/app/lib/linko-db/db";
import { authorise, createStaffUser, currentStaff, signIn, signOut, Staff, stepUp, steppedUp } from "@/app/lib/linko-staff/auth";
import { Role, ROLES } from "@/app/lib/linko-staff/rbac";
import { caseById } from "@/app/lib/linko-staff/queries";

export type FormState = { error?: string; ok?: string } | null;

const str = (f: FormData, k: string, max = 500) => String(f.get(k) ?? "").trim().slice(0, max);

async function staffOrLogin(): Promise<Staff> {
  const s = await currentStaff();
  if (!s) redirect("/staff/login");
  return s;
}

/** Runs a guarded mutation and converts failures to a safe form message. */
async function guarded(fn: (s: Staff) => string | void, paths: string[]): Promise<FormState> {
  const staff = await staffOrLogin();
  try {
    const ok = fn(staff);
    paths.forEach((p) => revalidatePath(p));
    return { ok: ok || "Done." };
  } catch (e) {
    if (String((e as { digest?: string }).digest ?? "").startsWith("NEXT_REDIRECT")) throw e; // let redirects through
    const msg = (e as Error).message;
    if (msg === "STEP_UP_REQUIRED") return { error: "Please confirm your password first (step-up), then try again." };
    return { error: msg && msg.length < 200 ? msg : "That didn't work. Nothing was changed." };
  }
}

/* ───────────────────────────── Sign in / out ───────────────────────────── */

export async function signInAction(_: FormState, f: FormData): Promise<FormState> {
  const r = await signIn(str(f, "email", 254), String(f.get("password") ?? ""));
  if (!r.ok) return { error: r.message };
  redirect("/staff");
}

export async function signOutAction() {
  await signOut();
  redirect("/staff/login");
}

export async function stepUpAction(_: FormState, f: FormData): Promise<FormState> {
  const staff = await staffOrLogin();
  const ok = stepUp(staff, String(f.get("password") ?? ""));
  revalidatePath("/staff", "layout");
  return ok ? { ok: "Confirmed. You can make sensitive changes for the next few minutes." } : { error: "That password didn't match." };
}

/* ───────────────────────────── Cases (HS-WF-10-19/20) ───────────────────────────── */

function mustOwn(staff: Staff, caseId: string) {
  const c = caseById(caseId);
  if (!c) throw new Error("Case not found.");
  if (c.assignedStaffId !== staff.staffId) {
    audit({ action: "CASE_ACCESS_UNASSIGNED", subjectType: "human_handover", subjectRef: caseId, actor: staff.staffId, decision: "DENY" });
    throw new Error("Accept or be assigned this case first.");
  }
  return c;
}

export async function acceptCaseAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "caseId", 64);
  return guarded((s) => {
    authorise(s, "CASE_ACCEPT");
    const c = caseById(id);
    if (!c) throw new Error("Case not found.");
    if (c.assignedStaffId && c.assignedStaffId !== s.staffId) throw new Error("This case already has an owner. Ask a supervisor to reassign it.");
    const max = Number(process.env.LINKO_STAFF_MAX_ACTIVE_CASES || 5);
    const active = (db().prepare("SELECT count(*) AS n FROM human_handover WHERE tenant_id = ? AND assigned_staff_id = ? AND case_status IN ('ACCEPTED','OPEN')").get(tenantId(), s.staffId) as { n: number }).n;
    if (active >= max) throw new Error(`You already have ${active} open cases. Close or hand one back before accepting another.`);
    audit({ action: "CASE_ACCEPT", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    db()
      .prepare("UPDATE human_handover SET assigned_staff_id = ?, case_status = 'ACCEPTED', handoff_state = 'ACCEPTED' WHERE tenant_id = ? AND handover_id = ?")
      .run(s.staffId, tenantId(), id);
    return "Case accepted.";
  }, ["/staff", `/staff/cases/${id}`]);
}

export async function reassignCaseAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "caseId", 64);
  const to = str(f, "to", 64);
  return guarded((s) => {
    authorise(s, "CASE_REASSIGN");
    const target = db()
      .prepare("SELECT staff_id FROM staff_user WHERE tenant_id = ? AND staff_id = ? AND active = 1 AND role IN ('SUPPORT_AGENT','SUPPORT_SUPERVISOR')")
      .get(tenantId(), to);
    if (!target) throw new Error("Choose an active support colleague.");
    audit({ action: "CASE_REASSIGN", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "EXECUTED", reason: sha256(to).slice(0, 12) });
    db().prepare("UPDATE human_handover SET assigned_staff_id = ?, case_status = 'ACCEPTED' WHERE tenant_id = ? AND handover_id = ?").run(to, tenantId(), id);
    return "Case reassigned.";
  }, ["/staff", `/staff/cases/${id}`]);
}

export async function addNoteAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "caseId", 64);
  const note = str(f, "note", 2000);
  return guarded((s) => {
    authorise(s, "CASE_NOTE");
    mustOwn(s, id);
    if (!note) throw new Error("Write a note first.");
    // Card, bank, password and code details are removed before a note is stored (Doc10 no-go iv).
    const clean = redactSensitive(note).text;
    audit({ action: "CASE_NOTE_ADD", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("INSERT INTO case_note VALUES (?, ?, ?, ?, ?, ?, ?)").run(tenantId(), uuid(), id, s.staffId, seal(clean), sha256(clean), nowIso());
    return "Note added.";
  }, [`/staff/cases/${id}`]);
}

export async function escalateCaseAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "caseId", 64);
  return guarded((s) => {
    authorise(s, "CASE_ESCALATE");
    mustOwn(s, id);
    audit({ action: "CASE_ESCALATE", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    // Escalation hands the case back to the supervisor queue; only the safe summary travels (L13-QA-074).
    db().prepare("UPDATE human_handover SET case_status = 'ESCALATED', assigned_staff_id = NULL WHERE tenant_id = ? AND handover_id = ?").run(tenantId(), id);
    return "Escalated to a supervisor.";
  }, ["/staff", `/staff/cases/${id}`]);
}

export async function closeCaseAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "caseId", 64);
  return guarded((s) => {
    authorise(s, "CASE_CLOSE");
    const c = mustOwn(s, id);
    // A safety case can't be closed silently (HS-T040): a closing note is required.
    const hasNote = db().prepare("SELECT 1 FROM case_note WHERE tenant_id = ? AND handover_id = ? LIMIT 1").get(tenantId(), id);
    if (!hasNote) throw new Error("Add a note recording the outcome before closing.");
    // Complaints can't be closed from Linko (HS-WF-10-23, HS-T064): a supervisor hands them to the complaints process.
    if (c.priority === "REGULATORY") {
      if (s.role !== "SUPPORT_SUPERVISOR" || !steppedUp(s)) throw new Error("Complaint cases need a supervisor with step-up.");
      audit({ action: "COMPLAINT_HANDED_TO_PROCESS", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
      db().prepare("UPDATE human_handover SET case_status = 'ESCALATED' WHERE tenant_id = ? AND handover_id = ?").run(tenantId(), id);
      return "Handed to the complaints process. The case stays open until that process records a decision.";
    }
    audit({ action: "CASE_CLOSE", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "EXECUTED", reason: c.priority });
    db().prepare("UPDATE human_handover SET case_status = 'CLOSED' WHERE tenant_id = ? AND handover_id = ?").run(tenantId(), id);
    return "Case closed.";
  }, ["/staff", `/staff/cases/${id}`]);
}

/** Transcript access: assigned case (agent/supervisor) or evidence-only with purpose + reference (DPO/auditor). */
export async function requestTranscriptAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "caseId", 64);
  const purpose = str(f, "purpose", 64);
  const reference = str(f, "reference", 80);
  return guarded((s) => {
    authorise(s, "TRANSCRIPT_READ");
    const c = caseById(id);
    if (!c) throw new Error("Case not found.");
    const evidenceRole = s.role === "DPO_ANALYST" || s.role === "SECURITY_AUDITOR";
    const qa = s.role === "QA_ANALYST";
    if (qa && purpose !== "QUALITY_REVIEW") throw new Error("QA access is for quality review only.");
    if (!evidenceRole && !qa && c.assignedStaffId !== s.staffId) {
      audit({ action: "TRANSCRIPT_READ", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "DENY", reason: "NOT_ASSIGNED" });
      throw new Error("You can only read transcripts for cases assigned to you.");
    }
    if (!["CASE_HANDLING", "RIGHTS_REQUEST", "SECURITY_INVESTIGATION", "QUALITY_REVIEW"].includes(purpose)) throw new Error("Choose a purpose.");
    // Support staff may read a transcript only if the visitor chose to share it (Doc05 T-30, Doc13 L13-QA-071/097).
    if (!evidenceRole) {
      const shared = db().prepare("SELECT transcript_shared FROM human_handover WHERE tenant_id = ? AND handover_id = ?").get(tenantId(), id) as
        | { transcript_shared: number }
        | undefined;
      if (!shared?.transcript_shared) {
        audit({ action: "TRANSCRIPT_READ", subjectType: "human_handover", subjectRef: id, actor: s.staffId, decision: "DENY", reason: "NO_TRANSCRIPT_CONSENT" });
        throw new Error("The customer didn't agree to share this chat, so it can't be read for case handling.");
      }
    }
    // DPO access needs an open rights case; auditor access needs an open incident (Doc13 §03.2 E).
    if (s.role === "DPO_ANALYST" && !db().prepare("SELECT 1 FROM data_rights_request WHERE tenant_id = ? AND case_ref = ? AND processing_state != 'CLOSED'").get(tenantId(), reference))
      throw new Error("Give the reference of an open data-rights case.");
    if (s.role === "SECURITY_AUDITOR" && !db().prepare("SELECT 1 FROM incident WHERE tenant_id = ? AND incident_id LIKE ? AND closed_at IS NULL").get(tenantId(), `${reference}%`))
      throw new Error("Give the reference of an open incident.");
    if (evidenceRole && reference.length < 4) throw new Error("Give the rights-case or investigation reference.");
    audit({
      action: "TRANSCRIPT_READ",
      subjectType: "chat_session",
      subjectRef: c.sessionId ?? id,
      actor: s.staffId,
      decision: "ALLOW",
      purpose,
      reason: reference ? sha256(reference).slice(0, 16) : null,
    });
    // The audited ALLOW above is the grant: the case page shows the transcript only while a fresh one exists.
    redirect(`/staff/cases/${id}?transcript=1&purpose=${encodeURIComponent(purpose)}`);
  }, []);
}

/* ───────────────────────────── Incident & fallback (HS-WF-10-24) ───────────────────────────── */

export async function activateFallbackAction(_: FormState, f: FormData): Promise<FormState> {
  const reason = str(f, "reason", 300);
  const minutes = Math.min(Math.max(Number(f.get("minutes") || 60), 5), 24 * 60);
  return guarded((s) => {
    authorise(s, "OVERRIDE_AI");
    if (reason.length < 5) throw new Error("Give a reason for turning the AI off.");
    audit({ action: "AI_FALLBACK_ON", subjectType: "ops_override", actor: s.staffId, decision: "EXECUTED", reason: `${minutes}m` });
    db().prepare("INSERT INTO ops_override VALUES (?, ?, 'AI_DISABLED', ?, ?, ?, ?, NULL, NULL, NULL, NULL)").run(tenantId(), uuid(), reason, s.staffId, nowIso(), plusMs(minutes * 60_000));
    return `AI answers are off for ${minutes} minutes. Guided steps, safety routes and complaint access keep working.`;
  }, ["/staff/incident"]);
}

export async function endFallbackAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "overrideId", 64);
  return guarded((s) => {
    authorise(s, "OVERRIDE_AI");
    audit({ action: "AI_FALLBACK_OFF", subjectType: "ops_override", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("UPDATE ops_override SET ended_at = ?, ended_by = ? WHERE tenant_id = ? AND override_id = ? AND ended_at IS NULL").run(nowIso(), s.staffId, tenantId(), id);
    return "AI answers are back on (subject to the other safety checks).";
  }, ["/staff/incident"]);
}

export async function reviewOverrideAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "overrideId", 64);
  return guarded((s) => {
    authorise(s, "OVERRIDE_REVIEW");
    const o = db().prepare("SELECT created_by FROM ops_override WHERE tenant_id = ? AND override_id = ?").get(tenantId(), id) as { created_by: string } | undefined;
    if (!o) throw new Error("Override not found.");
    if (o.created_by === s.staffId) throw new Error("Someone other than the person who made the change must review it.");
    audit({ action: "AI_FALLBACK_REVIEWED", subjectType: "ops_override", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("UPDATE ops_override SET reviewed_by = ?, reviewed_at = ? WHERE tenant_id = ? AND override_id = ?").run(s.staffId, nowIso(), tenantId(), id);
    return "Review recorded.";
  }, ["/staff/incident"]);
}

export async function declareIncidentAction(_: FormState, f: FormData): Promise<FormState> {
  const title = str(f, "title", 120);
  const severity = str(f, "severity", 4);
  return guarded((s) => {
    authorise(s, "INCIDENT_DECLARE");
    if (!["SEV1", "SEV2", "SEV3"].includes(severity) || title.length < 5) throw new Error("Give a title and severity.");
    audit({ action: "INCIDENT_DECLARE", subjectType: "incident", actor: s.staffId, decision: "EXECUTED", reason: severity });
    db().prepare("INSERT INTO incident VALUES (?, ?, ?, ?, ?, ?, NULL, NULL)").run(tenantId(), uuid(), title, severity, s.staffId, nowIso());
    return "Incident declared.";
  }, ["/staff/incident"]);
}

export async function notifyOwnerAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "incidentId", 64);
  return guarded((s) => {
    authorise(s, "INCIDENT_DECLARE");
    audit({ action: "INCIDENT_OWNER_NOTIFIED", subjectType: "incident", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("UPDATE incident SET owner_notified_at = ? WHERE tenant_id = ? AND incident_id = ?").run(nowIso(), tenantId(), id);
    return "Owner notification recorded. (Send the notice through your on-call tool — Linko has no paging integration.)";
  }, ["/staff/incident"]);
}

export async function closeIncidentAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "incidentId", 64);
  return guarded((s) => {
    authorise(s, "INCIDENT_DECLARE");
    audit({ action: "INCIDENT_CLOSE", subjectType: "incident", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("UPDATE incident SET closed_at = ? WHERE tenant_id = ? AND incident_id = ?").run(nowIso(), tenantId(), id);
    return "Incident closed.";
  }, ["/staff/incident"]);
}

/* ───────────────────────────── Knowledge (Doc13 §06.1) ───────────────────────────── */

function item(id: string) {
  const k = KNOWLEDGE_ITEMS.find((x) => x.id === id);
  if (!k) throw new Error("Knowledge item not found.");
  return { k, hash: contentHash(k.text) };
}

export async function submitKnowledgeAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "itemId", 8);
  return guarded((s) => {
    authorise(s, "KNOWLEDGE_SUBMIT");
    const { hash } = item(id);
    audit({ action: "KNOWLEDGE_SUBMIT", subjectType: "knowledge_item", subjectRef: `${id}#${hash}`, actor: s.staffId, decision: "EXECUTED" });
    db()
      .prepare(
        `INSERT INTO knowledge_review VALUES (?, ?, ?, 'IN_REVIEW', ?, ?, NULL, NULL, NULL, NULL)
         ON CONFLICT(tenant_id, item_id, content_hash) DO UPDATE SET state = 'IN_REVIEW', submitted_by = excluded.submitted_by,
           submitted_at = excluded.submitted_at, approved_by = NULL, approved_at = NULL, withdrawn_by = NULL, withdrawn_at = NULL`,
      )
      .run(tenantId(), id, hash, s.staffId, nowIso());
    return "Submitted for independent review.";
  }, ["/staff/knowledge"]);
}

export async function approveKnowledgeAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "itemId", 8);
  return guarded((s) => {
    authorise(s, "KNOWLEDGE_APPROVE");
    const { hash } = item(id);
    const r = db().prepare("SELECT state, submitted_by FROM knowledge_review WHERE tenant_id = ? AND item_id = ? AND content_hash = ?").get(tenantId(), id, hash) as
      | { state: string; submitted_by: string }
      | undefined;
    if (!r || r.state !== "IN_REVIEW") throw new Error("Submit this exact version for review first.");
    if (knowledgeLooksInjected(item(id).k.text)) {
      audit({ action: "KNOWLEDGE_APPROVE", subjectType: "knowledge_item", subjectRef: `${id}#${hash}`, actor: s.staffId, decision: "DENY", reason: "INJECTION_PATTERN" });
      throw new Error("This text contains instruction-like wording and can't be approved. Edit it first.");
    }
    if (r.submitted_by === s.staffId) {
      // L13-QA-091: self-publish is blocked.
      audit({ action: "KNOWLEDGE_APPROVE", subjectType: "knowledge_item", subjectRef: `${id}#${hash}`, actor: s.staffId, decision: "DENY", reason: "SELF_APPROVAL" });
      throw new Error("A different publisher must approve content you submitted.");
    }
    audit({ action: "KNOWLEDGE_APPROVE", subjectType: "knowledge_item", subjectRef: `${id}#${hash}`, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("UPDATE knowledge_review SET state = 'APPROVED', approved_by = ?, approved_at = ? WHERE tenant_id = ? AND item_id = ? AND content_hash = ?").run(s.staffId, nowIso(), tenantId(), id, hash);
    return "Approved. Linko can use this exact version once it is in date.";
  }, ["/staff/knowledge"]);
}

export async function withdrawKnowledgeAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "itemId", 8);
  return guarded((s) => {
    authorise(s, "KNOWLEDGE_WITHDRAW");
    const { hash } = item(id);
    audit({ action: "KNOWLEDGE_WITHDRAW", subjectType: "knowledge_item", subjectRef: `${id}#${hash}`, actor: s.staffId, decision: "EXECUTED" });
    db()
      .prepare(
        `INSERT INTO knowledge_review VALUES (?, ?, ?, 'WITHDRAWN', ?, ?, NULL, NULL, ?, ?)
         ON CONFLICT(tenant_id, item_id, content_hash) DO UPDATE SET state = 'WITHDRAWN', withdrawn_by = excluded.withdrawn_by, withdrawn_at = excluded.withdrawn_at`,
      )
      .run(tenantId(), id, hash, s.staffId, nowIso(), s.staffId, nowIso());
    return "Withdrawn. Linko stops using it immediately.";
  }, ["/staff/knowledge"]);
}

/* ───────────────────────────── Privacy requests (Doc05 DM-32/33, Doc13 §07) ───────────────────────────── */

const ERASE_CLASSES = ["chat_message", "chat_slot", "answer_citation", "availability_enquiry", "chat_session", "consent_evidence", "human_handover", "complaint_ref", "business_lead_ref"];

export async function rightsDecisionAction(_: FormState, f: FormData): Promise<FormState> {
  const caseRef = str(f, "caseRef", 40);
  const decision = str(f, "decision", 12);
  const sessionRef = str(f, "sessionRef", 80);
  const legalHold = str(f, "legalHold", 80);
  return guarded((s) => {
    authorise(s, "PRIVACY_ACT");
    const r = db().prepare("SELECT * FROM data_rights_request WHERE tenant_id = ? AND case_ref = ?").get(tenantId(), caseRef) as Record<string, string> | undefined;
    if (!r) throw new Error("Case not found.");
    if (decision === "FAILED") {
      audit({ action: "DSR_VERIFICATION_FAILED", subjectType: "data_rights_request", subjectRef: caseRef, actor: s.staffId, decision: "EXECUTED" });
      db().prepare("UPDATE data_rights_request SET verification_state = 'FAILED', processing_state = 'CLOSED', completed_at = ?, case_owner_ref = ? WHERE tenant_id = ? AND case_ref = ?").run(nowIso(), s.staffId, tenantId(), caseRef);
      return "Marked as not verified and closed.";
    }
    if (decision !== "VERIFIED") throw new Error("Choose a decision.");
    // Identity is verified OUTSIDE chat by the privacy team; this records the outcome (T-39/T-40).
    audit({ action: "DSR_VERIFIED", subjectType: "data_rights_request", subjectRef: caseRef, actor: s.staffId, decision: "EXECUTED", reason: r.request_type });
    db().prepare("UPDATE data_rights_request SET verification_state = 'VERIFIED', processing_state = 'IN_PROGRESS', case_owner_ref = ? WHERE tenant_id = ? AND case_ref = ?").run(s.staffId, tenantId(), caseRef);
    if (r.request_type !== "ERASURE") return "Verified. Handle the request through the privacy process and close it when done.";
    // Erasure fan-out: one job per data class; a legal hold keeps evidence-only records (T-42).
    for (const cls of ERASE_CLASSES) {
      const hold = legalHold && ["consent_evidence", "complaint_ref"].includes(cls);
      let proof: string | null = null;
      if (!hold && sessionRef) {
        const n = db().prepare(`DELETE FROM ${cls} WHERE tenant_id = ? AND session_id = ?`).run(tenantId(), sessionRef).changes;
        proof = sha256(`${caseRef}|${cls}|${n}|${nowIso()}`);
      }
      db()
        .prepare("INSERT INTO erasure_job VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run(tenantId(), uuid(), r.request_id, cls, hold ? "RETAIN_LEGAL" : "ERASE", hold ? "HELD" : sessionRef ? "DONE" : "PENDING", hold ? legalHold : null, proof, proof ? nowIso() : null);
    }
    audit({ action: "DSR_ERASURE_RUN", subjectType: "data_rights_request", subjectRef: caseRef, actor: s.staffId, decision: "EXECUTED", reason: legalHold ? "WITH_LEGAL_HOLD" : "FULL" });
    return sessionRef ? "Erasure run recorded with proof for each data class." : "Erasure jobs created. Add the chat reference to run them.";
  }, ["/staff/privacy"]);
}

export async function closeRightsAction(_: FormState, f: FormData): Promise<FormState> {
  const caseRef = str(f, "caseRef", 40);
  return guarded((s) => {
    authorise(s, "PRIVACY_ACT");
    audit({ action: "DSR_CLOSED", subjectType: "data_rights_request", subjectRef: caseRef, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("UPDATE data_rights_request SET processing_state = 'CLOSED', completed_at = ? WHERE tenant_id = ? AND case_ref = ?").run(nowIso(), tenantId(), caseRef);
    return "Closed.";
  }, ["/staff/privacy"]);
}

/* ───────────────────────────── Staff accounts ───────────────────────────── */

export async function createStaffAction(_: FormState, f: FormData): Promise<FormState> {
  const role = str(f, "role", 40) as Role;
  return guarded((s) => {
    authorise(s, "STAFF_ADMIN");
    if (!ROLES.includes(role)) throw new Error("Choose a role.");
    const email = str(f, "email", 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error("Enter a valid work email.");
    try {
      createStaffUser({ email, displayName: str(f, "displayName", 80) || email, role, password: String(f.get("password") ?? ""), createdBy: s.staffId });
    } catch (e) {
      if (/UNIQUE/i.test((e as Error).message)) throw new Error("That email already has an account.");
      throw e;
    }
    return "Account created. Share the temporary password through a secure channel.";
  }, ["/staff/users"]);
}

export async function setStaffActiveAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "staffId", 64);
  const active = f.get("active") === "1";
  return guarded((s) => {
    authorise(s, "STAFF_ADMIN");
    if (id === s.staffId) throw new Error("You can't change your own account.");
    audit({ action: active ? "STAFF_USER_ENABLE" : "STAFF_USER_DISABLE", subjectType: "staff_user", subjectRef: id, actor: s.staffId, decision: "EXECUTED" });
    db().prepare("UPDATE staff_user SET active = ? WHERE tenant_id = ? AND staff_id = ?").run(active ? 1 : 0, tenantId(), id);
    // Disabling revokes every open session at once (L13-FR-021).
    if (!active) db().prepare("UPDATE staff_session SET revoked_at = ? WHERE tenant_id = ? AND staff_id = ? AND revoked_at IS NULL").run(nowIso(), tenantId(), id);
    return active ? "Account enabled." : "Account disabled and signed out everywhere.";
  }, ["/staff/users"]);
}

export async function changeRoleAction(_: FormState, f: FormData): Promise<FormState> {
  const id = str(f, "staffId", 64);
  const role = str(f, "role", 40) as Role;
  return guarded((s) => {
    authorise(s, "STAFF_ADMIN");
    if (!ROLES.includes(role)) throw new Error("Choose a role.");
    if (id === s.staffId) throw new Error("You can't change your own role.");
    audit({ action: "STAFF_ROLE_CHANGE", subjectType: "staff_user", subjectRef: id, actor: s.staffId, decision: "EXECUTED", reason: role });
    db().prepare("UPDATE staff_user SET role = ? WHERE tenant_id = ? AND staff_id = ?").run(role, tenantId(), id);
    // Role change ends existing sessions (they no longer match the stored role).
    return "Role changed. The person must sign in again.";
  }, ["/staff/users"]);
}
