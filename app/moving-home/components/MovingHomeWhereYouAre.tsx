import React from "react";
import Link from "next/link";
import { Info, User, Home, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Where you are", href: "#where-you-are" },
  { label: "New address", href: "#new-address" },
  { label: "Your current service", href: "#your-current-service" },
  { label: "Timeline", href: "#timeline" },
  { label: "Phone & alarms", href: "#phone-alarms" },
  { label: "Checklist", href: "#checklist" },
  { label: "FAQs", href: "#faqs" },
] as const;

const MOVE_OPTIONS = [
  {
    icon: User,
    title: "I'm an existing Zoiko customer",
    description:
      "See what moving could mean for your current plan, equipment and phone. You'll sign in to review your agreement or make account changes.",
    actionLabel: "See what applies to me",
    href: "#your-current-service",
    footnote: "Public info here is advisory only.",
  },
  {
    icon: Home,
    title: "I'm looking for broadband at my new home",
    description:
      "Check what's available at the address you're moving to and compare eligible plans. No account needed to check availability.",
    actionLabel: "Check my new address",
    href: "#new-address",
    footnote: "We don't store your address to browse.",
  },
] as const;

export default function MovingHomeWhereYouAre() {
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
        id="where-you-are"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      >
        {/* Notice Banner */}
        <div className="relative bg-[#FFFBEB]/60 border border-[#F0B429] border-l-4 border-l-[#F0B429] rounded-2xl p-5 sm:p-6 mb-16 flex items-start gap-4 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#0E2F52] mb-1">
              Your new address decides what&apos;s available
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Service, speed and installation can differ at a new property —
              even nearby homes vary. We won&apos;t guarantee timing, price or
              that your current plan carries over. Don&apos;t cancel or change
              anything based on this page alone; confirm through your account or
              support.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              WHERE YOU ARE
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-4 leading-tight">
            Tell us where you are in your move
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            This helps us show the right next step. Nothing is preselected, and
            you can change it at any time.
          </p>
        </div>

        {/* Two-Column Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {MOVE_OPTIONS.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.title}
                className="bg-white border border-gray-200/90 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-11 h-11 bg-[#F1F5F9] rounded-xl flex items-center justify-center text-[#0E2F52] mb-6">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0E2F52] mb-3 leading-snug">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-8">
                    {option.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={option.href}
                    className="inline-flex items-center text-sm font-bold text-[#0E2F52] hover:text-[#0A3A66] group mb-2"
                  >
                    <span>{option.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-sm text-gray-500">{option.footnote}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
