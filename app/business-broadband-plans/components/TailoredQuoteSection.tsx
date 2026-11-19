"use client";

import React, { useState } from "react";

export default function TailoredQuoteSection() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessPostcode: "",
    organisationSize: "",
    whatDoYouNeed: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="w-full bg-[#0B2240] py-16 px-6 sm:px-10 md:px-14 text-white">
      <div className="mx-auto max-w-[1060px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Text Info */}
        <div className="lg:col-span-5 pt-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#FBBF24] mb-3">
            TAILORED QUOTE
          </p>

          <h2 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] leading-[1.2] text-white mb-4">
            Need something more than a standard plan?
          </h2>

          <p className="text-[14.5px] leading-[1.55] text-[#94A3B8] mb-6">
            Several sites, special requirements or no standard offer at your
            address? Tell us the essentials and the business team will follow
            up.
          </p>

          <p className="text-[12.5px] leading-[1.5] text-[#64748B]">
            We ask only for what we need. See our privacy notice before you
            submit.
          </p>
        </div>

        {/* Right Column: Form Card */}
        <div className="lg:col-span-7">
          <div className="w-full rounded-[16px] bg-white p-6 sm:p-8 text-[#0F172A] shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Business name & Contact name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-[11.5px] font-semibold text-[#334155] mb-1.5"
                  >
                    Business name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1D63DC] focus:outline-none focus:ring-1 focus:ring-[#1D63DC]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-[11.5px] font-semibold text-[#334155] mb-1.5"
                  >
                    Contact name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1D63DC] focus:outline-none focus:ring-1 focus:ring-[#1D63DC]"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11.5px] font-semibold text-[#334155] mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1D63DC] focus:outline-none focus:ring-1 focus:ring-[#1D63DC]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11.5px] font-semibold text-[#334155] mb-1.5"
                  >
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1D63DC] focus:outline-none focus:ring-1 focus:ring-[#1D63DC]"
                  />
                </div>
              </div>

              {/* Row 3: Business postcode & Organisation size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="businessPostcode"
                    className="block text-[11.5px] font-semibold text-[#334155] mb-1.5"
                  >
                    Business postcode
                  </label>
                  <input
                    type="text"
                    id="businessPostcode"
                    name="businessPostcode"
                    value={formData.businessPostcode}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1D63DC] focus:outline-none focus:ring-1 focus:ring-[#1D63DC]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="organisationSize"
                    className="block text-[11.5px] font-semibold text-[#334155] mb-1.5"
                  >
                    Organisation size
                  </label>
                  <select
                    id="organisationSize"
                    name="organisationSize"
                    value={formData.organisationSize}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-[13.5px] text-[#94A3B8] focus:border-[#1D63DC] focus:outline-none focus:ring-1 focus:ring-[#1D63DC]"
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-250">51-250 employees</option>
                    <option value="250+">250+ employees</option>
                  </select>
                </div>
              </div>

              {/* Row 4: What do you need? */}
              <div>
                <label
                  htmlFor="whatDoYouNeed"
                  className="block text-[11.5px] font-semibold text-[#334155] mb-1.5"
                >
                  What do you need?
                </label>
                <textarea
                  id="whatDoYouNeed"
                  name="whatDoYouNeed"
                  rows={4}
                  value={formData.whatDoYouNeed}
                  onChange={handleChange}
                  className="w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1D63DC] focus:outline-none focus:ring-1 focus:ring-[#1D63DC] resize-none"
                />
              </div>

              {/* Disclaimer */}
              <p className="text-[11.5px] leading-[1.5] text-[#64748B] pt-1">
                Marketing opt-in is never pre-ticked. You will receive a
                reference once your request is received.
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-[8px] bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0F172A] font-bold py-3 px-6 text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1D63DC] shadow-sm"
                >
                  Request a Tailored Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
