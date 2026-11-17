"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Info, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import type { FormattedAddress } from "@/app/context/CartContext";

const NAV_ITEMS = [
  { label: "Check address", href: "#check-address" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Before you switch", href: "#before-you-switch" },
  { label: "Your plans", href: "#your-plans" },
  { label: "Phone & devices", href: "#phone-devices" },
  { label: "Setup & dates", href: "#setup-dates" },
  { label: "Other situations", href: "#other-situations" },
  { label: "FAQs", href: "#faqs" },
] as const;

const STATUS_PILLS = [
  {
    label: "Available",
    dotClass: "w-2 h-2 rounded-full bg-emerald-600",
  },
  {
    label: "Check required",
    dotClass: "w-5 h-5 rounded-full bg-[#F5B82E]",
  },
  {
    label: "Not yet available",
    dotClass: "w-2 h-2 rounded-full bg-slate-400",
  },
] as const;

export default function SwitchCheckAddressSection() {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState<FormattedAddress[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<FormattedAddress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPostcode = postcode.trim().toUpperCase();

    if (!trimmedPostcode) {
      setError("Please enter your postcode.");
      return;
    }

    setLoading(true);
    setError("");
    setAddresses([]);
    setSelectedAddress(null);

    try {
      const response = await fetch("/api/BritishTelecom/search-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postcode: trimmedPostcode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to find addresses for this postcode.",
        );
      }

      if (!data.addresses || data.addresses.length === 0) {
        setError("No addresses found. Please check your postcode.");
        return;
      }

      setAddresses(data.addresses);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
    setAddresses([]);
    setSelectedAddress(null);
    setError("");
  };

  return (
    <div className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden">
      {/* Sub-Navigation Bar */}
      <header className="w-full border-b border-gray-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Page sections"
            className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6 py-4"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-[#0E2F52] hover:text-[#0A3A66] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section
        id="check-address"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      >
        {/* Notice Banner */}
        <div className="relative bg-[#FFFBEB]/60 border border-[#F0B429] border-l-4 border-l-[#F0B429] rounded-2xl p-5 sm:p-6 mb-16 flex items-start gap-4 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>

          <div>
            <h2 className="font-bold text-base text-[#0E2F52] mb-1">
              Switching isn&apos;t one-size-fits-all
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              The exact steps depend on your current provider, connection type
              and order details. We won&apos;t claim an effortless or guaranteed
              migration, quote a fixed timescale, or tell you to cancel your old
              service before the steps are confirmed.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />

            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              CHECK ADDRESS
            </span>

            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Enter your postcode, then choose your address
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            This finds which broadband options may be available at your exact
            property. We never guess or autofill an address.
          </p>
        </div>

        {/* Postcode Lookup Card */}
        <div className="max-w-2xl mx-auto bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_12px_#0000001A]">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="switch-postcode"
              className="block text-sm text-[#0E2F52] mb-2"
            >
              <span className="font-bold">UK postcode</span>{" "}
              <span className="text-gray-500 font-normal">
                — for example, SW1A 1AA
              </span>
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <input
                id="switch-postcode"
                type="text"
                value={postcode}
                onChange={handlePostcodeChange}
                placeholder="e.g. SW1A 1AA"
                aria-label="Enter UK postcode"
                className="flex-1 min-w-0 bg-white text-[#0E2F52] placeholder-gray-400 text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
              />

              <button
                type="submit"
                disabled={loading || !postcode.trim()}
                className="bg-[#0A3A66] hover:bg-[#0E2F52] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-colors shrink-0 cursor-pointer inline-flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Find My Address"
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 mb-4" role="alert">
                {error}
              </p>
            )}

            {/* Address Results */}
            {addresses.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-bold text-[#0E2F52] mb-3">
                  Select your address
                </p>

                <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-200 divide-y divide-gray-100">
                  {addresses.map((address, index) => {
                    const isSelected =
                      selectedAddress?.id === address.id &&
                      selectedAddress?.uprn === address.uprn;

                    return (
                      <button
                        key={
                          address.id ||
                          address.uprn ||
                          `${address.display}-${index}`
                        }
                        type="button"
                        onClick={() => setSelectedAddress(address)}
                        className={`w-full flex items-start gap-3 p-4 text-left transition-colors ${
                          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <MapPin className="w-5 h-5 text-[#0A3A66] shrink-0 mt-0.5" />

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0E2F52]">
                            {address.display}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {[address.city, address.postcode]
                              .filter(Boolean)
                              .join(", ")}
                          </p>

                          {address.qualifier && (
                            <p className="text-xs text-gray-400 mt-1">
                              {address.qualifier}
                            </p>
                          )}
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selected Address */}
            {selectedAddress && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      Selected address
                    </p>

                    <p className="text-sm font-semibold text-[#0E2F52]">
                      {selectedAddress.display}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedAddress(null)}
                      className="text-xs font-semibold text-[#0A3A66] hover:underline mt-2"
                    >
                      Change address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Availability Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              {STATUS_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200/90 rounded-full px-3.5 py-1.5 text-xs font-bold text-[#0E2F52]"
                >
                  <span className={pill.dotClass} aria-hidden="true" />
                  <span>{pill.label}</span>
                </span>
              ))}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
