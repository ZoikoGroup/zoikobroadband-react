import React from "react";
import Link from "next/link";
import { Download, Clock, Users, ArrowRight } from "lucide-react";

const SPEEDS_CARDS = [
  {
    icon: Download,
    title: "Download vs upload",
    description:
      "Download affects streaming and browsing; upload affects sending files and video-call quality. Both are shown in Mbps, and missing values show “Check with us” rather than zero.",
  },
  {
    icon: Clock,
    title: "Advertised vs estimated",
    description:
      "An advertised rate isn’t the same as your property estimate. We show the basis for each figure, and your real speed depends on your line and home setup.",
  },
  {
    icon: Users,
    title: "Everyday use",
    description:
      "Browsing, streaming, work and video calls, and busy multi-user homes all have different needs. Our quick guide helps you find a fit.",
    linkLabel: "Which Speed Do I Need?",
    linkHref: "/which-speed-do-i-need",
  },
] as const;

export default function PartFibreSpeeds() {
  return (
    <section
      id="speeds-usage"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              SPEEDS &amp; USAGE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What the speeds mean for you
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Advertised speed, a property estimate and your real experience are
            different things. Here&apos;s how to read them.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPEEDS_CARDS.map((card) => {
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
      </div>
    </section>
  );
}
