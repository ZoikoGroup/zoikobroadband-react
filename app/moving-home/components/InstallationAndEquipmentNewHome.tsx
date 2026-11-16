import React from "react";
import Link from "next/link";
import { Home, SquareTerminal, Clock, ArrowRight } from "lucide-react";

const SETUP_CARDS = [
  {
    icon: Home,
    title: "Property readiness",
    description:
      "Check building access and, if you rent or live in a managed property, whether permission is needed for any work before an appointment.",
  },
  {
    icon: SquareTerminal,
    title: "Your equipment",
    description:
      "Your current router may not suit the new connection. Follow the instructions supplied for your actual equipment — don't assume it carries over.",
  },
  {
    icon: Clock,
    title: "Appointments",
    description:
      'An appointment is only ever shown as "Not booked" or "Confirmed" from your order. We won\'t show a fictitious engineer time.',
  },
] as const;

export default function InstallationAndEquipmentNewHome() {
  return (
    <section
      id="getting-set-up"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              GETTING SET UP
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Installation &amp; equipment at the new home
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Installation needs and equipment can vary by address and broadband
            technology. Here&apos;s what to think about — your order confirms
            the specifics.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SETUP_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-start shadow-xs"
              >
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
            );
          })}
        </div>

        {/* Centered CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/installation-routers"
            className="inline-flex items-center justify-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs group"
          >
            <span>See Installation &amp; Routers</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
