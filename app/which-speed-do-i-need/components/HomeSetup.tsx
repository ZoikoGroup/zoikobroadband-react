import React from "react";
import Link from "next/link";

const STEPS_DATA = [
  {
    number: "1",
    title: "Place the router well",
    description:
      "Keep it central, off the floor and away from thick walls, TVs and other electronics.",
  },
  {
    number: "2",
    title: "Test on a wired device",
    description:
      "A wired (Ethernet) test isolates Wi-Fi limits so you can see your line speed more accurately.",
  },
  {
    number: "3",
    title: "Mind interference",
    description:
      "Walls, distance and many connected devices can all reduce in-home Wi-Fi performance.",
  },
  {
    number: "4",
    title: "Test more than once",
    description:
      "Speed-test results vary by device, Wi-Fi and time of day. Check a few times for a fairer picture.",
  },
] as const;

export default function HomeSetup() {
  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Header & Steps */}
          <div className="lg:col-span-7">
            {/* Section Tag */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
              <span className="text-xs font-bold tracking-widest text-[#f59e0b] uppercase">
                YOUR HOME SETUP
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-4 leading-tight">
              Your Wi-Fi is not the same as your line speed
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-10">
              The speed that reaches your home and the speed you get in a far
              bedroom can differ. A few simple things make a real
              difference.
            </p>

            {/* Steps List */}
            <div className="space-y-6">
              {STEPS_DATA.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#f1f5f9] text-[#0E2F52] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0E2F52] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Highlight Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0A3A66] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
              {/* Decorative background circles */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/10 pointer-events-none"></div>
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border border-white/10 pointer-events-none"></div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4 relative z-10">
                Wired test vs Wi-Fi
              </h3>

              <p className="text-sm text-blue-100 leading-relaxed mb-8 relative z-10">
                A speed test over Wi-Fi measures your whole home environment —
                not just the connection into your property. For a cleaner
                comparison, test on a device plugged in near the router, then
                compare rooms.
              </p>

              <div className="relative z-10">
                <Link
                  href="#troubleshooting"
                  className="inline-flex items-center text-sm font-semibold text-[#f59e0b] hover:underline group"
                >
                  <span>Visit broadband troubleshooting</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
