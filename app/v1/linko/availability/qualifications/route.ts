/**
 * PUB-04 POST /v1/linko/availability/qualifications — qualify an exact premises (Doc04 LK-WF-03, §11.1).
 *
 * The supplier adapter is feature-flagged (LINKO_QUALIFICATION_ADAPTER=bt) and
 * OFF until the integration is certified (Doc02 R1). When off or failing, the
 * route says it can't verify — it never infers availability from a postcode.
 */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS } from "@/app/lib/linko-api/http";
import { getConversation, lookupAddress, rememberEligibility } from "@/app/lib/linko-api/store";
import { persistQualification, persistToolInvocation } from "@/app/lib/linko-db/persist";
import { sha256 } from "@/app/lib/linko-db/db";
import { TEST_NOTICE, TEST_SOURCE, testQualification, testSupplierEnabled } from "@/app/lib/linko-api/testSupplier";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHECKER = { type: "LINK" as const, label: "Open availability checker", href: "/check-availability" };

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "qual");
  if (limited) return limited;

  const body = await readJson(req);
  const conversationId = typeof body?.conversationId === "string" ? body.conversationId : "";
  if (!conversationId || !getConversation(conversationId)) {
    return apiError(cid, "NOT_FOUND", "This conversation has ended or expired. Please start a new one.", {
      field: "conversationId",
      nextAction: "RETRY",
    });
  }
  const addressId = typeof body?.addressId === "string" ? body.addressId : "";
  const customerType = body?.customerType === "BUSINESS" ? "BUSINESS" : body?.customerType === "RESIDENTIAL" ? "RESIDENTIAL" : null;
  if (!addressId) return apiError(cid, "VALIDATION_ERROR", "addressId is required.", { field: "addressId" });
  if (!customerType) return apiError(cid, "VALIDATION_ERROR", "customerType must be RESIDENTIAL or BUSINESS.", { field: "customerType" });

  const address = lookupAddress(addressId, conversationId);
  if (!address) {
    return apiError(cid, "NOT_FOUND", "That address selection has expired. Please search your postcode again.", {
      nextAction: "CORRECT_INPUT",
    });
  }

  // Development test premises (see testSupplier.ts) — never in production, always labelled as test data.
  const testTech = testSupplierEnabled() ? testQualification(address.supplierId) : null;
  if (testTech) {
    if (!testTech.length) {
      return apiError(cid, "ELIGIBILITY_UNKNOWN", `We couldn't confirm services for this exact address. (${TEST_NOTICE})`, {
        nextAction: "HUMAN",
        nextActions: SUPPORT_ACTIONS,
      });
    }
    const checkedAt = nowIso();
    const elig = rememberEligibility({ conversationId, addressId, customerType, technologies: testTech, offerCount: testTech.length, checkedAt });
    persistToolInvocation(conversationId, "PUB_04", "ALLOW", sha256(`PUB_04|test|${addressId}`), "SUCCESS");
    return envelope(
      cid,
      "INDICATIVE",
      { eligibilityRef: elig.ref, addressLabel: address.label, technologies: testTech, offerCount: testTech.length, saleEligible: null, message: TEST_NOTICE },
      { sourceEvidence: { source: TEST_SOURCE, checkedAt, expiresAt: elig.expiresAt, status: "INDICATIVE" }, nextActions: [CHECKER] },
    );
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
  const elig = rememberEligibility({ conversationId, addressId, customerType, technologies, offerCount: items.length, checkedAt });
  // DM-12: coverage is never sale eligibility until a retail quote exists (sale_eligibility UNKNOWN).
  persistQualification(addressId, "UNKNOWN", elig.ref, elig.expiresAt, technologies.length ? "COVERAGE_INDICATIVE" : "NO_TECHNOLOGY_MATCH");
  persistToolInvocation(conversationId, "PUB_04", "ALLOW", sha256(`PUB_04|${addressId}|${customerType}`), "SUCCESS");

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
