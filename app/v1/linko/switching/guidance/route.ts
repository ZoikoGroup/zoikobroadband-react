/** PUB-07 POST /v1/linko/switching/guidance — approved One Touch Switch guidance, no switch receipt (Doc04 LK-WF-06). */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson } from "@/app/lib/linko-api/http";
import { RULES_VERSION, switchingGuidance } from "@/app/lib/linko-api/rules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "switch");
  if (limited) return limited;

  const body = await readJson(req);
  const customerType = body?.customerType;
  if (customerType !== "RESIDENTIAL" && customerType !== "BUSINESS")
    return apiError(cid, "VALIDATION_ERROR", "customerType must be RESIDENTIAL or BUSINESS.", { field: "customerType" });
  if (typeof body?.sameAddress !== "boolean")
    return apiError(cid, "VALIDATION_ERROR", "sameAddress must be true or false.", { field: "sameAddress" });

  const g = switchingGuidance({
    customerType,
    sameAddress: body.sameAddress,
    hasLandlineOrTelecare: body.hasLandlineOrTelecare === true,
  });
  return envelope(cid, g.outcome === "HANDOFF" ? "REQUIRES_ACTION" : "CONFIRMED", g, {
    sourceEvidence: { source: "approved_switching_policy", version: RULES_VERSION, checkedAt: nowIso(), status: "VERIFIED" },
    nextActions:
      g.route === "RESIDENTIAL_OTS"
        ? [{ type: "FLOW", label: "Check my new connection", flow: "availability" }, { type: "LINK", label: "Understand switching", href: "/switch-to-zoiko" }]
        : [{ type: "FLOW", label: "Speak to a person", flow: "handoff" }],
  });
}
