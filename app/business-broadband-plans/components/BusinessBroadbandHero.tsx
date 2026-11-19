"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export default function BusinessBroadbandHero() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postcode.trim()) return;

    setLoading(true);
    try {
      // Simulate address lookup check
      await new Promise((resolve) => setTimeout(resolve, 800));
      window.location.hash = "#your-address";
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-[640px] bg-gradient-to-r from-[#0B2545] to-[#13386B] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/business/3.png"
        alt="Business colleagues collaborating in a modern office workspace"
        fill
        className="object-cover object-center opacity-20"
        priority
      />

      {/* Linear Gradient Overlay matching the specified stop colors */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                BUSINESS BROADBAND
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.1]">
              Find business broadband for your workplace.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Compare eligible options for your address and find a connection
              that suits how your business works.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#your-address"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-7 py-4 rounded-xl transition-colors group shadow-md"
              >
                <span>Check Business Availability</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#tailored-quote"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/40 font-semibold text-sm px-7 py-4 rounded-xl transition-colors"
              >
                <span>Request a Tailored Quote</span>
              </Link>
            </div>

            {/* Bottom Note */}
            <p className="text-xs text-slate-300 pt-2">
              Business plans depend on your address and final eligibility
              checks.
            </p>
          </div>

          {/* Right Column: Address Lookup White Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-[#0E2F52] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <div className="mb-6">
                <h2 className="text-xl font-extrabold text-[#0E2F52] mb-2">
                  Check your business premises
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Enter your postcode, then choose your exact unit. Offers
                  appear only for the address you select.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="businessPostcode"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Business postcode
                  </label>
                  <input
                    id="businessPostcode"
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. SW1A 1AA"
                    className="w-full bg-white text-[#0E2F52] placeholder-gray-400 text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !postcode.trim()}
                  className="w-full bg-[#0A3A66] hover:bg-[#0E2F52] disabled:opacity-60 text-white font-bold text-sm py-4 rounded-xl transition-colors inline-flex items-center justify-center cursor-pointer shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Finding address...</span>
                    </>
                  ) : (
                    <span>Find my address</span>
                  )}
                </button>
              </form>

              {/* Progress Steps Indicator */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-gray-100 text-[11px] font-semibold">
                <div>
                  <div className="text-[#0A3A66] mb-1">1 · Postcode</div>
                  <div className="h-1 w-full bg-[#0A3A66] rounded-full" />
                </div>
                <div>
                  <div className="text-gray-400 mb-1">2 · Select unit</div>
                  <div className="h-1 w-full bg-gray-200 rounded-full" />
                </div>
                <div>
                  <div className="text-gray-400 mb-1">3 · See options</div>
                  <div className="h-1 w-full bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
