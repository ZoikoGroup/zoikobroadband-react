import type {
  BTProductOfferingQualificationItem,
  ProductCharacteristic,
  ZoikoPlan,
  ZoikoVariation,
} from "@/app/context/CartContext";

// Define a local interface matching FormattedAddress if your CartContext export path differs
export interface FormattedAddress {
  id?: string;
  uprn?: string;
  display?: string;
  city?: string;
  postcode?: string;
  streetNr?: string;
  streetName?: string;
  districtCode?: string;
  exchangeGroupCode?: string;
  qualifier?: string;
}

import type { ContractDuration, JourneyPlan } from "../types";

type ApiRow = BTProductOfferingQualificationItem & {
  zoikoPlan?: ZoikoPlan | null;
};

const getChar = (chars: ProductCharacteristic[] | undefined, name: string) =>
  chars?.find((c) => c.name === name)?.value ?? "";

const pickVariation = (
  plan: ZoikoPlan,
  contract: ContractDuration,
): ZoikoVariation | null => {
  const months = parseInt(contract);
  return (
    plan.variations.find((v) => v.is_active && v.duration_value === months) ??
    plan.variations.find((v) => v.is_active) ??
    null
  );
};

export async function searchAddresses(
  postcode: string,
): Promise<FormattedAddress[]> {
  /* --- API CALL COMMENTED OUT FOR TESTING ---
  const res = await fetch("/api/BritishTelecom/search-address", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postcode: postcode.trim() }),
  });
  const data = await res.json();
  if (!data.success)
    throw new Error(data.message ?? "Failed to find addresses.");
  return data.addresses ?? [];
  ----------------------------------------- */

  // Mock addresses fallback
  return [
    {
      id: "addr-1",
      uprn: "100012345678",
      display: "Flat 1, Test Building, 123 Test Street",
      city: "London",
      postcode: postcode.trim().toUpperCase() || "SW1A 1AA",
    },
  ] as any[];
}

export async function fetchPlans(
  address: FormattedAddress,
  contract: ContractDuration,
): Promise<JourneyPlan[]> {
  /* --- API CALL COMMENTED OUT FOR BACKEND UPDATE ---
  const res = await fetch("/api/BritishTelecom/get-products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address_id: address.id,
      district_code: address.districtCode || "NS",
      contract_type: contract,
    }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message ?? "Could not load plans.");

  const rows = (data.productOfferingQualificationItem ?? []) as ApiRow[];
  return rows
    .filter((row) => row.zoikoPlan)
    .map((row) => {
      ...
    });
  -------------------------------------------------- */

  // Manual fallback plans matching your UI screenshot precisely
  const contractMonths = parseInt(contract) || 18;

  return [
    {
      id: "zoiko-essential",
      name: "Zoiko Essential",
      price: 24.99,
      download: "67 Mbps",
      upload: "18 Mbps",
      contractMonths,
      btPlanId: "BT-ESSENTIAL-67",
      available: true,
      technology: "SoGEA",
      zoikoPlan: {} as ZoikoPlan,
      variation: null,
    },
    {
      id: "zoiko-superfast",
      name: "Zoiko Superfast",
      price: 29.99,
      download: "150 Mbps",
      upload: "30 Mbps",
      contractMonths,
      btPlanId: "BT-SUPERFAST-150",
      available: true,
      technology: "FTTP",
      zoikoPlan: {} as ZoikoPlan,
      variation: null,
    },
    {
      id: "zoiko-full-fibre",
      name: "Zoiko Full Fibre",
      price: 39.99,
      download: "900 Mbps",
      upload: "110 Mbps",
      contractMonths,
      btPlanId: "BT-FULLFIBRE-900",
      available: true,
      technology: "FTTP",
      zoikoPlan: {} as ZoikoPlan,
      variation: null,
    },
  ];
}