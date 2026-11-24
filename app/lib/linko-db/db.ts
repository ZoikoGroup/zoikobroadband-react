/**
 * Linko database (Doc05 Database Schema and ERD), SQLite via Node's built-in driver.
 *
 *  - File: LINKO_DB_PATH (default .data/linko.db, git-ignored). Server-only.
 *  - Doc05 targets PostgreSQL `linko.*`; types are mapped for SQLite: uuid/timestamptz → TEXT
 *    (ISO-8601 UTC), bytea → BLOB, jsonb/text[] → TEXT JSON, enums → CHECK IN (...).
 *  - Single tenant: one tenant row, and every table carries tenant_id in its key (§05 intro, DM-01/02 inv).
 *  - Redacted message text is stored ONLY as AES-256-GCM ciphertext (DM-04 inv, §10.2) using
 *    LINKO_DATA_KEY (base64, 32 bytes). Without a key no message text is stored at all — only
 *    its SHA-256. Keys never live in SQL.
 *  - Never stored: card data, CVC, bank details, passwords, OAuth tokens, API keys (§01, DM-03 inv).
 *  - audit_event is append-only and hash-chained (DM-31, T-44).
 *  - Retention: retention_rule rows drive every purge; a missing rule fails closed (T-54).
 */
import { DatabaseSync } from "node:sqlite";
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";

type Row = Record<string, unknown>;

const g = globalThis as unknown as { __linkoDb?: DatabaseSync; __linkoDbTenant?: string; __linkoLastSweep?: number };

export const nowIso = () => new Date().toISOString();
export const uuid = () => randomUUID();
export const sha256 = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");

/* ───────────────────────────────── Schema ───────────────────────────────── */

// Versioned, forward-only migrations (Doc05 §14.2). Each runs once, in a transaction.

