import Link from "next/link";
import { audit } from "@/app/lib/linko-db/db";
import { requireStaff, steppedUp } from "@/app/lib/linko-staff/auth";
import { qaSample, qualityStats } from "@/app/lib/linko-staff/queries";
import { Badge, StaffShell } from "../shell";

/** Doc10 §06.2 QA analyst / HS-T052: redacted, sampled quality and safety review — only chats the visitor chose to share. */
export default async function QaPage() {
  const staff = await requireStaff("QA_SAMPLE");
  if (!steppedUp(staff)) {
    audit({ action: "QA_SAMPLE_VIEW", subjectType: "console", actor: staff.staffId, decision: "DENY", reason: "STEP_UP_REQUIRED" });
    return (
      <StaffShell staff={staff} title="Quality sample" current="/staff/qa">
        <p role="alert">Confirm your password using Step-up above, then reload this page.</p>
      </StaffShell>
    );
  }
  audit({ action: "QA_SAMPLE_VIEW", subjectType: "console", actor: staff.staffId, decision: "ALLOW", purpose: "QUALITY_REVIEW" });
  const sample = qaSample();
  const q = qualityStats();
  const m = q.model as Record<string, number | null>;
  return (
    <StaffShell staff={staff} title="Quality sample" current="/staff/qa">
      <p className="text-sm text-[#5B6B82]">
        A random sample of chats whose visitors agreed to share them. Transcripts are already redacted. Opening one records a quality-review access.
      </p>
      <ul className="mt-3 space-y-1 text-sm">
        <li>Model calls (24 h): {m.calls ?? 0}</li>
        <li>Blocked by guardrails: {m.blocked ?? 0}</li>
        <li>Escalated or abstained: {m.escalated ?? 0}</li>
      </ul>
      {sample.length === 0 ? (
        <p className="mt-4 text-sm">No shared chats are available to sample right now.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {sample.map((r) => (
            <li key={r.handover_id} className="rounded-lg border border-[#D5DCE6] p-3 text-sm">
              <Badge tone={r.priority === "URGENT_SAFETY" ? "danger" : "default"}>{r.priority}</Badge> {r.reason_code.toLowerCase().replace(/_/g, " ")} ·{" "}
              <Link className="font-semibold text-[#2B4C7E] underline" href={`/staff/cases/${r.handover_id}`}>
                Review sample
              </Link>
            </li>
          ))}
        </ul>
      )}
    </StaffShell>
  );
}
