import React from "react";

export default function ContactUsHero() {
  return (
    <>
      <section
        aria-labelledby="get-in-touch-heading"
        className="w-full bg-[#10446C] dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="max-w-5xl mx-auto text-center text-white dark:text-gray-100">
          {/* Heading */}
          <h2
            id="get-in-touch-heading"
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            Get In Touch
          </h2>

          {/* Description */}
          <p className="mt-6 text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            Our team is here to help. Whether you have questions about our
            services, need technical support, or want to learn more about our
            packages, we’re just a message away.
          </p>
        </div>
      </section>

      <section className="bg-[#f3f5f7] dark:bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* CALL US */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-10 text-center
      transition hover:shadow-md">
        
        <h3 className="text-lg md:text-xl font-semibold text-[#1f2d3d] dark:text-white">
          Call Us
        </h3>

        <p className="mt-4 text-[#F6C140] font-semibold text-base md:text-lg">
          +44 (0)207 164 6399
        </p>

        <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Mon–Fri: 8am–8pm <br />
          Sat–Sun: 9am–6pm
        </p>
      </div>

      {/* EMAIL US */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-10 text-center
      transition hover:shadow-md">
        
        <h3 className="text-lg md:text-xl font-semibold text-[#1f2d3d] dark:text-white">
          Email Us
        </h3>

        <p className="mt-4 text-[#F6C140] font-semibold text-base md:text-lg wrap-break-word">
          support@zoikobroadband.com
        </p>

        <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
          Response within 24 hours
        </p>
      </div>

      {/* VISIT US */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-10 text-center
      transition hover:shadow-md">
        
        <h3 className="text-lg md:text-xl font-semibold text-[#1f2d3d] dark:text-white">
          Visit Us
        </h3>

        <p className="mt-4 text-[#F6C140] font-semibold text-base md:text-lg">
          35 Berkeley Square <br />
          London W1J 5BF
        </p>

        <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
          Response within 24 hours
        </p>
      </div>

    </div>
  </div>
</section>
    </>
  );
}
