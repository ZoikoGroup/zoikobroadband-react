/**
 * PUB-09 GET /v1/linko/service-status?area=SW1A — approved area-level incident check (Doc04 LK-WF-11).
 * Only the outward postcode area is accepted (no full postcode in URLs).
 * With no incident feed connected the answer is "can't verify" — never "all clear".
 */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso } from "@/app/lib/linko-api/http";
import { persistToolInvocation } from "@/app/lib/linko-db/persist";
import { sha256 } from "@/app/lib/linko-db/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NEXT = [
  { type: "FLOW" as const, label: "Troubleshoot connection", flow: "faultType" },
  { type: "LINK" as const, label: "Report a fault", href: "/report-a-fault" },
  { type: "FLOW" as const, label: "Speak to support", flow: "handoff" },
];

export async function GET(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "status");
  if (limited) return limited;

  const area = (req.nextUrl.searchParams.get("area") ?? "").trim().toUpperCase();
  if (area && !/^[A-Z]{1,2}\d[A-Z\d]?$/.test(area)) {
    return apiError(cid, "VALIDATION_ERROR", "area must be the first part of a UK postcode, for example SW1A.", { field: "area" });
  }

  const feed = process.env.LINKO_STATUS_FEED_URL;
  if (feed) {
    try {
      const url = new URL(feed);
      if (area) url.searchParams.set("area", area);
      const res = await fetch(url, { signal: AbortSignal.timeout(8_000), cache: "no-store" });
      const out = (await res.json().catch(() => null)) as { incidents?: { summary?: string; updatedAt?: string }[] } | null;
      if (res.ok && out && Array.isArray(out.incidents)) {
        const incidents = out.incidents.slice(0, 5).map((i) => ({ summary: String(i.summary ?? "").slice(0, 300), updatedAt: i.updatedAt ?? null }));
        return envelope(
          cid,
          "CONFIRMED",
          {
            state: incidents.length ? "INCIDENT_REPORTED" : "NO_KNOWN_INCIDENT",
            incidents,
            message: incidents.length
              ? "There's a reported issue that may affect your area."
              : "There's no reported issue for this area right now. That doesn't rule out a problem with your own line.",
          },
          { sourceEvidence: { source: "incident_feed", checkedAt: nowIso(), status: "VERIFIED" }, nextActions: NEXT },
        );
      }
    } catch {
      // fall through to the "can't verify" answer
    }
  }

  persistToolInvocation(req.nextUrl.searchParams.get("conversationId"), "PUB_09", "ALLOW", sha256(`PUB_09|${area}`), "UNKNOWN");
  return envelope(
    cid,
    "UNAVAILABLE",
    {
      state: "UNKNOWN",
      incidents: [],
      message: "I can't verify the service status in your area right now, so I can't tell you whether there's a reported issue.",
    },
    { sourceEvidence: { source: "incident_feed", checkedAt: nowIso(), status: "UNKNOWN" }, nextActions: NEXT },
  );
}