const DDL = `
CREATE TABLE IF NOT EXISTS schema_version (version INTEGER NOT NULL, applied_at TEXT NOT NULL);

-- DM-01 tenant
CREATE TABLE IF NOT EXISTS tenant (
  tenant_id TEXT PRIMARY KEY,
  operator_code TEXT NOT NULL UNIQUE CHECK(length(operator_code) <= 48),
  display_name TEXT NOT NULL CHECK(length(display_name) <= 120),
  locale TEXT NOT NULL DEFAULT 'en-GB',
  lifecycle_status TEXT NOT NULL CHECK(lifecycle_status IN ('ACTIVE','SUSPENDED','RETIRED')),
  created_at TEXT NOT NULL
);

-- DM-02 assistant_config (immutable once published; new versions instead of updates)
CREATE TABLE IF NOT EXISTS assistant_config (
  tenant_id TEXT NOT NULL REFERENCES tenant(tenant_id),
  config_id TEXT NOT NULL,
  assistant_name TEXT NOT NULL CHECK(length(assistant_name) <= 40),
  config_version TEXT NOT NULL CHECK(length(config_version) <= 40),
  guardrail_policy_ref TEXT NOT NULL,
  published_at TEXT NOT NULL,
  lifecycle_status TEXT NOT NULL CHECK(lifecycle_status IN ('DRAFT','APPROVED','RETIRED')),
  PRIMARY KEY (tenant_id, config_id),
  UNIQUE (tenant_id, config_version)
);

-- DM-03 chat_session. page_key/intent/topics/safety_flag/counters are an extension (Doc05 gap):
-- allowlisted values only, no free text, purged with the session.
CREATE TABLE IF NOT EXISTS chat_session (
  tenant_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  config_id TEXT NOT NULL,
  state TEXT NOT NULL,
  trust_level INTEGER NOT NULL DEFAULT 0 CHECK(trust_level IN (0,1,2)),
  principal_ref TEXT,
  page_key TEXT,
  intent TEXT,
  topics_json TEXT NOT NULL DEFAULT '[]',
  safety_flag INTEGER NOT NULL DEFAULT 0,
  user_turns INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  delete_after_at TEXT NOT NULL,
  closed_at TEXT,
  PRIMARY KEY (tenant_id, session_id),
  FOREIGN KEY (tenant_id, config_id) REFERENCES assistant_config(tenant_id, config_id)
);

-- DM-04 chat_message (encrypted redacted text only; own TTL)
CREATE TABLE IF NOT EXISTS chat_message (
  tenant_id TEXT NOT NULL,
  message_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  sequence_no INTEGER NOT NULL,
  speaker TEXT NOT NULL CHECK(speaker IN ('USER','ASSISTANT','TOOL_SUMMARY')),
  redacted_ciphertext BLOB,
  content_sha256 TEXT NOT NULL CHECK(length(content_sha256) = 64),
  risk_label TEXT NOT NULL CHECK(risk_label IN ('NORMAL','PII_MASKED','BLOCKED')),
  created_at TEXT NOT NULL,
  delete_after_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, message_id),
  UNIQUE (tenant_id, session_id, sequence_no),
  FOREIGN KEY (tenant_id, session_id) REFERENCES chat_session(tenant_id, session_id) ON DELETE CASCADE
);

-- DM-05 chat_event (no payload; allowlisted scalars only)
CREATE TABLE IF NOT EXISTS chat_event (
  tenant_id TEXT NOT NULL,
  event_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  event_code TEXT NOT NULL CHECK(length(event_code) <= 64),
  screen_ref TEXT CHECK(screen_ref IS NULL OR length(screen_ref) <= 16),
  safe_attributes TEXT NOT NULL DEFAULT '{}',
  occurred_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, event_id)
);
CREATE INDEX IF NOT EXISTS ix_chat_event_session ON chat_event(tenant_id, session_id);

-- DM-06 chat_slot (short TTL; purged at intent exit)
CREATE TABLE IF NOT EXISTS chat_slot (
  tenant_id TEXT NOT NULL,
  slot_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  slot_key TEXT NOT NULL CHECK(length(slot_key) <= 72),
  value_kind TEXT NOT NULL CHECK(value_kind IN ('TEXT','INT','REF','BOOLEAN')),
  encrypted_value BLOB,
  reference_value TEXT CHECK(reference_value IS NULL OR length(reference_value) <= 220),
  expires_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, slot_id),
  FOREIGN KEY (tenant_id, session_id) REFERENCES chat_session(tenant_id, session_id) ON DELETE CASCADE
);

-- DM-08 privacy_preference
CREATE TABLE IF NOT EXISTS privacy_preference (
  tenant_id TEXT NOT NULL,
  preference_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  transcript_choice TEXT NOT NULL CHECK(transcript_choice IN ('STANDARD','OPT_OUT')),
  privacy_notice_version TEXT NOT NULL,
  recorded_at TEXT NOT NULL,
  effective_until TEXT NOT NULL,
  PRIMARY KEY (tenant_id, preference_id)
);

-- DM-09 consent_evidence (proof only; no contact details)
CREATE TABLE IF NOT EXISTS consent_evidence (
  tenant_id TEXT NOT NULL,
  consent_id TEXT NOT NULL,
  session_id TEXT,
  purpose_code TEXT NOT NULL CHECK(length(purpose_code) <= 64),
  notice_version TEXT NOT NULL,
  action TEXT NOT NULL CHECK(action IN ('GRANT','WITHDRAW')),
  recorded_at TEXT NOT NULL,
  proof_digest TEXT NOT NULL CHECK(length(proof_digest) = 64),
  PRIMARY KEY (tenant_id, consent_id)
);

-- DM-14 business_lead_ref (no contact PII — the CRM owns it, T-19)
CREATE TABLE IF NOT EXISTS business_lead_ref (
  tenant_id TEXT NOT NULL,
  lead_link_id TEXT NOT NULL,
  session_id TEXT,
  crm_lead_ref TEXT,
  premises_count_band TEXT,
  handoff_status TEXT NOT NULL CHECK(handoff_status IN ('PENDING','ACCEPTED','FAILED')),
  recorded_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, lead_link_id)
);

-- DM-19 human_handover. reason_code, summary_topics_json, case_status and assigned_staff_id
-- are an extension for the staff console (Doc10 HS-WF-10-19); summary is allowlisted topics only (T-30).
CREATE TABLE IF NOT EXISTS human_handover (
  tenant_id TEXT NOT NULL,
  handover_id TEXT NOT NULL,
  session_id TEXT,
  support_ref TEXT,
  channel TEXT NOT NULL CHECK(channel IN ('LIVE_CHAT','CALLBACK','TICKET','PHONE','ANY')),
  transcript_shared INTEGER NOT NULL DEFAULT 0,
  priority TEXT NOT NULL CHECK(priority IN ('NORMAL','URGENT_SAFETY','REGULATORY')),
  handoff_state TEXT NOT NULL CHECK(handoff_state IN ('REQUESTED','ACCEPTED','FAILED')),
  reason_code TEXT NOT NULL,
  summary_topics_json TEXT NOT NULL DEFAULT '[]',
  case_status TEXT NOT NULL DEFAULT 'OPEN' CHECK(case_status IN ('OPEN','ACCEPTED','ESCALATED','CLOSED')),
  assigned_staff_id TEXT,
  created_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, handover_id)
);
CREATE INDEX IF NOT EXISTS ix_handover_queue ON human_handover(tenant_id, case_status, priority, created_at);

-- DM-20 complaint_ref
CREATE TABLE IF NOT EXISTS complaint_ref (
  tenant_id TEXT NOT NULL,
  complaint_link_id TEXT NOT NULL,
  session_id TEXT,
  crm_case_ref TEXT,
  submission_state TEXT NOT NULL CHECK(submission_state IN ('REQUESTED','ACCEPTED','UNKNOWN')),
  recorded_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, complaint_link_id)
);

-- DM-25 model_invocation (no prompts or outputs)
CREATE TABLE IF NOT EXISTS model_invocation (
  tenant_id TEXT NOT NULL,
  invocation_id TEXT NOT NULL,
  session_id TEXT,
  provider_code TEXT NOT NULL,
  model_ref TEXT NOT NULL,
  prompt_policy_version TEXT NOT NULL,
  provider_request_id TEXT,
  input_token_count INTEGER NOT NULL CHECK(input_token_count >= 0),
  output_token_count INTEGER NOT NULL CHECK(output_token_count >= 0),
  cache_write_token_count INTEGER NOT NULL DEFAULT 0,
  cache_read_token_count INTEGER NOT NULL DEFAULT 0,
  usage_estimated INTEGER NOT NULL DEFAULT 0,
  est_cost_micro_usd INTEGER,
  safety_outcome TEXT NOT NULL CHECK(safety_outcome IN ('PASSED','ESCALATED','BLOCKED')),
  latency_ms INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, invocation_id),
  UNIQUE (tenant_id, provider_request_id)
);

-- DM-26 tool_invocation
CREATE TABLE IF NOT EXISTS tool_invocation (
  tenant_id TEXT NOT NULL,
  tool_call_id TEXT NOT NULL,
  session_id TEXT,
  model_invocation_id TEXT,
  operation_id TEXT NOT NULL CHECK(length(operation_id) <= 24),
  auth_decision TEXT NOT NULL CHECK(auth_decision IN ('ALLOW','DENY','STEP_UP')),
  request_digest TEXT NOT NULL,
  result_status TEXT NOT NULL CHECK(result_status IN ('SUCCESS','DENIED','TIMEOUT','UNKNOWN')),
  occurred_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, tool_call_id)
);

-- DM-30 idempotency_record (digests only; no response bodies)
CREATE TABLE IF NOT EXISTS idempotency_record (
  tenant_id TEXT NOT NULL,
  idempotency_id TEXT NOT NULL,
  operation_code TEXT NOT NULL,
  key_digest TEXT NOT NULL,
  request_digest TEXT NOT NULL,
  response_digest TEXT,
  status TEXT NOT NULL CHECK(status IN ('IN_PROGRESS','DONE','ERROR')),
  expires_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, idempotency_id),
  UNIQUE (tenant_id, operation_code, key_digest)
);

-- DM-31 audit_event (append-only, hash-chained; no names, addresses, cards, prompts or tokens — T-43)
CREATE TABLE IF NOT EXISTS audit_event (
  tenant_id TEXT NOT NULL,
  audit_id TEXT NOT NULL,
  seq INTEGER NOT NULL,
  action_code TEXT NOT NULL CHECK(length(action_code) <= 100),
  subject_type TEXT NOT NULL,
  subject_ref_hash TEXT,
  actor_ref TEXT NOT NULL,
  decision TEXT NOT NULL CHECK(decision IN ('ALLOW','DENY','EXECUTED')),
  purpose_code TEXT,
  reason_code TEXT,
  environment TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  prev_hash TEXT NOT NULL,
  tamper_evidence_hash TEXT NOT NULL,
  PRIMARY KEY (tenant_id, audit_id),
  UNIQUE (tenant_id, seq)
);
CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit_event BEGIN SELECT RAISE(ABORT, 'audit_event is append-only'); END;
CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit_event BEGIN SELECT RAISE(ABORT, 'audit_event is append-only'); END;

-- DM-32 data_rights_request / DM-33 erasure_job (identity verified outside chat)
CREATE TABLE IF NOT EXISTS data_rights_request (
  tenant_id TEXT NOT NULL,
  request_id TEXT NOT NULL,
  request_type TEXT NOT NULL CHECK(request_type IN ('ACCESS','ERASURE','RECTIFICATION','RESTRICTION')),
  subject_ref_hash TEXT NOT NULL,
  verification_state TEXT NOT NULL CHECK(verification_state IN ('PENDING','VERIFIED','FAILED')),
  case_owner_ref TEXT,
  case_ref TEXT,
  processing_state TEXT NOT NULL CHECK(processing_state IN ('OPEN','IN_PROGRESS','CLOSED')),
  received_at TEXT NOT NULL,
  completed_at TEXT,
  PRIMARY KEY (tenant_id, request_id)
);
CREATE TABLE IF NOT EXISTS erasure_job (
  tenant_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  request_id TEXT NOT NULL,
  object_class TEXT NOT NULL,
  action TEXT NOT NULL CHECK(action IN ('ERASE','ANONYMISE','RETAIN_LEGAL')),
  state TEXT NOT NULL CHECK(state IN ('PENDING','DONE','HELD','FAILED')),
  legal_hold_ref TEXT,
  completion_proof_hash TEXT,
  completed_at TEXT,
  PRIMARY KEY (tenant_id, job_id),
  FOREIGN KEY (tenant_id, request_id) REFERENCES data_rights_request(tenant_id, request_id)
);

-- DM-34 retention_rule (proposals until the DPO approves; missing rule → fail closed, T-54)
CREATE TABLE IF NOT EXISTS retention_rule (
  tenant_id TEXT NOT NULL,
  rule_id TEXT NOT NULL,
  data_class TEXT NOT NULL,
  trigger_event TEXT NOT NULL CHECK(trigger_event IN ('CLOSE','EXPIRE','LAST_ACTION','APPROVAL_END')),
  retention_days REAL NOT NULL,
  action_on_expiry TEXT NOT NULL CHECK(action_on_expiry IN ('ERASE','ANONYMISE','REVIEW')),
  policy_version TEXT NOT NULL,
  approved_by_ref TEXT,
  effective_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, rule_id),
  UNIQUE (tenant_id, data_class)
);

/* ───────────── Staff console (Doc10 HS-WF-10-19..24, Doc13 §03) ───────────── */

CREATE TABLE IF NOT EXISTS staff_user (
  tenant_id TEXT NOT NULL,
  staff_id TEXT NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('SUPPORT_AGENT','SUPPORT_SUPERVISOR','DPO_ANALYST','KNOWLEDGE_PUBLISHER','SECURITY_AUDITOR','PLATFORM_ADMIN')),
  password_hash TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  created_at TEXT NOT NULL,
  created_by TEXT NOT NULL,
  PRIMARY KEY (tenant_id, staff_id),
  UNIQUE (tenant_id, email)
);
CREATE TABLE IF NOT EXISTS staff_session (
  tenant_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  staff_id TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  stepped_up_at TEXT,
  revoked_at TEXT,
  PRIMARY KEY (tenant_id, token_hash)
);
CREATE TABLE IF NOT EXISTS case_note (
  tenant_id TEXT NOT NULL,
  note_id TEXT NOT NULL,
  handover_id TEXT NOT NULL,
  staff_id TEXT NOT NULL,
  note_ciphertext BLOB,
  note_sha256 TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, note_id)
);
CREATE TABLE IF NOT EXISTS ops_override (
  tenant_id TEXT NOT NULL,
  override_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('AI_DISABLED')),
  reason TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  ended_at TEXT,
  ended_by TEXT,
  reviewed_by TEXT,
  reviewed_at TEXT,
  PRIMARY KEY (tenant_id, override_id)
);
CREATE TABLE IF NOT EXISTS incident (
  tenant_id TEXT NOT NULL,
  incident_id TEXT NOT NULL,
  title TEXT NOT NULL,
  severity TEXT NOT NULL CHECK(severity IN ('SEV1','SEV2','SEV3')),
  declared_by TEXT NOT NULL,
  declared_at TEXT NOT NULL,
  owner_notified_at TEXT,
  closed_at TEXT,
  PRIMARY KEY (tenant_id, incident_id)
);
-- Doc13 §06.1 knowledge lifecycle: approval is tied to the exact content hash.
CREATE TABLE IF NOT EXISTS knowledge_review (
  tenant_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  state TEXT NOT NULL CHECK(state IN ('IN_REVIEW','APPROVED','WITHDRAWN')),
  submitted_by TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  approved_by TEXT,
  approved_at TEXT,
  withdrawn_by TEXT,
  withdrawn_at TEXT,
  PRIMARY KEY (tenant_id, item_id, content_hash)
);
`;

