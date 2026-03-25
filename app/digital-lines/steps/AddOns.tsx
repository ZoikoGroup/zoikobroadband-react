import { Selections } from "../sections/Wizard";

interface Props {
  selections: Selections;
  update: (key: keyof Selections, value: string | string[] | null) => void;
}

const ADDONS = [
  {
    id: "international",
    name: "International Calling Packs",
    description: "Discounted rates to 50+ countries",
    price: "From £5/month",
    note: null,
    buttonLabel: "Learn More",
  },
  {
    id: "call-recording",
    name: "Call Recording",
    description: "Record calls with GDPR compliance",
    price: "£8/month",
    note: "*GDPR-compliant with automatic consent management",
    buttonLabel: "Add Service",
  },
  {
    id: "call-queues",
    name: "Call Queues & IVR",
    description: "Professional call handling system",
    price: "£12/month",
    note: null,
    buttonLabel: "Configure",
  },
  {
    id: "voicemail-email",
    name: "Voicemail-to-Email",
    description: "Receive voicemails in your inbox",
    price: "£3/month",
    note: null,
    buttonLabel: "Enable",
  },
  {
    id: "4g-backup",
    name: "4G Backup",
    description: "Power-cut backup for continuity",
    price: "£15/month",
    note: null,
    buttonLabel: "Add Backup",
  },
];

export default function AddOns({ selections, update }: Props) {
  const toggleAddon = (id: string) => {
    const current = selections.addons;
    const updated = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    update("addons", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Add-ons & Extras
      </h2>

      {/* ── First row: 3 cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {ADDONS.slice(0, 3).map((addon) => {
          const isAdded = selections.addons.includes(addon.id);
          return (
            <AddonCard
              key={addon.id}
              addon={addon}
              isAdded={isAdded}
              onToggle={() => toggleAddon(addon.id)}
            />
          );
        })}
      </div>

      {/* ── Second row: 2 cards centered ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mx-auto">
        {ADDONS.slice(3).map((addon) => {
          const isAdded = selections.addons.includes(addon.id);
          return (
            <AddonCard
              key={addon.id}
              addon={addon}
              isAdded={isAdded}
              onToggle={() => toggleAddon(addon.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Addon Card ────────────────────────────────────────────────────────────────
function AddonCard({
  addon,
  isAdded,
  onToggle,
}: {
  addon: (typeof ADDONS)[number];
  isAdded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border-2 rounded-xl p-5 flex flex-col transition ${
        isAdded ? "border-[#F6C140]" : "border-gray-200"
      }`}
    >
      {/* Name */}
      <h3 className="text-sm font-bold text-gray-800 mb-1">{addon.name}</h3>

      {/* Description */}
      <p className="text-xs text-gray-400 mb-3">{addon.description}</p>

      {/* Price */}
      <p className="text-[#F6C140] font-bold text-sm mb-1">{addon.price}</p>

      {/* Note */}
      {addon.note && (
        <p className="text-xs text-gray-400 mb-3">{addon.note}</p>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Button */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full mt-4 py-2 rounded-md text-sm font-semibold transition ${
          isAdded
            ? "bg-[#F6C140] text-white hover:bg-gray-700"
            : "bg-[#F6C140] text-white hover:bg-[#e0ad30]"
        }`}
      >
        {isAdded ? "Remove ✓" : addon.buttonLabel}
      </button>
    </div>
  );
}