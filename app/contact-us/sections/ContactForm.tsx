import React from "react";

export default function ContactForm() {
  return (
    <>
      <section className="bg-[#f3f5f7] dark:bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT FORM */}
          <div className="lg:col-span-2 bg-white border border-gray-200 dark:bg-gray-800 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f2d3d] dark:text-white">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Fill out the form below and we’ll get back to you as soon as
              possible.
            </p>

            {/* FORM */}
            <form className="mt-6 space-y-5">
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium dark:text-gray-300">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium dark:text-gray-300">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="text"
                  placeholder="07123 456789"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Subject *
                </label>
                <select className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600">
                  <option>Select a subject</option>
                  <option>Home Broadband</option>
                  <option>Bussiness Plans</option>
                  <option>Speed Issue</option>
                  <option>Postcode</option>
                  <option>Internet Issue</option>
                  <option>Biling</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your enquiry..."
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" />
                <p className="text-gray-600 dark:text-gray-400">
                  I agree to the processing of my personal data in accordance
                  with the{" "}
                  <span className="text-[#10446C] dark:text-[#F6C140] font-medium cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Button */}
              <button className="w-full bg-[#F6C140] text-[#10446C] font-semibold py-3 rounded-md hover:bg-[#eab530] transition">
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-4">
            {/* Live Chat */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-l-4 border-[#F6C140]">
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                Live Chat
              </p>
              <h3 className="text-[#10446C] dark:text-white font-semibold text-lg md:text-2xl">
                Start Chat
              </h3>
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mt-1">
                Available 24/7 Instant Support
              </p>
            </div>

            {/* Emergency */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-l-4 border-[#F6C140]">
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                Emergency Support
              </p>
              <p className="text-[#10446C] dark:text-white font-semibold text-lg md:text-2xl mt-1">
                +44 (0)207 164 6399
              </p>
              <p className="text-base md:lg text-gray-500 dark:text-gray-400 mt-1">
                Available 24/7 Instant Support
              </p>
            </div>

            {/* Social */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-l-4 border-[#F6C140]">
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-2">
                Follow Us
              </p>

              <div className="flex gap-3">
                {["f", "X", "I", "Y", "L"].map((icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#10446C] text-white text-sm"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
