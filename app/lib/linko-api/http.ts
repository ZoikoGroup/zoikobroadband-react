/**
 * Linko API – shared HTTP contract (Document 04 §04).
 *
 *  - Paths under /v1/linko/ (Doc04 §04.1)
 *  - Universal response envelope {status, correlationId, data, sourceEvidence, nextActions} (§04.2)
 *  - Error contract {code, message, correlationId, retryable, nextAction} (§04.3, §11.4)
 *  - Opaque correlationId on every response, no-store for personalised results
 *  - Idempotency-Key replay for operations with side effects
 */
import { NextRequest } from "next/server";
import { checkRateLimit } from "@/app/lib/chatbot/rateLimit";

export type BusinessStatus = "CONFIRMED" | "INDICATIVE" | "PENDING" | "UNAVAILABLE" | "REQUIRES_ACTION";

export type EvidenceStatus = "VERIFIED" | "INDICATIVE" | "STALE" | "UNKNOWN";

export interface SourceEvidence {
  source: string;
  version?: string;
  checkedAt: string; // RFC 3339
  expiresAt?: string;
  status: EvidenceStatus;
}

export interface NextAction {
  type: "LINK" | "FLOW" | "SIGN_IN" | "HUMAN" | "RETRY" | "PHONE";
  label: string;
  href?: string;
  flow?: string;
}

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "AUTH_REQUIRED"
  | "ACCESS_DENIED"
  | "NOT_FOUND"
  | "QUOTE_EXPIRED"
  | "ELIGIBILITY_UNKNOWN"
  | "RATE_LIMITED"
  | "PROVIDER_UNAVAILABLE"
  | "SOURCE_UNAVAILABLE"
  | "TIMEOUT"
  | "IDEMPOTENCY_KEY_REQUIRED";

export function newCorrelationId() {
  const rnd =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
      : Math.random().toString(36).slice(2, 18);
  return `corr_${rnd}`;
}

export function nowIso() {
  return new Date().toISOString();
}

const BASE_HEADERS = { "Cache-Control": "no-store", "X-Linko-Api": "v1" };

export function envelope<T>(
  cid: string,
  status: BusinessStatus,
  data: T,
  opts: { sourceEvidence?: SourceEvidence; nextActions?: NextAction[]; http?: number } = {},
) {
  return Response.json(
    {
      status,
      correlationId: cid,
      data,
      ...(opts.sourceEvidence ? { sourceEvidence: opts.sourceEvidence } : {}),
      nextActions: opts.nextActions ?? [],
    },
    { status: opts.http ?? 200, headers: { ...BASE_HEADERS, "X-Correlation-Id": cid } },
  );
}

const HTTP_FOR: Record<ErrorCode, number> = {
  VALIDATION_ERROR: 400,
  AUTH_REQUIRED: 401,
  ACCESS_DENIED: 403,
  NOT_FOUND: 404,
  QUOTE_EXPIRED: 409,
  ELIGIBILITY_UNKNOWN: 422,
  RATE_LIMITED: 429,
  PROVIDER_UNAVAILABLE: 503,
  SOURCE_UNAVAILABLE: 503,
  TIMEOUT: 504,
  IDEMPOTENCY_KEY_REQUIRED: 400,
};

export function apiError(
  cid: string,
  code: ErrorCode,
  message: string,
  opts: { retryable?: boolean; nextAction?: "HUMAN" | "SIGN_IN" | "RETRY" | "CORRECT_INPUT"; field?: string; nextActions?: NextAction[] } = {},
) {
  return Response.json(
    {
      code,
      message,
      correlationId: cid,
      retryable: opts.retryable ?? false,
      ...(opts.nextAction ? { nextAction: opts.nextAction } : {}),
      ...(opts.field ? { field: opts.field } : {}),
      nextActions: opts.nextActions ?? [],
    },
    { status: HTTP_FOR[code], headers: { ...BASE_HEADERS, "X-Correlation-Id": cid } },
  );
}

/** Contact routes shown whenever a backend can't act (Doc04: "give direct contact rather than fictitious receipt"). */
export const SUPPORT_ACTIONS: NextAction[] = [
  { type: "PHONE", label: "Call +44 (0)20 7164 6399", href: "tel:+442071646399" },
  { type: "LINK", label: "Contact us", href: "/contact-us" },
  { type: "FLOW", label: "Speak to a person", flow: "handoff" },
];

export function clientKey(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

/** Shared per-IP limit for all public Linko routes. Returns an error Response when exceeded. */
export function limit(req: NextRequest, cid: string, bucket = "api"): Response | null {
  if (checkRateLimit(`${bucket}:${clientKey(req)}`)) return null;
  return apiError(cid, "RATE_LIMITED", "You're sending requests too quickly. Please wait a moment and try again.", {
    retryable: true,
    nextAction: "HUMAN",
    nextActions: SUPPORT_ACTIONS,
  });
}

export async function readJson(req: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json();
    return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/* ───────────── Idempotency (Doc04 §04.1): actor + route + body hash ───────────── */

const gi = globalThis as unknown as { __linkoIdem?: Map<string, { at: number; status: number; body: string }> };
gi.__linkoIdem ??= new Map();
const idem = gi.__linkoIdem;
const IDEM_TTL_MS = 24 * 60 * 60 * 1000;

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Runs a side-effecting handler once per Idempotency-Key. A repeat with the
 * same key and body replays the stored response; a different body is rejected.
 */
export async function withIdempotency(
  req: NextRequest,
  cid: string,
  route: string,
  body: unknown,
  handler: () => Promise<Response>,
): Promise<Response> {
  const key = req.headers.get("idempotency-key");
  if (!key || key.length < 8 || key.length > 128) {
    return apiError(cid, "IDEMPOTENCY_KEY_REQUIRED", "An Idempotency-Key header is required for this request.", {
      field: "Idempotency-Key",
    });
  }
  const scope = await sha256(`${clientKey(req)}|${route}|${key}`);
  const bodyHash = await sha256(JSON.stringify(body ?? null));
  const now = Date.now();
  for (const [k, v] of idem) if (now - v.at > IDEM_TTL_MS) idem.delete(k);

  const prior = idem.get(scope);
  if (prior) {
    const [storedHash, storedBody] = [prior.body.slice(0, 64), prior.body.slice(64)];
    if (storedHash !== bodyHash) {
      return apiError(cid, "VALIDATION_ERROR", "This Idempotency-Key was already used with a different request.", {
        field: "Idempotency-Key",
      });
    }
    return new Response(storedBody, {
      status: prior.status,
      headers: { ...BASE_HEADERS, "Content-Type": "application/json", "X-Correlation-Id": cid, "Idempotent-Replay": "true" },
    });
  }
  const res = await handler();
  const text = await res.clone().text();
  idem.set(scope, { at: now, status: res.status, body: bodyHash + text });
  return res;
}
