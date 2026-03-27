import { Selections } from "../sections/Wizard";

interface Props {
  selections: Selections;
}

// ── Label maps so we can show readable names from IDs ─────────────────────────

const PLAN_LABELS: Record<string, { name: string; price: string }> = {
  essential:  { name: "Essential Line",       price: "£10.91/month" },
  unlimited:  { name: "Unlimited Talk Line",  price: "£18.95/month" },
  business:   { name: "Business Pro Line",    price: "£29.99/month" },
};

const NUMBER_OPTION_LABELS: Record<string, { name: string; price: string }> = {
  ported:      { name: "Ported Number",  price: "£5.00" },
  new:         { name: "New Number",     price: "£3.00" },
  "date-change": { name: "Date Change", price: "£10.00" },
};

const SUB_ALLOCATION_LABELS: Record<string, { name: string; price: string }> = {
  geographic:     { name: "Geographic",     price: "£2.50" },
  "non-geographic": { name: "Non-Geographic", price: "£5.00" },
};

const NUMBER_IMPORT_LABELS: Record<string, { name: string; price: string }> = {
  single:    { name: "Single Number",            price: "£40.00" },
  "multi-10":  { name: "Multi-Line DDI (10)",    price: "£70.00" },
  "multi-100": { name: "Multi-Line DDI (100)",   price: "£150.00" },
};

const EQUIPMENT_LABELS: Record<string, { name: string; price: string }> = {
  "cisco-191":    { name: "Cisco 191 ATA",  price: "£79.99" },
  "cisco-192":    { name: "Cisco 192 ATA",  price: "£89.99" },
  "yealink-w73p": { name: "Yealink W73P",   price: "£89.99" },
};

const ADDON_LABELS: Record<string, { name: string; price: string }> = {
  international:    { name: "International Calling Packs", price: "£5.00/month" },
  "call-recording": { name: "Call Recording",              price: "£8.00/month" },
  "call-queues":    { name: "Call Queues & IVR",           price: "£12.00/month" },
  "voicemail-email":{ name: "Voicemail-to-Email",          price: "£3.00/month" },
  "4g-backup":      { name: "4G Backup",                   price: "£15.00/month" },
};

const CHARGE_LABELS: Record<string, { name: string; price: string }> = {
  "single-non-geo":       { name: "Single Number, Non-Geo",              price: "£7.50" },
  "single-line-rejection":{ name: "Single Line Number Import Rejection",  price: "£5.00" },
  "multi-line-rejection": { name: "Multi-Line Number Import Rejection",   price: "£5.00" },
};

// ── Helper: one summary row ───────────────────────────────────────────────────
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600 dark:text-white">{label}</span>
      <span className="text-sm font-semibold text-gray-800 dark:text-white">{value}</span>
    </div>
  );
}

// ── Helper: section block ─────────────────────────────────────────────────────
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
      <h4 className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-white mb-2 pb-1 border-b-2 border-[#F6C140]">
        {title}
      </h4>
      {empty ? (
        <p className="text-sm text-gray-400 dark:text-white italic">None selected</p>
      ) : (
        children
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Checkout({ selections }: Props) {
  const plan = selections.plan ? PLAN_LABELS[selections.plan] : null;
  const numberOption = selections.numberOption ? NUMBER_OPTION_LABELS[selections.numberOption] : null;
  const subAllocation = selections.numberSubAllocation ? SUB_ALLOCATION_LABELS[selections.numberSubAllocation] : null;
  const numberImport = selections.numberImport ? NUMBER_IMPORT_LABELS[selections.numberImport] : null;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
        Checkout
      </h2>
      <p className="text-center text-sm text-gray-400 dark:text-white mb-8">
        Review your selections before confirming your order.
      </p>

      <div className="border border-gray-200 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm">

        {/* ── Plan ──────────────────────────────────────────────────── */}
        <SummarySection title="Plan" empty={!plan}>
          {plan && (
            <>
              <SummaryRow label={plan.name} value={plan.price} />
              <SummaryRow label="Contract Duration" value={selections.duration} />
            </>
          )}
        </SummarySection>

        {/* ── Numbers & Porting ─────────────────────────────────────── */}
        <SummarySection
          title="Numbers & Porting"
          empty={!numberOption && !subAllocation && !numberImport}
        >
          {numberOption && <SummaryRow label={numberOption.name} value={numberOption.price} />}
          {subAllocation && <SummaryRow label={subAllocation.name} value={subAllocation.price} />}
          {numberImport && <SummaryRow label={numberImport.name} value={numberImport.price} />}
        </SummarySection>

        {/* ── Equipment ─────────────────────────────────────────────── */}
        <SummarySection title="Equipment" empty={selections.equipment.length === 0}>
          {selections.equipment.map((id) => {
            const item = EQUIPMENT_LABELS[id];
            return item ? <SummaryRow key={id} label={item.name} value={item.price} /> : null;
          })}
        </SummarySection>

        {/* ── Add-ons ───────────────────────────────────────────────── */}
        <SummarySection title="Add-ons & Extras" empty={selections.addons.length === 0}>
          {selections.addons.map((id) => {
            const item = ADDON_LABELS[id];
            return item ? <SummaryRow key={id} label={item.name} value={item.price} /> : null;
          })}
        </SummarySection>

        {/* ── Charge Changes ────────────────────────────────────────── */}
        <SummarySection title="Charge Changes" empty={selections.chargeChanges.length === 0}>
          {selections.chargeChanges.map((id) => {
            const item = CHARGE_LABELS[id];
            return item ? <SummaryRow key={id} label={item.name} value={item.price} /> : null;
          })}
        </SummarySection>

      </div>

      {/* ── Confirm Button ────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => console.log("Order confirmed:", selections)}
        className="w-full mt-6 py-3 bg-[#F6C140] text-white font-bold rounded-md hover:bg-[#e0ad30] transition text-sm"
      >
        Confirm Order
      </button>
    </div>
  );
}