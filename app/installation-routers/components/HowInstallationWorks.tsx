"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

const INSTALLATION_TABS = {
  fttp: {
    tabLabel: "Full Fibre (FTTP)",
    heading: "Full Fibre (FTTP) installation",
    subheading:
      "The fibre service at your property connects to an ONT indoors, which connects to your router. The ONT is separate from your router.",
    steps: [
      {
        number: "1",
        title: "Check the route",
        description:
          "Check your address to see what installation may be needed. Availability is address-specific.",
      },
      {
        number: "2",
        title: "Get ready",
        description:
          "You may need to agree where equipment and fibre enter your home. If you rent, check permission in advance.",
      },
      {
        number: "3",
        title: "Engineer work (if required)",
        description:
          "Where a visit is required, the engineer may bring a fibre cable into the property and install or use an ONT.",
      },
      {
        number: "4",
        title: "Connect your router",
        description:
          "Connect the ONT to your router using the cable and instructions supplied for your actual equipment.",
      },
      {
        number: "5",
        title: "Activate and check",
        description:
          "Follow your activation message, verify the lights and test the connection.",
      },
    ],
    cardTitle: "The FTTP equipment chain",
    chainItems: [
      {
        number: "1.",
        label: "External network connection",
        text: "— an external fibre route may connect your property to the network.",
      },
      {
        number: "2.",
        label: "Fibre cable",
        text: "— connects the outside network to the indoor termination point.",
      },
      {
        number: "3.",
        label: "Optical Network Terminal (ONT)",
        text: "— the indoor equipment that terminates the fibre.",
      },
      {
        number: "4.",
        label: "Ethernet cable",
        text: "— connects the ONT to the router's WAN port, where applicable.",
      },
      {
        number: "5.",
        label: "Broadband router",
        text: "— distributes the connection over Wi-Fi and Ethernet.",
      },
      {
        number: "6.",
        label: "Devices",
        text: "— laptops, phones, TVs and other equipment connect to the router.",
      },
    ],
    footnote:
      "Illustrative. An engineer visit or wall work may be needed for some homes.",
  },
  sogea: {
    tabLabel: "Part Fibre (SOGEA)",
    heading: "Part Fibre (SOGEA) installation",
    subheading:
      "Uses your existing local access line and master socket indoors, which connects directly to your router. No ONT is required.",
    steps: [
      {
        number: "1",
        title: "Check your line",
        description:
          "Check your address to confirm SOGEA availability and whether an active line or socket is already present.",
      },
      {
        number: "2",
        title: "Locate your master socket",
        description:
          "Identify your main telephone socket and ensure there is a nearby power outlet for your router.",
      },
      {
        number: "3",
        title: "Engineer visit (if required)",
        description:
          "If your property needs a new socket or external line connection, an engineer appointment will be arranged.",
      },
      {
        number: "4",
        title: "Connect your router",
        description:
          "Plug the supplied DSL cable from your master socket into your router and switch it on.",
      },
      {
        number: "5",
        title: "Activate and check",
        description:
          "Wait for your activation confirmation, check the router status lights and test your connection.",
      },
    ],
    cardTitle: "The SOGEA equipment chain",
    chainItems: [
      {
        number: "1.",
        label: "Street cabinet connection",
        text: "— fibre runs to your local street cabinet and copper continues to your home.",
      },
      {
        number: "2.",
        label: "Master socket",
        text: "— the indoor wall socket where the local access line enters your property.",
      },
      {
        number: "3.",
        label: "DSL cable",
        text: "— connects your master socket directly to the router.",
      },
      {
        number: "4.",
        label: "Broadband router",
        text: "— distributes the connection over Wi-Fi and Ethernet.",
      },
      {
        number: "5.",
        label: "Devices",
        text: "— laptops, phones, TVs and other equipment connect to the router.",
      },
    ],
    footnote:
      "Illustrative. Socket setup and whether an engineer visit is needed depend on your property.",
  },
} as const;

type TabKey = keyof typeof INSTALLATION_TABS;

export default function HowInstallationWorks() {
  const [activeTab, setActiveTab] = useState<TabKey>("fttp");
  const current = INSTALLATION_TABS[activeTab];

  return (
    <section
      id="installation"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              INSTALLATION
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            How your installation works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Pick a connection type. An engineer visit or wall work may be needed
            for some homes — we&apos;ll confirm the steps relevant to your
            order.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-14">
          <div
            role="tablist"
            aria-label="Connection type"
            className="inline-flex items-center p-1.5 rounded-full border border-gray-200 bg-white shadow-2xs"
          >
            {(Object.keys(INSTALLATION_TABS) as TabKey[]).map((key) => {
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0A3A66] text-white shadow-xs"
                      : "text-[#0E2F52] hover:text-[#0A3A66]"
                  }`}
                >
                  {INSTALLATION_TABS[key].tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Numbered Steps */}
          <div className="lg:col-span-6">
            <h3 className="text-xl font-bold text-[#0E2F52] mb-2">
              {current.heading}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {current.subheading}
            </p>

            <div className="space-y-6">
              {current.steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] text-[#0E2F52] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {step.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#0E2F52] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Equipment Chain Dark Blue Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#0A335C] to-[#0E467A] p-8 sm:p-10 text-white overflow-hidden shadow-lg">
              {/* Decorative concentric circles */}
              <div
                className="pointer-events-none absolute -top-20 -right-12 w-64 h-64 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -top-12 -right-4 w-48 h-48 rounded-full border border-[#F5B82E]/35"
                aria-hidden="true"
              />

              <h3 className="text-xl font-bold text-white mb-6 relative z-10">
                {current.cardTitle}
              </h3>

              <ol className="space-y-4 relative z-10">
                {current.chainItems.map((item) => (
                  <li
                    key={item.number}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <span className="font-bold text-white shrink-0">
                      {item.number}
                    </span>
                    <p className="text-blue-100/90">
                      <strong className="font-bold text-white">
                        {item.label}
                      </strong>{" "}
                      {item.text}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Card Footer Note */}
              <div className="flex items-start gap-2.5 mt-8 pt-4 relative z-10">
                <Info className="w-4 h-4 text-blue-200/80 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200/80 leading-relaxed">
                  {current.footnote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
