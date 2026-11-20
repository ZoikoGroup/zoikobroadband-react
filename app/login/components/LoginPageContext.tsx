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

  return (
    <AuthShell>
      {/* Tabs */}
      <div role="tablist" aria-label="Account" className="grid shrink-0 grid-cols-3 border-b border-slate-200 px-4 dark:border-slate-800">
        {tabs.map(({ key, label }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(key)}
              className={`relative py-3.5 [@media(max-height:760px)]:py-2.5 text-[13px] font-semibold transition-colors ${
                active
                  ? "text-[#0B1F45] dark:text-white"
                  : "text-slate-500 hover:text-[#0B1F45] dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {label}
              {active && <span aria-hidden className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-[#F7BE2E]" />}
            </button>
          );
        })}
      </div>

      {/* Form (scrolls inside the card only on very short screens) */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 [@media(max-height:760px)]:py-3.5 sm:px-7">
        {activeTab === "login" && <LoginForm setActiveTab={setActiveTab} />}
        {activeTab === "register" && <RegisterForm />}
        {activeTab === "reset-password" && (
          <ResetPasswordForm setActiveTab={(tab: string) => setActiveTab(tab as Tab)} />
        )}
      </div>
    </AuthShell>
  );
}
