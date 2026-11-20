"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Home,
  FileCheck2,
  Zap,
  Wifi,
  LayoutGrid,
  Info,
  Check,
} from "lucide-react";

type ReadinessStatusTone =
  | "customer-action"
  | "needs-review"
  | "not-checked"
  | "operator-action";

type ReadinessIconKey =
  | "contact"
  | "access"
  | "permission"
  | "power"
  | "socket"
  | "shared";

interface ReadinessItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly whoActs: string;
  readonly statusLabel: string;
  readonly statusTone: ReadinessStatusTone;
  readonly iconKey: ReadinessIconKey;
  readonly actionType: "review" | "request-help";
}

const READINESS_ITEMS = [
  {
    id: "authorised-site-contact",
    title: "Authorised site contact",
    description:
      "Someone who can let the engineer in and make decisions on the day.",
    whoActs: "You",
    statusLabel: "CUSTOMER ACTION",
    statusTone: "customer-action",
    iconKey: "contact",
    actionType: "review",
  },
  {
    id: "access-and-opening-hours",
    title: "Access and opening hours",
    description:
      "When the site is open, where to enter and any parking limits.",
    whoActs: "You",
    statusLabel: "CUSTOMER ACTION",
    statusTone: "customer-action",
    iconKey: "access",
    actionType: "review",
  },
  {
    id: "landlord-or-owner-permission",
    title: "Landlord or owner permission",
    description: "Some buildings need written approval before any work.",
    whoActs: "Your landlord, with our help",
    statusLabel: "NEEDS REVIEW",
    statusTone: "needs-review",
    iconKey: "permission",
    actionType: "review",
  },
  {
    id: "safe-equipment-location",
    title: "Safe equipment location",
    description: "A dry, ventilated spot near a power socket.",
    whoActs: "You",
    statusLabel: "CUSTOMER ACTION",
    statusTone: "customer-action",
    iconKey: "power",
    actionType: "review",
  },
  {
    id: "existing-socket-or-fibre-box",
    title: "Existing socket or fibre box",
    description: "Where your current line or fibre box is, if you have one.",
    whoActs: "You, then our engineer",
    statusLabel: "NOT CHECKED",
    statusTone: "not-checked",
    iconKey: "socket",
    actionType: "review",
  },
  {
    id: "shared-areas-and-restrictions",
    title: "Shared areas and restrictions",
    description:
      "Risers, comms rooms or work restrictions in a shared building.",
    whoActs: "Our field team",
    statusLabel: "OPERATOR ACTION",
    statusTone: "operator-action",
    iconKey: "shared",
    actionType: "request-help",
  },
] as const satisfies readonly ReadinessItem[];

function renderReadinessIcon(iconKey: ReadinessIconKey) {
  switch (iconKey) {
    case "contact":
      return (
        <UserCheck
          className="w-4 h-4 text-[#1963DD] stroke-[1.8]"
          aria-hidden="true"
        />
      );
    case "access":
      return (
        <Home
          className="w-4 h-4 text-[#1963DD] stroke-[1.8]"
          aria-hidden="true"
        />
      );
    case "permission":
      return (
        <FileCheck2
          className="w-4 h-4 text-[#1963DD] stroke-[1.8]"
          aria-hidden="true"
        />
      );
    case "power":
      return (
        <Zap
          className="w-4 h-4 text-[#1963DD] stroke-[1.8]"
          aria-hidden="true"
        />
      );
    case "socket":
      return (
        <Wifi
          className="w-4 h-4 text-[#1963DD] stroke-[1.8]"
          aria-hidden="true"
        />
      );
    case "shared":
      return (
        <LayoutGrid
          className="w-4 h-4 text-[#1963DD] stroke-[1.8]"
          aria-hidden="true"
        />
      );
  }
}

function getStatusBadgeClasses(tone: ReadinessStatusTone): string {
  switch (tone) {
    case "customer-action":
      return "bg-[#FEE2E2] text-[#B91C1C]";
    case "needs-review":
      return "bg-[#FEF3C7] text-[#92400E]";
    case "not-checked":
      return "bg-[#F1F5F9] text-[#475569]";
    case "operator-action":
      return "bg-[#DBEAFE] text-[#1D4ED8]";
  }
}

interface OnboardingSiteReadinessProps {
  readonly onRequestHelp?: (itemId: string) => void;
}

