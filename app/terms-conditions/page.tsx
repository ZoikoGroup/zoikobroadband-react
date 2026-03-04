import React from "react";

export default function page() {
  return (
    <div>

      {/* T&C hero section... */}
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Our Terms of Service — Clear and Transparent
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            These Terms & Conditions explain your rights, obligations, and our
            service commitments to you as a Zoiko Broadband customer.
          </p>

          {/* Updated Box */}
          <div className="mt-8 bg-white text-black px-6 py-4 rounded-xl border-l-4 border-amber-400 shadow-sm max-w-5xl mx-auto">
            <span className="font-semibold">Updated:</span> 1 August 2025 —
            Applies to all new and existing residential broadband customers
          </div>
        </div>
      </section>

      {/* Quick navigations & terms-and-conditions.. */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* ================= Sidebar ================= */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm h-fit">
            <h3 className="text-lg md:text-xl font-semibold text-[#10446C] mb-6">
              Quick Navigation
            </h3>

            <ul className="space-y-4 text-base md:text-lg text-[#10446C]">
              {[
                "Agreement Overview",
                "Eligibility & Activation",
                "Our Services",
                "Pricing, Billing & Charges",
                "Usage, Fair Use & Restrictions",
                "Contract Duration & Cancellation",
                "Equipment & Installation",
                "Technical Support & Repairs",
                "Data Protection & Privacy",
                "Liability & Limitations",
                "Complaints & Dispute Resolution",
                "Changes to Terms",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="hover:text-amber-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* ================= Main Content ================= */}
          <div className="lg:col-span-3 space-y-12">
            {/* Section 1 */}
            <div id="section-1">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                1. Agreement Overview
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                This agreement governs the provision of broadband services by
                Zoiko Broadband to residential customers. By using our services,
                you agree to be bound by these terms and conditions.
              </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Section 2 */}
            <div id="section-2">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                2. Eligibility & Activation
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Our services are available to residential customers aged 18 or
                over. Service activation is subject to successful credit checks
                and availability at your location.
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Section 3 */}
            <div id="section-3">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                3. Our Services
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We provide broadband internet services including ADSL, FTTC, and
                FTTP connections. Service speeds and availability vary by
                location and technology type.
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Section 4 */}
            <div id="section-4">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                4. Pricing, Billing & Charges
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                4.1 You agree to pay all charges in line with the pricing agreed
                at the point of sign-up.
              </p>
              <p className="mt-2 text-base md:text-lg text-gray-700 leading-relaxed">
                4.2 Charges may vary if you exceed your usage cap or request
                additional services.
              </p>
              <p className="mt-2 text-base md:text-lg text-gray-700 leading-relaxed">
                4.3 All pricing includes VAT unless otherwise stated.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 5 */}
            <div id="section-5">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                5. Usage, Fair Use & Restrictions
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Fair use policies apply to ensure network performance for all
                customers. Excessive usage may result in traffic management or
                additional charges.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 6 */}
            <div id="section-6">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                6. Contract Duration & Cancellation
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Standard contracts are for 12 months minimum term. You have a
                14-day cooling-off period from activation to cancel without
                penalty.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 7 */}
            <div id="section-7">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                7. Equipment & Installation
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Equipment remains property of Zoiko Broadband and must be
                returned within 30 days of service termination in good working
                condition.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 8 */}
            <div id="section-8">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                8. Technical Support & Repairs
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We provide technical support and fault resolution services.
                Response times vary based on fault severity and location
                accessibility.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 9 */}
            <div id="section-9">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                9. Data Protection & Privacy
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Your personal data is processed in accordance with our Privacy
                Notice and UK GDPR requirements. We do not sell your personal
                information to third parties.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 10 */}
            <div id="section-10">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                10. Liability & Limitations
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Our liability is limited as set out in these terms. We are not
                liable for indirect or consequential losses arising from service
                interruptions.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 11 */}
            <div id="section-11">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                11. Complaints & Dispute Resolution
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We have established procedures for handling complaints.
                Unresolved disputes may be referred to Ofcom or alternative
                dispute resolution services.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 12 */}
            <div id="section-12">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                12. Changes to Terms
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We may update these terms with 30 days' notice. Continued use of
                our services constitutes acceptance of revised terms.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 13 */}
            <div id="section-13">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                13. Contact Details & Notices
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                All notices should be sent to our registered office address.
                Electronic communications are acceptable for most purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* key highlights... */}
      <section className="w-full bg-[#f9f9f9] py-16 px-4 sm:px-6 lg:px-18">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            Key Highlights
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Highlight Item */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Minimum Term:
                </span>{" "}
                12 months unless otherwise stated
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Cancellation:
                </span>{" "}
                Free within 14 days (cooling-off period)
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">Equipment:</span>{" "}
                Must be returned within 30 days of termination
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Speed Commitments:
                </span>{" "}
                Refer to Ofcom Speed Commitment
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Complaints:
                </span>{" "}
                Visit Complaints Procedure page
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
