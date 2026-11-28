"use client";

import React, { useState } from "react";

const MOCK_ADDRESS_MATCHES = [
  "10 Downing Street, London, SW1A 2AA",
  "11 Downing Street, London, SW1A 2AB",
  "22 Victoria Street, London, SW1H 0ET",
] as const;

export default function HomeDigitalPhoneAvailabilityCheck() {
  const [postcode, setPostcode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleFindAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = postcode.trim().toUpperCase();

    if (!cleaned) {
      setMatches([]);
      setSelectedAddress("");
      setIsConfirmed(false);
      setStatusMessage(
        "Enter a UK postcode (for example, SW1A 1AA) so we can look up matching addresses.",
      );
      return;
    }

    const generatedMatches = MOCK_ADDRESS_MATCHES.map((addr, idx) =>
      idx === 0 ? `${addr.split(",").slice(0, 2).join(",")}, ${cleaned}` : addr,
    );

    setMatches(generatedMatches);
    setSelectedAddress("");
    setIsConfirmed(false);
    setStatusMessage(
      `Select your exact home address for ${cleaned} to check availability and confirm pricing.`,
    );
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setIsConfirmed(true);
    setStatusMessage(
      `Address selected: ${address}. Availability and VAT-inclusive pricing can now be confirmed for this home.`,
    );
  };

  return (
    <section
      id="check-availability"
      className="w-full bg-[#FFFFFF] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              CHECK AVAILABILITY
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Enter your postcode, then choose your address
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            We resolve your exact home before claiming availability. Until you
            check, the plan below is an illustrative example. Prices include
            VAT.
          </p>
        </div>

        {/* Postcode Lookup Card */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <form
            onSubmit={handleFindAddress}
            className="flex flex-col sm:flex-row sm:items-end gap-4"
          >
            <div className="flex-1">
              <label
                htmlFor="uk-postcode-input"
                className="block text-xs sm:text-sm font-bold text-[#0E2F52] mb-2"
              >
                Your UK postcode{" "}
                <span className="font-normal text-gray-500">
                  &mdash; for example, SW1A 1AA
                </span>
              </label>

              <input
                id="uk-postcode-input"
                type="text"
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value);
                  if (isConfirmed) setIsConfirmed(false);
                }}
                placeholder="e.g. SW1A 1AA"
                autoComplete="postal-code"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-[#0A3A66] hover:bg-[#0E2F52] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors shrink-0 cursor-pointer shadow-2xs"
            >
              Find address
            </button>
          </form>

          {/* Address Picker & Confirmation State */}
          {matches.length > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
              <label
                htmlFor="uk-address-select"
                className="block text-xs sm:text-sm font-bold text-[#0E2F52]"
              >
                Select your address
              </label>
              <select
                id="uk-address-select"
                value={selectedAddress}
                onChange={(e) => handleAddressSelect(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0E2F52] focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/25 focus:border-[#0A3A66] transition-colors"
              >
                <option value="">Choose an address from the list...</option>
                {matches.map((addr) => (
                  <option key={addr} value={addr}>
                    {addr}
                  </option>
                ))}
              </select>
            </div>
          )}

          {statusMessage && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-4 rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed border ${
                isConfirmed
                  ? "bg-[#FEF7E6] border-[#F59E0B]/60 text-[#0E2F52] font-medium"
                  : "bg-[#F8FAFC] border-gray-200/80 text-gray-600"
              }`}
            >
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
