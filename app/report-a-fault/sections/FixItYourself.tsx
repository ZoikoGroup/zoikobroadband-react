import React from "react";
import Link from "next/link";

const Items = [
  {
    label: "Restart Your Router",
    description: "The most common fix for connection issues",
    btn: "Watch Video Guide",
    btnlink: "https://www.youtube.com/watch?v=D3Rw_ykAPJc",
  },
  {
    label: "Change Wi-Fi Channel",
    description: "Improve your wireless connection quality",
    btn: "View Guide",
    btnlink: "/change-wi-fi-channel",
  },
  {
    label: "Wired vs Wireless Speed",
    description: "Compare connection methods",
    btn: "View Guide",
    btnlink: "/wired-a-wireless-speed",
  },
  {
    label: "LED Light Meanings",
    description: "Understand your router's status lights",
    btn: "View Details",
    btnlink: "/led-light-meanings",
  },
];

const Items2 = [
  {
    label: "Live Chat",
    description: "Get instant help from our technical team",
    btn: "Chat with Support",
    btnlink: "https://tawk.to/chat/68c5379a0a06ff1929296dd0/1j5162dnk",
  },
  {
    label: "Engineer Call-back",
    description: "Schedule a call with one of our engineers",
    btn: "Schedule a Call",
    btnlink: "tel:+4402071646399",
  },
  {
    label: "Email Support",
    description: "Send a detailed report to our support team",
    btn: "Send Report",
    btnlink: "mailto:Support@https://zoikobroadband.com",
  },
  {
    label: "Escalate Issue",
    description: "Need to raise a formal complaint?",
    btn: "Raise Complaint",
    btnlink: "/contact-us",
  },
];
const AccessibilityItems = [
  {
    label: "Visual Accessibility",
    btn: "Large Text",
    link: "/accessibility/visual",
  },
  {
    label: "BSL Video Support",
    btn: "Request BSL Interpreter",
    link: "/support/bsl",
  },
  {
    label: "Easy Read Versions",
    btn: "Download Easy Read Guides",
    link: "/guides/easy-read",
  },
  {
    label: "Voice Support",
    btn: "Voice-based Fault Reporting",
    link: "/support/voice",
  },
];

const SLAItems = [
  {
    label: "Residential Customers",
    highlight: "Response within 4 hours",
    description: "Monday - Friday, 8am - 6pm",
  },
  {
    label: "Business Customers",
    highlight: "Response within 2 hours",
    description: "Monday - Friday, 8am - 6pm",
  },
  {
    label: "Compensation",
    description: "Learn about automatic compensation",
    linkText: "Ofcom Fair Compensation Scheme",
    link: "/compensation",
  },
  {
    label: "Emergency Support",
    description: "Priority support for vulnerable customers",
    linkText: "Register for Priority Support",
    link: "/priority-support",
    isHighlighted: true,
  },
];
export default function FixItYourself() {
  return (
    <>
      {/* Fix it yourself .... */}
      <section
        aria-labelledby="fix-yourself-heading"
        className="bg-[#f0f2f4] dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="fix-yourself-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-6 text-center md:text-left"
          >
            Fix It Yourself
          </h2>

          {/* Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Items.map((item) => (
              <li key={item.label}>
                <article
                  className="h-full bg-[#f8f9fa] dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-xl p-5 flex flex-col justify-between
            shadow-sm hover:shadow-md transition"
                >
                  {/* Content */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#10446C] dark:text-white">
                      {item.label}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    href={item.btnlink}
                    aria-label={`Open ${item.label}`}
                    className="mt-4 inline-block text-center text-sm sm:text-base font-semibold
              bg-[#F6C140] text-[#10446C]
              px-4 py-2 rounded-md
              hover:bg-[#eab530] transition"
                  >
                    {item.btn}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================== */}

      {/* Need Help */}
      <section
        aria-labelledby="need-help-heading"
        className="bg-[#f0f2f4] dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="need-help-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-6 text-center md:text-left"
          >
            Need More Help?
          </h2>

          {/* Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Items2.map((item) => (
              <li key={item.label}>
                <article
                  className="h-full bg-[#f8f9fa] dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-xl p-5 flex flex-col justify-between text-center
            shadow-sm hover:shadow-md transition"
                >
                  {/* Content */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#10446C] dark:text-white">
                      {item.label}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    href={item.btnlink}
                    aria-label={`Open ${item.label}`}
                    className="mt-4 inline-block text-sm md:text-base font-semibold
              bg-[#10446C] text-white
              px-3 py-3 md:py-4 rounded-md
              hover:bg-[#0c3656] transition"
                  >
                    {item.btn}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================================== */}
      {/* Service Level Agreement */}
      <section
        aria-labelledby="sla-heading"
        className="bg-[#f0f2f4] dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="sla-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-6 text-center md:text-left"
          >
            Service Level Agreement
          </h2>

          {/* Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SLAItems.map((item) => (
              <li key={item.label}>
                <article
                  className={`h-full rounded-xl p-5 flex flex-col justify-between text-center
            ${
              item.isHighlighted
                ? "bg-[#10446C] dark:bg-blue-950 text-white"
                : "bg-[#f8f9fa] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#10446C] dark:text-white"
            }`}
                >
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold">
                    {item.label}
                  </h3>

                  {/* Highlight Text */}
                  {item.highlight && (
                    <p className="mt-3 text-sm font-semibold text-[#F6C140]">
                      {item.highlight}
                    </p>
                  )}

                  {/* Description */}
                  <p
                    className={`mt-2 text-sm sm:text-base ${
                      item.isHighlighted
                        ? "text-white/90"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Link / CTA */}
                  {item.linkText && (
                    <p
                      // href={item.link}
                      className={`mt-4 inline-block text-sm sm:text-base font-semibold
                ${
                  item.isHighlighted
                    ? "text-[#F6C140]"
                    : "text-[#10446C] dark:text-white"
                }`}
                    >
                      {item.linkText}
                    </p>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================================== */}

      {/* Accessibility Support... */}
      {/* <section
        aria-labelledby="accessibility-support-heading"
        className="bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-6xl mx-auto">
          
          <h2
            id="accessibility-support-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-6 text-center md:text-left"
          >
            Accessibility Support
          </h2>

          
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AccessibilityItems.map((item) => (
              <li key={item.label}>
                <article
                  className="h-full bg-[#f8f9fa] dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-xl p-5 flex flex-col justify-between items-center text-center
            shadow-sm "
                >
                  
                  <h3 className="text-base sm:text-lg font-semibold text-[#10446C] dark:text-white">
                    {item.label}
                  </h3>

                 
                  <Link
                    href={item.link}
                    aria-label={`Access ${item.label}`}
                    className="mt-4 inline-block text-xs sm:text-sm font-semibold
              bg-[#F6C140] text-[#10446C]
              px-4 py-2 rounded-md
              hover:bg-[#eab530] transition"
                  >
                    {item.btn}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section> */}
    </>
  );
}
