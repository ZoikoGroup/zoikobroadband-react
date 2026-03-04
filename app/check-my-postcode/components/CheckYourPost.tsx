import React from "react";

export default function CheckYourPost() {
  return (
    <>
      <section
        aria-labelledby="postcode-heading"
        className="w-full bg-[#f6f9ff] py-16 px-4"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 sm:p-10 text-center">
            {/* Heading */}
            <h2
              id="postcode-heading"
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              Check Your Postcode for Fibre Availability
            </h2>

            <p className="text-sm md:text-base text-gray-600 mt-3">
              Find out if our ultrafast fibre broadband is available at your
              address
            </p>

            {/* FORM */}
            <form className="mt-6 flex flex-col gap-4" noValidate>
              {/* Label (visually hidden but accessible) */}
              <label htmlFor="postcode" className="sr-only">
                Enter your postcode
              </label>

              <input
                id="postcode"
                name="postcode"
                type="text"
                inputMode="text"
                autoComplete="postal-code"
                placeholder="Enter your postcode"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10446C] focus:border-transparent transition"
              />

              <button
                type="submit"
                className="mx-auto px-8 py-3 rounded-full bg-[#10446C] text-white font-semibold hover:bg-[#0d3555] transition-all duration-300"
              >
                Check Availability Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
