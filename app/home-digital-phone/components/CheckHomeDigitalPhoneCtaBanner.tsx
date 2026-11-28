"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const SAMPLE_ADDRESSES = [
  "10 Downing Street, London",
  "22 Victoria Street, London",
  "45 King Street, Manchester",
] as const;

export default function CheckHomeDigitalPhoneCtaBanner() {
  const [postcode, setPostcode] = useState("");
  const [statusText, setStatusText] = useState<string | null>(null);
  const [resolvedAddresses, setResolvedAddresses] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = postcode.trim().toUpperCase();

    if (!cleaned) {
      setResolvedAddresses([]);
      setStatusText(
        "Enter a UK postcode (for example, SW1A 1AA) to check Home Digital Phone options at your address.",
      );
      return;
    }

    const candidates = SAMPLE_ADDRESSES.map(
      (street, idx) =>
        `${street}, ${idx === 0 ? cleaned : `${cleaned.slice(0, 4)} ${idx + 1}AA`}`,
    );

    setResolvedAddresses(candidates);
    setStatusText(
      `Showing sample address matches for ${cleaned}. Checking availability does not create an order — exact VAT-inclusive pricing is confirmed per address.`,
    );
  };

  return (
    <section
      id="ready-to-look"
      aria-label="Check Home Digital Phone availability at your address"
      className="w-full bg-white text-white font-sans antialiased overflow-x-hidden py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-6 py-14 sm:px-12 sm:py-16 text-center shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #072A4E 0%, #0A3A66 55%, #072544 100%)",
          }}
        >
          {/* Subtle Decorative Outline Circle on Bottom-Right */}
          <div
            className="pointer-events-none select-none absolute -bottom-24 -right-12 w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-white/10"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Eyebrow Tag */}
            <div className="flex items-center justify-center space-x-2.5 mb-4">
              <span className="h-[2px] w-6 bg-[#F5B82E]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                READY TO LOOK?
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Check Home Digital
              <br />
              Phone at your address
            </h2>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-200/90 leading-relaxed mb-8">
              See what can be offered where you live, with prices that include
              VAT and are confirmed per address. Keep your number with a porting
              check, and sort out any care or alarm devices before you switch.
            </p>

            {/* Inline Postcode Input + Amber CTA Button */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-lg mx-auto mb-6"
            >
              <label htmlFor="cta-postcode-input" className="sr-only">
                UK Postcode
              </label>
              <input
                id="cta-postcode-input"
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="e.g. SW1A 1AA"
                autoComplete="postal-code"
                className="flex-1 bg-white text-[#0E2F52] placeholder:text-gray-400 text-xs sm:text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F5B82E] shadow-xs"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors shadow-sm cursor-pointer shrink-0 group"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Dynamic Lookup Feedback */}
            {statusText && (
              <div
                role="status"
                aria-live="polite"
                className="max-w-lg mx-auto mb-5 bg-[#072340]/90 border border-white/15 rounded-2xl px-4 py-3.5 text-left text-xs text-slate-200"
              >
                <p className="leading-relaxed">{statusText}</p>
                {resolvedAddresses.length > 0 && (
                  <ul className="mt-2.5 pt-2.5 border-t border-white/10 space-y-1.5">
                    {resolvedAddresses.map((addr) => (
                      <li key={addr} className="text-slate-100 font-medium">
                        {addr}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Informational Footnote */}
            <p className="text-[11px] sm:text-xs text-slate-300/80 max-w-md mx-auto leading-relaxed">
              Checking availability doesn&apos;t create an order. Prices shown
              before a check are illustrative and include VAT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
