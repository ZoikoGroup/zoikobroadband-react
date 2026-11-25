/**
 * Write-through persistence for the live chat (Doc05). The in-memory store stays the
 * fast path for a turn; every durable fact is written here.
 *
 * Failure rule: a customer chat never breaks because the database is unavailable — the
 * error is logged (no content) and the turn continues. Staff actions are different: they
 * call audit() directly and fail closed if it can't be written (Doc13 L13-QA-089).
 */
import { audit, contentStorageAllowed, db, nowIso, plusMs, retentionDays, seal, sha256, sweep, tenantId, uuid, CONFIG_VERSION } from "./db";

function safely(op: string, fn: () => void) {
  try {
    fn();
  } catch (e) {
    console.error(JSON.stringify({ event: "linko_db_write_failed", op, error: (e as Error).name, code: (e as { code?: string }).code }));
  }
}

const IDLE_MS = 30 * 60 * 1000;
const MAX_LIFE_MS = 4 * 60 * 60 * 1000;

export type SessionSnapshot = {
  id: string;
  pageKey: string;
  noticeVersion?: string;
  state: string;
  intent: string | null;
  topics: string[];
  safetyFlag: boolean;
  userTurns: number;
};

export function persistSessionCreated(s: SessionSnapshot) {
  safely("session_create", () => {
    sweep();
    db()
      .prepare(
        `INSERT INTO chat_session (tenant_id, session_id, config_id, state, trust_level, principal_ref, page_key, intent,
          topics_json, safety_flag, user_turns, created_at, expires_at, delete_after_at, closed_at)
         VALUES (?, ?, ?, ?, 0, NULL, ?, NULL, '[]', 0, 0, ?, ?, ?, NULL)`,
      )
      .run(tenantId(), s.id, CONFIG_VERSION, s.state, s.pageKey.slice(0, 200), nowIso(), plusMs(IDLE_MS), plusMs(MAX_LIFE_MS));
    // DM-08: every session starts on the standard storage rule under the current notice version.
    db()
      .prepare("INSERT INTO privacy_preference VALUES (?, ?, ?, 'STANDARD', ?, ?, ?)")
      .run(tenantId(), uuid(), s.id, s.noticeVersion ?? "unknown", nowIso(), plusMs(MAX_LIFE_MS));
  });
}

/** DM-08: the visitor's transcript choice. OPT_OUT stops message storage and deletes what was stored. */
export function setTranscriptChoice(sessionId: string, choice: "STANDARD" | "OPT_OUT", noticeVersion: string) {
  safely("privacy_preference", () => {
    db().prepare("INSERT INTO privacy_preference VALUES (?, ?, ?, ?, ?, ?, ?)").run(tenantId(), uuid(), sessionId, choice, noticeVersion, nowIso(), plusMs(MAX_LIFE_MS));
    if (choice === "OPT_OUT") db().prepare("DELETE FROM chat_message WHERE tenant_id = ? AND session_id = ?").run(tenantId(), sessionId);
    audit({ action: "TRANSCRIPT_CHOICE", subjectType: "chat_session", subjectRef: sessionId, actor: "visitor", decision: "EXECUTED", reason: choice });
  });
}

export function transcriptOptedOut(sessionId: string): boolean {
  try {
    const r = db()
      .prepare("SELECT transcript_choice FROM privacy_preference WHERE tenant_id = ? AND session_id = ? ORDER BY recorded_at DESC LIMIT 1")
      .get(tenantId(), sessionId) as { transcript_choice?: string } | undefined;
    return r?.transcript_choice === "OPT_OUT";
  } catch {
    return false;
  }
}

/* ─────────────── DM-06 slots (short TTL, purged when the intent changes) ─────────────── */

