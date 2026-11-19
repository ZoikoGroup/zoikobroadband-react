"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

interface BusinessBroadbandPlan {
  id: string;
  technology: "Full Fibre" | "Part Fibre";
  badge: string;
  name: string;
  popularTag?: string;
  description: string;
  monthlyPrice: number;
  termMonths: number;
  downloadMbps: number;
  uploadMbps: number;
  staticIp: string;
  setupCost: string;
  totalCost: string;
}

const BUSINESS_PLANS_DATA: BusinessBroadbandPlan[] = [
  {
    id: "business-essential",
    technology: "Part Fibre",
    badge: "Part Fibre (SOGEA)",
    name: "Business Essential",
    description: "Reliable everyday connectivity for very small setups.",
    monthlyPrice: 28,
    termMonths: 24,
    downloadMbps: 36,
    uploadMbps: 8,
    staticIp: "Add-on",
    setupCost: "£0",
    totalCost: "£672",
  },
  {
    id: "business-fibre",
    technology: "Full Fibre",
    badge: "Full Fibre (FTTP)",
    name: "Business Fibre",
    popularTag: "Popular",
    description: "Full fibre for small offices and busy teams.",
    monthlyPrice: 35,
    termMonths: 24,
    downloadMbps: 300,
    uploadMbps: 50,
    staticIp: "Available",
    setupCost: "£0",
    totalCost: "£840",
  },
  {
    id: "business-fibre-plus",
    technology: "Full Fibre",
    badge: "Full Fibre (FTTP)",
    name: "Business Fibre Plus",
    description: "More speed and upload for heavier use.",
    monthlyPrice: 49,
    termMonths: 24,
    downloadMbps: 500,
    uploadMbps: 75,
    staticIp: "Included",
    setupCost: "£0",
    totalCost: "£1176",
  },
  {
    id: "business-gigabit",
    technology: "Full Fibre",
    badge: "Full Fibre (FTTP)",
    name: "Business Gigabit",
    description: "Top-tier headroom for demanding sites.",
    monthlyPrice: 75,
    termMonths: 24,
    downloadMbps: 1000,
    uploadMbps: 200,
    staticIp: "Included",
    setupCost: "£0",
    totalCost: "£1800",
  },
];

