"use client";

import React, { useState } from "react";

interface SogeaFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const SOGEA_FAQ_ITEMS = [
  {
    id: "what-does-sogea-mean",
    question: "What does SOGEA mean?",
    answer:
      "Single Order Generic Ethernet Access. It is broadband delivered over fibre to the cabinet and copper to the premises, without a separate traditional phone line.",
  },
  {
    id: "part-fibre-same-as-fttp",
    question: "Is Part Fibre the same as FTTP?",
    answer:
      "No. Part Fibre (SOGEA) uses fibre to the street cabinet and copper to your premises, whereas FTTP delivers full fibre directly to the building.",
  },
  {
    id: "can-i-keep-phone-number",
    question: "Can I keep my phone number?",
    answer:
      "Because Part Fibre is broadband only, keeping a number typically involves arranging number porting or a separate voice service such as Business VoIP.",
  },
  {
    id: "what-speed-will-i-get",
    question: "What speed will I get?",
    answer:
      "Speeds depend on the copper line distance from the cabinet, line quality, equipment, and the plan available at your address. Any figure shown before order confirmation is an estimate.",
  },
  {
    id: "alarm-or-card-terminal-work",
    question: "Will my alarm or card terminal still work?",
    answer:
      "Devices that rely on a traditional phone line—such as alarms, fax machines, card terminals, lifts, or telecare equipment—should be checked before switching so they continue working as needed.",
  },
] as const satisfies readonly SogeaFaqItem[];

export default function SogeaCommonQuestions() {
  const [openId, setOpenId] = useState<string | null>("what-does-sogea-mean");

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
            {SOGEA_FAQ_ITEMS.map((item) => {
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
