import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const SETUP_NAV_ANCHORS = [
  { label: "Safety first", href: "#safety-first" },
  { label: "Your setup", href: "#your-setup" },
  { label: "Prepare", href: "#prepare" },
  { label: "Install method", href: "#install-method" },
  { label: "Verify", href: "#verify" },
  { label: "Get help", href: "#get-help" },
  { label: "FAQs", href: "#faqs" },
] as const;

export default function InstallationSetupNavAndAlert() {
  return (
    <div className="w-full bg-white text-[#0E2F52] font-sans antialiased">
      {/* Sticky Sub-navigation Bar */}
      <nav
        aria-label="Installation and setup sections"
        className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-30"
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:justify-around gap-6 overflow-x-auto py-4 no-scrollbar">
            {SETUP_NAV_ANCHORS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs sm:text-sm font-bold text-[#0E2F52] hover:text-[#D97706] whitespace-nowrap transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Setup Safety Alert Banner */}
      <section
        id="safety-first"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12"
      >
        <div className="bg-[#FDF4F2] border border-[#F3D5CE] rounded-2xl p-6 sm:p-7 flex items-start gap-4">
          {/* Warning Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#FAE6E1] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="font-extrabold text-base text-[#0E2F52] mb-1.5 leading-snug">
              Read this before you set anything up
            </h2>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Digital voice needs power and broadband, so it may not work in a
              power cut — including for 999. Keep a working backup such as a
              charged mobile, and never call 999 to test. If anyone relies on
              the line for a{" "}
              <strong className="font-bold text-[#0E2F52]">
                care alarm, telecare, medical alert, lift or payment device
              </strong>
              , don&apos;t set up or disconnect anything until it&apos;s checked
              — get an{" "}
              <Link
                href="#assisted-review"
                className="font-bold text-[#0E2F52] underline decoration-[#0E2F52]/60 hover:decoration-[#0E2F52] transition-colors"
              >
                assisted review
              </Link>{" "}
              first and tell both your provider and the device supplier.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
