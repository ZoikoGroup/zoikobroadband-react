import { audit } from "@/app/lib/linko-db/db";
import { aiHealth } from "@/app/lib/linko-api/assistant";
import { requireStaff } from "@/app/lib/linko-staff/auth";
import { can } from "@/app/lib/linko-staff/rbac";
import Link from "next/link";
import { activeOverride, breachAlerts, incidents, overrides, qualityStats, queueCounts, retentionRules } from "@/app/lib/linko-staff/queries";
import {
  activateFallbackAction,
  closeIncidentAction,
  declareIncidentAction,
  endFallbackAction,
  notifyOwnerAction,
  reviewOverrideAction,
} from "../actions";
import { Badge, StaffShell, when } from "../shell";
import { ActionForm, field } from "../ui";

/** HS-WF-10-24 Supervisor incident and quality console. */
export default async function IncidentPage() {
  const staff = await requireStaff("INCIDENT_VIEW");
  audit({ action: "INCIDENT_CONSOLE_VIEW", subjectType: "console", actor: staff.staffId, decision: "ALLOW" });
  const ai = aiHealth();
  const ov = activeOverride();
  const q = qualityStats();
  const counts = queueCounts();
  const canAct = can(staff.role, "OVERRIDE_AI");
  const alerts = breachAlerts();
  const m = q.model as Record<string, number | null>;

  return (
    <StaffShell staff={staff} title="Incident & quality" current="/staff/incident">
      <div className="grid gap-4 md:grid-cols-2">
        <section aria-labelledby="ai-h" className="rounded-xl border border-[#D5DCE6] p-4">
          <h2 id="ai-h" className="text-lg font-bold">
            AI service
          </h2>
          <p className="mt-2 text-sm">
            Status:{" "}
            {ai.aiEnabled ? <Badge tone="ok">AI answers on</Badge> : <Badge tone="warn">AI answers off — guided help only</Badge>}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              Provider: {ai.provider} · model {ai.model}
            </li>
            <li>Circuit breaker: {ai.breakerOpen ? "open (cooling down)" : "closed"}</li>
            <li>Provider latch: {ai.latched ?? "none"}</li>
            <li>
              Daily budget used: {ai.budgetUsedPct}% · monthly: {ai.monthBudgetUsedPct}%
            </li>
            <li>
              Prompt {ai.promptVersion} · knowledge {ai.kbVersion}
            </li>
          </ul>
          {ov ? (
            <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm">
              <p className="font-semibold">Fallback active until {when(String(ov.expires_at))}</p>
              <p>Reason: {String(ov.reason)}</p>
              {canAct && <ActionForm action={endFallbackAction} submit="End fallback" hidden={{ overrideId: String(ov.override_id) }} className="mt-2" />}
            </div>
          ) : (
            canAct && (
              <ActionForm action={activateFallbackAction} submit="Activate fallback" danger className="mt-3">
                <p className="text-sm text-[#5B6B82]">
                  Turns AI answers off. Safety routes, guided steps, complaint access and human contact keep working. Needs step-up;
                  time-bounded and reviewed.
                </p>
                <label htmlFor="reason" className="block text-sm font-semibold">
                  Reason
                </label>
                <input id="reason" name="reason" className={field} maxLength={300} required />
                <label htmlFor="minutes" className="block text-sm font-semibold">
                  Duration (minutes)
                </label>
                <input id="minutes" name="minutes" type="number" min={5} max={1440} defaultValue={60} className={field} />
              </ActionForm>
            )
          )}
        </section>

        <section aria-labelledby="load-h" className="rounded-xl border border-[#D5DCE6] p-4">
          <h2 id="load-h" className="text-lg font-bold">
            Queue and quality (last 24 hours)
          </h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              Open safety cases: <Badge tone={q.openSafety ? "danger" : "ok"}>{q.openSafety}</Badge>
            </li>
            <li>Open cases by priority: {counts.map((c) => `${c.priority} ${c.case_status.toLowerCase()} ${c.n}`).join(" · ") || "none"}</li>
            <li>Live chat sessions: {q.liveSessions}</li>
            <li>
              Model calls: {m.calls ?? 0} · blocked by guardrails {m.blocked ?? 0} · escalated {m.escalated ?? 0}
            </li>
            <li>
              Tokens in/out: {m.input ?? 0} / {m.output ?? 0} · average latency {Math.round(Number(m.latency ?? 0))} ms
            </li>
            <li>Estimated cost: {m.cost ? `$${(Number(m.cost) / 1e6).toFixed(4)}` : "not metered (set LINKO_PRICE_* to enable)"}</li>
          </ul>
        </section>
      </div>

      <section aria-labelledby="alerts-h" className="mt-4 rounded-xl border border-[#D5DCE6] p-4">
        <h2 id="alerts-h" className="text-lg font-bold">
          Breach alerts
        </h2>
        <p className="mt-1 text-sm text-[#5B6B82]">Safety cases waiting over 15 minutes, complaints waiting over a day (Doc10 §08.2).</p>
        {alerts.overdue.length === 0 ? (
          <p className="mt-2 text-sm">
            <Badge tone="ok">No overdue cases</Badge>
          </p>
        ) : (
          <ul className="mt-2 space-y-1 text-sm" role="alert">
            {alerts.overdue.map((a) => (
              <li key={a.handover_id}>
                <Badge tone="danger">{a.priority}</Badge> waiting since {when(a.created_at)} ·{" "}
                <Link className="font-semibold text-[#2B4C7E] underline" href={`/staff/cases/${a.handover_id}`}>
                  Open case
                </Link>
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-2 space-y-1 text-sm">
          <li>Access denials (24 h): {alerts.denials}</li>
          <li>Suspected prompt-injection attempts (24 h): {alerts.injections}</li>
          <li>Model latency p95 (24 h): {alerts.p95ms === null ? "no calls" : `${alerts.p95ms} ms`}</li>
        </ul>
      </section>

      <section aria-labelledby="inc-h" className="mt-4 rounded-xl border border-[#D5DCE6] p-4">
        <h2 id="inc-h" className="text-lg font-bold">
          Incidents
        </h2>
        {can(staff.role, "INCIDENT_DECLARE") && (
          <ActionForm action={declareIncidentAction} submit="Declare incident" className="mt-2 grid max-w-xl gap-2">
            <label htmlFor="title" className="block text-sm font-semibold">
              Title
            </label>
            <input id="title" name="title" className={field} maxLength={120} required />
            <label htmlFor="severity" className="block text-sm font-semibold">
              Severity
            </label>
            <select id="severity" name="severity" className={field} defaultValue="SEV3">
              <option value="SEV1">SEV1 — customers at risk / service down</option>
              <option value="SEV2">SEV2 — major degradation</option>
              <option value="SEV3">SEV3 — minor</option>
            </select>
          </ActionForm>
        )}
        <ul className="mt-3 space-y-2 text-sm">
          {incidents().map((i) => (
            <li key={String(i.incident_id)} className="rounded-lg border border-[#EEF2F8] p-2">
              <Badge tone={i.severity === "SEV1" ? "danger" : "warn"}>{String(i.severity)}</Badge> {String(i.title)} · declared {when(String(i.declared_at))} by{" "}
              {String(i.declarer ?? "staff")} · {i.closed_at ? `closed ${when(String(i.closed_at))}` : "open"}
              {!i.closed_at && can(staff.role, "INCIDENT_DECLARE") && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {!i.owner_notified_at && <ActionForm action={notifyOwnerAction} submit="Notify owner" hidden={{ incidentId: String(i.incident_id) }} />}
                  <ActionForm action={closeIncidentAction} submit="Close incident" hidden={{ incidentId: String(i.incident_id) }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ov-h" className="mt-4 rounded-xl border border-[#D5DCE6] p-4">
        <h2 id="ov-h" className="text-lg font-bold">
          Override history (every override is time-bounded and reviewed)
        </h2>
        <ul className="mt-2 space-y-2 text-sm">
          {overrides().map((o) => (
            <li key={String(o.override_id)} className="rounded-lg border border-[#EEF2F8] p-2">
              {when(String(o.created_at))} · by {String(o.creator ?? "staff")} · until {when(String(o.expires_at))}
              {o.ended_at ? ` · ended ${when(String(o.ended_at))}` : ""} · {o.reviewed_at ? `reviewed by ${String(o.reviewer)}` : "awaiting review"}
              {!o.reviewed_at && can(staff.role, "OVERRIDE_REVIEW") && o.created_by !== staff.staffId && (
                <ActionForm action={reviewOverrideAction} submit="Mark reviewed" hidden={{ overrideId: String(o.override_id) }} className="mt-1" />
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ret-h" className="mt-4 rounded-xl border border-[#D5DCE6] p-4">
        <h2 id="ret-h" className="text-lg font-bold">
          Retention rules (Doc05 §12.2)
        </h2>
        <p className="mt-1 text-sm text-[#5B6B82]">Proposed values in use until the DPO approves them.</p>
        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="text-left">
              <th scope="col">Data</th>
              <th scope="col">Trigger</th>
              <th scope="col">Days</th>
              <th scope="col">On expiry</th>
              <th scope="col">Approved</th>
            </tr>
          </thead>
          <tbody>
            {retentionRules().map((r) => (
              <tr key={String(r.data_class)}>
                <td>{String(r.data_class)}</td>
                <td>{String(r.trigger_event)}</td>
                <td>{String(r.retention_days)}</td>
                <td>{String(r.action_on_expiry)}</td>
                <td>{r.approved_by_ref ? "Yes" : <Badge tone="warn">Pending DPO</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </StaffShell>
  );
}
