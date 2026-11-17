import React from "react";
import { User, Users, CheckCircle2, Clock } from "lucide-react";

const SWITCH_STEPS = [
  {
    number: "1",
    title: "Check your address",
    description: "Confirm what's serviceable at your exact property.",
    actor: "You, here",
    icon: User,
  },
  {
    number: "2",
    title: "Review your plans",
    description:
      "See the eligible plans for your address and compare the details.",
    actor: "You, here",
    icon: User,
  },
  {
    number: "3",
    title: "Review your contract",
    description: "Check your current deal and any charges before you commit.",
    actor: "You & your current provider",
    icon: Users,
  },
  {
    number: "4",
    title: "Place your order",
    description: "Choose a plan and complete the approved order journey.",
    actor: "You, with Zoiko",
    icon: Users,
  },
  {
    number: "5",
    title: "Confirm your dates",
    description:
      "Receive confirmed appointment or activation details for your order.",
    actor: "Confirmed in your order",
    icon: CheckCircle2,
  },
  {
    number: "6",
    title: "Get connected",
    description: "Set up your equipment and get online at your home.",
    actor: "Install / activate",
    icon: Clock,
  },
] as const;

export default function SwitchHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              HOW IT WORKS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How switching to Zoiko works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Six clear steps. The exact detail depends on your situation — any
            dates are confirmed during the order, not before.
          </p>
        </div>

        {/* 3x2 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {SWITCH_STEPS.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#0A3A66] text-white font-bold text-sm flex items-center justify-center mb-5 shrink-0">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-base text-[#0E2F52] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 pt-4 border-t border-gray-100">
                  <IconComponent className="w-3.5 h-3.5 text-[#0A3A66] shrink-0" />
                  <span>{step.actor}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Notice Callout */}
        <div className="max-w-3xl mx-auto bg-[#F4F9FF] border border-[#CBD9E8] rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#0E2F52] mb-1">
              How long does it take?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              There&apos;s no fixed duration — it depends on your provider,
              connection and the switching process. We&apos;ll confirm the
              applicable dates during the order process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
