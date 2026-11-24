import Link from "next/link";
import { audit } from "@/app/lib/linko-db/db";
import { requireStaff } from "@/app/lib/linko-staff/auth";
import { can } from "@/app/lib/linko-staff/rbac";
import { queue, queueCounts } from "@/app/lib/linko-staff/queries";
import { acceptCaseAction } from "./actions";
import { Badge, StaffShell, when } from "./shell";
import { ActionForm } from "./ui";

const PRIORITY_LABEL: Record<string, string> = { URGENT_SAFETY: "P0 · Safety", REGULATORY: "Complaint", HIGH: "High", NORMAL: "Normal" };
const PRIORITY_TONE: Record<string, "danger" | "warn" | "default"> = { URGENT_SAFETY: "danger", REGULATORY: "warn", HIGH: "warn", NORMAL: "default" };
const REASONS = ["SAFETY", "VULNERABILITY", "COMPLAINT", "FAULT", "BILLING", "ORDER", "BUSINESS", "USER_REQUEST", "UNRESOLVED", "OTHER"];

/** HS-WF-10-19 Agent inbox and routing. */
export default async function StaffInbox({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const staff = await requireStaff();
  const sp = await searchParams;

  if (!can(staff.role, "QUEUE_VIEW")) {
    return (
      <StaffShell staff={staff} title="Welcome" current="/staff">
        {sp.denied && (
          <p role="alert" className="mb-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
            You don&apos;t have access to that screen. The attempt has been recorded.
          </p>
        )}
        <p className="text-sm">Choose one of the screens your role can use from the menu above.</p>
      </StaffShell>
    );
  }

  const filter = {
    status: ["OPEN", "ACCEPTED", "ESCALATED", "CLOSED"].includes(sp.status ?? "") ? sp.status : undefined,
    priority: ["URGENT_SAFETY", "REGULATORY", "HIGH", "NORMAL"].includes(sp.priority ?? "") ? sp.priority : undefined,
    reason: REASONS.includes(sp.reason ?? "") ? sp.reason : undefined,
    mine: sp.mine === "1",
  };
  const rows = queue(staff.staffId, filter);
  const counts = queueCounts();
  const n = (p: string) => counts.filter((c) => c.priority === p).reduce((a, c) => a + Number(c.n), 0);
  audit({ action: "QUEUE_VIEW", subjectType: "queue", actor: staff.staffId, decision: "ALLOW" });

  return (
    <StaffShell staff={staff} title="Inbox" current="/staff">
      {sp.denied && (
        <p role="alert" className="mb-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
          You don&apos;t have access to that screen. The attempt has been recorded.
        </p>
      )}
      <p className="text-sm text-[#5B6B82]">
        Requests people made from Linko to contact the team. Safety cases are always listed first. Linko can&apos;t transfer a live
        chat, so contact the customer through the channel they chose.
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <Badge tone="danger">P0 safety open: {n("URGENT_SAFETY")}</Badge>
        <Badge tone="warn">Complaints open: {n("REGULATORY")}</Badge>
        <Badge>Normal open: {n("NORMAL")}</Badge>
      </div>

      <form className="mt-4 flex flex-wrap items-end gap-3" aria-label="Filter the queue">
        <label className="text-sm font-semibold">
          Status
          <select name="status" defaultValue={filter.status ?? ""} className="mt-1 block min-h-11 rounded-lg border border-[#B8C4D6] px-2">
            <option value="">Not closed</option>
            <option value="OPEN">Open</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="ESCALATED">Escalated</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Priority
          <select name="priority" defaultValue={filter.priority ?? ""} className="mt-1 block min-h-11 rounded-lg border border-[#B8C4D6] px-2">
            <option value="">All</option>
            <option value="URGENT_SAFETY">P0 · Safety</option>
            <option value="REGULATORY">Complaint</option>
            <option value="HIGH">High</option>
            <option value="NORMAL">Normal</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Reason
          <select name="reason" defaultValue={filter.reason ?? ""} className="mt-1 block min-h-11 rounded-lg border border-[#B8C4D6] px-2">
            <option value="">All</option>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r.toLowerCase().replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="mine" value="1" defaultChecked={filter.mine} className="h-5 w-5" /> Only my cases
        </label>
        <button className="min-h-11 rounded-lg border border-[#B8C4D6] px-4 text-sm font-semibold hover:bg-[#EEF2F8]">Apply</button>
      </form>

      {rows.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-[#B8C4D6] p-6 text-center text-sm text-[#5B6B82]">No cases match these filters.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <caption className="sr-only">Linko contact requests, most urgent first</caption>
            <thead>
              <tr className="border-b border-[#D5DCE6] text-left">
                <th scope="col" className="py-2 pr-3">Priority</th>
                <th scope="col" className="py-2 pr-3">Reason</th>
                <th scope="col" className="py-2 pr-3">Topics (safe summary)</th>
                <th scope="col" className="py-2 pr-3">Channel</th>
                <th scope="col" className="py-2 pr-3">Status</th>
                <th scope="col" className="py-2 pr-3">Created</th>
                <th scope="col" className="py-2 pr-3">Owner</th>
                <th scope="col" className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-[#EEF2F8] align-top">
                  <td className="py-2 pr-3">
                    <Badge tone={PRIORITY_TONE[r.priority]}>{PRIORITY_LABEL[r.priority] ?? r.priority}</Badge>
                  </td>
                  <td className="py-2 pr-3">{r.reason.toLowerCase().replace(/_/g, " ")}</td>
                  <td className="py-2 pr-3">{r.topics.length ? r.topics.join("; ") : <span className="text-[#5B6B82]">Not shared</span>}</td>
                  <td className="py-2 pr-3">{r.channel.toLowerCase().replace(/_/g, " ")}</td>
                  <td className="py-2 pr-3">{r.status.toLowerCase()}</td>
                  <td className="py-2 pr-3">{when(r.createdAt)}</td>
                  <td className="py-2 pr-3">{r.owner ?? "—"}</td>
                  <td className="py-2">
                    <div className="flex flex-col gap-1">
                      <Link href={`/staff/cases/${r.id}`} className="inline-flex min-h-11 items-center font-semibold text-[#2B4C7E] underline">
                        View safe summary
                      </Link>
                      {!r.owner && r.status !== "CLOSED" && <ActionForm action={acceptCaseAction} submit="Accept case" hidden={{ caseId: r.id }} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </StaffShell>
  );
}
