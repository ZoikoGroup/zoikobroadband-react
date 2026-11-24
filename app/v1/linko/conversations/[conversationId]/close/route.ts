/** PUB-14 POST /v1/linko/conversations/{conversationId}/close — end and purge the session (Doc04 LK-WF-20). */
import { NextRequest } from "next/server";
import { limit, newCorrelationId } from "@/app/lib/linko-api/http";
import { closeConversation } from "@/app/lib/linko-api/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, ctx: { params: Promise<{ conversationId: string }> }) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "close");
  if (limited) return limited;
  const { conversationId } = await ctx.params;
  closeConversation(conversationId); // idempotent: closing twice is fine
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store", "X-Correlation-Id": cid } });
}
