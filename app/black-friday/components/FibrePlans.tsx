"use client";

import { useState } from "react";
import { Check, Tag, Star } from "lucide-react";

type Filter = "All" | "Full Fibre" | "SoGEA";

type Plan = {
  name: string;
  type: "SOGEA" | "FULL FIBRE";
  group: Exclude<Filter, "All">;
  speed: string;
  speedLabel: string;
  price: string;
  note: string;
  features: readonly string[];
  href: string;
};

const filters = ["All", "Full Fibre", "SoGEA"] as const;

const plans: readonly Plan[] = [
  {
    name: "Zippy Essential",
    type: "SOGEA",
    group: "SoGEA",
    speed: "0.5 Mbps",
    speedLabel: "Download speed",
    price: "£22.00",
    note: "Standard monthly price",
    features: [
      "Perfect for basic browsing",
      "Email and social media",
      "No usage caps",
      "UK-based support",
    ],
    href: "#",
  },
  {
    name: "Blitz Core",
    type: "FULL FIBRE",
    group: "Full Fibre",
    speed: "40/10 Mbps",
    speedLabel: "Down/up speed",
    price: "£26.25",
    note: "For 6 months, then £35.00 per month",
    features: [
      "Consistent fibre speeds",
      "Low-latency gaming",
      "Multiple HD streams",
      "Free router & installation",
    ],
    href: "#",
  },
  {
    name: "Quantum Boost",
    type: "FULL FIBRE",
    group: "Full Fibre",
    speed: "115/20 Mbps",
    speedLabel: "Down/up speed",
    price: "£32.24",
    note: "For 6 months, then £42.99 per month",
    features: [
      "Ultra-fast downloads",
      "Perfect for home offices",
      "Seamless video conferencing",
      "Advanced router included",
    ],
    href: "#",
  },
  {
    name: "Supersonic Infinity",
    type: "FULL FIBRE",
    group: "Full Fibre",
    speed: "1000/115 Mbps",
    speedLabel: "Down/up speed",
    price: "£46.49",
    note: "For 6 months, then £61.99 per month",
    features: [
      "Gigabit speeds",
      "Future-proof technology",
      "Unlimited potential",
      "White-glove service",
    ],
    href: "#",
  },
] as const;

export default function FibrePlans() {
  const [active, setActive] = useState<Filter>("All");

  const visible = plans.filter((p) => active === "All" || p.group === active);

  return (
    <section id="deals" className="w-full bg-gradient-to-b from-[#EEF3F9] to-white px-4 pb-16 pt-8 sm:px-8 lg:px-[34px]">
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0F2A4A] px-4 py-[7px] text-xs font-extrabold uppercase tracking-wider text-[#FFC21A]">
              <Star
                className="h-3 w-3 fill-[#FFC21A] text-[#FFC21A]"
                strokeWidth={0}
              />
              Black Friday Packages
            </span>

            <h2 className="mt-4 text-2xl font-extrabold leading-9 tracking-tight text-[#12365E] sm:text-3xl">
              Choose Your Perfect Fibre Plan
            </h2>
            <span className="mt-1 block h-[3px] w-[44px] rounded-full bg-gradient-to-r from-[#D0243A] to-[#FFC21A]" />
            <p className="mt-3 text-sm text-[#4B5D75]">
              Superfast broadband packages designed for modern British homes.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex w-fit items-center gap-1 rounded-full bg-[#E8EDF4] p-1 shadow-[0_2px_8px_rgba(15,42,74,0.08)]">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active === f
                    ? "bg-[#FFC21A] text-[#12365E] shadow-[0_2px_6px_rgba(255,194,26,0.5)]"
                    : "text-[#12365E] hover:bg-white/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col overflow-hidden rounded-xl border border-[#E1E7EF] bg-white shadow-[0_8px_24px_rgba(15,42,74,0.10)]"
            >
              {/* Top banner */}
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0F2A4A] to-[#1A4F82] py-[7px] text-[10px] font-extrabold uppercase tracking-wider text-[#FFC21A]">
                <Tag className="h-3 w-3" strokeWidth={2.5} />
                Black Friday Price
              </div>

              <div className="flex flex-1 flex-col items-center px-4 pb-5 pt-5">
                <h3 className="text-lg font-extrabold text-[#12365E]">
                  {plan.name}
                </h3>

                <span className="mt-2 rounded-full bg-[#E8EDF4] px-3 py-[3px] text-[10px] font-semibold uppercase tracking-wider text-[#4B5D75]">
                  {plan.type}
                </span>

                <p className="mt-3 bg-gradient-to-t from-[#FFE48A] from-40% to-transparent to-40% px-2 text-xl font-extrabold tracking-tight text-[#12365E] sm:text-[22px]">
                  {plan.speed}
                </p>
                <p className="mt-1 text-xs text-[#6B7A90]">{plan.speedLabel}</p>

                <span className="mt-3 rounded-md bg-[#D0243A] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
                  25% Off · First 6 Months
                </span>

                <p className="mt-4 text-center">
                  <span className="text-[32px] font-extrabold leading-none tracking-tight text-[#12365E]">
                    {plan.price}
                  </span>{" "}
                  <span className="text-xs text-[#6B7A90]">per month</span>
                </p>

                <div className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-lg border border-[#F6E3A6] bg-[#FFF6D8] px-3 py-2 text-center text-xs font-bold leading-4 text-[#12365E]">
                  {plan.note}
                </div>

                <ul className="mt-5 w-full space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-[#33445C] sm:text-[13px]"
                    >
                      <Check
                        className="h-3.5 w-3.5 shrink-0 text-[#1E9E5A]"
                        strokeWidth={3}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/check-my-postcode"
                className="mt-auto block bg-[#12436F] py-4 text-center text-sm font-bold text-white transition-colors hover:bg-[#0F3558]"
              >
                Choose This Package
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center">
          <a
            href="/all-plans"
            className="rounded-full border border-[#12365E] bg-white px-8 py-2 text-sm font-bold text-[#12365E] transition-colors hover:bg-[#12365E] hover:text-white"
          >
            View All
          </a>
          <p className="mt-5 max-w-[400px] text-center text-xs leading-[18px] text-[#6B7A90]">
            Black Friday pricing applies to the monthly subscription charge on
            eligible fibre packages for the first six months, standard monthly
            price applies after.
          </p>
        </div>
      </div>
    </section>
  );
}
