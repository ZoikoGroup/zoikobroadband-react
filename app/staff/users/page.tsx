import { audit } from "@/app/lib/linko-db/db";
import { MIN_PASSWORD, requireStaff } from "@/app/lib/linko-staff/auth";
import { ROLE_LABEL, ROLES } from "@/app/lib/linko-staff/rbac";
import { maskEmail, staffList } from "@/app/lib/linko-staff/queries";
import { changeRoleAction, createStaffAction, setStaffActiveAction } from "../actions";
import { Badge, StaffShell, when } from "../shell";
import { ActionForm, field } from "../ui";

/** Staff accounts (admin only; the admin role has no access to cases or transcripts). */
export default async function UsersPage() {
  const staff = await requireStaff("STAFF_ADMIN");
  audit({ action: "STAFF_ADMIN_VIEW", subjectType: "console", actor: staff.staffId, decision: "ALLOW" });
  const users = staffList();
  return (
    <StaffShell staff={staff} title="Staff accounts" current="/staff/users">
      <p className="text-sm text-[#5B6B82]">Changes need step-up. Disabling an account or changing its role signs that person out everywhere.</p>
      <ActionForm action={createStaffAction} submit="Create account" className="mt-4 grid max-w-xl gap-2">
        <label htmlFor="email" className="text-sm font-semibold">
          Work email
        </label>
        <input id="email" name="email" type="email" className={field} required />
        <label htmlFor="displayName" className="text-sm font-semibold">
          Display name
        </label>
        <input id="displayName" name="displayName" className={field} maxLength={80} />
        <label htmlFor="role" className="text-sm font-semibold">
          Role
        </label>
        <select id="role" name="role" className={field} defaultValue="SUPPORT_AGENT">
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABEL[r]}
            </option>
          ))}
        </select>
        <label htmlFor="password" className="text-sm font-semibold">
          Temporary password (at least {MIN_PASSWORD} characters, letters and a number)
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" className={field} required minLength={MIN_PASSWORD} />
      </ActionForm>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <caption className="sr-only">Staff accounts</caption>
          <thead>
            <tr className="border-b border-[#D5DCE6] text-left">
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={String(u.staff_id)} className="border-b border-[#EEF2F8] align-top">
                <td>{String(u.display_name)}</td>
                <td>{maskEmail(String(u.email))}</td>
                <td>{ROLE_LABEL[u.role as keyof typeof ROLE_LABEL] ?? String(u.role)}</td>
                <td>{u.active ? <Badge tone="ok">Active</Badge> : <Badge tone="danger">Disabled</Badge>}</td>
                <td>{when(String(u.created_at))}</td>
                <td>
                  {u.staff_id !== staff.staffId && (
                    <div className="flex flex-col gap-1">
                      <ActionForm
                        action={setStaffActiveAction}
                        submit={u.active ? "Disable" : "Enable"}
                        danger={Boolean(u.active)}
                        hidden={{ staffId: String(u.staff_id), active: u.active ? "0" : "1" }}
                      />
                      <ActionForm action={changeRoleAction} submit="Change role" hidden={{ staffId: String(u.staff_id) }}>
                        <label className="sr-only" htmlFor={`role-${String(u.staff_id)}`}>
                          New role
                        </label>
                        <select id={`role-${String(u.staff_id)}`} name="role" className={field} defaultValue={String(u.role)}>
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {ROLE_LABEL[r]}
                            </option>
                          ))}
                        </select>
                      </ActionForm>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StaffShell>
  );
}
