import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COMPARISON_ROWS = [
  {
    detail: "Access path",
    partFibre: "Fibre to the street cabinet, copper for the final section",
    fullFibre: "Fibre all the way to the premises",
  },
  {
    detail: "Fibre to your property",
    partFibre: "No — copper for the last stretch",
    fullFibre: "Yes, where provisioned",
  },
  {
    detail: "Speed description",
    partFibre: "Can be more line-dependent; estimates vary by property",
    fullFibre: "Typically supports the highest available speeds",
  },
  {
    detail: "Availability",
    partFibre: "Common where full fibre isn't yet available",
    fullFibre: "Where the network has been built to your property",
  },
  {
    detail: "Installation",
    partFibre: "Often self-install; engineer visit where needed",
    fullFibre: "May need an engineer and an ONT",
  },
  {
    detail: "Voice / phone",
    partFibre: "Broadband access only — calling isn't included by default",
    fullFibre: "Broadband access only — calling isn't included by default",
  },
] as const;

export default function PartFibreComparisonTable() {
  return (
    <section
      id="sogea-vs-full-fibre"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              SOGEA VS FULL FIBRE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Part Fibre and Full Fibre, compared
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            They use different connection designs. This isn&apos;t a
            &quot;best&quot; ranking — the right one depends on what&apos;s
            available at your address and what you need.
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
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-3/8">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#F5B82E] mr-2 align-middle" />
                    Part Fibre (SOGEA)
                  </th>
                  <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider w-3/8">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 align-middle" />
                    Full Fibre (FTTP)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.detail}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-[#0E2F52]">
                      {row.detail}
                    </td>
                    <td className="py-4 px-6 text-gray-600 leading-relaxed">
                      {row.partFibre}
                    </td>
                    <td className="py-4 px-6 text-gray-600 leading-relaxed">
                      {row.fullFibre}
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
            href="/full-fibre"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#0E2F52] border border-gray-200 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shadow-xs group"
          >
            <span>Explore Full Fibre Broadband</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
