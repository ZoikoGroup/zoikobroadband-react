/**
 * PUB-05 GET /v1/linko/plans?qualificationRef=… — eligible plan snapshots (Doc04 LK-WF-04, §11.2).
 * No signed retail catalogue is connected yet, so this returns an honest
 * UNAVAILABLE state with no prices, speeds or terms (never invented).
 */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso } from "@/app/lib/linko-api/http";
import { lookupEligibility } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "plans");
  if (limited) return limited;

  const ref = req.nextUrl.searchParams.get("qualificationRef") ?? "";
  if (!ref) return apiError(cid, "VALIDATION_ERROR", "qualificationRef is required.", { field: "qualificationRef" });
  if (!lookupEligibility(ref)) {
    return apiError(cid, "QUOTE_EXPIRED", "This address check has expired. Please check the address again.", { nextAction: "CORRECT_INPUT" });
  }

  return envelope(
    cid,
    "UNAVAILABLE",
    { plans: [], message: "Plan prices and terms for this address are shown in the secure availability checker." },
    {
      sourceEvidence: { source: "approved_catalogue", checkedAt: nowIso(), status: "UNKNOWN" },
      nextActions: [{ type: "LINK", label: "Open availability checker", href: "/check-availability" }],
    },
  );
}
