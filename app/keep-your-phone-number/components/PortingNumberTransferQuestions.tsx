"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface PortingFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const PORTING_FAQ_ITEMS: readonly PortingFaqItem[] = [
  {
    id: "can-i-keep-my-number-if-i-switch-to-zoiko",
    question: "Can I keep my number if I switch to Zoiko?",
    answer:
      "Often yes, provided the number is eligible and we can verify your account and line details first. We never promise a transfer until we've reviewed your situation.",
  },
  {
    id: "should-i-cancel-my-old-service-first",
    question: "Should I cancel my old service first?",
    answer:
      "No—you usually should not cancel your existing service before a transfer is arranged, as cancelling can put your number at risk or disrupt your line.",
  },
  {
    id: "how-long-does-it-take",
    question: "How long does it take?",
    answer:
      "Timings depend on your number type, line setup and providers involved. We'll only show a switch-over date once it's confirmed with you.",
  },
  {
    id: "does-it-cost-anything",
    question: "Does it cost anything?",
    answer:
      "There is no charge from us just to move your number [subject to Compliance approval of the applicable rules]. Any service, equipment, third-party charges or VAT are shown clearly in your quote.",
  },
  {
    id: "can-i-move-several-business-numbers",
    question: "Can I move several business numbers?",
    answer:
      "Yes, multiple numbers, number ranges (DDI) and multi-site setups can be reviewed, though each requires an individual check before confirming how and when they move.",
  },
  {
    id: "what-if-im-moving-address",
    question: "What if I'm moving address?",
    answer:
      "Whether a number can move with you to a new address depends on its type, exchange/area rules and current provider. Check with our team before changing anything.",
  },
  {
    id: "ive-already-cancelled-is-my-number-gone",
    question: "I've already cancelled. Is my number gone?",
    answer:
      "Not necessarily, depending on how recently it was cancelled and your current provider's rules. Contact us promptly so we can check what's possible, though recovery cannot be promised.",
  },
  {
    id: "will-my-alarm-or-card-machine-still-work",
    question: "Will my alarm or card machine still work?",
    answer:
      "Connected equipment such as burglar/fire alarms, telecare, lift lines, card payment terminals, door entry systems or fax machines may be affected by line or digital voice changes. Tell us before switching so we can review compatibility.",
  },
];

export interface PortingNumberTransferQuestionsProps {
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly defaultOpenId?: string | null;
}

export default function PortingNumberTransferQuestions({
  imageSrc = "/Images/onb/19.png",
  imageAlt = "Person smiling while looking at a mobile phone outdoors on a city street",
  defaultOpenId = null,
}: PortingNumberTransferQuestionsProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="number-transfer-questions"
      className="w-full bg-[#FFF8E1] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Step Badge, Heading & Feature Photo */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                09
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                QUESTIONS
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-7 max-w-[420px]">
              Number transfer questions, answered.
            </h2>

            <div className="w-full h-[215px] sm:h-[245px] rounded-[20px] overflow-hidden shadow-[0_10px_24px_rgba(11,34,65,0.1)]">
              <img
                src="/Images/keep/1.png"
                alt={imageAlt}
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>
          </div>

          {/* Right Column: Expandable FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {PORTING_FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-[12px] bg-white transition-colors ${
                    isOpen
                      ? "border border-[#061A33] shadow-[0_6px_18px_rgba(11,34,65,0.06)]"
                      : "border border-[#F3E5B5] hover:border-[#E6CE83] shadow-[0_3px_10px_rgba(11,34,65,0.03)]"
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
                    <div className="px-5 pb-4 pt-0.5 pr-12 border-t border-[#F1F5F9]">
                      <p className="text-[#475569] text-[12.5px] leading-[1.55] pt-3">
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
