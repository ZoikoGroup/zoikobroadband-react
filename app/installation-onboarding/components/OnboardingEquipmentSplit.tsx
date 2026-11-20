"use client";

import React from "react";

type ProviderPillTone = "provider" | "engineer" | "customer" | "agreed";

interface EquipmentRow {
  readonly id: string;
  readonly item: string;
  readonly detail: string;
  readonly who: string;
  readonly tone: ProviderPillTone;
}

const EQUIPMENT_ROWS = [
  {
    id: "router",
    item: "Router",
    detail: "Provided as confirmed in your order",
    who: "Zoiko (as ordered)",
    tone: "provider",
  },
  {
    id: "ont",
    item: "Optical network terminal (ONT)",
    detail: "For full fibre, installed by an engineer where needed",
    who: "Engineer",
    tone: "engineer",
  },
  {
    id: "power-socket",
    item: "Power socket near the equipment",
    detail: "A safe, available socket",
    who: "You",
    tone: "customer",
  },
  {
    id: "equipment-space",
    item: "Space for equipment",
    detail: "Dry, ventilated and out of the way",
    who: "You",
    tone: "customer",
  },
  {
    id: "internal-cabling",
    item: "Cabling inside your premises",
    detail: "Discussed with you; extra works may need a quote",
    who: "Agreed with you",
    tone: "agreed",
  },
  {
    id: "wifi-devices-network",
    item: "Your Wi-Fi devices and network",
    detail: "Laptops, phones, switches and printers",
    who: "You",
    tone: "customer",
  },
] as const satisfies readonly EquipmentRow[];

function getPillClasses(tone: ProviderPillTone): string {
  switch (tone) {
    case "provider":
      return "bg-[#DBEAFE] text-[#1E40AF]";
    case "engineer":
      return "bg-[#E2E8F0] text-[#334155]";
    case "customer":
      return "bg-[#FFC119] text-[#0B2241]";
    case "agreed":
      return "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]";
  }
}

export default function OnboardingEquipmentSplit() {
  return (
    <section
      id="equipment"
      className="w-full bg-white py-16 md:py-20 font-sans antialiased"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left Column: Heading, Copy & Paired Media */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-[5px] bg-[#FFC119] text-[#0B2241] text-[11px] font-extrabold leading-tight">
                05
              </span>
              <span className="text-[#1963DD] text-[12px] font-bold tracking-[0.12em] uppercase">
                EQUIPMENT
              </span>
            </div>

            <h2 className="text-[#0B2241] text-[36px] sm:text-[42px] font-extrabold leading-[1.12] tracking-[-0.02em] mb-3.5">
              Who provides what.
            </h2>

            <p className="text-[#475569] text-[15px] leading-[1.55] max-w-[420px] mb-7">
              A clear split of responsibilities. Exact equipment is confirmed in
              your order.
            </p>

            {/* Two Side-by-Side Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="w-full aspect-[4/3.15] rounded-[14px] overflow-hidden bg-[#1E293B]">
                <img
                  src="/Images/onb/7.png"
                  alt="Laptop, tablet, smartphone and wireless headphones with vibrant screen display"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="w-full aspect-[4/3.15] rounded-[14px] overflow-hidden bg-[#1E293B]">
                <img
                  src="/Images/onb/8.png"
                  alt="Overhead view of wooden desk with coffee cup, glasses, laptop edge and small plant"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Div-Based Responsibility Matrix */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[16px] overflow-hidden border border-[#E2E8F0] shadow-[0_6px_22px_rgba(11,34,65,0.04)]">
              {/* Dark Navy Header Bar */}
              <div className="grid grid-cols-12 bg-[#061A33] px-5 sm:px-6 py-3.5 text-white text-[10.5px] font-bold tracking-[0.1em] uppercase">
                <div className="col-span-8 sm:col-span-9">ITEM</div>
                <div className="col-span-4 sm:col-span-3 text-right">WHO</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#E2E8F0]">
                {EQUIPMENT_ROWS.map((row, index) => (
                  <div
                    key={row.id}
                    className={`grid grid-cols-12 gap-3 px-5 sm:px-6 py-4 items-center transition-colors ${
                      index % 2 === 1 ? "bg-[#F8FAFC]" : "bg-white"
                    }`}
                  >
                    <div className="col-span-8 sm:col-span-9 pr-2">
                      <h3 className="text-[#0B2241] text-[13.5px] font-bold leading-[1.35] mb-0.5">
                        {row.item}
                      </h3>
                      <p className="text-[#64748B] text-[11.5px] leading-[1.45]">
                        {row.detail}
                      </p>
                    </div>

                    <div className="col-span-4 sm:col-span-3 flex justify-end">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-[6px] text-[11px] font-bold leading-tight text-center ${getPillClasses(
                          row.tone,
                        )}`}
                      >
                        {row.who}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
