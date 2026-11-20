"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

type PrepSituationOption =
  | "New connection"
  | "Switching provider"
  | "Moving premises"
  | "Adding a site"
  | "Upgrading"
  | "Not sure";

type PrepServiceOption =
  | "Full Fibre (FTTP)"
  | "Part Fibre (SOGEA)"
  | "Not sure";

type PrepYesNoOption = "Yes" | "No" | "Not sure";

interface PrepAnswers {
  readonly situation: PrepSituationOption | null;
  readonly serviceType: PrepServiceOption | null;
  readonly hasExistingBox: PrepYesNoOption | null;
  readonly needsLandlordPermission: PrepYesNoOption | null;
  readonly hasPowerAndSpace: PrepYesNoOption | null;
  readonly hasAuthorisedContact: PrepYesNoOption | null;
  readonly hasSharedBuildingAreas: PrepYesNoOption | null;
  readonly reliesOnCriticalLines: PrepYesNoOption | null;
  readonly notes: string;
}

const TOTAL_STEPS = 9;

const SITUATION_CHOICES: readonly PrepSituationOption[] = [
  "New connection",
  "Switching provider",
  "Moving premises",
  "Adding a site",
  "Upgrading",
  "Not sure",
];

const SERVICE_CHOICES: readonly PrepServiceOption[] = [
  "Full Fibre (FTTP)",
  "Part Fibre (SOGEA)",
  "Not sure",
];

const YES_NO_CHOICES: readonly PrepYesNoOption[] = ["Yes", "No", "Not sure"];

export interface OnboardingSitePrepQuestionnaireProps {
  readonly onComplete?: (answers: PrepAnswers) => void;
}

