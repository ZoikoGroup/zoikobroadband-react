"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export default function BusinessBroadbandCTA() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postcode.trim()) return;

    setLoading(true);
    try {
      // Simulate postcode verification redirect or check
      await new Promise((resolve) => setTimeout(resolve, 800));
      window.location.hash = "#your-address";
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Dark Blue Container Card */}
        <div className="relative rounded-3xl bg-[#0B355F] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl text-center">
          {/* Subtle decorative background arc */}
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-white/10"
            aria-hidden="true"
          />

          {/* Inner Content Wrapper */}
          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Eyebrow Tag */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="h-[2px] w-8 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                READY TO GET YOUR BUSINESS CONNECTED?
              </span>
              <span className="h-[2px] w-8 bg-[#F5B82E]" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight mb-4 leading-tight">
              Check business broadband at your address
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8">
              Enter your postcode to replace the illustrative set with the
              business plans that can actually be offered at your premises —
              with confirmed prices, speeds and options. Or speak to our
              business team for a tailored quote.
            </p>

            {/* Postcode Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-lg mx-auto">
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. SW1A 1AA"
                  aria-label="Enter UK postcode"
                  className="flex-1 bg-white text-[#0E2F52] placeholder-gray-400 text-sm font-medium px-4 py-3.5 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F5B82E]"
                />

                <button
                  type="submit"
                  disabled={loading || !postcode.trim()}
                  className="bg-[#F5B82E] hover:bg-amber-400 disabled:opacity-60 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shrink-0 cursor-pointer inline-flex items-center justify-center group shadow-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <span>Check Availability</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Secondary Action Button */}
            <div className="mb-6">
              <Link
                href="#tailored-quote"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Speak to Business / Request a Tailored Quote</span>
              </Link>
            </div>

            {/* Bottom Footnote */}
            <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
              Checking availability doesn&apos;t create an order. Prices shown
              before a check are illustrative and exclude VAT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
