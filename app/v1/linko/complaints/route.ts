/**
 * PUB-11 POST /v1/linko/complaints — formal complaint intake (Doc04 LK-WF-14, Doc01 CF-07).
 * Only a CRM-accepted complaint gets a reference. Without the CRM connector
 * (LINKO_CRM_COMPLAINT_WEBHOOK_URL) nothing is submitted and the official
 * complaint route is returned instead — never "complaint lodged".
 */
import { NextRequest } from "next/server";
import { redactSensitive } from "@/app/lib/chatbot/linko";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS, withIdempotency } from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "complaint");
  if (limited) return limited;

  const body = await readJson(req);
  const summary = typeof body?.summary === "string" ? body.summary.trim() : "";
  if (!summary || summary.length > 2000)
    return apiError(cid, "VALIDATION_ERROR", "Describe the complaint in up to 2,000 characters.", { field: "summary" });
  if (body?.permission !== true)
    return apiError(cid, "VALIDATION_ERROR", "Please confirm we may contact you about this complaint.", { field: "permission" });

  return withIdempotency(req, cid, "complaints", body, async () => {
    const unavailable = () =>
      apiError(cid, "PROVIDER_UNAVAILABLE", "We can't log complaints from chat just now. Nothing has been submitted.", {
        nextAction: "HUMAN",
        nextActions: [{ type: "LINK", label: "Make a complaint", href: "/contact-us" }, ...SUPPORT_ACTIONS],
      });
    const webhook = process.env.LINKO_CRM_COMPLAINT_WEBHOOK_URL;
    if (!webhook) return unavailable();
    try {
      const firstExpressedAt = nowIso(); // preserved, never reset on transfer (Doc10)
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": req.headers.get("idempotency-key") ?? "" },
        body: JSON.stringify({
          source: "linko",
          summary: redactSensitive(summary).text,
          contact: body.contact ?? null,
          firstExpressedAt,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const out = (await res.json().catch(() => null)) as { reference?: string } | null;
      if (!res.ok || !out?.reference) return unavailable();
      return envelope(
        cid,
        "PENDING",
        { reference: String(out.reference).slice(0, 64), receivedAt: firstExpressedAt },
        { http: 202, sourceEvidence: { source: "crm", checkedAt: nowIso(), status: "VERIFIED" } },
      );
    } catch {
      return unavailable();
    }
  });
}
