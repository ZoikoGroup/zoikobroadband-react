import React from "react";
import Link from "next/link";
import { ShieldCheck, CreditCard, Info } from "lucide-react";

const CLEAR_HONEST_CARDS = [
  {
    icon: ShieldCheck,
    title: "Address-specific, not UK-wide",
    description:
      "We don’t claim nationwide coverage or guaranteed availability. Plans appear only when confirmed at your exact property.",
  },
  {
    icon: CreditCard,
    title: "Full pricing, no surprises",
    description:
      "Monthly price, any introductory period, setup costs and total-term cost are shown on the same basis. We never build a total from incomplete pricing.",
  },
  {
    icon: Info,
    title: "Honest about problems",
    description:
      'A temporary technical issue is shown separately from "no service at your address" — and there are no fake badges, ratings or guarantees.',
  },
] as const;

export default function BusinessBroadbandClearHonest() {
  return (
    <section
      id="faqs"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              CLEAR &amp; HONEST
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What you see depends on your address
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The options shown depend on your selected address and the
            information available at the time of your check. Here&apos;s how we
            keep it straight.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {CLEAR_HONEST_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="bg-[#F4F9FF] border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0E2F52] mb-1">
              Need help, or using assistive technology?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our{" "}
              <Link
                href="/accessibility"
                className="underline hover:text-[#0A3A66]"
              >
                Accessibility Support
              </Link>{" "}
              and{" "}
              <Link href="/support" className="underline hover:text-[#0A3A66]">
                Help Centre
              </Link>{" "}
              are here before and after your order — you don&apos;t need an
              account to get advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
