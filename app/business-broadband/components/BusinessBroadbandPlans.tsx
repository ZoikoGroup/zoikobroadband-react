import React from "react";

export default function BusinessBroadbandPlans() {
  return (
    <section
      aria-labelledby="business-broadband-plans-heading"
      className="w-full bg-gray-100 dark:bg-gray-900 py-16 px-4"
    >
      <div className="max-w-3xl mx-auto text-center">
        
        <header className="mb-10">
          <h2
            id="business-broadband-plans-heading"
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
          >
            Affordable Business Broadband Plans
          </h2>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <form
            className="flex flex-col md:flex-row gap-5 items-center justify-center"
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
              className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10446C] focus:border-transparent"
            />

            <button
              type="submit"
              className="w-full md:w-auto px-9 py-3 rounded-full bg-[#10446C] text-base font-semibold text-white hover:bg-[#0d3555] transition"
            >
              See your deals
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}