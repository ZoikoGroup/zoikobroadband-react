import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, ArrowRight, Headphones, Zap } from "lucide-react";
import PostcodeForm from "./PostcodeForm";
import { Container } from "./ui";

const highlights = [
  { icon: Zap, label: "Full Fibre & Part Fibre" },
  { icon: ArrowLeftRight, label: "Switching Made Simpler" },
  { icon: Headphones, label: "UK-Based Support" },
];

export default function HomeHero() {
  return (
    <section aria-labelledby="home-hero-heading" className="relative isolate overflow-hidden bg-[#0B2F5B] text-white">
      {/* Photo: right side on desktop, full background on mobile */}
      <div className="absolute inset-0 -z-10 lg:left-[38%]">
        <Image
          src="/Images/home/hero-family.webp"
          alt="A smiling father carrying two young children outside their home"
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      {/* Navy fade over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#0B2F5B]/85 lg:bg-transparent lg:bg-[linear-gradient(90deg,#0B2F5B_0%,#0B2F5B_38%,rgba(11,47,91,0.85)_50%,rgba(11,47,91,0.25)_72%,rgba(11,47,91,0)_100%)]"
      />
      {/* Decorative light streaks */}
      <svg aria-hidden className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-64 w-[60%] lg:block" viewBox="0 0 800 260" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-streak" x1="0" x2="1">
            <stop offset="0" stopColor="#F7BE2E" stopOpacity="0" />
            <stop offset=".5" stopColor="#F7BE2E" stopOpacity=".9" />
            <stop offset="1" stopColor="#7cc4ff" stopOpacity=".6" />
          </linearGradient>
        </defs>
        <path d="M0 210 C 220 250, 420 220, 800 60" stroke="url(#hero-streak)" strokeWidth="2.5" />
        <path d="M0 225 C 260 255, 470 230, 800 95" stroke="url(#hero-streak)" strokeWidth="1.2" opacity=".6" />
      </svg>

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[720px]">
          <p className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-[#F7BE2E] sm:text-sm">
            <span aria-hidden className="h-0.5 w-12 rounded bg-[#F7BE2E]" />
            UK Home &amp; Business Broadband
          </p>
          <h1 id="home-hero-heading" className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
            Better broadband
            <br />
            starts at <span className="text-[#F7BE2E]">your address.</span>
          </h1>
          <p className="mt-5 max-w-[640px] text-base leading-relaxed text-white/85 sm:text-lg">
            Explore full-fibre and part-fibre broadband for your home, or find tailored connectivity for your business. Check what is
            available where you live and compare your options.
          </p>

          <div className="mt-7">
            <PostcodeForm id="hero-postcode" label="Your UK postcode" />
          </div>

          <ul className="mt-7 flex flex-wrap gap-y-4">
            {highlights.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={`flex items-center gap-3 pr-6 text-sm font-medium text-white/90 sm:text-base ${i > 0 ? "sm:border-l sm:border-white/20 sm:pl-6" : ""}`}
              >
                <Icon aria-hidden className="h-6 w-6 shrink-0 text-[#F7BE2E]" />
                <span className="max-w-[120px] leading-snug">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/fibre-packages"
              className="group inline-flex items-center gap-3 border-b-2 border-[#F7BE2E] pb-2 font-bold hover:text-[#F7BE2E]"
            >
              Explore Home Broadband Plans
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span aria-hidden className="hidden h-8 w-px bg-white/25 sm:block" />
            <Link
              href="/business-broadband"
              className="group inline-flex items-center gap-3 border-b-2 border-white/60 pb-2 font-bold hover:text-[#F7BE2E]"
            >
              Business Broadband
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