/* Version 2 (Doc05 traceability pass): availability tables, switching guidance, citations,
 * privacy preference link, cost currency, assistant_config immutability.
 * Pseudonymous telemetry (chat_event, model_invocation, tool_invocation) deliberately has NO
 * foreign key to chat_session: it must outlive the session purge (§06 "session purge must not
 * cascade into audit or legal holdings") and keeps only the opaque session id. */
const DDL_V2 = `
-- DM-10 availability_enquiry (postcode encrypted; short TTL)
CREATE TABLE IF NOT EXISTS availability_enquiry (
  tenant_id TEXT NOT NULL,
  enquiry_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  postcode_ciphertext BLOB,
  search_status TEXT NOT NULL CHECK(search_status IN ('PENDING','COMPLETE','ERROR')),
  requested_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  correlation_ref TEXT,
  PRIMARY KEY (tenant_id, enquiry_id),
  FOREIGN KEY (tenant_id, session_id) REFERENCES chat_session(tenant_id, session_id) ON DELETE CASCADE
);
-- DM-11 address_candidate (opaque ref; display label encrypted)
CREATE TABLE IF NOT EXISTS address_candidate (
  tenant_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  enquiry_id TEXT NOT NULL,
  provider_code TEXT NOT NULL CHECK(length(provider_code) <= 40),
  address_ref TEXT NOT NULL CHECK(length(address_ref) <= 180),
  display_label_ciphertext BLOB,
  selected_at TEXT,
  expires_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, candidate_id),
  FOREIGN KEY (tenant_id, enquiry_id) REFERENCES availability_enquiry(tenant_id, enquiry_id) ON DELETE CASCADE
);
-- DM-12 service_qualification (candidate must belong to the same enquiry — T-12, enforced by trigger)
CREATE TABLE IF NOT EXISTS service_qualification (
  tenant_id TEXT NOT NULL,
  qualification_id TEXT NOT NULL,
  enquiry_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  provider_code TEXT NOT NULL,
  sale_eligibility TEXT NOT NULL CHECK(sale_eligibility IN ('ELIGIBLE','INELIGIBLE','UNKNOWN')),
  source_reference TEXT,
  source_observed_at TEXT NOT NULL,
  valid_until TEXT NOT NULL,
  reason_code TEXT,
  PRIMARY KEY (tenant_id, qualification_id),
  FOREIGN KEY (tenant_id, enquiry_id) REFERENCES availability_enquiry(tenant_id, enquiry_id) ON DELETE CASCADE,
  FOREIGN KEY (tenant_id, candidate_id) REFERENCES address_candidate(tenant_id, candidate_id) ON DELETE CASCADE
);
CREATE TRIGGER IF NOT EXISTS qualification_same_enquiry BEFORE INSERT ON service_qualification
WHEN (SELECT enquiry_id FROM address_candidate WHERE tenant_id = NEW.tenant_id AND candidate_id = NEW.candidate_id) IS NOT NEW.enquiry_id
BEGIN SELECT RAISE(ABORT, 'candidate does not belong to this enquiry'); END;

-- DM-15 switch_guidance_ref
CREATE TABLE IF NOT EXISTS switch_guidance_ref (
  tenant_id TEXT NOT NULL,
  guidance_id TEXT NOT NULL,
  session_id TEXT,
  journey_type TEXT NOT NULL CHECK(journey_type IN ('RESIDENTIAL_OTS','BUSINESS')),
  guidance_version TEXT NOT NULL,
  guidance_outcome TEXT NOT NULL CHECK(guidance_outcome IN ('INFO_ONLY','HANDOFF','UNSUPPORTED')),
  recorded_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, guidance_id)
);

-- DM-24 answer_citation (which approved knowledge version an AI answer cited)
CREATE TABLE IF NOT EXISTS answer_citation (
  tenant_id TEXT NOT NULL,
  citation_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  sequence_no INTEGER NOT NULL,
  knowledge_id TEXT NOT NULL,
  version_hash TEXT NOT NULL,
  evidence_label TEXT NOT NULL CHECK(evidence_label IN ('VERIFIED','EXPIRED','UNAVAILABLE','INDICATIVE')),
  created_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, citation_id),
  FOREIGN KEY (tenant_id, session_id) REFERENCES chat_session(tenant_id, session_id) ON DELETE CASCADE
);

-- DM-27 usage ledger currency on metering rows
ALTER TABLE model_invocation ADD COLUMN cost_currency TEXT NOT NULL DEFAULT 'USD';

-- DM-02: published configuration is immutable (new versions instead of updates)
CREATE TRIGGER IF NOT EXISTS assistant_config_immutable BEFORE UPDATE ON assistant_config
WHEN OLD.lifecycle_status = 'APPROVED' AND NEW.lifecycle_status != 'RETIRED'
BEGIN SELECT RAISE(ABORT, 'published assistant_config is immutable'); END;

-- DM-32 case reference for acknowledgements
CREATE UNIQUE INDEX IF NOT EXISTS ux_rights_case_ref ON data_rights_request(tenant_id, case_ref);
`;

