"use client";

import React, { useState } from "react";

interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

const FAQ_ITEMS = [
  {
    id: "what-is-fttp",
    question: "What is FTTP?",
    answer:
      "FTTP means a fibre optic connection reaches your premises. Equipment commonly includes an ONT connected to a router.",
  },
  {
    id: "availability-at-business",
    question: "How do I know if it is available at my business?",
    answer:
      "Enter your business postcode and select your exact premises in our availability checker to see whether full fibre can be ordered at your site.",
  },
  {
    id: "fttp-vs-leased-line",
    question: "Is FTTP the same as a leased line?",
    answer:
      "No. FTTP is shared full fibre broadband to your premises, whereas a leased line is a dedicated, uncontended connection with its own product details and SLAs.",
  },
  {
    id: "upload-download-speeds",
    question: "Are upload and download speeds the same?",
    answer:
      "No, upload and download speeds differ on standard FTTP business plans. Both speeds are shown clearly for each available offer once your address is checked.",
  },
  {
    id: "static-ip-included",
    question: "Does every plan include a static IP?",
    answer:
      "Static IP inclusions depend on the specific plan selected and can also be reviewed separately under our Static IP Options.",
  },
] as const satisfies readonly FaqItem[];

export default function CommonQuestions() {
  const [openId, setOpenId] = useState<string | null>("what-is-fttp");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Centered FAQ Container */}
        <div className="max-w-[760px] mx-auto mb-16 md:mb-20">
          <div className="mb-7">
            <p className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase mb-2.5">
              FAQ
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em]">
              Common questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item) => {
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

        {/* Bottom Amber CTA Banner */}
        <div className="max-w-[1080px] mx-auto rounded-[18px] bg-gradient-to-r from-[#FFC119] to-[#FFD24C] px-7 sm:px-10 py-8 sm:py-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h3 className="text-[#0B2241] text-[24px] sm:text-[28px] font-extrabold leading-[1.2] tracking-[-0.015em] mb-1.5">
              Ready to check your address?
            </h3>
            <p className="text-[#0B2241]/85 text-[14px] leading-[1.5]">
              See whether full fibre is available at your business premises.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <a
              href="/check-availability"
              aria-label="Check Availability"
              className="inline-flex items-center justify-center min-w-[172px] h-[44px] px-6 rounded-[8px] bg-[#0B2241] hover:bg-[#143563] text-[#0B2241]/0 select-none text-[13.5px] font-bold transition-colors"
            >
              Check Availability
            </a>

            <a
              href="/contact-us"
              className="inline-flex items-center justify-center px-6 h-[44px] rounded-[8px] bg-white hover:bg-[#F8FAFC] border border-[#0B2241] text-[#0B2241] text-[13.5px] font-bold transition-colors"
            >
              Speak to a Business Specialist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
