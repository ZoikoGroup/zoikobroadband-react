import React from "react";
import Link from "next/link";
import { Phone, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";

const DEVICE_CARDS = [
  {
    icon: Phone,
    title: "Your phone number",
    description:
      "Keeping a number when you move may be possible, subject to eligibility and published terms. We can't guarantee it here.",
  },
  {
    icon: AlertTriangle,
    title: "Power-cut calling",
    description:
      "A digital home phone may not work during a power failure. Ask about continuity options if you rely on it to make calls.",
  },
  {
    icon: ShieldCheck,
    title: "Alarms & telecare",
    description:
      "Monitored alarms, care alarms and assistive devices can be affected by a connection change. Check compatibility before you move.",
  },
] as const;

export default function PhoneAndEssentialDevices() {
  return (
    <section
      id="phone-alarms"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
            Some connected devices need checking before you move or disconnect.
            These depend on your setup, so please ask before making changes.
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {DEVICE_CARDS.map((card) => {
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

        {/* Amber Warning Callout Box */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 sm:p-6 mb-6 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#0E2F52] mb-1">
              If you rely on an essential connected device, talk to us first
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Don&apos;t disconnect a monitored alarm, telecare or medical alert
              device until you&apos;ve checked continuity. Our team can talk
              through compatibility and any equipment you may need before you
              move.
            </p>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3.5">
          <Link
            href="/digital-lines"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-200/90 font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-2xs group"
          >
            <span>Digital Lines guidance</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/priority-assistance"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0E2F52] border border-gray-200/90 font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-2xs"
          >
            <span>Priority assistance &amp; support</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
