"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Wifi,
  Zap,
  Plug,
  ArrowLeftRight,
  Info,
} from "lucide-react";

const SAFETY_SECTION_DATA = {
  badge: "BEFORE YOU SWITCH",
  headingLine1: "Safety, continuity and your existing",
  headingLine2: "numbers.",
  subheadingLine1:
    "Changing your phone service affects emergency calls, connected devices and your numbers.",
  subheadingLine2: "Here's what we review with you.",
  emergencyAlert: {
    title: "Emergency calls (999 and 112)",
    body: "Calls over the internet need power and a working connection. In a power cut or broadband outage, you may not be able to call 999 or 112 unless a backup is in place. If staff work from different places, we'll ask how to keep emergency location details up to date. Tell us if anyone relies on their phone for safety.",
  },
  reviewCards: [
    {
      id: "connectivity",
      icon: "wifi",
      accentClass: "border-t-[3px] border-t-[#FFD100]",
      title: "Connectivity check",
      description:
        "Call quality depends on your broadband, Wi-Fi and office network. We check them before recommending a setup.",
    },
    {
      id: "power-cuts",
      icon: "power",
      accentClass: "border-t-[3px] border-t-[#FFD100]",
      title: "Power cuts",
      description:
        "Cloud phones stop working without power unless you have a backup, like a battery unit or mobile fallback.",
    },
    {
      id: "connected-devices",
      icon: "plug",
      accentClass: "border-t-[3px] border-t-[#B91C2C]",
      title: "Connected devices",
      description:
        "Alarms, lift lines, card machines, fax and telecare may need special checks. We review these with a person.",
    },
    {
      id: "keeping-numbers",
      icon: "numbers",
      accentClass: "border-t-[3px] border-t-[#061B31]",
      title: "Keeping your numbers",
      description:
        "We'll review number transfer options with you. Transfers aren't guaranteed until approved.",
    },
  ],
  image: {
    src: "/Images/cloud/6.png",
    alt: "Wireless router with antennas in foreground and person working on laptop in background",
  },
  readiness: {
    title: "Quick readiness check",
    subtitle:
      "Tick what applies to your business. This isn't sent anywhere until you submit the form below.",
    items: [
      {
        id: "business-broadband",
        label: "We have business broadband at each site",
      },
      {
        id: "office-wifi",
        label: "Our office Wi-Fi covers where people take calls",
      },
      {
        id: "power-cuts-plan",
        label: "We have a plan for power cuts",
      },
      {
        id: "alarms-lines",
        label:
          "We have alarms, lift lines, card machines or telecare on phone lines",
      },
      {
        id: "remote-work",
        label: "Some of us work from home or other places",
      },
    ],
  },
  footerBannerBold: "Don't cancel your current phone service",
  footerBannerRest:
    " until your new service and any number transfer are confirmed working.",
} as const;

