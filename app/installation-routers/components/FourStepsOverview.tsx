import React from "react";
import Link from "next/link";

const OVERVIEW_STEPS = [
  {
    number: "1",
    title: "Check your connection",
    description:
      "See what's available at your address and which installation may apply.",
    href: "#check-your-connection",
  },
  {
    number: "2",
    title: "Prepare your home",
    description:
      "Think about equipment placement, power sockets and any permissions if you rent.",
    href: "#prepare-your-home",
  },
  {
    number: "3",
    title: "Connect your equipment",
    description:
      "Link your ONT or socket to your router with the supplied cables, then power it on.",
    href: "#connect-your-equipment",
  },
  {
    number: "4",
    title: "Confirm service works",
    description:
      "Follow your activation guidance, check the lights and test that you're online.",
    href: "#confirm-service-works",
  },
] as const;

export default function FourStepsOverview() {
  return (
    <section className="w-full bg-[#F8FAFC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              AT A GLANCE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Four steps from order to online
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            A simple overview of what to expect. Each step links to more detail
            further down the page.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OVERVIEW_STEPS.map((step) => (
            <Link
              key={step.number}
              href={step.href}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-start shadow-xs hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3A66] text-white font-bold text-sm flex items-center justify-center mb-5 shrink-0">
                {step.number}
              </div>
              <h3 className="font-bold text-base text-[#0E2F52] mb-2 group-hover:text-[#0A3A66] transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
