import { NextRequest } from "next/server";
import { checkRateLimit } from "@/app/lib/chatbot/rateLimit";
import { COPY, LinkoAnswer } from "@/app/lib/chatbot/linko";
import { degraded, generateAnswer, parseMessages } from "@/app/lib/linko-api/assistant";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Legacy stateless endpoint kept for compatibility; the widget uses /v1/linko (Doc04). */
function json(answer: LinkoAnswer, status = 200) {
  return Response.json(answer, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!checkRateLimit(ip)) return json(degraded("rate_limited", COPY.rateLimited), 429);

  let messages = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    // fall through
  }
  if (!messages) return json(degraded("invalid", "Sorry, I couldn't read that message. Please try again."), 400);

  const { answer, http } = await generateAnswer(messages, req.signal);
  return json(answer, http);
}
