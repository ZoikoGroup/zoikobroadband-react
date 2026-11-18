"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function BusinessBroadbandTailoredQuote() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    businessPostcode: "",
    organisationSize: "",
    requirements: "",
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !formData.companyName ||
      !formData.contactName ||
      !formData.email ||
      !formData.businessPostcode
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData.agreed) {
      setError("Please agree to be contacted about this enquiry.");
      return;
    }

    setLoading(true);

    try {
      // Simulate API submission for tailored quote
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="tailored-quote"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              TAILORED QUOTE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Tell us what your business needs
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            For multi-site, higher bandwidth or specific requirements, request a
            tailored quote and our business team will follow up. No marketing
            opt-in is pre-ticked, and we won&apos;t promise a universal callback
            time.
          </p>
        </div>

        {/* Quote Form Card */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_4px_12px_#0000001A]">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0E2F52]">
                Quote request received
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you, {formData.contactName}. We&apos;ve sent a receipt
                reference to{" "}
                <strong className="text-[#0E2F52]">{formData.email}</strong> and
                our team will follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    companyName: "",
                    contactName: "",
                    email: "",
                    phone: "",
                    businessPostcode: "",
                    organisationSize: "",
                    requirements: "",
                    agreed: false,
                  });
                }}
                className="mt-4 inline-flex items-center text-sm font-bold text-[#0A3A66] hover:underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Company name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
                  />
                </div>

                {/* Contact Name */}
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Contact name
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
                  />
                </div>

                {/* Phone (optional) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Phone{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
                  />
                </div>

                {/* Business Postcode */}
                <div>
                  <label
                    htmlFor="businessPostcode"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Business postcode
                  </label>
                  <input
                    id="businessPostcode"
                    name="businessPostcode"
                    type="text"
                    value={formData.businessPostcode}
                    onChange={handleChange}
                    required
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
                  />
                </div>

                {/* Organisation Size */}
                <div>
                  <label
                    htmlFor="organisationSize"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Organisation size
                  </label>
                  <select
                    id="organisationSize"
                    name="organisationSize"
                    value={formData.organisationSize}
                    onChange={handleChange}
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent"
                  >
                    <option value="">Choose...</option>
                    <option value="1-5">1–5 employees</option>
                    <option value="6-20">6–20 employees</option>
                    <option value="21-50">21–50 employees</option>
                    <option value="50+">50+ employees</option>
                  </select>
                </div>
              </div>

              {/* What do you need? (optional) */}
              <div>
                <label
                  htmlFor="requirements"
                  className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                >
                  What do you need?{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="e.g. 3 sites, static IP, high upload for backups..."
                  className="w-full bg-white text-[#0E2F52] text-sm font-medium p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66] focus:border-transparent resize-y"
                />
              </div>

              {/* Agreement Checkbox */}
              <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0A3A66] focus:ring-[#0A3A66] cursor-pointer"
                  />
                  <div className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-bold text-[#0E2F52]">
                      I agree to be contacted about this enquiry
                    </span>
                    <p className="mt-0.5 text-gray-500">
                      We&apos;ll use your details to respond to this request, in
                      line with our Privacy Notice. This box is not pre-ticked.
                    </p>
                  </div>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {error}
                </p>
              )}

              {/* Submit Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#F5B82E] hover:bg-amber-400 disabled:opacity-60 text-[#0E2F52] font-bold text-sm px-8 py-4 rounded-xl transition-colors inline-flex items-center justify-center group cursor-pointer shadow-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Sending request...</span>
                    </>
                  ) : (
                    <>
                      <span>Request a tailored quote</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center sm:text-right">
                  We&apos;ll send a receipt reference and follow up by email.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
