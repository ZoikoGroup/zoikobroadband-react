"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type ManagedCardVariant = "light" | "dark";
type BulletTone = "green" | "gold" | "muted";

interface ComparisonBullet {
  readonly text: string;
  readonly tone: BulletTone;
}

interface ManagedServiceCard {
  readonly stepNumber: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly ComparisonBullet[];
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly variant: ManagedCardVariant;
}

const MANAGED_SERVICE_CARDS: readonly ManagedServiceCard[] = [
  {
    stepNumber: "1",
    title: "A broadband line",
    description:
      "The connection itself, supported under your broadband agreement.",
    bullets: [
      { text: "Your line and router, as ordered", tone: "green" },
      { text: "Fault reporting", tone: "green" },
      { text: "Not: Your Wi-Fi, devices or other suppliers", tone: "muted" },
    ],
    imageSrc: "/Images/mng/2.png",
    imageAlt: "Person working by a dual-antenna router in a modern workspace",
    variant: "light",
  },
  {
    stepNumber: "2",
    title: "Business support",
    description: "Help when something goes wrong, under agreed support terms.",
    bullets: [
      { text: "Fault diagnosis and escalation", tone: "green" },
      { text: "Support contacts and hours you agree", tone: "green" },
      { text: "Not: Changing or running your network for you", tone: "muted" },
    ],
    imageSrc: "/Images/onb/12.png",
    imageAlt: "Support specialist wearing a headset at a computer monitor",
    variant: "light",
  },
  {
    stepNumber: "3",
    title: "A managed service",
    description:
      "Agreed parts of your estate are looked after, with clear ownership.",
    bullets: [
      { text: "Only what your agreement names", tone: "gold" },
      { text: "Change approvals and reporting, if agreed", tone: "gold" },
      { text: "Not: Anything not written into your scope", tone: "muted" },
    ],
    imageSrc: "/Images/mng/3.png",
    imageAlt:
      "Business representative in a suit holding a phone in a bright office",
    variant: "dark",
  },
];

function renderBulletIcon(tone: BulletTone) {
  switch (tone) {
    case "green":
      return (
        <CheckCircle2
          className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5 stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "gold":
      return (
        <CheckCircle2
          className="w-3.5 h-3.5 text-[#FFC119] shrink-0 mt-0.5 stroke-[2.2]"
          aria-hidden="true"
        />
      );
    case "muted":
      return (
        <XCircle
          className="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mt-0.5 stroke-[2]"
          aria-hidden="true"
        />
      );
  }
}

export default function OnboardingManagedServiceComparison() {
  return (
    <section
      id="what-managed-means"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              01
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              WHAT &ldquo;MANAGED&rdquo; MEANS
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[490px]">
            A line, support, or a managed service?
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            Three different things that are easy to confuse. A managed service
            only covers what your agreement says.
          </p>
        </div>

        {/* 3-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MANAGED_SERVICE_CARDS.map((card) => {
            const isDark = card.variant === "dark";

            return (
              <article
                key={card.stepNumber}
                className={`rounded-[18px] overflow-hidden flex flex-col transition-colors ${
                  isDark
                    ? "bg-[#061A33] text-white shadow-[0_12px_28px_rgba(6,26,51,0.18)]"
                    : "bg-white text-[#0B2241] border border-[#E2E8F0] shadow-[0_6px_20px_rgba(11,34,65,0.04)]"
                }`}
              >
                {/* Top Photo with Step Badge */}
                <div className="relative w-full h-[185px] sm:h-[200px] bg-[#1E293B] overflow-hidden">
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover object-[50%_20%]"
                  />
                  <span className="absolute top-3.5 left-3.5 w-6 h-6 rounded-[6px] bg-[#FFC119] text-[#0B2241] text-[11.5px] font-extrabold inline-flex items-center justify-center shadow-sm">
                    {card.stepNumber}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className={`text-[17px] font-extrabold leading-[1.3] mb-2 ${
                        isDark ? "text-[#FFC119]" : "text-[#0B2241]"
                      }`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`text-[12.5px] leading-[1.55] mb-5 ${
                        isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Scope / Exclusion Checklist */}
                  <ul className="space-y-2">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet.text}
                        className={`flex items-start gap-2 text-[12px] leading-[1.45] ${
                          isDark ? "text-[#E2E8F0]" : "text-[#475569]"
                        }`}
                      >
                        {renderBulletIcon(bullet.tone)}
                        <span>{bullet.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
