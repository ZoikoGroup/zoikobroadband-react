import { audit } from "@/app/lib/linko-db/db";
import { requireStaff } from "@/app/lib/linko-staff/auth";
import { evalRuns } from "@/app/lib/linko-staff/queries";
import { Badge, StaffShell, when } from "../shell";

/** Evaluation results (Doc13 L13-FR-079/080, §11.11 zero-tolerance gates; Doc14 AT14). */
export default async function EvalsPage() {
  const staff = await requireStaff("EVAL_VIEW");
  audit({ action: "EVAL_VIEW", subjectType: "console", actor: staff.staffId, decision: "ALLOW" });
  const runs = evalRuns();
  return (
    <StaffShell staff={staff} title="Evaluations" current="/staff/evals">
      <p className="text-sm text-[#5B6B82]">
        Results of <code>npm run eval:linko</code>. A release needs zero critical failures and at least 95% of the rest. Re-run whenever
        the prompt, knowledge or model changes.
      </p>
      {runs.length === 0 ? (
        <p className="mt-4 text-sm">No evaluation reports yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {runs.map((r) => (
            <li key={r.file} className="rounded-xl border border-[#D5DCE6] p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={r.gate === "PASS" ? "ok" : "danger"}>Gate {r.gate}</Badge>
                <span className="font-semibold">
                  {r.passed}/{r.total} passed
                </span>
                <span>· {when(r.ranAt)}</span>
              </div>
              <p className="mt-1 text-xs text-[#5B6B82]">
                Prompt {r.promptVersion} · knowledge {r.kbVersion} · model {r.model}
              </p>
              {r.failures.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {r.failures.map((f) => (
                    <li key={f.id}>
                      {f.critical && <Badge tone="danger">critical</Badge>} {f.id}: {f.failures.slice(0, 2).join("; ")}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </StaffShell>
  );
}
