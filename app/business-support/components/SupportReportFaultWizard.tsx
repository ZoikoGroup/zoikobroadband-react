"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Check } from "lucide-react";

type AffectedServiceOption =
  | "Broadband"
  | "Business phones"
  | "Both"
  | "Not sure";

type FaultSymptomOption =
  | "No connection / no dial tone"
  | "Slow speeds or intermittent drops"
  | "Call quality or routing issue"
  | "Router / hardware lights or power issue"
  | "Not sure";

type FaultStartedOption =
  | "Just happened (today)"
  | "Earlier this week"
  | "Ongoing / recurring"
  | "Not sure";

type FaultImpactOption =
  | "Whole site affected"
  | "Specific team or desk"
  | "Phones, alarms or card machines impacted"
  | "Not sure";

type FaultChecksDoneOption =
  | "Yes, completed safe checks"
  | "Partially completed"
  | "Skipped (safety or urgency)"
  | "Not sure";

type FaultSiteAccessOption =
  | "Yes, site contact available"
  | "Needs arrangement / escort"
  | "Remote check first"
  | "Not sure";

interface FaultReportAnswers {
  readonly affectedService: AffectedServiceOption | null;
  readonly symptom: FaultSymptomOption | null;
  readonly startedWhen: FaultStartedOption | null;
  readonly impact: readonly FaultImpactOption[];
  readonly checksCompleted: FaultChecksDoneOption | null;
  readonly siteAccess: FaultSiteAccessOption | null;
  readonly contactName: string;
  readonly contactDetails: string;
  readonly notes: string;
}

const TOTAL_FAULT_STEPS = 8;

const AFFECTED_SERVICE_OPTIONS: readonly AffectedServiceOption[] = [
  "Broadband",
  "Business phones",
  "Both",
  "Not sure",
];

const SYMPTOM_OPTIONS: readonly FaultSymptomOption[] = [
  "No connection / no dial tone",
  "Slow speeds or intermittent drops",
  "Call quality or routing issue",
  "Router / hardware lights or power issue",
  "Not sure",
];

const STARTED_OPTIONS: readonly FaultStartedOption[] = [
  "Just happened (today)",
  "Earlier this week",
  "Ongoing / recurring",
  "Not sure",
];

const IMPACT_OPTIONS: readonly FaultImpactOption[] = [
  "Whole site affected",
  "Specific team or desk",
  "Phones, alarms or card machines impacted",
  "Not sure",
];

const CHECKS_DONE_OPTIONS: readonly FaultChecksDoneOption[] = [
  "Yes, completed safe checks",
  "Partially completed",
  "Skipped (safety or urgency)",
  "Not sure",
];

const SITE_ACCESS_OPTIONS: readonly FaultSiteAccessOption[] = [
  "Yes, site contact available",
  "Needs arrangement / escort",
  "Remote check first",
  "Not sure",
];

export interface SupportReportFaultWizardProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly supportPhonePlaceholder?: string;
  readonly supportHoursPlaceholder?: string;
  readonly onComplete?: (answers: FaultReportAnswers) => void;
}

