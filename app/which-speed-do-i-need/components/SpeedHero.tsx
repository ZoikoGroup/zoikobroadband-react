import Image from "next/image";
import { ArrowRight, Download, Upload, Info, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

type Item = {
  title: string;
  text: string;
  icon: IconType;
};

const items: readonly Item[] = [
  {
    title: "Download",
    text: "How quickly your devices receive data — streaming, browsing and downloads.",
    icon: Download,
  },
  {
    title: "Upload",
    text: "How quickly you send data — cloud backups, large files and video-call quality.",
    icon: Upload,
  },
] as const;

export default function SpeedHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B2A5B]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/Images/speed/1.jpg"
          alt="Home office with laptop by a window"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A5B] from-35% via-[#0B2A5B]/80 via-55% to-[#0B2A5B]/40" />
        <div className="absolute inset-0 bg-[#0B2A5B]/30" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-4 py-16 sm:px-8 lg:min-h-[560px] lg:grid-cols-2 lg:gap-12 lg:px-[34px] lg:py-24">
        {/* Left */}
        <div>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F5B323]">
            <span className="block h-px w-8 bg-[#F5B323]" />
            Home Broadband • Getting Connected
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            Which broadband speed{" "}
            <span className="text-[#F5B323]">do I need?</span>
          </h1>

          <p className="mt-5 max-w-[460px] text-base leading-7 text-[#D6E0EE]">
            Find out which broadband features may suit your household, then
            check what you can actually get at your address. No jargon, no
            sign-in.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#F5B323] px-6 text-sm font-bold text-[#0B2A5B] shadow-[0_4px_12px_rgba(245,179,35,0.35)] transition-colors hover:bg-[#FFC53D]"
            >
              Find my speed
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/70 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Compare plans &amp; speeds
            </a>
          </div>

          <p className="mt-5 flex max-w-[360px] items-start gap-2 text-xs leading-[18px] text-[#B5C3D8]">
            <ShieldCheck
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F5B323]"
              strokeWidth={2}
            />
            You can use this guide without signing in. We only ask for an
            address if you choose to check availability.
          </p>
        </div>

        {/* Right card */}
        <div className="w-full max-w-[460px] justify-self-center rounded-2xl border border-white/15 bg-[#12427A]/70 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.30)] backdrop-blur-md lg:justify-self-end">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Download and upload, in plain English
          </h2>
          <p className="mt-1 text-xs text-[#C9D6E8] sm:text-[13px]">
            Two different things decide how your home feels online.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-lg bg-[#0B2A5B]/60 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F5B323]">
                    <Icon
                      className="h-4 w-4 text-[#0B2A5B]"
                      strokeWidth={2.5}
                    />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-[17px] text-[#C9D6E8]">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-5 flex items-start gap-2 text-[11px] leading-4 text-[#B5C3D8]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            Speeds are measured in megabits per second (Mbps). Your real
            experience also depends on the service and your home setup.
          </p>
        </div>
      </div>
    </section>
  );
}
