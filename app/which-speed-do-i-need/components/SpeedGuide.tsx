import React from "react";
import Link from "next/link";
import { AlertCircle, Wifi, Tv, Monitor, Gamepad2 } from "lucide-react";

const NAVIGATION_ITEMS = [
  { label: "Speed guide", href: "#speed-guide" },
  { label: "Speed finder", href: "#speed-finder" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Availability", href: "#availability" },
  { label: "FAQs", href: "#faqs" },
] as const;

const PROFILE_CARDS = [
  {
    icon: Wifi,
    title: "Everyday & smaller homes",
    description:
      "Browsing, email, social and HD streaming on a few devices, mostly one or two at a time.",
    actionLabel: "Download matters most",
    href: "#download-matters",
  },
  {
    icon: Tv,
    title: "Family & shared homes",
    description:
      "Several people streaming, gaming and using smart devices at the same time across the evening.",
    actionLabel: "Headroom for overlap",
    href: "#headroom-overlap",
  },
  {
    icon: Monitor,
    title: "Work & creative tasks",
    description:
      "Frequent video calls, cloud backups and sending large files, where upload also counts.",
    actionLabel: "Upload & stability",
    href: "#upload-stability",
  },
  {
    icon: Gamepad2,
    title: "Gaming & real-time",
    description:
      "Online gaming and live calls, where responsiveness (latency) matters as much as raw speed.",
    actionLabel: "Latency & reliability",
    href: "#latency-reliability",
  },
] as const;

export default function SpeedGuide() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans antialiased overflow-x-hidden">
      {/* Header / Navbar */}
      <header className="w-full border-b border-gray-100 py-4 px-6 md:px-12 flex justify-center items-center">
        <nav className="flex space-x-8 md:space-x-12 text-sm font-medium text-gray-600">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-[#0f172a] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        {/* Notice Banner */}
        <div className="bg-[#fffbeb] border-2 border-[#F0B429] border-l-4 border-l-[#F0B429] rounded-2xl p-5 md:p-6 mb-16 relative flex items-start gap-4 shadow-sm">
          <div className="p-2 bg-[#fde68a] text-[#b45309] rounded-xl shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#92400e] mb-1">
              This is a guide, not a quote
            </h2>
            <p className="text-sm text-[#78350f] leading-relaxed">
              We separate two things on purpose: a general idea of what may suit
              your household, and what is actually available to order at your
              exact address. This page gives guidance only — it is not a
              personalised speed guarantee or an offer.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
            <span className="text-xs font-bold tracking-widest text-[#f59e0b] uppercase">
              SPEED GUIDE
            </span>
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
            Find a speed that fits how you use the internet
          </h1>
          <p className="text-base text-gray-600">
            Not sure where to start? These common household profiles are a
            quick, no-quiz way to see what usually matters most.
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILE_CARDS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 bg-[#f1f5f9] rounded-xl flex items-center justify-center text-[#1e293b] mb-6">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0f172a] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>
                <div>
                  <Link
                    href={card.href}
                    className="inline-flex items-center text-sm font-semibold text-[#0f172a] hover:text-blue-600 group"
                  >
                    <span>{card.actionLabel}</span>
                    <span className="ml-1.5 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
