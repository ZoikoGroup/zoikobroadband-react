"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Check } from "lucide-react";

type ScopeNeedOption =
  | "A new service"
  | "Improve current operations"
  | "Manage several sites"
  | "Not sure";

type ScopeSizeOption =
  | "1–10 users"
  | "11–50 users"
  | "51–250 users"
  | "250+ users"
  | "Not sure";

type ScopeAreaOption =
  | "Connectivity"
  | "Voice"
  | "Operations"
  | "Security"
  | "Projects & governance"
  | "Not sure";

type ScopeSitesOption =
  | "Single site"
  | "2–5 sites"
  | "6–20 sites"
  | "20+ sites"
  | "Not sure";

type ScopeManagementOption =
  | "Guidance & scope review"
  | "Co-managed with internal team"
  | "Broad managed scope"
  | "Not sure";

type ScopeYesNoUnsure = "Yes" | "No" | "Not sure";

interface ScopeReviewAnswers {
  readonly need: ScopeNeedOption | null;
  readonly size: ScopeSizeOption | null;
  readonly areas: readonly ScopeAreaOption[];
  readonly sites: ScopeSitesOption | null;
  readonly management: ScopeManagementOption | null;
  readonly hasExistingEstate: ScopeYesNoUnsure | null;
  readonly needsChangeApprovals: ScopeYesNoUnsure | null;
  readonly hasThirdPartySuppliers: ScopeYesNoUnsure | null;
  readonly wantsReportingCadence: ScopeYesNoUnsure | null;
  readonly targetTimeline: string;
  readonly notes: string;
}

const TOTAL_SCOPE_STEPS = 11;

const NEED_OPTIONS: readonly ScopeNeedOption[] = [
  "A new service",
  "Improve current operations",
  "Manage several sites",
  "Not sure",
];

const SIZE_OPTIONS: readonly ScopeSizeOption[] = [
  "1–10 users",
  "11–50 users",
  "51–250 users",
  "250+ users",
  "Not sure",
];

const AREA_OPTIONS: readonly ScopeAreaOption[] = [
  "Connectivity",
  "Voice",
  "Operations",
  "Security",
  "Projects & governance",
  "Not sure",
];

const SITES_OPTIONS: readonly ScopeSitesOption[] = [
  "Single site",
  "2–5 sites",
  "6–20 sites",
  "20+ sites",
  "Not sure",
];

const MANAGEMENT_OPTIONS: readonly ScopeManagementOption[] = [
  "Guidance & scope review",
  "Co-managed with internal team",
  "Broad managed scope",
  "Not sure",
];

const YES_NO_UNSURE_OPTIONS: readonly ScopeYesNoUnsure[] = [
  "Yes",
  "No",
  "Not sure",
];

const TIMELINE_OPTIONS: readonly string[] = [
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Exploring / flexible",
];

export interface ManagedScopeReviewWizardProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly onComplete?: (answers: ScopeReviewAnswers) => void;
}

