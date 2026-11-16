import type {
  FormattedAddress,
  ZoikoPlan,
  ZoikoVariation,
} from "@/app/context/CartContext";

export const STEP_IDS = [
  "availability",
  "plans",
  "personalise",
  "switching",
  "details",
  "confirmation",
  "tracking",
  "connected",
  "myzoiko",
  "moving",
] as const;

export type StepId = (typeof STEP_IDS)[number];
export type ContractDuration = "12-months" | "18-months" | "24-months";
export type CustomerType = "home" | "business";
export type PaymentId = "direct-debit" | "card" | "apple-pay" | "google-pay";

export type JourneyPlan = {
  id: string;
  name: string;
  price: number;
  download: string;
  upload: string;
  contractMonths: number;
  btPlanId: string | null;
  available: boolean;
  technology: "FTTP" | "SoGEA";
  zoikoPlan: ZoikoPlan;
  variation: ZoikoVariation | null;
};

export type CustomerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketing: boolean;
};

export type JourneyState = {
  step: StepId;
  customerType: CustomerType;
  postcode: string;
  addresses: FormattedAddress[];
  address: FormattedAddress | null;
  contract: ContractDuration;
  plans: JourneyPlan[];
  plansLoading: boolean;
  plansError: string | null;
  plan: JourneyPlan | null;
  routerId: string;
  extraIds: string[];
  switching: "switch" | "new";
  keepNumber: boolean;
  install: "date" | "earliest";
  details: CustomerDetails;
  billingSame: boolean;
  payment: PaymentId;
  order: { ref: string; createdAt: string } | null;
};
