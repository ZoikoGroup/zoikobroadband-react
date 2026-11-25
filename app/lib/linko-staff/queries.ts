/**
 * Read models for the staff console. Every query returns only the fields a screen needs
 * (Doc13 §03.3 "ALLOW returns the exact fields"); personal data is masked by default.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { KNOWLEDGE_ITEMS, approvalState, contentHash } from "@/app/lib/chatbot/knowledge";
import "@/app/lib/linko-db/knowledgeApproval";
import { db, nowIso, subjectHashFor, tenantId, unseal, verifyAuditChain } from "@/app/lib/linko-db/db";

/** A transcript may be shown only within 10 minutes of an audited, allowed access request (Doc13 TH-11 JIT access). */
export function transcriptGrant(staffId: string, subjectRef: string) {
  const since = new Date(Date.now() - 10 * 60_000).toISOString();
  return db()
    .prepare(
      `SELECT purpose_code FROM audit_event WHERE tenant_id = ? AND action_code = 'TRANSCRIPT_READ' AND decision = 'ALLOW'
       AND actor_ref = ? AND subject_ref_hash = ? AND occurred_at > ? ORDER BY seq DESC LIMIT 1`,
    )
    .get(tenantId(), staffId, subjectHashFor(subjectRef), since) as { purpose_code: string } | undefined;
}

type R = Record<string, unknown>;
const t = () => tenantId();

export const PRIORITY_ORDER = "CASE priority WHEN 'URGENT_SAFETY' THEN 0 WHEN 'REGULATORY' THEN 1 WHEN 'HIGH' THEN 2 ELSE 3 END";

export type QueueRow = {
  id: string;
  priority: string;
  reason: string;
  channel: string;
  status: string;
  topics: string[];
  createdAt: string;
  owner: string | null;
  ownedByMe: boolean;
};

/** HS-WF-10-19: P0 safety first, then regulatory, then by age (HS-T048). */
export function queue(staffId: string, filter: { status?: string; priority?: string; mine?: boolean; reason?: string }): QueueRow[] {
  const where = ["h.tenant_id = ?"];
  const args: (string | number)[] = [t()];
  if (filter.status) {
    where.push("h.case_status = ?");
    args.push(filter.status);
  } else where.push("h.case_status != 'CLOSED'");
  if (filter.reason) {
    where.push("h.reason_code = ?");
    args.push(filter.reason);
  }
  if (filter.priority) {
    where.push("h.priority = ?");
    args.push(filter.priority);
  }
  if (filter.mine) {
    where.push("h.assigned_staff_id = ?");
    args.push(staffId);
  }
  const rows = db()
    .prepare(
      `SELECT h.*, u.display_name AS owner_name FROM human_handover h
       LEFT JOIN staff_user u ON u.tenant_id = h.tenant_id AND u.staff_id = h.assigned_staff_id
       WHERE ${where.join(" AND ")} ORDER BY ${PRIORITY_ORDER}, h.created_at ASC LIMIT 200`,
    )
    .all(...args) as R[];
  return rows.map((r) => ({
    id: String(r.handover_id),
    priority: String(r.priority),
    reason: String(r.reason_code),
    channel: String(r.channel),
    status: String(r.case_status),
    topics: JSON.parse(String(r.summary_topics_json || "[]")),
    createdAt: String(r.created_at),
    owner: r.owner_name ? String(r.owner_name) : null,
    ownedByMe: r.assigned_staff_id === staffId,
  }));
}

export function queueCounts() {
  return db()
    .prepare(
      `SELECT priority, case_status, count(*) AS n FROM human_handover WHERE tenant_id = ? AND case_status != 'CLOSED' GROUP BY priority, case_status`,
    )
    .all(t()) as { priority: string; case_status: string; n: number }[];
}

