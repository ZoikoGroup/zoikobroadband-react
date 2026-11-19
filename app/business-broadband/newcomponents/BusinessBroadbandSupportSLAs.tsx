import React from "react";
import Link from "next/link";
import { PhoneCall, Clock, FileText, ArrowRight } from "lucide-react";

const SUPPORT_SLAS_CARDS = [
  {
    icon: PhoneCall,
    title: "UK-based support",
    description:
      "Contact channels and operating hours are shown from verified information for your plan, not assumed.",
  },
  {
    icon: Clock,
    title: "Incident response",
    description:
      "Where a plan includes response commitments by incident severity, they're stated clearly with their scope.",
  },
  {
    icon: FileText,
    title: "Business Support & SLAs",
    description:
      "See the full detail on channels, severity levels and any response commitments on the dedicated page.",
    linkLabel: "View Support & SLAs",
    linkHref: "/business-support-slas",
  },
] as const;

export default function BusinessBroadbandSupportSLAs() {
  return (
    <section
      id="support-slas"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              SUPPORT &amp; SLAS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Business support and service levels
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            What support looks like once you&apos;re connected. We show only the
            channels and commitments that apply to your plan — &ldquo;priority
            support&rdquo; doesn&apos;t mean 24/7 or a guaranteed fix time.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUPPORT_SLAS_CARDS.map((card) => {
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