/* Version 3 (Doc10/Doc13 traceability pass): HIGH priority tier and consent reference on
 * handovers, QA analyst role, request correlation on audit rows. SQLite can't change a CHECK
 * constraint in place, so both tables are rebuilt with their data copied across. */
const DDL_V3 = `
CREATE TABLE human_handover_v3 (
  tenant_id TEXT NOT NULL,
  handover_id TEXT NOT NULL,
  session_id TEXT,
  support_ref TEXT,
  channel TEXT NOT NULL CHECK(channel IN ('LIVE_CHAT','CALLBACK','TICKET','PHONE','ANY')),
  transcript_shared INTEGER NOT NULL DEFAULT 0,
  priority TEXT NOT NULL CHECK(priority IN ('NORMAL','HIGH','URGENT_SAFETY','REGULATORY')),
  handoff_state TEXT NOT NULL CHECK(handoff_state IN ('REQUESTED','ACCEPTED','FAILED')),
  reason_code TEXT NOT NULL,
  summary_topics_json TEXT NOT NULL DEFAULT '[]',
  case_status TEXT NOT NULL DEFAULT 'OPEN' CHECK(case_status IN ('OPEN','ACCEPTED','ESCALATED','CLOSED')),
  assigned_staff_id TEXT,
  consent_ref TEXT,
  created_at TEXT NOT NULL,
  PRIMARY KEY (tenant_id, handover_id)
);
INSERT INTO human_handover_v3 (tenant_id, handover_id, session_id, support_ref, channel, transcript_shared, priority, handoff_state,
  reason_code, summary_topics_json, case_status, assigned_staff_id, consent_ref, created_at)
  SELECT tenant_id, handover_id, session_id, support_ref, channel, transcript_shared, priority, handoff_state,
  reason_code, summary_topics_json, case_status, assigned_staff_id, NULL, created_at FROM human_handover;
DROP TABLE human_handover;
ALTER TABLE human_handover_v3 RENAME TO human_handover;
CREATE INDEX IF NOT EXISTS ix_handover_queue ON human_handover(tenant_id, case_status, priority, created_at);

CREATE TABLE staff_user_v3 (
  tenant_id TEXT NOT NULL,
  staff_id TEXT NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('SUPPORT_AGENT','SUPPORT_SUPERVISOR','DPO_ANALYST','KNOWLEDGE_PUBLISHER','SECURITY_AUDITOR','QA_ANALYST','PLATFORM_ADMIN')),
  password_hash TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  created_at TEXT NOT NULL,
  created_by TEXT NOT NULL,
  PRIMARY KEY (tenant_id, staff_id),
  UNIQUE (tenant_id, email)
);
INSERT INTO staff_user_v3 SELECT * FROM staff_user;
DROP TABLE staff_user;
ALTER TABLE staff_user_v3 RENAME TO staff_user;

ALTER TABLE audit_event ADD COLUMN correlation_id TEXT;
`;

