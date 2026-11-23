"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";

type WhoOption = "Home" | "Business" | "Not sure";

type HappeningOption =
  | "Switching provider"
  | "Moving address"
  | "Moving my number only"
  | "Moving to digital voice"
  | "Already cancelled"
  | "Arranging my own switch"
  | "Not sure";

type NumberScopeOption =
  | "Single geographic number"
  | "Multiple numbers or DDI range"
  | "Non-geographic (03 / 08)"
  | "Not sure";

type ConnectedDeviceOption =
  | "Alarm, telecare or lift line"
  | "Card terminal or door entry"
  | "Shared broadband on same line"
  | "None / not sure";

type TransferGoalOption =
  | "Keep my existing number"
  | "Check eligibility & timing first"
  | "Speak with a specialist";

export interface TransferPathReviewDraft {
  readonly who: WhoOption | null;
  readonly happening: HappeningOption | null;
  readonly numberScope: NumberScopeOption | null;
  readonly connectedDevices: readonly ConnectedDeviceOption[];
  readonly goal: TransferGoalOption | null;
  readonly currentProvider: string;
  readonly numberOrPostcode: string;
  readonly contactName: string;
  readonly contactEmailOrPhone: string;
  readonly notes: string;
}

const WHO_OPTIONS: readonly WhoOption[] = ["Home", "Business", "Not sure"];

const HAPPENING_OPTIONS: readonly HappeningOption[] = [
  "Switching provider",
  "Moving address",
  "Moving my number only",
  "Moving to digital voice",
  "Already cancelled",
  "Arranging my own switch",
  "Not sure",
];

const NUMBER_SCOPE_OPTIONS: readonly NumberScopeOption[] = [
  "Single geographic number",
  "Multiple numbers or DDI range",
  "Non-geographic (03 / 08)",
  "Not sure",
];

const CONNECTED_DEVICE_OPTIONS: readonly ConnectedDeviceOption[] = [
  "Alarm, telecare or lift line",
  "Card terminal or door entry",
  "Shared broadband on same line",
  "None / not sure",
];

const GOAL_OPTIONS: readonly TransferGoalOption[] = [
  "Keep my existing number",
  "Check eligibility & timing first",
  "Speak with a specialist",
];

const TOTAL_WIZARD_STEPS = 10;

export interface PortingCheckMyTransferPathProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly onSubmitReview?: (draft: TransferPathReviewDraft) => void;
}

