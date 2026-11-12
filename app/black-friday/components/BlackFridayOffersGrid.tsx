import { Tag, Zap, Router, MapPin, Sparkle } from "lucide-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

type Card = {
  title: string;
  text: string;
  icon: IconType;
  border: string;
  iconBg: string;
  iconColor: string;
  titleColor: string;
  textColor: string;
  href: string;
  hero?: boolean;
};

const cards: readonly Card[] = [
  {
    title: "Black Friday Fibre Offer",
    text: "25% off the monthly subscription on eligible fibre packages for 6 months",
    icon: Tag,
    border: "border-[#D0243A]",
    iconBg: "bg-[#FCE4E8]",
    iconColor: "text-[#D0243A]",
    titleColor: "text-[#1F4D33]",
    textColor: "text-[#C0182E]",
    href: "#",
    hero: true,
  },
  {
    title: "Full Fibre (FTTP)",
    text: "From 40/10 Mbps up to 1000/115 Mbps packages",
    icon: Zap,
    border: "border-[#2AA6A6]",
    iconBg: "bg-[#DDF3F6]",
    iconColor: "text-[#1E9AB0]",
    titleColor: "text-[#1F4D33]",
    textColor: "text-[#12717A]",
    href: "#",
  },
  {
    title: "Router & Installation",
    text: "Shown per package. Black Friday extras only where approved",
    icon: Router,
    border: "border-[#6B3FC0]",
    iconBg: "bg-[#EBE3F8]",
    iconColor: "text-[#6B3FC0]",
    titleColor: "text-[#1F4D33]",
    textColor: "text-[#4A2A99]",
    href: "#",
  },
  {
    title: "Check Your Address",
    text: "We detect FTTP, SoGEA or ADSL at your postcode",
    icon: MapPin,
    border: "border-[#F59A0C]",
    iconBg: "bg-[#FDEBD3]",
    iconColor: "text-[#C9731A]",
    titleColor: "text-[#1F4D33]",
    textColor: "text-[#9A5A0A]",
    href: "#",
  },
] as const;

export default function BlackFridayOffersGrid() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEF8E4] px-4 pb-16 pt-10 sm:px-8 lg:px-[78px]">
      {/* Hanging Black Friday tag */}
      <div className="pointer-events-none absolute left-[46px] top-0 hidden md:block">
        <div className="absolute left-[27px] top-0 h-[47px] w-px -rotate-[4deg] bg-[#1A1A1A]" />
        <div className="absolute left-[39px] top-[30px] h-[3px] w-[10px] rotate-[35deg] bg-[#1B3A5C]" />
        <div className="mt-[47px] flex h-[46px] w-[62px] flex-col items-center justify-center rounded-md bg-[#0F2340] text-xs font-extrabold uppercase leading-[12px] tracking-wide text-[#FFC21A]">
          <span>Black</span>
          <span>Friday</span>
        </div>
      </div>

      {/* Hanging Sale tag */}
      <div className="pointer-events-none absolute right-[62px] top-0 hidden md:block">
        <div className="absolute left-[20px] top-0 h-[30px] w-px bg-[#1A1A1A]" />
        <div className="mt-[30px] flex h-[32px] w-[46px] items-center justify-center rounded-md bg-[#D0243A] text-xs font-bold text-white">
          SALE
        </div>
        <Sparkle
          className="absolute -bottom-[8px] right-[-6px] h-3 w-3 fill-[#F5B323] text-[#F5B323]"
          strokeWidth={0}
        />
      </div>

      {/* Heading */}
      <div className="mx-auto flex max-w-[1200px] flex-col items-center">
        <h2 className="text-center text-xl font-bold leading-8 tracking-tight text-[#1F4D33] sm:text-2xl lg:text-3xl">
          Black Friday Offers 2026 (FTTP • SoGEA • ADSL)
        </h2>
        <span className="mt-2 block h-[3px] w-[66px] rounded-full bg-gradient-to-r from-[#D0243A] to-[#F5B323]" />
      </div>

      {/* Cards */}
      <div className="relative mx-auto mt-9 grid max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-[1200px] lg:grid-cols-4 lg:gap-[22px]">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.title}
              href={card.href}
              className={`relative flex min-h-[160px] flex-col items-center overflow-hidden rounded-[10px] border bg-white px-5 pb-5 pt-6 text-center shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(0,0,0,0.10)] ${card.border}`}
            >
              {card.hero ? (
                <span className="absolute right-[-32px] top-[12px] w-[130px] rotate-45 bg-[#0B1B16] py-[3px] text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#FFC21A]">
                  Hero Deal
                </span>
              ) : null}

              <span
                className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${card.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
              </span>

              <h3
                className={`mt-4 text-base font-bold leading-5 ${card.titleColor}`}
              >
                {card.title}
              </h3>

              <p
                className={`mt-2 max-w-[230px] text-xs font-semibold leading-[17px] sm:text-[13px] ${card.textColor}`}
              >
                {card.text}
              </p>
            </a>
          );
        })}

        {/* Decorative sparkle bottom-left */}
        <Sparkle
          className="pointer-events-none absolute -bottom-[10px] -left-[22px] hidden h-4 w-4 fill-[#8FA3B8] text-[#8FA3B8] lg:block"
          strokeWidth={0}
        />
        {/* Decorative dash bottom-right */}
        <span className="pointer-events-none absolute -bottom-[28px] -right-[14px] hidden h-[3px] w-[10px] -rotate-[30deg] rounded-full bg-[#D0243A] lg:block" />
      </div>
    </section>
  );
}