export default function ManagedScopeReviewWizard({
  imageSrc = "/Images/mng/3.png",
  imageAlt = "Business representative smiling in a modern office with a mobile phone",
  onComplete,
}: ManagedScopeReviewWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<ScopeReviewAnswers>({
    need: null,
    size: null,
    areas: [],
    sites: null,
    management: null,
    hasExistingEstate: null,
    needsChangeApprovals: null,
    hasThirdPartySuppliers: null,
    wantsReportingCadence: null,
    targetTimeline: "",
    notes: "",
  });

  const handleBack = () => {
    if (submitted) {
      setSubmitted(false);
      return;
    }
    setStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleContinue = () => {
    if (stepIndex < TOTAL_SCOPE_STEPS - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }
    setSubmitted(true);
    onComplete?.(answers);
  };

  const handleReset = () => {
    setAnswers({
      need: null,
      size: null,
      areas: [],
      sites: null,
      management: null,
      hasExistingEstate: null,
      needsChangeApprovals: null,
      hasThirdPartySuppliers: null,
      wantsReportingCadence: null,
      targetTimeline: "",
      notes: "",
    });
    setStepIndex(0);
    setSubmitted(false);
  };

  const toggleArea = (area: ScopeAreaOption) => {
    setAnswers((prev) => {
      if (area === "Not sure") {
        const nextAreas: readonly ScopeAreaOption[] = prev.areas.includes(
          "Not sure",
        )
          ? []
          : ["Not sure"];
        return { ...prev, areas: nextAreas };
      }

      const withoutNotSure = prev.areas.filter((item) => item !== "Not sure");
      const nextAreas: readonly ScopeAreaOption[] = withoutNotSure.includes(
        area,
      )
        ? withoutNotSure.filter((item) => item !== area)
        : [...withoutNotSure, area];

      return { ...prev, areas: nextAreas };
    });
  };

  const renderRadioGrid = <T extends string>(
    options: readonly T[],
    selectedValue: T | null,
    onSelect: (value: T) => void,
    gridColsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  ) => (
    <div className={`grid ${gridColsClass} gap-3`}>
      {options.map((option) => {
        const isSelected = selectedValue === option;

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(option)}
            className={`w-full min-h-[48px] px-4 py-2.5 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
              isSelected
                ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241] shadow-[0_2px_8px_rgba(11,34,65,0.06)]"
                : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
            }`}
          >
            <span
              aria-hidden="true"
              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                isSelected
                  ? "border-[#061A33] bg-[#061A33]"
                  : "border-[#CBD5E1] bg-white"
              }`}
            >
              {isSelected ? (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC119]" />
              ) : null}
            </span>

            <span className="text-[12.5px] font-bold leading-snug">
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );

  const renderStepContent = () => {
    if (submitted) {
      return (
        <div>
          <p className="text-[#1963DD] text-[10.5px] font-bold tracking-[0.12em] uppercase mb-2">
            SCOPE NOTES PREPARED IN SESSION
          </p>
          <h3 className="text-[#0B2241] text-[22px] font-extrabold leading-[1.25] mb-2">
            Scope review summary ready
          </h3>
          <p className="text-[#475569] text-[13px] leading-[1.55] mb-5">
            This is a category-level summary for discussion—not a formal quote
            or published product commitment.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px] bg-[#F8FAFC] rounded-[12px] p-4 border border-[#E2E8F0]">
            <div>
              <dt className="font-bold text-[#64748B]">Need</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.need ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">Size</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.size ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">Areas</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.areas.length > 0 ? answers.areas.join(", ") : "—"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">Sites</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.sites ?? "—"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-bold text-[#64748B]">Management</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.management ?? "—"}
              </dd>
            </div>
          </dl>
        </div>
      );
    }

    switch (stepIndex) {
      case 0:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              What do you need?
            </h3>
            {renderRadioGrid(
              NEED_OPTIONS,
              answers.need,
              (val) => setAnswers((prev) => ({ ...prev, need: val })),
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Roughly how large is your team or user base?
            </h3>
            {renderRadioGrid(SIZE_OPTIONS, answers.size, (val) =>
              setAnswers((prev) => ({ ...prev, size: val })),
            )}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Which service areas would you like to discuss?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AREA_OPTIONS.map((area) => {
                const isChecked = answers.areas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    role="checkbox"
                    aria-checked={isChecked}
                    onClick={() => toggleArea(area)}
                    className={`w-full min-h-[48px] px-4 py-2.5 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isChecked
                        ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241] shadow-[0_2px_8px_rgba(11,34,65,0.06)]"
                        : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? "bg-[#061A33] border-[#061A33] text-[#FFC119]"
                          : "bg-white border-[#CBD5E1]"
                      }`}
                    >
                      {isChecked ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : null}
                    </span>
                    <span className="text-[12.5px] font-bold leading-snug">
                      {area}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              How many sites are involved?
            </h3>
            {renderRadioGrid(SITES_OPTIONS, answers.sites, (val) =>
              setAnswers((prev) => ({ ...prev, sites: val })),
            )}
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              What level of management are you considering?
            </h3>
            {renderRadioGrid(MANAGEMENT_OPTIONS, answers.management, (val) =>
              setAnswers((prev) => ({ ...prev, management: val })),
            )}
          </>
        );
      case 5:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Do you already have an existing network or equipment estate?
            </h3>
            {renderRadioGrid(
              YES_NO_UNSURE_OPTIONS,
              answers.hasExistingEstate,
              (val) =>
                setAnswers((prev) => ({ ...prev, hasExistingEstate: val })),
            )}
          </>
        );
      case 6:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Will changes require formal sign-off or maintenance windows?
            </h3>
            {renderRadioGrid(
              YES_NO_UNSURE_OPTIONS,
              answers.needsChangeApprovals,
              (val) =>
                setAnswers((prev) => ({ ...prev, needsChangeApprovals: val })),
            )}
          </>
        );
      case 7:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Are other suppliers or software vendors involved?
            </h3>
            {renderRadioGrid(
              YES_NO_UNSURE_OPTIONS,
              answers.hasThirdPartySuppliers,
              (val) =>
                setAnswers((prev) => ({
                  ...prev,
                  hasThirdPartySuppliers: val,
                })),
            )}
          </>
        );
      case 8:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Would you like regular review meetings or status reporting?
            </h3>
            {renderRadioGrid(
              YES_NO_UNSURE_OPTIONS,
              answers.wantsReportingCadence,
              (val) =>
                setAnswers((prev) => ({ ...prev, wantsReportingCadence: val })),
            )}
          </>
        );
      case 9:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              What is your rough timeframe for a scope discussion?
            </h3>
            {renderRadioGrid(
              TIMELINE_OPTIONS,
              answers.targetTimeline || null,
              (val) => setAnswers((prev) => ({ ...prev, targetTimeline: val })),
            )}
          </>
        );
      default:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-3">
              Any context you&apos;d like to note for a scope review?
            </h3>
            <label htmlFor="scope-review-notes" className="sr-only">
              Scope review notes
            </label>
            <textarea
              id="scope-review-notes"
              rows={3}
              value={answers.notes}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Optional: goals or operational context only. Never share passwords, config files or sensitive records."
              className="w-full p-3.5 rounded-[10px] border border-[#CBD5E1] text-[#0B2241] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
            />
          </>
        );
    }
  };

  return (
    <section
      id="request-a-scope-review"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFFFFF] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              08
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              REQUEST A SCOPE REVIEW
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[560px]">
            Tell us what you&apos;d like managed.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[580px]">
            Short, category-level questions. Never share passwords,
            configuration files or sensitive records here.
          </p>
        </div>

        {/* Main Split Layout: Left 11-Step Wizard + Right Scope Summary & Advisor Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Wizard Card */}
          <div className="lg:col-span-8 bg-white rounded-[20px] border border-[#E2E8F0] p-6 sm:p-8 lg:p-9 shadow-[0_8px_24px_rgba(11,34,65,0.04)] flex flex-col justify-between">
            <div>
              {/* 11-Segment Step Progress Bar */}
              <div
                aria-hidden="true"
                className="grid grid-cols-11 gap-1.5 mb-6"
              >
                {Array.from({ length: TOTAL_SCOPE_STEPS }).map((_, idx) => {
                  const isActiveOrCompleted = submitted || idx <= stepIndex;
                  return (
                    <span
                      key={idx}
                      className={`h-1 rounded-full transition-colors ${
                        isActiveOrCompleted ? "bg-[#FFC119]" : "bg-[#E2E8F0]"
                      }`}
                    />
                  );
                })}
              </div>

              <p className="text-[#1963DD] text-[10.5px] font-bold tracking-[0.12em] uppercase mb-2.5">
                STEP {stepIndex + 1} OF {TOTAL_SCOPE_STEPS}
              </p>

              {renderStepContent()}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="flex items-center justify-between gap-4 pt-8 mt-4">
              {submitted ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-[38px] rounded-[8px] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#0B2241] text-[12px] font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Start over</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 h-[38px] rounded-[8px] border text-[12px] font-bold transition-colors ${
                    stepIndex === 0
                      ? "border-[#E2E8F0] bg-white text-[#94A3B8] cursor-not-allowed"
                      : "border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#0B2241] cursor-pointer"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Back</span>
                </button>
              )}

              {!submitted ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center justify-center gap-2 px-5 h-[40px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[12.5px] font-bold transition-colors cursor-pointer shadow-[0_2px_8px_rgba(255,193,25,0.28)]"
                >
                  <span>
                    {stepIndex === TOTAL_SCOPE_STEPS - 1
                      ? "Review scope"
                      : "Continue"}
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 stroke-[2.3]"
                    aria-hidden="true"
                  />
                </button>
              ) : null}
            </div>
          </div>

          {/* Right Column: "YOUR SCOPE SO FAR" Card + Image with Bottom Callout */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-[#061A33] rounded-[18px] p-5 sm:p-6 text-white shadow-[0_8px_22px_rgba(6,26,51,0.14)]">
              <p className="text-[#FFC119] text-[10px] font-extrabold tracking-[0.12em] uppercase mb-3.5">
                YOUR SCOPE SO FAR
              </p>

              <dl className="divide-y divide-white/10 text-[12px]">
                <div className="py-2 first:pt-0">
                  <dt className="text-[#94A3B8] text-[10.5px] font-semibold leading-tight">
                    Need
                  </dt>
                  <dd className="text-white font-bold mt-0.5">
                    {answers.need ?? "—"}
                  </dd>
                </div>

                <div className="py-2">
                  <dt className="text-[#94A3B8] text-[10.5px] font-semibold leading-tight">
                    Size
                  </dt>
                  <dd className="text-white font-bold mt-0.5">
                    {answers.size ?? "—"}
                  </dd>
                </div>

                <div className="py-2">
                  <dt className="text-[#94A3B8] text-[10.5px] font-semibold leading-tight">
                    Areas
                  </dt>
                  <dd className="text-white font-bold mt-0.5">
                    {answers.areas.length > 0 ? answers.areas.join(", ") : "—"}
                  </dd>
                </div>

                <div className="py-2">
                  <dt className="text-[#94A3B8] text-[10.5px] font-semibold leading-tight">
                    Sites
                  </dt>
                  <dd className="text-white font-bold mt-0.5">
                    {answers.sites ?? "—"}
                  </dd>
                </div>

                <div className="py-2 last:pb-0">
                  <dt className="text-[#94A3B8] text-[10.5px] font-semibold leading-tight">
                    Management
                  </dt>
                  <dd className="text-white font-bold mt-0.5">
                    {answers.management ?? "—"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative w-full min-h-[165px] sm:min-h-[180px] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_6px_18px_rgba(11,34,65,0.08)] flex-1">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
              />

              {/* Subtle bottom scrim to keep pill legible over photo */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#061A33]/75 to-transparent"
              />

              <div className="relative z-10 h-full p-3 flex items-end">
                <div className="w-full bg-white/95 backdrop-blur-xs rounded-[10px] px-3.5 py-2 shadow-[0_6px_16px_rgba(6,26,51,0.25)]">
                  <p className="text-[#0B2241] text-[11px] font-bold leading-[1.35]">
                    Prefer to talk?{" "}
                    <span className="font-semibold text-[#475569]">
                      [Approved business sales number]
                    </span>
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
