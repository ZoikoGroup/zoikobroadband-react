import { redirect } from "next/navigation";
import { currentStaff } from "@/app/lib/linko-staff/auth";
import { signInAction } from "../actions";
import { ActionForm, field } from "../ui";

export default async function StaffLogin() {
  if (await currentStaff()) redirect("/staff");
  return (
    <div className="mx-auto max-w-md px-4 py-10 text-[#1E2A44]">
      <h1 className="text-2xl font-bold">Linko staff sign-in</h1>
      <p className="mt-2 text-sm text-[#5B6B82]">
        For Zoiko Broadband staff only. Access is role-based and every action is recorded in the audit log.
      </p>
      <ActionForm action={signInAction} submit="Sign in" className="mt-6">
        <label htmlFor="email" className="block text-sm font-semibold">
          Work email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={field} />
        <label htmlFor="password" className="block pt-2 text-sm font-semibold">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={field} />
      </ActionForm>
    </div>
  );
}