export default function OnboardingSiteReadiness({
  onRequestHelp,
}: OnboardingSiteReadinessProps) {
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const [helpRequestedIds, setHelpRequestedIds] = useState<string[]>([]);

  const toggleReviewed = (id: string) => {
    setReviewedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleRequestHelp = (id: string) => {
    setHelpRequestedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    onRequestHelp?.(id);
  };

  return (
    <section
      id="site-readiness"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Heading, Router Image & Safety Note */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                03
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                SITE READINESS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[42px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-4 max-w-[380px]">
              Prepare your business site.
            </h2>

            <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[430px] mb-7">
              Your installation may require an authorised contact, suitable
              access and a safe equipment location.
            </p>

            {/* Router Image */}
            <div className="w-full max-w-[445px] aspect-[16/10.5] rounded-[18px] overflow-hidden bg-[#1E293B] mb-5 shadow-[0_8px_24px_rgba(11,34,65,0.08)]">
              <img
                src="/Images/onb/3.png"
                alt="Wireless router with dual antennas in a modern office space"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Disclaimer Box */}
            <div className="w-full max-w-[445px] bg-[#F1F5F9] rounded-[12px] p-4 flex items-start gap-2.5">
              <Info
                className="w-4 h-4 text-[#475569] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-[#475569] text-[12px] leading-[1.55]">
                Ticking an item tells us you&apos;ve reviewed it. It
                doesn&apos;t certify your site as safe. Structural,
                shared-building or asbestos work is always checked by a
                qualified person.
              </p>
            </div>
          </div>

          {/* Right Column: Checklist Cards & Progress Footer */}
          <div className="lg:col-span-7">
            <div className="space-y-3 mb-4">
              {READINESS_ITEMS.map((item) => {
                const isReviewed = reviewedIds.includes(item.id);
                const isHelpRequested = helpRequestedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-[14px] border border-[#E2E8F0] p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_2px_8px_rgba(11,34,65,0.02)]"
                  >
                    {/* Icon + Details */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-[9px] bg-[#EFF6FF] flex items-center justify-center shrink-0 mt-0.5">
                        {renderReadinessIcon(item.iconKey)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-[#0B2241] text-[14px] font-bold leading-[1.3]">
                            {item.title}
                          </h3>
                          <span
                            className={`inline-block px-2 py-0.5 rounded-[4px] text-[9.5px] font-extrabold tracking-[0.06em] uppercase leading-tight ${getStatusBadgeClasses(
                              item.statusTone,
                            )}`}
                          >
                            {item.statusLabel}
                          </span>
                        </div>

                        <p className="text-[#64748B] text-[12px] leading-[1.45] mb-1.5">
                          {item.description}
                        </p>

                        <p className="text-[11.5px] leading-tight">
                          <span className="font-bold text-[#1963DD]">
                            Who acts:
                          </span>{" "}
                          <span className="font-semibold text-[#0B2241]">
                            {item.whoActs}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 self-start sm:self-center">
                      {item.actionType === "review" ? (
                        <button
                          type="button"
                          onClick={() => toggleReviewed(item.id)}
                          aria-pressed={isReviewed}
                          className={`inline-flex items-center justify-center gap-1.5 px-3.5 h-[34px] rounded-[7px] text-[11.5px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                            isReviewed
                              ? "bg-[#0B2241] text-white border border-[#0B2241]"
                              : "bg-white hover:bg-[#F8FAFC] text-[#0B2241] border border-[#CBD5E1]"
                          }`}
                        >
                          {isReviewed ? (
                            <>
                              <Check
                                className="w-3.5 h-3.5 stroke-[2.4]"
                                aria-hidden="true"
                              />
                              <span>Reviewed</span>
                            </>
                          ) : (
                            <span>Mark as reviewed</span>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRequestHelp(item.id)}
                          aria-pressed={isHelpRequested}
                          className={`inline-flex items-center justify-center px-3.5 h-[34px] rounded-[7px] text-[11.5px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                            isHelpRequested
                              ? "bg-[#0B2241] text-white border border-[#0B2241]"
                              : "bg-white hover:bg-[#F8FAFC] text-[#0B2241] border border-[#CBD5E1]"
                          }`}
                        >
                          {isHelpRequested ? "Help requested" : "Request help"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Footer */}
            <p className="text-[#1E3A8A] text-[12px] font-bold leading-snug">
              {reviewedIds.length} of {READINESS_ITEMS.length} reviewed. Our
              team still verifies each item.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