export default function OnboardingSitePrepQuestionnaire({
  onComplete,
}: OnboardingSitePrepQuestionnaireProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<PrepAnswers>({
    situation: null,
    serviceType: null,
    hasExistingBox: null,
    needsLandlordPermission: null,
    hasPowerAndSpace: null,
    hasAuthorisedContact: null,
    hasSharedBuildingAreas: null,
    reliesOnCriticalLines: null,
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
    if (stepIndex < TOTAL_STEPS - 1) {
      setStepIndex((prev) => prev + 1);
      return;
    }
    setSubmitted(true);
    onComplete?.(answers);
  };

  const handleReset = () => {
    setAnswers({
      situation: null,
      serviceType: null,
      hasExistingBox: null,
      needsLandlordPermission: null,
      hasPowerAndSpace: null,
      hasAuthorisedContact: null,
      hasSharedBuildingAreas: null,
      reliesOnCriticalLines: null,
      notes: "",
    });
    setStepIndex(0);
    setSubmitted(false);
  };

  const renderChoiceRadioGroup = <T extends string>(
    options: readonly T[],
    selectedValue: T | null,
    onSelect: (value: T) => void,
    gridColsClass = "grid-cols-1 sm:grid-cols-3",
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

  const renderStepBody = () => {
    if (submitted) {
      return (
        <div>
          <p className="text-[#1963DD] text-[10.5px] font-bold tracking-[0.12em] uppercase mb-2">
            PREPARATION NOTES SAVED IN SESSION
          </p>
          <h3 className="text-[#0B2241] text-[22px] font-extrabold leading-[1.25] mb-2">
            Site preparation summary ready
          </h3>
          <p className="text-[#475569] text-[13px] leading-[1.55] mb-5">
            This isn&apos;t an order or a confirmed appointment. Your order and
            field checks confirm what applies to your site.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px] bg-[#F8FAFC] rounded-[12px] p-4 border border-[#E2E8F0]">
            <div>
              <dt className="font-bold text-[#64748B]">Situation</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.situation ?? "Not selected"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">Service type</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.serviceType ?? "Not selected"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">Landlord permission</dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.needsLandlordPermission ?? "Not selected"}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[#64748B]">
                Current lines / alarms / phones
              </dt>
              <dd className="font-bold text-[#0B2241]">
                {answers.reliesOnCriticalLines ?? "Not selected"}
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
              What&apos;s your situation?
            </h3>
            {renderChoiceRadioGroup(
              SITUATION_CHOICES,
              answers.situation,
              (val) => setAnswers((prev) => ({ ...prev, situation: val })),
            )}
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Which service type are you planning for?
            </h3>
            {renderChoiceRadioGroup(
              SERVICE_CHOICES,
              answers.serviceType,
              (val) => setAnswers((prev) => ({ ...prev, serviceType: val })),
            )}
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Do you already have a fibre box (ONT) or active line socket?
            </h3>
            {renderChoiceRadioGroup(
              YES_NO_CHOICES,
              answers.hasExistingBox,
              (val) => setAnswers((prev) => ({ ...prev, hasExistingBox: val })),
            )}
          </>
        );
      case 3:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Could installation need landlord or building owner permission?
            </h3>
            {renderChoiceRadioGroup(
              YES_NO_CHOICES,
              answers.needsLandlordPermission,
              (val) =>
                setAnswers((prev) => ({
                  ...prev,
                  needsLandlordPermission: val,
                })),
            )}
          </>
        );
      case 4:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Do you have a dry, ventilated spot near a power socket?
            </h3>
            {renderChoiceRadioGroup(
              YES_NO_CHOICES,
              answers.hasPowerAndSpace,
              (val) =>
                setAnswers((prev) => ({ ...prev, hasPowerAndSpace: val })),
            )}
          </>
        );
      case 5:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Will an authorised contact be available on site during visits?
            </h3>
            {renderChoiceRadioGroup(
              YES_NO_CHOICES,
              answers.hasAuthorisedContact,
              (val) =>
                setAnswers((prev) => ({ ...prev, hasAuthorisedContact: val })),
            )}
          </>
        );
      case 6:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Does access involve shared risers, comms rooms or building rules?
            </h3>
            {renderChoiceRadioGroup(
              YES_NO_CHOICES,
              answers.hasSharedBuildingAreas,
              (val) =>
                setAnswers((prev) => ({
                  ...prev,
                  hasSharedBuildingAreas: val,
                })),
            )}
          </>
        );
      case 7:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-4">
              Do alarms, card machines, lift lines or phones rely on current
              lines?
            </h3>
            {renderChoiceRadioGroup(
              YES_NO_CHOICES,
              answers.reliesOnCriticalLines,
              (val) =>
                setAnswers((prev) => ({
                  ...prev,
                  reliesOnCriticalLines: val,
                })),
            )}
          </>
        );
      default:
        return (
          <>
            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.25] tracking-[-0.015em] mb-3">
              Any opening hours or access notes to keep in mind?
            </h3>
            <label htmlFor="site-prep-notes" className="sr-only">
              Opening hours or access notes
            </label>
            <textarea
              id="site-prep-notes"
              rows={3}
              value={answers.notes}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Optional: opening hours, reception entry or parking notes (no passwords or sensitive details)."
              className="w-full p-3.5 rounded-[10px] border border-[#CBD5E1] text-[#0B2241] text-[13px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
            />
          </>
        );
    }
  };

  return (
    <section
      id="get-ready-together"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              10
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              GET READY TOGETHER
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[700px]">
            Tell us about your site, and we&apos;ll help you prepare.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[560px]">
            A few short questions. This isn&apos;t an order or a booking; it
            helps our team plan with you.
          </p>
        </div>

        {/* Main Split Layout: Left Questionnaire Card + Right Advisor Image & Support Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Wizard Card */}
          <div className="lg:col-span-8 bg-white rounded-[20px] border border-[#E2E8F0] p-6 sm:p-8 lg:p-9 shadow-[0_8px_24px_rgba(11,34,65,0.04)] flex flex-col justify-between min-h-[290px]">
            <div>
              <p className="text-[#1963DD] text-[10.5px] font-bold tracking-[0.12em] uppercase mb-2.5">
                STEP {stepIndex + 1} OF {TOTAL_STEPS}
              </p>

              {renderStepBody()}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="flex items-center justify-between gap-4 pt-8 mt-4">
              {submitted ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-[38px] rounded-[8px] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#94A3B8] hover:text-[#0B2241] text-[12px] font-bold transition-colors cursor-pointer"
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
                    {stepIndex === TOTAL_STEPS - 1 ? "Save notes" : "Continue"}
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 stroke-[2.3]"
                    aria-hidden="true"
                  />
                </button>
              ) : null}
            </div>
          </div>

          {/* Right Column: Advisor Photo + Dark Navy Support Box */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="w-full h-[180px] sm:h-[195px] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_6px_18px_rgba(11,34,65,0.06)]">
              <img
                src="/Images/onb/12.png"
                alt="Support advisor wearing a headset smiling at a desk"
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>

            <div className="bg-[#061A33] rounded-[18px] p-5 sm:p-6 text-white shadow-[0_8px_22px_rgba(6,26,51,0.12)] flex-1 flex flex-col justify-center">
              <h3 className="text-white text-[14.5px] font-bold leading-[1.3] mb-1.5">
                Prefer to talk?
              </h3>
              <p className="text-[#CBD5E1] text-[12px] leading-[1.55]">
                Business support: [Approved business support number]. Accessible
                formats and text relay available on request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
