"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SITE_OPTIONS = [
  "Single site",
  "2–5 sites",
  "6–20 sites",
  "20+ sites",
] as const;

export default function SogeaSpecialistForm() {
  const [contactName, setContactName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfSites, setNumberOfSites] = useState<string>("Single site");
  const [sitePostcode, setSitePostcode] = useState("");
  const [whatYouNeed, setWhatYouNeed] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-[#061A33] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Copy (Vertically Centered) */}
          <div className="lg:col-span-5">
            <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
              BUSINESS SPECIALIST
            </p>

            <h2 className="text-white text-[34px] sm:text-[40px] font-extrabold leading-[1.14] tracking-[-0.02em] mb-4 max-w-[420px]">
              Talk to a specialist about Part Fibre
            </h2>

            <p className="text-[#CBD5E1] text-[15px] leading-[1.55] max-w-[430px]">
              Tell us about your site and phone setup. We ask only for what is
              needed and give a reference once your request is received.
            </p>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                <div>
                  <label
                    htmlFor="sogea-contact-name"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Contact name
                  </label>
                  <input
                    id="sogea-contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sogea-business-name"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Business name
                  </label>
                  <input
                    id="sogea-business-name"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sogea-business-email"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Business email
                  </label>
                  <input
                    id="sogea-business-email"
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sogea-phone-optional"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="sogea-phone-optional"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sogea-number-of-sites"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Number of sites
                  </label>
                  <div className="relative">
                    <select
                      id="sogea-number-of-sites"
                      value={numberOfSites}
                      onChange={(e) => setNumberOfSites(e.target.value)}
                      className="w-full h-[42px] pl-3.5 pr-9 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0B2241] text-[14px] appearance-none focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                    >
                      {SITE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-[#64748B] pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sogea-site-postcode"
                    className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                  >
                    Site postcode (optional)
                  </label>
                  <input
                    id="sogea-site-postcode"
                    type="text"
                    value={sitePostcode}
                    onChange={(e) => setSitePostcode(e.target.value)}
                    className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="sogea-what-do-you-need"
                  className="block text-[#0B2241] text-[12.5px] font-bold mb-1.5"
                >
                  What do you need?
                </label>
                <textarea
                  id="sogea-what-do-you-need"
                  rows={4}
                  value={whatYouNeed}
                  onChange={(e) => setWhatYouNeed(e.target.value)}
                  className="w-full p-3.5 rounded-[8px] border border-[#CBD5E1] text-[#0B2241] text-[14px] focus:outline-none focus:border-[#1963DD] focus:ring-2 focus:ring-[#1963DD]/20 transition-all resize-y"
                />
              </div>

              <p className="text-[#64748B] text-[11.5px] mb-4">
                See our{" "}
                <a href="#" className="underline hover:text-[#0B2241]">
                  privacy notice
                </a>{" "}
                before you submit. Marketing opt-in is never pre-ticked.
              </p>

              <button
                type="submit"
                className="w-full h-[46px] bg-[#FFC119] hover:bg-[#F5B60A] active:scale-[0.99] text-[#0B2241] text-[14px] font-bold rounded-[8px] transition-all cursor-pointer"
              >
                Speak to a Business Specialist
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
