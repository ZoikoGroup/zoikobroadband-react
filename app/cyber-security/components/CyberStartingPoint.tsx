"use client";

import React, { useState } from "react";

const BUSINESS_SIZE_OPTIONS = [
  "Just me",
  "2–10 employees",
  "11–50 employees",
  "50+ employees",
] as const;

const NUMBER_OF_SITES_OPTIONS = [
  "Single site",
  "2–5 sites",
  "6–20 sites",
  "20+ sites",
] as const;

const FOCUS_AREAS = [
  "Accounts",
  "Devices",
  "Network",
  "People",
  "Backups",
] as const;

export default function CyberStartingPoint() {
  const [businessSize, setBusinessSize] = useState<string>("Just me");
  const [numberOfSites, setNumberOfSites] = useState<string>("Single site");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((item) => item !== area)
        : [...prev, area],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-[#FFC119] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading, Copy & Router Image */}
          <div className="lg:col-span-5">
            <p className="text-[#0B2241] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              FIND YOUR STARTING POINT
            </p>

            <h2 className="text-[#0B2241] text-[34px] sm:text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em] mb-4 max-w-[380px]">
              Tell us a little about your business
            </h2>

            <p className="text-[#0B2241]/85 text-[14.5px] leading-[1.55] max-w-[420px] mb-7">
              Broad answers only. Please do not enter passwords, logs, IP
              addresses or details of any vulnerability.
            </p>

            <div className="relative w-full max-w-[420px] aspect-[16/8.2] rounded-[16px] overflow-hidden bg-[#E2E8F0]">
              <img
                src="/Images/cyber/8.png"
                alt="Hands connecting cable to a multi-antenna wireless router"
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[16px] border-[1.5px] border-dashed border-[#4B7FD6]/75"
              />
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_12px_30px_rgba(11,34,65,0.08)]"
            >
              {/* Select Dropdowns Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    htmlFor="cyber-business-size"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-2"
                  >
                    Business size
                  </label>
                  <select
                    id="cyber-business-size"
                    value={businessSize}
                    onChange={(e) => setBusinessSize(e.target.value)}
                    className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#CBD5E1] bg-white text-[#475569] text-[13.5px] appearance-none focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  >
                    {BUSINESS_SIZE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cyber-number-of-sites"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-2"
                  >
                    Number of sites
                  </label>
                  <select
                    id="cyber-number-of-sites"
                    value={numberOfSites}
                    onChange={(e) => setNumberOfSites(e.target.value)}
                    className="w-full h-[44px] px-3.5 rounded-[8px] border border-[#CBD5E1] bg-white text-[#475569] text-[13.5px] appearance-none focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  >
                    {NUMBER_OF_SITES_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Checkbox Group */}
              <fieldset className="mb-6">
                <legend className="block text-[#0B2241] text-[12.5px] font-bold mb-3">
                  What would you like to look at? (optional)
                </legend>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                  {FOCUS_AREAS.map((area) => {
                    const checked = selectedAreas.includes(area);
                    return (
                      <label
                        key={area}
                        className="inline-flex items-center gap-2 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleArea(area)}
                          className="w-4 h-4 rounded-[4px] border border-[#CBD5E1] text-[#0B2241] accent-[#0B2241] focus:ring-2 focus:ring-[#1963DD]/20 cursor-pointer"
                        />
                        <span className="text-[#475569] text-[13px]">
                          {area}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[46px] rounded-[8px] bg-[#0B2241] hover:bg-[#143563] active:scale-[0.99] text-white text-[13.5px] font-bold transition-all cursor-pointer"
              >
                Get a suggested starting point
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
