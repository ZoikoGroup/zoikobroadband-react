import { audit } from "@/app/lib/linko-db/db";
import { requireStaff } from "@/app/lib/linko-staff/auth";
import { erasureJobs, rightsRequests } from "@/app/lib/linko-staff/queries";
import { closeRightsAction, rightsDecisionAction } from "../actions";
import { Badge, StaffShell, when } from "../shell";
import { ActionForm, field } from "../ui";

/**
 * Doc05 DM-32/33, Doc13 §07 / L13-FR-045..047: data-rights requests opened from Linko.
 * Identity is verified outside chat by the privacy team; this records the decision and runs
 * erasure per data class with a proof hash, honouring legal holds.
 */
export default async function PrivacyPage() {
  const staff = await requireStaff("PRIVACY_QUEUE");
  audit({ action: "PRIVACY_QUEUE_VIEW", subjectType: "console", actor: staff.staffId, decision: "ALLOW" });
  const rows = rightsRequests();
  return (
    <StaffShell staff={staff} title="Privacy requests" current="/staff/privacy">
      <p className="text-sm text-[#5B6B82]">
        Verify the person&apos;s identity through the normal privacy process before recording a decision. A chat request on its own never exports or
        deletes anything.
      </p>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm">No requests.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((r) => {
            const jobs = Number(r.jobs) ? erasureJobs(String(r.request_id)) : [];
            return (
              <li key={String(r.request_id)} className="rounded-xl border border-[#D5DCE6] p-4 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono">{String(r.case_ref)}</span>
                  <Badge>{String(r.request_type)}</Badge>
                  <Badge tone={r.verification_state === "VERIFIED" ? "ok" : r.verification_state === "FAILED" ? "danger" : "warn"}>
                    {String(r.verification_state).toLowerCase()}
                  </Badge>
                  <span>
                    {String(r.processing_state).toLowerCase()} · received {when(String(r.received_at))}
                  </span>
                </div>
                {jobs.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-xs">
                    {jobs.map((j) => (
                      <li key={String(j.job_id)}>
                        {String(j.object_class)}: {String(j.action)} · {String(j.state)}
                        {j.completion_proof_hash ? ` · proof #${String(j.completion_proof_hash).slice(0, 10)}` : ""}
                        {j.legal_hold_ref ? ` · hold ${String(j.legal_hold_ref)}` : ""}
                      </li>
                    ))}
                  </ul>
                )}
                {r.processing_state !== "CLOSED" && (
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <ActionForm action={rightsDecisionAction} submit="Record decision" hidden={{ caseRef: String(r.case_ref) }}>
                      <label className="block text-sm font-semibold" htmlFor={`d-${String(r.case_ref)}`}>
                        Identity check outcome
                      </label>
                      <select id={`d-${String(r.case_ref)}`} name="decision" className={field} defaultValue="">
                        <option value="" disabled>
                          Choose
                        </option>
                        <option value="VERIFIED">Verified</option>
                        <option value="FAILED">Not verified</option>
                      </select>
                      {r.request_type === "ERASURE" && (
                        <>
                          <label className="block text-sm font-semibold" htmlFor={`s-${String(r.case_ref)}`}>
                            Chat reference to erase (from the verified request)
                          </label>
                          <input id={`s-${String(r.case_ref)}`} name="sessionRef" className={field} maxLength={80} />
                          <label className="block text-sm font-semibold" htmlFor={`h-${String(r.case_ref)}`}>
                            Legal hold reference (optional)
                          </label>
                          <input id={`h-${String(r.case_ref)}`} name="legalHold" className={field} maxLength={80} />
                        </>
                      )}
                    </ActionForm>
                    <ActionForm action={closeRightsAction} submit="Close request" hidden={{ caseRef: String(r.case_ref) }} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </StaffShell>
  );
}
