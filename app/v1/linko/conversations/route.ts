/** PUB-01 POST /v1/linko/conversations — create a public conversation (Doc04 §05, LK-WF-01). */
import { NextRequest } from "next/server";
import { ASSISTANT, COPY, welcomeActions } from "@/app/lib/chatbot/linko";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson, SUPPORT_ACTIONS } from "@/app/lib/linko-api/http";
import { createConversation } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "conv");
  if (limited) return limited;

  const body = (await readJson(req)) ?? {};
  const locale = body.locale ?? "en-GB";
  const channel = body.channel ?? "website";
  const pageKey = typeof body.pageKey === "string" ? body.pageKey.slice(0, 200) : "/";
  if (locale !== "en-GB") return apiError(cid, "VALIDATION_ERROR", "Only en-GB is supported.", { field: "locale" });
  if (channel !== "website") return apiError(cid, "VALIDATION_ERROR", "Only the website channel is supported.", { field: "channel" });
  if (!pageKey.startsWith("/")) return apiError(cid, "VALIDATION_ERROR", "pageKey must be a site path.", { field: "pageKey" });

  const conv = createConversation(pageKey);
  return envelope(
    cid,
    "CONFIRMED",
    {
      conversationId: conv.id,
      state: conv.state,
      assistant: { name: ASSISTANT.name, label: ASSISTANT.label },
      // AI identity disclosed; no human availability implied (Doc01 WF-01 safety gate).
      aiDisclosure: `${COPY.trust} I'm not a person. Please don't share passwords, one-time codes or payment-card numbers.`,
      welcome: COPY.welcome,
      // A conversationId grants no account rights (Doc04 LK-WF-01).
      permissions: { trustLevel: "PUBLIC", privateReads: false, actions: "PUBLIC_ONLY" },
      publicActions: welcomeActions(pageKey),
    },
    {
      http: 201,
      sourceEvidence: { source: "approved_flows", version: "doc01-v1.0", checkedAt: nowIso(), status: "VERIFIED" },
      nextActions: SUPPORT_ACTIONS.filter((a) => a.type === "FLOW"),
    },
  );
}
