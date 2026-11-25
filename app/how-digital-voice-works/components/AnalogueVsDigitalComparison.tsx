import React from "react";

const COMPARISON_ROWS = [
  {
    detail: "Carries calls over",
    analogue: "A dedicated phone line",
    digital: "Your broadband connection",
  },
  {
    detail: "Needs power?",
    analogue: "Worked without mains power",
    digital: "Needs power and broadband to work",
  },
  {
    detail: "Your handset",
    analogue: "Standard phone",
    digital: "Many handsets still work, via the router or an adapter",
  },
  {
    detail: "Features",
    analogue: "Basic calling features",
    digital: "Can offer more features, where supported",
  },
  {
    detail: "Emergency calls",
    analogue: "Usually worked in a power cut",
    digital: "May not work in a power cut — keep a backup",
  },
] as const;

export default function AnalogueVsDigitalComparison() {
  return (
    <section
      id="analogue-vs-digital"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              ANALOGUE VS DIGITAL
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            What changes, and what stays the same
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Most of calling feels the same. The main differences are what the
            call travels over, and what it depends on.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 pb-4 px-3 border-b border-gray-200/80 text-xs sm:text-sm font-bold text-[#0E2F52]">
              <div className="col-span-3">Detail</div>
              <div className="col-span-4">Analogue line (old)</div>
              <div className="col-span-5">Digital voice</div>
            </div>

            {/* Data Rows */}
            <div className="divide-y divide-gray-200/70 border-b border-gray-200/70">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.detail}
                  className="grid grid-cols-12 gap-4 py-4 px-3 text-xs sm:text-sm items-center hover:bg-slate-50/70 transition-colors"
                >
                  <div className="col-span-3 font-medium text-gray-500">
                    {row.detail}
                  </div>
                  <div className="col-span-4 font-bold text-[#0E2F52]">
                    {row.analogue}
                  </div>
                  <div className="col-span-5 font-bold text-[#0E2F52]">
                    {row.digital}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footnote */}
        <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
          Analogue (PSTN) services are being retired across the UK — digital
          voice is the modern replacement.
        </p>
      </div>
    </section>
  );
}
