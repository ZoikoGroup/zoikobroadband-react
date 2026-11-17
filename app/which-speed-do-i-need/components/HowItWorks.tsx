import React from "react";
import { ArrowDownToLine, ArrowUpFromLine, Clock } from "lucide-react";

const CARDS_DATA = [
  {
    icon: ArrowDownToLine,
    title: "Download speed",
    description:
      "Affects how quickly your devices receive data, including streaming and downloads. More simultaneous users usually means more download demand.",
  },
  {
    icon: ArrowUpFromLine,
    title: "Upload speed",
    description:
      "Affects sending large files, cloud backups and the quality of some video calls. Some connections are asymmetric, with a lower upload than download.",
  },
  {
    icon: Clock,
    title: "Latency",
    description:
      "The time it takes for a signal to respond. It matters for real-time activities like gaming and calls. A higher download number alone does not guarantee low latency.",
  },
] as const;

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
            <span className="text-xs font-bold tracking-widest text-[#f59e0b] uppercase">
              HOW IT WORKS
            </span>
            <span className="h-[2px] w-8 bg-[#f59e0b]"></span>
          </div>
          <h1 className="text-3xl md:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-4 leading-tight">
            Download, upload and latency, explained
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Three different things shape how your connection feels. Knowing them
            helps you read any speed with confidence.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS_DATA.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="w-12 h-12 bg-[#0A3A66] rounded-2xl flex items-center justify-center text-white mb-6">
                    <IconComponent className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0f172a] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
