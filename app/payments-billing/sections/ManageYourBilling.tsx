import React from "react";
import Link from "next/link";

const Items = [
  {
    label: "Billing History",
    description: "View/download invoices, bulk download, filter by month/year",
    btn: "View Bills",
    btnlink: "#",
  },
  {
    label: "Payment Methods",
    description: "Add/edit card or bank account, set preferred method",
    btn: "Manage Payments",
    btnlink: "#",
  },
  {
    label: "Billing Settings",
    description: "Change billing date, switch to paperless, update contact",
    btn: "Adjust Settings",
    btnlink: "#",
  },
  {
    label: "Recurring Payments",
    description: "View/download invoices, bulk download, filter by month/year",
    btn: "Manage Direct Debit",
    btnlink: "#",
  },
  {
    label: "Payment Issues",
    description: "Add/edit card or bank account, set preferred method",
    btn: "Resolve Issue",
    btnlink: "#",
  },
];

const Quickaction = [
  {
    title: "Billing Tools",
    actions: [
      "Download most recent invoice",
      "Bulk download last 12 months",
      "View VAT breakdown",
    ],
  },
  {
    title: "Alerts & Reminders",
    actions: [
      "Enable SMS reminders",
      "Set monthly billing alert",
      "Choose notification frequency",
    ],
  },
  {
    title: "Account Help",
    actions: [
      "Apply for flexible payments",
      "Request a bill explanation",
      "Contact Billing Support",
    ],
  },
];
const Insights = [
  {
    label: "Average Monthly Spend",
    description: "£36.90",
  },
  {
    label: "Most Expensive Month",
    description: "July — £44.50",
  },
];
export default function ManageYourBilling() {
  return (
    <>
      {/* <section className="w-full"> */}

      {/* Manage your Billing */}
      <section
        aria-labelledby="manage-billing-heading"
        className="bg-[#f0f2f4] dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="manage-billing-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-8 text-center md:text-left"
          >
            Manage Your Billing
          </h2>

          {/* Cards */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {Items.map((item) => (
              <li key={item.label}>
                <article
                  className="h-full bg-[#f8f9fa] dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-xl p-6 flex flex-col justify-between
            shadow-sm hover:shadow-md transition"
                >
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-[#10446C] dark:text-white">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Button */}
                  <Link
                    href={item.btnlink}
                    aria-label={item.label}
                    className="mt-5 inline-block w-fit text-sm font-semibold
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

      {/* Quick Access Tools */}
      <section
        aria-labelledby="quick-access-heading"
        className="bg-white dark:bg-gray-900 py-10 md:py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="quick-access-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-6 text-center md:text-left"
          >
            Quick Access Tools
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Quickaction.map((group) => (
              <article key={group.title} className="flex flex-col gap-3">
                {/* Title */}
                <h3 className="text-[#10446C] dark:text-white font-semibold text-base">
                  {group.title}
                </h3>

                {/* Divider */}
                <div className="h-0.5 w-16 bg-[#F5C241]" />

                {/* List */}
                <ul className="flex flex-col gap-2 mt-2">
                  {group.actions.map((action) => (
                    <li key={action}>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {action}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Billing Insights */}
      <section
        aria-labelledby="billing-insights-heading"
        className="bg-[#f0f2f4] dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            id="billing-insights-heading"
            className="text-xl md:text-2xl font-bold text-[#10446C] dark:text-white mb-6 text-center md:text-left"
          >
            Billing Insights
          </h2>

          {/* Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Insight Cards */}
            {Insights.map((item) => (
              <li key={item.label}>
                <article
                  className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-xl p-6 flex flex-col items-center justify-center text-center
            shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-sm md:text-base font-semibold text-[#10446C] dark:text-white">
                    {item.label}
                  </h3>

                  <p className="mt-2 text-lg md:text-xl font-bold text-[#F6C140]">
                    {item.description}
                  </p>
                </article>
              </li>
            ))}

            {/* CTA Card */}
            <li>
              <article
                className="h-full bg-[#10446C] dark:bg-blue-950
          rounded-xl p-6 flex flex-col items-center justify-center text-center
          shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-base font-semibold text-white">
                  Save Money
                </h3>

                <p className="mt-2 text-sm md:text-base text-white/90">
                  Save £6/month with Fibre 250
                </p>

                <Link
                  href="/fibre-packages"
                  aria-label="View fibre packages"
                  className="mt-4 inline-block text-sm font-semibold
            bg-[#F6C140] text-[#10446C]
            px-4 py-2 rounded-md
            hover:bg-[#eab530] transition"
                >
                  Learn More
                </Link>
              </article>
            </li>
          </ul>
        </div>
      </section>

      {/* </section> */}
    </>
  );
}
