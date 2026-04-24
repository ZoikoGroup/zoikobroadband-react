"use client"
import { useState } from "react";
import Link from "next/link";

const Items = [
  "Direct Debit Guarantee",
  "PCI-DSS Certified",
  "SSL Encryption",
  "GDPR Compliant",
  "VAT-Compliant Invoices",
];
const Items2 = [
  {
    label: "Live Chat",
    btn: "Speak to Billing Support Now",
    btnlink: "https://tawk.to/chat/68c5379a0a06ff1929296dd0/1j5162dnk",
  },
  {
    label: "Email Support",
    btn: "Submit a Billing Enquiry",
    btnlink: "mailto:Support@https://zoikobroadband.com",
  },
  {
    label: "Phone Support",
    btn: "Schedule a Call from Our Billing Team",
    btnlink: "/contact-us",
  },
  {
    label: "Financial Assistance",
    btn: "Request Financial Assistance",
    btnlink: "/contact-us",
  },
];
const FAQ = [
  {
    label: "When will I be charged each month?",
    description:
      "Your billing date is set when you sign up and remains consistent each month.",
  },
  {
    label: "How do I change my billing date?",
    description:
      "You can change your billing date through your account settings or by contacting support.",
  },
  {
    label: "Can I split my payments?",
    description:
      "Yes, we offer flexible payment options. Contact our billing team for assistance.",
  },
  {
    label: "How do I view past bills?",
    description:
      "Access your billing history through the “View Bills” section in your account.",
  },
  {
    label: "How do I cancel my Direct Debit?",
    description:
      "You can manage your Direct Debit settings in the “Manage Direct Debit” section.",
  },
];

export default function FrequentlyAskedQues() {
     const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      {/* Security & Compliance */}
      <section
        aria-labelledby="security-and-compliance-heading"
        className="bg-white dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="security-and-compliance-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-8 text-center md:text-left"
          >
            Security & Compliance
          </h2>

          {/* Cards */}
          <ul className="flex flex-wrap gap-3" role="list">
            {Items.map((item) => (
              <li key={item}>
                <span className="bg-gray-200 border border-gray-200 font-medium md:font-semibold  text-[#10446C] text-xs md:text-sm px-3 py-2 rounded-3xl
                dark:bg-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ's */}
     <section
      aria-labelledby="faq-heading"
      className="bg-[#f0f2f4] dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2
          id="faq-heading"
          className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-8 text-center md:text-left"
        >
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <ul className="flex flex-col gap-4">

          {FAQ.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <li key={item.label}>
                <article className="rounded-xl overflow-hidden shadow-sm dark:border border-gray-600">

                  {/* QUESTION (Clickable) */}
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${index}`}
                    className="w-full text-left px-4 py-4 md:px-5 md:py-5
                    bg-[#10446C] dark:bg-blue-950 text-white font-semibold text-sm md:text-base
                    transition"
                  >
                    {item.label}
                  </button>

                  {/* ANSWER */}
                  <div
                    id={`faq-${index}`}
                    className={`px-4 md:px-5 overflow-hidden transition-all duration-300
                    ${
                      isOpen
                        ? "max-h-0 py-0 bg-[#f8f9fa] dark:bg-gray-800"
                        : "max-h-40 py-4"
                    }`}
                  >
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </article>
              </li>
            );
          })}

        </ul>
      </div>
    </section>

      {/* Need Help */}
       <section
        aria-labelledby="need-help-heading"
        className="bg-[#f0f2f4] dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="need-help-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-8 text-center md:text-left"
          >
           Need Help? We're Here for You
          </h2>

          {/* Cards */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            role="list"
          >
            {Items2.map((item) => (
              <li key={item.label}>
                <article
                  className="h-full bg-[#f8f9fa] dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-xl p-4 md:p-6 flex flex-col justify-between
            shadow-sm hover:shadow-md transition"
                >
                  {/* Title */}
                  <h3 className="text-base md:text-xl text-center font-semibold text-[#10446C] dark:text-white">
                    {item.label}
                  </h3>

                  {/* Button */}
                  <Link
                    href={item.btnlink}
                    aria-label={item.label}
                    className="mt-6 inline-block text-base font-semibold
              bg-[#10446C] text-white text-center
              px-4 py-6 md:py-6 rounded-md"
                  >
                    {item.btn}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
