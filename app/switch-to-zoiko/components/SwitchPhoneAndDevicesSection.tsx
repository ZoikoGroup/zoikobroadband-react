import React from "react";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  Info,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const SWITCH_DEVICE_CARDS = [
  {
    icon: Phone,
    title: "Your home phone & number",
    description:
      "Keeping a number may be possible subject to eligibility and published terms — it isn't guaranteed. See Digital Lines for current guidance.",
  },
  {
    icon: ShieldCheck,
    title: "Emergency calling",
    description:
      "We show service- and jurisdiction-accurate safety guidance for power cuts and emergency access. We won't promise an unverified fallback.",
  },
  {
    icon: Info,
    title: "Alarms & telecare",
    description:
      "If you use a monitored alarm or assistive device, contact us for supported options. We won't ask for medical details on this page.",
  },
] as const;

export default function SwitchPhoneAndDevicesSection() {
  return (
    <section
      id="phone-devices"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              PHONE &amp; ESSENTIAL DEVICES
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Using a home phone, alarm or telecare device?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            If you use a home phone, alarm, telecare or equipment that depends
            on your connection, ask us about your options before switching.
          </p>
        </div>

        {/* Amber Warning Callout Box */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 sm:p-6 mb-8 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#78350F] mb-1">
              Check this before you order
            </h3>
            <p className="text-sm text-[#78350F]/90 leading-relaxed">
              A digital home phone usually needs power and broadband to work, so
              it may not operate during a power cut. Compatibility for phones,
              alarms and telecare devices must be checked — don&apos;t rely on
              them continuing to work unchanged after a switch.
            </p>
          </div>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SWITCH_DEVICE_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-start shadow-xs"
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
            href="/contact-us"
            className="inline-flex items-center justify-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs group"
          >
            <span>Talk to our team about phone or device needs</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
