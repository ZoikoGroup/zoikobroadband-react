"use client";
import { useState } from "react";

export default function ReportFault() {
  const [step, setStep] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  const problems = [
    "No Internet",
    "Slow Broadband",
    "Router Not Working",
    "Wi-Fi Dropping",
    "Faulty Socket",
    "Other",
  ];

  const tools = [
    "Speed Test",
    "Line Check",
    "Wi-Fi Signal Check",
    "Device Check",
  ];

  return (
    <section className="bg-[#f0f2f4] dark:bg-gray-900 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white">
            Report Your Fault
          </h2>

          <button className="text-sm border px-4 py-2 rounded-md dark:text-white">
            Track My Faults
          </button>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h3 className="font-semibold text-[#10446C] dark:text-white mb-6">
                Step 1/3: Choose the Problem Type
              </h3>

              {/* Cards Container */}
              <div className="bg-[#f8f9fa] dark:bg-gray-700 p-6 rounded-xl">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {problems.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedProblem(item)}
                      className={`flex flex-col items-center justify-center gap-2
            border rounded-lg p-5 text-sm font-medium transition
            ${
              selectedProblem === item
                ? "border-2 border-[#10446C] bg-blue-100 dark:bg-gray-600"
                : "border-gray-200 dark:border-gray-600 hover:border-[#10446C]"
            }`}
                    >
                      {/* Placeholder Icon */}
                      <div className="text-xl">📶</div>

                      <span className="text-center">{item}</span>
                    </button>
                  ))}
                </div>

                {/* Business Dropdown */}
                <div className="mt-6">
                  <label className="text-sm text-[#10446C] dark:text-gray-300">
                    Are you a business customer?
                  </label>

                  <select className="w-full mt-2 border rounded-md p-2 bg-white dark:bg-gray-800">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                {/* Button */}
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 bg-[#10446C] text-white px-5 py-2 rounded-md"
                >
                  Next Step
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h3 className="font-semibold text-[#10446C] dark:text-white mb-4">
                Step 2/3: Run Diagnostics (Optional)
              </h3>

              {/* Tip */}
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm mb-6">
                Tip: Most broadband issues are resolved by restarting your
                router.
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool}
                    className="bg-[#f8f9fa] dark:bg-gray-700 border border-gray-200 dark:border-gray-600
          rounded-lg p-5 text-center"
                  >
                    <div className="text-xl mb-2">⚙️</div>

                    <p className="font-semibold text-[#10446C] dark:text-white">
                      {tool}
                    </p>

                    <button className="mt-3 bg-[#10446C] text-white px-4 py-2 rounded-md text-sm">
                      Run Test
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary Box */}
              <div className="mt-6 bg-[#f8f9fa] dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Diagnostic Summary
                </p>
                <div className="h-1 bg-[#F6C140] mt-2 rounded"></div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="border px-4 py-2 rounded-md"
                >
                  Previous
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="bg-[#10446C] text-white px-4 py-2 rounded-md"
                >
                  Skip Diagnostics
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h3 className="font-semibold text-[#10446C] dark:text-white mb-6">
                Step 3/3: Submit Your Report
              </h3>

              {/* Section */}
              <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="border p-2 rounded-md"
                    placeholder="Full Name"
                  />
                  <input
                    className="border p-2 rounded-md"
                    placeholder="Contact Number"
                  />
                  <input
                    className="border p-2 rounded-md"
                    placeholder="Address"
                  />
                  <input
                    className="border p-2 rounded-md"
                    placeholder="Postcode"
                  />
                </div>

                <textarea
                  className="border p-2 rounded-md w-full mt-4"
                  placeholder="Describe your issue"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="border px-4 py-2 rounded-md"
                >
                  Previous
                </button>

                <button className="bg-[#10446C] text-white px-4 py-2 rounded-md">
                  Submit Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
