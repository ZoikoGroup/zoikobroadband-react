"use client";

import { useState } from "react";

const stepData = {
  new: [
   {
    id: 1,
    title: "Check Your Kit",
    description: `Ensure all equipment is included before setup.
      Watch the LED lights on your router:

      Red/Orange: Starting up (1–2 minutes)
      Amber: Connecting to network (2–5 minutes)
      Green/Blue: Connected and ready to use
      If lights remain red after 10 minutes, try unplugging and reconnecting the power.`
    
  },
  {
    id: 2,
    title: "Connect Your Equipment",
    description: "Instructions for connecting your cables, power, and any other required hardware."
  },
  {
    id: 3,
    title: "Power On & Wait",
    description: "Power up the router and wait for it to fully boot."
  },
  {
    id: 4,
    title: "Join Wi-Fi Network",
    description: "Use the network name and password provided to connect."
  },
  {
    id: 5,
    title: "Activate Your Service",
    description: "Visit the activation page and follow the prompts."
  },
  {
    id: 6,
    title: "Troubleshooting",
    description: "If something isn't working, follow the troubleshooting steps or contact support."
  }
  ],

  replacement: [
    {
      id: 1,
      title: "How do I request a replacement router?",
      description: "If your router develops a fault or is no longer supported, you can request a replacement through My Account or by contacting Zoiko Support. Where the fault occurs during your contract, replacements are provided free of charge under Ofcom consumer protection rules.",
    },
    {
      id: 2,
      title: "Will I be charged for a replacement router?",
      description: "Routers under warranty or covered by your service agreement are replaced free of charge. Out-of-warranty replacements may carry a fee, which will always be confirmed before dispatch.",
    },
    {
      id: 3,
      title: "How do I return my old router?",
      description: "We include a pre-paid returns bag with your new router. Please return the old equipment within 14 days. Returned units are either refurbished for reuse or recycled responsibly in line with our sustainability commitments.",
    },
    {
      id: 4,
      title: "How do I set up my new router?",
      description: "Disconnect your old router and connect the new one using the supplied cables. Step-by-step instructions and a video guide are available online. Our support team can walk you through setup or, if needed, arrange an engineer visit.",
    },
    {
      id: 5,
      title: "Will my Wi-Fi name and password change?",
      description: "Each router has a default Wi-Fi name and password printed on the back. To keep your existing network details, use the Zoiko app to transfer settings securely from your old router.",
    },
    {
      id: 6,
      title: "What if the replacement router doesn’t work?",
      description: "Contact Zoiko Support immediately. We can run remote diagnostics, dispatch a new unit if required, or book an engineer visit at no cost if the fault is service-related. Throughout the process, we’ll keep you connected wherever possible.",
    },
  ],

  fibre: [
    {
      id: 1,
      title: "Check Fibre Box",
      description: "Ensure fibre ONT box is powered on.",
    },
    {
      id: 2,
      title: "Connect Router",
      description: "Plug router into ONT port.",
    },
  ],
};

export default function StepGuide({
  activeTab,
}: {
  activeTab: keyof typeof stepData;
}) {
  const steps = stepData[activeTab];

  const [openStep, setOpenStep] = useState<number | null>();

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 mt-8 py-12">
      {/* Section Title */}
      <h2
        id="select-your-setup-type-heading"
        className="text-xl md:text-2xl font-semibold dark:text-[#63a7db]
 text-[#10446C] mb-2 text-center"
      >
        Step-by-Step Setup Guide
      </h2>

      <p className="mb-6 text-center text-sm md:text-base dark:bg-gray-950  dark:text-white
 text-[#555555] leading-relaxed max-w-2xl mx-auto">
        Follow these steps to get your broadband up and running
      </p>

      {steps.map((step) => {
        const isOpen = openStep === step.id;

        return (
          <div
            key={step.id}
            className="w-full dark:bg-gray-950  dark:text-white
 bg-white rounded-xl shadow-md overflow-hidden p-3 md:p-8 border border-gray-200"
          >
            {/* Header */}
            <button
              onClick={() => toggleStep(step.id)}
              className="w-full flex items-center justify-between  text-left"
            >
              <div className="flex items-center gap-4">
                {/* Step Number */}
                <div className="bg-yellow-400 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full font-bold">
                  {step.id}
                </div>

                <h2 className="text-lg md:text-xl font-semibold dark:text-[#63a7db]
 text-blue-900">
                  {step.title}
                </h2>
              </div>

              {/* Arrow */}
              <svg
                className={`w-5 h-5 transition-transform duration-500 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>

            {/* Content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-auto opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <p className= " text-gray-600 text-sm md:text-base ml-12 pb-4 whitespace-pre-line  ">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
