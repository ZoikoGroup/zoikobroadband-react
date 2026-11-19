import React from "react";
import { ShieldCheck, Clock, MessageSquare, Building2 } from "lucide-react";

const BUSINESS_FEATURE_CARDS = [
  {
    icon: ShieldCheck,
    title: "Address-verified offers",
    description: "Only plans sellable at your premises are shown.",
  },
  {
    icon: Clock,
    title: "Costs up front",
    description: "VAT basis, setup and term beside every price.",
  },
  {
    icon: MessageSquare,
    title: "UK-based support",
    description: "Hours and channels shown per plan.",
  },
  {
    icon: Building2,
    title: "Multi-site ready",
    description: "Tailored quotes for several premises.",
  },
] as const;

export default function BusinessBroadbandFeaturesGrid() {
  return (
    <div className="relative w-full bg-transparent font-sans antialiased overflow-visible z-30 -mt-24 sm:-mt-28 py-6 mb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BUSINESS_FEATURE_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_40px_-10px_rgba(11,37,69,0.22)] transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
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
    </div>
  );
}
