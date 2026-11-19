"use client";

import React, { useState } from "react";
import {
  Lock,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface PreviewOrderStage {
  readonly stage: string;
  readonly whoActs: string;
  readonly nextStep: string;
  readonly lastChecked: string;
  readonly status: "Completed" | "In progress" | "Pending";
}

const PREVIEW_ORDER_STAGES: readonly PreviewOrderStage[] = [
  {
    stage: "01 · Order check",
    whoActs: "Zoiko order desk",
    nextStep: "Address & service validation confirmed",
    lastChecked: "Today, 09:15",
    status: "Completed",
  },
  {
    stage: "02 · Site readiness",
    whoActs: "You (Site contact)",
    nextStep: "Confirm equipment location and site opening hours",
    lastChecked: "Today, 10:02",
    status: "In progress",
  },
  {
    stage: "03 · Permission & survey",
    whoActs: "Building / Landlord & Field team",
    nextStep: "Awaiting landlord sign-off where required",
    lastChecked: "Pending check",
    status: "Pending",
  },
];

export interface OnboardingTrackInstallationProps {
  readonly onSignInPreview?: () => void;
}

export default function OnboardingTrackInstallation({
  onSignInPreview,
}: OnboardingTrackInstallationProps) {
  const [isPreviewSignedIn, setIsPreviewSignedIn] = useState(false);

  const handlePreviewSignIn = () => {
    setIsPreviewSignedIn((prev) => !prev);
    onSignInPreview?.();
  };

  return (
    <section
      id="track-your-installation"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Row: Eyebrow, Heading, Subtitle & Header CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                07
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                TRACK YOUR INSTALLATION
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[42px] font-extrabold leading-[1.13] tracking-[-0.02em] mb-3 max-w-[560px]">
              Your order&apos;s real progress, once you sign in.
            </h2>

            <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
              Order details are only shown to verified customers. We never
              reveal an order from a public lookup.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={handlePreviewSignIn}
              aria-pressed={isPreviewSignedIn}
              className="inline-flex items-center justify-center gap-2 px-4 h-[38px] rounded-[8px] bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B2241] text-[12.5px] font-bold transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
              <span>
                {isPreviewSignedIn ? "Exit preview" : "Sign in (preview)"}
              </span>
            </button>
          </div>
        </div>

        {/* Main Split Feature Card */}
        <div className="bg-[#F3F5F8] rounded-[20px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#E2E8F0]/70">
          {/* Left Portrait / Office Image */}
          <div className="lg:col-span-5 relative min-h-[270px] sm:min-h-[330px] bg-[#1E293B]">
            <img
              src="/Images/onb/10.png"
              alt="Team member smiling in an office with planning notes on a glass board"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Sign-in Prompt or Interactive Preview */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            {!isPreviewSignedIn ? (
              <div className="max-w-[460px]">
                <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-2.5">
                  Sign in to see your order
                </h3>

                <p className="text-[#475569] text-[14px] leading-[1.55] mb-6">
                  You&apos;ll see each stage, who&apos;s acting, the next step
                  and when the status was last checked.
                </p>

                <button
                  type="button"
                  onClick={handlePreviewSignIn}
                  className="inline-flex items-center justify-center px-5 h-[42px] rounded-[8px] bg-[#061A33] hover:bg-[#143563] text-white text-[13px] font-bold transition-colors cursor-pointer"
                >
                  Sign in (preview)
                </button>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 text-[#0B2241] text-[13px] font-bold">
                    <ShieldCheck
                      className="w-4 h-4 text-[#1963DD]"
                      aria-hidden="true"
                    />
                    <span>Sample customer view (non-live preview data)</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[10.5px] font-bold">
                    Preview mode
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  {PREVIEW_ORDER_STAGES.map((item) => (
                    <div
                      key={item.stage}
                      className="bg-white rounded-[12px] border border-[#E2E8F0] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {item.status === "Completed" ? (
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-[#1963DD] shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <Clock
                              className="w-3.5 h-3.5 text-[#0B2241] shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <p className="text-[#0B2241] text-[13px] font-bold">
                            {item.stage}
                          </p>
                        </div>
                        <p className="text-[#475569] text-[12px]">
                          <span className="font-semibold text-[#0B2241]">
                            Who&apos;s acting:
                          </span>{" "}
                          {item.whoActs} ·{" "}
                          <span className="font-semibold text-[#0B2241]">
                            Next step:
                          </span>{" "}
                          {item.nextStep}
                        </p>
                      </div>

                      <span className="text-[#64748B] text-[11px] font-medium shrink-0">
                        Checked: {item.lastChecked}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePreviewSignIn}
                    className="inline-flex items-center gap-1.5 text-[#0B2241] hover:text-[#1963DD] text-[12.5px] font-bold cursor-pointer transition-colors"
                  >
                    <span>Return to sign-in prompt</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
