"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import type { FormattedAddress } from "@/app/context/CartContext";

const BANNER_CONTENT = {
  tag: "READY FOR THE NEXT STEP?",
  title: "Check what's available at your new address",
  description:
    "Start with address availability, then choose the right next step. We only use your postcode and selected address to check — no account required, and no hard sell.",
  placeholder: "e.g. SW1A 1AA",
  buttonLabel: "Check availability",
  disclaimer:
    "Checking availability doesn't create an order, confirm an appointment, or change your current service.",
  imageSrc: "/Images/moving/4.png",
  imageAlt:
    "Smiling woman holding moving keys and a smartphone by a bright window",
} as const;

export default function CheckNewAddressBanner() {
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

  const handleAddressSelect = (address: FormattedAddress) => {
    setSelectedAddress(address);
    setError("");
  };

  return (
    <section className="w-full bg-white font-sans antialiased overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl bg-[#0A3A66] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          {/* Left Content Column */}
          <div className="lg:col-span-7 relative z-20 p-8 sm:p-12 lg:py-14 lg:pl-14 lg:pr-6 flex flex-col justify-center">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                {BANNER_CONTENT.tag}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[32px] sm:text-[38px] font-extrabold text-white tracking-tight leading-[1.15] mb-4 max-w-md">
              {BANNER_CONTENT.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-7 max-w-lg">
              {BANNER_CONTENT.description}
            </p>

            {/* Postcode Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg mb-4"
            >
              <input
                type="text"
                value={postcode}
                onChange={handlePostcodeChange}
                placeholder={BANNER_CONTENT.placeholder}
                aria-label="Enter postcode"
                className="flex-1 min-w-0 bg-white text-[#0E2F52] placeholder-gray-400 text-sm font-medium px-4 py-3.5 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#F5B82E]"
              />

              <button
                type="submit"
                disabled={loading || !postcode.trim()}
                className="bg-[#F5B82E] hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors inline-flex items-center justify-center shrink-0 group cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>{BANNER_CONTENT.buttonLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-200 mb-4" role="alert">
                {error}
              </p>
            )}

            {/* Address Results */}
            {addresses.length > 0 && (
              <div className="max-w-lg mb-5">
                <p className="text-sm font-semibold text-white mb-3">
                  Select your address
                </p>

                <div className="max-h-56 overflow-y-auto rounded-xl bg-white divide-y divide-gray-100 shadow-lg">
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
                        onClick={() => handleAddressSelect(address)}
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
              <div className="max-w-lg mb-5 rounded-xl border border-green-300/40 bg-white/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F5B82E] shrink-0 mt-0.5" />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-blue-100 mb-1">
                      Selected address
                    </p>

                    <p className="text-sm font-semibold text-white">
                      {selectedAddress.display}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedAddress(null)}
                      className="text-xs text-[#F5B82E] hover:underline mt-2"
                    >
                      Change address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-sm text-blue-200/75 leading-relaxed max-w-md">
              {BANNER_CONTENT.disclaimer}
            </p>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
            <Image
              src={BANNER_CONTENT.imageSrc}
              alt={BANNER_CONTENT.imageAlt}
              fill
              className="object-cover object-center"
              priority
            />

            {/* Smooth horizontal blend on desktop */}
            <div
              className="hidden lg:block absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0A3A66] via-[#0A3A66]/80 to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Smooth vertical blend on mobile/tablet */}
            <div
              className="lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A3A66] to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Subtle decorative arc */}
            <div
              className="hidden lg:block absolute -bottom-24 right-12 w-72 h-72 rounded-full border border-white/15 z-10 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