export function caseById(id: string) {
  const r = db()
    .prepare(
      `SELECT h.*, u.display_name AS owner_name, s.state AS session_state, s.safety_flag, s.created_at AS session_created
       FROM human_handover h
       LEFT JOIN staff_user u ON u.tenant_id = h.tenant_id AND u.staff_id = h.assigned_staff_id
       LEFT JOIN chat_session s ON s.tenant_id = h.tenant_id AND s.session_id = h.session_id
       WHERE h.tenant_id = ? AND h.handover_id = ?`,
    )
    .get(t(), id) as R | undefined;
  if (!r) return null;
  return {
    id: String(r.handover_id),
    sessionId: r.session_id ? String(r.session_id) : null,
    sessionLive: Boolean(r.session_state),
    safetyFlag: r.safety_flag === 1,
    priority: String(r.priority),
    reason: String(r.reason_code),
    channel: String(r.channel),
    status: String(r.case_status),
    topics: JSON.parse(String(r.summary_topics_json || "[]")) as string[],
    createdAt: String(r.created_at),
    assignedStaffId: r.assigned_staff_id ? String(r.assigned_staff_id) : null,
    owner: r.owner_name ? String(r.owner_name) : null,
  };
}

export function caseChronology(handoverId: string, sessionId: string | null) {
  const notes = db()
    .prepare(
      `SELECT n.created_at, n.note_ciphertext, u.display_name FROM case_note n
       LEFT JOIN staff_user u ON u.tenant_id = n.tenant_id AND u.staff_id = n.staff_id
       WHERE n.tenant_id = ? AND n.handover_id = ? ORDER BY n.created_at`,
    )
    .all(t(), handoverId) as R[];
  const events = sessionId
    ? (db()
        .prepare("SELECT event_code, occurred_at FROM chat_event WHERE tenant_id = ? AND session_id = ? ORDER BY occurred_at LIMIT 100")
        .all(t(), sessionId) as R[])
    : [];
  return {
    notes: notes.map((n) => ({ at: String(n.created_at), by: String(n.display_name ?? "Staff"), text: unseal(n.note_ciphertext as Uint8Array) ?? "(note text unavailable)" })),
    events: events.map((e) => ({ at: String(e.occurred_at), code: String(e.event_code) })),
  };
}

/** Redacted transcript (already DLP-redacted, decrypted only for an authorised, audited read). */
export function transcript(sessionId: string) {
  const rows = db()
    .prepare("SELECT sequence_no, speaker, redacted_ciphertext, risk_label, created_at FROM chat_message WHERE tenant_id = ? AND session_id = ? ORDER BY sequence_no")
    .all(t(), sessionId) as R[];
  return rows.map((r) => ({
    seq: Number(r.sequence_no),
    speaker: String(r.speaker),
    at: String(r.created_at),
    masked: r.risk_label !== "NORMAL",
    text: unseal(r.redacted_ciphertext as Uint8Array),
  }));
}

/** Doc10 HS-WF-10-24 / §08.2: cases past their response threshold, plus denial and safety counts. */
export function breachAlerts() {
  const now = Date.now();
  const p0 = new Date(now - 15 * 60_000).toISOString();
  const reg = new Date(now - 24 * 3_600_000).toISOString();
  const overdue = db()
    .prepare(
      `SELECT handover_id, priority, created_at FROM human_handover WHERE tenant_id = ? AND case_status IN ('OPEN','ESCALATED')
       AND ((priority = 'URGENT_SAFETY' AND created_at <= ?) OR (priority = 'REGULATORY' AND created_at <= ?)) ORDER BY created_at LIMIT 50`,
    )
    .all(t(), p0, reg) as { handover_id: string; priority: string; created_at: string }[];
  const since = new Date(now - 86_400_000).toISOString();
  const denials = (db().prepare("SELECT count(*) AS n FROM audit_event WHERE tenant_id = ? AND decision = 'DENY' AND occurred_at >= ?").get(t(), since) as { n: number }).n;
  const injections = (
    db().prepare("SELECT count(*) AS n FROM chat_event WHERE tenant_id = ? AND event_code = 'SECURITY_INJECTION_SUSPECTED' AND occurred_at >= ?").get(t(), since) as { n: number }
  ).n;
  const p95 = db()
    .prepare("SELECT latency_ms FROM model_invocation WHERE tenant_id = ? AND created_at >= ? ORDER BY latency_ms")
    .all(t(), since) as { latency_ms: number }[];
  const p95ms = p95.length ? p95[Math.min(p95.length - 1, Math.floor(p95.length * 0.95))].latency_ms : null;
  return { overdue, denials, injections, p95ms };
}

/** HS-T052: a random sample of live chats whose visitors shared them, for redacted quality review. */
export function qaSample(limit = 10) {
  return db()
    .prepare(
      `SELECT h.handover_id, h.session_id, h.priority, h.reason_code FROM human_handover h
       JOIN chat_session s ON s.tenant_id = h.tenant_id AND s.session_id = h.session_id
       WHERE h.tenant_id = ? AND h.transcript_shared = 1 ORDER BY random() LIMIT ?`,
    )
    .all(t(), limit) as { handover_id: string; session_id: string; priority: string; reason_code: string }[];
}

