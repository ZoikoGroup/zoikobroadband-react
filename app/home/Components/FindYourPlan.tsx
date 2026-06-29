"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Plan {
  id: number;
  name: string;
  slug: string;
  bt_plan_name: string;
  is_active: boolean;

  category: {
    id: number;
    name: string;
    slug: string;
  };

  variations: {
    id: number;
    duration_value: number;
    price: string;
    is_active: boolean;
  }[];

  downloadSpeed?: number;
  uploadSpeed?: number;
}

interface PlansResponse {
  count: number;
  results: Plan[];
}

const HOUSEHOLD_OPTIONS = [
  {
    id: "1-2",
    label: "1–2 people (Couple/Single)",
  },
  {
    id: "3-4",
    label: "3–4 people (Small family)",
  },
  {
    id: "5+",
    label: "5+ people (Large family)",
  },
];
const ACTIVITY_OPTIONS = [
  {
    id: "basic",
    label: "Basic browsing & BBC iPlayer",
  },
  {
    id: "streaming",
    label: "Netflix, YouTube & social media",
  },
  {
    id: "gaming",
    label: "Gaming & large downloads",
  },
  {
    id: "work",
    label: "Working from home & video calls",
  },
];
function parsePlanSpeed(btPlanName: string) {
  const match = btPlanName.match(/(\d+(?:\.\d+)?)_(\d+(?:\.\d+)?)M/i);

  if (!match) {
    return {
      downloadSpeed: 0,
      uploadSpeed: 0,
    };
  }

  return {
    downloadSpeed: Number(match[1]),
    uploadSpeed: Number(match[2]),
  };
}

const HOUSEHOLD_SCORE = {
  "1-2": 1,
  "3-4": 2,
  "5+": 3,
};
const ACTIVITY_SCORE = {
  basic: 0,
  streaming: 1,
  gaming: 2,
  work: 1,
};
const SCORE_TO_SPEED = [
  { maxScore: 1, speed: 40 },
  { maxScore: 2, speed: 80 },
  { maxScore: 3, speed: 115 },
  { maxScore: 4, speed: 160 },
  { maxScore: 5, speed: 220 },
  { maxScore: 6, speed: 330 },
  { maxScore: Infinity, speed: 550 },
];

