"use client";

import React from "react";

interface ResponsibilityRow {
  readonly id: string;
  readonly area: string;
  readonly businessRole: string;
  readonly providerRole: string;
}

const RESPONSIBILITY_ROWS = [
  {
    id: "account-sign-in-mfa",
    area: "Account sign-in and MFA",
    businessRole: "Set up and enforce for your staff",
    providerRole: "[confirmed per service]",
  },
  {
    id: "device-updates",
    area: "Device updates",
    businessRole: "Keep devices and apps current",
    providerRole: "[confirmed per service]",
  },
  {
    id: "router-wifi-settings",
    area: "Router and Wi-Fi settings",
    businessRole: "Approve changes and control who has access",
    providerRole: "[confirmed per service]",
  },
  {
    id: "backups-recovery",
    area: "Backups and recovery",
    businessRole: "Decide what to protect and test restores",
    providerRole: "[confirmed per service]",
  },
  {
    id: "staff-awareness",
    area: "Staff awareness",
    businessRole: "Train people to spot scams",
    providerRole: "[confirmed per service]",
  },
] as const satisfies readonly ResponsibilityRow[];

export default function SharedResponsibility() {
  return (
    <section className="w-full bg-[#DCE6FA] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-9 md:mb-10">
          <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            WHO DOES WHAT
          </p>

          <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            Responsibility is shared
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            Security is never one party&apos;s job. For any confirmed service,
            the provider role is stated in writing before you decide.
          </p>
        </div>

        {/* Responsibility Matrix Container (Div-based, zero HTML tables) */}
        <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(11,34,65,0.05)] border border-white/80">
          {/* Top Sub-bar */}
          <div className="px-6 sm:px-7 py-3 bg-white">
            <span className="text-[#64748B] text-[11.5px] font-medium">
              General responsibility guide
            </span>
          </div>

          {/* Dark Navy Column Header Row (Hidden on mobile, shown on md+) */}
          <div className="hidden md:grid md:grid-cols-12 bg-[#0B2241] px-6 sm:px-7 py-3.5 text-white text-[12.5px] font-bold">
            <div className="md:col-span-3">Area</div>
            <div className="md:col-span-6">Typically your business</div>
            <div className="md:col-span-3">Provider role</div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-[#E2E8F0]">
            {RESPONSIBILITY_ROWS.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 sm:px-7 py-4 items-start md:items-center bg-white hover:bg-[#FAFBFD] transition-colors"
              >
                {/* Area */}
                <div className="md:col-span-3">
                  <span className="block md:hidden text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-0.5">
                    Area
                  </span>
                  <span className="text-[#0B2241] text-[13.5px] font-bold leading-[1.4]">
                    {row.area}
                  </span>
                </div>

                {/* Typically your business */}
                <div className="md:col-span-6">
                  <span className="block md:hidden text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-0.5">
                    Typically your business
                  </span>
                  <span className="text-[#475569] text-[13.5px] leading-[1.45]">
                    {row.businessRole}
                  </span>
                </div>

                {/* Provider role */}
                <div className="md:col-span-3">
                  <span className="block md:hidden text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Provider role
                  </span>
                  <span className="inline-block bg-[#E6EEFC] text-[#1E3A8A] text-[11.5px] font-bold px-2.5 py-0.5 rounded-[4px] leading-snug">
                    {row.providerRole}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
