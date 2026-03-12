import React from "react";

export default function MyPortalPreview() {
  return (
    <>
      <section
        aria-labelledby="portal-preview-heading"
        className="bg-white w-full py-16"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2
            id="portal-preview-heading"
            className="text-center text-xl md:text-2xl font-semibold text-[#10446C] mb-6"
          >
            My Zoiko Portal Preview
          </h2>

          {/* Dashboard Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-[#10446C] flex items-center justify-between px-6 py-4">
              <h3 className="text-white font-semibold text-base md:text-lg">
                My Referrals Dashboard
              </h3>

              <div className="flex items-center gap-2 text-white text-sm">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
                <span>Live</span>
              </div>
            </div>

            {/* Stats Section */}
            <dl className="grid grid-cols-3 text-center px-8 py-10">
              {/* Active Referrals */}
              <div className="flex flex-col items-center">
                <dd className="text-4xl md:text-5xl font-bold text-amber-400">
                  7
                </dd>
                <dt className="text-gray-600 text-sm md:text-base mt-2">
                  Active Referrals
                </dt>
              </div>

              {/* Total Earned */}
              <div className="flex flex-col items-center">
                <dd className="text-4xl md:text-5xl font-bold text-amber-400">
                  £350
                </dd>
                <dt className="text-gray-600 text-sm md:text-base mt-2">
                  Total Earned
                </dt>
              </div>

              {/* Pending */}
              <div className="flex flex-col items-center">
                <dd className="text-4xl md:text-5xl font-bold text-amber-400">
                  3
                </dd>
                <dt className="text-gray-600 text-sm md:text-base mt-2">
                  Pending (30 days)
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
