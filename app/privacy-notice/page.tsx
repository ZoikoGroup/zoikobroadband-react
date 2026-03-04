import React from "react";

export default function page() {
  return (
    <div>
      {/* Privacy policy hero section... */}
      <section className="w-full bg-[#10446C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            Your Privacy Matters to Us
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            This Privacy Notice explains how we collect, use, and protect your
            personal data when you use Zoiko Broadband services or visit our
            website.
          </p>

          {/* Updated Box */}
          <div className="mt-8 bg-white text-black px-6 py-4 rounded-xl border-l-4 border-amber-400 shadow-sm max-w-5xl mx-auto">
            <span className="font-semibold">Effective from:</span> 1 August 2025
            — Updated to reflect latest ICO guidance and UK GDPR compliance.
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
                "Who We Are",
                "What Personal Data We Collect",
                "How We Use Your Data",
                "Sharing Your Data",
                "Legal Basis for Processing",
                "International Transfers",
                "Data Retention",
                "Your Rights Under UK GDPR",
                "Cookies and Tracking",
                "Security of Your Data",
                "Children's Privacy",
                "Changes to This Notice",
                "How to Contact Us",
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
                1. Who We Are
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Zoiko Broadband is a UK-based internet service provider
                committed to protecting your privacy and personal data in
                accordance with UK GDPR and Data Protection Act 2018.
              </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Section 2 */}
            <div id="section-2">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                2. What Personal Data We Collect
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                .Full name, address, email, phone number
              </p>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                .Payment information (encrypted)
              </p>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                .IP address, MAC address, device information Usage patterns
                (e.g., data volumes, time of access)
              </p>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                .Support interaction records (calls, chats, emails)
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Section 3 */}
            <div id="section-3">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                3. How We Use Your Data
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We process your personal data for specific, legitimate purposes
                including service delivery, customer support, billing, and fraud
                prevention.
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Section 4 */}
            <div id="section-4">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                4.Sharing Your Data
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We only share your data with trusted partners necessary for
                service delivery, regulatory compliance, or with your explicit
                consent.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 5 */}
            <div id="section-5">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                5.Legal Basis for Processing
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We process your data based on contract fulfillment, legal
                obligations, legitimate interests, and where applicable, your
                consent.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 6 */}
            <div id="section-6">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                6. International Transfers
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Any international data transfers are protected by appropriate
                safeguards including adequacy decisions and standard contractual
                clauses.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 7 */}
            <div id="section-7">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                7. Data Retention
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We retain your personal data only as long as necessary for the
                purposes outlined in this notice, or as required by law. Account
                data is typically retained for 7 years after service
                termination.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 8 */}
            <div id="section-8">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                8. Your Rights Under UK GDPR
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                You have comprehensive rights over your personal data, including
                access, rectification, erasure, and portability rights.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 9 */}
            <div id="section-9">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                9. Cookies and Tracking
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We use cookies and similar technologies to improve your
                experience. See our Cookies Policy for detailed information.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 10 */}
            <div id="section-10">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                10. Security of Your Data
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We implement robust technical and organizational measures to
                protect your personal data against unauthorized access, loss, or
                destruction.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 11 */}
            <div id="section-11">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                11. Children's Privacy
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We do not knowingly collect personal data from children under 16
                without parental consent. If you believe we have collected such
                data, please contact us immediately.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 12 */}
            <div id="section-12">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                12. Changes to This Notice
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                We may update this Privacy Notice to reflect changes in our
                practices or legal requirements. We will notify you of
                significant changes.
              </p>
            </div>

            <hr className="border-gray-200" />
            {/* Section 13 */}
            <div id="section-13">
              <h2 className="text-2xl font-semibold text-[#10446C]">
                13. How to Contact Us
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                For any privacy-related questions or to exercise your rights,
                contact our Data Protection Officer at
                privacy@https://zoikobroadband.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F9FBFD] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold text-[#10446C] mb-8">
            Summary of Key Data Uses
          </h2>

          {/* Table Wrapper */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-[#10446C] border-b">
                    Activity
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-[#10446C] border-b">
                    Purpose
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-700">
                <tr className="border-b">
                  <td className="px-6 py-4">Setting up service</td>
                  <td className="px-6 py-4">
                    To create and manage your account
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4">Taking payments</td>
                  <td className="px-6 py-4">
                    To charge you securely for services
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4">Customer support</td>
                  <td className="px-6 py-4">
                    To respond to queries or fix issues
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4">Fraud prevention</td>
                  <td className="px-6 py-4">
                    To detect and prevent unauthorised access
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4">Marketing (with consent)</td>
                  <td className="px-6 py-4">
                    To send tailored offers and updates
                  </td>
                </tr>
              </tbody>
            </table>
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
          <div className="grid grid-cols-1  gap-6">
            {/* Highlight Item */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Right to Access:
                </span>{" "}
                Request copies of your personal data
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Right to Rectification:
                </span>{" "}
                Correct inaccurate personal data
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Right to Erasure:
                </span>{" "}
                Request deletion of your personal data
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Right to Restrict Processing:
                </span>{" "}
                Limit how we use your data
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Right to Data Portability:
                </span>{" "}
                Transfer your data to another provider
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Right to Object:
                </span>{" "}
                Object to certain types of processing
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-400">
              <p className="text-gray-800 text-lg sm:text-base leading-relaxed">
                <span className="font-semibold text-[#10446C]">
                  Right not to be subject to automated decision-making:
                </span>{" "}
                Avoid purely automated decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  CONTACT & COMPLAINTS  */}
      <section className="w-full bg-[#10446C] py-14 px-4 sm:px-6 lg:px-8 text-white  rounded-2xl">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 className="text-lg sm:text-xl font-semibold text-amber-400 mb-8">
            Contact & Complaints
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Data Protection Officer */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Data Protection Officer
              </h3>

              <p className="text-sm sm:text-base mb-3">
                <span className="font-medium">Email:</span>{" "}
                privacy@zoikobroadband.com
              </p>

              <p className="text-sm sm:text-base">
                <span className="font-medium">Address:</span> Zoiko Broadband,
                Legal Compliance Dept, London
              </p>
            </div>

            {/* ICO Referral */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                ICO Referral
              </h3>

              <p className="text-sm sm:text-base">
                If dissatisfied, contact the Information Commissioner’s Office
                at <span className="underline">ico.org.uk</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  COOKIE POLICY SUMMARY  */}
      <section className="w-full bg-[#F9FBFD] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-[#10446C] mb-4">
            Cookie Policy Summary
          </h2>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl">
            We use cookies to improve site performance, deliver personalised
            experiences, and analyse traffic.
          </p>
        </div>
      </section>
    </div>
  );
}
