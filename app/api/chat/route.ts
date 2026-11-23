import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/app/lib/chatbot/systemPrompt";
import { COMPANY } from "@/app/lib/chatbot/knowledge";
import { checkRateLimit } from "@/app/lib/chatbot/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Groq's OpenAI-compatible Chat Completions endpoint.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const MAX_HISTORY = 20; // messages sent to the model per request
const MAX_MESSAGE_CHARS = 2000; // per user message

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return null;
    }
    messages.push({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) });
  }
  // The conversation should start with a user turn and end with the new question.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

const FALLBACK_REPLY = `Sorry, I'm having trouble right now. Please try again in a moment, or contact our team on ${COMPANY.phone} or ${COMPANY.supportEmail}.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chat is not configured." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "You're sending messages too quickly. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let messages: ChatMessage[] | null = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    // fall through
  }
  if (!messages) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;
      try {
        const res = await fetch(GROQ_URL, {
          method: "POST",
          signal: req.signal,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL,
            stream: true,
            temperature: 0.3,
            max_completion_tokens: 1024,
            // gpt-oss models reason before answering; keep it short and hidden.
            reasoning_effort: "low",
            include_reasoning: false,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!res.ok || !res.body) {
          const detail = await res.text().catch(() => "");
          throw new Error(`Groq API error ${res.status}: ${detail.slice(0, 300)}`);
        }

        // Parse the Server-Sent Events stream and forward only the text deltas.
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const delta = JSON.parse(data).choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta) {
                controller.enqueue(encoder.encode(delta));
                sentText = true;
              }
            } catch {
              // ignore malformed keep-alive lines
            }
          }
        }
        if (!sentText) controller.enqueue(encoder.encode(FALLBACK_REPLY));
      } catch (err) {
        if (!req.signal.aborted) {
          console.error("[chat]", err);
          controller.enqueue(encoder.encode(sentText ? "\n\n" + FALLBACK_REPLY : FALLBACK_REPLY));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
