import React from "react";
import { Clock } from "lucide-react";

const INSTALLATION_STEPS = [
  {
    step: "1",
    title: "Check your address",
    description: "Confirm Part Fibre is serviceable at your exact property.",
  },
  {
    step: "2",
    title: "Choose a plan",
    description: "Review the details and pick the plan that suits you.",
  },
  {
    step: "3",
    title: "Confirm your order",
    description: "We assess any site requirements for your property.",
  },
  {
    step: "4",
    title: "Install or activate",
    description: "Often self-install; an engineer visit where it’s needed.",
  },
  {
    step: "5",
    title: "Service ready",
    description: "Connect your router and get online once activated.",
  },
  {
    step: "6",
    title: "Get help if needed",
    description: "Our team can help with install updates and any delays.",
  },
] as const;

export default function PartFibreInstallation() {
  return (
    <section
      id="installation"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              GETTING SET UP
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Installation, equipment and activation
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            What to expect after you choose a plan. This is informational — your
            actual dates and steps are confirmed in your order.
          </p>
        </div>

        {/* 6-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {INSTALLATION_STEPS.map((item) => (
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
          <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0E2F52] mb-1">
              No fixed promise of &ldquo;no downtime&rdquo;
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your line readiness, property access and any engineer visit can
              affect timing. We&apos;ll keep you updated through your order
              rather than promise a blanket switch-on time. See Installation
              &amp; Routers for full setup guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
