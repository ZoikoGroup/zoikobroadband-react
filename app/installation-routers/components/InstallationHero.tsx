import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Info,
  Waypoints,
  HardDrive,
  Router,
  Smartphone,
  ArrowDown,
} from "lucide-react";

const CONNECTION_STEPS = [
  {
    icon: Waypoints,
    title: "External network",
    subtitle: "Fibre route to your property",
  },
  {
    icon: HardDrive,
    title: "ONT",
    subtitle: "Optical Network Terminal, indoors",
  },
  {
    icon: Router,
    title: "Router",
    subtitle: "Connected by Ethernet to the ONT",
  },
  {
    icon: Smartphone,
    title: "Your devices",
    subtitle: "Over Wi-Fi or Ethernet",
  },
] as const;

export default function InstallationHero() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#0B355F] text-white font-sans antialiased overflow-x-hidden flex items-center">
      {/* Full-bleed background image */}
      <Image
        src="/Images/ins/1.jpg"
        alt="Engineer installing broadband equipment in a living room"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Exact Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #0B355F 0%, rgba(11, 53, 95, 0.98) 45%, rgba(11, 53, 95, 0.72) 72%, rgba(11, 53, 95, 0.30) 100%)",
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
                HOME BROADBAND &bull; GETTING CONNECTED
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Installation &amp; Routers
            </h1>

            {/* Description */}
            <p className="text-base text-slate-200 leading-relaxed max-w-lg">
              Understand the steps, prepare your home and connect your router.
              Your setup depends on the connection available at your address and
              the details confirmed in your order.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/check-availability"
                className="inline-flex items-center justify-center bg-[#F5B82E] hover:bg-amber-400 text-[#0E2F52] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2 shrink-0" />
                <span>Check Broadband Availability</span>
              </Link>

              <Link
                href="/track-order"
                className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
              >
                <Clock className="w-4 h-4 mr-2 shrink-0" />
                <span>Track Your Order</span>
              </Link>
            </div>

            {/* Bottom Note */}
            <div className="flex items-start gap-2.5 pt-2 max-w-md">
              <Info className="w-4 h-4 text-[#F5B82E] shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 leading-relaxed">
                Your confirmed order details determine your appointment and
                equipment. You can browse this guide without signing in.
              </p>
            </div>
          </div>

          {/* Right Column: Translucent Diagram Card */}
          <div className="lg:col-span-6 lg:pl-6">
            <div className="relative rounded-3xl bg-[#0B355FDE] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Subtle decorative arc */}
              <div
                className="pointer-events-none absolute -bottom-24 -right-12 w-72 h-72 rounded-full border border-white/10"
                aria-hidden="true"
              />

              {/* Card Header */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-1">
                  How a Full Fibre connection fits together
                </h2>
                <p className="text-sm text-slate-300">
                  Illustrative only — your actual equipment depends on your
                  order.
                </p>
              </div>

              {/* Connection Steps */}
              <div className="space-y-2">
                {CONNECTION_STEPS.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <React.Fragment key={step.title}>
                      <div className="flex items-center gap-4 rounded-2xl bg-[#092848]/70 border border-white/10 p-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#F5B82E] text-[#0E2F52] flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">
                            {step.title}
                          </div>
                          <div className="text-sm text-slate-300">
                            {step.subtitle}
                          </div>
                        </div>
                      </div>

                      {index < CONNECTION_STEPS.length - 1 && (
                        <div className="flex justify-center py-0.5">
                          <ArrowDown className="w-4 h-4 text-slate-400" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Card Footer Footnote */}
              <div className="flex items-start gap-2.5 mt-6 pt-4 border-t border-white/10">
                <Info className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  Part Fibre (SOGEA) connects through your local access line and
                  socket instead of an ONT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
