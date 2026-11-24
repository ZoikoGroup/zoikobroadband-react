/**
 * PUB-12 POST /v1/linko/human-handoffs — staff transfer or callback request (Doc04 LK-WF-17, Doc01 CF-08).
 *
 * No live-chat queue adapter is connected, so there is no "transferring you
 * now" and no handoff reference. The response lists the real contact routes
 * and, only when the visitor consented, a minimised summary (topics only —
 * no free text, contact details or personal data) they can paste themselves.
 */
import { NextRequest } from "next/server";
import { COMPANY, FLOW_TOPICS, PRIVACY_NOTICE_VERSION } from "@/app/lib/chatbot/linko";
import { persistConsent, persistHandover, withdrawHandoverSummary } from "@/app/lib/linko-db/persist";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, withIdempotency } from "@/app/lib/linko-api/http";
import { getConversation } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Doc05 DM-19 channel enum (LIVE_CHAT | CALLBACK | TICKET) plus PHONE / ANY; ENQUIRY is accepted as an alias of TICKET.
const CHANNELS = ["LIVE_CHAT", "CALLBACK", "TICKET", "ENQUIRY", "PHONE", "ANY"] as const;
// Doc10 HS-WF-10-02 triage classes.
const REASONS = ["USER_REQUEST", "SAFETY", "VULNERABILITY", "COMPLAINT", "BUSINESS", "FAULT", "BILLING", "ORDER", "UNRESOLVED", "OTHER"] as const;
// Doc10 §02.1 priorities: P0 safety, REGULATORY complaints, HIGH billing/order problems, NORMAL otherwise.
const PRIORITY: Record<string, string> = {
  SAFETY: "P0_SAFETY",
  VULNERABILITY: "P0_SAFETY",
  COMPLAINT: "REGULATORY",
  BILLING: "HIGH",
  ORDER: "HIGH",
};
const PRIORITY_TEXT: Record<string, string> = { P0_SAFETY: "urgent – safety", REGULATORY: "complaint", HIGH: "high", NORMAL: "normal" };
const DB_PRIORITY: Record<string, "URGENT_SAFETY" | "REGULATORY" | "HIGH" | "NORMAL"> = {
  P0_SAFETY: "URGENT_SAFETY",
  REGULATORY: "REGULATORY",
  HIGH: "HIGH",
};

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "handoff");
  if (limited) return limited;

  const body = await readJson(req);

  // HS-T056: the visitor withdraws a summary they shared earlier.
  if (body?.withdraw === true) {
    if (typeof body.handoffRef !== "string") return apiError(cid, "VALIDATION_ERROR", "handoffRef is required.", { field: "handoffRef" });
    withdrawHandoverSummary(body.handoffRef, PRIVACY_NOTICE_VERSION);
    return envelope(cid, "CONFIRMED", { withdrawn: true, message: "Done — the summary has been withdrawn and our team can no longer see it." });
  }

  const channel = body?.channel ?? "ANY";
  const reason = body?.reason ?? "USER_REQUEST";
  if (!CHANNELS.includes(channel as (typeof CHANNELS)[number]))
    return apiError(cid, "VALIDATION_ERROR", `channel must be one of ${CHANNELS.join(", ")}.`, { field: "channel" });
  if (!REASONS.includes(reason as (typeof REASONS)[number]))
    return apiError(cid, "VALIDATION_ERROR", `reason must be one of ${REASONS.join(", ")}.`, { field: "reason" });
  if (typeof body?.shareSummary !== "boolean")
    return apiError(cid, "VALIDATION_ERROR", "shareSummary must be true or false.", { field: "shareSummary" });
  if (body.shareTranscript !== undefined && typeof body.shareTranscript !== "boolean")
    return apiError(cid, "VALIDATION_ERROR", "shareTranscript must be true or false.", { field: "shareTranscript" });

  // One request per Idempotency-Key, so a double click or re-render can't create duplicate cases (HS-T028).
  return withIdempotency(req, cid, "human-handoffs", body, async () => handle(body, cid, String(channel), String(reason)));
}

