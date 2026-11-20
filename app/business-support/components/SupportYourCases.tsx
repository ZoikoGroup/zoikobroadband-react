"use client";

import React, { useState } from "react";
import { Lock, CheckCircle2, RotateCcw, Clock } from "lucide-react";

type CaseStatus = "Open" | "Awaiting confirmation" | "Resolved";

interface SupportCaseRecord {
  readonly id: string;
  readonly reference: string;
  readonly title: string;
  readonly status: CaseStatus;
  readonly assignee: string;
  readonly lastUpdated: string;
}

const PREVIEW_CASES: readonly SupportCaseRecord[] = [
  {
    id: "case-1042",
    reference: "CASE-1042",
    title: "Main office router sync & WAN drop",
    status: "Awaiting confirmation",
    assignee: "Network Faults Team",
    lastUpdated: "Today · 10:45",
  },
  {
    id: "case-1038",
    reference: "CASE-1038",
    title: "Reception voice handset line check",
    status: "Open",
    assignee: "Voice Support",
    lastUpdated: "Yesterday · 16:15",
  },
  {
    id: "case-1019",
    reference: "CASE-1019",
    title: "Scheduled maintenance window verification",
    status: "Resolved",
    assignee: "Service Operations",
    lastUpdated: "14 Nov · 09:20",
  },
];

export interface SupportYourCasesProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly onSignInPreview?: () => void;
}

export default function SupportYourCases({
  imageSrc = "/Images/mng/3.png",
  imageAlt = "Business representative in a navy suit holding a phone in a bright office",
  onSignInPreview,
}: SupportYourCasesProps) {
  const [signedInPreview, setSignedInPreview] = useState(false);
  const [cases, setCases] =
    useState<readonly SupportCaseRecord[]>(PREVIEW_CASES);

  const handleSignIn = () => {
    setSignedInPreview(true);
    onSignInPreview?.();
  };

  const handleConfirmFix = (id: string) => {
    setCases((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Resolved", lastUpdated: "Just now" }
          : item,
      ),
    );
  };

  const handleReopenCase = (id: string) => {
    setCases((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Open", lastUpdated: "Just now" }
          : item,
      ),
    );
  };

  return (
    <section
      id="your-cases"
      className="w-full bg-[#061A33] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Row: Eyebrow, Heading & Top-Right Sign-in Button */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                04
              </span>
              <span className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase">
                YOUR CASES
              </span>
            </div>

            <h2 className="text-white text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[560px]">
              Check a case, confirm a fix or reopen it.
            </h2>

            <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[560px]">
              Case details are only shown after you sign in. We never reveal a
              case from an email or phone lookup.
            </p>
          </div>

          <div className="shrink-0 self-start lg:self-end">
            <button
              type="button"
              onClick={
                signedInPreview ? () => setSignedInPreview(false) : handleSignIn
              }
              className="inline-flex items-center justify-center gap-2 px-4 h-[40px] rounded-[8px] border border-[#334155] bg-[#0B2241] hover:bg-[#102E56] text-white text-[12px] font-bold transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#FFC119]" aria-hidden="true" />
              <span>
                {signedInPreview ? "Sign out (preview)" : "Sign in (preview)"}
              </span>
            </button>
          </div>
        </div>

        {/* Main Split Card: Left Photo + Right Sign-in Prompt or Preview Cases */}
        <div className="rounded-[20px] bg-[#0E2644] border border-white/10 overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.25)] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative min-h-[210px] sm:min-h-[240px] bg-[#1E293B] overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
            />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            {!signedInPreview ? (
              <div className="max-w-[440px]">
                <h3 className="text-white text-[20px] sm:text-[22px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-2.5">
                  Sign in to see your cases
                </h3>

                <p className="text-[#CBD5E1] text-[13px] leading-[1.6] mb-6">
                  See each case&apos;s status, who&apos;s working on it and the
                  latest update, with the time it was posted.
                </p>

                <button
                  type="button"
                  onClick={handleSignIn}
                  className="inline-flex items-center justify-center px-5 h-[40px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[12.5px] font-bold transition-colors cursor-pointer shadow-[0_3px_12px_rgba(255,193,25,0.25)]"
                >
                  Sign in (preview)
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-[#FFC119] text-[10.5px] font-extrabold tracking-[0.12em] uppercase">
                    PREVIEW SESSION · SIGNED IN
                  </span>
                  <span className="text-[#94A3B8] text-[11px]">
                    Sample data only
                  </span>
                </div>

                {cases.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[12px] bg-[#061A33] border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[#FFC119] text-[11px] font-extrabold">
                          {item.reference}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#362E14] text-[#FFC119] text-[10px] font-bold">
                          {item.status}
                        </span>
                      </div>

                      <h3 className="text-white text-[13.5px] font-bold leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[#94A3B8] text-[11.5px] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>Owner: {item.assignee}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          <span>{item.lastUpdated}</span>
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.status !== "Resolved" ? (
                        <button
                          type="button"
                          onClick={() => handleConfirmFix(item.id)}
                          className="inline-flex items-center gap-1 px-3 h-[32px] rounded-[7px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[11.5px] font-bold transition-colors cursor-pointer"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                          <span>Confirm fix</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleReopenCase(item.id)}
                          className="inline-flex items-center gap-1 px-3 h-[32px] rounded-[7px] border border-white/20 hover:bg-white/10 text-white text-[11.5px] font-bold transition-colors cursor-pointer"
                        >
                          <RotateCcw
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                          <span>Reopen</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
