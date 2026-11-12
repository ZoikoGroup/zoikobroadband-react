import React from "react";

const faqData = {
  title: "Black Friday FAQ",
  items: [
    {
      question: "Which packages are included?",
      highlight: "ELIGIBLE FIBRE",
      answer:
        " – The Black Friday discount applies to eligible fibre packages. Eligibility of each package, including SoGEA: [to be confirmed].",
    },
    {
      question: "How long does the discount last?",
      highlight: "6 MONTHS",
      answer:
        " – The discount applies to the monthly subscription charge for your first six months. After that, the package's standard monthly price applies.",
    },
    {
      question: "When does the sale run?",
      highlight: "27–30 NOV",
      answer:
        " – From Black Friday, 27 November, to Cyber Monday, 30 November 2026. End time: [to be confirmed].",
    },
    {
      question: "Is a router and installation included?",
      highlight: "BY PACKAGE",
      answer:
        " – Router and installation terms are shown on each package. Router ownership and any Black Friday equipment benefit: [to be confirmed].",
    },
    {
      question: "What is the minimum term?",
      highlight: "TERM",
      answer:
        " – Minimum contract term: [XX months]. Annual price change: [£X.XX each April — to be confirmed].",
    },
    {
      question: "How are speeds measured?",
      highlight: "SPEEDS",
      answer:
        " – Speeds shown are [advertised / typical] speeds. Your estimated speed is confirmed for your address before you order.",
    },
  ],
} as const;

export default function BlackFridayFAQ() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fffbeb] px-4 py-16 sm:px-6 lg:px-8">
      {/* Decorative background elements matching the design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-12 h-3 w-3 -rotate-12 bg-[#12487a]/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-16 top-12 text-2xl text-[#f59e0b]"
      >
        ✦
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-12 h-2.5 w-6 -rotate-12 rounded-sm bg-[#dc2626]"
      />

      <div className="mx-auto max-w-[1320px]">
        {/* Top Mini Colored Dots */}
        <div className="flex justify-center items-center gap-1.5 mb-2">
          <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
          <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
          <span className="h-2 w-2 rounded-full bg-[#12487a]" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#143d29] sm:text-4xl">
            {faqData.title}
          </h2>
          <div className="mt-2.5 h-1 w-16 rounded-full bg-gradient-to-r from-red-500 to-[#ffc400]" />
        </div>

        {/* FAQ Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {faqData.items.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-l-[#dc2626] border-t border-r border-b border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-[#143d29]">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#374151]">
                  <span className="font-extrabold text-[#dc2626]">
                    {item.highlight}
                  </span>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