/** Doc03 §11.2: "Not useful" answers waiting for review, with the coded reason and the redacted answer. */
export function feedbackQueue(limit = 50) {
  const rows = db()
    .prepare(
      `SELECT feedback_id, reason_code, answer_ciphertext, knowledge_ids, kb_version, created_at FROM answer_feedback
       WHERE tenant_id = ? AND rating = 'DOWN' AND review_state = 'NEW' ORDER BY created_at DESC LIMIT ?`,
    )
    .all(t(), limit) as Record<string, unknown>[];
  return rows.map((r) => ({
    id: String(r.feedback_id),
    reason: String(r.reason_code ?? "OTHER"),
    answer: unseal(r.answer_ciphertext as Uint8Array) ?? "(answer text unavailable)",
    knowledge: String(r.knowledge_ids || "none"),
    kbVersion: String(r.kb_version),
    at: String(r.created_at),
  }));
}

export function feedbackStats() {
  return db()
    .prepare(
      `SELECT sum(rating = 'UP') AS up, sum(rating = 'DOWN') AS down, sum(rating = 'DOWN' AND review_state = 'NEW') AS open
       FROM answer_feedback WHERE tenant_id = ? AND created_at >= ?`,
    )
    .get(t(), new Date(Date.now() - 30 * 86_400_000).toISOString()) as { up: number | null; down: number | null; open: number | null };
}

export function rightsRequests() {
  return db()
    .prepare(
      `SELECT r.*, (SELECT count(*) FROM erasure_job j WHERE j.tenant_id = r.tenant_id AND j.request_id = r.request_id) AS jobs
       FROM data_rights_request r WHERE r.tenant_id = ? ORDER BY r.received_at DESC LIMIT 100`,
    )
    .all(t()) as Record<string, unknown>[];
}

export function erasureJobs(requestId: string) {
  return db().prepare("SELECT * FROM erasure_job WHERE tenant_id = ? AND request_id = ? ORDER BY object_class").all(t(), requestId) as Record<string, unknown>[];
}

export function staffList() {
  return db()
    .prepare("SELECT staff_id, email, display_name, role, active, locked_until, created_at FROM staff_user WHERE tenant_id = ? ORDER BY created_at")
    .all(t()) as R[];
}

export function assignableStaff() {
  return db()
    .prepare("SELECT staff_id, display_name, role FROM staff_user WHERE tenant_id = ? AND active = 1 AND role IN ('SUPPORT_AGENT','SUPPORT_SUPERVISOR') ORDER BY display_name")
    .all(t()) as { staff_id: string; display_name: string; role: string }[];
}

/** Audit view: hashes and codes only — no names, addresses, prompts or tokens (T-43). */
export function auditEvents(limit = 200) {
  return db()
    .prepare(
      "SELECT seq, occurred_at, action_code, subject_type, substr(subject_ref_hash, 1, 12) AS subject, actor_ref, decision, purpose_code, reason_code FROM audit_event WHERE tenant_id = ? ORDER BY seq DESC LIMIT ?",
    )
    .all(t(), limit) as R[];
}

export function auditIntegrity() {
  return verifyAuditChain();
}

export function knowledgeItems() {
  return KNOWLEDGE_ITEMS.map((k) => {
    const hash = contentHash(k.text);
    const review = db()
      .prepare(
        `SELECT r.*, a.display_name AS submitter, b.display_name AS approver FROM knowledge_review r
         LEFT JOIN staff_user a ON a.tenant_id = r.tenant_id AND a.staff_id = r.submitted_by
         LEFT JOIN staff_user b ON b.tenant_id = r.tenant_id AND b.staff_id = r.approved_by
         WHERE r.tenant_id = ? AND r.item_id = ? AND r.content_hash = ?`,
      )
      .get(t(), k.id, hash) as R | undefined;
    return {
      id: k.id,
      title: k.title,
      source: k.source,
      sourceId: k.sourceId,
      reviewDue: k.reviewDue,
      effectiveTo: k.effectiveTo ?? null,
      hash,
      text: k.text,
      state: approvalState(k) ?? "DRAFT",
      submitter: review?.submitter ? String(review.submitter) : null,
      submittedBy: review?.submitted_by ? String(review.submitted_by) : null,
      approver: review?.approver ? String(review.approver) : null,
      approvedAt: review?.approved_at ? String(review.approved_at) : null,
    };
  });
}

