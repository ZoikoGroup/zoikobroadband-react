import React from 'react'

 const ledStatusData = [
  {
    title: "Solid Blue",
    color: "#4F7CFF",
    borderColor: "border-blue-400",
    meaning:
      "Your hub is connected to broadband and working correctly.",
    action:
      "No action needed. If you're experiencing issues, try restarting your device.",
  },
  {
    title: "Flashing Orange",
    color: "#FF8A3D",
    borderColor: "border-orange-400",
    meaning:
      "The hub is connecting to broadband.",
    action:
      "Wait a few minutes for the connection to establish. If it doesn't turn solid blue, check your broadband cable connections and ensure your service is activated.",
  },
  {
    title: "Solid Orange",
    color: "#FF8A3D",
    borderColor: "border-orange-300",
    meaning:
      "The hub is powered on but not connected to the internet.",
    action:
      "Disconnect and reconnect the broadband cable to ensure a secure connection.",
  },
  {
    title: "Solid Red",
    color: "#E53E3E",
    borderColor: "border-red-400",
    meaning:
      "There's a problem with the hub or broadband service.",
    action:
      "Restart your hub. If the issue persists, perform a factory reset using a paperclip to press the reset button. If the red light remains, contact Zoiko Broadband Support.",
  },
  {
    title: "Flashing Purple",
    color: "#8B5CF6",
    borderColor: "border-purple-400",
    meaning:
      "The hub is connected but the broadband cable isn't connected.",
    action:
      "Ensure the broadband cable (grey cable) is securely plugged in. If you're using a fibre setup, check that it's connected correctly.",
  },
  {
    title: "Solid Purple",
    color: "#8B5CF6",
    borderColor: "border-purple-400",
    meaning:
      "The hub is connected to the mobile network as Hybrid Connect for broadband backup.",
    action:
      "Wait for the broadband service to resume. The purple light persists, check for service disruptions in your area.",
  },
  {
    title: "No Light",
    color: "#0F4C81",
    borderColor: "border-slate-400",
    meaning:
      "The hub is powered off or the lights have been turned off via the Hub Manager.",
    action:
      "Check the power connection and ensure the hub is switched on. If the lights have been turned off, you can enable them through the Hub Manager.",
  },
  {
    title: "WPS Flashing Blue",
    color: "#4F7CFF",
    borderColor: "border-blue-400",
    meaning:
      "The hub is waiting for you to press the WPS button on your device to establish a connection.",
    action:
      "Press the WPS button on your device within two minutes to connect.",
  },
  {
    title: "WPS Flashing Red",
    color: "#E53E3E",
    borderColor: "border-red-400",
    meaning:
      "The WPS connection attempt failed.",
    action:
      "Wait a couple of minutes and try the WPS connection again.",
  },
  {
    title: "Solid White",
    color: "#F8FAFC",
    borderColor: "border-gray-300",
    meaning:
      "The hub is in Bridge Mode, acting as a modem only.",
    action:
      "Reconnect another router device. Refer to the setup instructions in your Hub Manager if needed.",
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
            BT Hub LED Light Meanings
          </h2>

          {/* Description */}
          <p className="mt-4 text-base md:text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            Understanding Your Hub's Status Indicators
          </p>
        </div>
      </section>

      <section className="bg-[#f5f5f5] dark:bg-gray-900 py-12 px-4">
  <div className="max-w-6xl mx-auto">

    {/* Info Banner */}

    <div
      className="
        mb-10
        rounded-xl
        border-2
        border-[#F0B12D]
        bg-[#F7E8BA]
        dark:bg-amber-950/30
        dark:border-amber-700
        px-6
        py-5
        text-center
      "
    >
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        The LED lights on your BT Hub indicate its current status and can help
        you identify any issues. Below is a comprehensive guide to understanding
        these indications.
      </p>
    </div>

    {/* Cards */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {ledStatusData.map((item, index) => (
        <div
          key={index}
          className={`
            bg-white
            dark:bg-gray-800
            rounded-xl
            border
            ${item.borderColor}
            shadow-sm
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          `}
        >
          {/* Header */}

          <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span
              className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
              style={{ backgroundColor: item.color }}
            />

            <h3 className="font-bold text-[#0C4A7C] dark:text-white text-lg">
              {item.title}
            </h3>
          </div>

          {/* Content */}

          <div className="mt-5 space-y-5">

            <div>
              <h4 className="font-semibold text-[#0C4A7C] dark:text-blue-400 text-sm mb-2">
                Meaning
              </h4>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.meaning}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[#0C4A7C] dark:text-blue-400 text-sm mb-2">
                Recommended Action
              </h4>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.action}
                </p>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  )
}
