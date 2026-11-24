/**
 * Staff roles and permissions (Doc13 §03.1/§03.2, Doc10 §06.2). Deny by default: an action
 * not listed for a role is refused, and every allowed action is still checked against the
 * resource (assignment, purpose, step-up) by the caller.
 *
 * Cell codes from Doc13 §03.2: C = assigned case only, A = step-up + confirmation,
 * E = independent, evidence-only (purpose + reference required, step-up, audited).
 */
export const ROLES = [
  "SUPPORT_AGENT",
  "SUPPORT_SUPERVISOR",
  "DPO_ANALYST",
  "KNOWLEDGE_PUBLISHER",
  "SECURITY_AUDITOR",
  "QA_ANALYST",
  "PLATFORM_ADMIN",
] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABEL: Record<Role, string> = {
  SUPPORT_AGENT: "Support agent",
  SUPPORT_SUPERVISOR: "Support supervisor",
  DPO_ANALYST: "Privacy / DPO analyst",
  KNOWLEDGE_PUBLISHER: "Knowledge publisher",
  SECURITY_AUDITOR: "Security auditor",
  QA_ANALYST: "QA analyst (redacted samples)",
  PLATFORM_ADMIN: "Platform admin (staff accounts only)",
};

export type Action =
  | "QUEUE_VIEW"
  | "CASE_ACCEPT"
  | "CASE_REASSIGN"
  | "CASE_NOTE"
  | "CASE_ESCALATE"
  | "CASE_CLOSE"
  | "TRANSCRIPT_READ"
  | "AUDIT_VIEW"
  | "KNOWLEDGE_VIEW"
  | "KNOWLEDGE_SUBMIT"
  | "KNOWLEDGE_APPROVE"
  | "KNOWLEDGE_WITHDRAW"
  | "INCIDENT_VIEW"
  | "INCIDENT_DECLARE"
  | "OVERRIDE_AI"
  | "OVERRIDE_REVIEW"
  | "EVAL_VIEW"
  | "QA_SAMPLE"
  | "PRIVACY_QUEUE"
  | "PRIVACY_ACT"
  | "STAFF_ADMIN";

type Mode = "ALLOW" | "C" | "A" | "E";

const MATRIX: Partial<Record<Action, Partial<Record<Role, Mode>>>> = {
  QUEUE_VIEW: { SUPPORT_AGENT: "ALLOW", SUPPORT_SUPERVISOR: "ALLOW" },
  CASE_ACCEPT: { SUPPORT_AGENT: "ALLOW", SUPPORT_SUPERVISOR: "ALLOW" },
  CASE_REASSIGN: { SUPPORT_SUPERVISOR: "ALLOW" },
  CASE_NOTE: { SUPPORT_AGENT: "C", SUPPORT_SUPERVISOR: "C" },
  CASE_ESCALATE: { SUPPORT_AGENT: "C", SUPPORT_SUPERVISOR: "C" },
  CASE_CLOSE: { SUPPORT_AGENT: "C", SUPPORT_SUPERVISOR: "C" },
  // Doc13 §03.2 "Case transcript read": agent C, supervisor C, DPO C (rights case), auditor E.
  TRANSCRIPT_READ: { SUPPORT_AGENT: "C", SUPPORT_SUPERVISOR: "C", DPO_ANALYST: "E", SECURITY_AUDITOR: "E", QA_ANALYST: "E" },
  // "Raw audit evidence": supervisor E, DPO E, auditor E (redacted view). Agents and publishers: none.
  AUDIT_VIEW: { SUPPORT_SUPERVISOR: "E", DPO_ANALYST: "E", SECURITY_AUDITOR: "E" },
  KNOWLEDGE_VIEW: { KNOWLEDGE_PUBLISHER: "ALLOW", SECURITY_AUDITOR: "ALLOW", SUPPORT_SUPERVISOR: "ALLOW" },
  KNOWLEDGE_SUBMIT: { KNOWLEDGE_PUBLISHER: "ALLOW" },
  // "Publish knowledge": publisher A, independent of the submitter (L13-FR-081, L13-QA-091).
  KNOWLEDGE_APPROVE: { KNOWLEDGE_PUBLISHER: "A" },
  KNOWLEDGE_WITHDRAW: { KNOWLEDGE_PUBLISHER: "A", SUPPORT_SUPERVISOR: "A" },
  INCIDENT_VIEW: { SUPPORT_SUPERVISOR: "ALLOW", SECURITY_AUDITOR: "ALLOW" },
  INCIDENT_DECLARE: { SUPPORT_SUPERVISOR: "A" },
  // HS-WF-10-24 "Activate fallback": supervisor/incident lead, step-up, time-bounded.
  OVERRIDE_AI: { SUPPORT_SUPERVISOR: "A" },
  OVERRIDE_REVIEW: { SUPPORT_SUPERVISOR: "ALLOW", SECURITY_AUDITOR: "ALLOW" },
  // Eval results have no owner role in the docs (D13-16): supervisors and auditors read them.
  EVAL_VIEW: { SUPPORT_SUPERVISOR: "ALLOW", SECURITY_AUDITOR: "ALLOW", KNOWLEDGE_PUBLISHER: "ALLOW", QA_ANALYST: "ALLOW" },
  // Doc10 §06.2 QA analyst: redacted sampled quality and safety review only (HS-T052).
  QA_SAMPLE: { QA_ANALYST: "E", SUPPORT_SUPERVISOR: "E" },
  // Doc13 §03.2 "Privacy rights processing": DPO A (step-up); others no direct action.
  PRIVACY_QUEUE: { DPO_ANALYST: "ALLOW" },
  PRIVACY_ACT: { DPO_ANALYST: "A" },
  // Staff user admin is undefined in the docs (D13-02/D13-18): a separate admin role with no case access.
  STAFF_ADMIN: { PLATFORM_ADMIN: "A" },
};

export function modeFor(role: Role, action: Action): Mode | null {
  return MATRIX[action]?.[role] ?? null;
}

export function can(role: Role, action: Action) {
  return modeFor(role, action) !== null;
}

/** Does this action need a fresh step-up (password re-entry) first? */
export function needsStepUp(role: Role, action: Action) {
  const m = modeFor(role, action);
  return m === "A" || m === "E";
}

/** Must the actor give a purpose and reference (evidence-only access)? */
export function needsPurpose(role: Role, action: Action) {
  return modeFor(role, action) === "E" || action === "TRANSCRIPT_READ";
}

/** Navigation entries a role can see. */
export function navFor(role: Role) {
  const items: { href: string; label: string; action: Action }[] = [
    { href: "/staff", label: "Inbox", action: "QUEUE_VIEW" },
    { href: "/staff/incident", label: "Incident & quality", action: "INCIDENT_VIEW" },
    { href: "/staff/knowledge", label: "Knowledge", action: "KNOWLEDGE_VIEW" },
    { href: "/staff/audit", label: "Audit log", action: "AUDIT_VIEW" },
    { href: "/staff/evals", label: "Evaluations", action: "EVAL_VIEW" },
    { href: "/staff/qa", label: "Quality sample", action: "QA_SAMPLE" },
    { href: "/staff/privacy", label: "Privacy requests", action: "PRIVACY_QUEUE" },
    { href: "/staff/users", label: "Staff accounts", action: "STAFF_ADMIN" },
  ];
  return items.filter((i) => can(role, i.action));
}
