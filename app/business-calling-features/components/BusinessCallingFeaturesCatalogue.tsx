"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  CornerDownRight,
  Headphones,
  Shield,
  BarChart2,
  Users,
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  X,
} from "lucide-react";

export type FeatureCategory =
  | "All"
  | "Reception"
  | "Routing"
  | "Control"
  | "Insights"
  | "Collaboration";

type AvailabilityBadgeVariant =
  | "available-some-plans"
  | "requires-checking"
  | "specialist-setup";

interface BusinessFeatureItem {
  id: string;
  category: Exclude<FeatureCategory, "All">;
  title: string;
  description: string;
  badgeText: string;
  badgeVariant: AvailabilityBadgeVariant;
  dependencyNote: string;
  moreDetail: string;
}

const CATEGORY_TABS: readonly FeatureCategory[] = [
  "All",
  "Reception",
  "Routing",
  "Control",
  "Insights",
  "Collaboration",
] as const;

const BUSINESS_FEATURES: readonly BusinessFeatureItem[] = [
  {
    id: "call-forwarding",
    category: "Routing",
    title: "Call forwarding",
    description: "Route incoming calls to an approved destination.",
    badgeText: "Available on some plans",
    badgeVariant: "available-some-plans",
    dependencyNote:
      "Depends on line, plan, number and target. Forwarded-call legs may cost extra.",
    moreDetail:
      "Supports unconditional, busy, no-answer, and unreachable forwarding rules to approved UK landline, mobile, or internal destination numbers.",
  },
  {
    id: "time-of-day-routing",
    category: "Routing",
    title: "Time-of-day routing",
    description:
      "Send calls different ways for opening hours, holidays and exceptions.",
    badgeText: "Requires checking",
    badgeVariant: "requires-checking",
    dependencyNote: "Needs schedules, override rules and network eligibility.",
    moreDetail:
      "Define standard weekly business hours, bank holiday schedules, and manual emergency or ad-hoc override destinations.",
  },
  {
    id: "hunt-groups-simultaneous-ring",
    category: "Routing",
    title: "Hunt groups / simultaneous ring",
    description: "Ring an ordered or shared set of approved users and devices.",
    badgeText: "Requires checking",
    badgeVariant: "requires-checking",
    dependencyNote:
      "Group licensing, ring order, fallback and concurrency rules apply.",
    moreDetail:
      "Distribute incoming calls across a team using sequential, round-robin, or simultaneous ring patterns with configurable overflow rules.",
  },
  {
    id: "call-queues",
    category: "Reception",
    title: "Call queues",
    description: "Hold waiting callers and route them to staff when supported.",
    badgeText: "Requires checking",
    badgeVariant: "requires-checking",
    dependencyNote:
      "Capacity, announcements and wait-time limits can’t be assumed.",
    moreDetail:
      "Places callers in a managed queue with comfort messages and agent distribution rules, subject to seat and plan capacity.",
  },
  {
    id: "auto-attendant-ivr",
    category: "Reception",
    title: "Auto attendant / IVR",
    description: "Offer a keypad menu so callers reach the right place.",
    badgeText: "Specialist setup",
    badgeVariant: "specialist-setup",
    dependencyNote:
      "Menus, DTMF, holidays and accessible alternatives need setup.",
    moreDetail:
      "Plays recorded greeting prompts and routes callers based on keypad input, including timeout fallback and operator breakout options.",
  },
  {
    id: "call-transfer-hold",
    category: "Reception",
    title: "Call transfer / hold",
    description: "Move active calls between approved extensions.",
    badgeText: "Available on some plans",
    badgeVariant: "available-some-plans",
    dependencyNote: "Blind/consultative support depends on your device or app.",
    moreDetail:
      "Enables placing callers on hold and performing either direct (blind) or announced (consultative) transfers between permitted endpoints.",
  },
  {
    id: "voicemail-delivery",
    category: "Reception",
    title: "Voicemail / delivery",
    description: "Capture messages with optional notifications.",
    badgeText: "Available on some plans",
    badgeVariant: "available-some-plans",
    dependencyNote:
      "Delivery mode, access, retention and security vary by plan.",
    moreDetail:
      "Records caller messages when lines are busy or out of hours, with retrieval via handset, portal, or email notification where enabled.",
  },
  {
    id: "caller-id-display-withholding",
    category: "Control",
    title: "Caller ID display / withholding",
    description:
      "Manage your calling-line identity in line with provider rules.",
    badgeText: "Available on some plans",
    badgeVariant: "available-some-plans",
    dependencyNote:
      "CLI rights and a valid dialable number required; emergency exceptions apply.",
    moreDetail:
      "Controls presentation or withholding of your outbound presentation number in compliance with UK Ofcom CLI guidelines.",
  },
  {
    id: "call-screening-rejection",
    category: "Control",
    title: "Call screening / rejection",
    description: "Apply unwanted-call controls or blocked-number rules.",
    badgeText: "Requires checking",
    badgeVariant: "requires-checking",
    dependencyNote:
      "May block important withheld calls; a false-positive recovery is always provided.",
    moreDetail:
      "Filters anonymous, withheld, or explicitly block-listed numbers according to configured account screening thresholds.",
  },
  {
    id: "outbound-call-barring",
    category: "Control",
    title: "Outbound call barring",
    description: "Control classes of outbound numbers or destinations.",
    badgeText: "Requires checking",
    badgeVariant: "requires-checking",
    dependencyNote:
      "Emergency calling is never silently blocked; permissions and audit apply.",
    moreDetail:
      "Restricts dialling to premium-rate, international, or non-geographic number ranges while preserving emergency 999/112 access.",
  },
  {
    id: "call-recording",
    category: "Insights",
    title: "Call recording",
    description: "Record calls only when lawfully enabled and appropriate.",
    badgeText: "Specialist setup",
    badgeVariant: "specialist-setup",
    dependencyNote:
      "Legal duties: lawful basis, notices, secure storage, retention, access, pause and delete.",
    moreDetail:
      "Captures inbound and/or outbound audio subject to UK GDPR, PCI-DSS pause/resume requirements, and caller notification duties.",
  },
  {
    id: "call-analytics-reports",
    category: "Insights",
    title: "Call analytics / reports",
    description: "Summarise permitted operational calling metrics.",
    badgeText: "Requires checking",
    badgeVariant: "requires-checking",
    dependencyNote:
      "Role-based access and data minimisation; no invented live analytics.",
    moreDetail:
      "Provides historical summaries of call volumes, answered/missed ratios, and call durations for authorised administrators.",
  },
  {
    id: "conference-calling",
    category: "Collaboration",
    title: "Conference calling",
    description: "Bring permitted participants into one call.",
    badgeText: "Available on some plans",
    badgeVariant: "available-some-plans",
    dependencyNote: "Participant caps, tariffs and codec compatibility apply.",
    moreDetail:
      "Allows multi-party audio bridging across internal extensions and external participants up to plan-specific participant limits.",
  },
  {
    id: "softphone-mobile-access",
    category: "Collaboration",
    title: "Softphone / mobile access",
    description: "Use a supported business calling app, where sold.",
    badgeText: "Available on some plans",
    badgeVariant: "available-some-plans",
    dependencyNote:
      "OS, device, authentication and network dependencies apply.",
    moreDetail:
      "Extends your business voice identity to approved desktop or mobile applications over reliable Wi-Fi or mobile data.",
  },
  {
    id: "integrations-crm-connectors",
    category: "Insights",
    title: "Integrations / CRM connectors",
    description: "Surface approved call context in permitted business systems.",
    badgeText: "Specialist setup",
    badgeVariant: "specialist-setup",
    dependencyNote:
      "Consent, APIs, account tier, scope and a data-security review apply.",
    moreDetail:
      "Connects call events or screen-pop metadata with supported CRM tools following security and API compatibility verification.",
  },
] as const;

