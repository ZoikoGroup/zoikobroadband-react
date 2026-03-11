import React from "react";

export default function StartEarningToday() {
  return (
    <>
      <section
        aria-labelledby="start-earning-today-heading"
        className="flex justify-center px-4 py-12 sm:py-14"
      >
        <div
          className="
    w-full max-w-6xl
    bg-[#10446C]
    rounded-2xl
    shadow-lg
    px-6 sm:px-10
    py-10 lg:py-12
    flex flex-col lg:flex-row
    items-center lg:items-start
    justify-between
    gap-8
  ">
          {/* LEFT CONTENT */}
          <header className="text-white text-center lg:text-left lg:w-2/3">
            <h2
              id="start-earning-today-heading"
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              Start Earning Today
            </h2>

            <p className="text-base sm:text-lg text-white/95 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Share great internet with friends and get rewarded for every
              successful referral
            </p>
          </header>

          {/* RIGHT CTA */}
          <div className="flex flex-col items-center lg:items-start lg:w-1/3">
            <button
              aria-label="Refer a friend and start earning rewards"
              className="
        bg-white
        text-[#10446C]
        px-8 py-3
        rounded-lg
        font-semibold
        transition-transform duration-200
        hover:scale-105
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-white
        focus:ring-offset-2
        focus:ring-offset-[#10446C]
      "
            >
              Refer Now
            </button>

            <p className="text-sm text-white/90 mt-3 text-center lg:text-left">
              Get your unique referral link instantly
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