const MIGRATIONS: { version: number; sql: string }[] = [
  { version: 1, sql: DDL },
  { version: 2, sql: DDL_V2 },
  { version: 3, sql: DDL_V3 },
];

/** Applies pending migrations. Run by `npm run linko:migrate`; the web process also runs it unless LINKO_DB_AUTO_MIGRATE=false. */
export function migrate(d: DatabaseSync) {
  d.exec("CREATE TABLE IF NOT EXISTS schema_version (version INTEGER NOT NULL, applied_at TEXT NOT NULL)");
  const cur = (d.prepare("SELECT max(version) AS v FROM schema_version").get() as { v: number | null }).v ?? 0;
  for (const m of MIGRATIONS) {
    if (m.version <= cur) continue;
    d.exec("BEGIN");
    try {
      d.exec(m.sql);
      d.prepare("INSERT INTO schema_version (version, applied_at) VALUES (?, ?)").run(m.version, nowIso());
      d.exec("COMMIT");
    } catch (e) {
      d.exec("ROLLBACK");
      throw e;
    }
  }
}

export function schemaVersion() {
  return (db().prepare("SELECT max(version) AS v FROM schema_version").get() as { v: number }).v;
}

/* ───────────────────────────────── Open ───────────────────────────────── */

export function db(): DatabaseSync {
  if (g.__linkoDb) return g.__linkoDb;
  const file = process.env.LINKO_DB_PATH || path.join(process.cwd(), ".data", "linko.db");
  mkdirSync(path.dirname(file), { recursive: true });
  const d = new DatabaseSync(file);
  d.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 3000;");
  if (process.env.LINKO_DB_AUTO_MIGRATE !== "false") migrate(d);
  g.__linkoDb = d;
  seed(d);
  return d;
}

