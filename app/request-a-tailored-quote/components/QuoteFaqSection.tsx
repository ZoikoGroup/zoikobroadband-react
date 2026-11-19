"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const QUOTE_FAQ_DATA = {
  badge: "QUESTIONS",
  heading: "Quote questions, answered.",
  image: {
    src: "/Images/req/9.png",
    alt: "Smiling business specialist standing by a glass office wall with sticky notes",
  },
  items: [
    {
      id: "request-same-as-quote",
      question: "Is a quote request the same as a quote?",
      answer:
        "No. Your request tells us what you need. If we can help, we'll send a written quote with every cost and an expiry date.",
    },
    {
      id: "does-request-commit",
      question: "Does sending a request commit my business?",
      answer:
        "No. Submitting a request isn't placing an order, isn't a price guarantee and doesn't bind your business to a contract.",
    },
    {
      id: "how-long-until-response",
      question: "How long until you get back to me?",
      answer:
        "A specialist reviews your request and checks site availability before responding, and we'll let you know clearly if anything still needs to be confirmed.",
    },
    {
      id: "need-postcodes",
      question: "Do I need my postcodes?",
      answer:
        "Postcodes help us check what connectivity is possible at each address, though you can skip anything you don't have to hand yet.",
    },
    {
      id: "request-several-sites",
      question: "Can I request a quote for several sites?",
      answer:
        "Yes. We review each location individually so availability, technology and any installation needs are clear per site.",
    },
    {
      id: "prices-include-vat",
      question: "Will prices include VAT?",
      answer:
        "Your written quote sets out one-off and monthly charges clearly, showing figures with or without VAT so nothing is ambiguous.",
    },
    {
      id: "sign-up-for-marketing",
      question: "Do I have to sign up for marketing?",
      answer:
        "No. We use the information you provide to respond to your enquiry, as set out in our Privacy Notice.",
    },
    {
      id: "cant-use-this-form",
      question: "What if I can't use this form?",
      answer:
        "Accessible contact options and business sales support are available if you prefer to talk or need an alternative way to get in touch.",
    },
  ],
} as const;

export default function QuoteFaqSection() {
  const [openId, setOpenId] = useState<string>(QUOTE_FAQ_DATA.items[0].id);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="quote-faq"
      aria-labelledby="quote-faq-heading"
      className="w-full bg-[#FFFFFF] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Badge, Heading, Rounded Specialist Photo */}
          <div className="flex flex-col lg:col-span-5">
            <div className="inline-flex w-fit items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
              <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
                {QUOTE_FAQ_DATA.badge}
              </span>
            </div>

            <h2
              id="quote-faq-heading"
              className="mt-3 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[40px] lg:text-[42px]"
            >
              {QUOTE_FAQ_DATA.heading}
            </h2>

            <div className="mt-6 overflow-hidden rounded-[14px] border border-[#F1E2A8] bg-[#E8EEF4] shadow-[0_6px_18px_rgba(8,28,46,0.06)]">
              <img
                src={QUOTE_FAQ_DATA.image.src}
                alt={QUOTE_FAQ_DATA.image.alt}
                className="h-[245px] w-full object-cover object-[58%_22%] sm:h-[280px] lg:h-[304px]"
              />
            </div>
          </div>

          {/* Right Column: Accordion Stack */}
          <div className="flex flex-col gap-2.5 lg:col-span-7">
            {QUOTE_FAQ_DATA.items.map((item) => {
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
