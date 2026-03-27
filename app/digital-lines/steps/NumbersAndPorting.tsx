import { Selections } from "../sections/Wizard";

interface Props {
  selections: Selections;
  update: (key: keyof Selections, value: string | string[] | null) => void;
}

const NUMBER_OPTIONS = [
  {
    id: "ported",
    price: "£5",
    name: "Ported Number",
    description: "Keep existing style, like geographic",
  },
  {
    id: "new",
    price: "£3",
    name: "New Number",
    description: "Provision from Zorro pool",
  },
  {
    id: "date-change",
    price: "£10",
    name: "Date Change",
    description: "Change existing number date",
  },
];

const SUB_ALLOCATION = [
  {
    id: "geographic",
    price: "£2.50",
    name: "Geographic",
    description: "",
  },
  {
    id: "non-geographic",
    price: "£5",
    name: "Non-Geographic",
    description: "123s only",
  },
];

const NUMBER_IMPORT = [
  {
    id: "single",
    price: "£40",
    name: "Single Number",
    description: "01x, 033x, 034x, 037x",
  },
  {
    id: "multi-10",
    price: "£70",
    name: "Multi-Line DDI",
    description: "up to 10 numbers",
  },
  {
    id: "multi-100",
    price: "£150",
    name: "Multi-Line DDI",
    description: "up to 100 numbers",
  },
];

// ── Reusable radio option card ────────────────────────────────────────────────
function OptionCard({
  id,
  price,
  name,
  description,
  selected,
  onSelect,
}: {
  id: string;
  price: string;
  name: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left flex items-start gap-5 px-5 md:px-6 py-3 rounded-lg border-2 transition ${
        selected
          ? "border-[#F6C140] bg-[#F6C140]/5"
          : "border-transparent "
      }`}
    >
      {/* Radio circle */}
      <div className={`mt-1 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition ${
        selected ? " border-[#F6C140]" : "border-gray-300"
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-[#F6C140]" />}
      </div>

      {/* Content */}
      <div>
        <span className="text-green-500 font-bold text-base md:text-xl">{price}</span>
        <p className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">{name}</p>
        {description && <p className="text-sm text-gray-500 dark:text-white">{description}</p>}
      </div>
    </button>
  );
}

// ── Column wrapper ────────────────────────────────────────────────────────────
function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-1">
      <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2 pb-2 border-b-2 border-[#F6C140]">
        {title}
      </h4>
      {children}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function NumbersAndPorting({ selections, update }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Numbers & Porting
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Number Options */}
        <Column title="Number Options">
          {NUMBER_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              {...opt}
              selected={selections.numberOption === opt.id}
              onSelect={() => update("numberOption", opt.id)}
            />
          ))}
        </Column>

        {/* Number Sub-Allocation */}
        <Column title="Number Sub-Allocation">
          {SUB_ALLOCATION.map((opt) => (
            <OptionCard
              key={opt.id}
              {...opt}
              selected={selections.numberSubAllocation === opt.id}
              onSelect={() => update("numberSubAllocation", opt.id)}
            />
          ))}
        </Column>

        {/* Number Import */}
        <Column title="Number Import">
          {NUMBER_IMPORT.map((opt) => (
            <OptionCard
              key={opt.id}
              {...opt}
              selected={selections.numberImport === opt.id}
              onSelect={() => update("numberImport", opt.id)}
            />
          ))}
        </Column>

      </div>
    </div>
  );
}