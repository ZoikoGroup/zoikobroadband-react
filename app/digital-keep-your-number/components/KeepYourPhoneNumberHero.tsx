import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Info } from "lucide-react";

interface TransferStep {
  step: string;
  title: string;
  description: string;
}

const transferSteps: TransferStep[] = [
  {
    step: "1",
    title: "Request",
    description: "You ask us to look into it",
  },
  {
    step: "2",
    title: "Validate & confirm date",
    description: "Checks with the old provider",
  },
  {
    step: "3",
    title: "Prepare & execute",
    description: "The transfer is carried out",
  },
  {
    step: "4",
    title: "Test & confirm",
    description: "We check it works",
  },
];

export default function KeepYourPhoneNumberHero() {
  return (
    <section
      id="keep-your-phone-number-hero"
      className="relative w-full overflow-hidden bg-[#0E223B] text-white antialiased"
    >
      {/* Full-Bleed Background Image + Deep Navy Atmospheric Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/Images/num/1.jpg"
          alt="Person checking a smartphone beside a laptop in a dimly lit workspace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0E243E]/95 via-[#122B49]/85 to-[#132944]/80"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[#0B1B30]/35" />
      </div>

      {/* Subtle Bottom-Right Decorative Concentric Arcs */}
      <svg
        viewBox="0 0 320 320"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 text-white/10"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="220"
          cy="220"
          r="145"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="220"
          cy="220"
          r="195"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[580px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-16">
        {/* Left Editorial Column */}
        <div className="max-w-[530px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-[1.5px] w-6 bg-[#F6C431]" />
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-[#F6C431]">
              Digital lines • Switching &amp; support
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-4 text-[40px] font-extrabold leading-[1.08] tracking-[-0.025em] text-white sm:text-[52px]">
            Keep Your Phone Number
          </h1>

          {/* Supporting Description */}
          <p className="mt-5 max-w-[495px] text-[14px] leading-[1.65] text-white/80 sm:text-[15px]">
            Moving to Zoiko, changing address or upgrading your line? You can
            often keep your existing number — but it depends on your number,
            provider and account, and it&apos;s never guaranteed. Here&apos;s
            how to plan it safely.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link
              href="#check-transfer-path"
              className="inline-flex items-center gap-2 rounded-lg bg-[#F6C431] px-5 py-3 text-[12.5px] font-bold text-[#0F1E33] shadow-[0_8px_22px_rgba(246,196,49,0.28)] transition-colors hover:bg-[#e7b524]"
            >
              <span>Check my transfer path</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-[#122640]/55 px-5 py-3 text-[12.5px] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/10"
            >
              Speak to our team
            </Link>
          </div>

          {/* Non-Binding Inquiry Note */}
          <div className="mt-6 flex max-w-[475px] items-start gap-2.5 text-[11px] leading-[1.55] text-white/60">
            <Info
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/55"
              aria-hidden="true"
            />
            <p>
              Checking a transfer path is a non-binding inquiry. No number is
              transferred and no order is placed from this page.
            </p>
          </div>
        </div>

        {/* Right Column: Translucent "How a transfer works" Process Card */}
        <div className="w-full lg:ml-auto lg:max-w-[500px]">
          <div className="rounded-[20px] border border-white/15 bg-[#FFFFFF0F] p-6 shadow-[0_18px_44px_rgba(6,16,30,0.35)] backdrop-blur-md sm:p-7">
            <h2 className="text-[16.5px] font-bold leading-snug text-white">
              How a transfer works
            </h2>
            <p className="mt-1 text-[12px] text-white/70">
              A number moves from your old provider to Zoiko.
            </p>

            {/* 4-Step Vertical Flow */}
            <div className="mt-5">
              {transferSteps.map((item, idx) => (
                <div key={item.step}>
                  <div className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#08254366] px-4 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6C431] text-[12.5px] font-extrabold text-[#0F1E33]">
                      {item.step}
                    </span>

                    <div>
                      <h3 className="text-[13.5px] font-bold leading-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[11.5px] text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {idx < transferSteps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="flex items-center py-1.5 pl-7 text-white/45"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Card Footer Disclaimer */}
            <div className="mt-5 flex items-center gap-2 text-[11px] text-white/60">
              <Info
                className="h-3.5 w-3.5 shrink-0 text-white/50"
                aria-hidden="true"
              />
              <p>
                No transfer date is set until it&apos;s confirmed — we
                don&apos;t guess a date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
