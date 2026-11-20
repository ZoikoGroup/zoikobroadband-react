"use client";

import React, { useState } from "react";
import { Users, ShieldCheck } from "lucide-react";

interface SharedTaskItem {
  readonly stepNumber: string;
  readonly id: string;
  readonly title: string;
  readonly yourRole: string;
  readonly zoikoAndThirdParties: string;
}

const SHARED_TASKS: readonly SharedTaskItem[] = [
  {
    stepNumber: "1",
    id: "scope-inventory-and-baseline",
    title: "Scope inventory and baseline",
    yourRole:
      "Confirm your sites, critical assets, who owns them and that the list is accurate.",
    zoikoAndThirdParties:
      "We only validate the inventory if your contract authorises it; any third parties are named.",
  },
  {
    stepNumber: "2",
    id: "remote-admin-access",
    title: "Remote admin access",
    yourRole:
      "Grant, review and revoke access credentials or approval paths as agreed.",
    zoikoAndThirdParties:
      "We access only in-scope systems under documented approval and audit controls.",
  },
  {
    stepNumber: "3",
    id: "routine-configuration-changes",
    title: "Routine configuration changes",
    yourRole:
      "Raise change requests clearly and approve changes that affect your operations.",
    zoikoAndThirdParties:
      "We apply approved configuration changes within agreed windows and record updates.",
  },
  {
    stepNumber: "4",
    id: "security-and-patching",
    title: "Security and patching",
    yourRole:
      "Keep your wider estate, endpoints and internal policies aligned with your risk posture.",
    zoikoAndThirdParties:
      "We apply updates or patches to agreed in-scope devices where covered by your agreement.",
  },
  {
    stepNumber: "5",
    id: "monitoring-and-notifications",
    title: "Monitoring and notifications",
    yourRole:
      "Keep escalation contacts up to date and respond to alerts requiring site action.",
    zoikoAndThirdParties:
      "We monitor agreed elements and notify named contacts according to your service terms.",
  },
  {
    stepNumber: "6",
    id: "supplier-escalations",
    title: "Supplier escalations",
    yourRole:
      "Share relevant account details for named third parties where coordination is agreed.",
    zoikoAndThirdParties:
      "We coordinate with named suppliers only where your agreement specifies that responsibility.",
  },
  {
    stepNumber: "7",
    id: "data-processing-and-storage",
    title: "Data processing and storage",
    yourRole:
      "Decide what data is stored, retained or shared and manage your internal compliance.",
    zoikoAndThirdParties:
      "We handle service data strictly as set out in your contract, notices and data terms.",
  },
  {
    stepNumber: "8",
    id: "backups-and-recovery",
    title: "Backups and recovery",
    yourRole:
      "Run and verify your own business backups and recovery plans unless separately agreed.",
    zoikoAndThirdParties:
      "We follow agreed recovery steps only for covered elements within your contract scope.",
  },
  {
    stepNumber: "9",
    id: "acceptance-and-handover",
    title: "Acceptance and handover",
    yourRole:
      "Verify readiness against agreed checks and confirm handover when complete.",
    zoikoAndThirdParties:
      "We share completion evidence, service details and your support path at handover.",
  },
  {
    stepNumber: "10",
    id: "ending-the-service",
    title: "Ending the service",
    yourRole:
      "Give required notice, plan transitions off the service and return any provided items.",
    zoikoAndThirdParties:
      "We confirm termination steps, final handback items and any applicable end-of-term details.",
  },
];

export interface ManagedSharedResponsibilityProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly onTaskSelect?: (taskId: string) => void;
}

