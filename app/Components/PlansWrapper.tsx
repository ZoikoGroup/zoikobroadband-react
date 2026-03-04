"use client";

import dynamic from "next/dynamic";

const allPlans = [
    {
      title: "Zippy Essential",
      speed: "0.5 Mbps",
      downloadSpeed: "0.5",
      uploadSpeed: "0.5",
      price: 22.0,
      priceDisplay: "£22.00",
      desc: "Download Speed",
      features: [
        "Perfect for basic browsing",
        "Email & social media",
        "No usage caps",
        "UK-based support",
      ],
      popularity: 2,
      contractLength: 12,
      badge: null,
    },
    {
      title: "Blitz Core",
      speed: "40/10 Mbps",
      downloadSpeed: "40",
      uploadSpeed: "10",
      price: 35.0,
      priceDisplay: "£35.00",
      desc: "Download Speed",
      features: [
        "Consistent fibre speeds",
        "Low latency gaming",
        "Multiple HD streams",
        "Free router & installation",
      ],
      popularity: 3,
      contractLength: 18,
      badge: null,
    },
    {
      title: "Quantum Boost",
      speed: "115/20 Mbps",
      downloadSpeed: "115",
      uploadSpeed: "20",
      price: 42.99,
      priceDisplay: "£42.99",
      desc: "Download Speed",
      features: [
        "Ultra-low downloads",
        "Perfect for home offices",
        "Seamless video conferencing",
        "Advanced router included",
      ],
      popularity: 4,
      contractLength: 24,
      badge: "FULL FIBRE",
    },
    {
      title: "Supersonic Infinity",
      speed: "1000/115 Mbps",
      downloadSpeed: "1000",
      uploadSpeed: "115",
      price: 61.99,
      priceDisplay: "£61.99",
      desc: "Download Speed",
      features: [
        "Gigabit speeds",
        "Future-proof technology",
        "Unlimited potential",
        "White-glove service",
      ],
      popularity: 5,
      contractLength: 24,
      badge: "FULL FIBRE",
    },
  ];

const PlansTabs = dynamic(() => import("./PlansTabs"), {
  loading: () => (
    <div className="h-100 flex items-center justify-center">
      Loading plans...
    </div>
  ),
});

export default function PlansWrapper() {
  return <PlansTabs plans={allPlans} />;
}