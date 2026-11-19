"use client";

import React, { useState } from "react";

const CAPABILITY_TABS = [
  {
    id: "answer-calls",
    label: "Answer calls well",
    overlayTitle: "Answer every call professionally",
    overlaySubtitle: "Numbers, greetings and routing to the right people.",
    items: [
      {
        id: "business-numbers",
        title: "Business numbers",
        description: "Local or non-geographic numbers for your business.",
        badge: "Discuss with our team",
        href: "#discuss-business-numbers",
      },
      {
        id: "auto-attendant",
        title: "Auto-attendant",
        description: "A greeting with menu options for callers.",
        badge: "Discuss with our team",
        href: "#discuss-auto-attendant",
      },
      {
        id: "call-queues",
        title: "Call queues",
        description: "Callers wait in line for the next free person.",
        badge: "Discuss with our team",
        href: "#discuss-call-queues",
      },
      {
        id: "business-hours-routing",
        title: "Business-hours routing",
        description: "Different call handling in and out of hours.",
        badge: "Discuss with our team",
        href: "#discuss-business-hours-routing",
      },
    ],
  },
  {
    id: "work-anywhere",
    label: "Work from anywhere",
    overlayTitle: "Stay connected wherever your team is",
    overlaySubtitle:
      "Switch seamlessly between office desks, laptops and mobiles.",
    items: [
      {
        id: "mobile-desktop-apps",
        title: "Desktop & mobile calling",
        description:
          "Make and receive business calls on laptops and smartphones.",
        badge: "Discuss with our team",
        href: "#discuss-desktop-mobile-calling",
      },
      {
        id: "desk-phone-support",
        title: "IP desk phones",
        description: "Dedicated hardware phones for reception and fixed desks.",
        badge: "Discuss with our team",
        href: "#discuss-ip-desk-phones",
      },
      {
        id: "call-transfer-hold",
        title: "Call transfer & hold",
        description: "Move active calls between team members or locations.",
        badge: "Discuss with our team",
        href: "#discuss-call-transfer-hold",
      },
      {
        id: "voicemail-to-email",
        title: "Voicemail notifications",
        description:
          "Receive alerts when callers leave messages outside hours.",
        badge: "Discuss with our team",
        href: "#discuss-voicemail-notifications",
      },
    ],
  },
  {
    id: "manage-insight",
    label: "Manage & insight",
    overlayTitle: "Clear control over lines and call activity",
    overlaySubtitle:
      "Understand call patterns and keep administration straightforward.",
    items: [
      {
        id: "call-logs-activity",
        title: "Call logs & summaries",
        description:
          "Review call activity to spot busy periods and missed calls.",
        badge: "Discuss with our team",
        href: "#discuss-call-logs-summaries",
      },
      {
        id: "user-line-admin",
        title: "User & line management",
        description:
          "Update team assignments and routing rules as your business grows.",
        badge: "Discuss with our team",
        href: "#discuss-user-line-management",
      },
      {
        id: "number-porting-planning",
        title: "Number transfer planning",
        description:
          "Coordinate keeping existing numbers when reviewing changes.",
        badge: "Discuss with our team",
        href: "#discuss-number-transfer-planning",
      },
      {
        id: "continuity-options",
        title: "Backup & continuity notes",
        description:
          "Discuss contingency options for broadband or power disruptions.",
        badge: "Discuss with our team",
        href: "#discuss-backup-continuity",
      },
    ],
  },
] as const;

const CAPABILITY_SECTION_COPY = {
  badge: "POSSIBLE CAPABILITIES",
  headingLine1: "What a cloud phone setup can",
  headingLine2: "include.",
  subheading:
    "Grouped by what you want to achieve. Each item shows whether it's confirmed for Zoiko or something to discuss with our team.",
  footnote:
    "Shown as \"Discuss with our team\" until Product confirms it for a specific package. A need you tell us about isn't the same as a feature we've confirmed.",
} as const;

export default function CloudCapabilities() {
  const [activeTabId, setActiveTabId] = useState<string>(CAPABILITY_TABS[0].id);

  const activeTab =
    CAPABILITY_TABS.find((tab) => tab.id === activeTabId) ?? CAPABILITY_TABS[0];

  return (
    <section
      id="capabilities"
      aria-labelledby="cloud-capabilities-heading"
      className="w-full bg-[#FFFBEB] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Badge */}
        <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
          <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
            {CAPABILITY_SECTION_COPY.badge}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="cloud-capabilities-heading"
          className="mt-3.5 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[42px] lg:text-[44px]"
        >
          <span className="block">{CAPABILITY_SECTION_COPY.headingLine1}</span>
          <span className="block">{CAPABILITY_SECTION_COPY.headingLine2}</span>
        </h2>

        {/* Subheading */}
        <p className="mt-3 max-w-[650px] text-[13.5px] leading-[1.52] font-normal text-[#475569] sm:text-[14px]">
          {CAPABILITY_SECTION_COPY.subheading}
        </p>

        {/* Segmented Filter Tabs */}
        <div
          role="tablist"
          aria-label="Capability categories"
          className="mt-5 inline-flex max-w-full flex-wrap items-center gap-1 rounded-[10px] border border-[#F5E09B] bg-white p-1 shadow-[0_1px_2px_rgba(8,28,46,0.03)]"
        >
          {CAPABILITY_TABS.map((tab) => {
            const isSelected = tab.id === activeTab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTabId(tab.id)}
                className={
                  isSelected
                    ? "rounded-[7px] bg-[#061B31] px-4 py-2 text-[12px] font-bold text-[#FFD100] shadow-[0_2px_6px_rgba(6,27,49,0.18)] transition-all"
                    : "rounded-[7px] bg-transparent px-4 py-2 text-[12px] font-bold text-[#0F2337] transition-colors hover:bg-[#FFF5CC]"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Grid: Left Visual Card + Right 2x2 Capability Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-4">
          {/* Left Visual Feature Card */}
          <div className="relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-gradient-to-b from-[#FFFBEB] via-[#FFF6D6] to-[#0B2239] lg:col-span-6 lg:min-h-[272px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,34,57,0) 0%, rgba(11,34,57,0.72) 48%, #07192C 100%)",
              }}
            />

            <div className="relative z-10 px-5 pb-4 pt-12 text-white">
              <h3 className="text-[15px] leading-[1.25] font-bold text-white">
                {activeTab.overlayTitle}
              </h3>
              <p className="mt-1 text-[11.5px] leading-[1.35] font-normal text-[#CBD5E1]">
                {activeTab.overlaySubtitle}
              </p>
            </div>
          </div>

          {/* Right 2x2 Grid of Capability Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            {activeTab.items.map((item) => (
              <div
                key={item.id}
                className="flex min-h-[128px] flex-col justify-between rounded-[10px] border border-[#EAEFF5] bg-white p-4 shadow-[0_1px_3px_rgba(8,28,46,0.03)]"
              >
                <div>
                  <h3 className="text-[13.5px] leading-[1.3] font-bold text-[#081C2E]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-[1.42] font-normal text-[#5A6A7E]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3">
                  <a
                    href={item.href}
                    className="inline-flex items-center rounded-[5px] bg-[#EBF3FA] px-2.5 py-1 text-[10.5px] font-semibold text-[#1D5B96] transition-colors hover:bg-[#DCEAF7]"
                  >
                    {item.badge}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footnote */}
        <p className="mt-4 text-[10.5px] leading-[1.45] font-normal text-[#6E7A8A]">
          {CAPABILITY_SECTION_COPY.footnote}
        </p>
      </div>
    </section>
  );
}