export default function PortingCheckMyTransferPath({
  imageSrc = "/Images/onb/12.png",
  imageAlt = "Support advisor wearing a headset smiling at a computer workstation",
  onSubmitReview,
}: PortingCheckMyTransferPathProps) {
  const [step, setStep] = useState<number>(1);
  const [who, setWho] = useState<WhoOption | null>(null);
  const [happening, setHappening] = useState<HappeningOption | null>(null);
  const [numberScope, setNumberScope] = useState<NumberScopeOption | null>(
    null,
  );
  const [connectedDevices, setConnectedDevices] = useState<
    readonly ConnectedDeviceOption[]
  >([]);
  const [goal, setGoal] = useState<TransferGoalOption | null>(null);
  const [currentProvider, setCurrentProvider] = useState<string>("");
  const [numberOrPostcode, setNumberOrPostcode] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactEmailOrPhone, setContactEmailOrPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const toggleDevice = (item: ConnectedDeviceOption) => {
    setSubmitted(false);
    setConnectedDevices((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const handleBack = () => {
    setSubmitted(false);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleContinue = () => {
    setSubmitted(false);
    if (step < TOTAL_WIZARD_STEPS) {
      setStep((prev) => prev + 1);
      return;
    }

    setSubmitted(true);
    onSubmitReview?.({
      who,
      happening,
      numberScope,
      connectedDevices,
      goal,
      currentProvider: currentProvider.trim(),
      numberOrPostcode: numberOrPostcode.trim(),
      contactName: contactName.trim(),
      contactEmailOrPhone: contactEmailOrPhone.trim(),
      notes: notes.trim(),
    });
  };

  const summary = useMemo(() => {
    return {
      whoLabel: who ?? "—",
      situationLabel: happening ?? "—",
      numberLabel: numberScope ?? "—",
      connectedLabel:
        connectedDevices.length > 0 ? connectedDevices.join(", ") : "—",
      wantsLabel: goal ?? "—",
    };
  }, [who, happening, numberScope, connectedDevices, goal]);

  const stepMeta = useMemo(() => {
    switch (step) {
      case 1:
        return {
          title: "Your situation",
          subtitle: "Start with who this is for and what is happening.",
        };
      case 2:
        return {
          title: "Number type",
          subtitle: "Tell us what kind of number or range you want to move.",
        };
      case 3:
        return {
          title: "Line & connected devices",
          subtitle: "Flag anything sharing the line or relying on voice.",
        };
      case 4:
        return {
          title: "What you want next",
          subtitle: "Choose what you'd like us to review with you.",
        };
      case 5:
        return {
          title: "Current provider",
          subtitle: "Optional—helps us check switch rules accurately.",
        };
      case 6:
        return {
          title: "Number & postcode",
          subtitle: "Optional—used only to review transfer feasibility.",
        };
      case 7:
        return {
          title: "Your contact details",
          subtitle: "So our team can follow up on your transfer review.",
        };
      case 8:
        return {
          title: "Timing & notes",
          subtitle: "Share any preferred switch window or context.",
        };
      case 9:
        return {
          title: "Safety & authority check",
          subtitle: "Confirm no order or cancellation happens automatically.",
        };
      case 10:
      default:
        return {
          title: "Review & request check",
          subtitle:
            "This requests a review only—it doesn't move your number or book a date.",
        };
    }
  }, [step]);

  return (
    <section
      id="check-my-transfer-path"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              07
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              CHECK MY TRANSFER PATH
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[620px]">
            Request a review of your number transfer.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[620px]">
            A few short questions. This asks us to review your situation. It
            doesn&apos;t move your number, cancel anything or book a date.
          </p>
        </div>

        {/* Main 2-Column Split: Left 10-Step Wizard Card + Right Summary & Advisor Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Wizard Card */}
          <div className="lg:col-span-8 bg-white rounded-[20px] border border-[#E2E8F0] p-6 sm:p-8 shadow-[0_8px_24px_rgba(11,34,65,0.05)]">
            {/* 10-Segment Step Progress Bar */}
            <div aria-hidden="true" className="grid grid-cols-10 gap-1.5 mb-6">
              {Array.from({ length: TOTAL_WIZARD_STEPS }, (_, idx) => {
                const segNum = idx + 1;
                const isCompleteOrCurrent = segNum <= step;
                return (
                  <span
                    key={segNum}
                    className={`h-[3.5px] rounded-full transition-colors ${
                      isCompleteOrCurrent ? "bg-[#FFC119]" : "bg-[#E2E8F0]"
                    }`}
                  />
                );
              })}
            </div>

            {/* Step Counter & Heading */}
            <p className="text-[#1963DD] text-[10.5px] font-extrabold tracking-[0.12em] uppercase mb-1.5">
              STEP {step} OF {TOTAL_WIZARD_STEPS}
            </p>

            <h3 className="text-[#0B2241] text-[22px] sm:text-[24px] font-extrabold leading-[1.2] tracking-[-0.015em] mb-1.5">
              {stepMeta.title}
            </h3>

            <p className="text-[#64748B] text-[12px] leading-[1.5] mb-6">
              {stepMeta.subtitle}
            </p>

            {/* Step Content */}
            {step === 1 ? (
              <div className="space-y-6">
                {/* Question 1: Who is this for? */}
                <div>
                  <p className="text-[#0B2241] text-[12.5px] font-extrabold mb-2.5">
                    Who is this for?
                  </p>

                  <div
                    role="radiogroup"
                    aria-label="Who is this for?"
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    {WHO_OPTIONS.map((option) => {
                      const isSelected = who === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => {
                            setSubmitted(false);
                            setWho(option);
                          }}
                          className={`h-[44px] px-4 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241] shadow-2xs"
                              : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#061A33] bg-[#061A33]"
                                : "border-[#CBD5E1] bg-white"
                            }`}
                          >
                            {isSelected ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC119]" />
                            ) : null}
                          </span>
                          <span className="text-[12px] font-bold leading-none">
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 2: What's happening? */}
                <div>
                  <p className="text-[#0B2241] text-[12.5px] font-extrabold mb-2.5">
                    What&apos;s happening?
                  </p>

                  <div
                    role="radiogroup"
                    aria-label="What's happening?"
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                  >
                    {HAPPENING_OPTIONS.map((option) => {
                      const isSelected = happening === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => {
                            setSubmitted(false);
                            setHappening(option);
                          }}
                          className={`min-h-[44px] px-4 py-2 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241] shadow-2xs"
                              : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#061A33] bg-[#061A33]"
                                : "border-[#CBD5E1] bg-white"
                            }`}
                          >
                            {isSelected ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC119]" />
                            ) : null}
                          </span>
                          <span className="text-[12px] font-bold leading-snug">
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <p className="text-[#0B2241] text-[12.5px] font-extrabold mb-2.5">
                  Which best describes the number or lines?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {NUMBER_SCOPE_OPTIONS.map((option) => {
                    const isSelected = numberScope === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setNumberScope(option);
                        }}
                        className={`min-h-[46px] px-4 py-2.5 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241]"
                            : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-[#061A33] bg-[#061A33]"
                              : "border-[#CBD5E1] bg-white"
                          }`}
                        >
                          {isSelected ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC119]" />
                          ) : null}
                        </span>
                        <span className="text-[12px] font-bold">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <p className="text-[#0B2241] text-[12.5px] font-extrabold mb-2.5">
                  Select anything connected or sharing the line (optional)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONNECTED_DEVICE_OPTIONS.map((option) => {
                    const isSelected = connectedDevices.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => toggleDevice(option)}
                        className={`min-h-[46px] px-4 py-2.5 rounded-[10px] border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241]"
                            : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                        }`}
                      >
                        <span className="text-[12px] font-bold">{option}</span>
                        {isSelected ? (
                          <span className="w-4 h-4 rounded-full bg-[#FFC119] text-[#0B2241] inline-flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div>
                <p className="text-[#0B2241] text-[12.5px] font-extrabold mb-2.5">
                  What would you like to do next?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {GOAL_OPTIONS.map((option) => {
                    const isSelected = goal === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setGoal(option);
                        }}
                        className={`min-h-[46px] px-4 py-2.5 rounded-[10px] border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#FFFBEB] border-[#061A33] text-[#0B2241]"
                            : "bg-white hover:bg-[#F8FAFC] border-[#CBD5E1] text-[#0B2241]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-[#061A33] bg-[#061A33]"
                              : "border-[#CBD5E1] bg-white"
                          }`}
                        >
                          {isSelected ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC119]" />
                          ) : null}
                        </span>
                        <span className="text-[12px] font-bold leading-snug">
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div>
                <label
                  htmlFor="porting-current-provider"
                  className="block text-[#0B2241] text-[12.5px] font-extrabold mb-2"
                >
                  Who provides your service right now?
                </label>
                <input
                  id="porting-current-provider"
                  type="text"
                  value={currentProvider}
                  onChange={(e) => setCurrentProvider(e.target.value)}
                  placeholder="e.g. current provider name"
                  className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
              </div>
            ) : null}

            {step === 6 ? (
              <div>
                <label
                  htmlFor="porting-number-postcode"
                  className="block text-[#0B2241] text-[12.5px] font-extrabold mb-2"
                >
                  Number format or site postcode (optional)
                </label>
                <input
                  id="porting-number-postcode"
                  type="text"
                  value={numberOrPostcode}
                  onChange={(e) => setNumberOrPostcode(e.target.value)}
                  placeholder="e.g. 020 / 0161 area or postcode"
                  className="w-full h-[42px] px-3.5 rounded-[10px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20"
                />
              </div>
            ) : null}

            {step === 7 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="porting-contact-name"
                    className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                  >
                    Your name
                  </label>
                  <input
                    id="porting-contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[12.5px]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="porting-contact-channel"
                    className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                  >
                    Phone number or email
                  </label>
                  <input
                    id="porting-contact-channel"
                    type="text"
                    value={contactEmailOrPhone}
                    onChange={(e) => setContactEmailOrPhone(e.target.value)}
                    className="w-full h-[40px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[12.5px]"
                  />
                </div>
              </div>
            ) : null}

            {step === 8 ? (
              <div>
                <label
                  htmlFor="porting-notes"
                  className="block text-[#0B2241] text-[12px] font-bold mb-1.5"
                >
                  Any helpful notes about your transfer (optional)
                </label>
                <textarea
                  id="porting-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Preferred switch window, number range notes, or connected equipment..."
                  className="w-full p-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] placeholder:text-[#94A3B8] text-[12.5px]"
                />
              </div>
            ) : null}

            {step === 9 ? (
              <div className="rounded-[12px] bg-[#F4F7FA] border border-[#E2E8F0] p-4 text-[12px] text-[#334155] space-y-1.5">
                <p className="font-extrabold text-[#0B2241]">
                  Before you submit this review request:
                </p>
                <p>
                  Proof of authority is checked securely later—never through
                  this form. Submitting a review request does not stop your
                  current line or confirm a switch date.
                </p>
              </div>
            ) : null}

            {step === 10 ? (
              <div className="rounded-[12px] bg-[#FFFDF5] border border-[#F5D97E] p-4 text-[12px] text-[#0B2241]">
                <p className="font-extrabold mb-1">
                  Ready to send your transfer review request
                </p>
                <p className="text-[#475569]">
                  Review your selections on the right, then click Request review
                  below.
                </p>
              </div>
            ) : null}

            {submitted ? (
              <div
                role="status"
                className="mt-5 rounded-[10px] bg-[#ECFDF5] border border-[#34D399] px-4 py-3 text-[#065F46] text-[12px]"
              >
                <p className="font-extrabold">
                  Transfer review request recorded in session
                </p>
                <p>
                  No number has been moved or cancelled; a specialist can review
                  your path details.
                </p>
              </div>
            ) : null}

            {/* Bottom Wizard Navigation Controls */}
            <div className="mt-8 pt-2 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className={`inline-flex items-center justify-center gap-1.5 px-4 h-[38px] rounded-[8px] border text-[12px] font-bold transition-colors ${
                  step === 1
                    ? "border-[#E2E8F0] text-[#94A3B8] bg-white cursor-not-allowed"
                    : "border-[#CBD5E1] text-[#0B2241] bg-white hover:bg-[#F8FAFC] cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center justify-center gap-2 px-5 h-[40px] rounded-[8px] bg-[#FFC119] hover:bg-[#F5B60A] text-[#0B2241] text-[12px] font-extrabold transition-colors cursor-pointer shadow-[0_3px_10px_rgba(255,193,25,0.28)]"
              >
                <span>
                  {step === TOTAL_WIZARD_STEPS ? "Request review" : "Continue"}
                </span>
                <ArrowRight
                  className="w-3.5 h-3.5 stroke-[2.3]"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Right Sidebar: "YOUR PATH SO FAR" Dark Card + Advisor Photo */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-[#061A33] rounded-[18px] p-5 sm:p-6 text-white shadow-[0_10px_26px_rgba(6,26,51,0.16)]">
              <p className="text-[#FFC119] text-[9.5px] font-extrabold tracking-[0.14em] uppercase mb-4">
                YOUR PATH SO FAR
              </p>

              <dl className="divide-y divide-white/10 text-[11.5px]">
                <div className="py-2.5 first:pt-0">
                  <dt className="text-[#94A3B8] text-[10.5px] font-medium mb-0.5">
                    Who
                  </dt>
                  <dd className="text-white font-bold">{summary.whoLabel}</dd>
                </div>

                <div className="py-2.5">
                  <dt className="text-[#94A3B8] text-[10.5px] font-medium mb-0.5">
                    Situation
                  </dt>
                  <dd className="text-white font-bold">
                    {summary.situationLabel}
                  </dd>
                </div>

                <div className="py-2.5">
                  <dt className="text-[#94A3B8] text-[10.5px] font-medium mb-0.5">
                    Number
                  </dt>
                  <dd className="text-white font-bold">
                    {summary.numberLabel}
                  </dd>
                </div>

                <div className="py-2.5">
                  <dt className="text-[#94A3B8] text-[10.5px] font-medium mb-0.5">
                    Connected
                  </dt>
                  <dd className="text-white font-bold">
                    {summary.connectedLabel}
                  </dd>
                </div>

                <div className="py-2.5 last:pb-0">
                  <dt className="text-[#94A3B8] text-[10.5px] font-medium mb-0.5">
                    Wants
                  </dt>
                  <dd className="text-white font-bold">{summary.wantsLabel}</dd>
                </div>
              </dl>
            </div>

            <div className="w-full h-[185px] sm:h-[200px] rounded-[18px] overflow-hidden bg-[#1E293B] shadow-[0_8px_22px_rgba(11,34,65,0.08)]">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
