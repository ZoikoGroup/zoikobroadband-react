"use client";
import { useState } from "react";

export default function ReportFault() {
  const [step, setStep] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    accountNumber: "",
    serviceAddress: "",
    district: "",
    propertyType: "",
    problemDescription: "",
    issueTypes: [],
    additionalNotes: "",
    priority: "Standard",
    confirmAccuracy: false,
    confirmContact: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
              <div className="bg-[#f8f9fa] dark:bg-gray-900 p-6 rounded-xl transition-colors duration-300">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {problems.map((item) => (
      <button
        key={item}
        onClick={() => setSelectedProblem(item)}
        className={`flex flex-col items-center justify-center gap-2
          border-2 rounded-lg p-5 text-sm font-medium transition-all duration-200
          ${
            selectedProblem === item
              ? "border-[#10446C] bg-blue-100 dark:border-blue-400 dark:bg-gray-800 dark:text-white"
              : "border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
          }`}
      >
        <div className="text-xl">📶</div>
        <span className="text-center dark:text-white">{item}</span>
      </button>
    ))}
  </div>

  {/* Business Dropdown */}
  <div className="mt-6">
    <label className="block text-sm font-semibold text-[#10446C] dark:text-gray-300">
      Are you a business customer?
    </label>

    <select className="w-full mt-2 border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
      <option>No</option>
      <option>Yes</option>
    </select>
  </div>

  {/* Next Step Button */}
  <button
    onClick={() => setStep(2)}
    className="mt-6 w-full sm:w-auto bg-[#10446C] hover:bg-[#0a2e4a] dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-8 py-2 rounded-md transition-colors"
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
            <div>
              <h3 className="font-semibold text-[#10446C] dark:text-white mb-6">
                Step 3/3: Submit Your Report
              </h3>

              {/* Contact Information */}
              <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-3">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      Full Name
                    </label>
                    <input
                      placeholder="Enter your full name"
                      className="border border-gray-300 rounded-md p-2 text-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@example.com"
                      className="border border-gray-300 rounded-md p-2 text-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="border border-gray-300 rounded-md p-2 text-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      Account Number (Optional)
                    </label>
                    <input
                      placeholder="0000-000-000"
                      className="border border-gray-300 rounded-md p-2 text-sm w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Service Address */}
              <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                <h4 className="text-base md:lg font-semibold text-[#10446C] mb-3">
                  Service Address
                </h4>
                <div className="mb-4">
                  <label className="text-sm md:text-base text-gray-600 block mb-1">
                    Address
                  </label>
                  <input
                    placeholder="Enter the address where the fault exists"
                    className="border border-gray-300 rounded-md p-2 text-sm w-full"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      District
                    </label>
                    <input
                      placeholder="District"
                      className="border border-gray-300 rounded-md p-2 text-sm w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      Property Type
                    </label>
                    <select className="border border-gray-300 rounded-md p-2 text-sm w-full">
                      <option value="">Select a Property Type</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Public Building</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Problem Details */}
              <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-1">
                  Problem Details
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  Describe the issue in as much detail as possible.
                </p>
                <div className="mb-4">
                  <label className="text-sm md:text-base text-gray-600 block mb-1">
                    Describe the Problem
                  </label>
                  <textarea
                    placeholder="Describe what you have noticed..."
                    rows={4}
                    className="border border-gray-300 rounded-md p-2 text-sm w-full resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm md:text-base text-gray-600 block mb-2">
                    Relate to an Issue
                  </label>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {[
                      "All Areas",
                      "Coupled Spray",
                      "Distribution",
                      "Safety",
                      "Standpipe",
                      "Drinking Meter",
                    ].map((issue) => (
                      <label
                        key={issue}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="accent-[#10446C] w-4 h-4"
                        />
                        {issue}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-3">
                  Additional Information
                </h4>
                <div className="mb-4">
                  <label className="text-sm md:text-base text-gray-600 block mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    placeholder="Any other information..."
                    rows={3}
                    className="border border-gray-300 rounded-md p-2 text-sm w-full resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      Preferred Contact Method
                    </label>
                    <select className="border border-gray-300 rounded-md p-2 text-sm w-full">
                      <option>Select Contact Addition</option>
                      <option>Email</option>
                      <option>Phone</option>
                      <option>Post</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm md:text-base text-gray-600 block mb-1">
                      Survey Needed
                    </label>
                    <select className="border border-gray-300 rounded-md p-2 text-sm w-full">
                      <option>Any Note</option>
                      <option>Required</option>
                      <option>Not Required</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Priority */}
              <div className="border-l-4 border-[#F6C140] pl-4 mb-6">
                <h4 className="text-base md:text-lg font-semibold text-[#10446C] mb-3">
                  Priority & Special Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-gray-200 rounded-md p-4">
                    <p className="font-semibold text-sm text-[#10446C]">
                      Standard Priority
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Standard response time for non-urgent reports.
                    </p>
                  </div>
                  <div className="border-2 border-gray-200 rounded-md p-4">
                    <p className="font-semibold text-sm text-red-600">
                      Mark as Urgent
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      For immediate safety concerns or critical disruptions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Declarations */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 border border-gray-200 mb-6 flex flex-col gap-3">
                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 accent-[#10446C] w-4 h-4"
                  />
                  <span>
                    I confirm this Fault Report is accurate to the best of my
                    knowledge and I am aware of the{" "}
                    <a href="#" className="text-[#10446C] underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 accent-[#10446C] w-4 h-4"
                  />
                  <span>
                    I confirm the contact details above are correct and I can be
                    contacted about this report if required.
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="border border-gray-300 px-5 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  Previous
                </button>
                <button className="bg-[#10446C] text-white px-5 py-2 rounded-md text-sm hover:bg-[#0d3a5e] transition">
                  Submit Fault Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
