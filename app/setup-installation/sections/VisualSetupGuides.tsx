import Link from 'next/link';
import React from 'react'

export default function VisualSetupGuides() {
  const guides = [
    {
      id: 1,
      icon: "▶",
      title: "Video Tutorial",
      subtitle: "Full walkthrough with captions",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 text-center text-sm text-gray-500 dark:bg-gray-950  dark:text-white">
          Setup Video Tutorial (2–3 minutes)
          <br />
          Click to play with subtitles
        </div>
      ),
      button: "Watch Video",
      buttonStyle: "bg-[#1f4f73] text-white ",
    },
    {
      id: 2,
      icon: "🛜",
      title: "Router Diagram",
      subtitle: "Visual guide with labels and descriptions",
      content: (
        <div className="border rounded-lg p-10 text-center text-sm text-gray-500 dark:bg-gray-950  dark:text-white">
          Router Connection Diagram
          <br />
          Power / Ethernet / Phone Line
        </div>
      ),
      button: "View Diagram",
      buttonLink: "#",
      buttonStyle: "bg-[#1f4f73] text-white",
    },
    {
      id: 3,
      icon: "📄",
      title: "PDF Download",
      subtitle: "Printer-friendly version with large print option",
      content: (
        <ul className="text-sm text-gray-600 space-y-2 text-left">
          <li>✔ Printable instructions</li>
          <li>✔ Large font option</li>
          <li>✔ Works offline</li>
          <li>✔ Multiple languages</li>
        </ul>
      ),
      button: "Download PDF",
      buttonLink: "http://https//zoikobroadband.com/wp-content/uploads/2025/10/PDF-1-file.pdf",
      buttonStyle: "bg-yellow-400 text-black",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-950  dark:text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold dark:text-[#3374a6] text-[#10446C]">
            Visual Setup Guides
          </h2>
          <p className="text-gray-500 mt-2 dark:bg-gray-950  dark:text-white">
            Watch, read, or download our comprehensive setup resources
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 flex flex-col items-center text-center  dark:text-white"
            >

              {/* Icon */}
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl mb-4">
                {guide.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold dark:text-[#63a7db] text-[#10446C]">
                {guide.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm dark:bg-gray-900  dark:text-white text-gray-500 mb-6">
                {guide.subtitle}
              </p>

              {/* Content */}
              <div className="w-full mb-6">{guide.content}</div>

              {/* Button */}
              <Link
                href={guide.buttonLink || "#"}
                className={`px-5 py-2 rounded-md text-sm font-medium ${guide.buttonStyle}`}
              >
                {guide.button}
              </Link>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
