import React from "react";
import { Check, Search, Calendar, Monitor, Wifi, Clock } from "lucide-react";

const SETUP_STAGES = [
  {
    icon: Check,
    title: "Order received",
    description: "We've got your order and are reviewing what's needed.",
    badge: "Status in your order",
  },
  {
    icon: Search,
    title: "Checks required",
    description: "Some orders need extra checks before dates are set.",
    badge: "Conditional",
  },
  {
    icon: Calendar,
    title: "Appointment offered",
    description: "If a visit is needed, a date is offered and confirmed.",
    badge: "Not yet confirmed",
  },
  {
    icon: Monitor,
    title: "Equipment dispatched",
    description: "Where applicable, your router is sent with tracking.",
    badge: "If applicable",
  },
  {
    icon: Wifi,
    title: "Ready / activated",
    description: "Your service is ready to use at the confirmed time.",
    badge: "Confirmed in order",
  },
] as const;

export default function SwitchSetupAndDatesSection() {
  return (
    <section
      id="setup-dates"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              SETUP &amp; DATES
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Installation, equipment and activation
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Installation needs and activation dates depend on your address and
            the service you choose. These states appear in your order — dates
            show &ldquo;Not yet confirmed&rdquo; until they&apos;re real.
          </p>
        </div>

        {/* 5-Column Process Stages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {SETUP_STAGES.map((stage) => {
            const IconComponent = stage.icon;
            return (
              <div
                key={stage.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-4 shrink-0">
                    <IconComponent className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#0E2F52] mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                    {stage.description}
                  </p>
                </div>

                <div>
                  <span className="inline-block bg-[#F1F5F9] text-[#475569] text-[11px] font-semibold px-3 py-1 rounded-full">
                    {stage.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info Banner */}
        <div className="max-w-3xl mx-auto bg-[#F4F9FF] border border-[#CBD9E8] rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#0E2F52] mb-1">
              Need to change a date?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We&apos;ll show the real quoted date in your order and give you an
              approved contact channel to reschedule. Some dates depend on your
              current provider.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
