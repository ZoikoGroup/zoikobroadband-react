/**
 * PUB-13 POST /v1/linko/privacy/requests — data-rights pathway (Doc04 LK-WF-18).
 * Collects no identifying details in chat; returns the approved route only.
 */
import { NextRequest } from "next/server";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson } from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES = ["ACCESS", "ERASURE", "RECTIFICATION", "RESTRICTION", "TRANSCRIPT_QUESTION"] as const;

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "privacy");
  if (limited) return limited;

  const body = await readJson(req);
  const type = body?.type;
  if (!TYPES.includes(type as (typeof TYPES)[number]))
    return apiError(cid, "VALIDATION_ERROR", `type must be one of ${TYPES.join(", ")}.`, { field: "type" });

  return envelope(
    cid,
    "REQUIRES_ACTION",
    {
      route: "PRIVACY_NOTICE",
      message:
        type === "TRANSCRIPT_QUESTION"
          ? "Linko chats are saved only in your own browser. You can delete them from Chat history in the Linko menu. Zoiko Broadband doesn't store them."
          : "Data-rights requests are handled through our privacy process, which verifies your identity first. Linko can't action them in chat.",
    },
    {
      sourceEvidence: { source: "privacy_policy", checkedAt: nowIso(), status: "VERIFIED" },
      nextActions: [
        { type: "LINK", label: "Read privacy notice", href: "/privacy-notice" },
        { type: "LINK", label: "Contact us", href: "/contact-us" },
      ],
    },
  );
}
