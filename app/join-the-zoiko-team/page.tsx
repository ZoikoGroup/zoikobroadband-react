import React from "react";

export default function page() {
  return (
    <>
      <section className="w-full py-10 md:py-14">
        <div className="max-w-7xl mx-auto lg:col-span-2 bg-white border border-gray-200 dark:bg-gray-800 rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1f2d3d] dark:text-white">
            Join the Zoiko Team
          </h2>

          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
            Complete your application below to build the future with us.
          </p>

          {/* FORM */}
          <form className="mt-6 space-y-5">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-[#1f2d3d] dark:text-white">
                1. Personal Details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div>
              <p className="text-2xl md:text-3xl font-bold text-[#1f2d3d] dark:text-white mb-4">
                2. Position & Availability
              </p>
            </div>
            {/* Subject */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300">
                Position Applying For *
              </label>
              <select className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600">
                <option>Select a career pathway...</option>
                <option>Software Developer</option>
                <option>DevOps Engineer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full stack</option>
                <option>Java developer</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium dark:text-gray-300">
                Preferred Location *
              </label>
              <select className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600">
                <option>Select preferred work location...</option>
                <option>London</option>
                <option>Barmingam</option>
                <option>US</option>
                <option>Menchester</option>
                <option>Remote</option>
                <option>Hybrid/Any</option>
              </select>
            </div>

            <div>
              <p className="text-2xl md:text-3xl font-bold text-[#1f2d3d] dark:text-white mb-4">
                3. Documents & Statement
              </p>
            </div>

            <div>
              <label className="text-sm font-medium dark:text-gray-300">
                Upload Your CV (Curriculum Vitae) *
              </label>
              <br />
              <input
                type="file"
                className="mt-1 max-w-lg inline-block border border-gray-300 rounded-md p-2 bg-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <p className="w-full text-base md:text-lg font-medium mt-4">
              Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX
            </p>

            {/* Supporting Statement (Optional) */}
            <div>
              <label className="text-sm font-medium dark:text-gray-300">
                Supporting Statement (Optional)
              </label>
              <textarea
                rows={5}
                placeholder="Tell us why you're a great fit for Zoiko, referencing our values and the role's requirements..."
                className="mt-1 w-full border border-gray-300 rounded-md p-3 bg-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" />
              <p className="text-black dark:text-gray-400">
                I confirm that the information I have provided is accurate and I
                consent to Zoiko processing my data for this application Your
                information will be handled in line with our{" "}
                <span className="text-[#10446C] dark:text-[#F6C140] font-medium cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Button */}
            <button className="w-fit bg-[#F6C140] text-[#10446C] font-semibold p-3 rounded-md hover:bg-[#eab530] transition">
              Submit Form
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
