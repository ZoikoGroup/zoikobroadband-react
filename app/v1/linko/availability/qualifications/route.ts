/**
 * PUB-04 POST /v1/linko/availability/qualifications — qualify an exact premises (Doc04 LK-WF-03, §11.1).
 *
 * The supplier adapter is feature-flagged (LINKO_QUALIFICATION_ADAPTER=bt) and
 * OFF until the integration is certified (Doc02 R1). When off or failing, the
 * route says it can't verify — it never infers availability from a postcode.
 */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS } from "@/app/lib/linko-api/http";
import { lookupAddress, rememberEligibility } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHECKER = { type: "LINK" as const, label: "Open availability checker", href: "/check-availability" };

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "qual");
  if (limited) return limited;

  const body = await readJson(req);
  const addressId = typeof body?.addressId === "string" ? body.addressId : "";
  const customerType = body?.customerType === "BUSINESS" ? "BUSINESS" : body?.customerType === "RESIDENTIAL" ? "RESIDENTIAL" : null;
  if (!addressId) return apiError(cid, "VALIDATION_ERROR", "addressId is required.", { field: "addressId" });
  if (!customerType) return apiError(cid, "VALIDATION_ERROR", "customerType must be RESIDENTIAL or BUSINESS.", { field: "customerType" });

  const address = lookupAddress(addressId);
  if (!address) {
    return apiError(cid, "NOT_FOUND", "That address selection has expired. Please search your postcode again.", {
      nextAction: "CORRECT_INPUT",
    });
  }

  if (process.env.LINKO_QUALIFICATION_ADAPTER !== "bt") {
    return apiError(cid, "PROVIDER_UNAVAILABLE", "Exact-address checks aren't available in chat yet.", {
      retryable: false,
      nextAction: "HUMAN",
      nextActions: [CHECKER, ...SUPPORT_ACTIONS],
    });
  }

  let data: { success?: boolean; productOfferingQualificationItem?: { product?: { productOffering?: { id?: string } } }[] } | null = null;
  try {
    const res = await fetch(new URL("/api/BritishTelecom/get-products", req.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address_id: address.supplierId, district_code: address.districtCode || "NS" }),
      signal: AbortSignal.timeout(15_000),
    });
    data = await res.json().catch(() => null);
  } catch (err) {
    return apiError(cid, (err as Error).name === "TimeoutError" ? "TIMEOUT" : "PROVIDER_UNAVAILABLE", "We can't check this address right now.", {
      retryable: true,
      nextAction: "HUMAN",
      nextActions: [CHECKER, ...SUPPORT_ACTIONS],
    });
  }
  if (!data?.success) {
    return apiError(cid, "PROVIDER_UNAVAILABLE", "We can't check this address right now.", {
      retryable: true,
      nextAction: "HUMAN",
      nextActions: [CHECKER, ...SUPPORT_ACTIONS],
    });
  }

  const items = data.productOfferingQualificationItem ?? [];
  if (!items.length) {
    return apiError(cid, "ELIGIBILITY_UNKNOWN", "We couldn't confirm services for this exact address.", {
      nextAction: "HUMAN",
      nextActions: SUPPORT_ACTIONS,
    });
  }

  const ids = items.map((i) => i.product?.productOffering?.id ?? "").join(" ");
  const technologies = [
    ...(/fttp|full.?fibre/i.test(ids) ? ["FTTP"] : []),
    ...(/sogea/i.test(ids) ? ["SOGEA"] : []),
  ];
  const checkedAt = nowIso();
  const elig = rememberEligibility({ addressId, customerType, technologies, offerCount: items.length, checkedAt });

  return envelope(
    cid,
    "INDICATIVE",
    {
      eligibilityRef: elig.ref,
      addressLabel: address.label,
      technologies,
      offerCount: items.length,
      saleEligible: null,
      message: "Coverage is indicative pending a current retail quote.",
    },
    {
      sourceEvidence: { source: "contracted_adapter", checkedAt, expiresAt: elig.expiresAt, status: "INDICATIVE" },
      nextActions: [CHECKER],
    },
  );
}
