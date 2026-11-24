import Link from "next/link";
import { audit, encryptionEnabled } from "@/app/lib/linko-db/db";
import { requireStaff } from "@/app/lib/linko-staff/auth";
import { can } from "@/app/lib/linko-staff/rbac";
import { assignableStaff, caseById, caseChronology, transcript, transcriptGrant } from "@/app/lib/linko-staff/queries";
import {
  acceptCaseAction,
  addNoteAction,
  closeCaseAction,
  escalateCaseAction,
  reassignCaseAction,
  requestTranscriptAction,
} from "../../actions";
import { Badge, StaffShell, when } from "../../shell";
import { ActionForm, field } from "../../ui";

/** HS-WF-10-20 case drawer: safe summary, chronology, notes, escalation; transcript only by audited, purposeful request. */
export default async function CasePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const staff = await requireStaff();
  const { id } = await params;
  const sp = await searchParams;
  const evidenceRole = staff.role === "DPO_ANALYST" || staff.role === "SECURITY_AUDITOR" || staff.role === "QA_ANALYST";
  if (!can(staff.role, "QUEUE_VIEW") && !evidenceRole) {
    audit({ action: "CASE_VIEW", subjectType: "human_handover", subjectRef: id, actor: staff.staffId, decision: "DENY", reason: staff.role });
    return (
      <StaffShell staff={staff} title="No access" current="">
        <p role="alert">You don&apos;t have access to cases.</p>
      </StaffShell>
    );
  }
  const c = caseById(id);
  // Non-enumerating: "not available" for both missing and not-permitted (L13-QA-094).
  if (!c) {
    return (
      <StaffShell staff={staff} title="Case not available" current="">
        <p>This case isn&apos;t available.</p>
      </StaffShell>
    );
  }
  audit({ action: "CASE_VIEW", subjectType: "human_handover", subjectRef: id, actor: staff.staffId, decision: "ALLOW", purpose: "CASE_HANDLING" });
  const mine = c.assignedStaffId === staff.staffId;
  // Doc13 L13-QA-007 / Doc10 HS-WF-10-20: an agent can't open a case assigned to someone else (non-enumerating).
  if (staff.role === "SUPPORT_AGENT" && c.assignedStaffId && !mine) {
    audit({ action: "CASE_VIEW", subjectType: "human_handover", subjectRef: id, actor: staff.staffId, decision: "DENY", reason: "ASSIGNED_TO_OTHER" });
    return (
      <StaffShell staff={staff} title="Case not available" current="">
        <p>This case isn&apos;t available.</p>
      </StaffShell>
    );
  }
  const chron = mine || evidenceRole || staff.role === "SUPPORT_SUPERVISOR" ? caseChronology(c.id, c.sessionId) : { notes: [], events: [] };
  const grant = sp.transcript === "1" && c.sessionId ? transcriptGrant(staff.staffId, c.sessionId) : undefined;
  const lines = grant && c.sessionId ? transcript(c.sessionId) : null;
  const colleagues = can(staff.role, "CASE_REASSIGN") ? assignableStaff() : [];

  return (
    <StaffShell staff={staff} title="Case" current="">
      <p>
        <Link href="/staff" className="inline-flex min-h-11 items-center font-semibold text-[#2B4C7E] underline">
          ← Back to inbox
        </Link>
      </p>
      <section aria-labelledby="summary-h" className="rounded-xl border border-[#D5DCE6] p-4">
        <h2 id="summary-h" className="text-lg font-bold">
          Safe summary
        </h2>
        <dl className="mt-2 grid grid-cols-[10rem_1fr] gap-y-1 text-sm">
          <dt className="text-[#5B6B82]">Priority</dt>
          <dd>
            <Badge tone={c.priority === "URGENT_SAFETY" ? "danger" : c.priority === "REGULATORY" ? "warn" : "default"}>{c.priority}</Badge>
          </dd>
          <dt className="text-[#5B6B82]">Reason</dt>
          <dd>{c.reason.toLowerCase().replace(/_/g, " ")}</dd>
          <dt className="text-[#5B6B82]">Topics</dt>
          <dd>{c.topics.length ? c.topics.join("; ") : "Customer didn't share a summary"}</dd>
          <dt className="text-[#5B6B82]">Preferred channel</dt>
          <dd>{c.channel.toLowerCase().replace(/_/g, " ")}</dd>
          <dt className="text-[#5B6B82]">Identity status</dt>
          <dd>Not verified — Linko is a public chat. Verify through the normal account process before discussing an account.</dd>
          <dt className="text-[#5B6B82]">Safety flag</dt>
          <dd>{c.safetyFlag ? "Yes — telecare or emergency-line reliance mentioned. Don't advise restarting equipment." : "No"}</dd>
          <dt className="text-[#5B6B82]">Status</dt>
          <dd>
            {c.status.toLowerCase()} {c.owner ? `· owner ${c.owner}` : "· unassigned"}
          </dd>
          <dt className="text-[#5B6B82]">Created</dt>
          <dd>{when(c.createdAt)}</dd>
        </dl>
        <div className="mt-3 flex flex-wrap gap-3">
          {!c.assignedStaffId && c.status !== "CLOSED" && can(staff.role, "CASE_ACCEPT") && (
            <ActionForm action={acceptCaseAction} submit="Accept case" hidden={{ caseId: c.id }} />
          )}
          {mine && c.status !== "CLOSED" && <ActionForm action={escalateCaseAction} submit="Escalate" hidden={{ caseId: c.id }} />}
          {mine && c.status !== "CLOSED" && <ActionForm action={closeCaseAction} submit="Close case" hidden={{ caseId: c.id }} />}
        </div>
        {colleagues.length > 0 && c.status !== "CLOSED" && (
          <ActionForm action={reassignCaseAction} submit="Reassign" hidden={{ caseId: c.id }} className="mt-3 max-w-sm">
            <label htmlFor="to" className="block text-sm font-semibold">
              Reassign to
            </label>
            <select id="to" name="to" className={field} defaultValue="">
              <option value="" disabled>
                Choose a colleague
              </option>
              {colleagues.map((p) => (
                <option key={p.staff_id} value={p.staff_id}>
                  {p.display_name}
                </option>
              ))}
            </select>
          </ActionForm>
        )}
      </section>

      {(mine || staff.role === "SUPPORT_SUPERVISOR" || evidenceRole) && (
        <section aria-labelledby="chron-h" className="mt-4 rounded-xl border border-[#D5DCE6] p-4">
          <h2 id="chron-h" className="text-lg font-bold">
            Case chronology
          </h2>
          {chron.events.length === 0 && chron.notes.length === 0 && <p className="mt-2 text-sm text-[#5B6B82]">Nothing recorded yet.</p>}
          <ul className="mt-2 space-y-1 text-sm">
            {chron.events.map((e, i) => (
              <li key={`e${i}`}>
                {when(e.at)} · chat step <code>{e.code}</code>
              </li>
            ))}
            {chron.notes.map((n, i) => (
              <li key={`n${i}`}>
                {when(n.at)} · note by {n.by}: {n.text}
              </li>
            ))}
          </ul>
          {mine && c.status !== "CLOSED" && (
            <ActionForm action={addNoteAction} submit="Add internal note" hidden={{ caseId: c.id }} className="mt-3">
              <label htmlFor="note" className="block text-sm font-semibold">
                Internal note (no card, bank or password details)
              </label>
              <textarea id="note" name="note" maxLength={2000} className={`${field} min-h-24 py-2`} />
            </ActionForm>
          )}
        </section>
      )}

      <section aria-labelledby="tr-h" className="mt-4 rounded-xl border border-[#D5DCE6] p-4">
        <h2 id="tr-h" className="text-lg font-bold">
          Redacted transcript
        </h2>
        {!c.sessionLive ? (
          <p className="mt-2 text-sm text-[#5B6B82]">The chat has ended, so its transcript has been deleted under the retention rules.</p>
        ) : !encryptionEnabled() ? (
          <p className="mt-2 text-sm text-[#5B6B82]">Transcripts aren&apos;t stored because no data encryption key is configured.</p>
        ) : lines ? (
          <>
            <p className="mt-1 text-xs text-[#5B6B82]">Access recorded for purpose {grant?.purpose_code}. Shown for 10 minutes.</p>
            <ol className="mt-2 space-y-2 text-sm">
              {lines.map((l) => (
                <li key={l.seq} className={`rounded-lg p-2 ${l.speaker === "USER" ? "bg-[#EEF2F8]" : "bg-white border border-[#EEF2F8]"}`}>
                  <span className="font-semibold">{l.speaker === "USER" ? "Customer" : "Linko"}:</span> {l.text ?? "(unavailable)"}
                  {l.masked && <span className="ml-2 text-xs text-[#5B6B82]">(sensitive details removed)</span>}
                </li>
              ))}
            </ol>
          </>
        ) : can(staff.role, "TRANSCRIPT_READ") ? (
          <ActionForm action={requestTranscriptAction} submit="Request transcript access" hidden={{ caseId: c.id }} className="mt-2 max-w-md">
            <p className="text-sm text-[#5B6B82]">
              Reading a transcript is recorded with your purpose. {evidenceRole ? "Give your rights-case or investigation reference." : "Only for cases assigned to you."}
            </p>
            <label htmlFor="purpose" className="block text-sm font-semibold">
              Purpose
            </label>
            <select id="purpose" name="purpose" className={field} defaultValue="">
              <option value="" disabled>
                Choose a purpose
              </option>
              {!evidenceRole && <option value="CASE_HANDLING">Handling this case</option>}
              {staff.role === "DPO_ANALYST" && <option value="RIGHTS_REQUEST">Data-rights request</option>}
              {staff.role === "SECURITY_AUDITOR" && <option value="SECURITY_INVESTIGATION">Security investigation</option>}
              {staff.role === "QA_ANALYST" && <option value="QUALITY_REVIEW">Quality review (shared chats only)</option>}
            </select>
            {evidenceRole && (
              <>
                <label htmlFor="reference" className="block text-sm font-semibold">
                  Reference
                </label>
                <input id="reference" name="reference" className={field} maxLength={80} />
              </>
            )}
          </ActionForm>
        ) : (
          <p className="mt-2 text-sm">Your role can&apos;t read transcripts.</p>
        )}
      </section>
    </StaffShell>
  );
}