export function overrides() {
  return db()
    .prepare(
      `SELECT o.*, a.display_name AS creator, b.display_name AS reviewer FROM ops_override o
       LEFT JOIN staff_user a ON a.tenant_id = o.tenant_id AND a.staff_id = o.created_by
       LEFT JOIN staff_user b ON b.tenant_id = o.tenant_id AND b.staff_id = o.reviewed_by
       WHERE o.tenant_id = ? ORDER BY o.created_at DESC LIMIT 50`,
    )
    .all(t()) as R[];
}

export function activeOverride() {
  return db()
    .prepare("SELECT * FROM ops_override WHERE tenant_id = ? AND kind = 'AI_DISABLED' AND ended_at IS NULL AND expires_at > ? ORDER BY created_at DESC LIMIT 1")
    .get(t(), nowIso()) as R | undefined;
}

export function incidents() {
  return db()
    .prepare(
      `SELECT i.*, u.display_name AS declarer FROM incident i LEFT JOIN staff_user u ON u.tenant_id = i.tenant_id AND u.staff_id = i.declared_by
       WHERE i.tenant_id = ? ORDER BY i.declared_at DESC LIMIT 50`,
    )
    .all(t()) as R[];
}

/** Last 24 h of model metering and outcomes, aggregated (no content). */
export function qualityStats() {
  const since = new Date(Date.now() - 86_400_000).toISOString();
  const model = db()
    .prepare(
      `SELECT count(*) AS calls, sum(input_token_count) AS input, sum(output_token_count) AS output,
              sum(CASE WHEN safety_outcome = 'BLOCKED' THEN 1 ELSE 0 END) AS blocked,
              sum(CASE WHEN safety_outcome = 'ESCALATED' THEN 1 ELSE 0 END) AS escalated,
              avg(latency_ms) AS latency, sum(coalesce(est_cost_micro_usd, 0)) AS cost
       FROM model_invocation WHERE tenant_id = ? AND created_at >= ?`,
    )
    .get(t(), since) as R;
  const sessions = db().prepare("SELECT count(*) AS n FROM chat_session WHERE tenant_id = ?").get(t()) as R;
  const safety = db()
    .prepare("SELECT count(*) AS n FROM human_handover WHERE tenant_id = ? AND priority = 'URGENT_SAFETY' AND case_status != 'CLOSED'")
    .get(t()) as R;
  return { model, liveSessions: Number(sessions.n), openSafety: Number(safety.n) };
}

export function retentionRules() {
  return db().prepare("SELECT data_class, trigger_event, retention_days, action_on_expiry, approved_by_ref FROM retention_rule WHERE tenant_id = ? ORDER BY data_class").all(t()) as R[];
}

/** Evaluation reports written by `npm run eval:linko` (scripts/out). */
export function evalRuns() {
  const dir = path.join(process.cwd(), "scripts", "out");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.startsWith("linko-eval-") && f.endsWith(".json"))
    .sort()
    .reverse()
    .slice(0, 30)
    .map((f) => {
      try {
        const j = JSON.parse(readFileSync(path.join(dir, f), "utf8"));
        return {
          file: f,
          ranAt: String(j.ranAt),
          gate: String(j.gate),
          passed: Number(j.passed),
          total: Number(j.total),
          critical: (j.criticalFailures ?? []) as string[],
          promptVersion: String(j.promptVersion),
          kbVersion: String(j.kbVersion),
          model: String(j.model),
          failures: ((j.results ?? []) as { id: string; pass: boolean; critical: boolean; failures: string[] }[]).filter((r) => !r.pass),
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as {
    file: string;
    ranAt: string;
    gate: string;
    passed: number;
    total: number;
    critical: string[];
    promptVersion: string;
    kbVersion: string;
    model: string;
    failures: { id: string; critical: boolean; failures: string[] }[];
  }[];
}

/** Mask everything but the first character of each part of an email (HS-T054). */
export function maskEmail(e: string) {
  const [user, domain] = e.split("@");
  return `${user.slice(0, 1)}***@${domain ?? ""}`;
}
