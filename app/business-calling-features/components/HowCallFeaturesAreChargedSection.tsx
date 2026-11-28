import React from "react";
import { User, Calendar, CreditCard } from "lucide-react";

interface BillingBasisCard {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const BILLING_BASIS_CARDS: readonly BillingBasisCard[] = [
  {
    id: "per-seat-number-site",
    icon: User,
    title: "Per seat, number or site",
    description:
      "Some features are charged per user, per phone number or per site. Your quote states which basis applies to each one.",
  },
  {
    id: "one-off-and-ongoing",
    icon: Calendar,
    title: "One-off and ongoing",
    description:
      "There may be a one-off setup charge and an ongoing monthly charge. Usage-based elements, like forwarded-call legs, are called out.",
  },
  {
    id: "clear-before-you-commit",
    icon: CreditCard,
    title: "Clear before you commit",
    description:
      "Charges, VAT basis and any minimum terms are confirmed in your quote \u2014 we won\u2019t show a number we can\u2019t stand behind.",
  },
] as const;

export default function HowCallFeaturesAreChargedSection() {
  return (
    <section
      id="costs-and-billing"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              COSTS &amp; BILLING
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How call features are charged
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            We don&apos;t show feature prices here because they depend on your
            plan and setup. Your quote sets out the basis clearly before you
            commit.
          </p>
        </div>

        {/* 3-Column Billing Basis Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BILLING_BASIS_CARDS.map((card) => {
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
