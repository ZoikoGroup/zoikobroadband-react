import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  User,
  Calendar,
  Clock,
  Monitor,
  CreditCard,
  Info,
} from "lucide-react";

const SWITCH_CHECK_ITEMS = [
  {
    icon: Calendar,
    title: "Your contract end date",
    subtitle: "When your current deal ends",
  },
  {
    icon: Clock,
    title: "Early-termination charges",
    subtitle: "Your provider can confirm these",
  },
  {
    icon: Monitor,
    title: "Equipment returns",
    subtitle: "Old kit you may need to send back",
  },
  {
    icon: CreditCard,
    title: "Possible billing overlap",
    subtitle: "Where services briefly run together",
  },
] as const;

export default function SwitchBroadbandHero() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0B355F] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/switch/1.jpg"
        alt="Couple reviewing broadband switch details at a dining table"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #0B355F 0%, rgba(11, 53, 95, 0.98) 49%, rgba(11, 53, 95, 0.65) 50%, rgba(11, 53, 95, 0.50) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow Tag */}
            <div className="flex items-center space-x-3">
              <span className="h-[2px] w-7 bg-[#F5B82E]" />
              <span className="text-xs font-bold tracking-widest text-[#F5B82E] uppercase">
                HOME BROADBAND &bull; SWITCHING
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Switch your home broadband to Zoiko
            </h1>

            {/* Description */}
            <p className="text-base text-slate-200 leading-relaxed max-w-lg">
              Start with your address to explore available plans and the next
              steps for switching. The details depend on your address, your
              current service and your existing contract.
            </p>

            {/* Side-by-Side CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/check-availability"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>Check Availability</span>
              </Link>

              <Link
                href="/broadband-deals"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <span>Compare Broadband Plans</span>
              </Link>
            </div>

            {/* Existing Customer Link */}
            <div className="flex items-center gap-2 pt-1 text-sm text-slate-300">
              <User className="w-4 h-4 text-[#F5B82E] shrink-0" />
              <span>Already with Zoiko?</span>
              <Link
                href="/my-account"
                className="font-bold text-white underline underline-offset-4 hover:text-[#F5B82E] transition-colors"
              >
                Manage your service
              </Link>
            </div>
          </div>

          {/* Right Column: Translucent Checklist Card */}
          <div className="lg:col-span-6 lg:pl-6">
            <div className="relative rounded-3xl bg-[#0B355FDB] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Subtle decorative arc */}
              <div
                className="pointer-events-none absolute -bottom-20 -right-10 w-72 h-72 rounded-full border border-white/10"
                aria-hidden="true"
              />

              {/* Card Header */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-1">
                  Before you switch
                </h2>
                <p className="text-sm text-slate-300">
                  A quick check of your current deal avoids surprises.
                </p>
              </div>

              {/* Checklist Rows */}
              <div className="space-y-3">
                {SWITCH_CHECK_ITEMS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl bg-[#092848]/70 border border-white/10 p-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#F5B82E] text-[#0E2F52] flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {item.title}
                        </div>
                        <div className="text-sm text-slate-300">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer Footnote */}
              <div className="flex items-start gap-2.5 mt-6 pt-4 border-t border-white/10">
                <Info className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  We don&apos;t promise &ldquo;free switching&rdquo; or cover
                  exit fees unless it&apos;s stated on a specific plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
