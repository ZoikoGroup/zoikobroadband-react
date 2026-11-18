import React from "react";
import { Wifi, Network, ShieldCheck, AlertTriangle } from "lucide-react";

const MULTI_SITE_PARTS = [
  {
    icon: Wifi,
    title: "Per-site broadband",
    description:
      "Each location needs its own connection, and what's available differs by address.",
  },
  {
    icon: Network,
    title: "Connecting sites (WAN)",
    description:
      "Linking locations so they work as one network, where that's needed.",
  },
  {
    icon: ShieldCheck,
    title: "Optional managed services",
    description:
      "Things like managed firewall or Wi-Fi, where offered — not assumed included.",
  },
  {
    icon: AlertTriangle,
    title: "Resilience & failover",
    description:
      "Backup options for sites that can't go offline. We discuss realistic options — no zero-downtime promise.",
  },
] as const;

export default function MultiSiteParts() {
  return (
    <section
      id="what-to-connect"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              WHAT TO CONNECT
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            The parts of a multi-site network
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            These are the dimensions we plan per site — explained as concepts,
            not a bundle. Not everything applies to every location.
          </p>
        </div>

        {/* 4-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MULTI_SITE_PARTS.map((card) => {
            const IconComponent = card.icon;

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
