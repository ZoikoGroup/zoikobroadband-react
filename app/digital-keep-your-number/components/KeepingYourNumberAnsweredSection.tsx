"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, X } from "lucide-react";

interface TransferFaqItem {
  question: string;
  answer: string;
}

const transferFaqItems: TransferFaqItem[] = [
  {
    question: "Can I keep my number when I switch to Zoiko?",
    answer:
      "Often, yes — but it's always subject to verification. It depends on your number, your current provider and your account. Check your transfer path and our team will confirm what's possible.",
  },
  {
    question: "Should I cancel my old provider first?",
    answer:
      "No. Cancelling before a transfer is confirmed can lose your number permanently. Keep your existing service active until our team confirms the transfer plan and date.",
  },
  {
    question: "How long does a transfer take?",
    answer:
      "There is no fixed timescale — a transfer date is only set once your details are validated and confirmed with your current provider.",
  },
  {
    question: "Can I move several numbers or a DDI range?",
    answer:
      "Yes, though multiple numbers and DDI ranges are handled differently from single lines and usually require a specialist review before confirming a transfer date.",
  },
  {
    question: "Is there a charge to keep my number?",
    answer:
      "We do not add a separate fee just to transfer a number in. Any service charges or early termination fees from your existing provider are confirmed separately.",
  },
  {
    question: "What if I'm moving address?",
    answer:
      "Moving within the same local area usually allows you to keep a geographic number, whereas moving to a different exchange area can affect eligibility.",
  },
  {
    question: "Will my 999 calls still work?",
    answer:
      "Yes, provided your registered emergency address is kept up to date and your digital line has power and working broadband. Keep a charged mobile as a backup during outages.",
  },
];

export default function KeepingYourNumberAnsweredSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-[#F5F8FC] px-4 py-14 text-[#0E223B] antialiased sm:px-6 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        {/* Centered Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.15em] text-[#B78418]">
              Help &amp; answers
            </span>
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#D4A024]" />
          </div>

          <h2 className="mt-3 text-[34px] font-extrabold leading-[1.14] tracking-[-0.025em] text-[#0E223B] sm:text-[42px]">
            Keeping your number, answered
          </h2>
        </div>

        {/* Two-Column Asymmetric Layout */}
        <div className="mt-10 grid grid-cols-1 items-start gap-7 lg:grid-cols-[360px_1fr] xl:grid-cols-[380px_1fr] lg:gap-9">
          {/* Left Sticky/Stacked Column: Navy CTA Card + Photo */}
          <div className="flex flex-col gap-6">
            {/* Deep Navy Prompt Card */}
            <div className="rounded-2xl bg-[#0D4373] p-6 text-white shadow-[0_10px_28px_rgba(13,67,115,0.16)] sm:p-7">
              <h3 className="text-[16px] font-bold leading-snug text-white">
                Not sure where to start?
              </h3>

              <p className="mt-2.5 text-[12px] leading-[1.65] text-white/80">
                Tell us about your number and situation and our team will plan a
                safe transfer. Checking a path is non-binding — nothing is
                transferred from this page.
              </p>

              <Link
                href="#check-my-path"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#F6C431] px-4 py-2.5 text-[12px] font-bold text-[#0F1E33] shadow-[0_6px_18px_rgba(246,196,49,0.25)] transition-colors hover:bg-[#e7b524]"
              >
                <span>Check my transfer path</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Bottom Image Card */}
            <div className="relative h-[270px] w-full overflow-hidden rounded-2xl border border-[#E3E9F0] bg-[#182638] shadow-[0_6px_20px_rgba(14,34,59,0.06)] sm:h-[290px]">
              <Image
                src="/Images/num/2.png"
                alt="Woman smiling while checking her mobile phone in a sunlit room"
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Interactive FAQ Accordion Stack */}
          <div className="space-y-3.5">
            {transferFaqItems.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={item.question}
                  className={`rounded-xl border transition-all ${
                    isOpen
                      ? "border-[#E9BC46] border-l-[3.5px] border-l-[#E9BC46] bg-white shadow-[0_4px_16px_rgba(212,160,36,0.08)]"
                      : "border-[#E2E8F0] bg-white shadow-[0_2px_8px_rgba(14,34,59,0.02)] hover:border-[#CBD5E1]"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[18px]"
                  >
                    <span className="text-[13.5px] font-bold leading-snug text-[#0E223B] sm:text-[14px]">
                      {item.question}
                    </span>

                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-[#0D355E] text-white"
                          : "bg-[#EAF2FB] text-[#1D3B5E]"
                      }`}
                    >
                      {isOpen ? (
                        <X
                          className="h-3.5 w-3.5"
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      ) : (
                        <Plus
                          className="h-3.5 w-3.5"
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pr-12 pt-0.5 text-[12.5px] leading-[1.65] text-[#5B6B7F] sm:px-6">
                      {item.answer}
                    </div>
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
