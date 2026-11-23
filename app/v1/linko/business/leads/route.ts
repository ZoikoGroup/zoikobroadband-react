/**
 * PUB-06 POST /v1/linko/business/leads — business specialist enquiry (Doc04 LK-WF-05, Doc01 CF-02).
 *
 * Requires an Idempotency-Key and explicit contact permission. The CRM
 * connector is configured with LINKO_CRM_LEAD_WEBHOOK_URL; without it (or if
 * the CRM doesn't return a reference) nothing is submitted and the visitor is
 * given direct contact routes — never a fictitious receipt.
 */
import { NextRequest } from "next/server";
import { redactSensitive } from "@/app/lib/chatbot/linko";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS, withIdempotency } from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()-]{10,20}$/;

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
    if (!webhook) return unavailable();

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
          requirements: redactSensitive(requirements).text,
          permission: true,
          marketingOptIn: body.marketingOptIn === true, // separate, never pre-ticked
          submittedAt: nowIso(),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const out = (await res.json().catch(() => null)) as { reference?: string } | null;
      // A reference is shown only when the CRM actually returned one (Doc01 CF-02 A4).
      if (!res.ok || !out?.reference) return unavailable();
      return envelope(
        cid,
        "PENDING",
        { reference: String(out.reference).slice(0, 64), queue: "BUSINESS_SPECIALIST", acceptedAt: nowIso() },
        { http: 202, sourceEvidence: { source: "crm", checkedAt: nowIso(), status: "VERIFIED" } },
      );
    } catch {
      return unavailable();
    }
  });
}
