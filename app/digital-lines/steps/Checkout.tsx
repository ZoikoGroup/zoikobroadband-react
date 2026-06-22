import { Selections } from "../sections/Wizard";
import { useEffect } from "react";

interface Props {
  selections: Selections;

  update: (
    key: keyof Selections,
    value: string | string[] | number | object | object[] | null
  ) => void;
}

// ── Duration map ──────────────────────────────────────────────────────────────
const durationMap: Record<string, 60 | 36 | 24 | 12> = {
  "60 Months": 60,
  "36 Months": 36,
  "24 Months": 24,
  "12 Months": 12,
};

// ── Plan prices (mirrors ChoosePlan.tsx exactly) ──────────────────────────────
const PLAN_DATA: Record<string, { name: string; prices: Record<60 | 36 | 24 | 12, number> }> = {
  essential: {
    name: "Essential Line",
    prices: { 60: 10.91, 36: 12.0, 24: 13.09, 12: 14.18 },
  },
  unlimited: {
    name: "Unlimited Talk Line",
    prices: { 60: 18.95, 36: 20.85, 24: 22.74, 12: 24.64 },
  },
  business: {
    name: "Business Pro Line",
    prices: { 60: 29.99, 36: 32.99, 24: 35.99, 12: 38.99 },
  },
};

// ── One-off / monthly add-on data ─────────────────────────────────────────────
const NUMBER_OPTION_DATA: Record<string, { name: string; price: number; monthly: boolean }> = {
  ported: { name: "Ported Number", price: 5.0, monthly: false },
  new: { name: "New Number", price: 3.0, monthly: false },
  "date-change": { name: "Date Change", price: 10.0, monthly: false },
};

const SUB_ALLOCATION_DATA: Record<string, { name: string; price: number; monthly: boolean }> = {
  geographic: { name: "Geographic", price: 2.5, monthly: false },
  "non-geographic": { name: "Non-Geographic", price: 5.0, monthly: false },
};

const NUMBER_IMPORT_DATA: Record<string, { name: string; price: number; monthly: boolean }> = {
  single: { name: "Single Number", price: 40.0, monthly: false },
  "multi-10": { name: "Multi-Line DDI (10)", price: 70.0, monthly: false },
  "multi-100": { name: "Multi-Line DDI (100)", price: 150.0, monthly: false },
};

const EQUIPMENT_DATA: Record<string, { name: string; price: number; monthly: boolean }> = {
  "cisco-191": { name: "Cisco 191 ATA", price: 79.99, monthly: false },
  "cisco-192": { name: "Cisco 192 ATA", price: 89.99, monthly: false },
  "yealink-w73p": { name: "Yealink W73P", price: 89.99, monthly: false },
};

const ADDON_DATA: Record<string, { name: string; price: number; monthly: boolean }> = {
  international: { name: "International Calling Packs", price: 5.0, monthly: true },
  "call-recording": { name: "Call Recording", price: 8.0, monthly: true },
  "call-queues": { name: "Call Queues & IVR", price: 12.0, monthly: true },
  "voicemail-email": { name: "Voicemail-to-Email", price: 3.0, monthly: true },
  "4g-backup": { name: "4G Backup", price: 15.0, monthly: true },
};

const CHARGE_DATA: Record<string, { name: string; price: number; monthly: boolean }> = {
  "single-non-geo": { name: "Single Number, Non-Geo", price: 7.5, monthly: false },
  "single-line-rejection": { name: "Single Line Number Import Rejection", price: 5.0, monthly: false },
  "multi-line-rejection": { name: "Multi-Line Number Import Rejection", price: 5.0, monthly: false },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return `£${n.toFixed(2)}`;
}

