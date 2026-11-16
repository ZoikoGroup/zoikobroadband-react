import Image from "next/image";
import { HERO } from "./data/content";
import type { StepId } from "./types";

export default function Hero({ step }: { step: StepId }) {
  const hero = HERO[step];
  return (
    <section className="relative overflow-hidden bg-[#0b2a5b] text-white min-h-[460px] flex items-center">
      {/* Right-side Image Container with Shifted Gradient Fade */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-2/3 overflow-hidden">
        <Image
          src={hero.src}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover object-right"
        />
        {/* Gradient overlay shifted further left using wider positioning */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-[-20%] right-0 bg-gradient-to-r from-[#0b2a5b] via-[#0b2a5b]/90 to-[#0b2a5b]/20 lg:via-[#0b2a5b]/75"
        />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto w-full max-w-[1300px] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="max-w-[480px]">
          {hero.eyebrow && (
            <p className="text-sm font-bold uppercase tracking-[0.14em]">
              {hero.eyebrow}
            </p>
          )}
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
            {hero.title.map((part) => (
              <span
                key={part.text}
                className={part.accent ? "text-[#fbb82b]" : ""}
              >
                {part.text}
              </span>
            ))}
          </h1>
          {hero.subtitle && (
            <p className="mt-5 text-base leading-relaxed text-white/85">
              {hero.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
