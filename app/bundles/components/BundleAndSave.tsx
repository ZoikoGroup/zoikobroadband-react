"use client";

import { useEffect, useState } from "react";

export default function BundleAndSave() {
  const targetDate = new Date("2026-04-09T23:59:59").getTime();

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Mark component mounted
    setMounted(true);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <section className="px-4 py-14 sm:py-16 bg-gray-50">
      <div className="bg-[#f4c03e] mx-auto max-w-7xl rounded-2xl shadow-lg p-8 sm:p-12 lg:p-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#10446C]">
            Bundle & Save Today
          </h2>

          <p className="text-base sm:text-lg text-[#10446C]">
            Limited time offer - save up to 30% on bundles
          </p>

          <p className="text-sm sm:text-base text-[#10446C] mt-5">
            Offer expires in:
          </p>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <TimerBox value={timeLeft.days} label="Days" />
            <TimerBox value={timeLeft.hours} label="Hours" />
            <TimerBox value={timeLeft.minutes} label="Minutes" />
            <TimerBox value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimerBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white text-[#10446C] font-bold px-4 py-5 rounded-lg shadow-md min-w-20">
      <span className="block text-xl">{String(value).padStart(2, "0")}</span>
      <span className="text-sm font-normal">{label}</span>
    </div>
  );
}
