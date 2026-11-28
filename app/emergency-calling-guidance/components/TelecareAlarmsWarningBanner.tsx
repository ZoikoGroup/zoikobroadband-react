import React from "react";
import { AlertTriangle } from "lucide-react";

export default function TelecareAlarmsWarningBanner() {
  return (
    <section
      id="telecare-warning"
      aria-label="Telecare, alarms and medical equipment safety notice"
      className="w-full bg-[#F5F8FC] font-sans antialiased overflow-x-hidden py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FDF2EF] border border-[#F3D1C8] rounded-3xl px-6 py-6 sm:px-8 sm:py-7 flex items-start gap-4 sm:gap-5 shadow-2xs">
          {/* Warning Icon Badge */}
          <div className="w-11 h-11 rounded-xl bg-[#FAE2DC] text-[#9A281E] flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Warning Copy */}
          <div className="space-y-1.5">
            <h2 className="text-base sm:text-lg font-extrabold text-[#7F1D1D] tracking-tight leading-snug">
              Telecare, alarms and medical equipment
            </h2>

            <p className="text-xs sm:text-sm text-[#8C2D23] leading-relaxed">
              Care alarms, telecare, medical alert devices, lifts and some
              security systems can depend on the phone line — and a dial tone
              doesn&apos;t prove they still work. Don&apos;t disconnect or
              switch anything to test. Contact your telecare or alarm provider
              and your landline provider to confirm a safe setup, and arrange a
              qualified review. If a device is critical and you&apos;re unsure
              it&apos;s working, treat it as not working and keep another way to
              call for help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
