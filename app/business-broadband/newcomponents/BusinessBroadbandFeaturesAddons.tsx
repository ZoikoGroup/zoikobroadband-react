import React from "react";
import { Globe, PhoneCall, Shield, Wifi } from "lucide-react";

const BUSINESS_FEATURES_CARDS = [
  {
    icon: Globe,
    title: "Static IP",
    description:
      "A fixed public IP for hosting, remote access or VPNs. Included on some plans, an add-on on others.",
    status: "Plan-dependent",
    statusVariant: "green",
  },
  {
    icon: PhoneCall,
    title: "Business VoIP",
    description:
      "Digital phone lines and calling features for your team. Available as a separate add-on where supported.",
    status: "Available add-on",
    statusVariant: "blue",
  },
  {
    icon: Shield,
    title: "Security",
    description:
      "Options such as managed firewall or filtering may be available depending on the plan and your setup.",
    status: "Not confirmed here",
    statusVariant: "gray",
  },
  {
    icon: Wifi,
    title: "Managed Wi-Fi",
    description:
      "Business Wi-Fi equipment and coverage help for your premises, where offered with your plan.",
    status: "Available add-on",
    statusVariant: "green",
  },
] as const;

export default function BusinessBroadbandFeaturesAddons() {
  return (
    <section
      id="network-options"
      className="w-full bg-[#F8FAFC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              NETWORK &amp; OPTIONS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Business features and add-ons
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Availability and pricing depend on the plan and your address. Each
            feature shows a clear status rather than a vague
            &ldquo;business-grade&rdquo; label.
          </p>
        </div>

        {/* 4-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {BUSINESS_FEATURES_CARDS.map((card) => {
            const IconComponent = card.icon;

            const badgeStyles =
              card.statusVariant === "green"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                : card.statusVariant === "blue"
                  ? "bg-blue-50 text-[#0A3A66] border border-blue-200/60"
                  : "bg-gray-100 text-gray-600 border border-gray-200/60";

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-block text-[11px] font-bold px-3 py-1.5 rounded-full ${badgeStyles}`}
                  >
                    {card.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Footnote */}
        <p className="text-center text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
          Statuses are illustrative. Your confirmed features and prices are
          shown after an address check and verified at the order stage.
        </p>
      </div>
    </section>
  );
}