export function tenantId(): string {
  if (g.__linkoDbTenant) return g.__linkoDbTenant;
  db();
  return g.__linkoDbTenant!;
}

export const CONFIG_VERSION = "linko-config-2026-11-23";

function seed(d: DatabaseSync) {
  let t = d.prepare("SELECT tenant_id FROM tenant WHERE operator_code = 'ZOIKO_BROADBAND'").get() as { tenant_id: string } | undefined;
  if (!t) {
    t = { tenant_id: uuid() };
    d.prepare("INSERT INTO tenant VALUES (?, 'ZOIKO_BROADBAND', 'Zoiko Broadband', 'en-GB', 'ACTIVE', ?)").run(t.tenant_id, nowIso());
  }
  g.__linkoDbTenant = t.tenant_id;
  const cfg = d.prepare("SELECT 1 FROM assistant_config WHERE tenant_id = ? AND config_version = ?").get(t.tenant_id, CONFIG_VERSION);
  if (!cfg)
    d.prepare("INSERT INTO assistant_config VALUES (?, ?, 'Linko', ?, 'doc12-guardrails-v1', ?, 'APPROVED')").run(
      t.tenant_id,
      CONFIG_VERSION,
      CONFIG_VERSION,
      nowIso(),
    );
  // Proposed retention (Doc05 §12.2 catalogue). Unapproved until a DPO sets approved_by_ref.
  const rules: [string, string, number, string][] = [
    ["MESSAGE_CONTENT", "CLOSE", 0, "ERASE"],
    ["SESSION", "EXPIRE", 0, "ERASE"],
    ["SLOT", "EXPIRE", 0, "ERASE"],
    ["TELEMETRY", "LAST_ACTION", 90, "ANONYMISE"],
    ["MODEL_METERING", "LAST_ACTION", 400, "ANONYMISE"],
    ["HANDOVER", "LAST_ACTION", 90, "ERASE"],
    ["CONSENT_EVIDENCE", "LAST_ACTION", 730, "REVIEW"],
    ["IDEMPOTENCY", "EXPIRE", 1, "ERASE"],
    ["STAFF_SESSION", "EXPIRE", 1, "ERASE"],
    ["AUDIT", "LAST_ACTION", 2190, "REVIEW"],
    ["AVAILABILITY", "EXPIRE", 0, "ERASE"],
    ["CITATION", "CLOSE", 0, "ERASE"],
    ["LEAD_REF", "LAST_ACTION", 365, "REVIEW"],
    ["COMPLAINT_REF", "LAST_ACTION", 2190, "REVIEW"],
    ["TOOL_INVOCATION", "LAST_ACTION", 90, "ANONYMISE"],
    ["SWITCH_GUIDANCE", "LAST_ACTION", 90, "ERASE"],
    ["DATA_RIGHTS", "APPROVAL_END", 2190, "REVIEW"],
  ];
  const ins = d.prepare(
    "INSERT OR IGNORE INTO retention_rule VALUES (?, ?, ?, ?, ?, ?, 'retention-proposal-2026-11-23', NULL, ?)",
  );
  for (const [cls, trig, days, act] of rules) ins.run(t.tenant_id, uuid(), cls, trig, days, act, nowIso());
}

