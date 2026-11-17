import React from "react";
import { Info } from "lucide-react";

const FULL_FIBRE_INSTALLATION_STEPS = [
  {
    step: "1",
    title: "Check your address",
    description: "Confirm Full Fibre is serviceable at your exact property.",
  },
  {
    step: "2",
    title: "Choose a plan",
    description: "Review the details and pick the plan that suits you.",
  },
  {
    step: "3",
    title: "Confirm your order",
    description: "We assess any site requirements, access and consents.",
  },
  {
    step: "4",
    title: "Engineer & ONT",
    description: "Where needed, an engineer brings fibre in and fits an ONT.",
  },
  {
    step: "5",
    title: "Connect your router",
    description: "Link your router to the ONT and switch it on.",
  },
  {
    step: "6",
    title: "Service ready",
    description: "Follow your activation guidance and get online.",
  },
] as const;

export default function FullFibreInstallation() {
  return (
    <section
      id="installation"
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
            Installation &amp; property readiness
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Full Fibre may need an engineer to bring fibre into your property
            and fit an ONT. What&apos;s needed depends on your home — your order
            confirms the specifics.
          </p>
        </div>

        {/* 6-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {FULL_FIBRE_INSTALLATION_STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-start shadow-xs hover:border-gray-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0A3A66] text-white flex items-center justify-center font-bold text-sm mb-4 shrink-0">
                {item.step}
              </div>
              <h3 className="font-bold text-base text-[#0E2F52] mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-[#F4F9FF] border border-[#CBD9E8] rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0E2F52] mb-1">
              Renting or in a flat?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Some installations need the property owner&apos;s consent or
              additional work (for example a wayleave or civil works). If you
              rent or live in a managed building, check permission before your
              appointment. We won&apos;t promise an install date we can&apos;t
              confirm. See Installation &amp; Routers for the full guide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
