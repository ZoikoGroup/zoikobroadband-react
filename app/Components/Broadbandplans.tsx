"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface ProductCharacteristic {
  name: string;
  value: string;
}

interface ProductOfferingQualificationItem {
  id: string;
  product: {
    productOffering: { id: string };
    productCharacteristic?: ProductCharacteristic[];
  };
  eligibilityUnavailabilityReason?: { cause: string }[];
}

type ContractDuration = "12-months" | "18-months" | "24-months";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getChar(
  chars: ProductCharacteristic[] | undefined,
  name: string
): string {
  return chars?.find((c) => c.name === name)?.value ?? "";
}

function downloadTimeLabel(speed: string): string {
  const s = parseFloat(speed);
  if (s >= 60) return "5 min 10 sec";
  if (s >= 40) return "6 min 50 sec";
  return "9 min 19 sec";
}

function deviceLabel(speed: string): string {
  return parseFloat(speed) >= 60 ? "5–8 devices" : "1–4 devices";
}

const CONTRACT_LABELS: Record<ContractDuration, string> = {
  "24-months": "24 months",
  "18-months": "18 months",
  "12-months": "12 months",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg
      className="animate-spin text-[#10446C]"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
      />
    </svg>
  );
}

interface PlanCardProps {
  item: ProductOfferingQualificationItem;
  contractType: ContractDuration;
}

