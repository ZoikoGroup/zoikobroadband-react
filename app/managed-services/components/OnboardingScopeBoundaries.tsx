"use client";

import React from "react";
import { CheckCircle2, FileText, Users } from "lucide-react";

type ScopeColumnTone = "in-scope" | "separate" | "stays-with-you";

interface ScopeColumnConfig {
  readonly id: string;
  readonly heading: string;
  readonly tone: ScopeColumnTone;
  readonly items: readonly string[];
}

const SCOPE_COLUMNS: readonly ScopeColumnConfig[] = [
  {
    id: "could-be-in-scope",
    heading: "Could be in scope, if agreed",
    tone: "in-scope",
    items: [
      "Agreed devices and settings",
      "Approved change requests",
      "Agreed notifications and reports",
      "Coordinating named suppliers",
    ],
  },
  {
    id: "needs-separate-agreement",
    heading: "Needs a separate agreement",
    tone: "separate",
    items: [
      "Extra sites or new equipment",
      "On-site works and surveys",
      "Recovery testing",
      "Out-of-hours cover, if offered",
    ],
  },
  {
    id: "usually-stays-with-you",
    heading: "Usually stays with you",
    tone: "stays-with-you",
    items: [
      "Your own laptops and apps",
      "Other suppliers' contracts",
      "Backups you run yourself",
      "Decisions on access and data",
    ],
  },
];

function getColumnTheme(tone: ScopeColumnTone) {
  switch (tone) {
    case "in-scope":
      return {
        containerClass: "bg-[#E9F6EE] border-[#D3ECDD]",
        headingClass: "text-[#146C43]",
        icon: (
          <CheckCircle2
            className="w-4 h-4 text-[#16A34A] shrink-0 stroke-[2.2]"
            aria-hidden="true"
          />
        ),
      };
    case "separate":
      return {
        containerClass: "bg-[#FFF8DF] border-[#F8EBB8]",
        headingClass: "text-[#854D0E]",
        icon: (
          <FileText
            className="w-4 h-4 text-[#B45309] shrink-0 stroke-[2.2]"
            aria-hidden="true"
          />
        ),
      };
    case "stays-with-you":
      return {
        containerClass: "bg-[#EEF2F6] border-[#DCE3EC]",
        headingClass: "text-[#1E3A8A]",
        icon: (
          <Users
            className="w-4 h-4 text-[#1963DD] shrink-0 stroke-[2.2]"
            aria-hidden="true"
          />
        ),
      };
  }
}

export default function OnboardingScopeBoundaries() {
  return (
    <section
      id="scope-boundaries"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              03
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              SCOPE BOUNDARIES
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[700px]">
            What&apos;s in, what&apos;s extra, and what stays with you.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            A typical split. Your agreement sets the exact boundaries.
          </p>
        </div>

        {/* 3-Column Scope Boundary Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCOPE_COLUMNS.map((column) => {
            const theme = getColumnTheme(column.tone);

            return (
              <div
                key={column.id}
                className={`rounded-[18px] border p-5 sm:p-6 ${theme.containerClass}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {theme.icon}
                  <h3
                    className={`text-[14px] font-extrabold leading-[1.3] ${theme.headingClass}`}
                  >
                    {column.heading}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {column.items.map((itemText) => (
                    <li
                      key={itemText}
                      className="bg-white rounded-[10px] border border-[#E2E8F0]/80 px-4 py-3 text-[#0B2241] text-[12.5px] font-semibold leading-[1.4] shadow-[0_2px_6px_rgba(11,34,65,0.02)]"
                    >
                      {itemText}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
