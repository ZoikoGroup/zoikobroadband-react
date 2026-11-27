import { AlertTriangle } from "lucide-react";

interface SectionNavLink {
  label: string;
  href: string;
}

const sectionNavLinks: SectionNavLink[] = [
  { label: "Don't cancel early", href: "#dont-cancel-early" },
  { label: "How porting works", href: "#how-porting-works" },
  { label: "Eligibility", href: "#eligibility" },
  { label: "Emergency calls", href: "#emergency-calls" },
  { label: "Check my path", href: "#check-my-path" },
  { label: "Timing", href: "#timing" },
  { label: "Costs", href: "#costs" },
  { label: "FAQs", href: "#faqs" },
];

export default function NumberTransferNavAndNotice() {
  return (
    <div className="w-full bg-white text-[#1E293B] antialiased">
      {/* Sticky/Top Anchor Navigation Bar */}
      <nav
        aria-label="Number transfer sections"
        className="w-full border-b border-[#E5E9F0] bg-white"
      >
        <div className="mx-auto flex w-full max-w-[1300px] items-center gap-6 overflow-x-auto px-4 py-4 sm:px-6 lg:gap-7">
          {sectionNavLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 text-[12.5px] font-semibold tracking-[-0.01em] text-[#334155] transition-colors hover:text-[#0F172A]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Don't Cancel Early Amber Warning Callout */}
      <section
        id="dont-cancel-early"
        className="w-full bg-white px-4 py-10 sm:px-6 lg:py-12"
      >
        <div className="mx-auto w-full max-w-[1300px]">
          <div className="flex items-start gap-4 rounded-xl border border-[#F2E0B6] border-l-[3.5px] border-l-[#D9A12B] bg-[#FDF7E7] px-5 py-5 shadow-[0_2px_10px_rgba(120,83,16,0.03)] sm:px-6 sm:py-6">
            {/* Soft Amber Warning Icon Box */}
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F7E8C3] text-[#B7791F]">
              <AlertTriangle
                className="h-4 w-4"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </div>

            {/* Warning Copy */}
            <div>
              <h2 className="text-[14px] font-bold leading-snug text-[#5C3D0C] sm:text-[14.5px]">
                Don&apos;t cancel your current phone service early
              </h2>
              <p className="mt-1.5 max-w-[1040px] text-[12.5px] leading-[1.6] text-[#7A561B] sm:text-[13px]">
                Cancelling before a transfer is confirmed can lose your number
                for good. Keep your existing service active until we confirm the
                transfer plan — and check whether anything else (like a
                broadband bundle, calls package or linked services) depends on
                that line before you change anything.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
