import { Selections } from "../sections/Wizard";

interface Props {
  selections: Selections;
  update: (key: keyof Selections, value: string | string[] | null) => void;
}

const CHARGES = [
  {
    id: "single-non-geo",
    name: "Single Number, Non-Geo",
    subtitle: "030x, 033x, 034x, 037x only",
    price: "£7.50",
    label: "Admin Charges",
    description: "Change charge applies in addition to initial request charge",
  },
  {
    id: "single-line-rejection",
    name: "Single Line Number Import Rejection",
    subtitle: null,
    price: "£5.00",
    label: "Admin Charges",
    description: "Cancellation charge applies in addition to initial request charge",
  },
  {
    id: "multi-line-rejection",
    name: "Multi-Line Number Import Rejection",
    subtitle: null,
    price: "£5.00",
    label: "Admin Charges",
    description: "Cancellation charge applies in addition to initial request charge",
  },
];

export default function ChargeChanges({ selections, update }: Props) {
  const toggleCharge = (id: string) => {
    const current = selections.chargeChanges;
    const updated = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    update("chargeChanges", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Charge Changes
      </h2>

      {/* ── Charge Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHARGES.map((charge) => {
          const isAdded = selections.chargeChanges.includes(charge.id);
          return (
            <div
              key={charge.id}
              className={`border-2 rounded-xl p-6 flex flex-col transition ${
                isAdded ? "border-[#F6C140]" : "border-gray-200"
              }`}
            >
              {/* Name */}
              <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-1">
                {charge.name}
              </h3>

              {/* Subtitle */}
              {charge.subtitle && (
                <p className="text-xs text-gray-400 dark:text-white mb-3">{charge.subtitle}</p>
              )}

              {/* Price */}
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {charge.price}
              </p>

              {/* Admin Charges label */}
              <p className="text-xs font-semibold text-gray-500 dark:text-white mb-3">
                {charge.label}
              </p>

              {/* Description */}
              <p className="text-xs text-gray-400 dark:text-white flex-1 mb-6">
                {charge.description}
              </p>

              {/* Button */}
              <button
                type="button"
                onClick={() => toggleCharge(charge.id)}
                className={`w-full py-2 rounded-md text-sm font-semibold transition ${
                  isAdded
                    ? "bg-[#F6C140] text-white hover:bg-gray-700"
                    : "bg-[#F6C140] text-white hover:bg-[#e0ad30]"
                }`}
              >
                {isAdded ? "Remove ✓" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}