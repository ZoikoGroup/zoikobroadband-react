// components/PostcodeSearchBar.tsx
"use client";

import React, { useState, useRef, type FormEvent } from "react";

interface FormattedAddress {
  id: string;
  display: string;
  streetNr: string;
  streetName: string;
  city: string;
  postcode: string;
  districtCode: string;
  uprn: string;
  exchangeGroupCode: string;
  qualifier: string;
}

interface SearchResponse {
  success: boolean;
  addresses?: FormattedAddress[];
  count?: number;
  cached?: boolean;
  message?: string;
}

interface PostcodeSearchBarProps {
  /** Called when user picks an address from the dropdown */
  onAddressSelect?: (address: FormattedAddress) => void;
  /** Called after a successful search with the full list */
  onSearchSuccess?: (addresses: FormattedAddress[]) => void;
  /** Called on any error */
  onSearchError?: (message: string) => void;
  buttonLabel?: string;
  loadingLabel?: string;
  placeholder?: string;
  /** Override the default API endpoint */
  apiEndpoint?: string;
}

export default function PostcodeSearchBar({
  onAddressSelect,
  onSearchSuccess,
  onSearchError,
  buttonLabel = "See your deals",
  loadingLabel = "Searching…",
  placeholder = "Enter postcode",
  apiEndpoint = "/api/BritishTelecom/search-address",
}: PostcodeSearchBarProps) {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<FormattedAddress[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<FormattedAddress | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch(e?: FormEvent) {
    e?.preventDefault();

    const trimmed = postcode.trim();
    if (!trimmed) {
      setError("Please enter a postcode");
      inputRef.current?.focus();
      return;
    }

    setLoading(true);
    setError(null);
    setAddresses(null);
    setSelectedAddress(null);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postcode: trimmed }),
      });

      const data: SearchResponse = await res.json();

      if (!data.success) {
        const msg = data.message ?? "Something went wrong. Please try again.";
        setError(msg);
        onSearchError?.(msg);
        return;
      }

      const found = data.addresses ?? [];
      setAddresses(found);
      onSearchSuccess?.(found);
    } catch {
      const msg = "Network error. Please check your connection and try again.";
      setError(msg);
      onSearchError?.(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(addr: FormattedAddress) {
    setSelectedAddress(addr);
    onAddressSelect?.(addr);
  }

  return (
    <div className="w-full">
      {/* Search form */}
      <form
        className="flex flex-col md:flex-row gap-4 items-center"
        noValidate
        onSubmit={handleSearch}
      >
        <label htmlFor="postcode-input" className="sr-only">
          Enter your postcode
        </label>

        <input
          ref={inputRef}
          id="postcode-input"
          name="postcode"
          type="search"
          autoComplete="postal-code"
          placeholder={placeholder}
          required
          pattern="^[A-Za-z0-9 ]{5,8}$"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          disabled={loading}
          maxLength={8}
          className="w-full md:flex-1 text-gray-700 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10446C] disabled:opacity-60 disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-7 py-3 rounded-full bg-[#10446C] font-semibold text-white hover:bg-[#0d3555] transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              {loadingLabel}
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </form>

      {/* Inline error */}
      {error && (
        <p className="mt-3 text-sm text-red-600 text-left" role="alert">
          {error}
        </p>
      )}

      {/* Address results */}
      {addresses !== null && (
        <div className="mt-5 text-left">
          {addresses.length === 0 ? (
            <p className="text-sm text-gray-500">No addresses found for this postcode.</p>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                {addresses.length} address{addresses.length !== 1 ? "es" : ""} found
              </p>

              <ul
                className="divide-y divide-gray-100 max-h-64 overflow-y-auto rounded-lg border border-gray-200"
                role="listbox"
                aria-label="Select your address"
              >
                {addresses.map((addr) => (
                  <li
                    key={addr.id || addr.uprn || addr.display}
                    role="option"
                    aria-selected={selectedAddress?.id === addr.id}
                    onClick={() => handleSelect(addr)}
                    className={`flex items-baseline justify-between gap-3 px-4 py-3 cursor-pointer transition-colors
                      ${
                        selectedAddress?.id === addr.id
                          ? "bg-[#eaf2ff] border-l-4 border-[#10446C]"
                          : "hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-sm font-medium text-gray-800 flex-1">
                      {addr.display}
                    </span>
                    {addr.city && (
                      <span className="text-xs text-gray-500 shrink-0">{addr.city}</span>
                    )}
                    <span className="text-xs font-semibold text-[#10446C] tracking-wider shrink-0">
                      {addr.postcode}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Selected address confirmation */}
      {selectedAddress && (
        <div
          className="mt-4 p-3 rounded-lg bg-[#f0f6ff] border border-[#10446C]/20 text-left"
          role="status"
          aria-live="polite"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#10446C] mb-1">
            Selected address
          </p>
          <p className="text-sm font-medium text-gray-800">
            {[selectedAddress.display, selectedAddress.city, selectedAddress.postcode]
              .filter(Boolean)
              .join(", ")}
          </p>
          {selectedAddress.uprn && (
            <p className="text-xs text-gray-400 mt-0.5">UPRN: {selectedAddress.uprn}</p>
          )}
        </div>
      )}
    </div>
  );
}