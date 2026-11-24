import { audit } from "@/app/lib/linko-db/db";
import { requireStaff } from "@/app/lib/linko-staff/auth";
import { can } from "@/app/lib/linko-staff/rbac";
import { knowledgeItems } from "@/app/lib/linko-staff/queries";
import { ALLOW_DRAFT_KB } from "@/app/lib/chatbot/knowledge";
import { approveKnowledgeAction, submitKnowledgeAction, withdrawKnowledgeAction } from "../actions";
import { Badge, StaffShell, when } from "../shell";
import { ActionForm } from "../ui";

const TONE: Record<string, "ok" | "warn" | "danger" | "default"> = { APPROVED: "ok", IN_REVIEW: "warn", WITHDRAWN: "danger", DRAFT: "default" };

/** Doc13 §06.1 knowledge lifecycle: draft → in review → approved (independent) → withdrawn. Approval binds to the exact text hash. */
export default async function KnowledgePage() {
  const staff = await requireStaff("KNOWLEDGE_VIEW");
  audit({ action: "KNOWLEDGE_VIEW", subjectType: "console", actor: staff.staffId, decision: "ALLOW" });
  const items = knowledgeItems();
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());

  return (
    <StaffShell staff={staff} title="Knowledge" current="/staff/knowledge">
      <p className="text-sm text-[#5B6B82]">
        Linko only answers from approved, in-date items. Approval applies to the exact text shown — any edit needs a fresh review.
        {ALLOW_DRAFT_KB && (
          <>
            {" "}
            <Badge tone="warn">Draft override on (LINKO_ALLOW_DRAFT_KB) — remove before go-live</Badge>
          </>
        )}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((k) => {
          const expired = (k.effectiveTo && today >= k.effectiveTo) || today >= k.reviewDue;
          return (
            <li key={k.id} className="rounded-xl border border-[#D5DCE6] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs">{k.id}</span>
                <h2 className="font-bold">{k.title}</h2>
                <Badge tone={TONE[k.state]}>{k.state === "IN_REVIEW" ? "In review" : k.state.toLowerCase()}</Badge>
                {expired && <Badge tone="danger">Out of date — not served</Badge>}
              </div>
              <p className="mt-1 text-xs text-[#5B6B82]">
                Source {k.sourceId}: {k.source} · review due {k.reviewDue}
                {k.effectiveTo ? ` · ends ${k.effectiveTo}` : ""} · version #{k.hash}
                {k.submitter ? ` · submitted by ${k.submitter}` : ""}
                {k.approver ? ` · approved by ${k.approver} ${when(k.approvedAt)}` : ""}
              </p>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer font-semibold">Show text</summary>
                <pre className="mt-2 whitespace-pre-wrap font-sans">{k.text}</pre>
              </details>
              <div className="mt-2 flex flex-wrap gap-2">
                {can(staff.role, "KNOWLEDGE_SUBMIT") && (k.state === "DRAFT" || k.state === "WITHDRAWN") && (
                  <ActionForm action={submitKnowledgeAction} submit="Submit for review" hidden={{ itemId: k.id }} />
                )}
                {can(staff.role, "KNOWLEDGE_APPROVE") && k.state === "IN_REVIEW" && k.submittedBy !== staff.staffId && (
                  <ActionForm action={approveKnowledgeAction} submit="Approve" hidden={{ itemId: k.id }} />
                )}
                {can(staff.role, "KNOWLEDGE_APPROVE") && k.state === "IN_REVIEW" && k.submittedBy === staff.staffId && (
                  <p className="text-sm text-[#5B6B82]">Waiting for a different publisher to approve.</p>
                )}
                {can(staff.role, "KNOWLEDGE_WITHDRAW") && k.state !== "WITHDRAWN" && (
                  <ActionForm action={withdrawKnowledgeAction} submit="Withdraw" danger hidden={{ itemId: k.id }} />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </StaffShell>
  );
}
