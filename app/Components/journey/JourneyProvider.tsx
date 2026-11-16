"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { FormattedAddress } from "@/app/context/CartContext";
import { EXTRAS, ROUTERS } from "./data/content";
import { fetchPlans } from "./lib/api";
import type { ContractDuration, JourneyState, StepId } from "./types";

const initialState: JourneyState = {
  step: "availability",
  customerType: "home",
  postcode: "",
  addresses: [],
  address: null,
  contract: "24-months",
  plans: [],
  plansLoading: false,
  plansError: null,
  plan: null,
  routerId: "wifi6",
  extraIds: [],
  switching: "switch",
  keepNumber: true,
  install: "date",
  details: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    marketing: false,
  },
  billingSame: true,
  payment: "direct-debit",
  order: null,
};

type Ctx = {
  state: JourneyState;
  patch: (partial: Partial<JourneyState>) => void;
  go: (step: StepId) => void;
  loadPlans: (
    address: FormattedAddress,
    contract: ContractDuration,
  ) => Promise<void>;
};

const JourneyContext = createContext<Ctx | null>(null);

export default function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, patch] = useReducer(
    (s: JourneyState, p: Partial<JourneyState>) => ({ ...s, ...p }),
    initialState,
  );

  const go = useCallback((step: StepId) => {
    patch({ step });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const loadPlans = useCallback(
    async (address: FormattedAddress, contract: ContractDuration) => {
      patch({ plansLoading: true, plansError: null, plans: [] });
      try {
        const plans = await fetchPlans(address, contract);
        patch({ plans, plansLoading: false });
      } catch (e) {
        patch({
          plansLoading: false,
          plansError:
            e instanceof Error ? e.message : "Network error. Please try again.",
        });
      }
    },
    [],
  );

  const value = useMemo(
    () => ({ state, patch, go, loadPlans }),
    [state, go, loadPlans],
  );
  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside JourneyProvider");
  return ctx;
}

export function usePricing() {
  const { state } = useJourney();
  const router = ROUTERS.find((r) => r.id === state.routerId) ?? ROUTERS[0];
  const extras = EXTRAS.filter((e) => state.extraIds.includes(e.id));
  const planPrice = state.plan?.price ?? 0;
  const monthly =
    planPrice + router.price + extras.reduce((sum, e) => sum + e.price, 0);
  return { router, extras, planPrice, monthly };
}

export function useAddressLabel() {
  const { state } = useJourney();
  const a = state.address;
  if (!a) return "";
  return [a.display, a.city, a.postcode].filter(Boolean).join(", ");
}
