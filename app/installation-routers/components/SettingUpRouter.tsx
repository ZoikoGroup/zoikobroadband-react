import React from "react";
import { ArrowUpCircle, RotateCw } from "lucide-react";

const SETUP_STEPS = [
  {
    number: "1",
    title: "Before you power on",
    description:
      "Find the power adapter and the correct broadband cable. Use only the instructions supplied for your device.",
  },
  {
    number: "2",
    title: "Connect the equipment",
    description:
      "Connect each cable to the labelled port. For Full Fibre, the ONT connects to the router's WAN port.",
  },
  {
    number: "3",
    title: "Wait for activation",
    description:
      "Status lights vary by model. Your connection may not start the moment you switch on — follow your confirmation.",
  },
  {
    number: "4",
    title: "Connect a device",
    description:
      "Select your Wi-Fi network and enter the credentials from your router label or approved account process.",
  },
  {
    number: "5",
    title: "Verify you're online",
    description:
      "Open a familiar website. If it loads, you're connected. If not, try the troubleshooting steps below.",
  },
] as const;

const INFO_CARDS = [
  {
    icon: ArrowUpCircle,
    title: "Where to place your router",
    description:
      "Put it on a stable, ventilated surface, off the floor and away from thick walls, TVs and other electronics. Keep vents clear and use a suitable mains socket. Walls, distance and many connected devices all affect Wi-Fi coverage.",
  },
  {
    icon: RotateCw,
    title: "Reboot vs factory reset",
    description:
      "A reboot (power off, wait, power on) is safe and fixes many glitches. A factory reset wipes your settings and should only be done with the approved instructions for your model — it's not a quick fix. When in doubt, contact support.",
  },
] as const;

export default function SettingUpRouter() {
  return (
    <section
      id="router-wifi"
      className="w-full bg-[#F8FAFC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              ROUTER &amp; WI-FI
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Setting up your router
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Follow the guide supplied with your actual equipment. Port labels
            and lights vary by model — these steps are the general shape of it.
          </p>
        </div>

        {/* 5-Column Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {SETUP_STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-start shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#0E2F52] font-bold text-sm flex items-center justify-center mb-5 shrink-0">
                {step.number}
              </div>
              <h3 className="font-bold text-base text-[#0E2F52] mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* 2-Column Bottom Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {INFO_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-xs"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <IconComponent className="w-5 h-5 text-[#0E2F52] shrink-0 stroke-[2]" />
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
      </div>
    </section>
  );
}
