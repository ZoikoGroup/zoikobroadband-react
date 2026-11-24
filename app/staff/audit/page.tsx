import { audit } from "@/app/lib/linko-db/db";
import { requireStaff, steppedUp } from "@/app/lib/linko-staff/auth";
import { modeFor } from "@/app/lib/linko-staff/rbac";
import { auditEvents, auditIntegrity } from "@/app/lib/linko-staff/queries";
import { Badge, StaffShell, when } from "../shell";

/** Audit log viewer (Doc13 L13-FR-085, L13-QA-095): redacted — action codes and salted hashes only. */
export default async function AuditPage() {
  const staff = await requireStaff("AUDIT_VIEW");
  // Supervisors and DPO analysts get evidence-only access (E): step-up required.
  if (modeFor(staff.role, "AUDIT_VIEW") === "E" && !steppedUp(staff)) {
    audit({ action: "AUDIT_VIEW", subjectType: "audit_log", actor: staff.staffId, decision: "DENY", reason: "STEP_UP_REQUIRED" });
    return (
      <StaffShell staff={staff} title="Audit log" current="/staff/audit">
        <p role="alert">Confirm your password using Step-up above, then reload this page.</p>
      </StaffShell>
    );
  }
  audit({ action: "AUDIT_VIEW", subjectType: "audit_log", actor: staff.staffId, decision: "ALLOW" });
  const broken = auditIntegrity();
  const rows = auditEvents();
  return (
    <StaffShell staff={staff} title="Audit log" current="/staff/audit">
      <p className="text-sm">
        Chain integrity: {broken === null ? <Badge tone="ok">Intact</Badge> : <Badge tone="danger">Broken at #{broken} — investigate</Badge>}
      </p>
      <p className="mt-1 text-sm text-[#5B6B82]">Subjects are salted hashes. No names, addresses, card details, prompts or tokens are logged.</p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <caption className="sr-only">Most recent audit events</caption>
          <thead>
            <tr className="border-b border-[#D5DCE6] text-left">
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
              <th scope="col">Subject</th>
              <th scope="col">Actor</th>
              <th scope="col">Decision</th>
              <th scope="col">Purpose / reason</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={String(r.seq)} className="border-b border-[#EEF2F8]">
                <td>{String(r.seq)}</td>
                <td>{when(String(r.occurred_at))}</td>
                <td className="font-mono text-xs">{String(r.action_code)}</td>
                <td className="font-mono text-xs">
                  {String(r.subject_type)} {r.subject ? `#${String(r.subject)}` : ""}
                </td>
                <td className="font-mono text-xs">{String(r.actor_ref).slice(0, 8)}</td>
                <td>
                  <Badge tone={r.decision === "DENY" ? "danger" : "default"}>{String(r.decision)}</Badge>
                </td>
                <td className="text-xs">{[r.purpose_code, r.reason_code].filter(Boolean).join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StaffShell>
  );
}