export default function SupportReportFaultWizard({
  imageSrc = "/Images/onb/12.png",
  imageAlt = "Support advisor wearing a headset smiling at a computer workstation",
  supportPhonePlaceholder = "[Approved support number]",
  supportHoursPlaceholder = "[Approved hours]",
  onComplete,
}: SupportReportFaultWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<FaultReportAnswers>({
    affectedService: null,
    symptom: null,
    startedWhen: null,
    impact: [],
    checksCompleted: null,
    siteAccess: null,
    contactName: "",
    contactDetails: "",
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
    if (stepIndex < TOTAL_FAULT_STEPS - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }
    setSubmitted(true);
    onComplete?.(answers);
  };

  const handleReset = () => {
    setAnswers({
      affectedService: null,
      symptom: null,
      startedWhen: null,
      impact: [],
      checksCompleted: null,
      siteAccess: null,
      contactName: "",
      contactDetails: "",
      notes: "",
    });
    setStepIndex(0);
    setSubmitted(false);
  };

  const toggleImpact = (item: FaultImpactOption) => {
    setAnswers((prev) => {
      if (item === "Not sure") {
        const nextImpact: readonly FaultImpactOption[] = prev.impact.includes(
          "Not sure",
        )
          ? []
          : ["Not sure"];
        return { ...prev, impact: nextImpact };
      }

      const withoutNotSure = prev.impact.filter(
        (entry) => entry !== "Not sure",
      );
      const nextImpact: readonly FaultImpactOption[] = withoutNotSure.includes(
        item,
      )
        ? withoutNotSure.filter((entry) => entry !== item)
        : [...withoutNotSure, item];

      return { ...prev, impact: nextImpact };
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
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
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
            FAULT SUMMARY PREPARED IN SESSION
          </p>
          <h3 className="text-[#0B2241] text-[22px] font-extrabold leading-[1.25] mb-2">
            Fault details ready for review
          </h3>
          <p className="text-[#475569] text-[13px] leading-[1.55] mb-5">
            No passwords, door codes or card numbers are included. Review the
            summary below or start over.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] bg-[#F8FAFC] rounded-[12px] p-4 border border-[#E2E8F0]">
            <div>
              <dt className="font-bold text-[#64748B]">Affected service</dt>
              <dd className="font-bold text-[#0B2241] mt-0.5">
                {answers.affectedService ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">Main symptom</dt>
              <dd className="font-bold text-[#0B2241] mt-0.5">
                {answers.symptom ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">When it started</dt>
              <dd className="font-bold text-[#0B2241] mt-0.5">
                {answers.startedWhen ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">Impact</dt>
              <dd className="font-bold text-[#0B2241] mt-0.5">
                {answers.impact.length > 0 ? answers.impact.join(", ") : "—"}
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
              Which service is affected?
            </h3>
            {renderRadioGrid(
              AFFECTED_SERVICE_OPTIONS,
              answers.affectedService,
              (val) =>
                setAnswers((prev) => ({ ...prev, affectedService: val })),
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              What are you seeing right now?
            </h3>
            {renderRadioGrid(SYMPTOM_OPTIONS, answers.symptom, (val) =>
              setAnswers((prev) => ({ ...prev, symptom: val })),
            )}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              When did this start?
            </h3>
            {renderRadioGrid(STARTED_OPTIONS, answers.startedWhen, (val) =>
              setAnswers((prev) => ({ ...prev, startedWhen: val })),
            )}
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Who or what is affected?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {IMPACT_OPTIONS.map((item) => {
                const isChecked = answers.impact.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    role="checkbox"
                    aria-checked={isChecked}
                    onClick={() => toggleImpact(item)}
                    className={`w-full min-h-[46px] px-4 py-2.5 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
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
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Have you tried the safe self-checks?
            </h3>
            {renderRadioGrid(
              CHECKS_DONE_OPTIONS,
              answers.checksCompleted,
              (val) =>
                setAnswers((prev) => ({ ...prev, checksCompleted: val })),
            )}
          </>
        );
      case 5:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Will site access or a contact be available if needed?
            </h3>
            {renderRadioGrid(SITE_ACCESS_OPTIONS, answers.siteAccess, (val) =>
              setAnswers((prev) => ({ ...prev, siteAccess: val })),
            )}
          </>
        );
      case 6:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Who should we update about this fault?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label
                  htmlFor="fault-contact-name"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Contact name
                </label>
                <input
                  id="fault-contact-name"
                  type="text"
                  value={answers.contactName}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      contactName: e.target.value,
                    }))
                  }
                  placeholder="e.g. Alex Taylor"
                  className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#CBD5E1] text-[#0B2241] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="fault-contact-details"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Preferred callback or email
                </label>
                <input
                  id="fault-contact-details"
                  type="text"
                  value={answers.contactDetails}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      contactDetails: e.target.value,
                    }))
                  }
                  placeholder="Phone or work email"
                  className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#CBD5E1] text-[#0B2241] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-3">
              Any lights, error messages or notes to include?
            </h3>
            <label htmlFor="fault-report-notes" className="sr-only">
              Fault report notes
            </label>
            <textarea
              id="fault-report-notes"
              rows={3}
              value={answers.notes}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Describe what you saw. Never include passwords, door codes or card numbers."
              className="w-full p-3.5 rounded-[10px] border border-[#CBD5E1] text-[#0B2241] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
            />
          </>
        );
    }
  };

  return (
    <section
      id="report-a-fault"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              03
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              REPORT A FAULT
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Tell us what&apos;s wrong, one step at a time.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[540px]">
            Never include passwords, door codes or card numbers. We&apos;ll ask
            for anything else we need.
          </p>
        </div>

        {/* Main Split Layout: Left 8-Step Fault Wizard + Right Advisor Card & Urgent Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Wizard Card */}
          <div className="lg:col-span-8 bg-white rounded-[20px] border border-[#E2E8F0] p-6 sm:p-8 lg:p-9 shadow-[0_8px_24px_rgba(11,34,65,0.05)] flex flex-col justify-between min-h-[300px]">
            <div>
              <p className="text-[#1963DD] text-[10.5px] font-bold tracking-[0.12em] uppercase mb-2.5">
                STEP {stepIndex + 1} OF {TOTAL_FAULT_STEPS}
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
                    {stepIndex === TOTAL_FAULT_STEPS - 1
                      ? "Review fault"
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

          {/* Right Column: Support Photo + Dark Urgent Support Card */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="w-full h-[180px] sm:h-[195px] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_8px_20px_rgba(11,34,65,0.08)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>

            <div className="bg-[#061A33] rounded-[16px] p-5 text-white shadow-[0_8px_22px_rgba(6,26,51,0.14)]">
              <h3 className="text-white text-[13.5px] font-extrabold leading-[1.35] mb-1.5">
                Urgent and can&apos;t use this form?
              </h3>
              <p className="text-[#CBD5E1] text-[11.5px] leading-[1.5]">
                Call business support: {supportPhonePlaceholder}.
              </p>
              <p className="text-[#94A3B8] text-[11.5px] leading-[1.5]">
                Hours: {supportHoursPlaceholder}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
