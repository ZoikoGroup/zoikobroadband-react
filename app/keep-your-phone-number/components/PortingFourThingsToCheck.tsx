"use client";

import React, { useState } from "react";
import { Plug, AlertTriangle, Check } from "lucide-react";

interface PortingCheckCard {
  readonly stepNumber: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

type ConnectedDeviceId =
  | "burglar-or-fire-alarms"
  | "telecare-or-personal-alarms"
  | "lift-emergency-lines"
  | "card-payment-terminals"
  | "door-entry-systems"
  | "fax-machines";

interface ConnectedDeviceOption {
  readonly id: ConnectedDeviceId;
  readonly label: string;
}

const PORTING_CHECK_CARDS: readonly PortingCheckCard[] = [
  {
    stepNumber: "1",
    id: "your-contract-and-bills",
    title: "Your contract & bills",
    description:
      "Check your account name, any notice period and early-exit charges with your current provider.",
    imageSrc: "/Images/onb/16.png",
    imageAlt:
      "Overhead view of a wooden desk with a laptop, glasses, coffee cup and small plant",
  },
  {
    stepNumber: "2",
    id: "broadband-on-the-same-line",
    title: "Broadband on the same line",
    description:
      "If your broadband shares the line, moving the number could affect it. Tell us before anything changes.",
    imageSrc: "/Images/onb/14.png",
    imageAlt:
      "Dual-antenna wireless router in a workspace with a person working in the background",
  },
  {
    stepNumber: "3",
    id: "connected-devices",
    title: "Connected devices",
    description:
      "Alarms, card terminals and door entry may rely on your line. A specialist reviews these with you.",
    imageSrc: "/Images/speak/3.png",
    imageAlt: "Colourful fresh produce display in a retail market shop",
  },
  {
    stepNumber: "4",
    id: "emergency-calls-and-power",
    title: "Emergency calls & power",
    description:
      "Digital phone lines need power and internet. Plan how you'd call 999 or 112 in a power cut.",
    imageSrc: "/Images/onb/12.png",
    imageAlt:
      "Support specialist wearing a headset smiling at a computer workstation",
  },
];

const CONNECTED_DEVICES: readonly ConnectedDeviceOption[] = [
  { id: "burglar-or-fire-alarms", label: "Burglar or fire alarms" },
  { id: "telecare-or-personal-alarms", label: "Telecare or personal alarms" },
  { id: "lift-emergency-lines", label: "Lift emergency lines" },
  { id: "card-payment-terminals", label: "Card payment terminals" },
  { id: "door-entry-systems", label: "Door entry systems" },
  { id: "fax-machines", label: "Fax machines" },
];

export interface PortingFourThingsToCheckProps {
  readonly defaultSelectedDevices?: readonly ConnectedDeviceId[];
  readonly onSelectedDevicesChange?: (
    selectedIds: readonly ConnectedDeviceId[],
  ) => void;
}

export default function PortingFourThingsToCheck({
  defaultSelectedDevices = [],
  onSelectedDevicesChange,
}: PortingFourThingsToCheckProps) {
  const [selectedDevices, setSelectedDevices] = useState<
    readonly ConnectedDeviceId[]
  >(defaultSelectedDevices);

  const handleToggleDevice = (id: ConnectedDeviceId) => {
    const next = selectedDevices.includes(id)
      ? selectedDevices.filter((item) => item !== id)
      : [...selectedDevices, id];

    setSelectedDevices(next);
    onSelectedDevicesChange?.(next);
  };

  return (
    <section
      id="four-things-to-check"
      className="w-full bg-[#F4F7FA] py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Top Eyebrow & Heading */}
        <div className="mb-9">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
              04
            </span>
            <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
              BEFORE YOU SWITCH
            </span>
          </div>

          <h2 className="text-[#0B2241] text-[36px] sm:text-[44px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5 max-w-[540px]">
            Four things to check first.
          </h2>

          <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[600px]">
            These are the most common reasons a number move goes wrong. A few
            minutes now can save your number.
          </p>
        </div>

        {/* 4-Column Check Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {PORTING_CHECK_CARDS.map((card) => (
            <article
              key={card.id}
              className="bg-white rounded-[18px] border border-[#E2E8F0] overflow-hidden shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col"
            >
              <div className="relative w-full h-[145px] sm:h-[155px] bg-[#1E293B] overflow-hidden">
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover object-[50%_20%]"
                />

                <span className="absolute top-3.5 left-3.5 w-6 h-6 rounded-[6px] bg-[#FFC119] text-[#0B2241] text-[11.5px] font-extrabold inline-flex items-center justify-center shadow-xs">
                  {card.stepNumber}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-[#0B2241] text-[14.5px] font-extrabold leading-[1.3] mb-1.5">
                  {card.title}
                </h3>

                <p className="text-[#64748B] text-[11.5px] leading-[1.5]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom 2-Column Split: Connected Devices Checklist + Emergency Calling Warning Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Checklist Card */}
          <div className="lg:col-span-6 bg-white rounded-[18px] border border-[#E2E8F0] p-6 shadow-[0_6px_20px_rgba(11,34,65,0.04)] flex flex-col justify-between">
            <div>
              <h3 className="text-[#0B2241] text-[15px] font-extrabold leading-[1.3] mb-3.5">
                Does anything here use your line?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {CONNECTED_DEVICES.map((device) => {
                  const isSelected = selectedDevices.includes(device.id);

                  return (
                    <button
                      key={device.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleToggleDevice(device.id)}
                      className={`px-3.5 py-2.5 rounded-[8px] border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFFDF5] border-[#061A33] text-[#0B2241] shadow-2xs"
                          : "bg-[#F8FAFC] hover:bg-[#F1F5F9] border-[#E2E8F0] text-[#0B2241]"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 min-w-0">
                        <Plug
                          className="w-3.5 h-3.5 text-[#1963DD] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-[11.5px] font-bold leading-snug truncate">
                          {device.label}
                        </span>
                      </span>

                      {isSelected ? (
                        <span
                          aria-hidden="true"
                          className="w-4 h-4 rounded-full bg-[#FFC119] text-[#0B2241] inline-flex items-center justify-center shrink-0"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-[#64748B] text-[11px] leading-[1.5]">
              If yes, or you&apos;re not sure, speak to our team before making
              any changes.
            </p>
          </div>

          {/* Right Crimson Emergency Calling (999 and 112) Card */}
          <div className="lg:col-span-6 rounded-[18px] bg-gradient-to-br from-[#C81E32] to-[#A61425] p-6 sm:p-7 text-white shadow-[0_10px_24px_rgba(166,20,37,0.22)] flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle
                className="w-4 h-4 text-[#FFE4E6] shrink-0"
                aria-hidden="true"
              />
              <h3 className="text-white text-[16px] sm:text-[17px] font-extrabold leading-[1.25] tracking-[-0.01em]">
                Emergency calling (999 and 112)
              </h3>
            </div>

            <p className="text-white/95 text-[12.5px] leading-[1.6] max-w-[540px]">
              Digital phone services may not work in a power cut or broadband
              outage. Your service address is used for emergency location. Keep
              a charged mobile as a backup, and tell us if someone relies on the
              phone for safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
