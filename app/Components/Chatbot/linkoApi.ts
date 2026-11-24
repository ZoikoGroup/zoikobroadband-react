"use client";

/**
 * Browser client for the Linko API (Document 04, paths under /v1/linko/).
 * Every call returns {ok, http, body}; callers never see stack traces.
 */
import { ApiCall, FlowId, LinkoAction } from "@/app/lib/chatbot/linko";

export interface ApiNextAction {
  type: "LINK" | "FLOW" | "SIGN_IN" | "HUMAN" | "RETRY" | "PHONE";
  label: string;
  href?: string;
  flow?: string;
}

export interface ApiEnvelope<T> {
  status: "CONFIRMED" | "INDICATIVE" | "PENDING" | "UNAVAILABLE" | "REQUIRES_ACTION";
  correlationId: string;
  data: T;
  sourceEvidence?: { source: string; version?: string; checkedAt: string; expiresAt?: string; status: string };
  nextActions: ApiNextAction[];
}

export interface ApiErrorBody {
  code: string;
  message: string;
  correlationId: string;
  retryable: boolean;
  nextAction?: string;
  field?: string;
  nextActions: ApiNextAction[];
}

export type ApiResult<T> =
  | { ok: true; http: number; body: ApiEnvelope<T> }
  | { ok: false; http: number; body: ApiErrorBody | null };

const BASE = "/v1/linko";

export function newKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

async function call<T>(
  path: string,
  init: { method?: "GET" | "POST"; body?: unknown; idempotent?: boolean | string; signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<ApiResult<T>> {
  const headers: Record<string, string> = {};
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  headers["X-Linko-Client"] = "web";
  // A caller-held key is reused for every resubmission of the same form (Doc04 §04.1, AC-42).
  if (init.idempotent) headers["Idempotency-Key"] = typeof init.idempotent === "string" ? init.idempotent : newKey();
  const signals = [AbortSignal.timeout(init.timeoutMs ?? 25_000)];
  if (init.signal) signals.push(init.signal);
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: init.method ?? (init.body !== undefined ? "POST" : "GET"),
      headers,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
      signal: AbortSignal.any(signals),
      cache: "no-store",
    });
    if (res.status === 204) return { ok: true, http: 204, body: null as unknown as ApiEnvelope<T> };
    const json = await res.json().catch(() => null);
    if (res.ok && json && "status" in json) return { ok: true, http: res.status, body: json as ApiEnvelope<T> };
    return { ok: false, http: res.status, body: (json as ApiErrorBody) ?? null };
  } catch (err) {
    if ((err as Error).name === "AbortError" && init.signal?.aborted) throw err;
    return { ok: false, http: 0, body: null };
  }
}

/* ─────────────── Typed endpoint helpers (Doc04 route IDs) ─────────────── */

export const linkoApi = {
  /** PUB-01 */
  createConversation: (pageKey: string) =>
    call<{ conversationId: string; state: string }>("/conversations", {
      body: { locale: "en-GB", channel: "website", pageKey },
    }),
  /** PUB-02 */
  sendMessage: (
    conversationId: string,
    body: { kind: "TEXT"; text: string; requestId: string } | { kind: "ACTION"; actionId: string; requestId: string; label?: string },
    signal?: AbortSignal,
  ) => call<MessageData>(`/conversations/${encodeURIComponent(conversationId)}/messages`, { body, signal }),
  /** PUB-14 */
  close: (conversationId: string) => call<null>(`/conversations/${encodeURIComponent(conversationId)}/close`, { body: {} }),
  /** PUB-03 */
  searchAddresses: (conversationId: string, postcode: string) =>
    call<{ postcode: string; matches: { addressId: string; label: string }[] }>("/addresses/search", { body: { conversationId, postcode } }),
  /** PUB-04 */
  qualify: (conversationId: string, addressId: string, customerType: "RESIDENTIAL" | "BUSINESS") =>
    call<{ eligibilityRef: string; technologies: string[]; offerCount: number; message: string; addressLabel: string }>(
      "/availability/qualifications",
      { body: { conversationId, addressId, customerType } },
    ),
  /** PUB-06 */
  businessLead: (payload: Record<string, unknown>, idempotencyKey: string) =>
    call<{ reference: string }>("/business/leads", { body: payload, idempotent: idempotencyKey }),
  /** PUB-09 */
  serviceStatus: (area?: string) =>
    call<{ state: string; message: string; incidents: { summary: string; updatedAt: string | null }[] }>(
      `/service-status${area ? `?area=${encodeURIComponent(area)}` : ""}`,
    ),
  /** PUB-10 */
  triage: (payload: { symptom: string; allDevices?: boolean; digitalVoice?: boolean; telecareOrAlarm?: boolean }) =>
    call<TriageData>("/faults/triage", { body: payload }),
  /** PUB-12 */
  handoff: (
    payload: { channel: string; shareSummary: boolean; shareTranscript?: boolean; reason?: string; conversationId?: string | null; topics?: string[] },
    idempotencyKey: string,
  ) =>
    call<{ summary: string | null; handoffRef: string | null; channels: { channel: string; label: string; href: string }[] }>("/human-handoffs", {
      body: payload,
      idempotent: idempotencyKey,
    }),
  /** HS-T056: withdraw a summary shared earlier. */
  withdrawHandoff: (handoffRef: string) => call<{ withdrawn: boolean }>("/human-handoffs", { body: { withdraw: true, handoffRef } }),
  /** PRV-01 / PRV-03 / PRV-05 / PRV-07 – fail closed with AUTH_REQUIRED until MyZoiko sign-in is connected */
  private: (which: ApiCall) => {
    const map: Record<ApiCall, { path: string; method: "GET" | "POST" }> = {
      orderStatus: { path: "/me/orders", method: "GET" },
      appointmentRead: { path: "/me/orders/current/appointments", method: "GET" },
      moveRequest: { path: "/me/moving/assessments", method: "POST" },
      billSummary: { path: "/me/billing/summary", method: "GET" },
      serviceStatus: { path: "/service-status", method: "GET" },
    };
    const m = map[which];
    return call<unknown>(m.path, { method: m.method, body: m.method === "POST" ? {} : undefined });
  },
};

export interface MessageData {
  intent: { id: string; version: string };
  state: string;
  redacted: string[];
  answer: {
    status: string;
    message: string;
    tone?: "default" | "safety" | "error" | "notice";
    actions: LinkoAction[];
    screen?: string;
    topic?: string;
    widget?: string;
    context?: string;
    source: "flow" | "ai";
    sources?: { id: string; title: string; source: string }[];
  };
}

export interface TriageData {
  safetyEscalation: boolean;
  safetyNotice?: string;
  priority: string;
  category: string;
  steps: { id: string; text: string; href?: string; linkLabel?: string }[];
  maxSteps: number;
}

/** Converts API nextActions into safe UI actions (allow-listed links only). */
export function toActions(next: ApiNextAction[] | undefined): LinkoAction[] {
  const out: LinkoAction[] = [];
  for (const a of next ?? []) {
    if ((a.type === "LINK" || a.type === "PHONE" || a.type === "SIGN_IN") && a.href) out.push({ kind: "link", label: a.label, href: a.href });
    else if (a.type === "FLOW" && a.flow) out.push({ kind: "flow", label: a.label, flow: a.flow as FlowId });
    else if (a.type === "HUMAN") out.push({ kind: "flow", label: a.label, flow: "handoff" });
    else if (a.type === "RETRY") out.push({ kind: "command", label: a.label, command: "retry" });
  }
  return out;
}