function PlanCard({ item, contractType }: PlanCardProps) {
  const chars = item.product.productCharacteristic;
  const offeringId = item.product.productOffering.id;
  const download = getChar(chars, "productAdvertisedDownloadSpeed");
  const upload = getChar(chars, "productAdvertisedUploadSpeed");
  const minSpeed = getChar(chars, "productMinimumGuaranteedSpeed");
  const technology = getChar(chars, "AccessTechnology");
  const available = getChar(chars, "AVAILABILITY_FLAG") !== "N";

  const contractMonths = contractType.replace("-months", "");

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden
        ${
          available
            ? "border-[#10446C]/20 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            : "border-gray-200 bg-gray-50 opacity-60"
        }`}
    >
      {/* Header stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#10446C] to-[#10446C]" />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Title + Badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#10446C] mb-1">
              {technology || "Fibre"}
            </p>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {offeringId.replace(/([A-Z])/g, " $1").trim()}
            </h3>
          </div>
          {available ? (
            <span className="shrink-0 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
              Available
            </span>
          ) : (
            <span className="shrink-0 text-xs font-semibold bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-full">
              Unavailable
            </span>
          )}
        </div>

        {/* Speed display */}
        {download && (
          <div className="flex items-end gap-1.5">
            <span className="text-5xl font-black text-[#10446C] leading-none tabular-nums">
              {download}
            </span>
            <span className="text-sm font-semibold text-gray-500 mb-1.5">
              Mbps
              <br />
              avg. download
            </span>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          {upload && (
            <div className="bg-[#f5f0ff] rounded-xl p-3">
              <p className="text-xs text-gray-500 font-medium mb-0.5">Upload</p>
              <p className="text-base font-bold text-gray-800">{upload} Mbps</p>
            </div>
          )}
          {minSpeed && (
            <div className="bg-[#f5f0ff] rounded-xl p-3">
              <p className="text-xs text-gray-500 font-medium mb-0.5">
                Min. guaranteed
              </p>
              <p className="text-base font-bold text-gray-800">
                {minSpeed} Mbps
              </p>
            </div>
          )}
          {download && (
            <div className="bg-[#f5f0ff] rounded-xl p-3">
              <p className="text-xs text-gray-500 font-medium mb-0.5">
                HD film in
              </p>
              <p className="text-base font-bold text-gray-800">
                {downloadTimeLabel(download)}
              </p>
            </div>
          )}
          {download && (
            <div className="bg-[#f5f0ff] rounded-xl p-3">
              <p className="text-xs text-gray-500 font-medium mb-0.5">Devices</p>
              <p className="text-base font-bold text-gray-800">
                {deviceLabel(download)}
              </p>
            </div>
          )}
        </div>

        {/* Contract */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-auto pt-2 border-t border-gray-100">
          <svg
            className="w-4 h-4 text-[#10446C] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {contractMonths}-month contract
          </span>
        </div>

        {/* CTA */}
        {available && (
          <button
            className="mt-2 w-full py-3 rounded-xl bg-[#10446C] hover:bg-[#0d3a5a] active:scale-95 
              text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-md shadow-[#10446C]/25"
          >
            Get this deal
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BroadbandPlans() {
  // Step: "search" | "select" | "plans"
  const [step, setStep] = useState<"search" | "select" | "plans">("search");

  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState<FormattedAddress[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<FormattedAddress | null>(null);

  const [contractType, setContractType] = useState<ContractDuration>("24-months");
  const [plans, setPlans] = useState<ProductOfferingQualificationItem[]>([]);

  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ── Postcode search ──────────────────────────────────────────────────────

  const handlePostcodeSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = postcode.trim();
      if (!trimmed) return;

      setError(null);
      setLoadingAddresses(true);
      setAddresses([]);

      try {
        const res = await fetch("/api/BritishTelecom/search-address", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postcode: trimmed }),
        });

        const data = await res.json();

        if (!data.success) {
          setError(data.message ?? "Failed to find addresses.");
          return;
        }

        setAddresses(data.addresses ?? []);
        setStep("select");
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoadingAddresses(false);
      }
    },
    [postcode]
  );

  // ── Address selection + fetch plans ─────────────────────────────────────

  const handleSelectAddress = useCallback(
    async (address: FormattedAddress, contract: ContractDuration) => {
      setSelectedAddress(address);
      setError(null);
      setLoadingPlans(true);
      setPlans([]);
      setStep("plans");

      try {
        const res = await fetch("/api/BritishTelecom/get-products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address_id: address.id,
            district_code: address.districtCode || "NS",
            contract_type: contract,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          setError(data.message ?? "Could not load plans.");
          return;
        }

        setPlans(data.productOfferingQualificationItem ?? []);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoadingPlans(false);
      }
    },
    []
  );

  // Re-fetch plans when contract changes (address already selected)
  const handleContractChange = useCallback(
    (contract: ContractDuration) => {
      setContractType(contract);
      if (selectedAddress) {
        handleSelectAddress(selectedAddress, contract);
      }
    },
    [selectedAddress, handleSelectAddress]
  );

  // ── Filter plans by availability ─────────────────────────────────────────

  const availablePlans = plans.filter(
    (p) =>
      getChar(p.product.productCharacteristic, "AVAILABILITY_FLAG") !== "N"
  );
  const unavailablePlans = plans.filter(
    (p) =>
      getChar(p.product.productCharacteristic, "AVAILABILITY_FLAG") === "N"
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#faf8ff] font-sans py-4">
      {/* ── Top bar ── */}
      <header className="max-w-2xl mx-auto rounded-2xl bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* BT-style logo mark */}
            <div className="w-8 h-8 rounded-lg bg-[#10446C] flex items-center justify-center">
              <span className="text-white text-xs font-black tracking-tight">
                BT
              </span>
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">
              Broadband Deals
            </span>
          </div>

          {/* Breadcrumb steps */}
          <nav className="hidden sm:flex items-center gap-1 text-xs font-medium">
            {(
              [
                { key: "search", label: "Postcode" },
                { key: "select", label: "Address" },
                { key: "plans", label: "Plans" },
              ] as const
            ).map(({ key, label }, i, arr) => (
              <span key={key} className="flex items-center gap-1">
                <span
                  className={`px-2.5 py-1 rounded-full transition-colors ${
                    step === key
                      ? "bg-[#10446C] text-white"
                      : ["search", "select", "plans"].indexOf(step) >
                        ["search", "select", "plans"].indexOf(key)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-gray-300">›</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* ────────────────── STEP 1: Postcode ────────────────── */}
        {step === "search" && (
          <div className="flex flex-col items-center text-center gap-8 py-12">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-3">
                Find your{" "}
                <span className="text-[#10446C]">broadband deals</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Enter your postcode to see which fibre plans are available at
                your address.
              </p>
            </div>

            <form
              onSubmit={handlePostcodeSearch}
              className="w-full max-w-md flex flex-col sm:flex-row gap-3"
            >
              <input
                ref={inputRef}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                placeholder="e.g. SW1A 1AA"
                maxLength={10}
                required
                disabled={loadingAddresses}
                className="flex-1 px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#10446C] focus:ring-2 focus:ring-[#10446C]/30 
                  outline-none text-base font-semibold tracking-widest text-gray-900 bg-white
                  placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-400
                  transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loadingAddresses || !postcode.trim()}
                className="px-6 py-3.5 rounded-xl bg-[#10446C] hover:bg-[#0d3a5a] text-white 
                  font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#10446C]/30
                  disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center gap-2 justify-center"
              >
                {loadingAddresses ? (
                  <>
                    <Spinner size={16} />
                    <span className="text-white">Searching…</span>
                  </>
                ) : (
                  "See your deals →"
                )}
              </button>
            </form>

            {error && (
              <p className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium max-w-md">
                {error}
              </p>
            )}
          </div>
        )}

        {/* ────────────────── STEP 2: Select Address ────────────────── */}
        {step === "select" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setStep("search");
                  setError(null);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Back"
              >
                ←
              </button>
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Select your address
                </h2>
                <p className="text-gray-500 text-sm">
                  {addresses.length} address
                  {addresses.length !== 1 ? "es" : ""} found for{" "}
                  <span className="font-semibold text-gray-700">
                    {postcode}
                  </span>
                </p>
              </div>
            </div>

            {/* Contract picker — choose before address so plans load correctly */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Contract duration
              </p>
              <div className="flex gap-2 flex-wrap">
                {(
                  Object.entries(CONTRACT_LABELS) as [
                    ContractDuration,
                    string
                  ][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setContractType(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      contractType === key
                        ? "bg-[#10446C] text-white shadow-md shadow-[#10446C]/25"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => handleSelectAddress(addr, contractType)}
                  className="w-full text-left bg-white border border-gray-200 hover:border-[#10446C] 
                    rounded-xl px-5 py-4 transition-all duration-200 hover:shadow-md group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-[#10446C] transition-colors">
                        {addr.display}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {[addr.city, addr.postcode].filter(Boolean).join(", ")}
                      </p>
                    </div>
                    <span className="text-[#5514b4] opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <p className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium">
                {error}
              </p>
            )}
          </div>
        )}

        {/* ────────────────── STEP 3: Plans ────────────────── */}
        {step === "plans" && (
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <button
                onClick={() => {
                  setStep("select");
                  setError(null);
                }}
                className="self-start p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Back"
              >
                ←
              </button>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-1">
                  Available broadband plans
                </h2>
                {selectedAddress && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-[#10446C] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium">
                      {selectedAddress.display},{" "}
                      {[selectedAddress.city, selectedAddress.postcode]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                    <span className="text-gray-400 text-xs font-mono">
                      ({selectedAddress.id})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Contract toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-600 mr-1">
                Contract:
              </span>
              {(
                Object.entries(CONTRACT_LABELS) as [ContractDuration, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleContractChange(key)}
                  disabled={loadingPlans}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${
                    contractType === key
                      ? "bg-[#10446C] text-white shadow-md shadow-[#10446C]/25"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#10446C] hover:text-[#10446C]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Loading */}
            {loadingPlans && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Spinner size={36} />
                <p className="text-gray-500 font-medium">
                  Checking available plans…
                </p>
              </div>
            )}

            {/* Error */}
            {!loadingPlans && error && (
              <p className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium">
                {error}
              </p>
            )}

            {/* Plans grid */}
            {!loadingPlans && !error && plans.length > 0 && (
              <>
                {availablePlans.length > 0 && (
                  <section>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                      {availablePlans.length} plan
                      {availablePlans.length !== 1 ? "s" : ""} available
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {availablePlans.map((item) => (
                        <PlanCard
                          key={item.id}
                          item={item}
                          contractType={contractType}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {unavailablePlans.length > 0 && (
                  <section>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                      Not available at your address
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {unavailablePlans.map((item) => (
                        <PlanCard
                          key={item.id}
                          item={item}
                          contractType={contractType}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* No plans */}
            {!loadingPlans && !error && plans.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
                  📡
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">
                    No plans found
                  </p>
                  <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                    We couldn't find any broadband plans for this address and
                    contract duration.
                  </p>
                </div>
                <button
                  onClick={() => setStep("select")}
                  className="mt-2 px-5 py-2.5 rounded-xl border-2 border-[#10446C] text-[#10446C] 
                    font-semibold text-sm hover:bg-[#10446C] hover:text-white transition-all duration-200"
                >
                  Try a different address
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}