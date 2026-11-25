import React from "react";
import Link from "next/link";
import { Router, LogOut, Building, ArrowRight } from "lucide-react";

const INSTALL_SWITCH_CARDS = [
  {
    icon: Router,
    title: "Installation & onboarding",
    description:
      "Pre-order readiness, access and consent checks, equipment and continuity planning for your premises.",
    linkLabel: "Installation & Onboarding",
    linkHref: "/installation-onboarding",
  },
  {
    icon: LogOut,
    title: "Switching providers",
    description:
      "Switching depends on your current provider, contract and connection. Check charges first and don’t cancel until it’s confirmed.",
    linkLabel: "How switching works",
    linkHref: "/switch-to-zoiko",
  },
  {
    icon: Building,
    title: "Multi-site connectivity",
    description:
      "Connecting several locations consistently? A tailored quote is often the best route.",
    linkLabel: "Request a tailored quote",
    linkHref: "/request-a-tailored-quote",
  },
] as const;

export default function BusinessBroadbandInstallSwitch() {
  return (
    <section
      id="support-slas"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              INSTALL &amp; SWITCH
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Getting your business connected
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            What to expect after you choose a plan. Steps depend on your
            premises and order — we won&apos;t promise a fixed install date,
            downtime window or engineer attendance.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSTALL_SWITCH_CARDS.map((card) => {
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
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={card.linkHref}
                    className="inline-flex items-center text-sm font-bold text-[#0E2F52] hover:text-[#0A3A66] transition-colors group"
                  >
                    <span>{card.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
