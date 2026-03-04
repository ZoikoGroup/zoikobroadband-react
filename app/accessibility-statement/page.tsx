import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>

      {/* Accessibility statement hero section  */}
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-white text-center">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Accessibility at Zoiko Broadband
          </h1>
          {/* Description */}
          <p className="mt-6 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            We are committed to making our digital services accessible and
            inclusive for everyone,
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            including people with disabilities and those using assistive
            technologies.
          </p>
        </div>
        <div className="mt-8 bg-white text-black font-semibold px-6 py-4 rounded-xl  shadow-sm max-w-fit mx-auto">
            Request Accessibility Support
          </div>
      </section>

      {/* Our Accessibility Commitment */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-6">
            Our Accessibility Commitment
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-8 mb-3">
            WCAG 2.2 AA standard compliance
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-8 mb-3">
            Inclusive design from inception to deployment
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-8 mb-3">
            Equal access through visual, auditory, and motor-friendly design
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-8">
            Accessibility embedded in Zoiko's digital inclusion strategy
          </p>
        </div>
      </section>

      {/* Features Supporting Accessibility */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            Features Supporting Accessibility
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Highlight Item */}
            <div className="bg-white p-6 shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">Visual:</span>{" "}
                High contrast mode, resizable text, colour-blind safe palette
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Navigation:
                </span>{" "}
                Keyboard navigation across the full site
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Screen Readers:
                </span>{" "}
                Screen reader compatibility with ARIA labelling
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">Media:</span>{" "}
                Closed captions on all videos
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">Documents:</span>{" "}
                BSL and Easy Read versions of key documents
              </p>
            </div>

            <div className="bg-white p-6 shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Navigation:
                </span>{" "}
                "Skip to Content" links on every page
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-6">
            Known Limitations
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-8 mb-3">
            Certain third-party plugins may not be fully accessible
          </p>
          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-8 mb-6">
            Some older PDFs may not meet current accessibility guidelines
          </p>
          <div className="bg-[#0C3A5A] text-xs md:text-base text-white font-semibold px-6 py-4 rounded-md shadow-sm w-fit">
            <Link href="/speed-check">Let Us Know If You Encounter a Problem</Link>
          </div>
        </div>
      </section>

      {/* What We're Working On */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            What We're Working On
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Improving Alt Text
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  For dynamic media
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Regular Audits
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  Accessibility audits
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Expert Consultation
                </h2>
                <p className="mt-3 text-base  text-gray-700">
                  With digital inclusion specialists
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed">
                <h2 className="font-semibold text-2xl text-[#10446C]">
                  Testing Cycles
                </h2>
                <p className="mt-3 mb-3 text-base  text-gray-700">
                  Six-month re-testing cycles
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="w-full bg-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="md:text-2xl sm:text-xl font-semibold text-[#10446C] mb-6">
            Compliance Statement
          </h2>

          <p className="md:text-lg sm:text-base text-gray-700 sm:leading-relaxed md:leading-8 max-w-4xl">
            "This website has been developed in accordance with the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA, and the UK Equality Act 2010. We are actively reviewing and improving to maintain high accessibility standards."
          </p>
        
        </div>
      </section>
      
    </div>
  );
}
