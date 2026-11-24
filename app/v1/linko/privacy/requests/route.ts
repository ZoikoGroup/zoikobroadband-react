/**
 * PUB-13 POST /v1/linko/privacy/requests — data-rights pathway (Doc04 LK-WF-18).
 * Collects no identifying details in chat; returns the approved route only.
 */
import { NextRequest } from "next/server";
import { PRIVACY_NOTICE_VERSION, TRANSCRIPT_NOTICE } from "@/app/lib/chatbot/linko";
import { audit, db, nowIso as dbNow, subjectHashFor, tenantId, uuid } from "@/app/lib/linko-db/db";
import { setTranscriptChoice } from "@/app/lib/linko-db/persist";
import { apiError, envelope, limit, newCorrelationId, nowIso, readJson } from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES = ["ACCESS", "ERASURE", "RECTIFICATION", "RESTRICTION", "TRANSCRIPT_QUESTION", "TRANSCRIPT_OPT_OUT"] as const;

export async function POST(req: NextRequest) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "privacy");
  if (limited) return limited;

  const body = await readJson(req);
  const type = body?.type;
  if (!TYPES.includes(type as (typeof TYPES)[number]))
    return apiError(cid, "VALIDATION_ERROR", `type must be one of ${TYPES.join(", ")}.`, { field: "type" });

  const conversationId = typeof body?.conversationId === "string" ? body.conversationId : null;

  // DM-08: the visitor can ask Linko not to keep this chat.
  if (type === "TRANSCRIPT_OPT_OUT") {
    if (!conversationId) return apiError(cid, "VALIDATION_ERROR", "conversationId is required.", { field: "conversationId" });
    setTranscriptChoice(conversationId, "OPT_OUT", PRIVACY_NOTICE_VERSION);
    return envelope(
      cid,
      "CONFIRMED",
      { route: "TRANSCRIPT_OPT_OUT", message: "Done — I won't keep a copy of this chat, and what was stored for it has been deleted." },
      { sourceEvidence: { source: "privacy_policy", checkedAt: nowIso(), status: "INDICATIVE" } },
    );
  }

  // DM-32 / §12.3: a rights request is opened as a case for the privacy team, who verify identity OUTSIDE
  // chat. A chat request alone never exports or deletes anything (T-39/T-40).
  let caseRef: string | null = null;
  if (type !== "TRANSCRIPT_QUESTION") {
    try {
      caseRef = `DSR-${uuid().slice(0, 8).toUpperCase()}`;
      db()
        .prepare("INSERT INTO data_rights_request VALUES (?, ?, ?, ?, 'PENDING', NULL, ?, 'OPEN', ?, NULL)")
        .run(tenantId(), uuid(), type as string, subjectHashFor(conversationId ?? cid), caseRef, dbNow());
      audit({ action: "DATA_RIGHTS_REQUEST_OPENED", subjectType: "data_rights_request", subjectRef: caseRef, actor: "visitor", decision: "EXECUTED", reason: String(type), correlationId: cid });
    } catch {
      caseRef = null;
    }
  }

  return envelope(
    cid,
    "REQUIRES_ACTION",
    {
      route: "PRIVACY_NOTICE",
      caseRef,
      message:
        type === "TRANSCRIPT_QUESTION"
          ? TRANSCRIPT_NOTICE
          : `Your request has been passed to our privacy team${caseRef ? ` (reference ${caseRef})` : ""}. They'll verify your identity before acting on it — Linko can't do that in chat. You can also contact them through the privacy notice.`,
    },
    {
      sourceEvidence: { source: "privacy_policy", checkedAt: nowIso(), status: "INDICATIVE" },
      nextActions: [
        { type: "LINK", label: "Read privacy notice", href: "/privacy-notice" },
        { type: "LINK", label: "Contact us", href: "/contact-us" },
      ],
    },
  );
}
