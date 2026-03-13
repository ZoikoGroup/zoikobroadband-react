import React from "react";

export default function GetCustomQuote() {
  return (
    <section
      aria-labelledby="business-quote-heading"
      className="relative w-full bg-[url('/Images/BusinessBroadband/bg-image.png')] bg-cover bg-center py-20"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#10446C]/75" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-10 text-center">
        {/* Heading */}
        <h2
          id="business-quote-heading"
          className="text-2xl md:text-3xl font-semibold text-white"
        >
          Ready to Upgrade Your Business Connectivity?
        </h2>

        <p className="text-blue-100 mt-3 max-w-2xl mx-auto">
          Get a custom quote tailored to your specific business needs. Our team
          will work with you to find the perfect solution.
        </p>

        {/* Form Card */}
        <div className="mt-10 bg-white rounded-xl shadow-xl max-w-xl mx-auto p-8 text-left">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Business Name */}
            <div>
              <label
                htmlFor="business-name"
                className="text-sm font-medium text-gray-700"
              >
                Business Name
              </label>
              <input
                id="business-name"
                name="business_name"
                type="text"
                placeholder="Your Business Name"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="text-sm font-medium text-gray-700"
              >
                Contact Name
              </label>
              <input
                id="contact-name"
                name="contact_name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email Address"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />
            </div>

            {/* Postcode */}
            <div>
              <label
                htmlFor="postcode"
                className="text-sm font-medium text-gray-700"
              >
                Business Postcode
              </label>
              <input
                id="postcode"
                name="postcode"
                type="text"
                placeholder="Business Postcode"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />
            </div>

            {/* Business Size */}
            <div>
              <label
                htmlFor="business-size"
                className="text-sm font-medium text-gray-700"
              >
                Business Size
              </label>

              <select
                id="business-size"
                name="business_size"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              >
                <option value="">Select Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="50+">50+ employees</option>
              </select>
            </div>

            {/* Requirements */}
            <div className="md:col-span-2">
              <label
                htmlFor="requirements"
                className="text-sm font-medium text-gray-700"
              >
                Additional Requirements
              </label>

              <textarea
                id="requirements"
                name="requirements"
                rows={3}
                placeholder="Tell us about your connectivity needs..."
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10446C]"
              />
            </div>

            {/* Submit */}
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
  );
}