export default function ManagedSharedResponsibility({
  imageSrc = "/Images/mng/4.png",
  imageAlt = "Two technicians in high-visibility workwear inspecting rooftop communications equipment",
  onTaskSelect,
}: ManagedSharedResponsibilityProps) {
  const [selectedId, setSelectedId] = useState<string>(
    SHARED_TASKS[0]?.id ?? "scope-inventory-and-baseline",
  );

  const activeTask =
    SHARED_TASKS.find((task) => task.id === selectedId) ?? SHARED_TASKS[0];

  const handleSelectTask = (taskId: string) => {
    setSelectedId(taskId);
    onTaskSelect?.(taskId);
  };

  return (
    <section
      id="shared-responsibility"
      className="w-full bg-[#FFF8E1] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              04
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              SHARED RESPONSIBILITY
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Who does what, task by task.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[600px]">
            Pick a task to see your role and ours. Nothing happens without your
            authorisation.
          </p>
        </div>

        {/* Main 2-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 10-Task Selector Card */}
          <div className="lg:col-span-4 bg-white rounded-[18px] border border-[#F1E5B8] p-3.5 shadow-[0_6px_20px_rgba(11,34,65,0.04)]">
            <ul
              role="listbox"
              aria-label="Shared responsibility tasks"
              className="space-y-1"
            >
              {SHARED_TASKS.map((task) => {
                const isSelected = task.id === activeTask?.id;

                return (
                  <li key={task.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => handleSelectTask(task.id)}
                      className={`w-full px-3.5 py-2.5 rounded-[10px] flex items-center gap-3 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#061A33] text-white shadow-[0_4px_12px_rgba(6,26,51,0.16)]"
                          : "bg-transparent hover:bg-[#FFFDF5] text-[#0B2241]"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-[5px] text-[10.5px] font-extrabold inline-flex items-center justify-center shrink-0 leading-none ${
                          isSelected
                            ? "bg-[#FFC119] text-[#0B2241]"
                            : "bg-[#FEF3C7] text-[#0B2241]"
                        }`}
                      >
                        {task.stepNumber}
                      </span>

                      <span className="text-[12.5px] font-bold leading-[1.35]">
                        {task.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Hero Photo Banner + Dual Role Cards */}
          <div className="lg:col-span-8 bg-white rounded-[18px] border border-[#F1E5B8] overflow-hidden shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col justify-between">
            {/* Top Image Banner with Overlay Heading */}
            <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[275px] bg-[#061A33] overflow-hidden">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-center"
              />

              {/* Dark gradient scrim for text legibility over image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#061A33]/95 via-[#061A33]/40 to-transparent"
              />

              <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-end">
                <h3 className="text-white text-[20px] sm:text-[23px] font-extrabold leading-[1.2] tracking-[-0.015em] drop-shadow-xs">
                  {activeTask?.title}
                </h3>
              </div>
            </div>

            {/* Bottom Dual Responsibility Cards */}
            <div className="p-6 sm:p-7 flex-1 flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Your Role Card */}
                <div className="bg-[#FFFDF5] rounded-[14px] border border-[#F6E8B4] p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Users
                      className="w-3.5 h-3.5 text-[#B45309] shrink-0 stroke-[2.2]"
                      aria-hidden="true"
                    />
                    <span className="text-[#92400E] text-[10.5px] font-extrabold tracking-[0.1em] uppercase">
                      YOUR ROLE
                    </span>
                  </div>

                  <p className="text-[#0B2241] text-[13px] leading-[1.55]">
                    {activeTask?.yourRole}
                  </p>
                </div>

                {/* Zoiko & Third Parties Card */}
                <div className="bg-[#F3F6FA] rounded-[14px] border border-[#E2E8F0] p-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <ShieldCheck
                      className="w-3.5 h-3.5 text-[#1963DD] shrink-0 stroke-[2.2]"
                      aria-hidden="true"
                    />
                    <span className="text-[#1E3A8A] text-[10.5px] font-extrabold tracking-[0.1em] uppercase">
                      ZOIKO &amp; THIRD PARTIES
                    </span>
                  </div>

                  <p className="text-[#0B2241] text-[13px] leading-[1.55]">
                    {activeTask?.zoikoAndThirdParties}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
