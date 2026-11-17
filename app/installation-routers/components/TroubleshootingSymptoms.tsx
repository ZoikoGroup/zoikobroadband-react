"use client";

import React, { useState } from "react";
import {
  Power,
  Globe,
  HardDrive,
  Wifi,
  WifiOff,
  Gauge,
  PhoneCall,
} from "lucide-react";

const TROUBLESHOOTING_ITEMS = [
  {
    id: "no-power-light",
    icon: Power,
    label: "No power light",
  },
  {
    id: "router-on-internet-off",
    icon: Globe,
    label: "Router on, internet off",
  },
  {
    id: "ont-alarm-light",
    icon: HardDrive,
    label: "ONT alarm light",
  },
  {
    id: "wifi-on-cant-browse",
    icon: Wifi,
    label: "Wi-Fi on, can't browse",
  },
  {
    id: "wifi-not-visible",
    icon: WifiOff,
    label: "Wi-Fi not visible",
  },
  {
    id: "slow-or-dropping-wifi",
    icon: Gauge,
    label: "Slow or dropping Wi-Fi",
  },
  {
    id: "phone-telecare-not-working",
    icon: PhoneCall,
    label: "Phone / telecare not working",
  },
] as const;

export default function TroubleshootingSymptoms() {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  return (
    <section
      id="troubleshooting"
      className="w-full bg-[#F8FAFC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              TROUBLESHOOTING
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What are you having trouble with?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Pick the closest symptom for safe checks to try. If your service
            should be live and still isn&apos;t, we&apos;ll point you to support
            — we won&apos;t assume it&apos;s your fault.
          </p>
        </div>

        {/* Symptom Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TROUBLESHOOTING_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedSymptom === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedSymptom(isSelected ? null : item.id)}
                aria-pressed={isSelected}
                className={`bg-white border rounded-2xl p-4 flex items-center gap-4 text-left transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? "border-[#0A3A66] ring-1 ring-[#0A3A66] shadow-sm"
                    : "border-gray-200/90 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#0A3A66] text-white"
                      : "bg-[#EFF6FF] text-[#0E2F52]"
                  }`}
                >
                  <IconComponent className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className="font-bold text-sm text-[#0E2F52]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
