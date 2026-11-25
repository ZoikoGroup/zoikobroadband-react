/**
 * POST /v1/linko/conversations/{conversationId}/feedback — "Useful" / "Not useful" on an AI answer.
 * Doc03 §11.2: a disputed answer goes to a staff review queue with a coded reason and a redacted
 * copy of the answer. Feedback never trains or changes the assistant by itself. Doc02 §14: optional
 * rating plus a coded issue reason.
 */
import { NextRequest } from "next/server";
import { redactSensitive } from "@/app/lib/chatbot/linko";
import { KB_VERSION, KNOWLEDGE_ITEMS } from "@/app/lib/chatbot/knowledge";
import { apiError, envelope, limit, newCorrelationId, readJson } from "@/app/lib/linko-api/http";
import { getConversation } from "@/app/lib/linko-api/store";
import { persistEvent, persistFeedback } from "@/app/lib/linko-db/persist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REASONS = ["WRONG", "NOT_ANSWERED", "UNCLEAR", "OTHER"] as const;
type Reason = (typeof REASONS)[number];
const MAX_ANSWER = 600;

export async function POST(req: NextRequest, ctx: { params: Promise<{ conversationId: string }> }) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "feedback", 20);
  if (limited) return limited;
  const { conversationId } = await ctx.params;
  const conv = getConversation(conversationId);
  if (!conv) return apiError(cid, "NOT_FOUND", "This conversation has ended or expired.");

  const body = await readJson(req);
  if (!body) return apiError(cid, "VALIDATION_ERROR", "Request body must be JSON.");
  const rating = body.rating;
  if (rating !== "UP" && rating !== "DOWN") return apiError(cid, "VALIDATION_ERROR", "rating must be UP or DOWN.", { field: "rating" });
  let reason: Reason | null = null;
  if (rating === "DOWN") {
    reason = REASONS.includes(body.reason as Reason) ? (body.reason as Reason) : "OTHER";
  }
  const rawAnswer = typeof body.answer === "string" ? body.answer.slice(0, MAX_ANSWER) : "";
  // Only known knowledge ids are kept (the browser can't inject arbitrary references).
  const known = new Set(KNOWLEDGE_ITEMS.map((k) => k.id));
  const knowledgeIds = Array.isArray(body.sourceIds)
    ? [...new Set(body.sourceIds.filter((x): x is string => typeof x === "string" && known.has(x)))].slice(0, 3)
    : [];

  const feedbackId = persistFeedback({
    sessionId: conv.id,
    rating,
    reason,
    redactedAnswer: redactSensitive(rawAnswer).text,
    knowledgeIds,
    kbVersion: KB_VERSION,
  });
  persistEvent(conv.id, rating === "UP" ? "ANSWER_USEFUL" : "ANSWER_DISPUTED", null, reason ? { reason } : {});
  return envelope(cid, "CONFIRMED", { feedbackId: feedbackId ?? null }, { http: 201 });
}
