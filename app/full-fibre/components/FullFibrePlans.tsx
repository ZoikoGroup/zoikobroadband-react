"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

interface FullFibrePlan {
  id: string;
  name: string;
  badge: string;
  popularTag?: string;
  description: string;
  monthlyPrice: number;
  termMonths: number;
  downloadSpeed: string;
  uploadSpeed: string;
  setupCost: string;
  totalCost: string;
}

const PLANS_DATA: FullFibrePlan[] = [
  {
    id: "everyday-fibre",
    name: "Everyday Fibre",
    badge: "Full Fibre (FTTP)",
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
    badge: "Full Fibre (FTTP)",
    popularTag: "Most households",
    description: "For busy, device-heavy homes.",
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

export default function FullFibrePlans() {
  const [sortBy, setSortBy] = useState("Monthly cost (low to high)");

  return (
    <section
      id="plans"
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
            These sample Full Fibre (FTTP) plans show how offers appear. Check
            your address above to see the plans, prices and speeds that can
            actually be offered to you. Prices include VAT; speeds are
            estimates, not guarantees.
          </p>
        </div>

        {/* Results Count & Sorting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0E2F52] tracking-tight">
              {PLANS_DATA.length} plans
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Illustrative sample
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
              <option value="Monthly cost (low to high)">
                Monthly cost (low to high)
              </option>
              <option value="Speed: High to Low">Speed: High to Low</option>
            </select>
          </div>
        </div>

        {/* 3-Column Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANS_DATA.map((plan) => {
            const isFeatured = Boolean(plan.popularTag);
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  isFeatured
                    ? "border-2 border-[#F59E0B] shadow-md ring-1 ring-[#F59E0B]/20"
                    : "border border-gray-200/90 shadow-xs hover:border-gray-300"
                }`}
              >
                {plan.popularTag && (
                  <div className="absolute -top-3.5 left-6 bg-[#F5B82E] text-[#0E2F52] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {plan.popularTag}
                  </div>
                )}

                <div>
                  {/* Badge */}
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#B45309]">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B45309] mr-1.5 align-middle" />
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
                  <div className="space-y-3 mb-8 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Download (est.)</span>
                      <span className="font-bold text-[#0E2F52]">
                        {plan.downloadSpeed}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Upload (est.)</span>
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

                <div className="space-y-3">
                  {/* Order CTA */}
                  <Link
                    href="/check-availability"
                    className="w-full block text-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-xs py-3.5 rounded-xl transition-colors shadow-xs"
                  >
                    Check availability to order
                  </Link>

                  {/* View Plan Details CTA */}
                  <Link
                    href="/full-fibre"
                    className="w-full block text-center bg-white hover:bg-gray-50 text-[#0E2F52] border border-gray-200 font-bold text-xs py-3.5 rounded-xl transition-colors"
                  >
                    View plan details
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