/* ─────────────────────────────── Encryption ─────────────────────────────── */

/**
 * Key ring for rotation (§10.2): LINKO_DATA_KEYS="k2:<base64>,k1:<base64>" with LINKO_DATA_KEY_ID
 * naming the key used for new data; older keys stay to decrypt existing rows. LINKO_DATA_KEY alone
 * is the single-key form (id "k1"). Ciphertext format v1: 0x01 | id length | id | IV(12) | tag(16) | body.
 * Rows written before key ids existed (no 0x01 prefix) decrypt with the "k1" key.
 */
function keyRing(): Map<string, Buffer> {
  const ring = new Map<string, Buffer>();
  for (const part of (process.env.LINKO_DATA_KEYS || "").split(",")) {
    const [id, b64] = part.split(":");
    if (!id || !b64) continue;
    const b = Buffer.from(b64.trim(), "base64");
    if (b.length === 32) ring.set(id.trim(), b);
  }
  if (process.env.LINKO_DATA_KEY && !ring.has("k1")) {
    const b = Buffer.from(process.env.LINKO_DATA_KEY, "base64");
    if (b.length === 32) ring.set("k1", b);
  }
  return ring;
}

function currentKey(): { id: string; key: Buffer } | null {
  const ring = keyRing();
  const id = process.env.LINKO_DATA_KEY_ID || (ring.has("k1") ? "k1" : [...ring.keys()][0]);
  const key = id ? ring.get(id) : undefined;
  return id && key ? { id, key } : null;
}

export function encryptionEnabled() {
  return currentKey() !== null;
}

/** AES-256-GCM with a key id prefix. Returns null when no key is configured. */
export function seal(text: string): Buffer | null {
  const k = currentKey();
  if (!k) return null;
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", k.key, iv);
  const body = Buffer.concat([c.update(text, "utf8"), c.final()]);
  const id = Buffer.from(k.id, "utf8");
  return Buffer.concat([Buffer.from([0x01, id.length]), id, iv, c.getAuthTag(), body]);
}

export function unseal(blob: Uint8Array | null | undefined): string | null {
  if (!blob) return null;
  const ring = keyRing();
  try {
    let b = Buffer.from(blob);
    let key = ring.get("k1");
    if (b[0] === 0x01) {
      const len = b[1];
      key = ring.get(b.subarray(2, 2 + len).toString("utf8"));
      b = b.subarray(2 + len);
    }
    if (!key) return null;
    const d = createDecipheriv("aes-256-gcm", key, b.subarray(0, 12));
    d.setAuthTag(b.subarray(12, 28));
    return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString("utf8");
  } catch {
    return null;
  }
}

/* ─────────────────────────────── Retention ─────────────────────────────── */

/** Rules still awaiting DPO approval (Doc05 T-54 / §12.2). */
export function unapprovedRetentionRules(): string[] {
  return (db().prepare("SELECT data_class FROM retention_rule WHERE tenant_id = ? AND approved_by_ref IS NULL").all(tenantId()) as { data_class: string }[]).map(
    (r) => r.data_class,
  );
}

/** In production, content is only stored once every retention rule is approved (T-54 fail closed). */
export function contentStorageAllowed() {
  const prod = (process.env.LINKO_ENVIRONMENT || process.env.NODE_ENV) === "production";
  return !prod || unapprovedRetentionRules().length === 0;
}

export function retentionDays(dataClass: string): number | null {
  const r = db().prepare("SELECT retention_days FROM retention_rule WHERE tenant_id = ? AND data_class = ?").get(tenantId(), dataClass) as
    | { retention_days: number }
    | undefined;
  return r ? r.retention_days : null;
}

const addDays = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();
export const plusMs = (ms: number) => new Date(Date.now() + ms).toISOString();

