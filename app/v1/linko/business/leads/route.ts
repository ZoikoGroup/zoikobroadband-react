/**
 * PUB-06 POST /v1/linko/business/leads — business specialist enquiry (Doc04 LK-WF-05, Doc01 CF-02).
 *
 * Requires an Idempotency-Key and explicit contact permission. The CRM
 * connector is configured with LINKO_CRM_LEAD_WEBHOOK_URL; without it (or if
 * the CRM doesn't return a reference) nothing is submitted and the visitor is
 * given direct contact routes — never a fictitious receipt.
 */
import { NextRequest } from "next/server";
import { PRIVACY_NOTICE_VERSION, redactSensitive } from "@/app/lib/chatbot/linko";
import { persistConsent, persistLead } from "@/app/lib/linko-db/persist";
import {
  apiError,
  EMAIL_RE,
  envelope,
  isTimeout,
  limit,
  newCorrelationId,
  nowIso,
  PHONE_RE,
  readJson,
  SUPPORT_ACTIONS,
  uncertainSubmission,
  withIdempotency,
} from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


const FORM = { type: "LINK" as const, label: "Use the business enquiry form", href: "/business-broadband" };

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "lead");
  if (limited) return limited;

  const body = await readJson(req);
  if (!body) return apiError(cid, "VALIDATION_ERROR", "Request body must be JSON.");

  const sitesCount = body.sitesCount;
  const businessName = typeof body.businessName === "string" ? body.businessName.trim() : "";
  const contactName = typeof body.contactName === "string" ? body.contactName.trim() : "";
  const channel = body.contactChannel as { type?: unknown; value?: unknown } | undefined;
  const requirements = typeof body.requirements === "string" ? body.requirements.trim() : "";

  if (!["ONE", "MULTIPLE", "NOT_SURE"].includes(String(sitesCount)))
    return apiError(cid, "VALIDATION_ERROR", "Choose how many sites this is for.", { field: "sitesCount" });
  if (!businessName || businessName.length > 120)
    return apiError(cid, "VALIDATION_ERROR", "Enter the business name.", { field: "businessName" });
  if (!contactName || contactName.length > 120)
    return apiError(cid, "VALIDATION_ERROR", "Enter a contact name.", { field: "contactName" });
  if (!channel || (channel.type !== "EMAIL" && channel.type !== "PHONE") || typeof channel.value !== "string")
    return apiError(cid, "VALIDATION_ERROR", "Choose how we should contact you.", { field: "contactChannel" });
  if (channel.type === "EMAIL" && !EMAIL_RE.test(channel.value))
    return apiError(cid, "VALIDATION_ERROR", "Enter a valid work email address.", { field: "contactChannel" });
  if (channel.type === "PHONE" && !PHONE_RE.test(channel.value))
    return apiError(cid, "VALIDATION_ERROR", "Enter a valid phone number.", { field: "contactChannel" });
  const siteOutward = typeof body.siteOutwardCode === "string" ? body.siteOutwardCode.trim().toUpperCase() : "";
  if (siteOutward && !/^[A-Z]{1,2}\d[A-Z\d]?$/.test(siteOutward))
    return apiError(cid, "VALIDATION_ERROR", "Enter the first part of the postcode only, for example SW1A.", { field: "siteOutwardCode" });
  if (requirements.length > 1000)
    return apiError(cid, "VALIDATION_ERROR", "Please keep requirements under 1,000 characters.", { field: "requirements" });
  if (body.permission !== true)
    return apiError(cid, "VALIDATION_ERROR", "Please confirm we may contact you about this enquiry.", { field: "permission" });

  return withIdempotency(req, cid, "business/leads", body, async () => {
    const webhook = process.env.LINKO_CRM_LEAD_WEBHOOK_URL;
    const unavailable = () =>
      apiError(cid, "PROVIDER_UNAVAILABLE", "We can't send business enquiries from chat just now. Nothing has been submitted.", {
        retryable: false,
        nextAction: "HUMAN",
        nextActions: [FORM, ...SUPPORT_ACTIONS],
      });
    const band = String(sitesCount);
    persistConsent(null, "BUSINESS_CONTACT", PRIVACY_NOTICE_VERSION, "GRANT", cid);
    if (body.marketingOptIn === true) persistConsent(null, "MARKETING", PRIVACY_NOTICE_VERSION, "GRANT", cid);
    if (!webhook) {
      persistLead(null, band, "FAILED", null);
      return unavailable();
    }

    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": req.headers.get("idempotency-key") ?? "" },
        body: JSON.stringify({
          source: "linko",
          sitesCount,
          businessName,
          contactName,
          contactChannel: channel,
          siteOutwardCode: siteOutward || null,
          requirements: redactSensitive(requirements).text,
          permission: true,
          marketingOptIn: body.marketingOptIn === true, // separate, never pre-ticked
          // Doc05 DM-09 purpose-specific consent records.
          consents: [
            { purposeCode: "BUSINESS_CONTACT", action: "GRANT", noticeVersion: PRIVACY_NOTICE_VERSION, recordedAt: nowIso() },
            ...(body.marketingOptIn === true
              ? [{ purposeCode: "MARKETING", action: "GRANT", noticeVersion: PRIVACY_NOTICE_VERSION, recordedAt: nowIso() }]
              : []),
          ],
          submittedAt: nowIso(),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const out = (await res.json().catch(() => null)) as { reference?: string } | null;
      // A reference is shown only when the CRM actually returned one (Doc01 CF-02 A4).
      if (!res.ok || !out?.reference) {
        persistLead(null, band, "FAILED", null);
        return unavailable();
      }
      persistLead(null, band, "ACCEPTED", String(out.reference).slice(0, 64));
      return envelope(
        cid,
        "PENDING",
        { reference: String(out.reference).slice(0, 64), queue: "BUSINESS_SPECIALIST", acceptedAt: nowIso(), handoffStatus: "ACCEPTED" },
        {
          http: 202,
          sourceEvidence: { source: "crm", checkedAt: nowIso(), status: "VERIFIED" },
          nextActions: SUPPORT_ACTIONS.filter((a) => a.type === "PHONE"),
        },
      );
    } catch (e) {
      persistLead(null, band, isTimeout(e) ? "PENDING" : "FAILED", null);
      return isTimeout(e) ? uncertainSubmission(cid, "enquiry") : unavailable();
    }
  });
}
