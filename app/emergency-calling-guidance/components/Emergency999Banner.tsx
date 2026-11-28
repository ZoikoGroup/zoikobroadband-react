import React from "react";
import { AlertTriangle } from "lucide-react";

export default function Emergency999Banner() {
  return (
    <section
      aria-label="Emergency 999 or 112 notice"
      className="w-full bg-white text-white font-sans antialiased overflow-x-hidden py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-3xl px-6 py-7 sm:px-9 sm:py-8 flex items-start gap-4 sm:gap-5 shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, #8A1C14 0%, #9E2118 55%, #861B13 100%)",
          }}
        >
          {/* Warning Icon Badge */}
          <div className="w-11 h-11 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Emergency Text Content */}
          <div className="space-y-2.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              In an emergency, call 999 (or 112) now
            </h2>

            <p className="text-xs sm:text-sm text-white/95 leading-relaxed max-w-4xl">
              Use any working phone — including a mobile. If you can&apos;t
              speak or hear, there are accessible emergency routes below (text
              relay, emergency SMS, 999 BSL and the Silent Solution).
            </p>

            <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed pt-0.5">
              This page is public guidance only. It is not an emergency service
              and cannot contact 999 for you. Never call 999 or 112 to test your
              line.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