export default function BusinessBroadbandPlans() {
  const [techFilter, setTechFilter] = useState<
    "All" | "Full Fibre" | "Part Fibre"
  >("All");
  const [maxPrice, setMaxPrice] = useState<string>("Any price");
  const [minSpeed, setMinSpeed] = useState<string>("Any speed");
  const [contractTerm, setContractTerm] = useState<string>("Any term");
  const [sortBy, setSortBy] = useState<string>("Recommended");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredAndSortedPlans = useMemo(() => {
    const filtered = BUSINESS_PLANS_DATA.filter((plan) => {
      if (techFilter !== "All" && plan.technology !== techFilter) return false;
      if (maxPrice !== "Any price") {
        const limit = Number(maxPrice);
        if (plan.monthlyPrice > limit) return false;
      }
      if (minSpeed !== "Any speed") {
        const min = Number(minSpeed);
        if (plan.downloadMbps < min) return false;
      }
      if (contractTerm !== "Any term") {
        const term = Number(contractTerm);
        if (plan.termMonths !== term) return false;
      }
      return true;
    });

    if (sortBy === "Monthly cost (low to high)") {
      return [...filtered].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
    }
    if (sortBy === "Monthly cost (high to low)") {
      return [...filtered].sort((a, b) => b.monthlyPrice - a.monthlyPrice);
    }
    if (sortBy === "Speed (high to low)") {
      return [...filtered].sort((a, b) => b.downloadMbps - a.downloadMbps);
    }
    return filtered;
  }, [techFilter, maxPrice, minSpeed, contractTerm, sortBy]);

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
              {filteredAndSortedPlans.length} plans
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Illustrative sample · ex VAT
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#0E2F52]">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort plans by"
              className="bg-white text-[#0E2F52] text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
            >
              <option value="Recommended">Recommended</option>
              <option value="Monthly cost (low to high)">
                Monthly cost (low to high)
              </option>
              <option value="Monthly cost (high to low)">
                Monthly cost (high to low)
              </option>
              <option value="Speed (high to low)">Speed (high to low)</option>
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 mb-10 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Technology Segmented Control */}
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                TECHNOLOGY
              </span>
              <div className="inline-flex rounded-xl bg-[#F5F8FC] p-1 w-full">
                {(["All", "Full Fibre", "Part Fibre"] as const).map((tab) => {
                  const isActive = techFilter === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setTechFilter(tab)}
                      className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#0A3A66] text-white shadow-xs"
                          : "text-[#0E2F52] hover:bg-gray-200/60"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Monthly Price */}
            <div>
              <label
                htmlFor="business-filter-max-price"
                className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2"
              >
                MAX MONTHLY PRICE
              </label>
              <select
                id="business-filter-max-price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-white text-[#0E2F52] text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
              >
                <option value="Any price">Any price</option>
                <option value="30">Up to £30/mo</option>
                <option value="40">Up to £40/mo</option>
                <option value="50">Up to £50/mo</option>
                <option value="80">Up to £80/mo</option>
              </select>
            </div>

            {/* Minimum Speed */}
            <div>
              <label
                htmlFor="business-filter-min-speed"
                className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2"
              >
                MINIMUM SPEED
              </label>
              <select
                id="business-filter-min-speed"
                value={minSpeed}
                onChange={(e) => setMinSpeed(e.target.value)}
                className="w-full bg-white text-[#0E2F52] text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
              >
                <option value="Any speed">Any speed</option>
                <option value="30">30 Mbps+</option>
                <option value="300">300 Mbps+</option>
                <option value="500">500 Mbps+</option>
                <option value="1000">1000 Mbps+</option>
              </select>
            </div>

            {/* Contract Term */}
            <div>
              <label
                htmlFor="business-filter-contract-term"
                className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2"
              >
                CONTRACT TERM
              </label>
              <select
                id="business-filter-contract-term"
                value={contractTerm}
                onChange={(e) => setContractTerm(e.target.value)}
                className="w-full bg-white text-[#0E2F52] text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
              >
                <option value="Any term">Any term</option>
                <option value="24">24 months</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4-Column Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredAndSortedPlans.map((plan) => {
            const isFeatured = Boolean(plan.popularTag);
            const isPartFibre = plan.technology === "Part Fibre";
            const isCompared = selectedForCompare.includes(plan.id);

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-6 flex flex-col justify-between transition-all ${
                  isFeatured
                    ? "border-2 border-[#F59E0B] shadow-md ring-1 ring-[#F59E0B]/20"
                    : "border border-gray-200/90 shadow-xs hover:border-gray-300"
                }`}
              >
                {plan.popularTag && (
                  <div className="absolute -top-3.5 left-5 bg-[#F5B82E] text-[#0E2F52] text-[11px] font-extrabold px-3 py-1 rounded-full tracking-wide shadow-xs">
                    {plan.popularTag}
                  </div>
                )}

                <div>
                  {/* Technology Badge */}
                  <div className="mb-3">
                    <span
                      className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        isPartFibre
                          ? "bg-[#FEF3C7] text-[#B45309]"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                          isPartFibre ? "bg-[#D97706]" : "bg-emerald-600"
                        }`}
                      />
                      {plan.badge}
                    </span>
                  </div>

                  {/* Plan Title & Description */}
                  <h3 className="font-bold text-lg text-[#0E2F52] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 min-h-[32px]">
                    {plan.description}
                  </p>

                  {/* Pricing Block */}
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold text-[#0E2F52]">
                        £{plan.monthlyPrice}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        /mo ex VAT
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      {plan.termMonths}-month term · ex VAT · sample
                    </p>
                  </div>

                  {/* Specs List */}
                  <div className="space-y-2.5 mb-6 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Download</span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.downloadMbps} Mbps
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Upload</span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.uploadMbps} Mbps
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Static IP</span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.staticIp}
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

                <div className="space-y-3 pt-2">
                  {/* Add to Compare Checkbox */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => toggleCompare(plan.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#0A3A66] focus:ring-[#0A3A66] cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-[#0E2F52]">
                      Add to compare
                    </span>
                  </label>

                  {/* Order CTA */}
                  <Link
                    href="#your-address"
                    className="w-full block text-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-xs py-3.5 rounded-xl transition-colors shadow-xs"
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
