import React from "react";
import { ShieldCheck, Lock, Info } from "lucide-react";

interface PrivacyGuaranteeCard {
  readonly id: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}

const PRIVACY_GUARANTEE_CARDS: readonly PrivacyGuaranteeCard[] = [
  {
    id: "used-to-respond",
    icon: ShieldCheck,
    title: "Used to respond",
    description:
      "We use your details to review your request and reply with a quote or next steps \u2014 in line with our Privacy Notice.",
  },
  {
    id: "no-pre-ticked-opt-in",
    icon: Lock,
    title: "No pre-ticked opt-in",
    description:
      "Marketing is a separate, optional choice \u2014 never pre-selected. You can ask for a quote without opting in.",
  },
  {
    id: "no-obligation",
    icon: Info,
    title: "No obligation",
    description:
      "A request isn\u2019t an order. We don\u2019t activate, port or bill anything from this page, and you\u2019re free to decide after the quote.",
  },
] as const;

export default function HowWeUseWhatYouShareSection() {
  return (
    <section
      id="privacy"
      aria-label="How we use what you share"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              PRIVACY &amp; YOUR DETAILS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How we use what you share
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Your details are used to respond to this request. Here&apos;s the
            plain-English version.
          </p>
        </div>

        {/* 3-Column Plain-English Privacy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRIVACY_GUARANTEE_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
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