/** Runs at most once a minute: applies every retention rule (Doc05 §12.2, T-37/T-38). */
export function sweep() {
  const now = Date.now();
  if (g.__linkoLastSweep && now - g.__linkoLastSweep < 60_000) return;
  g.__linkoLastSweep = now;
  const d = db();
  const t = tenantId();
  const iso = nowIso();
  d.prepare("DELETE FROM chat_message WHERE tenant_id = ? AND delete_after_at <= ?").run(t, iso);
  d.prepare("DELETE FROM chat_slot WHERE tenant_id = ? AND expires_at <= ?").run(t, iso);
  d.prepare("DELETE FROM chat_session WHERE tenant_id = ? AND delete_after_at <= ?").run(t, iso);
  d.prepare("DELETE FROM idempotency_record WHERE tenant_id = ? AND expires_at <= ?").run(t, iso);
  d.prepare("DELETE FROM staff_session WHERE tenant_id = ? AND expires_at <= ?").run(t, iso);
  // A missing rule fails closed: the data is treated as already expired (T-54, no indefinite default).
  const age = (cls: string) => {
    const days = retentionDays(cls);
    return new Date(now - (days ?? 0) * 86_400_000).toISOString();
  };
  d.prepare("DELETE FROM availability_enquiry WHERE tenant_id = ? AND expires_at <= ?").run(t, iso);
  d.prepare("DELETE FROM chat_event WHERE tenant_id = ? AND occurred_at <= ?").run(t, age("TELEMETRY"));
  d.prepare("UPDATE model_invocation SET session_id = NULL WHERE tenant_id = ? AND created_at <= ?").run(t, age("MODEL_METERING"));
  d.prepare("UPDATE tool_invocation SET session_id = NULL WHERE tenant_id = ? AND occurred_at <= ?").run(t, age("TOOL_INVOCATION"));
  d.prepare("DELETE FROM human_handover WHERE tenant_id = ? AND created_at <= ? AND case_status = 'CLOSED' AND priority <> 'REGULATORY'").run(t, age("HANDOVER"));
  d.prepare("DELETE FROM switch_guidance_ref WHERE tenant_id = ? AND recorded_at <= ?").run(t, age("SWITCH_GUIDANCE"));
  d.prepare("DELETE FROM business_lead_ref WHERE tenant_id = ? AND recorded_at <= ?").run(t, age("LEAD_REF"));
}

/* ───────────────────────────────── Audit ───────────────────────────────── */

/** Salted pseudonym for an audit subject (DM-31 subject_ref_hash). */
export function subjectHashFor(ref: string) {
  // §06.2: the salt is kept apart from the data. Production must set LINKO_AUDIT_SALT (fail closed).
  const salt = process.env.LINKO_AUDIT_SALT;
  if (!salt && (process.env.LINKO_ENVIRONMENT || process.env.NODE_ENV) === "production") throw new Error("LINKO_AUDIT_SALT is required in production");
  return sha256(`${salt || tenantId()}|${ref}`);
}

export type AuditInput = {
  action: string;
  subjectType: string;
  subjectRef?: string | null;
  actor: string;
  decision: "ALLOW" | "DENY" | "EXECUTED";
  purpose?: string | null;
  reason?: string | null;
  /** Request correlation id (Doc10 §03.1 audit_correlation_id); not part of the hash chain. */
  correlationId?: string | null;
};

/** Appends a hash-chained audit event (DM-31, T-44). Subjects are stored as salted hashes only. */
export function audit(e: AuditInput) {
  const d = db();
  const t = tenantId();
  const last = d.prepare("SELECT seq, tamper_evidence_hash FROM audit_event WHERE tenant_id = ? ORDER BY seq DESC LIMIT 1").get(t) as
    | { seq: number; tamper_evidence_hash: string }
    | undefined;
  const seq = (last?.seq ?? 0) + 1;
  const prev = last?.tamper_evidence_hash ?? "0".repeat(64);
  const occurred = nowIso();
  const subjectHash = e.subjectRef ? subjectHashFor(e.subjectRef) : null;
  const env = process.env.LINKO_ENVIRONMENT || process.env.NODE_ENV || "development";
  const body = [seq, e.action, e.subjectType, subjectHash, e.actor, e.decision, e.purpose ?? "", e.reason ?? "", env, occurred, prev].join("|");
  d.prepare(
    `INSERT INTO audit_event (tenant_id, audit_id, seq, action_code, subject_type, subject_ref_hash, actor_ref, decision,
      purpose_code, reason_code, environment, occurred_at, prev_hash, tamper_evidence_hash, correlation_id)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  ).run(
    t,
    uuid(),
    seq,
    e.action.slice(0, 100),
    e.subjectType,
    subjectHash,
    e.actor,
    e.decision,
    e.purpose ?? null,
    e.reason ?? null,
    env,
    occurred,
    prev,
    sha256(body),
    e.correlationId ?? null,
  );
}

/** Recomputes the chain (T-44). Returns the first broken sequence number, or null if intact. */
export function verifyAuditChain(): number | null {
  const rows = db()
    .prepare("SELECT * FROM audit_event WHERE tenant_id = ? ORDER BY seq")
    .all(tenantId()) as Row[];
  let prev = "0".repeat(64);
  for (const r of rows) {
    const body = [r.seq, r.action_code, r.subject_type, r.subject_ref_hash, r.actor_ref, r.decision, r.purpose_code ?? "", r.reason_code ?? "", r.environment, r.occurred_at, prev].join("|");
    if (r.prev_hash !== prev || sha256(body) !== r.tamper_evidence_hash) return r.seq as number;
    prev = r.tamper_evidence_hash as string;
  }
  return null;
}

export { addDays };
