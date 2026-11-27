import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PlanHowToKeepYourNumberBanner() {
  return (
    <section
      id="ready-to-plan-banner"
      className="w-full bg-white px-4 py-12 text-white antialiased sm:px-6 lg:py-16"
    >
      <div className="relative mx-auto w-full max-w-[1300px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0B325B] via-[#0D3C6B] to-[#114A82] px-6 py-12 text-center shadow-[0_14px_34px_rgba(11,50,91,0.16)] sm:px-10 sm:py-16">
        {/* Subtle Bottom-Right Decorative Circle Outline */}
        <svg
          viewBox="0 0 320 320"
          className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 text-white/10 sm:h-80 sm:w-80"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="185"
            cy="185"
            r="145"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>

        {/* Centered Content */}
        <div className="relative z-10 mx-auto max-w-[600px]">
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2.5">
            <span aria-hidden="true" className="h-[1.5px] w-5 bg-[#F6C431]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#F6C431]">
              Ready to plan it?
            </span>
          </div>

          {/* Two-Line Headline */}
          <h2 className="mt-3 text-[32px] font-extrabold leading-[1.14] tracking-[-0.025em] text-white sm:text-[40px]">
            Let&apos;s plan how to keep
            <br />
            your number
          </h2>

          {/* Supporting Description */}
          <p className="mx-auto mt-3.5 max-w-[540px] text-[13px] leading-[1.6] text-white/80 sm:text-[13.5px]">
            Check your transfer path or talk to a specialist. We&apos;ll plan
            around your number, provider and situation — and remember,
            don&apos;t cancel your old service until the transfer is confirmed.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#check-my-path"
              className="inline-flex items-center gap-2 rounded-lg bg-[#F6C431] px-5 py-2.5 text-[12px] font-bold text-[#0F1E33] shadow-[0_8px_20px_rgba(246,196,49,0.28)] transition-colors hover:bg-[#e7b524]"
            >
              <span>Check my transfer path</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/5 px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:border-white/45 hover:bg-white/10"
            >
              Speak to our team
            </Link>
          </div>

          {/* Consultative Footnote */}
          <p className="mx-auto mt-5 max-w-[420px] text-[10.5px] leading-[1.55] text-white/55">
            This page is consultative — no number is transferred and no order is
            placed here.
          </p>
        </div>
      </div>
    </section>
  );
}
