"use client";

import React from "react";

interface PlanColumn {
  id: string;
  name: string;
}

interface ComparisonRow {
  attribute: string;
  values: readonly string[];
  isBadge?: boolean;
}

const PLAN_COLUMNS: readonly PlanColumn[] = [
  { id: "streamer-pro", name: "Streamer Pro" },
  { id: "rocket-pro", name: "Rocket Pro" },
  { id: "supersonic-infinity", name: "Supersonic Infinity" },
] as const;

const COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    attribute: "Monthly price",
    values: ["£42.99", "£49.99", "£63.99"],
  },
  {
    attribute: "Download speed",
    values: ["76Mbps", "209Mbps", "950Mbps"],
  },
  {
    attribute: "Upload speed",
    values: ["19Mbps", "28Mbps", "109Mbps"],
  },
  {
    attribute: "Devices",
    values: ["5–8", "5–8", "5–8"],
  },
  {
    attribute: "Contract",
    values: ["12 months", "12 months", "12 months"],
  },
  {
    attribute: "VAT basis and one-off charges",
    values: ["[to confirm]", "[to confirm]", "[to confirm]"],
    isBadge: true,
  },
] as const;

export default function PlanComparisonTable() {
  return (
    <section className="w-full bg-white py-12 px-6 sm:px-10 md:px-14">
      <div className="mx-auto max-w-[1060px]">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1D63DC] mb-2.5">
          COMPARE SIDE BY SIDE
        </p>

        {/* Main Heading */}
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] text-[#0F172A] mb-2.5">
          Differences, not guesswork
        </h2>

        {/* Subheading */}
        <p className="text-[14.5px] leading-[1.55] text-[#64748B] max-w-[490px] mb-7">
          Three example plans in identical rows. Speeds are the advertised
          download and upload figures.
        </p>

        {/* Outer Table Card Wrapper */}
        <div className="w-full overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <caption className="bg-white px-5 py-2.5 text-left text-[11px] font-medium text-[#64748B]">
                Comparison of selected plans
              </caption>
              <thead>
                <tr className="bg-[#0F2342] text-white">
                  <th
                    scope="col"
                    className="w-[29%] py-3.5 px-5 text-[12px] font-semibold tracking-[0.01em]"
                  >
                    Attribute
                  </th>
                  {PLAN_COLUMNS.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className="w-[23.66%] py-3.5 px-5 text-[12px] font-semibold tracking-[0.01em]"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.attribute} className="bg-white">
                    <th
                      scope="row"
                      className="bg-[#F8FAFC] py-3.5 px-5 text-[12.5px] font-semibold text-[#1E293B]"
                    >
                      {row.attribute}
                    </th>
                    {row.values.map((val, idx) => (
                      <td
                        key={`${row.attribute}-${PLAN_COLUMNS[idx].id}`}
                        className="py-3.5 px-5 text-[12.5px] font-normal text-[#334155]"
                      >
                        {row.isBadge ? (
                          <span className="inline-flex items-center rounded-[4px] bg-[#E8EEF5] px-2 py-0.5 text-[11.5px] font-medium text-[#475569]">
                            {val}
                          </span>
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
