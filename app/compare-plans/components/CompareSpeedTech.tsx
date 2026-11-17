import React from "react";
import Link from "next/link";
import { Wifi, Phone, HelpCircle, ArrowRight } from "lucide-react";

const SPEED_TECH_CARDS = [
  {
    icon: Wifi,
    title: "Full Fibre (FTTP)",
    description:
      "Fibre runs all the way to the premises where it’s provisioned. It typically supports the highest available speeds, where your address is covered.",
  },
  {
    icon: Phone,
    title: "Part Fibre (SOGEA)",
    description:
      "Part-fibre includes a copper segment to the premises, so speeds can be more line-dependent. It’s a common option where full fibre isn’t yet available.",
  },
  {
    icon: HelpCircle,
    title: "Not sure what you need?",
    description:
      "Download, upload and latency matter in different ways. Our quick guide helps you work out a speed that fits your household.",
    linkLabel: "Which Speed Do I Need?",
    linkHref: "/which-speed-do-i-need",
  },
] as const;

export default function CompareSpeedTech() {
  return (
    <section
      id="speed-technology"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              SPEED &amp; TECHNOLOGY
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Full Fibre and Part Fibre, explained
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            They use different connection designs, and the speeds available
            depend on your address and plan. A faster label doesn&apos;t
            guarantee a faster experience on its own.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {SPEED_TECH_CARDS.map((card) => {
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

                {"linkHref" in card &&
                  "linkLabel" in card &&
                  card.linkHref &&
                  card.linkLabel && (
                    <div>
                      <Link
                        href={card.linkHref}
                        className="inline-flex items-center text-sm font-bold text-[#0E2F52] hover:text-[#0A3A66] transition-colors group"
                      >
                        <span>{card.linkLabel}</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {/* Bottom Disclaimer */}
        <p className="text-center text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Speeds are quoted in Mbps. Advertised, estimated, minimum and maximum
          speeds are different things, and your real speed depends on your line
          and home setup.
        </p>
      </div>
    </section>
  );
}
