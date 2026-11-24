/**
 * PRV-01…PRV-08 /v1/linko/me/* — verified-customer routes (Doc04 §05).
 *
 * MyZoiko identity is not connected to Linko yet, so every private read or
 * write fails closed with 401 AUTH_REQUIRED and a first-party sign-in action.
 * No order, appointment, bill or account data is ever returned to a guest,
 * and the response never reveals whether an object exists.
 */
import { NextRequest } from "next/server";
import { apiError, limit, newCorrelationId } from "@/app/lib/linko-api/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Each private route with its registered method (Doc04 §05).
const KNOWN: [RegExp, "GET" | "POST"][] = [
  [/^orders$/, "GET"], // PRV-01
  [/^orders\/[^/]+$/, "GET"], // PRV-02
  [/^orders\/[^/]+\/appointments$/, "GET"], // PRV-03
  [/^appointments\/[^/]+\/change-requests$/, "POST"], // PRV-04
  [/^moving\/assessments$/, "POST"], // PRV-05
  [/^faults$/, "POST"], // PRV-06
  [/^billing\/summary$/, "GET"], // PRV-07
  [/^billing\/payment-handoffs$/, "POST"], // PRV-08
];

async function handle(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const cid = newCorrelationId();
  const limited = limit(req, cid, "me");
  if (limited) return limited;
  const { path } = await ctx.params;
  const joined = (path ?? []).join("/");
  const route = KNOWN.find(([re]) => re.test(joined));
  if (!route) {
    return apiError(cid, "NOT_FOUND", "Not found.");
  }
  if (route[1] !== req.method) {
    return apiError(cid, "METHOD_NOT_ALLOWED", `Use ${route[1]} for this route.`, { headers: { Allow: route[1] } });
  }
  return apiError(cid, "AUTH_REQUIRED", "Please sign in to MyZoiko to continue securely. I won't ask for your password or one-time code in chat.", {
    nextAction: "SIGN_IN",
    nextActions: [
      { type: "SIGN_IN", label: "Sign in securely", href: "/login" },
      { type: "FLOW", label: "Speak to support", flow: "handoff" },
    ],
  });
}

export const GET = handle;
export const POST = handle;
