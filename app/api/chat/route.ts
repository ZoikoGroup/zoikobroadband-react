import { apiError, newCorrelationId } from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Retired stateless endpoint. It accepted a client-supplied transcript (including
 * forged assistant turns), which Doc04 §02.1/§13 does not allow. All chat traffic
 * goes through /v1/linko/conversations (server-held, redacted history).
 */
export async function POST() {
  const res = apiError(newCorrelationId(), "GONE", "This endpoint has been retired. Use POST /v1/linko/conversations.", {
    nextAction: "RETRY",
  });
  return res;
}
