"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";

const connectionTypes = [
  { id: "fttp", label: "Full Fibre (FTTP)" },
  { id: "fttc", label: "Standard Fibre (FTTC)" },
  { id: "business", label: "Business Router" },
  { id: "landline", label: "Router + Landline" },
] as const;

type ConnectionType = (typeof connectionTypes)[number]["id"];

// Replace these paths with your actual exported Figma images
const diagramImages: Record<ConnectionType, string> = {
  fttp: "/Images/diagrams/fttp-diagram.png",
  fttc: "/Images/diagrams/fttc-diagram.png",
  business: "/Images/diagrams/business-diagram.png",
  landline: "/Images/diagrams/landline-diagram.png",
};

function RouterDiagramModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<ConnectionType>("fttp");
  const diagramRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    const content = diagramRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const img = content.querySelector("img");
    printWindow.document.write(`
      <html>
        <head>
          <title>Router Diagram - ${connectionTypes.find((t) => t.id === activeTab)?.label}</title>
          <style>
            body { display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; }
            img { max-width:100%; height:auto; }
          </style>
        </head>
        <body>
          <img src="${img?.src || diagramImages[activeTab]}" alt="Router Diagram" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }, [activeTab]);

  const handleDownloadSVG = useCallback(() => {
    // If you have actual SVG files, update these paths
    const svgPath = `/Images/diagrams/${activeTab}-diagram.svg`;
    const link = document.createElement("a");
    link.href = svgPath;
    link.download = `zoiko-router-diagram-${activeTab}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [activeTab]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="/ZBLogo.svg"
              alt="Zoiko Broadband"
              width={80}
              height={30}
              className="object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl leading-none p-1"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6">
          <h2 className="text-xl font-bold text-[#10446C] dark:text-[#63a7db]">
            Router Diagram
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose your connection type to see the right diagram
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 px-3 md:px-6 mt-3">
          {connectionTypes.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border transition-colors ${activeTab === tab.id
                  ? "bg-[#1f4f73] text-white border-[#1f4f73]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#1f4f73] hover:text-[#1f4f73] dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Diagram Area */}
        {/* <div ref={diagramRef} className="mx-1 mt-2 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-[250px] flex items-center justify-center">
          <Image
            src={diagramImages[activeTab]}
            alt={`${connectionTypes.find((t) => t.id === activeTab)?.label} diagram`}
            width={500}
            height={280}
            className="object-contain max-w-full h-auto md:h-full"
          />
        </div> */}

        <div ref={diagramRef} className="mx-2 rounded-lg bg-gray-50 dark:bg-gray-800 relative" style={{ aspectRatio: "16/9" }}>
          <Image
            src={diagramImages[activeTab]}
            alt={`${connectionTypes.find((t) => t.id === activeTab)?.label} diagram`}
            fill
            className="object-contain"
            sizes="(max-width: 672px) 100vw, 620px"
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 px-6 mt-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-yellow-400 inline-block rounded"></span>
            Cable / connection
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-gray-800 dark:bg-gray-300 inline-block rounded-sm"></span>
            Power
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-red-500 inline-block rounded"></span>
            Phone line
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 p-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print diagram
          </button>
          <button
            onClick={handleDownloadSVG}
            className="flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download this diagram (SVG)
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VisualSetupGuides() {
  const [showDiagram, setShowDiagram] = useState(false);

  const guides = [
    {
      id: 1,
      icon: "▶",
      title: "Video Tutorial",
      subtitle: "Full walkthrough with captions",
      content: (
        <div className="bg-gray-100 rounded-lg p-6 text-center text-sm text-gray-500 dark:bg-gray-950 dark:text-white">
          Setup Video Tutorial (2–3 minutes)
          <br />
          Click to play with subtitles
        </div>
      ),
      button: "Watch Video",
      buttonStyle: "bg-[#1f4f73] text-white",
      buttonLink: "https://youtu.be/D3Rw_ykAPJc?si=NzgINpyi76WtLxCw",
      onClick: undefined,
    },
    {
      id: 2,
      icon: "🛜",
      title: "Router Diagram",
      subtitle: "Visual guide with labels and descriptions",
      content: (
        <div className="border rounded-lg p-10 text-center text-sm text-gray-500 dark:bg-gray-950 dark:text-white">
          Router Connection Diagram
          <br />
          Power / Ethernet / Phone Line
        </div>
      ),
      button: "View Diagram",
      buttonLink: "#",
      buttonStyle: "bg-[#1f4f73] text-white",
      onClick: () => setShowDiagram(true),
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
      buttonLink: "../zoiko-setup-guide-standard.pdf",
      buttonStyle: "bg-yellow-400 text-black",
      onClick: undefined,
    },
  ];

  return (
    <>
      <section className="bg-gray-100 py-16 dark:bg-gray-950 dark:text-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold dark:text-[#3374a6] text-[#10446C]">
              Visual Setup Guides
            </h2>
            <p className="text-gray-500 mt-2 dark:bg-gray-950 dark:text-white">
              Watch, read, or download our comprehensive setup resources
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 flex flex-col items-center text-center dark:text-white"
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
                <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mb-6">
                  {guide.subtitle}
                </p>

                {/* Content */}
                <div className="w-full mb-6">{guide.content}</div>

                {/* Button */}
                {guide.onClick ? (
                  <button
                    onClick={guide.onClick}
                    className={`px-5 py-2 rounded-md text-sm font-medium ${guide.buttonStyle}`}
                  >
                    {guide.button}
                  </button>
                ) : (
                  <Link
                    href={guide.buttonLink || "#"}
                    className={`px-5 py-2 rounded-md text-sm font-medium ${guide.buttonStyle}`}
                  >
                    {guide.button}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Router Diagram Modal */}
      {showDiagram && (
        <RouterDiagramModal onClose={() => setShowDiagram(false)} />
      )}
    </>
  );
}