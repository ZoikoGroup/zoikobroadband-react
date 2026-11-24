/**
 * PUB-08 POST /v1/linko/checkout/handoffs — authorised checkout transfer (Doc04 LK-WF-07, §11.3).
 * Requires a current quote; no quote service is connected, so every request is
 * refused as QUOTE_EXPIRED and no transfer link is issued.
 */
import { NextRequest } from "next/server";
import { apiError, limit, newCorrelationId, readJson, withIdempotency } from "@/app/lib/linko-api/http";
import { persistToolInvocation } from "@/app/lib/linko-db/persist";
import { sha256 } from "@/app/lib/linko-db/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "checkout");
  if (limited) return limited;

  const body = await readJson(req);
  if (typeof body?.quoteRef !== "string" || !body.quoteRef)
    return apiError(cid, "VALIDATION_ERROR", "quoteRef is required.", { field: "quoteRef" });
  if (typeof body?.termsVersion !== "string" || !body.termsVersion)
    return apiError(cid, "VALIDATION_ERROR", "termsVersion is required.", { field: "termsVersion" });

  persistToolInvocation(null, "PUB_08", "DENY", sha256(`PUB_08|${body.quoteRef}`), "DENIED");
  return withIdempotency(req, cid, "checkout/handoffs", body, async () =>
    apiError(cid, "QUOTE_EXPIRED", "There's no current quote for this address. Please check availability again to see current prices.", {
      nextAction: "CORRECT_INPUT",
      nextActions: [{ type: "LINK", label: "Open availability checker", href: "/check-availability" }],
    }),
  );
}
