import { Selections } from "../sections/Wizard";

interface Props {
  selections: Selections;
  update: (key: keyof Selections, value: string | string[] | null) => void;
}

const DURATIONS = ["60 Months", "24 Months", "36 Months", "12 Months"];

const PLANS = [
  {
    id: "essential",
    name: "Essential Line",
    price: "£10.91",
    popular: false,
    features: [
      "Unlimited UK landline calls",
      "Voicemail",
      "Caller ID",
      "Call waiting",
      "Call forwarding",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited Talk Line",
    price: "£18.95",
    popular: true,
    features: [
      "Unlimited landline + mobile calls",
      "Voicemail-to-email",
      "Caller ID & call waiting",
      "Call forwarding & blocking",
      "Three-way calling",
    ],
  },
  {
    id: "business",
    name: "Business Pro Line",
    price: "£29.99",
    popular: false,
    features: [
      "Multi-line capable",
      "Call recording",
      "Call queues & IVR",
      "UK 24/7 support",
      "Advanced analytics",
    ],
  },
];

export default function ChoosePlan({ selections, update }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Choose Your Plan
      </h2>

      {/* ── Duration Tabs ──────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {DURATIONS.map((d) => (
          <button
            key={d}
            onClick={() => update("duration", d)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selections.duration === d
                ? "bg-[#F6C140] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* ── Plan Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative dark:bg-gray-800 border-2 rounded-xl px-6 py-8 flex flex-col transition ${
              selections.plan === plan.id
                ? "border-green-500 shadow-lg"
                : plan.popular
                ? "border-[#F6C140]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Most Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-5 left-3/5 -translate-x-1/2">
                <span className="bg-[#F6C140] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Name */}
            <h3 className="text-lg md:text-2xl font-bold text-[#10446C] dark:text-white mb-1">{plan.name}</h3>

            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
              <span className="text-sm text-gray-400 dark:text-white ml-1">/month</span>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2 mb-6 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm md:text-base text-gray-600 dark:text-white">
                  <svg
                    className="w-4 h-4 text-[#F6C140] mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Select Button */}
            <button
              onClick={() => update("plan", plan.id)}
              className="w-full py-2 rounded-md text-sm font-semibold bg-[#F6C140] text-white hover:bg-[#e0ad30] transition"
            >
              {selections.plan === plan.id ? "Selected ✓" : "Select Plan"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}