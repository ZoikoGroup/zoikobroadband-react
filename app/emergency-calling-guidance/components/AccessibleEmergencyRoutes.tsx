import React from "react";
import { Monitor, Smartphone, Video, CheckCircle2 } from "lucide-react";

const ACCESSIBLE_EMERGENCY_ROUTES = [
  {
    icon: Monitor,
    title: "Relay UK (text relay)",
    content: (
      <>
        Relay UK lets you contact 999 using text. Dial{" "}
        <strong className="font-bold text-[#0E2F52]">18000</strong> for
        emergencies through the Relay UK app or a textphone. See the official
        Relay UK guidance to set it up.
      </>
    ),
  },
  {
    icon: Smartphone,
    title: "emergencySMS",
    content: (
      <>
        Lets you text 999 from a mobile if you can&apos;t call — but you must{" "}
        <strong className="font-bold text-[#0E2F52]">
          register in advance
        </strong>
        . Text &lsquo;register&rsquo; to 999 and follow the reply. It won&apos;t
        work unless you&apos;ve registered first.
      </>
    ),
  },
  {
    icon: Video,
    title: "999 BSL",
    content: (
      <>
        A video relay service with a British Sign Language interpreter for 999.
        See the official 999 BSL service for how to use it on your device.
      </>
    ),
  },
  {
    icon: CheckCircle2,
    title: "Silent Solution (press 55)",
    content: (
      <>
        If you call 999 and can&apos;t speak, the call is answered — if
        prompted, press <strong className="font-bold text-[#0E2F52]">55</strong>{" "}
        (the Silent Solution) so police know it&apos;s a genuine emergency. See
        the official Police.uk guidance.
      </>
    ),
  },
] as const;

export default function AccessibleEmergencyRoutes() {
  return (
    <section
      id="accessible-routes"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              ACCESSIBLE ROUTES
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            If you can&apos;t make an ordinary voice call
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            These are official UK ways to reach 999 if you&apos;re deaf, hard of
            hearing, or can&apos;t speak. Set up anything that needs registering{" "}
            <strong className="font-bold text-[#0E2F52]">in advance</strong> —
            and follow the official guidance for each.
          </p>
        </div>

        {/* 2x2 Accessible Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACCESSIBLE_EMERGENCY_ROUTES.map((route) => {
            const IconComponent = route.icon;

            return (
              <div
                key={route.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="font-extrabold text-base text-[#0E2F52] mb-2 leading-snug">
                    {route.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {route.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Footnote */}
        <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
          These are national services run by the emergency services and relay
          providers — not by Zoiko. Always use the official guidance, and
          register in advance where required.
        </p>
      </div>
    </section>
  );
}
