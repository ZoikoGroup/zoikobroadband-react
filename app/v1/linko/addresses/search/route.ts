/**
 * PUB-03 POST /v1/linko/addresses/search — postcode → address options (Doc04 LK-WF-03).
 * Supplier identifiers stay on the server; the browser only gets opaque addressIds.
 * The postcode travels in the body, never the URL.
 */
import { NextRequest } from "next/server";
import { normalisePostcode } from "@/app/lib/chatbot/linko";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS } from "@/app/lib/linko-api/http";
import { forgetEligibility, getConversation, rememberAddress } from "@/app/lib/linko-api/store";
import { persistCandidate, persistEnquiry, persistToolInvocation } from "@/app/lib/linko-db/persist";
import { sha256 } from "@/app/lib/linko-db/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "addr");
  if (limited) return limited;

  const body = await readJson(req);
  const conversationId = typeof body?.conversationId === "string" ? body.conversationId : "";
  if (!conversationId || !getConversation(conversationId)) {
    return apiError(cid, "NOT_FOUND", "This conversation has ended or expired. Please start a new one.", {
      field: "conversationId",
      nextAction: "RETRY",
    });
  }
  const postcode = typeof body?.postcode === "string" ? normalisePostcode(body.postcode) : null;
  if (!postcode) {
    return apiError(cid, "VALIDATION_ERROR", "Enter a full UK postcode, for example SW1A 1AA.", {
      field: "postcode",
      nextAction: "CORRECT_INPUT",
    });
  }

  let data: { success?: boolean; addresses?: { id?: string; display?: string; districtCode?: string }[] } | null = null;
  try {
    const res = await fetch(new URL("/api/BritishTelecom/search-address", req.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postcode }),
      signal: AbortSignal.timeout(12_000),
    });
    data = await res.json().catch(() => null);
  } catch (err) {
    const timedOut = (err as Error).name === "TimeoutError";
    return apiError(cid, timedOut ? "TIMEOUT" : "PROVIDER_UNAVAILABLE", "We can't check addresses right now.", {
      retryable: true,
      nextAction: "HUMAN",
      nextActions: [{ type: "LINK", label: "Open availability checker", href: "/check-availability" }, ...SUPPORT_ACTIONS],
    });
  }
  if (!data?.success) {
    return apiError(cid, "PROVIDER_UNAVAILABLE", "We can't check addresses right now.", {
      retryable: true,
      nextAction: "HUMAN",
      nextActions: [{ type: "LINK", label: "Open availability checker", href: "/check-availability" }, ...SUPPORT_ACTIONS],
    });
  }

  forgetEligibility(conversationId); // a new premises search invalidates earlier qualification (AC-08)
  // DM-10/11: the enquiry and candidates are stored encrypted with a short TTL; raw supplier ids never leave the server.
  const enquiryId = persistEnquiry(conversationId, postcode, "COMPLETE", cid, 20 * 60_000);
  const matches = (data.addresses ?? [])
    .filter((a) => a.id && a.display)
    .slice(0, 100)
    .map((a) => {
      const addressId = rememberAddress({ conversationId, label: a.display!, supplierId: a.id!, districtCode: a.districtCode || "", postcode });
      if (enquiryId) persistCandidate(enquiryId, addressId, a.display!, 20 * 60_000);
      return { addressId, label: a.display! };
    });
  persistToolInvocation(conversationId, "PUB_03", "ALLOW", sha256(`PUB_03|${postcode}`), "SUCCESS");

  return envelope(
    cid,
    "CONFIRMED",
    { postcode, matches },
    {
      sourceEvidence: { source: "address_adapter", checkedAt: nowIso(), status: "VERIFIED" },
      nextActions: matches.length
        ? []
        : [{ type: "HUMAN", label: "Ask our team to check my address" }, { type: "LINK", label: "Try the availability checker", href: "/check-availability" }],
    },
  );
}
