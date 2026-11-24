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
import { findIdempotency, persistIdempotency } from "@/app/lib/linko-db/persist";

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
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "REQUEST_IN_PROGRESS"
  | "METHOD_NOT_ALLOWED"
  | "GONE";

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

// API version plus schema release (Doc04 §04.1 versioning).
const BASE_HEADERS = { "Cache-Control": "no-store", "X-Linko-Api": "v1; release=linko-2026-11-24; schema=3" };

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
  REQUEST_IN_PROGRESS: 409,
  METHOD_NOT_ALLOWED: 405,
  GONE: 410,
};

export function apiError(
  cid: string,
  code: ErrorCode,
  message: string,
  opts: {
    retryable?: boolean;
    nextAction?: "HUMAN" | "SIGN_IN" | "RETRY" | "CORRECT_INPUT";
    field?: string;
    nextActions?: NextAction[];
    headers?: Record<string, string>;
  } = {},
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
    { status: HTTP_FOR[code], headers: { ...BASE_HEADERS, "X-Correlation-Id": cid, ...opts.headers } },
  );
}

/** Contact routes shown whenever a backend can't act (Doc04: "give direct contact rather than fictitious receipt"). */
export const SUPPORT_ACTIONS: NextAction[] = [
  { type: "PHONE", label: "Call +44 (0)20 7164 6399", href: "tel:+442071646399" },
  { type: "LINK", label: "Contact us", href: "/contact-us" },
  { type: "FLOW", label: "Speak to a person", flow: "handoff" },
];

/**
 * Client key for rate limits and idempotency scope. Prefer the platform-set
 * x-real-ip; otherwise the LAST X-Forwarded-For hop (appended by our proxy),
 * never the first one, which the client controls.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^\+?[0-9 ()-]{10,20}$/;

/** Validates a {type:"EMAIL"|"PHONE", value} contact; returns null when invalid. */
export function parseContact(raw: unknown): { type: "EMAIL" | "PHONE"; value: string } | null {
  const c = raw as { type?: unknown; value?: unknown } | null | undefined;
  if (!c || typeof c.value !== "string") return null;
  const value = c.value.trim();
  if (c.type === "EMAIL" && EMAIL_RE.test(value) && value.length <= 254) return { type: "EMAIL", value };
  if (c.type === "PHONE" && PHONE_RE.test(value)) return { type: "PHONE", value };
  return null;
}

export function isTimeout(e: unknown) {
  return e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError");
}

/**
 * Doc04 §04.3 / AC-42: after a timeout on a side-effecting call the backend may
 * already have the request, so never say "nothing was submitted" and never invite a resubmit.
 */
export function uncertainSubmission(cid: string, what: string) {
  return apiError(
    cid,
    "TIMEOUT",
    `We couldn't confirm whether your ${what} reached our team. Please don't send it again — contact us and we'll check for you.`,
    { retryable: false, nextAction: "HUMAN", nextActions: SUPPORT_ACTIONS },
  );
}

export function clientKey(req: NextRequest) {
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real;
  const hops = req.headers.get("x-forwarded-for")?.split(",").map((s) => s.trim()).filter(Boolean);
  return hops?.length ? hops[hops.length - 1] : "unknown";
}

/**
 * Doc08 LK-ARCH-A-07: browser POSTs must come from our own site. A request with an
 * Origin header that isn't this host (or LINKO_ALLOWED_ORIGINS) is refused.
 */
export function guardOrigin(req: NextRequest, cid: string): Response | null {
  if (req.method === "GET" || req.method === "HEAD") return null;
  const origin = req.headers.get("origin");
  if (!origin) {
    // No Origin: allowed only for same-origin/direct requests as reported by the browser, or
    // non-browser server-to-server calls (no Sec-Fetch-Site at all). Cross-site is refused (Doc08 A-07).
    const site = req.headers.get("sec-fetch-site");
    if (!site || site === "same-origin" || site === "none") return null;
    return apiError(cid, "ACCESS_DENIED", "This request isn't allowed from another website.");
  }
  const allowed = new Set(
    (process.env.LINKO_ALLOWED_ORIGINS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
  allowed.add(req.nextUrl.origin);
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (host) {
    allowed.add(`https://${host}`);
    allowed.add(`http://${host}`);
  }
  if (allowed.has(origin)) return null;
  return apiError(cid, "ACCESS_DENIED", "This request isn't allowed from another website.");
}

/**
 * Origin check + rate limit for every public Linko route. Returns an error Response when refused.
 * `key` overrides the client key (e.g. a per-conversation limit).
 */
export function limit(req: NextRequest, cid: string, bucket = "api", max?: number, key?: string): Response | null {
  const blocked = guardOrigin(req, cid);
  if (blocked) return blocked;
  if (checkRateLimit(`${bucket}:${key ?? clientKey(req)}`, max)) return null;
  return apiError(cid, "RATE_LIMITED", "You're sending requests too quickly. Please wait a moment and try again.", {
    retryable: true,
    nextAction: "HUMAN",
    nextActions: SUPPORT_ACTIONS,
    headers: { "Retry-After": "60" },
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

  // Durable check (T-47): after a restart the in-memory record is gone, but the database still has it.
  if (!idem.has(scope)) {
    const rec = findIdempotency(route, scope);
    if (rec && rec.request_digest !== bodyHash)
      return apiError(cid, "VALIDATION_ERROR", "This Idempotency-Key was already used with a different request.", { field: "Idempotency-Key" });
    if (rec && rec.status === "IN_PROGRESS")
      return apiError(cid, "REQUEST_IN_PROGRESS", "This request is already being processed. Please wait a moment.", { retryable: true, headers: { "Retry-After": "2" } });
    if (rec && rec.status === "DONE")
      return apiError(cid, "REQUEST_IN_PROGRESS", "This request was already completed. Please don't send it again.", { retryable: false, nextAction: "HUMAN", nextActions: SUPPORT_ACTIONS });
  }
  const prior = idem.get(scope);
  if (prior) {
    const [storedHash, storedBody] = [prior.body.slice(0, 64), prior.body.slice(64)];
    if (storedHash !== bodyHash) {
      return apiError(cid, "VALIDATION_ERROR", "This Idempotency-Key was already used with a different request.", {
        field: "Idempotency-Key",
      });
    }
    // Doc05 DM-30 IN_PROGRESS: a concurrent duplicate must not reach the backend twice.
    if (prior.status === 0) {
      return apiError(cid, "REQUEST_IN_PROGRESS", "This request is already being processed. Please wait a moment.", {
        retryable: true,
        headers: { "Retry-After": "2" },
      });
    }
    return new Response(storedBody, {
      status: prior.status,
      headers: { ...BASE_HEADERS, "Content-Type": "application/json", "X-Correlation-Id": cid, "Idempotent-Replay": "true" },
    });
  }
  idem.set(scope, { at: now, status: 0, body: bodyHash });
  persistIdempotency(route, scope, bodyHash, "IN_PROGRESS");
  let res: Response;
  try {
    res = await handler();
  } catch (e) {
    idem.delete(scope);
    throw e;
  }
  // Don't pin transient failures (rate limit / provider down) to the key, so a later retry can still go through.
  if (res.status === 429 || res.status === 503) {
    idem.delete(scope);
    return res;
  }
  const text = await res.clone().text();
  idem.set(scope, { at: now, status: res.status, body: bodyHash + text });
  persistIdempotency(route, scope, bodyHash, res.ok ? "DONE" : "ERROR", await sha256(text));
  return res;
}
