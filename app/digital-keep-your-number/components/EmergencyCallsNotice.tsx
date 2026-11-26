import { AlertTriangle } from "lucide-react";

export default function EmergencyCallsNotice() {
  return (
    <section
      id="emergency-calls"
      className="w-full bg-white px-4 py-10 text-[#0E223B] antialiased sm:px-6 lg:py-12"
    >
      <div className="mx-auto w-full max-w-[1300px]">
        <div className="flex items-start gap-4 rounded-2xl border border-[#DCE8F6] bg-[#F4F9FF] px-5 py-5 shadow-[0_2px_10px_rgba(14,34,59,0.025)] sm:px-6 sm:py-6">
          {/* Icon Container (#EAF2FB) */}
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FB] text-[#28486B]">
            <AlertTriangle
              className="h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          {/* Emergency Calls Notice Copy */}
          <div>
            <h2 className="text-[14px] font-bold leading-snug text-[#0E223B] sm:text-[14.5px]">
              Emergency calls (999 / 112) after a transfer
            </h2>
            <p className="mt-1.5 max-w-[1120px] text-[12.5px] leading-[1.6] text-[#5B6B7F] sm:text-[13px]">
              On a digital line, the address registered for emergency services
              must be correct, and calls need power and working broadband — so
              they may not be possible during an outage. Keep an alternative
              such as a charged mobile, and make sure your registered location
              is up to date. If anyone at the premises relies on the phone line,
              tell us so we can plan around it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