export default function CloudSafetyCheck() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="before-you-switch"
      aria-labelledby="cloud-safety-heading"
      className="w-full bg-white py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-10">
        {/* Badge */}
        <div className="inline-flex items-center rounded-[4px] bg-[#FFD100] px-2.5 py-1">
          <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#081C2E] uppercase">
            {SAFETY_SECTION_DATA.badge}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="cloud-safety-heading"
          className="mt-3.5 text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#081C2E] sm:text-[42px] lg:text-[44px]"
        >
          <span className="block">{SAFETY_SECTION_DATA.headingLine1}</span>
          <span className="block">{SAFETY_SECTION_DATA.headingLine2}</span>
        </h2>

        {/* Subheading */}
        <p className="mt-3 max-w-[680px] text-[13.5px] leading-[1.52] font-normal text-[#475569] sm:text-[14px]">
          <span className="block">{SAFETY_SECTION_DATA.subheadingLine1}</span>
          <span className="block">{SAFETY_SECTION_DATA.subheadingLine2}</span>
        </p>

        {/* Emergency Calls Alert Banner */}
        <div
          role="alert"
          className="mt-5 flex items-start gap-3.5 rounded-[10px] border border-[#E5B8BD] bg-[#FCEBEC] px-4 py-3.5"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-[#B91C2C] text-white">
            <AlertTriangle className="h-4 w-4 stroke-[2.2]" />
          </span>

          <div className="min-w-0 leading-snug">
            <h3 className="text-[12.5px] font-bold text-[#991B29]">
              {SAFETY_SECTION_DATA.emergencyAlert.title}
            </h3>
            <p className="mt-1 text-[11px] leading-[1.48] font-normal text-[#8E2430]">
              {SAFETY_SECTION_DATA.emergencyAlert.body}
            </p>
          </div>
        </div>

        {/* 4 Review Cards Row */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_SECTION_DATA.reviewCards.map((card) => (
            <div
              key={card.id}
              className={`rounded-[10px] border border-[#E6ECF2] bg-white p-4 shadow-[0_1px_3px_rgba(8,28,46,0.03)] ${card.accentClass}`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#EEF3F8]">
                {card.icon === "wifi" && (
                  <Wifi className="h-3.5 w-3.5 text-[#1D5B96] stroke-[2.2]" />
                )}
                {card.icon === "power" && (
                  <Zap className="h-3.5 w-3.5 text-[#B48219] stroke-[2.2]" />
                )}
                {card.icon === "plug" && (
                  <Plug className="h-3.5 w-3.5 text-[#B91C2C] stroke-[2.2]" />
                )}
                {card.icon === "numbers" && (
                  <ArrowLeftRight className="h-3.5 w-3.5 text-[#081C2E] stroke-[2.2]" />
                )}
              </div>

              <h3 className="mt-3 text-[13px] leading-[1.3] font-bold text-[#081C2E]">
                {card.title}
              </h3>

              <p className="mt-1.5 text-[11px] leading-[1.48] font-normal text-[#5A6A7E]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Lower Split: Left Router Photo + Right Quick Readiness Check */}
        <div className="mt-5 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
          {/* Left Photo */}
          <div className="lg:col-span-6">
            <div className="h-full min-h-[220px] overflow-hidden rounded-[12px] border border-[#E6ECF2] bg-[#131826] sm:min-h-[245px]">
              <img
                src={SAFETY_SECTION_DATA.image.src}
                alt={SAFETY_SECTION_DATA.image.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Quick Readiness Checklist Card */}
          <div className="lg:col-span-6">
            <div className="flex h-full flex-col justify-center rounded-[12px] border border-[#E6ECF2] bg-[#F4F7FA] p-5 sm:p-6">
              <h3 className="text-[13.5px] leading-[1.3] font-bold text-[#081C2E]">
                {SAFETY_SECTION_DATA.readiness.title}
              </h3>
              <p className="mt-1 text-[10.5px] leading-[1.4] font-normal text-[#64748B]">
                {SAFETY_SECTION_DATA.readiness.subtitle}
              </p>

              <div className="mt-3.5 flex flex-col gap-2.5">
                {SAFETY_SECTION_DATA.readiness.items.map((item) => {
                  const isChecked = Boolean(checkedIds[item.id]);
                  return (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center gap-2.5 text-[11px] leading-[1.35] font-medium text-[#1E293B] select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        className="h-3.5 w-3.5 shrink-0 cursor-pointer rounded-[3px] border border-[#CBD5E1] accent-[#061B31]"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Banner */}
        <div className="mt-4 flex items-center gap-2 rounded-[7px] border border-[#DCE8F2] bg-[#F2F7FB] px-3.5 py-2.5">
          <Info className="h-3.5 w-3.5 shrink-0 text-[#1D5B96] stroke-[2.2]" />
          <p className="text-[10.5px] leading-[1.4] font-normal text-[#475569]">
            <strong className="font-bold text-[#081C2E]">
              {SAFETY_SECTION_DATA.footerBannerBold}
            </strong>
            {SAFETY_SECTION_DATA.footerBannerRest}
          </p>
        </div>
      </div>
    </section>
  );
}
