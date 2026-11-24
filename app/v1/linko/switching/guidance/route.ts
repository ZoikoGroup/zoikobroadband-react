/** PUB-07 POST /v1/linko/switching/guidance — approved One Touch Switch guidance, no switch receipt (Doc04 LK-WF-06). */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson } from "@/app/lib/linko-api/http";
import { RULES_VERSION, switchingGuidance } from "@/app/lib/linko-api/rules";
import { persistSwitchGuidance } from "@/app/lib/linko-db/persist";

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

  // LK-WF-06: the telecare / landline question must be answered before guidance is given.
  if (typeof body?.hasLandlineOrTelecare !== "boolean")
    return apiError(cid, "VALIDATION_ERROR", "hasLandlineOrTelecare must be true or false.", { field: "hasLandlineOrTelecare" });

  const g = switchingGuidance({
    customerType,
    sameAddress: body.sameAddress,
    hasLandlineOrTelecare: body.hasLandlineOrTelecare,
  });
  const data = { ...g, journeyType: customerType === "BUSINESS" ? "BUSINESS" : "RESIDENTIAL_OTS", guidanceVersion: RULES_VERSION };
  persistSwitchGuidance(
    typeof body?.conversationId === "string" ? body.conversationId : null,
    data.journeyType as "BUSINESS" | "RESIDENTIAL_OTS",
    RULES_VERSION,
    g.outcome === "HANDOFF" ? "HANDOFF" : "INFO_ONLY",
  );
  return envelope(cid, g.outcome === "HANDOFF" ? "REQUIRES_ACTION" : "CONFIRMED", data, {
    sourceEvidence: { source: "approved_switching_policy", version: RULES_VERSION, checkedAt: nowIso(), status: "VERIFIED" },
    nextActions:
      g.route === "RESIDENTIAL_OTS"
        ? [{ type: "FLOW", label: "Check my new connection", flow: "availability" }, { type: "LINK", label: "Understand switching", href: "/switch-to-zoiko" }]
        : [{ type: "FLOW", label: "Speak to a person", flow: "handoff" }],
  });
}
