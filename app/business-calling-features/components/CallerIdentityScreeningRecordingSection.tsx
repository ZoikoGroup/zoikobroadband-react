import React from "react";
import { User, Shield, Disc, Info } from "lucide-react";

interface PrivacyCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface SafeguardBanner {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const PRIVACY_CARDS: readonly PrivacyCard[] = [
  {
    id: "caller-id-and-withholding",
    icon: User,
    title: "Caller ID & withholding",
    description:
      "Showing or withholding your number follows provider and regulatory rules, and a valid dialable number is needed. Emergency-call exceptions always apply.",
  },
  {
    id: "screening-and-blocking",
    icon: Shield,
    title: "Screening & blocking",
    description:
      "Screening can block unwanted calls, but may also block important withheld numbers. There\u2019s always a way to recover from a false positive.",
  },
  {
    id: "call-recording",
    icon: Disc,
    title: "Call recording",
    description:
      "Recording has legal duties: a lawful basis, informing people, secure storage, retention limits, controlled access, and the ability to pause and delete. It must be set up with those safeguards \u2014 not switched on casually.",
  },
] as const;

const SAFEGUARD_BANNERS: readonly SafeguardBanner[] = [
  {
    id: "recording-responsibly",
    icon: Info,
    title: "Recording responsibly is your decision to make with advice",
    description:
      "We won\u2019t enable call recording without the proper notices, storage and retention in place. If recording matters to you, our specialists will help you set it up lawfully \u2014 we don\u2019t provide legal advice, so check your obligations too.",
  },
  {
    id: "who-can-change-what",
    icon: User,
    title: "Who can change what",
    description:
      "Many features separate everyday use from admin control. Permissions decide who can set up routing, screening or recording \u2014 confirmed for your account, not assumed here.",
  },
] as const;

export default function CallerIdentityScreeningRecordingSection() {
  return (
    <section
      id="recording-and-privacy"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              PRIVACY &amp; SAFEGUARDS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Caller identity, screening and recording
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Some features touch privacy and the law. Here&apos;s what to know
            before you use them.
          </p>
        </div>

        {/* Top 3-Column Feature Safeguards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {PRIVACY_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-4.5 h-4.5 stroke-[2]" />
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

        {/* Bottom 2 Stacked Full-Width Callout Banners */}
        <div className="space-y-4">
          {SAFEGUARD_BANNERS.map((banner) => {
            const IconComponent = banner.icon;

            return (
              <div
                key={banner.id}
                className="bg-[#F4F9FF] border border-gray-200/90 rounded-2xl px-6 py-5 sm:px-7 sm:py-6 flex items-start gap-4 sm:gap-5 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
                  <IconComponent className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0E2F52] tracking-tight leading-snug">
                    {banner.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {banner.description}
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
