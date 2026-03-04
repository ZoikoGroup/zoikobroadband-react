import React from "react";
import Image from "next/image";

export default function CheckMyPostHero() {
  return (
    <>
      <section
        aria-labelledby="check-my-postcode-hero"
        className="bg-[#dfe8ee] w-full py-16"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* LEFT CONTENT */}
            <div>
              <h2
                id="check-my-postcode-hero"
                className="text-black text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              >
                See If Zoiko Fibre Is Ready at Your Address
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
                Tired of slow connections and patchy service? Zoiko Broadband
                brings reliable, ultrafast fibre straight to homes and
                businesses across the UK. Simply pop in your postcode to see if
                we can get you connected with full fibre (FTTP) or SOGEA at your
                property. We’ll match you with the best plan and a hassle-free
                installation — no long waits, no surprises.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/Images/Checkmypost/checkpost-hero.png"
                alt="Person working on laptop with broadband router on desk"
                width={700}
                height={500}
                priority
                className="w-full max-w-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
