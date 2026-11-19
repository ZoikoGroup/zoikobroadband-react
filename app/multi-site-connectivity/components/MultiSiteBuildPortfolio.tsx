"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2, Plus } from "lucide-react";

interface SiteItem {
  id: string;
  name: string;
  postcode: string;
}

const WORKLOAD_OPTIONS = [
  { id: "phone-voice", label: "Phone / voice" },
  { id: "card-payments", label: "Card payments / POS" },
  { id: "cloud-apps", label: "Cloud apps" },
  { id: "remote-access", label: "Remote access / VPN" },
  { id: "large-uploads", label: "Large uploads / backups" },
  { id: "guest-wifi", label: "Guest / staff Wi-Fi" },
] as const;

const OFFLINE_OPTIONS = [
  { id: "manage-while", label: "We can manage for a while" },
  {
    id: "short-outages",
    label: "Short outages only",
    sublabel: "Some sites are time-sensitive",
  },
  {
    id: "stay-online",
    label: "Some sites must stay online",
    sublabel: "We'll discuss failover options",
  },
  { id: "not-sure", label: "Not sure" },
] as const;

export default function MultiSiteBuildPortfolio() {
  const [sites, setSites] = useState<SiteItem[]>([]);
  const [siteName, setSiteName] = useState("");
  const [sitePostcode, setSitePostcode] = useState("");

  const [selectedWorkloads, setSelectedWorkloads] = useState<string[]>([]);
  const [selectedOffline, setSelectedOffline] = useState<string>("");

  const [contactData, setContactData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteName.trim() || !sitePostcode.trim()) return;

    const newSite: SiteItem = {
      id: Date.now().toString(),
      name: siteName.trim(),
      postcode: sitePostcode.trim(),
    };

    setSites((prev) => [...prev, newSite]);
    setSiteName("");
    setSitePostcode("");
  };

  const removeSite = (id: string) => {
    setSites((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleWorkload = (id: string) => {
    setSelectedWorkloads((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (sites.length === 0) {
      setError("Please add at least one site to your portfolio.");
      return;
    }

    if (
      !contactData.companyName ||
      !contactData.contactName ||
      !contactData.email
    ) {
      setError("Please fill in all required contact fields.");
      return;
    }

    if (!contactData.agreed) {
      setError("Please agree to be contacted about this enquiry.");
      return;
    }

    setLoading(true);

    try {
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
      id="plan-my-sites"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              PLAN MY SITES
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Build your site portfolio
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Add each location you want to connect. We&apos;ll review
            availability separately for every one — statuses stay &ldquo;Review
            required&rdquo; until our team confirms. We don&apos;t ask for
            account numbers here, and nothing is ordered.
          </p>
        </div>

        {/* Portfolio Builder Card */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_4px_12px_#0000001A]">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0E2F52]">
                Site portfolio submitted
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you, {contactData.contactName}. We&apos;ve sent a receipt
                reference to{" "}
                <strong className="text-[#0E2F52]">{contactData.email}</strong>{" "}
                and our multi-site team will follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setSites([]);
                  setSelectedWorkloads([]);
                  setSelectedOffline("");
                  setContactData({
                    companyName: "",
                    contactName: "",
                    email: "",
                    phone: "",
                    agreed: false,
                  });
                }}
                className="mt-4 inline-flex items-center text-sm font-bold text-[#0A3A66] hover:underline"
              >
                Build another portfolio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Site Input Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80">
                <div className="sm:col-span-5">
                  <label
                    htmlFor="siteName"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    Site name or label
                  </label>
                  <input
                    id="siteName"
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="e.g. Head office, Branch A"
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label
                    htmlFor="sitePostcode"
                    className="block text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-2"
                  >
                    UK postcode
                  </label>
                  <input
                    id="sitePostcode"
                    type="text"
                    value={sitePostcode}
                    onChange={(e) => setSitePostcode(e.target.value)}
                    placeholder="e.g. SW1A 1AA"
                    className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={handleAddSite}
                    disabled={!siteName.trim() || !sitePostcode.trim()}
                    className="w-full bg-[#0A3A66] hover:bg-[#0E2F52] disabled:opacity-50 text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add site</span>
                  </button>
                </div>
              </div>

              {/* Added Sites List or Empty State */}
              {sites.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-2xl p-6 text-center text-xs text-gray-500 bg-white">
                  No sites added yet. Add your first location above — add two or
                  more to plan them together.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-1">
                    Added Sites ({sites.length})
                  </div>
                  {sites.map((site) => (
                    <div
                      key={site.id}
                      className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xs"
                    >
                      <div>
                        <span className="font-bold text-sm text-[#0E2F52]">
                          {site.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-3">
                          ({site.postcode})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSite(site.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* What do your sites need? */}
              <div className="space-y-4 pt-2">
                <div>
                  <h3 className="text-base font-bold text-[#0E2F52] mb-1">
                    What do your sites need?
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tick what applies across your estate. This guides the
                    conversation — it doesn&apos;t generate a bandwidth figure
                    or imply any service is included.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Workloads Checkboxes */}
                  <div>
                    <div className="text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-3">
                      Workloads
                    </div>
                    <div className="space-y-2.5">
                      {WORKLOAD_OPTIONS.map((item) => {
                        const isChecked = selectedWorkloads.includes(item.id);
                        return (
                          <label
                            key={item.id}
                            className="flex items-center gap-3 cursor-pointer select-none text-sm text-gray-700 font-medium"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleWorkload(item.id)}
                              className="w-4 h-4 rounded border-gray-300 text-[#0A3A66] focus:ring-[#0A3A66] cursor-pointer"
                            />
                            <span>{item.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* If a site goes offline... Radio Options */}
                  <div>
                    <div className="text-xs font-bold text-[#0E2F52] uppercase tracking-wider mb-3">
                      If a site goes offline...
                    </div>
                    <div className="space-y-2.5">
                      {OFFLINE_OPTIONS.map((item) => {
                        const isSelected = selectedOffline === item.id;
                        return (
                          <label
                            key={item.id}
                            className="flex items-start gap-3 cursor-pointer select-none text-sm text-gray-700 font-medium pt-0.5"
                          >
                            <input
                              type="radio"
                              name="offlineBehavior"
                              checked={isSelected}
                              onChange={() => setSelectedOffline(item.id)}
                              className="w-4 h-4 mt-0.5 border-gray-300 text-[#0A3A66] focus:ring-[#0A3A66] cursor-pointer"
                            />
                            <div>
                              <div className="text-sm text-[#0E2F52] font-medium leading-snug">
                                {item.label}
                              </div>
                              {"sublabel" in item && item.sublabel && (
                                <div className="text-[11px] text-gray-500 leading-tight mt-0.5">
                                  {item.sublabel}
                                </div>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Send your plan to our team Form */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#0E2F52] mb-1">
                    Send your plan to our team
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    We&apos;ll review availability for each site and come back
                    with a suitable design and per-site costs. This is a
                    non-binding inquiry — nothing is ordered.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      value={contactData.companyName}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
                    />
                  </div>

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
                      value={contactData.contactName}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
                    />
                  </div>

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
                      value={contactData.email}
                      onChange={handleContactChange}
                      required
                      className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
                    />
                  </div>

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
                      value={contactData.phone}
                      onChange={handleContactChange}
                      className="w-full bg-white text-[#0E2F52] text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]"
                    />
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="agreed"
                      checked={contactData.agreed}
                      onChange={handleContactChange}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0A3A66] focus:ring-[#0A3A66] cursor-pointer"
                    />
                    <div className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-bold text-[#0E2F52]">
                        I agree to be contacted about this inquiry
                      </span>
                      <p className="mt-0.5 text-gray-500">
                        We&apos;ll use your details to respond, in line with our
                        Privacy Notice. This box is not pre-ticked.
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
                        <span>Sending plan...</span>
                      </>
                    ) : (
                      <>
                        <span>Send my site plan</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center sm:text-right">
                    We&apos;ll send a receipt reference and follow up by email.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
