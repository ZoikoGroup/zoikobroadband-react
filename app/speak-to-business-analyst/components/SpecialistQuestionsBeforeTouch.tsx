"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";

interface SpecialistFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const SPECIALIST_FAQ_ITEMS: readonly SpecialistFaqItem[] = [
  {
    id: "can-i-speak-to-someone-before-choosing",
    question: "Can I speak to someone before I choose a broadband plan?",
    answer:
      "Yes. You can request a callback or send an enquiry to talk through what your business needs before deciding on any plan.",
  },
  {
    id: "can-you-check-broadband-at-postcode",
    question: "Can you check broadband at my business postcode?",
    answer:
      "Yes. Share your business postcode in your enquiry and a specialist will check what is available at your premises before making any offer.",
  },
  {
    id: "can-i-ask-about-static-ip",
    question: "Can I ask about a static IP address?",
    answer:
      "Yes. We can talk through static IP and networking options for your setup and confirm any applicable charges with you.",
  },
  {
    id: "can-zoiko-help-digital-phone-or-premises",
    question: "Can Zoiko help with digital phone services or several premises?",
    answer:
      "Yes. A specialist can assess digital phone line compatibility, number transfers, and multi-site continuity requirements.",
  },
  {
    id: "does-sending-form-commit-to-contract",
    question: "Does sending this form commit my business to a contract?",
    answer:
      "No. Sending an enquiry is free, carries no obligation, and never places an order—nothing is ordered until you choose to go ahead with a confirmed offer.",
  },
  {
    id: "already-have-account-need-technical-help",
    question:
      "I already have a Zoiko Broadband account and need technical help.",
    answer:
      "Faults, outages, complaints and billing for existing customers are handled by our Help & Support team rather than the new business enquiry route.",
  },
];

export interface SpecialistQuestionsBeforeTouchProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly supportHref?: string;
  readonly onGetSupport?: () => void;
}

export default function SpecialistQuestionsBeforeTouch({
  imageSrc = "/Images/speak/1.jpg",
  imageAlt = "Support specialist wearing a headset smiling at a computer workstation",
  supportHref = "#service-status",
  onGetSupport,
}: SpecialistQuestionsBeforeTouchProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="before-you-get-in-touch"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Step Badge, Heading & Existing Customer Card */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                05
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                QUESTIONS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-6 max-w-[420px]">
              Before you get in touch.
            </h2>

            {/* Existing Customer Dark Split Card */}
            <div className="rounded-[18px] bg-[#061A33] overflow-hidden shadow-[0_10px_26px_rgba(6,26,51,0.16)] grid grid-cols-1 sm:grid-cols-12">
              <div className="sm:col-span-4 relative min-h-[155px] sm:min-h-[165px] bg-[#1E293B] overflow-hidden">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
                />
              </div>

              <div className="sm:col-span-8 p-5 sm:p-6 flex flex-col justify-center">
                <h3 className="text-white text-[14px] font-extrabold leading-[1.3] mb-1.5">
                  Existing customer?
                </h3>

                <p className="text-[#CBD5E1] text-[11.5px] leading-[1.5] mb-3.5">
                  Faults, outages, complaints and billing are handled by Help
                  &amp; Support.
                </p>

                <div>
                  <a
                    href={supportHref}
                    onClick={() => onGetSupport?.()}
                    className="inline-flex items-center gap-1 text-[#FFC119] hover:text-[#FFD35A] text-[12px] font-bold leading-none underline underline-offset-4 transition-colors"
                  >
                    <span>Get support</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 stroke-[2.3]"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Expandable FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {SPECIALIST_FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-[12px] transition-colors ${
                    isOpen
                      ? "bg-[#F8FAFC] border border-[#CBD5E1] shadow-[0_4px_14px_rgba(11,34,65,0.04)]"
                      : "bg-[#F4F7FA] border border-[#E2E8F0] hover:border-[#CBD5E1]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-[#0B2241] text-[13.5px] font-bold leading-[1.35]">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="w-6 h-6 rounded-[6px] bg-[#FFC119] text-[#0B2241] flex items-center justify-center shrink-0 shadow-2xs"
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="px-5 pb-4 pt-0.5 pr-12">
                      <p className="text-[#475569] text-[12.5px] leading-[1.55]">
                        {item.answer}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
