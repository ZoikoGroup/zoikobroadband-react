"use client";
import { useState } from "react";
import AuthShell from "./AuthShell";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";

type Tab = "login" | "register" | "reset-password";

const tabs: { key: Tab; label: string }[] = [
  { key: "login", label: "Login" },
  { key: "register", label: "Register" },
  { key: "reset-password", label: "Reset Password" },
];

export default function LoginPageContext() {
  const [activeTab, setActiveTab] = useState<Tab>("login");

  const tabBar = (
    <div role="tablist" aria-label="Account" className="grid shrink-0 grid-cols-3 px-3 pb-2.5 pt-1.5 [@media(max-height:760px)]:pb-1 [@media(max-height:760px)]:pt-0.5">
      {tabs.map(({ key, label }, i) => {
        const active = activeTab === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setActiveTab(key)}
            className={`relative py-2.5 text-[13px] font-semibold text-[#0B1F45] transition-colors [@media(max-height:760px)]:py-1.5 ${
              i > 0 ? "before:absolute before:left-0 before:top-1/2 before:h-4 before:w-px before:-translate-y-1/2 before:bg-slate-200" : ""
            } ${active ? "" : "hover:text-[#1257B8]"}`}
          >
            {label}
            {active && <span aria-hidden className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#F7BE2E]" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <AuthShell tabs={tabBar}>
      {activeTab === "login" && <LoginForm setActiveTab={setActiveTab} />}
      {activeTab === "register" && <RegisterForm />}
      {activeTab === "reset-password" && (
        <ResetPasswordForm setActiveTab={(tab: string) => setActiveTab(tab as Tab)} />
      )}
    </AuthShell>
  );
}
