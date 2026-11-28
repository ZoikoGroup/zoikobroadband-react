import React from "react";
import { Monitor, User, Phone, HelpCircle, Info } from "lucide-react";

const INSTALL_METHOD_CARDS = [
  {
    icon: Monitor,
    title: "Self-setup",
    description:
      "Where supported, you connect the kit yourself using the guide for your model.",
  },
  {
    icon: User,
    title: "Engineer visit",
    description:
      "Where a visit is part of your order, you\u2019ll get confirmed appointment details \u2014 attendance isn\u2019t assumed.",
  },
  {
    icon: Phone,
    title: "Assisted setup",
    description:
      "Prefer help, or have a dependency? We can guide you or arrange support.",
  },
  {
    icon: HelpCircle,
    title: "Not sure yet",
    description:
      "Your order confirms which applies. Check your account or ask us \u2014 don\u2019t guess.",
  },
] as const;

export default function HowYourSetupHappens() {
  return (
    <section
      id="install-method"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              INSTALL METHOD
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How your setup happens
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Which applies depends on your order. We won&apos;t promise an
            engineer where one isn&apos;t confirmed, or self-setup where it
            isn&apos;t supported.
          </p>
        </div>

        {/* 4-Column Install Method Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {INSTALL_METHOD_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-Width Bottom Callout Banner */}
        <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4 stroke-[2]" />
          </div>

          <div>
            <h3 className="font-extrabold text-base text-[#0E2F52] mb-1 leading-snug">
              Follow the guide for your equipment
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We won&apos;t show steps for a specific router model here, because
              labels and ports vary. Use the instructions supplied for your kit
              — connect to the router or adapter, not the old telephone wall
              socket, and don&apos;t rewire or factory reset.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
