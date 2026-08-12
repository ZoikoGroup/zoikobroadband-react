// Single source of truth for Digital Lines pricing, the combined order payload,
// and the localStorage transport between the wizard and the checkout page.

// ── Shared Selections Type (moved here; re-exported from Wizard for the steps) ─
export interface Selections {
  plan: string | null;
  duration: string;
  numberOption: string | null;
  numberSubAllocation: string | null;
  numberImport: string | null;
  equipment: string[];
  addons: string[];
  chargeChanges: string[];
  plan_summary?: object;
  equipment_summary?: object[];
  addons_summary?: object[];
  charge_changes_summary?: object[];
  monthly_total?: number;
  one_off_total?: number;
  total_due_today?: number;
}

// ── Transport / routing constants (change here if the route ever moves) ───────
export const CHECKOUT_STORAGE_KEY = "dl_checkout_order";
export const CHECKOUT_ROUTE = "/checkout";
export const WIZARD_ROUTE = "/digital-lines";

// ── Duration map ──────────────────────────────────────────────────────────────
type DurationMonths = 60 | 36 | 24 | 12;

const durationMap: Record<string, DurationMonths> = {
  "60 Months": 60,
  "36 Months": 36,
  "24 Months": 24,
  "12 Months": 12,
};

// ── Product data (mirrors the step components exactly) ────────────────────────
interface PricedItem {
  name: string;
  price: number;
  monthly: boolean;
}

