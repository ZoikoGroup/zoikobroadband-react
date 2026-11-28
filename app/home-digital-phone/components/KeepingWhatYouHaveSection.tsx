import React from "react";
import Link from "next/link";
import { AlignLeft, Phone } from "lucide-react";

interface KeepingCardItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
  afterLinkText?: string;
}

const KEEPING_CARDS: readonly KeepingCardItem[] = [
  {
    id: "keep-your-number",
    icon: AlignLeft,
    title: "Keep your number",
    description:
      "Moving your number is often possible, subject to eligibility and a porting check \u2014 it isn\u2019t automatic, and nothing is ported without a check. ",
    linkLabel: "See Keep Your Phone Number",
    linkHref: "/keep-your-number",
    afterLinkText: ".",
  },
  {
    id: "use-your-handset",
    icon: Phone,
    title: "Use your handset",
    description:
      "Many standard phones still work, plugged into the router or an adapter \u2014 not the old telephone wall socket. Some older or specialist phones may not; check before assuming.",
  },
] as const;

export default function KeepingWhatYouHaveSection() {
  return (
    <section
      id="number-and-handset"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              YOUR NUMBER &amp; HANDSET
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Keeping what you have
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Two common questions — answered honestly, with where to go next.
          </p>
        </div>

        {/* 2-Column Number & Handset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KEEPING_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {card.description}
                    {card.linkLabel && card.linkHref && (
                      <>
                        <Link
                          href={card.linkHref}
                          className="font-semibold text-[#0A3A66] underline underline-offset-2 hover:text-[#0E2F52] transition-colors"
                        >
                          {card.linkLabel}
                        </Link>
                        {card.afterLinkText}
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