export function persistSlot(sessionId: string, key: string, kind: "TEXT" | "INT" | "REF" | "BOOLEAN", value: string) {
  safely("slot", () => {
    const d = db();
    d.prepare("DELETE FROM chat_slot WHERE tenant_id = ? AND session_id = ? AND slot_key = ?").run(tenantId(), sessionId, key);
    d.prepare("INSERT INTO chat_slot VALUES (?, ?, ?, ?, ?, ?, NULL, ?)").run(tenantId(), uuid(), sessionId, key.slice(0, 72), kind, seal(value), plusMs(IDLE_MS));
  });
}

/** T-38: slots tied to an intent are purged when the visitor moves to another intent (the safety flag persists). */
export function clearIntentSlots(sessionId: string) {
  safely("slot_clear", () => {
    db().prepare("DELETE FROM chat_slot WHERE tenant_id = ? AND session_id = ? AND slot_key NOT IN ('safety_flag')").run(tenantId(), sessionId);
  });
}

/* ─────────────── DM-10/11/12 availability (encrypted, short TTL) ─────────────── */

export function persistEnquiry(sessionId: string, postcode: string, status: "PENDING" | "COMPLETE" | "ERROR", correlationRef: string, ttlMs: number) {
  let id: string | null = null;
  safely("enquiry", () => {
    id = uuid();
    db().prepare("INSERT INTO availability_enquiry VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(tenantId(), id, sessionId, seal(postcode), status, nowIso(), plusMs(ttlMs), correlationRef);
  });
  return id as string | null;
}

export function persistCandidate(enquiryId: string, addressRef: string, label: string, ttlMs: number) {
  safely("candidate", () => {
    db().prepare("INSERT INTO address_candidate VALUES (?, ?, ?, 'BT', ?, ?, NULL, ?)").run(tenantId(), addressRef, enquiryId, addressRef.slice(0, 180), seal(label), plusMs(ttlMs));
  });
}

export function persistQualification(addressRef: string, eligibility: "ELIGIBLE" | "INELIGIBLE" | "UNKNOWN", sourceRef: string | null, validUntil: string, reason: string | null) {
  safely("qualification", () => {
    const c = db().prepare("SELECT enquiry_id FROM address_candidate WHERE tenant_id = ? AND candidate_id = ?").get(tenantId(), addressRef) as { enquiry_id: string } | undefined;
    if (!c) return;
    db().prepare("UPDATE address_candidate SET selected_at = ? WHERE tenant_id = ? AND candidate_id = ?").run(nowIso(), tenantId(), addressRef);
    db()
      .prepare("INSERT INTO service_qualification VALUES (?, ?, ?, ?, 'BT', ?, ?, ?, ?, ?)")
      .run(tenantId(), uuid(), c.enquiry_id, addressRef, eligibility, sourceRef, nowIso(), validUntil, reason);
  });
}

export function persistSwitchGuidance(sessionId: string | null, journey: "RESIDENTIAL_OTS" | "BUSINESS", version: string, outcome: "INFO_ONLY" | "HANDOFF" | "UNSUPPORTED") {
  safely("switch_guidance", () => {
    db().prepare("INSERT INTO switch_guidance_ref VALUES (?, ?, ?, ?, ?, ?, ?)").run(tenantId(), uuid(), sessionId, journey, version, outcome, nowIso());
  });
}

/** Answer feedback for staff review (Doc03 §11.2). The answer text is redacted and encrypted. */
export function persistFeedback(f: {
  sessionId: string;
  rating: "UP" | "DOWN";
  reason: "WRONG" | "NOT_ANSWERED" | "UNCLEAR" | "OTHER" | null;
  redactedAnswer: string;
  knowledgeIds: string[];
  kbVersion: string;
}): string | null {
  let id: string | null = null;
  safely("feedback", () => {
    const fid = uuid();
    db()
      .prepare(
        "INSERT INTO answer_feedback (tenant_id, feedback_id, session_id, rating, reason_code, answer_ciphertext, knowledge_ids, kb_version, created_at) VALUES (?,?,?,?,?,?,?,?,?)",
      )
      .run(tenantId(), fid, f.sessionId, f.rating, f.reason, seal(f.redactedAnswer), f.knowledgeIds.join(","), f.kbVersion, nowIso());
    id = fid;
  });
  return id;
}

/** DM-24: which approved knowledge version an AI answer cited. */
export function persistCitations(sessionId: string, seq: number, cites: { id: string; versionHash: string }[]) {
  safely("citation", () => {
    for (const c of cites)
      db().prepare("INSERT INTO answer_citation VALUES (?, ?, ?, ?, ?, ?, 'INDICATIVE', ?)").run(tenantId(), uuid(), sessionId, seq, c.id, c.versionHash, nowIso());
  });
}

export function persistSessionUpdate(s: SessionSnapshot) {
  safely("session_update", () => {
    db()
      .prepare(
        `UPDATE chat_session SET state = ?, intent = ?, topics_json = ?, safety_flag = ?, user_turns = ?, expires_at = ?
         WHERE tenant_id = ? AND session_id = ?`,
      )
      .run(s.state, s.intent, JSON.stringify(s.topics.slice(0, 20)), s.safetyFlag ? 1 : 0, s.userTurns, plusMs(IDLE_MS), tenantId(), s.id);
  });
}

/** Close or expiry: erase the session, its messages and slots now (Doc01 WF-18, Doc05 CF-08). Audit is untouched. */
export function purgeSession(sessionId: string, reason: "CLOSE" | "EXPIRE") {
  safely("session_purge", () => {
    const d = db();
    d.prepare("DELETE FROM chat_message WHERE tenant_id = ? AND session_id = ?").run(tenantId(), sessionId);
    d.prepare("DELETE FROM chat_slot WHERE tenant_id = ? AND session_id = ?").run(tenantId(), sessionId);
    d.prepare("DELETE FROM chat_session WHERE tenant_id = ? AND session_id = ?").run(tenantId(), sessionId);
    persistEvent(sessionId, reason === "CLOSE" ? "SESSION_CLOSED" : "SESSION_EXPIRED", null, {});
  });
}

/** Stores one already-redacted message as ciphertext only (DM-04). Without LINKO_DATA_KEY only the digest is kept. */
export function persistMessage(sessionId: string, seq: number, speaker: "USER" | "ASSISTANT", redactedText: string, piiMasked: boolean) {
  safely("message", () => {
    // MESSAGE_CONTENT retention is "on close"; the session's absolute max life is the hard backstop.
    const days = retentionDays("MESSAGE_CONTENT");
    if (days === null) return; // T-54: no approved/proposed rule → don't store content at all
    if (!contentStorageAllowed()) return; // production: only once the DPO has approved retention
    if (transcriptOptedOut(sessionId)) return; // DM-08 OPT_OUT: the visitor asked us not to keep the chat
    const deleteAfter = plusMs(MAX_LIFE_MS);
    db()
      .prepare(
        `INSERT OR IGNORE INTO chat_message (tenant_id, message_id, session_id, sequence_no, speaker, redacted_ciphertext,
          content_sha256, risk_label, created_at, delete_after_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(tenantId(), uuid(), sessionId, seq, speaker, seal(redactedText), sha256(redactedText), piiMasked ? "PII_MASKED" : "NORMAL", nowIso(), deleteAfter);
  });
}

const SAFE_ATTR = /^[A-Za-z0-9_:.\- ]{0,64}$/;

/** Telemetry without payload: only allowlisted scalar attributes (DM-05). */
export function persistEvent(sessionId: string, code: string, screen: string | null, attrs: Record<string, string | number | boolean>) {
  safely("event", () => {
    const safe: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (typeof v === "string" && !SAFE_ATTR.test(v)) continue;
      safe[k.slice(0, 40)] = v;
    }
    db()
      .prepare("INSERT INTO chat_event VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(tenantId(), uuid(), sessionId, code.slice(0, 64), screen ? screen.slice(0, 16) : null, JSON.stringify(safe), nowIso());
  });
}

/** Consent evidence: purpose + notice version + action + a non-reversible proof digest (DM-09). */
export function persistConsent(sessionId: string | null, purposeCode: string, noticeVersion: string, action: "GRANT" | "WITHDRAW", proofMaterial: string) {
  let id: string | null = null;
  safely("consent", () => {
    id = uuid();
    db()
      .prepare("INSERT INTO consent_evidence VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      .run(tenantId(), id, sessionId, purposeCode, noticeVersion, action, nowIso(), sha256(`${purposeCode}|${noticeVersion}|${proofMaterial}`));
    audit({ action: `CONSENT_${action}`, subjectType: "consent_evidence", subjectRef: id, actor: "visitor", decision: "EXECUTED", purpose: purposeCode });
  });
  return id as string | null;
}

export function persistHandover(h: {
  sessionId: string | null;
  channel: string;
  priority: "NORMAL" | "HIGH" | "URGENT_SAFETY" | "REGULATORY";
  reason: string;
  topics: string[];
  transcriptShared: boolean;
  consentRef?: string | null;
}) {
  let id: string | null = null;
  safely("handover", () => {
    id = uuid();
    // Recorded in the staff queue (REQUESTED). The visitor is told it isn't a live transfer (no adapter).
    db()
      .prepare(
        `INSERT INTO human_handover (tenant_id, handover_id, session_id, support_ref, channel, transcript_shared, priority,
          handoff_state, reason_code, summary_topics_json, case_status, assigned_staff_id, consent_ref, created_at)
         VALUES (?, ?, ?, NULL, ?, ?, ?, 'REQUESTED', ?, ?, 'OPEN', NULL, ?, ?)`,
      )
      .run(tenantId(), id, h.sessionId, h.channel, h.transcriptShared ? 1 : 0, h.priority, h.reason, JSON.stringify(h.topics.slice(0, 8)), h.consentRef ?? null, nowIso());
    audit({ action: "HANDOVER_REQUESTED", subjectType: "human_handover", subjectRef: id, actor: "visitor", decision: "EXECUTED", reason: h.priority });
  });
  return id;
}

/** HS-T056: the visitor withdraws a shared summary — topics are removed and the withdrawal is evidenced. */
export function withdrawHandoverSummary(handoverId: string, noticeVersion: string) {
  safely("handover_withdraw", () => {
    const r = db().prepare("SELECT session_id FROM human_handover WHERE tenant_id = ? AND handover_id = ?").get(tenantId(), handoverId) as { session_id: string | null } | undefined;
    if (!r) return;
    db().prepare("UPDATE human_handover SET summary_topics_json = '[]', transcript_shared = 0 WHERE tenant_id = ? AND handover_id = ?").run(tenantId(), handoverId);
    persistConsent(r.session_id, "SHARE_SUMMARY_WITH_SUPPORT", noticeVersion, "WITHDRAW", handoverId);
    audit({ action: "HANDOVER_SUMMARY_WITHDRAWN", subjectType: "human_handover", subjectRef: handoverId, actor: "visitor", decision: "EXECUTED" });
  });
}

export function persistLead(sessionId: string | null, band: string, status: "PENDING" | "ACCEPTED" | "FAILED", crmRef: string | null) {
  safely("lead", () => {
    const id = uuid();
    db().prepare("INSERT INTO business_lead_ref VALUES (?, ?, ?, ?, ?, ?, ?)").run(tenantId(), id, sessionId, crmRef, band, status, nowIso());
    audit({ action: "BUSINESS_LEAD", subjectType: "business_lead_ref", subjectRef: id, actor: "visitor", decision: "EXECUTED", reason: status });
  });
}

export function persistComplaint(sessionId: string | null, state: "REQUESTED" | "ACCEPTED" | "UNKNOWN", crmRef: string | null) {
  safely("complaint", () => {
    const id = uuid();
    db().prepare("INSERT INTO complaint_ref VALUES (?, ?, ?, ?, ?, ?)").run(tenantId(), id, sessionId, crmRef, state, nowIso());
    audit({ action: "COMPLAINT_REF", subjectType: "complaint_ref", subjectRef: id, actor: "visitor", decision: "EXECUTED", reason: state });
  });
}

export function persistModelInvocation(m: {
  sessionId: string | null;
  provider: string;
  model: string;
  promptVersion: string;
  requestId?: string;
  input: number;
  output: number;
  cacheWrite: number;
  cacheRead: number;
  estimated: boolean;
  costUsd?: number;
  outcome: "PASSED" | "ESCALATED" | "BLOCKED";
  latencyMs: number;
}) {
  safely("model_invocation", () => {
    // UNIQUE(provider_request_id) deduplicates metering on retries (Doc14 AT14-027).
    db()
      .prepare(
        `INSERT OR IGNORE INTO model_invocation (tenant_id, invocation_id, session_id, provider_code, model_ref, prompt_policy_version, provider_request_id,
          input_token_count, output_token_count, cache_write_token_count, cache_read_token_count, usage_estimated, est_cost_micro_usd, safety_outcome,
          latency_ms, created_at, cost_currency) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'USD')`,
      )
      .run(
        tenantId(),
        uuid(),
        m.sessionId,
        m.provider,
        m.model,
        m.promptVersion,
        m.requestId ?? null,
        Math.max(0, m.input),
        Math.max(0, m.output),
        m.cacheWrite,
        m.cacheRead,
        m.estimated ? 1 : 0,
        m.costUsd === undefined ? null : Math.round(m.costUsd * 1e6),
        m.outcome,
        m.latencyMs,
        nowIso(),
      );
  });
}

export function persistToolInvocation(sessionId: string | null, operationId: string, decision: "ALLOW" | "DENY" | "STEP_UP", requestDigest: string, result: "SUCCESS" | "DENIED" | "TIMEOUT" | "UNKNOWN") {
  safely("tool_invocation", () => {
    db().prepare("INSERT INTO tool_invocation VALUES (?,?,?,?,?,?,?,?,?)").run(tenantId(), uuid(), sessionId, null, operationId, decision, requestDigest, result, nowIso());
  });
}

/** Durable idempotency lookup (T-47): used when the in-memory record is gone (restart, other process). */
export function findIdempotency(operation: string, keyDigest: string) {
  try {
    return db()
      .prepare("SELECT request_digest, status FROM idempotency_record WHERE tenant_id = ? AND operation_code = ? AND key_digest = ? AND expires_at > ?")
      .get(tenantId(), operation, keyDigest, nowIso()) as { request_digest: string; status: string } | undefined;
  } catch {
    return undefined;
  }
}

export function persistIdempotency(operation: string, keyDigest: string, requestDigest: string, status: "IN_PROGRESS" | "DONE" | "ERROR", responseDigest?: string) {
  safely("idempotency", () => {
    db()
      .prepare(
        `INSERT INTO idempotency_record VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(tenant_id, operation_code, key_digest) DO UPDATE SET status = excluded.status, response_digest = excluded.response_digest`,
      )
      .run(tenantId(), uuid(), operation, keyDigest, requestDigest, responseDigest ?? null, status, plusMs(24 * 3600 * 1000));
  });
}

/** Is an unexpired staff kill-switch override active? (Doc10 HS-WF-10-24 "Activate fallback", HS-T063). */
export function aiOverrideActive(): boolean {
  try {
    const r = db()
      .prepare("SELECT 1 FROM ops_override WHERE tenant_id = ? AND kind = 'AI_DISABLED' AND ended_at IS NULL AND expires_at > ? LIMIT 1")
      .get(tenantId(), nowIso());
    return Boolean(r);
  } catch {
    // Can't confirm the kill switch is off → treat it as on (fail closed).
    return true;
  }
}
