import React from "react";

export default function GetCustomQuote() {
  return (
    <>
      <section
        aria-labelledby="business-quote-heading"
        className="relative w-full bg-[url('/Images/BusinessBroadband/bg-image.png')] bg-cover bg-center py-20"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#10446C]/75"></div>

        <div className="relative max-w-6xl mx-auto px-5 sm:px-10 text-center">
          {/* Heading */}
          <h2
            id="business-quote-heading"
            className="text-2xl md:text-3xl font-semibold text-white"
          >
            Ready to Upgrade Your Business Connectivity?
          </h2>

          <p className="text-blue-100 mt-3 max-w-2xl mx-auto">
            Get a custom quote tailored to your specific business needs. Our
            team will work with you to find the perfect solution.
          </p>

          {/* Form Card */}
          <div className="mt-10 bg-white rounded-xl shadow-xl max-w-xl mx-auto p-8 text-left">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="Your Business Name"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Business Postcode
                </label>
                <input
                  type="text"
                  placeholder="Business Postcode"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Business Size
                </label>

                <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C]">
                  <option>Select Size</option>
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>50+ employees</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Additional Requirements
                </label>

                <textarea
                  rows={3}
                  placeholder="Tell us about your connectivity needs..."
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10446C]"
                ></textarea>
              </div>

              {/* CTA Button */}
              <div className="md:col-span-2 text-center mt-3">
                <button
                  type="submit"
                  className="bg-[#10446C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0d3555] transition"
                >
                  Get My Business Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