async function handle(body: Record<string, unknown>, cid: string, channel: string, reason: string) {

  let summary: string | null = null;
  const conv = typeof body.conversationId === "string" ? getConversation(body.conversationId) : null;
  const topicsIn = body.topics;
  let sharedTopics: string[] = [];
  if (body.shareSummary) {
    // Only known flow topics — never browser free text that could carry personal data.
    // The visitor may have unticked topics in the preview, so an explicit list wins over the server's.
    const raw = Array.isArray(topicsIn) ? topicsIn : conv?.topics ?? [];
    const topics = raw.filter((t: unknown): t is string => typeof t === "string" && FLOW_TOPICS.has(t)).slice(0, 8);
    summary = [
      "Linko chat summary (Zoiko Broadband AI assistant)",
      `Topics: ${topics.length ? topics.map((t) => t.slice(0, 60)).join("; ") : "general enquiry"}`,
      `Reason for contact: ${reason.toLowerCase().replace(/_/g, " ")}`,
      `Priority: ${PRIORITY_TEXT[PRIORITY[reason] ?? "NORMAL"]}`,
      "Nothing was ordered, booked or changed in the chat.",
    ].join("\n");
    sharedTopics = topics;
  }

  // Consent evidence first (DM-09), so the case can point at it (Doc10 §03.1 consent_or_basis_ref).
  // The transcript is shared only with its own, separate consent (Doc05 SHARE_TRANSCRIPT_WITH_AGENT, T-30).
  const shareTranscript = body.shareTranscript === true && Boolean(conv);
  const consentRef = body.shareSummary
    ? persistConsent(conv?.id ?? null, "SHARE_SUMMARY_WITH_SUPPORT", PRIVACY_NOTICE_VERSION, "GRANT", cid)
    : null;
  if (shareTranscript) persistConsent(conv!.id, "SHARE_TRANSCRIPT_WITH_AGENT", PRIVACY_NOTICE_VERSION, "GRANT", cid);

  // Record the request for the staff queue (Doc05 DM-19, Doc10 HS-WF-10-19). Topics only when shared.
  const p = PRIORITY[reason] ?? "NORMAL";
  const handoffRef = persistHandover({
    sessionId: conv?.id ?? null,
    channel: channel === "ENQUIRY" ? "TICKET" : channel,
    priority: DB_PRIORITY[p] ?? "NORMAL",
    reason,
    topics: sharedTopics,
    transcriptShared: shareTranscript,
    consentRef,
  });

  return envelope(
    cid,
    "REQUIRES_ACTION",
    {
      // Doc05 DM-19: the request is recorded in the staff queue (REQUESTED). It is NOT a live transfer:
      // no live-chat adapter is connected, so the visitor still contacts the team through a channel below.
      handoffRef,
      handoffState: handoffRef ? "REQUESTED" : "FAILED",
      transferState: "NOT_CONNECTED",
      transcriptShared: shareTranscript,
      priority: p,
      message: "Choose how you'd like to contact our team. Linko can't transfer the chat directly yet.",
      summary,
      // Safety cases put the phone first (fastest route to a person).
      channels: (p === "P0_SAFETY" ? ["PHONE", "LIVE_CHAT", "CALLBACK", "TICKET"] : ["LIVE_CHAT", "CALLBACK", "TICKET", "PHONE"]).map(
        (c) =>
          ({
            LIVE_CHAT: { channel: "LIVE_CHAT", label: "Chat with an adviser", href: COMPANY.liveChatUrl },
            CALLBACK: { channel: "CALLBACK", label: "Request a callback", href: "/get-help" },
            TICKET: { channel: "TICKET", label: "Send an enquiry", href: "/contact-us" },
            PHONE: { channel: "PHONE", label: `Call ${COMPANY.phone}`, href: COMPANY.phoneHref },
          })[c]!,
      ),
      hours: { source: "/get-help", note: "Current opening hours are published on the Get help page." },
    },
    // Contact routes come from config that hasn't been independently verified yet (Doc10 §01.1).
    { sourceEvidence: { source: "support_routing_config", checkedAt: nowIso(), status: "INDICATIVE" } },
  );
}
