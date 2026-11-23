/**
 * PUB-03 POST /v1/linko/addresses/search — postcode → address options (Doc04 LK-WF-03).
 * Supplier identifiers stay on the server; the browser only gets opaque addressIds.
 * The postcode travels in the body, never the URL.
 */
import { NextRequest } from "next/server";
import { normalisePostcode } from "@/app/lib/chatbot/linko";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS } from "@/app/lib/linko-api/http";
import { rememberAddress } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "addr");
  if (limited) return limited;

  const body = await readJson(req);
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

  const matches = (data.addresses ?? [])
    .filter((a) => a.id && a.display)
    .slice(0, 100)
    .map((a) => ({
      addressId: rememberAddress({ label: a.display!, supplierId: a.id!, districtCode: a.districtCode || "", postcode }),
      label: a.display!,
    }));

  return envelope(
    cid,
    "CONFIRMED",
    { postcode, matches, searchToken: `srch_${crypto.randomUUID().slice(0, 12)}` },
    {
      sourceEvidence: { source: "address_adapter", checkedAt: nowIso(), status: "VERIFIED" },
      nextActions: matches.length
        ? []
        : [{ type: "HUMAN", label: "Ask our team to check my address" }, { type: "LINK", label: "Try the availability checker", href: "/check-availability" }],
    },
  );
}