const CATEGORY_ICON_MAP: Record<
  Exclude<FeatureCategory, "All">,
  React.ComponentType<{ className?: string }>
> = {
  Routing: CornerDownRight,
  Reception: Headphones,
  Control: Shield,
  Insights: BarChart2,
  Collaboration: Users,
};

const BADGE_STYLE_MAP: Record<AvailabilityBadgeVariant, string> = {
  "available-some-plans": "bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]",
  "requires-checking": "bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]",
  "specialist-setup": "bg-[#FEF7E6] text-[#B45309] border border-[#FDE68A]",
};

export default function BusinessCallingFeaturesCatalogue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<FeatureCategory>("All");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filteredFeatures = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return BUSINESS_FEATURES.filter((feature) => {
      const matchesCategory =
        selectedCategory === "All" || feature.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      return (
        feature.title.toLowerCase().includes(query) ||
        feature.description.toLowerCase().includes(query) ||
        feature.category.toLowerCase().includes(query) ||
        feature.dependencyNote.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const toggleMoreDetail = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectedCompareFeatures = useMemo(
    () => BUSINESS_FEATURES.filter((f) => compareIds.includes(f.id)),
    [compareIds],
  );

  return (
    <section
      id="all-features"
      aria-label="Business calling features catalogue"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/70"
    >
      <div className="max-w-[1300px] mx-auto">
        {/* Top Search Input + Feature Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features, e.g. voicemail, IVR, recording"
              aria-label="Search business calling features"
              className="w-full bg-white border border-gray-200/90 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#0E2F52] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0A3A66]/20 focus:border-[#0A3A66] transition-colors shadow-2xs"
            />
          </div>

          <div className="text-xs sm:text-sm font-bold text-[#0E2F52] shrink-0 sm:px-2">
            {filteredFeatures.length}{" "}
            {filteredFeatures.length === 1 ? "feature" : "features"}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter features by category"
          className="flex items-center gap-2 overflow-x-auto pb-2 mb-6"
        >
          {CATEGORY_TABS.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#0A3A66] text-white shadow-2xs"
                    : "bg-white text-[#0E2F52] border border-gray-200/90 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Active Comparison Drawer */}
        {selectedCompareFeatures.length > 0 && (
          <div className="mb-6 bg-white border border-[#0A3A66]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-[#0E2F52] mr-1">
                Selected to compare ({selectedCompareFeatures.length}):
              </span>
              {selectedCompareFeatures.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1.5 bg-[#EFF6FF] text-[#0E2F52] text-xs font-semibold px-3 py-1 rounded-full"
                >
                  <span>{item.title}</span>
                  <button
                    type="button"
                    onClick={() => toggleCompare(item.id)}
                    aria-label={`Remove ${item.title} from comparison`}
                    className="text-gray-500 hover:text-[#0E2F52] cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="text-xs font-semibold text-gray-500 hover:text-[#0E2F52] cursor-pointer"
              >
                Clear
              </button>
              <Link
                href="#request-a-quote"
                className="inline-flex items-center gap-1.5 bg-[#0A3A66] hover:bg-[#0E2F52] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                <span>Ask about selected</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* 3-Column Feature Cards Grid */}
        {filteredFeatures.length === 0 ? (
          <div className="bg-white border border-gray-200/90 rounded-2xl p-10 text-center">
            <p className="text-sm font-bold text-[#0E2F52] mb-1">
              No matching features found
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              Try clearing your search term or switching back to All categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="inline-flex items-center justify-center bg-[#0A3A66] text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFeatures.map((feature) => {
              const CategoryIcon = CATEGORY_ICON_MAP[feature.category];
              const isExpanded = Boolean(expandedIds[feature.id]);
              const isCompared = compareIds.includes(feature.id);

              return (
                <article
                  key={feature.id}
                  className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    {/* Category Icon Pill + Eyebrow */}
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#0E2F52] uppercase mb-3">
                      <span className="w-6 h-6 rounded-md bg-[#EFF6FF] text-[#0A3A66] flex items-center justify-center shrink-0">
                        <CategoryIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                      </span>
                      <span>{feature.category}</span>
                    </div>

                    {/* Feature Title & Description */}
                    <h3 className="text-base font-extrabold text-[#0E2F52] tracking-tight mb-1.5 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Availability Status Pill */}
                    <div className="pb-4 mb-4 border-b border-gray-100">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                          BADGE_STYLE_MAP[feature.badgeVariant]
                        }`}
                      >
                        {feature.badgeText}
                      </span>
                    </div>

                    {/* Dependency Note */}
                    <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed mb-4">
                      <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <span>{feature.dependencyNote}</span>
                    </div>

                    {/* Expandable More Detail Disclosure */}
                    <div className="mb-4">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => toggleMoreDetail(feature.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0A3A66] hover:text-[#0E2F52] transition-colors cursor-pointer"
                      >
                        <span>More detail</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <p className="mt-2.5 pt-2.5 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
                          {feature.moreDetail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Add to compare & Ask about this */}
                  <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isCompared}
                      onClick={() => toggleCompare(feature.id)}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#0E2F52] transition-colors cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isCompared
                            ? "bg-[#0A3A66] border-[#0A3A66] text-white"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {isCompared && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span>Add to compare</span>
                    </button>

                    <Link
                      href={`#request-a-quote?feature=${encodeURIComponent(feature.title)}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A3A66] hover:text-[#0E2F52] transition-colors group"
                    >
                      <span>Ask about this</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
