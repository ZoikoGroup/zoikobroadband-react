/**
 * GET /v1/linko/health — liveness/readiness probe (Doc08 G-07).
 * Public callers only get {status, checkedAt}; internal detail (budget, breaker,
 * versions) needs the x-linko-health-token header (Doc14 PLAT-09).
 */
import { timingSafeEqual } from "node:crypto";
import { NextRequest } from "next/server";
import { LINKO_RELEASE } from "@/app/lib/chatbot/linko";
import { aiHealth } from "@/app/lib/linko-api/assistant";
import { limit, newCorrelationId } from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorised(req: NextRequest) {
  const want = process.env.LINKO_HEALTH_TOKEN;
  const got = req.headers.get("x-linko-health-token");
  if (!want || !got) return false;
  const a = Buffer.from(want);
  const b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function GET(req: NextRequest) {
  const limited = limit(req, newCorrelationId(), "health", 30);
  if (limited) return limited;
  const ai = aiHealth();
  const status = !ai.aiEnabled ? "DEGRADED_AI_DISABLED" : ai.breakerOpen || ai.budgetUsedPct >= 100 ? "DEGRADED" : "OK";
  const body = authorised(req)
    ? { status, release: process.env.LINKO_RELEASE || LINKO_RELEASE, checkedAt: new Date().toISOString(), ...ai }
    : { status, checkedAt: new Date().toISOString() };
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}
