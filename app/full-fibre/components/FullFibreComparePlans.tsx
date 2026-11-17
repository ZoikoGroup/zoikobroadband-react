import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PLAN_COMPARISON_ROWS = [
  {
    detail: "Download speed",
    everyday: "150 Mbps",
    highDemand: "500 Mbps",
    gigabit: "1000 Mbps",
  },
  {
    detail: "Upload speed",
    everyday: "30 Mbps",
    highDemand: "75 Mbps",
    gigabit: "110 Mbps",
  },
  {
    detail: "Monthly price",
    everyday: "£29",
    highDemand: "£39",
    gigabit: "£49",
  },
  {
    detail: "Setup",
    everyday: "£0",
    highDemand: "£0",
    gigabit: "£0",
  },
  {
    detail: "Contract term",
    everyday: "24 months",
    highDemand: "24 months",
    gigabit: "24 months",
  },
  {
    detail: "Router",
    everyday: "Included",
    highDemand: "Included",
    gigabit: "Included",
  },
  {
    detail: "Total (24 mo)",
    everyday: "£696",
    highDemand: "£936",
    gigabit: "£1176",
  },
] as const;

export default function FullFibreComparePlans() {
  return (
    <section
      id="compare-plans"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              COMPARE PLANS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Compare Full Fibre plans
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The same details, side by side. Prices and speeds are illustrative
            until you check your address — then they&apos;re confirmed for your
            property.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-xs mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A3A66] text-white">
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-1/4">
                    Detail
                  </th>
                  <th className="py-4 px-6 w-1/4">
                    <div className="text-sm font-bold text-white">
                      Everyday Fibre
                    </div>
                    <div className="text-[11px] font-normal text-blue-200 mt-0.5">
                      Full Fibre (FTTP)
                    </div>
                  </th>
                  <th className="py-4 px-6 w-1/4">
                    <div className="text-sm font-bold text-white">
                      High Demand
                    </div>
                    <div className="text-[11px] font-normal text-blue-200 mt-0.5">
                      Full Fibre (FTTP)
                    </div>
                  </th>
                  <th className="py-4 px-6 w-1/4">
                    <div className="text-sm font-bold text-white">
                      Gigabit / Premium
                    </div>
                    <div className="text-[11px] font-normal text-blue-200 mt-0.5">
                      Full Fibre (FTTP)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {PLAN_COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.detail}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-500 font-medium">
                      {row.detail}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#0E2F52]">
                      {row.everyday}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#0E2F52]">
                      {row.highDemand}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#0E2F52]">
                      {row.gigabit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <Link
            href="/compare"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#0E2F52] border border-gray-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs group"
          >
            <span>Open full Compare Plans &amp; Speeds</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