const PLAN_DATA: Record<string, { name: string; prices: Record<DurationMonths, number> }> = {
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

const NUMBER_OPTION_DATA: Record<string, PricedItem> = {
  ported: { name: "Ported Number", price: 5.0, monthly: false },
  new: { name: "New Number", price: 3.0, monthly: false },
  "date-change": { name: "Date Change", price: 10.0, monthly: false },
};

const SUB_ALLOCATION_DATA: Record<string, PricedItem> = {
  geographic: { name: "Geographic", price: 2.5, monthly: false },
  "non-geographic": { name: "Non-Geographic", price: 5.0, monthly: false },
};

const NUMBER_IMPORT_DATA: Record<string, PricedItem> = {
  single: { name: "Single Number", price: 40.0, monthly: false },
  "multi-10": { name: "Multi-Line DDI (10)", price: 70.0, monthly: false },
  "multi-100": { name: "Multi-Line DDI (100)", price: 150.0, monthly: false },
};

const EQUIPMENT_DATA: Record<string, PricedItem> = {
  "cisco-191": { name: "Cisco 191 ATA", price: 79.99, monthly: false },
  "cisco-192": { name: "Cisco 192 ATA", price: 89.99, monthly: false },
  "yealink-w73p": { name: "Yealink W73P", price: 89.99, monthly: false },
};

const ADDON_DATA: Record<string, PricedItem> = {
  international: { name: "International Calling Packs", price: 5.0, monthly: true },
  "call-recording": { name: "Call Recording", price: 8.0, monthly: true },
  "call-queues": { name: "Call Queues & IVR", price: 12.0, monthly: true },
  "voicemail-email": { name: "Voicemail-to-Email", price: 3.0, monthly: true },
  "4g-backup": { name: "4G Backup", price: 15.0, monthly: true },
};

const CHARGE_DATA: Record<string, PricedItem> = {
  "single-non-geo": { name: "Single Number, Non-Geo", price: 7.5, monthly: false },
  "single-line-rejection": { name: "Single Line Number Import Rejection", price: 5.0, monthly: false },
  "multi-line-rejection": { name: "Multi-Line Number Import Rejection", price: 5.0, monthly: false },
};

// ── Combined order payload (exact backend contract) ───────────────────────────
export interface PlanSummary {
  plan: string;
  duration: string;
  price: number;
}

export interface LineSummary {
  name: string;
  price: number;
  monthly?: boolean;
}

export interface OrderPayload {
  plan: string | null;
  duration: string;
  number_option: string | null;
  number_sub_allocation: string | null;
  number_import: string | null;
  equipment: string[];
  addons: string[];
  charge_changes: string[];
  plan_summary: PlanSummary | null;
  equipment_summary: LineSummary[];
  addons_summary: LineSummary[];
  charge_changes_summary: LineSummary[];
  monthly_total: number;
  one_off_total: number;
  total_due_today: number;
}

const round2 = (n: number) => Number(n.toFixed(2));
const resolve = (map: Record<string, PricedItem>, ids: string[]): PricedItem[] =>
  ids.map((id) => map[id]).filter((x): x is PricedItem => Boolean(x));

// Combine every selected product across all wizard steps into one payload.
export function buildOrderPayload(selections: Selections): OrderPayload {
  const durationMonths = durationMap[selections.duration ?? "60 Months"] ?? 60;

  const planData = selections.plan ? PLAN_DATA[selections.plan] : null;
  const planPrice = planData ? planData.prices[durationMonths] : 0;
  const planSummary: PlanSummary | null = planData
    ? { plan: planData.name, duration: selections.duration, price: planPrice }
    : null;

  const equipmentItems = resolve(EQUIPMENT_DATA, selections.equipment);
  const addonItems = resolve(ADDON_DATA, selections.addons);
  const chargeItems = resolve(CHARGE_DATA, selections.chargeChanges);

  const numberOption = selections.numberOption ? NUMBER_OPTION_DATA[selections.numberOption] : null;
  const subAllocation = selections.numberSubAllocation ? SUB_ALLOCATION_DATA[selections.numberSubAllocation] : null;
  const numberImport = selections.numberImport ? NUMBER_IMPORT_DATA[selections.numberImport] : null;

  const monthlyTotal =
    planPrice + addonItems.filter((i) => i.monthly).reduce((s, i) => s + i.price, 0);

  const oneOffTotal =
    (numberOption?.price ?? 0) +
    (subAllocation?.price ?? 0) +
    (numberImport?.price ?? 0) +
    equipmentItems.filter((i) => !i.monthly).reduce((s, i) => s + i.price, 0) +
    chargeItems.filter((i) => !i.monthly).reduce((s, i) => s + i.price, 0);

  return {
    plan: selections.plan,
    duration: selections.duration,
    number_option: selections.numberOption,
    number_sub_allocation: selections.numberSubAllocation,
    number_import: selections.numberImport,
    equipment: selections.equipment,
    addons: selections.addons,
    charge_changes: selections.chargeChanges,
    plan_summary: planSummary,
    equipment_summary: equipmentItems.map((i) => ({ name: i.name, price: i.price })),
    addons_summary: addonItems.map((i) => ({ name: i.name, price: i.price, monthly: i.monthly })),
    charge_changes_summary: chargeItems.map((i) => ({ name: i.name, price: i.price })),
    monthly_total: round2(monthlyTotal),
    one_off_total: round2(oneOffTotal),
    total_due_today: round2(oneOffTotal),
  };
}

// ── Render helper for the checkout page ───────────────────────────────────────
export interface OrderLine {
  label: string;
  value: string;
  tag?: string;
}

export interface OrderGroup {
  title: string;
  lines: OrderLine[];
}

export interface DescribedOrder {
  groups: OrderGroup[];
  monthlyTotal: number;
  oneOffTotal: number;
  totalDueToday: number;
  duration: string;
  isEmpty: boolean;
}

export const fmt = (n: number) => `\u00A3${n.toFixed(2)}`;

// Turn a stored payload into render-ready groups. Number/porting rows are
// resolved from their ids (the backend contract keeps those as ids only).
export function describeOrder(p: OrderPayload): DescribedOrder {
  const groups: OrderGroup[] = [];

  const planLines: OrderLine[] = p.plan_summary
    ? [{ label: p.plan_summary.plan, value: `${fmt(p.plan_summary.price)}/month`, tag: p.plan_summary.duration }]
    : [];
  groups.push({ title: "Plan", lines: planLines });

  const numberLines: OrderLine[] = [];
  const opt = p.number_option ? NUMBER_OPTION_DATA[p.number_option] : null;
  const sub = p.number_sub_allocation ? SUB_ALLOCATION_DATA[p.number_sub_allocation] : null;
  const imp = p.number_import ? NUMBER_IMPORT_DATA[p.number_import] : null;
  if (opt) numberLines.push({ label: opt.name, value: fmt(opt.price), tag: "one-off" });
  if (sub) numberLines.push({ label: sub.name, value: fmt(sub.price), tag: "one-off" });
  if (imp) numberLines.push({ label: imp.name, value: fmt(imp.price), tag: "one-off" });
  groups.push({ title: "Numbers & Porting", lines: numberLines });

  groups.push({
    title: "Equipment",
    lines: p.equipment_summary.map((i) => ({ label: i.name, value: fmt(i.price), tag: "one-off" })),
  });

  groups.push({
    title: "Add-ons & Extras",
    lines: p.addons_summary.map((i) => ({ label: i.name, value: `${fmt(i.price)}/month`, tag: "monthly" })),
  });

  groups.push({
    title: "Charge Changes",
    lines: p.charge_changes_summary.map((i) => ({ label: i.name, value: fmt(i.price), tag: "one-off" })),
  });

  const isEmpty = groups.every((g) => g.lines.length === 0);

  return {
    groups,
    monthlyTotal: p.monthly_total,
    oneOffTotal: p.one_off_total,
    totalDueToday: p.total_due_today,
    duration: p.duration,
    isEmpty,
  };
}