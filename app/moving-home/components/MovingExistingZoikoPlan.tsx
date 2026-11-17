import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  AlertTriangle,
  Monitor,
  Home,
  Info,
  ArrowRight,
} from "lucide-react";

const PLAN_DETAILS_CARDS = [
  {
    icon: FileText,
    title: "Your current plan & contract",
    description:
      "Whether your plan can move depends on the service at the new address and the terms of your agreement. Check your contract details before making changes.",
  },
  {
    icon: AlertTriangle,
    title: "Notice & charges",
    description:
      "There may be implications for notice or charges. We won't quote specific periods or fees here — your account or support team will confirm what applies to you.",
  },
  {
    icon: Monitor,
    title: "Equipment & phone",
    description:
      "Your current router may not suit the new connection, and a digital phone or number may need separate steps. See the phone & alarms section below.",
  },
  {
    icon: Home,
    title: "New-address options",
    description:
      "A different technology or plan may apply at the new property. Check availability above to see your eligible options.",
  },
] as const;

export default function MovingExistingZoikoPlan() {
  return (
    <section
      id="your-current-service"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="h-[2px] w-8 bg-[#F59E0B]" />
              <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
                YOUR CURRENT SERVICE
              </span>
            </div>

            {/* Section Title */}
            <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
              Moving an existing Zoiko plan
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8 max-w-2xl">
              Your current service and your new address may need separate
              checks. Here&apos;s what to look at — then confirm the details
              through your account or support.
            </p>

            {/* 2x2 Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {PLAN_DETAILS_CARDS.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.title}
                    className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <IconComponent className="w-4 h-4 text-[#0E2F52] shrink-0 stroke-[2]" />
                      <h3 className="font-bold text-base text-[#0E2F52]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Advisory Banner */}
            <div className="bg-[#F8FAFC] border border-gray-200/90 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-4 h-4 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#0E2F52] mb-1">
                  Please don&apos;t cancel based on this page alone
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This is general guidance. Confirm any change to your service
                  through your account or an approved support channel before you
                  cancel or switch anything.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dark Blue Account Review Card */}
            <div className="rounded-3xl bg-[#0A3A66] p-7 sm:p-8 text-white shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2.5">
                Review your account
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed mb-6">
                Sign in to see your agreement and any supported move options, or
                contact our UK-based team for help with your specific situation.
              </p>

              <div className="space-y-3">
                <Link
                  href="/my-account"
                  className="w-full inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-5 py-3.5 rounded-xl transition-colors group"
                >
                  <span>Sign in to My Account</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact-support"
                  className="w-full inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/25 font-semibold text-sm px-5 py-3.5 rounded-xl transition-colors"
                >
                  Contact support
                </Link>
              </div>
            </div>

            {/* Image Card */}
            <div className="relative w-full h-[260px] sm:h-[280px] rounded-3xl overflow-hidden shadow-xs">
              <Image
                src="/Images/moving/2.png"
                alt="Woman reviewing her home move plan on a laptop at a wooden desk"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
