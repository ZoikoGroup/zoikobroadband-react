"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info, Check } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  tech: "Part Fibre (SOGEA)" | "Full Fibre (FTTP)";
  badge?: string;
  description: string;
  monthlyPrice: number;
  termMonths: number;
  downloadSpeed: string;
  uploadSpeed: string;
  setupCost: string;
  totalCost: string;
}

const PLANS_DATA: Plan[] = [
  {
    id: "entry-value",
    name: "Entry / Value",
    tech: "Part Fibre (SOGEA)",
    badge: "Part Fibre (SOGEA)",
    description: "Part fibre (SOGEA) or verified entry tier.",
    monthlyPrice: 25,
    termMonths: 24,
    downloadSpeed: "36 Mbps",
    uploadSpeed: "8 Mbps",
    setupCost: "£0",
    totalCost: "£600",
  },
  {
    id: "everyday-fibre",
    name: "Everyday Fibre",
    tech: "Full Fibre (FTTP)",
    badge: "Most households",
    description: "Full fibre for most households.",
    monthlyPrice: 29,
    termMonths: 24,
    downloadSpeed: "150 Mbps",
    uploadSpeed: "30 Mbps",
    setupCost: "£0",
    totalCost: "£696",
  },
  {
    id: "high-demand",
    name: "High Demand",
    tech: "Full Fibre (FTTP)",
    badge: "Full Fibre (FTTP)",
    description: "Full fibre for busy, device-heavy homes.",
    monthlyPrice: 39,
    termMonths: 24,
    downloadSpeed: "500 Mbps",
    uploadSpeed: "75 Mbps",
    setupCost: "£0",
    totalCost: "£936",
  },
  {
    id: "gigabit-premium",
    name: "Gigabit / Premium",
    tech: "Full Fibre (FTTP)",
    badge: "Full Fibre (FTTP)",
    description: "The most headroom, for heavy users.",
    monthlyPrice: 49,
    termMonths: 24,
    downloadSpeed: "1000 Mbps",
    uploadSpeed: "110 Mbps",
    setupCost: "£0",
    totalCost: "£1176",
  },
];

export default function ComparePlansGrid() {
  const [techFilter, setTechFilter] = useState<
    "All" | "Full Fibre" | "Part Fibre"
  >("All");
  const [priceFilter, setPriceFilter] = useState("Any price");
  const [speedFilter, setSpeedFilter] = useState("Any speed");
  const [termFilter, setTermFilter] = useState("Any term");
  const [sortBy, setSortBy] = useState("Recommended");
  const [compareIds, setCompareIds] = useState<Record<string, boolean>>({});

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredPlans = PLANS_DATA.filter((plan) => {
    if (techFilter === "Full Fibre" && plan.tech !== "Full Fibre (FTTP)")
      return false;
    if (techFilter === "Part Fibre" && plan.tech !== "Part Fibre (SOGEA)")
      return false;
    return true;
  });

  return (
    <section
      id="compare-plans"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Notice Banner */}
        <div className="relative bg-[#FFFBEB]/60 border border-[#F0B429] border-l-4 border-l-[#F0B429] rounded-2xl p-5 sm:p-6 mb-10 flex items-start gap-4 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-[#0E2F52]">Illustrative example.</strong>{" "}
            These sample plans show how the comparison works. Check your address
            above to see the plans, prices and speeds that can actually be
            offered to you. Prices include VAT; total cost is the sample monthly
            price over the contract term.
          </p>
        </div>

        {/* Results Count & Sorting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2F52] tracking-tight">
              {filteredPlans.length} plans
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Illustrative sample for layout
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Sort by
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-[#0E2F52] text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
            >
              <option value="Recommended">Recommended</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Speed: High to Low">Speed: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div>
            <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Technology
            </span>
            <div className="inline-flex rounded-xl bg-gray-100 p-1">
              {(["All", "Full Fibre", "Part Fibre"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTechFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    techFilter === tab
                      ? "bg-white text-[#0E2F52] shadow-xs"
                      : "text-gray-600 hover:text-[#0E2F52]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="price-filter"
              className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2"
            >
              Max Monthly Price
            </label>
            <select
              id="price-filter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full bg-white text-[#0E2F52] text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
            >
              <option value="Any price">Any price</option>
              <option value="Under £30">Under £30</option>
              <option value="Under £40">Under £40</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="speed-filter"
              className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2"
            >
              Minimum Speed
            </label>
            <select
              id="speed-filter"
              value={speedFilter}
              onChange={(e) => setSpeedFilter(e.target.value)}
              className="w-full bg-white text-[#0E2F52] text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
            >
              <option value="Any speed">Any speed</option>
              <option value="50 Mbps+">50 Mbps+</option>
              <option value="100 Mbps+">100 Mbps+</option>
              <option value="500 Mbps+">500 Mbps+</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="term-filter"
              className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2"
            >
              Contract Term
            </label>
            <select
              id="term-filter"
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
              className="w-full bg-white text-[#0E2F52] text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
            >
              <option value="Any term">Any term</option>
              <option value="24 months">24 months</option>
            </select>
          </div>
        </div>

        {/* 4-Column Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan) => {
            const isCompared = Boolean(compareIds[plan.id]);
            return (
              <div
                key={plan.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-all"
              >
                <div>
                  {/* Badge */}
                  <div className="mb-3">
                    <span
                      className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        plan.badge === "Most households"
                          ? "bg-[#FEF3C7] text-[#B45309]"
                          : "bg-[#F1F5F9] text-[#475569]"
                      }`}
                    >
                      {plan.badge === "Most households" && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B45309] mr-1.5 align-middle" />
                      )}
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[#0E2F52] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing Block */}
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold text-[#0E2F52]">
                        £{plan.monthlyPrice}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        / month
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      {plan.termMonths}-month term — incl. VAT — sample
                    </p>
                  </div>

                  {/* Specs List */}
                  <div className="space-y-3 mb-6 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Download</span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.downloadSpeed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Upload</span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.uploadSpeed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Setup</span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.setupCost}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">
                        Total ({plan.termMonths} mo)
                      </span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.totalCost}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Compare Checkbox */}
                  <button
                    type="button"
                    onClick={() => toggleCompare(plan.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 hover:border-gray-300 text-xs font-semibold text-[#0E2F52] transition-colors mb-3 cursor-pointer"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isCompared
                          ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {isCompared && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>Add to compare</span>
                  </button>

                  {/* Order CTA */}
                  <Link
                    href="/check-availability"
                    className="w-full block text-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-xs"
                  >
                    Check availability to order
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
