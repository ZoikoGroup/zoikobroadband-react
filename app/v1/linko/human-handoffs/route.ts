/**
 * PUB-12 POST /v1/linko/human-handoffs — staff transfer or callback request (Doc04 LK-WF-17, Doc01 CF-08).
 *
 * No live-chat queue adapter is connected, so there is no "transferring you
 * now" and no handoff reference. The response lists the real contact routes
 * and, only when the visitor consented, a minimised summary (topics only —
 * no free text, contact details or personal data) they can paste themselves.
 */
import { NextRequest } from "next/server";
import { COMPANY } from "@/app/lib/chatbot/linko";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson } from "@/app/lib/linko-api/http";
import { getConversation } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHANNELS = ["LIVE_CHAT", "CALLBACK", "ENQUIRY", "PHONE", "ANY"] as const;
const REASONS = ["USER_REQUEST", "SAFETY", "COMPLAINT", "BUSINESS", "UNRESOLVED", "OTHER"] as const;

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "handoff");
  if (limited) return limited;

  const body = await readJson(req);
  const channel = body?.channel ?? "ANY";
  const reason = body?.reason ?? "USER_REQUEST";
  if (!CHANNELS.includes(channel as (typeof CHANNELS)[number]))
    return apiError(cid, "VALIDATION_ERROR", `channel must be one of ${CHANNELS.join(", ")}.`, { field: "channel" });
  if (!REASONS.includes(reason as (typeof REASONS)[number]))
    return apiError(cid, "VALIDATION_ERROR", `reason must be one of ${REASONS.join(", ")}.`, { field: "reason" });
  if (typeof body?.shareSummary !== "boolean")
    return apiError(cid, "VALIDATION_ERROR", "shareSummary must be true or false.", { field: "shareSummary" });

  let summary: string | null = null;
  if (body.shareSummary) {
    const conv = typeof body.conversationId === "string" ? getConversation(body.conversationId) : null;
    const topics = conv?.topics.length ? conv.topics : Array.isArray(body.topics) ? body.topics.filter((t): t is string => typeof t === "string").slice(0, 8) : [];
    summary = [
      "Linko chat summary (Zoiko Broadband AI assistant)",
      `Topics: ${topics.length ? topics.map((t) => t.slice(0, 60)).join("; ") : "general enquiry"}`,
      `Reason for contact: ${String(reason).toLowerCase().replace(/_/g, " ")}`,
      "Nothing was ordered, booked or changed in the chat.",
    ].join("\n");
  }

  return envelope(
    cid,
    "REQUIRES_ACTION",
    {
      handoffRef: null, // only issued when a support system accepts the case
      state: "NOT_CONNECTED",
      message: "Choose how you'd like to contact our team. Linko can't transfer the chat directly yet.",
      summary,
      channels: [
        { channel: "LIVE_CHAT", label: "Chat with an adviser", href: COMPANY.liveChatUrl },
        { channel: "CALLBACK", label: "Request a callback", href: "/get-help" },
        { channel: "ENQUIRY", label: "Send an enquiry", href: "/contact-us" },
        { channel: "PHONE", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
      ],
      hours: { source: "/get-help", note: "Current opening hours are published on the Get help page." },
    },
    { sourceEvidence: { source: "support_routing_config", checkedAt: nowIso(), status: "VERIFIED" } },
  );
}
