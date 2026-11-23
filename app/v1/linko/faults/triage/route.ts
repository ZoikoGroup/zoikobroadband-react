/**
 * PUB-10 POST /v1/linko/faults/triage — safe fault guidance from approved rules (Doc04 LK-WF-11/12/15).
 * Digital voice / telecare flags always escalate first, with no troubleshooting steps.
 */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson } from "@/app/lib/linko-api/http";
import { RULES_VERSION, SYMPTOMS, Symptom, triage } from "@/app/lib/linko-api/rules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "triage");
  if (limited) return limited;

  const body = await readJson(req);
  const symptom = body?.symptom;
  if (typeof symptom !== "string" || !SYMPTOMS.includes(symptom as Symptom)) {
    return apiError(cid, "VALIDATION_ERROR", `symptom must be one of ${SYMPTOMS.join(", ")}.`, { field: "symptom" });
  }

  const result = triage({
    symptom: symptom as Symptom,
    allDevices: typeof body?.allDevices === "boolean" ? body.allDevices : null,
    digitalVoice: body?.digitalVoice === true,
    telecareOrAlarm: body?.telecareOrAlarm === true,
  });

  return envelope(cid, result.safetyEscalation ? "REQUIRES_ACTION" : "CONFIRMED", result, {
    sourceEvidence: { source: "approved_troubleshooting_kb", version: RULES_VERSION, checkedAt: nowIso(), status: "VERIFIED" },
    nextActions: result.safetyEscalation
      ? [
          { type: "PHONE", label: "Call +44 (0)20 7164 6399", href: "tel:+442071646399" },
          { type: "FLOW", label: "Speak to a specialist", flow: "handoffChannels" },
        ]
      : [
          { type: "LINK", label: "Report a fault", href: "/report-a-fault" },
          { type: "FLOW", label: "Contact support", flow: "handoff" },
        ],
  });
}
