"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  FileSearch,
  Headphones,
  Info,
  MessageSquareWarning,
  PhoneOff,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

type IssueKey =
  | "internet-down"
  | "slow-connection"
  | "phones-not-working"
  | "check-case"
  | "service-levels"
  | "make-complaint";

interface IssueOption {
  id: IssueKey;
  label: string;
  icon: LucideIcon;
  steps: readonly [string, string, string];
  noteLabel: string;
  noteText: string;
  ctaLabel: string;
  ctaHref: string;
}

const ISSUES: readonly IssueOption[] = [
  {
    id: "internet-down",
    label: "Internet is down",
    icon: WifiOff,
    steps: [
      "Check our service status for a confirmed incident.",
      "Try safe checks, unless phones or alarms rely on the line.",
      "Report a fault if it's still down.",
    ],
    noteLabel: "We won't pretend:",
    noteText: "that one restart fixes every fault.",
    ctaLabel: "Check service status",
    ctaHref: "/status",
  },
  {
    id: "slow-connection",
    label: "Slow connection",
    icon: AlertTriangle,
    steps: [
      "Test speeds on a wired device to rule out local Wi-Fi interference.",
      "Check if heavy backups or cloud syncs are saturating bandwidth.",
      "Log a performance diagnostic with your line details.",
    ],
    noteLabel: "Worth noting:",
    noteText: "peak-hour congestion and internal hardware behave differently.",
    ctaLabel: "Run a support check",
    ctaHref: "/support/diagnostics",
  },
  {
    id: "phones-not-working",
    label: "Phones not working",
    icon: PhoneOff,
    steps: [
      "Verify power and network cabling on your handsets and router.",
      "Check whether inbound calls fail on all numbers or one extension.",
      "Escalate voice routing or trunk issues with an active test number.",
    ],
    noteLabel: "Keep in mind:",
    noteText: "critical safety or alarm lines need clear continuity checks.",
    ctaLabel: "Report voice issue",
    ctaHref: "/support/voice",
  },
  {
    id: "check-case",
    label: "Check a case",
    icon: FileSearch,
    steps: [
      "Have your ticket or fault reference number ready.",
      "Review the latest engineer notes and scheduled update window.",
      "Add site access details or callback times if requested.",
    ],
    noteLabel: "Faster updates:",
    noteText: "referencing your ticket ID avoids starting from scratch.",
    ctaLabel: "Look up a ticket",
    ctaHref: "/support/tickets",
  },
  {
    id: "service-levels",
    label: "Service levels",
    icon: Clock,
    steps: [
      "Confirm your active SLA tier, response target, and fix window.",
      "Check support hours and escalation paths for your service type.",
      "Request an SLA review if your business hours have changed.",
    ],
    noteLabel: "Contract clarity:",
    noteText: "response commitments depend on your specific plan and terms.",
    ctaLabel: "View SLA commitments",
    ctaHref: "/support/slas",
  },
  {
    id: "make-complaint",
    label: "Make a complaint",
    icon: MessageSquareWarning,
    steps: [
      "Share your account details and a clear summary of what went wrong.",
      "Let us know the outcome or resolution you are looking for.",
      "Receive a formal complaint reference and clear handling timeline.",
    ],
    noteLabel: "Straight talk:",
    noteText: "if we missed the mark, you deserve a direct path to resolution.",
    ctaLabel: "Submit a complaint",
    ctaHref: "/support/complaints",
  },
] as const;

const TABS = [
  {
    n: "01",
    label: "Installation & Onboarding",
    href: "/business/installation",
    active: false,
  },
  {
    n: "02",
    label: "Business Support & SLAs",
    href: "/business/support",
    active: true,
  },
  {
    n: "03",
    label: "Cyber Security & Protection",
    href: "/business/security",
    active: false,
  },
  {
    n: "04",
    label: "Managed Services",
    href: "/business/managed-services",
    active: false,
  },
  {
    n: "05",
    label: "Request a Tailored Quote",
    href: "/contact",
    active: false,
  },
] as const;

