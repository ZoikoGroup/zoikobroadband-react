"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Info } from "lucide-react";

interface WizardOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface WizardStep {
  id: string;
  question: string;
  helper: string;
  highlightQuestion?: boolean;
  options: WizardOption[];
}

const wizardSteps: WizardStep[] = [
  {
    id: "number-scope",
    question: "What are you hoping to keep?",
    helper:
      "Pick the closest. Ranges and several numbers are handled differently.",
    highlightQuestion: true,
    options: [
      { value: "single", label: "A single number" },
      { value: "several", label: "Several numbers" },
      {
        value: "ddi-range",
        label: "A range or block (DDI)",
        sublabel: "Usually needs specialist review",
      },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    id: "service-type",
    question: "What kind of number is it currently?",
    helper: "Different number types follow different transfer rules.",
    options: [
      {
        value: "geographic",
        label: "A standard local area code number (e.g. 01 or 02)",
      },
      {
        value: "non-geographic",
        label: "A non-geographic or freephone number (e.g. 03, 0800)",
      },
      { value: "voip", label: "Already on a digital / VoIP service" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    id: "account-status",
    question: "Is the line still active with your current provider?",
    helper: "Active accounts are essential before starting a transfer.",
    options: [
      { value: "active", label: "Yes, it is active and in use" },
      {
        value: "notice-given",
        label: "Active, but cancellation notice has been given",
      },
      { value: "disconnected", label: "No, it has already been disconnected" },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    id: "linked-services",
    question: "Are other services linked to the same line?",
    helper: "For example broadband, alarm lines, or payment terminals.",
    options: [
      { value: "none", label: "No, it is only used for voice calls" },
      {
        value: "broadband",
        label: "Yes, broadband or another service runs on the same line",
      },
      { value: "not-sure", label: "Not sure" },
    ],
  },
  {
    id: "location-change",
    question: "Are you moving premises at the same time?",
    helper: "Moving exchange areas can affect geographic numbers.",
    options: [
      { value: "same-premises", label: "No, staying at the same address" },
      { value: "same-area", label: "Yes, moving within the same local area" },
      { value: "different-area", label: "Yes, moving to a different area" },
    ],
  },
  {
    id: "authority",
    question: "Are you authorised to manage the current account?",
    helper: "The losing provider requires authority from the account holder.",
    options: [
      {
        value: "yes",
        label: "Yes, I am the account holder or authorised contact",
      },
      {
        value: "can-arrange",
        label: "No, but the account holder can approve it",
      },
      { value: "not-sure", label: "Not sure" },
    ],
  },
];

export default function CheckTransferPathWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = wizardSteps.length;
  const currentStep = wizardSteps[stepIndex];
  const selectedValue = currentStep ? answers[currentStep.id] : undefined;
  const progressPercent = isSubmitted
    ? 100
    : Math.round(((stepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (value: string) => {
    if (!currentStep) return;
    setAnswers((prev) => ({
      ...prev,
      [currentStep.id]: value,
    }));
  };

  const handleContinue = () => {
    if (!selectedValue) return;
    if (stepIndex < totalSteps - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (isSubmitted) {
      setIsSubmitted(false);
      return;
    }
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setStepIndex(0);
    setIsSubmitted(false);
  };

  return (
    <section
      id="check-my-path"
      className="w-full bg-[#F5F8FC] px-4 py-14 text-[#0E223B] antialiased sm:px-6 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Centered Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#B78418]">
              Check my transfer path
            </span>
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
          </div>

          <h2 className="mx-auto mt-3 max-w-[700px] text-[34px] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0E223B] sm:text-[42px]">
            Answer a few questions about your number
          </h2>

          <p className="mx-auto mt-3 max-w-[590px] text-[13.5px] leading-[1.6] text-[#5B6B7F] sm:text-[14px]">
            A short, non-binding inquiry so we can plan the right transfer path.
            We don&apos;t ask for your phone number here, nothing is
            transferred, and you can go back and edit any answer.
          </p>
        </div>

        {/* Interactive Step Card */}
        <div className="mx-auto mt-10 w-full max-w-[760px] overflow-hidden rounded-2xl border border-[#DFE6EF] bg-white shadow-[0_8px_28px_rgba(14,34,59,0.04)]">
          {/* Card Top Bar: Step Indicator & Progress Track */}
          <div className="flex items-center justify-between gap-6 border-b border-[#EDF2F7] px-6 py-4 sm:px-8">
            <span className="text-[11.5px] font-bold text-[#1D3B5E]">
              {isSubmitted
                ? "Summary ready"
                : `Step ${stepIndex + 1} of ${totalSteps}`}
            </span>

            <div
              role="progressbar"
              aria-valuenow={stepIndex + 1}
              aria-valuemin={1}
              aria-valuemax={totalSteps}
              className="h-[3.5px] w-[220px] overflow-hidden rounded-full bg-[#EDF2F7] sm:w-[270px]"
            >
              <div
                className="h-full rounded-full bg-[#E6AD26] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card Body */}
          {!isSubmitted ? (
            <div className="px-6 py-6 sm:px-8 sm:py-7">
              {/* Question Title (Highlighted Pill on Step 1 as shown) */}
              {currentStep.highlightQuestion ? (
                <div className="rounded-lg border border-[#EBC45B] bg-[#FFFDF7] px-3 py-1.5">
                  <h3 className="text-[17px] font-extrabold leading-snug text-[#0E223B] sm:text-[18px]">
                    {currentStep.question}
                  </h3>
                </div>
              ) : (
                <h3 className="text-[17px] font-extrabold leading-snug text-[#0E223B] sm:text-[18px]">
                  {currentStep.question}
                </h3>
              )}

              <p className="mt-2 text-[12px] text-[#5B6B7F]">
                {currentStep.helper}
              </p>

              {/* Radio Option Rows */}
              <div
                role="radiogroup"
                aria-label={currentStep.question}
                className="mt-5 space-y-3"
              >
                {currentStep.options.map((option) => {
                  const isSelected = selectedValue === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectOption(option.value)}
                      className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-all sm:px-5 ${
                        isSelected
                          ? "border-[#143258] bg-[#F4F8FD] shadow-[0_2px_8px_rgba(20,50,88,0.06)]"
                          : "border-[#DCE4EE] bg-white hover:border-[#B6C5D6] hover:bg-[#FAFBFD]"
                      }`}
                    >
                      {/* Custom Radio Circle */}
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isSelected
                            ? "border-[#143258] bg-white"
                            : "border-[#CBD5E1] bg-white"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-[#143258]" />
                        )}
                      </span>

                      <div>
                        <span className="block text-[13px] font-bold text-[#0E223B]">
                          {option.label}
                        </span>
                        {option.sublabel && (
                          <span className="mt-0.5 block text-[11px] text-[#64748B]">
                            {option.sublabel}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Provisional Summary View after Step 6 */
            <div className="px-6 py-7 sm:px-8">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#1D3B5E]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-[17px] font-extrabold text-[#0E223B]">
                    Provisional transfer path summary
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-[1.6] text-[#5B6B7F]">
                    Based on your answers, our team can review your transfer
                    route. Remember: every result is subject to verification
                    with your current provider.
                  </p>
                </div>
              </div>

              <dl className="mt-5 divide-y divide-[#EDF2F7] rounded-xl border border-[#E3E9F0] bg-[#FAFBFD] px-4 py-2 text-[12px]">
                {wizardSteps.map((step) => {
                  const chosen = step.options.find(
                    (opt) => opt.value === answers[step.id],
                  );
                  return (
                    <div
                      key={step.id}
                      className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <dt className="font-medium text-[#5B6B7F]">
                        {step.question}
                      </dt>
                      <dd className="font-bold text-[#0E223B]">
                        {chosen?.label ?? "—"}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-4 flex items-center gap-2 text-[11.5px] text-[#5B6B7F]">
                <Info className="h-3.5 w-3.5 shrink-0 text-[#1D3B5E]" />
                <span>
                  No number has been transferred and no order has been placed.
                </span>
              </div>
            </div>
          )}

          {/* Card Footer Controls */}
          <div className="flex items-center justify-between border-t border-[#EDF2F7] bg-[#FAFBFD] px-6 py-4 sm:px-8">
            <div className="flex items-center gap-5">
              {stepIndex > 0 || isSubmitted ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1D3B5E] transition-colors hover:text-[#0E223B]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Back</span>
                </button>
              ) : null}

              <button
                type="button"
                onClick={handleStartOver}
                className="text-[12px] font-semibold text-[#1D3B5E] transition-colors hover:text-[#0E223B]"
              >
                Start over
              </button>
            </div>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedValue}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors ${
                  selectedValue
                    ? "bg-[#0D2B52] hover:bg-[#143B6E]"
                    : "cursor-not-allowed bg-[#0D2B52]/55"
                }`}
              >
                <span>
                  {stepIndex === totalSteps - 1 ? "See summary" : "Continue"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : (
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0D2B52] px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-[#143B6E]"
              >
                <span>Discuss with our team</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
