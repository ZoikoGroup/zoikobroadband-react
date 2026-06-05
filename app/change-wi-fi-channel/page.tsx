import React from 'react'
import Link from 'next/link';

const sections = [
  {
    number: 1,
    title: "Log in to your BT Hub Manager",
    steps: [
      "Make sure your device (e.g., laptop or phone) is connected to your (Sole) Broadband Wi-Fi network.",
      "Open your web browser (e.g., Chrome, Safari, Edge).",
      "In the address bar at the top, type exactly 192.168.1.254 and press Enter.",
      'This will open the BT Hub Manager login page. You do not need a username and password by default. Just click "Log in".',
    ],
  },
  {
    number: 2,
    title: "Find the Wi-Fi Settings",
    steps: [
      'On the main page of the Hub Manager, look for the menu. Click on "Settings" or "Advanced Settings".',
      'From there, select "Wireless" or "Wi-Fi".',
    ],
  },
  {
    number: 3,
    title: "Change the Channel",
    intro:
      "You will see settings for two bands: 2.4GHz (better range) and 5GHz (faster speed). You can change both.",
    steps: [
      'Find the "Channel" or "Wi-Fi Channel" dropdown menu for the 2.4GHz band.',
      'Click the dropdown menu. By default, it is often set to "Automatic".',
      'For the best results, we recommend selecting "Automatic". This allows your BT Hub to automatically select the channel.',
      "If you wish to choose manually, try selecting Channel 1, 6, or 11. These are typically the best options as they are non-overlapping with each other.",
      'Repeat this process for the 5GHz band if you wish, again selecting "Automatic" for the best performance.',
      'Once you have made your changes, scroll down and click "Apply" or "Save Changes".',
    ],
  },
  {
    number: 4,
    title: "Reconnect Your Devices",
    steps: [
      "After you apply the settings, your Wi-Fi will restart briefly (this is normal).",
      "Your devices (phones, tablets, etc.) will disconnect and then automatically reconnect to the Wi-Fi within a minute or two. You should not need to enter the password again.",
    ],
  },
];

export default function page() {
  return (
    <>
      <section
        className="w-full bg-[#10446C] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="max-w-5xl mx-auto text-center text-white dark:text-gray-100">
          {/* Heading */}
          <h2
            className="text-2xl sm:text-3xl lg:text-[40px] font-bold leading-tight"
          >
            Improve Your Wi-Fi by Changing the Channel
          </h2>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            Step-by-Step Guide
          </p>
        </div>
      </section>

      <section className="bg-[#f5f5f5] dark:bg-gray-900 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Top Banner */}
          <div className="mb-12 rounded-2xl border-2 border-[#f0b12d] bg-[#f6e7bc] dark:bg-amber-950/30 dark:border-amber-700 p-6">
            <div className="flex gap-3">
              <span className="text-yellow-500 text-xl">💡</span>

              <div>
                <h2 className="text-xl font-bold text-[#0c4a7c] dark:text-amber-300 mb-2">
                  Why change the channel?
                </h2>

                <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                  Your neighbours' Wi-Fi can cause interference, like radio stations
                  overlapping. Changing the channel can make your connection stronger
                  and faster.
                </p>
              </div>
            </div>
          </div>

          {sections.map((section, sectionIndex) => (
            <div
              key={section.number}
              className="relative pl-14 md:pl-20 pb-14"
            >
              {/* Left Number Circle */}
              <div className="absolute left-0 top-0">
                <div className="h-12 w-12 rounded-full bg-[#f0b12d] text-white font-bold flex items-center justify-center shadow-lg text-lg">
                  {section.number}
                </div>
              </div>

              {/* Dashed Separator */}
              {sectionIndex !== 0 && (
                <div className="absolute left-6 -top-8 h-8 border-l border-dashed border-gray-300 dark:border-gray-700" />
              )}

              {/* Section Title */}
              <h2 className="text-2xl font-bold text-[#0c4a7c] dark:text-white mb-6">
                {section.title}
              </h2>

              {/* Intro Box */}
              {section.intro && (
                <div className="mb-6 rounded-lg bg-[#f7f9fc] dark:bg-gray-800 border-l-4 border-[#0c4a7c] p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-7">
                    {section.intro}
                  </p>
                </div>
              )}

              {/* Steps */}
              <div className="space-y-4">
                {section.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-sm
                border
                border-gray-100
                dark:border-gray-700
                p-5
                flex
                items-start
                gap-4
                transition-all
                hover:shadow-md
              "
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#0c4a7c] text-white text-sm md:text-base font-bold flex items-center justify-center">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Text */}
                    <p className="text-base md:text-lg leading-7 text-gray-700 dark:text-gray-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute left-6 -bottom-8 h-8 border-l border-dashed border-gray-300 dark:border-gray-700" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-[#f5f5f5] dark:bg-gray-900">
  <div className="max-w-3xl mx-auto space-y-8">

    {/* Summary Card */}
    <div className="rounded-2xl border-2 border-[#0d4b7c] bg-[#eef3fb] dark:bg-gray-800 dark:border-blue-700 p-6 md:p-8 shadow-md">

      <h2 className="flex items-center gap-2 text-xl font-bold text-[#0d4b7c] dark:text-blue-400 mb-6">
        <span>📋</span>
        Simple Summary
      </h2>

      <div className="space-y-3">

        {[
          "Connect to your Wi-Fi.",
          "Go to 192.168.1.254 in a browser.",
          "Log in (no password needed).",
          "Go to Settings > Wireless.",
          'Change the channel to "Automatic" for both bands.',
          'Click "Apply".',
          "Wait for your devices to reconnect."
        ].map((item, index) => (
          <div
            key={index}
            className="
              flex items-center gap-3
              bg-white
              dark:bg-gray-700
              rounded-lg
              px-4
              py-3
              border
              border-gray-100
              dark:border-gray-600
            "
          >
            <div className="flex-shrink-0">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-sm md:text-[15px] text-gray-700 dark:text-gray-200">
              {index === 1 ? (
                <>
                  Go to{" "}
                  <span className="px-2 py-1 rounded bg-amber-200 text-[#0d4b7c] font-semibold text-xs">
                    192.168.1.254
                  </span>{" "}
                  in a browser.
                </>
              ) : (
                item
              )}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Support Card */}
    <div
      className="
        relative
        rounded-2xl
        border-2
        border-[#f0b12d]
        bg-[#f7e8ba]
        dark:bg-amber-950/30
        dark:border-amber-700
        px-6
        py-12
        text-center
      "
    >
      {/* Floating Icon */}
      <div
        className="
          absolute
          left-1/2
          -top-6
          -translate-x-1/2
          w-14
          h-14
          rounded-full
          bg-[#f0b12d]
          flex
          items-center
          justify-center
          shadow-lg
        "
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18h.01M9.09 9a3 3 0 115.82 1c0 2-3 3-3 3"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-[#0d4b7c] dark:text-amber-300 mt-4">
        Need More Help?
      </h3>

      <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
        Contact Zoiko Broadband Support. We're here for you.
      </p>

      <Link
        href="/contact-us"
        className="
          mt-6
          px-8
          py-3
          rounded-lg
          bg-[#0d4b7c]
          hover:bg-[#0a3c63]
          text-white
          font-semibold
          shadow-lg
          transition-all
          duration-300
        "
      >
        Contact Support
      </Link>
    </div>

  </div>
</section>
    </>
  )
}