export default function BusinessSupportSLAs() {
  const [selectedId, setSelectedId] = useState<IssueKey>("internet-down");
  const activeIssue =
    ISSUES.find((item) => item.id === selectedId) ?? ISSUES[0];

  return (
    <section className="w-full overflow-hidden bg-[#06182c] text-white">
      {/* Main Hero Area */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[#12395b]/45 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-6 h-[260px] w-[260px] rounded-full bg-[#eab308]/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-[1300px] items-center gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1fr_1.06fr] lg:px-12 lg:py-14">
          {/* Left Column */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 shadow-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffc400] text-[#06182c]">
                <Headphones
                  className="h-3 w-3 stroke-[2.5]"
                  aria-hidden="true"
                />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/95">
                BUSINESS SERVICES · 02
              </span>
            </div>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#ffc400] sm:text-[13px]">
              BUSINESS SUPPORT &amp; SLAS
            </p>

            <h1 className="mt-2.5 text-4xl font-black leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl lg:text-[48px]">
              <span className="block">Business support</span>
              <span className="block">when you need clear</span>
              <span className="block">answers.</span>
            </h1>

            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.6] text-white/80">
              Get help with your service, understand support terms and find the
              right next step for your business.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/support/report"
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#ffc400] px-5 py-3 text-sm font-bold text-[#06182c] shadow-[0_6px_18px_rgba(255,196,0,0.28)] transition hover:bg-[#f5bc00]"
              >
                <span>Report a service issue</span>
                <ArrowRight
                  className="h-4 w-4 stroke-[2.3]"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/support/options"
                className="inline-flex items-center justify-center rounded-[6px] border border-white/35 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-white/60 hover:bg-white/[0.09]"
              >
                Explore support options
              </Link>
            </div>

            <div className="mt-6 flex max-w-[450px] items-start gap-2.5 rounded-[8px] border border-white/12 bg-white/[0.05] px-4 py-3 text-xs leading-[1.45] text-white/75">
              <Info
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70"
                aria-hidden="true"
              />
              <span>
                Support availability and service commitments depend on your
                product and contract.
              </span>
            </div>
          </div>

          {/* Right Column: Top-right & Bottom-left Half-Shown Photo Crops + Card */}
          <div className="relative z-10 mx-auto w-full max-w-[620px] pt-4 lg:pt-0">
            {/* Top-right circular photo crop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 hidden h-[190px] w-[190px] overflow-hidden rounded-full border-[3px] border-[#ffc400] shadow-2xl sm:block"
            >
              <Image
                src="/Images/onb/12.png"
                alt=""
                fill
                priority
                sizes="190px"
                className="object-cover object-top"
              />
            </div>

            {/* Bottom-left rounded photo crop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 -left-8 hidden h-[125px] w-[160px] overflow-hidden rounded-xl border border-white/20 shadow-xl sm:block"
            >
              <Image
                src="/Images/onb/12.png"
                alt=""
                fill
                sizes="160px"
                className="object-cover object-center"
              />
            </div>

            {/* White Interactive Card */}
            <div className="relative z-10 rounded-[14px] bg-white p-5 text-[#091a2e] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 h-8 w-8 shrink-0 rounded-[7px] bg-[#ffc400]"
                />
                <div>
                  <h2 className="text-base font-extrabold leading-tight text-[#08172b] sm:text-lg">
                    What&apos;s happening?
                  </h2>
                  <p className="mt-0.5 text-xs text-[#64748b]">
                    Choose one and we&apos;ll show your next steps.
                  </p>
                </div>
              </div>

              <div
                role="radiogroup"
                aria-label="What's happening?"
                className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3"
              >
                {ISSUES.map((issue) => {
                  const Icon = issue.icon;
                  const isSelected = issue.id === activeIssue.id;

                  return (
                    <button
                      key={issue.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => setSelectedId(issue.id)}
                      className={`group flex flex-col items-start justify-between rounded-[8px] border p-3 text-left transition ${
                        isSelected
                          ? "border-[#091a2e] bg-[#fff9db] ring-1 ring-[#091a2e]"
                          : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1] hover:bg-[#f8fafc]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mb-2.5 inline-flex h-6 w-6 items-center justify-center rounded-[5px] ${
                          isSelected
                            ? "bg-[#ffc400] text-[#091a2e]"
                            : "bg-[#f1f5f9] text-[#64748b] group-hover:text-[#091a2e]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[11px] font-bold leading-snug text-[#0f172a] sm:text-xs">
                        {issue.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[10px] bg-[#f4f7fa] p-4 sm:p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#475569]">
                  YOUR NEXT STEPS
                </p>

                <ol className="mt-3 space-y-2.5">
                  {activeIssue.steps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-[#1e293b] sm:text-[13px]"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#091a2e] text-[10px] font-bold text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <p className="mt-3.5 text-[11px] leading-snug text-[#475569]">
                  <span className="font-bold text-[#9a6b00]">
                    {activeIssue.noteLabel}
                  </span>{" "}
                  {activeIssue.noteText}
                </p>

                <div className="mt-4">
                  <Link
                    href={activeIssue.ctaHref}
                    className="inline-flex items-center justify-center rounded-[6px] bg-[#08192e] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#102a48]"
                  >
                    {activeIssue.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <nav aria-label="Business sections" className="w-full bg-[#eef2f6]">
        <ul className="mx-auto grid max-w-[1300px] grid-cols-1 gap-2.5 px-6 py-3 sm:grid-cols-2 sm:px-8 lg:grid-cols-5 lg:px-12">
          {TABS.map((tab) => (
            <li key={tab.n}>
              <Link
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={`flex h-full items-center gap-2.5 rounded-[6px] px-3.5 py-2.5 text-xs font-bold leading-tight transition ${
                  tab.active
                    ? "bg-[#ffc400] text-[#08172b] shadow-xs"
                    : "bg-white text-[#0f172a] hover:bg-white/80"
                }`}
              >
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-[4px] px-1 text-[10px] font-extrabold ${
                    tab.active
                      ? "bg-[#08172b]/10 text-[#08172b]"
                      : "bg-[#f1f5f9] text-[#64748b]"
                  }`}
                >
                  {tab.n}
                </span>
                <span>{tab.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
