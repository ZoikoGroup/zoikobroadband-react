"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  sort_order: number;
}

interface Variation {
  id: number;
  label: string;
  duration_value: number;
  duration_unit: string;
  duration_display: string;
  price: string;
  sale_price: string | null;
  bt_plan_id: string;
  effective_bt_plan_id: string;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
}

interface Plan {
  id: number;
  name: string;
  slug: string;
  category: Category;
  bt_plan_id: string;
  bt_plan_name: string;
  description: string;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  variations: Variation[];
}

interface PlansApiResponse {
  count: number;
  results: Plan[];
}

type TabKey = "all" | "fttp" | "sogea";

interface Tab {
  key: TabKey;
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// const API_URL =  "https://api.zoikobroadband.com";
const API_URL =  process.env.NEXT_PUBLIC_API_BASE_URL;


const TABS: Tab[] = [
  { key: "all",   label: "All Packages" },
  { key: "sogea", label: "SOGEA" },
  { key: "fttp",  label: "Full Fibre (FTTP)" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseSpeed(btPlanName: string): string {
  const match = btPlanName.match(/(\d+(?:\.\d+)?)_(\d+(?:\.\d+)?)M/);
  if (!match) return "N/A";
  return `${match[1]}/${match[2]} Mbps`;
}

function getFeatures(plan: Plan): string[] {
  const speed = parseFloat(plan.bt_plan_name.match(/(\d+)/)?.[1] ?? "0");
  if (speed >= 500) return ["Ultrafast gigabit speeds", "4K streaming on every device", "Low latency gaming", "Free router & installation"];
  if (speed >= 200) return ["Superfast fibre speeds", "Multiple 4K streams", "Low latency gaming", "Free router & installation"];
  if (speed >= 80)  return ["4K streaming", "Multiple device support", "Fast uploads", "Priority support"];
  if (speed >= 40)  return ["HD streaming for 2–3 users", "Online gaming", "Video calls", "Free router included"];
  return ["Perfect for basic browsing", "Email and social media", "No usage caps", "UK-based support"];
}

function getDefaultVariationId(plan: Plan): number | undefined {
  return [...plan.variations]
    .sort((a, b) => b.duration_value - a.duration_value)[0]?.id;
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mx-auto mb-3" />
      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto mb-4" />
      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto mb-2" />
      <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mx-auto mb-4" />
      {Array.from({ length: 4 }).map((_, j) => (
        <div key={j} className="h-3 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
      ))}
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

interface PlanCardProps {
  plan: Plan;
  selectedVariationId: number | undefined;
  onSelectVariation: (planId: number, variationId: number) => void;
}

function PlanCard({ plan, selectedVariationId, onSelectVariation }: PlanCardProps) {
  const sortedVariations = [...plan.variations].sort(
    (a, b) => a.duration_value - b.duration_value
  );

  const selectedVariation: Variation =
    plan.variations.find((v) => v.id === selectedVariationId) ?? plan.variations[0];

  const price = parseFloat(selectedVariation.price).toFixed(2);
  const speed = parseSpeed(plan.bt_plan_name);
  const features = getFeatures(plan);
  const {addToCart} = useCart();

  const handleCart = () => {
    // ensure the object passed to addToCart contains expected fields (e.g. price, speed)
    const cartItem = {
      id: `${plan.id}-${selectedVariation?.id}`,
      name: `${plan.name} - ${selectedVariation.duration_display}`,
      price: parseFloat(price) || 0,  
      speed: speed,
      variation: selectedVariation.duration_display,
    };
    addToCart(cartItem);
    alert(`Added to cart: ${cartItem.name} at £${cartItem.price}/month`);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-md transition">

      {/* Name */}
      <h3 className="text-lg font-semibold text-center text-[#10446C] dark:text-white">
        {plan.name}
      </h3>

      {/* Badge */}
      <p className="text-xs text-center mt-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
        {plan.category.name} + Free SIM Card
      </p>

      {/* Speed */}
      <p className="text-center text-[#F6C140] text-xl font-bold mt-4">{speed}</p>
      <p className="text-center text-xs text-gray-500">Down/Up Speed</p>

      {/* Contract duration selector */}
      <div className="flex justify-center gap-2 mt-3">
        {sortedVariations.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelectVariation(plan.id, v.id)}
            className={`text-xs px-3 py-1 rounded border transition ${
              selectedVariationId === v.id
                ? "bg-[#10446C] text-white border-[#10446C]"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300"
            }`}
          >
            {v.duration_value}mo
          </button>
        ))}
      </div>

      {/* Price */}
      <p className="text-center text-2xl font-bold mt-4 text-[#10446C] dark:text-white">
        £{price}
        <span className="text-sm text-gray-500 font-normal">/month</span>
      </p>

      {/* Features */}
      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-[#F6C140]">✔</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
       onClick={handleCart}
        className="mt-6 bg-[#F6C140] text-[#10446C] py-2 rounded-md font-semibold hover:bg-[#eab530] transition">
        Choose This Package
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AllPlans() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<Record<number, number>>({});

  useEffect(() => {
    async function fetchPlans(): Promise<void> {
      try {
        const res = await fetch(`${API_URL}/api/v1/plans/`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data: PlansApiResponse = await res.json();
        const results = data.results ?? [];

        setPlans(results);

        // Pre-select the longest (cheapest) contract for every plan
        const defaults: Record<number, number> = {};
        results.forEach((plan) => {
          const defaultId = getDefaultVariationId(plan);
          if (defaultId !== undefined) defaults[plan.id] = defaultId;
        });
        setSelectedVariations(defaults);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  function handleSelectVariation(planId: number, variationId: number): void {
    setSelectedVariations((prev) => ({ ...prev, [planId]: variationId }));
  }

  const filteredPlans: Plan[] =
    activeTab === "all"
      ? plans
      : plans.filter((p) => p.category.slug === activeTab);

  return (
    <section className="w-full bg-[#f3f5f7] dark:bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                activeTab === tab.key
                  ? "bg-[#10446C] text-white border-[#10446C]"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-center text-xl md:text-2xl font-semibold text-[#10446C] dark:text-white mb-6">
          Choose Your Perfect Package
        </h2>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 text-sm py-8">
            Failed to load plans: {error}
          </p>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectedVariationId={selectedVariations[plan.id]}
                onSelectVariation={handleSelectVariation}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}