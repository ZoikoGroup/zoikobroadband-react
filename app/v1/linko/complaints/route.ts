/**
 * PUB-11 POST /v1/linko/complaints — formal complaint intake (Doc04 LK-WF-14, Doc01 CF-07).
 * Only a CRM-accepted complaint gets a reference. Without the CRM connector
 * (LINKO_CRM_COMPLAINT_WEBHOOK_URL) nothing is submitted and the official
 * complaint route is returned instead — never "complaint lodged".
 */
import { NextRequest } from "next/server";
import { EXTERNAL_LINKS, PRIVACY_NOTICE_VERSION, redactSensitive } from "@/app/lib/chatbot/linko";
import { persistComplaint, persistConsent } from "@/app/lib/linko-db/persist";
import {
  apiError,
  envelope,
  isTimeout,
  limit,
  newCorrelationId,
  nowIso,
  parseContact,
  readJson,
  SUPPORT_ACTIONS,
  uncertainSubmission,
  withIdempotency,
} from "@/app/lib/linko-api/http";

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
  // Only a validated {type, value} contact is forwarded (Doc05 §06.2 allowlist).
  const contact = body.contact === undefined || body.contact === null ? null : parseContact(body.contact);
  if (body.contact != null && !contact)
    return apiError(cid, "VALIDATION_ERROR", "Enter a valid email address or phone number.", { field: "contact" });

  return withIdempotency(req, cid, "complaints", body, async () => {
    const unavailable = () =>
      apiError(cid, "PROVIDER_UNAVAILABLE", "We can't log complaints from chat just now. Nothing has been submitted.", {
        nextAction: "HUMAN",
        nextActions: [{ type: "LINK", label: "Make a complaint", href: "/contact-us" }, ...SUPPORT_ACTIONS],
      });
    const webhook = process.env.LINKO_CRM_COMPLAINT_WEBHOOK_URL;
    persistConsent(null, "COMPLAINT_CONTACT", PRIVACY_NOTICE_VERSION, "GRANT", cid);
    if (!webhook) return unavailable();
    try {
      const firstExpressedAt = nowIso(); // preserved, never reset on transfer (Doc10)
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": req.headers.get("idempotency-key") ?? "" },
        body: JSON.stringify({
          source: "linko",
          summary: redactSensitive(summary).text,
          contact,
          firstExpressedAt,
          consents: [{ purposeCode: "COMPLAINT_CONTACT", action: "GRANT", noticeVersion: PRIVACY_NOTICE_VERSION, recordedAt: firstExpressedAt }],
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const out = (await res.json().catch(() => null)) as { reference?: string } | null;
      if (!res.ok || !out?.reference) return unavailable();
      persistComplaint(null, "ACCEPTED", String(out.reference).slice(0, 64));
      return envelope(
        cid,
        "PENDING",
        { reference: String(out.reference).slice(0, 64), receivedAt: firstExpressedAt, submissionState: "ACCEPTED" },
        {
          http: 202,
          sourceEvidence: { source: "crm", checkedAt: nowIso(), status: "VERIFIED" },
          nextActions: [{ type: "LINK", label: "Complaints rules (Ofcom)", href: EXTERNAL_LINKS.ofcomComplaints }, ...SUPPORT_ACTIONS],
        },
      );
    } catch (e) {
      // The CRM may already have it: don't say "nothing submitted" and don't invite a resubmit.
      if (isTimeout(e)) persistComplaint(null, "UNKNOWN", null); // UNKNOWN is never success (T-27)
      return isTimeout(e) ? uncertainSubmission(cid, "complaint") : unavailable();
    }
  });
}
