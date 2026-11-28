import React from "react";
import { User, Mail, Info } from "lucide-react";

const SETUP_SUPPORT_CARDS = [
  {
    icon: User,
    title: "Assisted setup",
    description:
      "We can guide you through setup, or arrange support \u2014 especially if you have a care or safety dependency.",
  },
  {
    icon: Mail,
    title: "Help without your phone",
    description:
      "Reach us by email or the online help centre, or from a mobile \u2014 so you\u2019re not stuck on a line that isn\u2019t working.",
  },
  {
    icon: Info,
    title: "Accessibility & carers",
    description:
      "Need another format, or support for a carer or family member? Ask \u2014 accessible help is available.",
  },
] as const;

export default function SetupAssistedSupport() {
  return (
    <section
      id="assisted-support"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              GET HELP
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Assisted &amp; accessible support
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Prefer help setting up, or rely on your line for care? Use a route
            that doesn&apos;t need the affected phone.
          </p>
        </div>

        {/* 3-Column Support Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SETUP_SUPPORT_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
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
