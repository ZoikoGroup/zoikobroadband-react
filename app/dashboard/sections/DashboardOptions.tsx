"use client";
import React, { useState } from "react";
const stepData = {
  overview: [
    {
      id: 1,
      title: "View/Download Bills",
      description: "Access and download your bills in PDF format",
      buttonText: "Download Bills",
    },
  ],
  billing: [
    {
      id: 1,
      title: "View/Download Bills",
      description: "Access and download your bills in PDF format",
      buttonText: "Download Bills",
    },
    {
      id: 2,
      title: "Payment Method",
      description: "Update your payment information",
      buttonText: "Change Method",
    },
    {
      id: 3,
      title: "Billing Cycle",
      description: "Adjust your billing cycle preferences",
      buttonText: "Adjust Cycle",
    },
    {
      id: 4,
      title: "Paperless Billing",
      description: "Switch to eco-friendly paperless bills",
      buttonText: "Go Paperless",
    },
  ],

  broadband: [
    {
      id: 1,
      title: "Data Usage",
      description: "Monitor your monthly data consumption",
      buttonText: "View Usage",
    },
    {
      id: 2,
      title: "Speed Check",
      description: "Test your current broadband speeds",
      buttonText: "Check Speed",
    },
    {
      id: 3,
      title: "Wi-Fi Optimization",
      description: "Optimize your Wi-Fi performance",
      buttonText: "Optimize Wi-Fi",
    },
    {
      id: 4,
      title: "Service Uptime",
      description: "View your service reliability statistics",
      buttonText: "View Uptime",
    },
  ],

  account: [
    {
      id: 1,
      title: "Contact Information",
      description: "Update your personal details",
      buttonText: "Edit Info",
    },
    {
      id: 2,
      title: "Address",
      description: "Change your service address",
      buttonText: "Change Address",
    },
    {
      id: 3,
      title: "Marketing Preference",
      description: "Manage your communication preferences",
      buttonText: "Manage Preferences",
    },
  ],

  security: [
    {
      id: 1,
      title: "Two-Factor Authentication",
      description: "Enable 2FA for enhanced security",
      buttonText: "Enable 2FA",
    },
    {
      id: 2,
      title: "Change Password",
      description: "Update your account password",
      buttonText: "Change Password",
    },
    {
      id: 3,
      title: "Login History",
      description: "Review your recent login activity",
      buttonText: "View History",
    },
    {
      id: 4,
      title: "Report Suspicious Activity",
      description: "Report any suspicious account activity",
      buttonText: "Report Activity",
    },
  ],

  support: [
    {
      id: 1,
      title: "Support Ticket",
      description: "Raise a new support ticket",
      buttonText: "Create Ticket",
    },
    {
      id: 2,
      title: "Live Chat",
      description: "Chat with our support team",
      buttonText: "Start Chat",
    },
    {
      id: 3,
      title: "Call-back Request",
      description: "Request a call from our support team",
      buttonText: "Request Call",
    },
    {
      id: 4,
      title: "Ticket History",
      description: "View your past support tickets",
      buttonText: "View History",
    },
  ],
};

export default function DashboardOptions() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "billing" | "broadband" | "account" | "security" | "support"
  >("overview");

//   const [openStep, setOpenStep] = useState<number | null>();

  const tabs = [
    { id: "overview", label: "Overview", style: "hidden sm:block" },
    { id: "billing", label: "Billing" },
    { id: "broadband", label: "Broadband" },
    { id: "account", label: "Account Settings" },
    { id: "security", label: "Security" },
    { id: "support", label: "Support" },
  ];

  return (
    <>
      <section
        aria-labelledby="select-your-setup-type-heading"
        className=" bg-[#f8fafc] flex flex-col py-8 sm:px-3 lg:px-8 lg:py-12 border-t border-gray-200"
      >
        {/* Tabs.... */}
        <div className="bg-white rounded-xl p-1 md:p-2 flex flex-row md:flex-row gap-1 md:gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as
                    | "overview"
                    | "billing"
                    | "broadband"
                    | "account"
                    | "security"
                    | "support",
                )
              }
              className={`px-1 md:px-4 
        py-2 md:py-5
        text-xs md:text-base lg:text-base
        rounded-sm font-medium md:font-bold transition whitespace-nowrap ${tab.style}
              ${
                activeTab === tab.id
                  ? "border-b-2 border-[#ffd300] text-[#10446C]"
                  : "text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepData[activeTab].map((item) => (
            <li key={item.id}>
              <div className="h-full bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">{item.description}</p>

                <button className="mt-4 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                  {item.buttonText}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
