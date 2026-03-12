"use client";

import { useEffect, useState } from "react";

export default function LiveCustomer() {
  const target = 2847392;
  const duration = 2000; // animation time in ms

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const animateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const value = Math.floor(progress * target);

      setCounter(value);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    requestAnimationFrame(animateCounter);
  }, []);

  return (
    <section
      aria-labelledby="live-customer-savings-counter-heading"
      className="w-full py-14 px-6 sm:px-10 bg-[#e9f3f9]"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          id="live-customer-savings-counter-heading"
          className="text-xl md:text-2xl font-semibold text-[#10446C]"
        >
          Live Customer Savings Counter
        </h2>

        <p className="text-gray-500 text-base md:text-lg mt-3">
          Annual Total Saved
        </p>

        <output
          aria-live="polite"
          className="block mt-4 text-3xl md:text-5xl font-bold text-[#F5C241]"
        >
          £{counter.toLocaleString()}
        </output>
      </div>
    </section>
  );
}
