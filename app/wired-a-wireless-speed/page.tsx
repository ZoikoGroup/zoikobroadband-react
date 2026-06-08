import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const connectionTypes = [
  {
    title: "Wired (Ethernet)",
    icon: "/Images/Wired-Wireless-speed/wired.png",
    borderColor: "border-green-500",
    iconBg: "bg-[#0D4B7C]",

    sections: [
      {
        heading: "How it works",
        text: "A physical cable connects your device directly to the BT Hub.",
      },
      {
        heading: "Best For",
        text: "Speed & Reliability. Online gaming, 4K streaming, large file downloads.",
      },
      {
        heading: "Speeds",
        text: "Consistently high speeds, close to your plan's maximum.",
      },
      {
        heading: "Reliability",
        text: "Very stable, unaffected by obstacles or other Wi-Fi networks.",
      },
    ],
  },

  {
    title: "Wireless (Wi-Fi)",
    icon: "/Images/Wired-Wireless-speed/wireless.png",
    borderColor: "border-blue-500",
    iconBg: "bg-[#0D4B7C]",

    sections: [
      {
        heading: "How it works",
        text: "A radio signal connects your device to the Hub.",
      },
      {
        heading: "Best For",
        text: "Convenience. Browsing, streaming on portable devices, smart home devices.",
      },
      {
        heading: "Speeds",
        text: "Speeds can vary with distance, walls, and interference.",
      },
      {
        heading: "Reliability",
        text: "Can be affected by walls, microwaves, and your distance from the Hub.",
      },
    ],
  },
];

const analogyData = {
  title: "Simple Analogy",
  text: "Think of Wi-Fi like broadcast radio — the signal can fade or suffer interference. A wired connection is like a landline telephone call — direct and clear.",
};

const speedTestSteps = [
  {
    title: "Before You Start:",
    items: [
      "Use a wired connection for the most accurate result, if possible.",
      "Pause other activity: Stop downloads, video streams, or online games on all devices.",
      "Connect directly: If testing wirelessly, stay in the same room as your BT Hub.",
    ],
  },
];

const speedTestGuide = [
  {
    step: 1,
    title: "Connect Your Device",
    type: "comparison",
    cards: [
      {
        title: "Wired Test",
        icon: "/Images/Wired-Wireless-speed/ethernet.png",
        border: "green",
        description:
          "Plug one end of an Ethernet cable into your laptop or computer and the other into a yellow Ethernet port on the back of your BT Hub.",
      },
      {
        title: "Wireless Test",
        icon: "/Images/Wired-Wireless-speed/wireless1.png",
        border: "blue",
        description:
          "Ensure your device is connected to your Zoiko Broadband Wi-Fi network.",
      },
    ],
  },

  {
    step: 2,
    title: "Go to the Speed Test Website",
    type: "list",
    items: [
      "Open your web browser (Chrome, Safari, etc.)",
      "Use the BT Speed Tester: https://www.bt.com/broadband/speedtest",
    ],
  },

  {
    step: 3,
    title: "Run the Test",
    type: "metrics",
    items: [
      "Click the 'Go' or 'Start' button.",
      "The test measures:",
    ],

    metrics: [
      {
        icon: "/Images/Wired-Wireless-speed/download.png",
        title: "Download Speed",
        description:
          "How fast you receive data (e.g., streaming video). This is the most important metric.",
      },

      {
        icon: "/Images/Wired-Wireless-speed/upload.png",
        title: "Upload Speed",
        description:
          "How fast you send data (e.g., posting photos).",
      },

      {
        icon: "/Images/Wired-Wireless-speed/ping.png",
        title: "Ping (Latency)",
        description:
          "The reaction time of your connection. Important for gaming. Lower is better.",
      },
    ],
  },

  {
    step: 4,
    title: "Interpret Your Results",
    type: "comparison",
    cards: [
      {
        title: "Wired Test Result",
        icon: "/Images/Wired-Wireless-speed/ethernet.png",
        border: "green",
        description:
          "Shows the speed your BT Hub is receiving from Zoiko Broadband. It should be close to your plan speed.",
      },

      {
        title: "Wireless Test Result",
        icon: "/Images/Wired-Wireless-speed/wireless1.png",
        border: "blue",
        description:
          "Usually lower than the wired result. The difference shows how much speed is lost over Wi-Fi.",
      },
    ],
  },
];
const borderStyles = {
  green: "border-green-500",
  blue: "border-blue-500",
};

