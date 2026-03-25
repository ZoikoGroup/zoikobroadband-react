import { Selections } from "../sections/Wizard";

interface Props {
  selections: Selections;
  update: (key: keyof Selections, value: string | string[] | null) => void;
}

const EQUIPMENT = [
  {
    id: "cisco-191",
    name: "Cisco 191 ATA",
    price: "£79.99",
    features: [
      "Single FXS port",
      "HD voice quality",
      "Easy setup",
      "Compact design",
    ],
  },
  {
    id: "cisco-192",
    name: "Cisco 192 ATA",
    price: "£89.99",
    features: [
      "Dual FXS ports",
      "HD voice quality",
      "Advanced features",
      "Business ready",
    ],
  },
  {
    id: "yealink-w73p",
    name: "Yealink W73P",
    price: "£89.99",
    features: [
      "DECT cordless",
      "Color display",
      "Long battery life",
      "Professional grade",
    ],
  },
];

export default function Equipment({ selections, update }: Props) {
  const toggleEquipment = (id: string) => {
    const current = selections.equipment;
    const updated = current.includes(id)
      ? current.filter((e) => e !== id)
      : [...current, id];
    update("equipment", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Equipment
      </h2>

      {/* ── Equipment Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EQUIPMENT.map((item) => {
          const isAdded = selections.equipment.includes(item.id);
          return (
            <div
              key={item.id}
              className={`border-2 rounded-xl p-6 flex flex-col transition ${
                isAdded ? "border-[#F6C140]" : "border-gray-200"
              }`}
            >
              {/* Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {item.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {item.price}
                </span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-[#F6C140] mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={() => toggleEquipment(item.id)}
                className={`w-full py-2 rounded-md text-sm font-semibold transition ${
                  isAdded
                    ? "bg-[#F6C140] text-[#10446C] hover:bg-gray-700"
                    : "bg-[#F6C140] text-white hover:bg-[#e0ad30]"
                }`}
              >
                {isAdded ? "Remove from Cart ✓" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}