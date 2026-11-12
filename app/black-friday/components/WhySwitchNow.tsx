import { Rocket, Gauge, Lock } from "lucide-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

type Feature = {
  title: string;
  text: string;
  icon: IconType;
  href: string;
};

const features: readonly Feature[] = [
  {
    title: "Future-Ready Technology",
    text: "FTTP, SoGEA and ADSL pathways",
    icon: Rocket,
    href: "#",
  },
  {
    title: "Clear Speed Information",
    text: "Following the Broadband Speeds Code of Practice",
    icon: Gauge,
    href: "#",
  },
  {
    title: "Transparent Pricing",
    text: "Full post-offer price shown upfront",
    icon: Lock,
    href: "#",
  },
] as const;

export default function WhySwitchNow() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#12436F] to-[#0F3558] px-4 pb-20 pt-10 sm:px-8 lg:px-[70px]">
      {/* Top-right corner ribbon */}
      <span className="pointer-events-none absolute -right-[44px] top-[16px] hidden w-[170px] rotate-45 bg-[#FFC800] py-[5px] text-center text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#0F2A4A] shadow-md md:block">
        Black Friday
      </span>

      {/* Outlined background watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-18px] select-none whitespace-nowrap text-center text-[90px] font-black uppercase leading-none tracking-tight text-transparent sm:text-[130px] lg:text-[160px]"
        style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.08)" }}
      >
        Black Friday
      </span>

      <div className="relative mx-auto max-w-[900px]">
        {/* Heading */}
        <div className="flex flex-col items-center">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Why Switch Now?
          </h2>
          <span className="mt-2 block h-[3px] w-[48px] rounded-full bg-[#FFC800]" />
          <p className="mt-5 max-w-[560px] text-center text-sm leading-6 text-[#D6E0EE]">
            The UK is moving from copper to full fibre. Zoiko Broadband keeps
            you ready with FTTP, SoGEA and ADSL pathways, clear speed
            information and transparent pricing.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <a
                key={f.title}
                href={f.href}
                className="group flex flex-col items-center text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-colors group-hover:bg-white/20">
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-base font-bold text-[#FFC800]">
                  {f.title}
                </h3>
                <p className="mt-1 max-w-[220px] text-xs leading-[18px] text-[#D6E0EE] sm:text-[13px]">
                  {f.text}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