const nextStepsCards = [
  {
    title: "Wired speed is low",
    icon: "/Images/Wired-Wireless-speed/error.png",
    iconAlt: "Error",
    borderColor: "border-red-500",
    buttonText: "Contact Support",
    buttonLink: "/contact-us",
    description:
      "There may be a network issue. Contact Zoiko Broadband Support.",
  },

  {
    title: "Wireless speed is low, but wired speed is good",
    icon: "/Images/Wired-Wireless-speed/warning.png",
    iconAlt: "Warning",
    borderColor: "border-[#F0B12D]",
    buttonText: "Wi-Fi Guide",
    buttonLink: "/change-wifi-channel",
    description:
      'Your Wi-Fi needs optimizing. Try our "Change Wi-Fi Channel" guide or move your BT Hub to a more central location.',
  },
];

const summaryData = {
  title: "Summary",
  description:
    "For the best performance, use a cable. For testing, always try a wired connection first to see what your line can truly deliver.",
  note:
    "If you need further assistance or have additional questions, feel free to ask!",
};

const supportCard = {
  title: "Need Help Running a Speed Test?",
  description:
    "Our support team is available 24/7 to assist you.",
  icon: "/Images/Wired-Wireless-speed/chat.png",
  buttonText: "Contact Support Now",
  buttonLink: "/contact-us",
};

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
            Speed Test Guide: Wired vs Wireless Connections
          </h2>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
           Understanding Your Broadband Performance
          </p>
        </div>
      </section>

       <section className="bg-[#f5f5f5] dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Top Banner */}

        <div
          className="
            mb-10
            rounded-xl
            border-2
            border-[#F0B12D]
            bg-[#F7E8BA]
            dark:bg-amber-950/30
            dark:border-amber-700
            p-5 md:p-6
          "
        >
          <h2 className="text-xl font-bold text-[#0D4B7C] dark:text-amber-300 mb-2">
            Why Compare?
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-6">
            A wired connection directly to your BT Hub is typically faster and
            more reliable than Wi-Fi. Testing both helps you understand whether
            your broadband's true performance and whether your Wi-Fi is causing
            any issues.
          </p>
        </div>

        {/* Section Heading */}

        <div className="flex items-center gap-3 mb-8">
          <div
            className="
              w-8 h-8
              rounded-full
              bg-[#F0B12D]
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-sm
            "
          >
            1
          </div>

          <h3 className="text-xl font-bold text-[#0D4B7C] dark:text-white">
            Understanding the Connection Types
          </h3>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {connectionTypes.map((item, index) => (
            <div
              key={index}
              className={`
                bg-white
                dark:bg-gray-800
                rounded-xl
                border-2
                ${item.borderColor}
                p-6
                shadow-sm
                h-full
              `}
            >
              {/* Icon */}

              <div className="flex flex-col items-center mb-8">
                <div
                  className={`
                    w-14 h-14
                    rounded-full
                    ${item.iconBg}
                    flex
                    items-center
                    justify-center
                    shadow-md
                  `}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={56}
                    height={56}
                    className="w-12 h-12 md:w-14 md:h-14 object-cover"
                  />
                </div>

                <h4 className="mt-4 text-xl font-bold text-[#0D4B7C] dark:text-white">
                  {item.title}
                </h4>
              </div>

              {/* Content */}

              <div className="space-y-5">
                {item.sections.map((section, idx) => (
                  <div key={idx}>
                    <h5 className="text-sm md:text-base font-bold text-[#F0B12D] mb-2">
                      {section.heading}
                    </h5>

                    <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3">
                      <p className="text-sm md:text-base leading-6 text-gray-700 dark:text-gray-300">
                        {section.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Analogy */}

        <div
          className="
            mt-8
            rounded-xl
            border
            border-[#0D4B7C]
            bg-[#EAF2FD]
            dark:bg-gray-800
            dark:border-blue-600
            p-5
          "
        >
          <div className="flex items-start gap-3">
            <span className="text-[#F0B12D] text-lg">💡</span>

            <div>
              <h4 className="font-bold text-[#0D4B7C] dark:text-blue-400 mb-2">
                {analogyData.title}
              </h4>

              <p className="text-sm md:text-base leading-6 text-gray-700 dark:text-gray-300">
                {analogyData.text}
              </p>
            </div>
          </div>
        </div>

      </div>
       </section>

       <section className="py-10 px-4 bg-[#f5f5f5] dark:bg-gray-900">
  <div className="max-w-6xl mx-auto">

    {/* Main Heading */}

    <div className="flex items-center gap-3 mb-8">
      <div
        className="
          w-8 h-8
          rounded-full
          bg-[#F0B12D]
          text-white
          font-bold
          text-sm
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        2
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#0D4B7C] dark:text-white">
        How to Run an Accurate Speed Test
      </h2>
    </div>

    {/* Cards */}

    <div className="space-y-6">

      {speedTestSteps.map((section, index) => (
        <div
          key={index}
          className="
            rounded-xl
            border-2
            border-[#F0B12D]
            bg-white
            dark:bg-gray-800
            p-5 md:p-6
            shadow-sm
          "
        >
          <h3 className="text-lg font-bold text-[#0D4B7C] dark:text-white mb-5">
            {section.title}
          </h3>

          <div className="space-y-3">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  bg-gray-50
                  dark:bg-gray-700/40
                  px-4
                  py-3
                "
              >
                <span className="text-green-600 font-bold text-lg">
                  ✓
                </span>

                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

  </div>
        </section>

        <section className="py-12 px-4 bg-[#f5f5f5] dark:bg-gray-900">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-2xl font-bold text-[#0D4B7C] dark:text-white mb-8">
      Step-by-Step Test:
    </h2>

    <div className="space-y-6">

      {speedTestGuide.map((section) => (
        <div
          key={section.step}
          className="
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-sm
            border
            border-gray-200
            dark:border-gray-700
            p-5 md:p-6
          "
        >
          {/* Header */}

          <div className="flex items-center gap-3 mb-5">
            <div
              className="
                w-8 h-8
                rounded-full
                bg-[#F0B12D]
                text-white
                font-bold
                flex
                items-center
                justify-center
                text-sm md:text-base
                shrink-0
              "
            >
              {section.step}
            </div>

            <h3 className="font-bold text-[#0D4B7C] dark:text-white text-lg">
              {section.title}
            </h3>
          </div>

          {/* LIST */}

          {section.type === "list" && (
            <ul className="space-y-3 ml-2">
              {section.items?.map((item, index) => (
                <li
                  key={index}
                  className="
                    text-sm md:text-base
                    text-gray-700
                    dark:text-gray-300
                    flex
                    gap-2
                  "
                >
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* COMPARISON */}

          {section.type === "comparison" && (
            <div className="grid md:grid-cols-2 gap-4">
              {section.cards?.map((card, index) => (
                <div
                  key={index}
                  className={`
                    rounded-lg
                    border-2
                    ${borderStyles[card.border as keyof typeof borderStyles]}
                    bg-gray-50
                    dark:bg-gray-700/30
                    p-4
                  `}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={18}
                      height={18}
                    />

                    <h4 className="text-sm md:text-base font-semibold text-[#0D4B7C] dark:text-white">
                      {card.title}
                    </h4>
                  </div>

                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-6">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* METRICS */}

          {section.type === "metrics" && (
            <>
              <ul className="space-y-2 mb-6">
                {section.items?.map((item, index) => (
                  <li
                    key={index}
                    className="
                      flex gap-2
                      text-sm md:text-base
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {section.metrics?.map((metric, index) => (
                  <div
                    key={index}
                    className="
                      bg-gray-50
                      dark:bg-gray-700/30
                      rounded-lg
                      border-2
                      border-gray-200
                      dark:border-gray-600
                      p-5
                      text-center
                    "
                  >
                    <Image
                      src={metric.icon}
                      alt={metric.title}
                      width={24}
                      height={24}
                      className="mx-auto mb-3"
                    />

                    <h4 className="text-sm md:text-base font-semibold text-[#0D4B7C] dark:text-white mb-2">
                      {metric.title}
                    </h4>

                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-6">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
        </section>

         <section className="bg-[#f5f5f5] dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#0D4B7C] dark:text-white mb-8">
          What to Do Next?
        </h2>

        {/* Decision Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {nextStepsCards.map((card, index) => (
            <div
              key={index}
              className={`
                bg-white
                dark:bg-gray-800
                rounded-xl
                border-2
                ${card.borderColor}
                p-6 md:p-8
                text-center
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
              `}
            >
              <div className="flex justify-center mb-5">
                <Image
                  src={card.icon}
                  alt={card.iconAlt}
                  width={42}
                  height={42}
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg font-bold text-[#0D4B7C] dark:text-white mb-3">
                {card.title}
              </h3>

              <p className="text-sm leading-6 text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto">
                {card.description}
              </p>

              <Link
                href={card.buttonLink}
                className="
                  inline-flex
                  items-center
                  justify-center
                  min-w-[140px]
                  h-10
                  px-5
                  rounded-md
                  bg-[#F0B12D]
                  hover:bg-[#dc9d18]
                  text-[#0D4B7C]
                  font-semibold
                  text-sm md:text-base
                  transition-all
                  shadow-md
                "
              >
                {card.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* Summary Banner */}

        <div
          className="
            rounded-xl
            border-2
            border-[#F0B12D]
            bg-[#FDF3D8]
            dark:bg-amber-950/20
            dark:border-amber-700
            p-5 md:p-6
            mb-8
          "
        >
          <h3 className="flex items-center gap-2 text-lg font-bold text-[#0D4B7C] dark:text-amber-300 mb-3">
            📌 {summaryData.title}
          </h3>

          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-7 mb-3">
            {summaryData.description}
          </p>

          <p className="text-sm md:text-base italic text-gray-600 dark:text-gray-400">
            {summaryData.note}
          </p>
        </div>

        {/* Support Card */}

        <div
          className="
            relative
            rounded-2xl
            border-2
            border-[#0D4B7C]
            bg-[#EEF3FB]
            dark:bg-gray-800
            dark:border-blue-600
            py-14
            px-6
            text-center
          "
        >
          {/* Floating Icon */}

          <div
            className="
              absolute
              left-1/2
              top-5
            //   -translate-x-1/2
              w-16
              h-16
              rounded-full
              bg-[#0D4B7C]
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <Image
              src={supportCard.icon}
              alt="Support"
              width={48}
              height={48}
              className="w-16 h-16 object-cover"
            />
          </div>

          <h3 className="text-2xl font-bold text-[#0D4B7C] dark:text-white mt-6 mb-3">
            {supportCard.title}
          </h3>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
            {supportCard.description}
          </p>

          <Link
            href={supportCard.buttonLink}
            className="
              inline-flex
              items-center
              justify-center
              px-8
              h-11
              rounded-lg
              bg-[#F0B12D]
              hover:bg-[#dc9d18]
              text-[#0D4B7C]
              font-semibold
              transition-all
              shadow-lg
            "
          >
            {supportCard.buttonText}
          </Link>
        </div>
      </div>
    </section>
    </>
  )
}
