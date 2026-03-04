import React from "react";

export default function ReadyToBuild() {
  return (
    <>
      <section className="flex justify-center px-4 py-12 sm:py-14">
        <div
          className="max-w-7xl w-full bg-[#10446C] rounded-3xl shadow-lg
                  flex flex-col lg:flex-row items-center
                  gap-8 lg:gap-0
                  px-6 sm:px-10 py-10 lg:py-14">
          {/* LEFT CONTENT */}
          <div className="text-white lg:w-2/3 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-4">
              Ready to Build the Future?
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join our team of innovators, problem-solvers, and changemakers.
              Your next career move starts here.
            </p>
          </div>

          {/* RIGHT CTA */}
          <div className="lg:w-1/3 w-full flex justify-center">
            <button
              className="
          w-full sm:w-auto
          bg-[#F5C241]
          text-[#10446C]
          px-14 py-4
          rounded-xl
          font-semibold
          hover:scale-105
          active:scale-95
          transition-transform duration-200"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
