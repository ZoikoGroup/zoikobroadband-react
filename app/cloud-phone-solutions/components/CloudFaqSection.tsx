"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_DATA = {
  badge: "QUESTIONS",
  headingLine1: "Cloud phone questions,",
  headingLine2: "answered.",
  image: {
    src: "/Images/cloud/9.png",
    alt: "Support specialist wearing a headset smiling at a computer monitor",
  },
  items: [
    {
      id: "difference-cloud-vs-digital-line",
      question:
        "What's the difference between a cloud phone system and a digital line?",
      answer:
        "A digital line replaces a single phone line. A cloud phone system runs your whole business phone setup online, with users, numbers and call handling.",
    },
    {
      id: "keep-business-numbers",
      question: "Can I keep my business numbers?",
      answer:
        "We review number transfer options with you during consultation. Keeping existing numbers depends on eligibility and approval, so we never promise transfer dates until confirmed.",
    },
    {
      id: "work-in-power-cut",
      question: "Will it work in a power cut?",
      answer:
        "Cloud phone calls depend on both power and your internet connection. Without power or confirmed backup options, calls may not work during an outage.",
    },
    {
      id: "call-999-or-112",
      question: "Can I still call 999 or 112?",
      answer:
        "Emergency calls over the internet require a working connection and power, and remote or multi-site setups need accurate location details kept up to date. Always discuss backup options if safety depends on your line.",
    },
    {
      id: "need-zoiko-broadband",
      question: "Do I need Zoiko Broadband?",
      answer:
        "We assess your existing business broadband, Wi-Fi and network setup during consultation to confirm call quality and compatibility before recommending a solution.",
    },
    {
      id: "alarms-and-card-machines",
      question: "What about alarms and card machines?",
      answer:
        "Connected equipment such as alarms, lift lines, payment terminals, fax machines or telecare may require special checks or dedicated arrangements, which we review with you before switching.",
    },
    {
      id: "how-much-does-it-cost",
      question: "How much does it cost?",
      answer:
        "Package prices aren't published yet. Following your consultation, your written quote itemises licences or seats, call allowances, hardware, set-up or migration and any applicable terms.",
    },
    {
      id: "is-there-a-contract",
      question: "Is there a contract?",
      answer:
        "Minimum terms, renewal details, cancellation terms and support levels are set out clearly in your written quote before you sign any agreement.",
    },
  ],
} as const;

export default function CloudFaqSection() {
  const [openId, setOpenId] = useState<string>(FAQ_DATA.items[0].id);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="cloud-faq-heading"
      className="w-full bg-[#FFF8DC] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Badge, Heading, Rounded Specialist Photo */}
          <div className="flex flex-col lg:col-span-5">
            <div className="inline-flex w-fit items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {FAQ_DATA.badge}
              </span>
            </div>

            <h2
              id="cloud-faq-heading"
              className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[42px]"
            >
              <span className="block">{FAQ_DATA.headingLine1}</span>
              <span className="block">{FAQ_DATA.headingLine2}</span>
            </h2>

            <div className="mt-6 overflow-hidden rounded-[14px] border border-[#F1E2A8] bg-[#E8EEF4] shadow-[0_6px_18px_rgba(8,28,46,0.06)]">
              <img
                src={FAQ_DATA.image.src}
                alt={FAQ_DATA.image.alt}
                className="h-[240px] w-full object-cover object-[58%_22%] sm:h-[275px] lg:h-[296px]"
              />
            </div>
          </div>

          {/* Right Column: Accordion Stack */}
          <div className="flex flex-col gap-2.5 lg:col-span-7">
            {FAQ_DATA.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={
                    isOpen
                      ? "rounded-[10px] border border-[#F2CE47] bg-white px-4 py-3.5 shadow-[0_3px_10px_rgba(8,28,46,0.04)]"
                      : "rounded-[10px] border border-[#F3E5B0] bg-white px-4 py-3 shadow-[0_1px_3px_rgba(8,28,46,0.02)]"
                  }
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => handleToggle(item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  >
                    <span className="text-[12.5px] leading-[1.35] font-bold text-[#081C2E] sm:text-[13px]">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={
                        isOpen
                          ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#FFD100] text-[#081C2E]"
                          : "flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#FFF8DC] text-[#1E3A54]"
                      }
                    >
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 stroke-[2.4]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-2.5 pr-8 text-[11.5px] leading-[1.52] font-normal text-[#5A6A7E]">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
