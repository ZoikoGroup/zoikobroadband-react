"use client";

import React, { useState } from "react";

interface CyberFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const CYBER_FAQ_ITEMS = [
  {
    id: "security-product-or-guidance",
    question: "Is this a security product or guidance?",
    answer:
      "Both can appear here, but only confirmed services are presented as available. General guidance is labelled as guidance.",
  },
  {
    id: "does-zoiko-hold-cyber-essentials",
    question: "Does Zoiko hold Cyber Essentials?",
    answer:
      "Any certification or accreditation status is stated explicitly only once verified and confirmed for the relevant entity or service.",
  },
  {
    id: "will-service-stop-all-threats",
    question: "Will a service stop all threats?",
    answer:
      "No security service can eliminate every risk. Effective protection combines confirmed controls with good everyday practices across accounts, devices, networks, and people.",
  },
  {
    id: "is-monitoring-available-24-7",
    question: "Is monitoring available 24/7?",
    answer:
      "Monitoring hours, alert routing, and response commitments apply only when explicitly confirmed in writing for your chosen service and contract.",
  },
  {
    id: "what-if-i-think-i-have-been-attacked",
    question: "What if I think I have been attacked?",
    answer:
      "Use the business support channels rather than a sales form, and never send passwords, logs, or sensitive files through a web form.",
  },
] as const satisfies readonly CyberFaqItem[];

export default function CyberCommonQuestions() {
  const [openId, setOpenId] = useState<string | null>(
    "security-product-or-guidance",
  );

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <div className="mb-7">
            <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-2.5">
              FAQ
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em]">
              Common questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {CYBER_FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[12px] border border-[#E2E8F0] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4 text-left flex items-center gap-3 cursor-pointer"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#0B2241] shrink-0"
                    />
                    <span className="text-[#0B2241] text-[14.5px] font-bold leading-[1.35]">
                      {item.question}
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="px-5 sm:px-6 pb-5 pl-9 sm:pl-10">
                      <p className="text-[#64748B] text-[13.5px] leading-[1.6]">
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
