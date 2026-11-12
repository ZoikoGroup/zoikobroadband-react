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
