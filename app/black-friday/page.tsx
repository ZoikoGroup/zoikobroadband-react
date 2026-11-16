import type { Metadata } from "next";
import {
  BlackFridayHero,
  BlackFridayOffersGrid,
  FibrePlans,
  SavingSteps,
  ConnectionTypes,
  WhySwitchNow,
  BlackFridayFAQ,
  BlackFriday,
} from "./components";

export const metadata: Metadata = {
  title: "Black Friday Broadband Deals & Discounts 2026 | Zoiko", //[cite: 4]
  description:
    "Discover Zoiko Broadband Black Friday discounts in 2026. Explore internet plans and special offers for fast, reliable connectivity.", //[cite: 4]
};

export default function BlackFridayPage() {
  return (
    <main>
      <BlackFridayHero />
      <BlackFridayOffersGrid />
      <FibrePlans />
      <SavingSteps />
      <ConnectionTypes />
      <WhySwitchNow />
      <BlackFridayFAQ />
      <BlackFriday />
    </main>
  );
}
