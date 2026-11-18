import React from "react";
import { Home, Calendar, CreditCard } from "lucide-react";

const MULTI_SITE_COST_CARDS = [
  {
    icon: Home,
    title: "Priced per site",
    description:
      "Each location has its own connection and costs. We don't assume one site's price applies to another.",
  },
  {
    icon: Calendar,
    title: "One-off and ongoing",
    description:
      "Setup, equipment and any managed services are itemised alongside the monthly cost, with the VAT basis shown.",
  },
  {
    icon: CreditCard,
    title: "Clear before you commit",
    description:
      "You'll see the full picture across your estate before any order — no total built from incomplete pricing.",
  },
] as const;

export default function MultiSiteCosts() {
  return (
    <section
      id="costs"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              COSTS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How multi-site is priced
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            We don&apos;t show prices here because they depend on each
            site&apos;s connection, design and options. Your quote sets out the
            basis clearly.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MULTI_SITE_COST_CARDS.map((card) => {
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
      </div>
    </section>
  );
}
