import React from "react";

export default function FibrePackagesHero() {
  return (
    <>
      <section
        aria-labelledby="fibre-broadband-heading"
        className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-6xl mx-auto text-white text-center">
          {/* Heading */}
          <h1
            id="fibre-broadband-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            Explore Our Fibre Broadband Packages
          </h1>

          <p className="mt-4 text-base md:text-xl lg:text-2xl font-semibold text-white/90 max-w-4xl mx-auto">
            From everyday browsing to gigabit power — there's a Zoiko plan for
            everyone.
          </p>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/90 leading-relaxed max-w-5xl mx-auto">
            At Zoiko Broadband, we offer a range of full fibre and SOGEA
            broadband packages designed to suit every lifestyle, household size,
            and digital needs. Whether you're after basic connectivity or
            ultra-high-speed performance, all our plans come with clear pricing,
            UK-based support, and future-ready fibre.
          </p>

          {/* Postcode Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md px-6 py-6 mt-10">
            <form
              className="flex flex-col md:flex-row gap-4 items-center"
              noValidate
            >
              <label htmlFor="postcode" className="sr-only">
                Enter your postcode
              </label>

              <input
                id="postcode"
                name="postcode"
                type="search"
                autoComplete="postal-code"
                placeholder="Enter postcode"
                required
                pattern="^[A-Za-z0-9 ]{5,8}$"
                className="w-full md:flex-1 text-gray-700 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />

              <button
                type="submit"
                className="w-full md:w-auto px-7 py-3 rounded-full bg-[#10446C] font-semibold text-white hover:bg-[#0d3555] transition"
              >
                See your deals
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