export default function FindYourPlan() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedHousehold, setSelectedHousehold] =
    useState<string | null>(null);

  const [selectedActivities, setSelectedActivities] =
    useState<string[]>([]);

  const [recommendedPlan, setRecommendedPlan] =
    useState<Plan | null>(null);

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/plans/`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }

      const data: PlansResponse = await response.json();
      const plans: Plan[] = data.results;
      // console.log(data);
      const enhancedPlans = plans
        .map((plan) => {
          const defaultVariation =
            plan.variations.find((v) => v.duration_value === 24) ??
            plan.variations[0];

          return {
            ...plan,
            ...parsePlanSpeed(plan.bt_plan_name),
            displayPrice: defaultVariation?.price ?? "0",
          };
        })
        .sort((a, b) => a.downloadSpeed! - b.downloadSpeed!);

      setPlans(enhancedPlans);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRequiredSpeed = () => {
    if (!selectedHousehold) return null;
    let score =
      HOUSEHOLD_SCORE[
      selectedHousehold as keyof typeof HOUSEHOLD_SCORE
      ];

    selectedActivities.forEach((activity) => {
      score +=
        ACTIVITY_SCORE[
        activity as keyof typeof ACTIVITY_SCORE
        ];
    });

    const recommendation = SCORE_TO_SPEED.find(
      (item) => score <= item.maxScore
    );
    return recommendation?.speed ?? 40;
  };

  const findRecommendedPlan = () => {
    const requiredSpeed = calculateRequiredSpeed();

    if (!requiredSpeed) {
      return null;
    }

    return (
      plans.find(
        (plan) =>
          plan.is_active &&
          (plan.downloadSpeed ?? 0) >= requiredSpeed
      ) ?? null
    );
  };
  // Get a description of the recommended plan based on user selections
  const getRecommendationDescription = () => {
    if (!recommendedPlan) {
      return "Choose your household size and online activities to receive your personalised broadband recommendation.";
    }

    const messages: string[] = [];

    if (selectedActivities.includes("basic")) {
      messages.push("everyday browsing");
    }

    if (selectedActivities.includes("streaming")) {
      messages.push("HD & 4K streaming");
    }

    if (selectedActivities.includes("gaming")) {
      messages.push("online gaming");
    }

    if (selectedActivities.includes("work")) {
      messages.push("working from home");
    }

    if (!messages.length) {
      return "Perfect for your selected household size.";
    }

    return `Ideal for ${messages.join(", ")}${messages.length > 1 ? " and multiple connected devices." : "."
      }`;
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (!plans.length) return;

    const plan = findRecommendedPlan();

    setRecommendedPlan(plan);
  }, [
    plans,
    selectedHousehold,
    selectedActivities,
  ]);

  useEffect(() => {
    // console.log("Recommended Plan:", recommendedPlan);
  }, [recommendedPlan]);

  return (
    <div>
      {/* Find your plan .. */}
      <section className="w-full bg-[#E5F0FF] dark:bg-gray-950   py-16 px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-950  dark:text-white
  border-t-4 border-[#10446C] rounded-3xl p-6 md:p-10">
          {/* Header */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#10446C] dark:text-white">
            Let's find your perfect plan
          </h2>
          <p className="text-center dark:bg-gray-950  dark:text-white
 text-gray-600 mt-2 max-w-2xl mx-auto">
            Answer a few quick questions to get a personalised recommendation
            tailored to your British lifestyle
          </p>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div
              className="group border-2 border-[#F5C241] rounded-3xl p-3 md:p-6 flex flex-col items-center
        min-h-105 hover:shadow-xl transition-all duration-300 dark:bg-gray-950  dark:text-white
"
            >
              <div
                className="w-14 h-14 rounded-full bg-[#F5C241] flex items-center justify-center
          font-bold text-lg mb-4"
              >
                1
              </div>

              <h3 className=" dark:bg-gray-950  dark:text-white
 text-[#10446C] font-semibold text-lg text-center mb-6">
                How many people in your household?
              </h3>

              <div className="w-full flex flex-col gap-4 dark:bg-gray-950  dark:text-white
">
                {HOUSEHOLD_OPTIONS.map((item) => {
                  const isSelected = selectedHousehold === item.id;
                  return (
                    <button
                      key={item.id}
                      className={`w-full py-3 px-1 rounded-xl border-2 transition-all text-sm
                    ${isSelected
                          ? "border-[#10446C] bg-[#10446C] text-white"
                          : "border-gray-200 bg-white dark:bg-gray-950 dark:text-white hover:border-[#10446C] hover:bg-[#F0F6FF] dark:hover:bg-teal-900"
                        }`}
                      onClick={() => setSelectedHousehold(item.id)}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 2 */}
            <div
              className="border-2 border-[#F5C241] rounded-3xl p-3 md:p-6 flex flex-col items-center
        min-h-105 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-full bg-[#F5C241] flex items-center justify-center
          font-bold text-lg mb-4"
              >
                2
              </div>

              <h3 className="text-[#10446C] font-semibold text-lg text-center mb-6  dark:text-white
">
                What do you do online?
              </h3>

              <div className="w-full flex flex-col gap-4">
                {ACTIVITY_OPTIONS.map((item) => {
                  const isSelected = selectedActivities.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleActivity(item.id)}
                      className={`w-full py-3 rounded-xl border-2 transition-all text-sm
                        ${isSelected
                          ? "border-[#10446C] bg-[#10446C] text-white"
                          : "border-gray-200 bg-white dark:bg-gray-950 dark:text-white hover:border-[#10446C] hover:bg-[#F0F6FF] dark:hover:bg-teal-900"
                        }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 3 – RECOMMENDED */}
            <div
              className="border-2 border-gray-200 rounded-3xl p-3 md:p-6 flex flex-col items-center
        min-h-105 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-full bg-[#F5C241] flex items-center justify-center
          font-bold text-lg mb-4"
              >
                3
              </div>

              <h3 className="text-[#10446C] font-semibold text-lg text-center mb-6  dark:text-white
">
                Your perfect match
              </h3>

              <div className="bg-[#0F3D5E] text-white rounded-2xl p-3 md:p-6 text-center flex flex-col gap-4 w-full flex-1 justify-between">
                <div>
                  <p className="text-[#F5C241] font-semibold">Recommended:</p>
                  <h4 className="text-xl font-bold mt-1">{recommendedPlan?.name ?? "Select your preferences"}</h4>
                  {/* download speed */}
                  {recommendedPlan && (
                    <p className="mt-2 text-[#F5C241] font-semibold">
                      {recommendedPlan.downloadSpeed} Mbps Download
                    </p>
                  )}
                  {/* upload speed */}
                  {recommendedPlan && (
                    <p className="text-sm text-gray-300">
                      {recommendedPlan.uploadSpeed} Mbps Upload
                    </p>
                  )}
                  <p className="text-sm text-gray-200 mt-3">
                    {getRecommendationDescription()}
                  </p>
                </div>

                <Link
                  href="#check-postcode"
                  // href="/fibre-packages"
                  className="bg-[#F5C241] text-sm md:text-base text-[#10446C] py-3 px-2 rounded-full font-semibold
            hover:scale-105 transition-transform"
                >
                  Check Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  )
}