function SummaryRow({
  label,
  value,
  tag,
}: {
  label: string;
  value: string;
  tag?: string;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
        {tag && (
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
            {tag}
          </span>
        )}
      </div>
      <span className="text-sm font-semibold text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}

function SummarySection({
  title,
  children,
  empty,
}: {
  title: string;
  children?: React.ReactNode;
  empty?: boolean;
}) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2 pb-1 border-b-2 border-[#F6C140]">
        {title}
      </h4>
      {empty ? (
        <p className="text-sm text-gray-400 italic">None selected</p>
      ) : (
        children
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Checkout({ selections, update }: Props) {
  const durationMonths = durationMap[selections.duration ?? "60 Months"] ?? 60;

  // ── Resolve plan ────────────────────────────────────────────────────────────
  const planData = selections.plan ? PLAN_DATA[selections.plan] : null;
  const planPrice = planData ? planData.prices[durationMonths] : 0;

  const planSummary = planData
    ? {
      plan: planData.name,
      duration: selections.duration,
      price: planPrice,
    }
    : null;
  const equipmentItems = selections.equipment.map((id) => EQUIPMENT_DATA[id]).filter(Boolean);
  const addonItems = selections.addons.map((id) => ADDON_DATA[id]).filter(Boolean);
  const chargeItems = selections.chargeChanges.map((id) => CHARGE_DATA[id]).filter(Boolean);

  const equipmentSummary = equipmentItems.map(item => ({
    name: item.name,
    price: item.price,
  }));
  const addonsSummary = addonItems.map(item => ({
    name: item.name,
    price: item.price,
    monthly: item.monthly,
  }));
  const chargeSummary = chargeItems.map(item => ({
    name: item.name,
    price: item.price,
  }));

  // ── Resolve one-off items ────────────────────────────────────────────────────
  const numberOption = selections.numberOption ? NUMBER_OPTION_DATA[selections.numberOption] : null;
  const subAllocation = selections.numberSubAllocation ? SUB_ALLOCATION_DATA[selections.numberSubAllocation] : null;
  const numberImport = selections.numberImport ? NUMBER_IMPORT_DATA[selections.numberImport] : null;

  // const equipmentItems = selections.equipment.map((id) => EQUIPMENT_DATA[id]).filter(Boolean);
  // const addonItems = selections.addons.map((id) => ADDON_DATA[id]).filter(Boolean);
  // const chargeItems = selections.chargeChanges.map((id) => CHARGE_DATA[id]).filter(Boolean);

  // ── Totals ───────────────────────────────────────────────────────────────────
  const monthlyTotal =
    planPrice +
    addonItems.filter((i) => i.monthly).reduce((s, i) => s + i.price, 0);

  const oneOffTotal =
    (numberOption?.price ?? 0) +
    (subAllocation?.price ?? 0) +
    (numberImport?.price ?? 0) +
    equipmentItems.filter((i) => !i.monthly).reduce((s, i) => s + i.price, 0) +
    chargeItems.filter((i) => !i.monthly).reduce((s, i) => s + i.price, 0);

  useEffect(() => {

    update("monthly_total", monthlyTotal);

    update("one_off_total", oneOffTotal);

    update("total_due_today", oneOffTotal);

  }, [monthlyTotal, oneOffTotal]);
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
        Checkout
      </h2>
      <p className="text-center text-sm text-gray-400 dark:text-gray-400 mb-8">
        Review your selections before confirming your order.
      </p>

      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm">

        {/* ── Plan ─────────────────────────────────────────────────────── */}
        <SummarySection title="Plan" empty={!planData}>
          {planData && (
            <>
              <SummaryRow
                label={planData.name}
                value={`${fmt(planPrice)}/month`}
                tag={selections.duration}
              />
            </>
          )}
        </SummarySection>

        {/* ── Numbers & Porting ─────────────────────────────────────────── */}
        <SummarySection
          title="Numbers & Porting"
          empty={!numberOption && !subAllocation && !numberImport}
        >
          {numberOption && <SummaryRow label={numberOption.name} value={fmt(numberOption.price)} tag="one-off" />}
          {subAllocation && <SummaryRow label={subAllocation.name} value={fmt(subAllocation.price)} tag="one-off" />}
          {numberImport && <SummaryRow label={numberImport.name} value={fmt(numberImport.price)} tag="one-off" />}
        </SummarySection>

        {/* ── Equipment ─────────────────────────────────────────────────── */}
        <SummarySection title="Equipment" empty={equipmentItems.length === 0}>
          {equipmentItems.map((item, i) => (
            <SummaryRow key={i} label={item.name} value={fmt(item.price)} tag="one-off" />
          ))}
        </SummarySection>

        {/* ── Add-ons ───────────────────────────────────────────────────── */}
        <SummarySection title="Add-ons & Extras" empty={addonItems.length === 0}>
          {addonItems.map((item, i) => (
            <SummaryRow key={i} label={item.name} value={`${fmt(item.price)}/month`} tag="monthly" />
          ))}
        </SummarySection>

        {/* ── Charge Changes ────────────────────────────────────────────── */}
        <SummarySection title="Charge Changes" empty={chargeItems.length === 0}>
          {chargeItems.map((item, i) => (
            <SummaryRow key={i} label={item.name} value={fmt(item.price)} tag="one-off" />
          ))}
        </SummarySection>

        {/* ── Totals ────────────────────────────────────────────────────── */}
        <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-600 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Monthly total</span>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              {fmt(monthlyTotal)}<span className="text-sm font-normal text-gray-400">/month</span>
            </span>
          </div>
          {oneOffTotal > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">One-off charges</span>
              <span className="text-base font-bold text-gray-900 dark:text-white">{fmt(oneOffTotal)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-600">
            <span className="text-base font-bold text-gray-800 dark:text-white">Total due today</span>
            <span className="text-xl font-extrabold text-[#F6C140]">{fmt(oneOffTotal)}</span>
          </div>
          <p className="text-xs text-gray-400 text-right">
            Then {fmt(monthlyTotal)}/month for {selections.duration}
          </p>
        </div>

      </div>
    </div>
  );
}