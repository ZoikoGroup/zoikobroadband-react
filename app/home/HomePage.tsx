import { figtree } from "../fonts";
import HomeHero from "./sections/HomeHero";
import ServicesSection from "./sections/ServicesSection";
import PackagesSection from "./sections/PackagesSection";
import SpeedAdviser from "./sections/SpeedAdviser";
import NetworkTechnology from "./sections/NetworkTechnology";
import BusinessSection from "./sections/BusinessSection";
import DigitalPhoneLines from "./sections/DigitalPhoneLines";
import BundlesSection from "./sections/BundlesSection";
import SwitchingSteps from "./sections/SwitchingSteps";
import InstallationWifi from "./sections/InstallationWifi";
import WhyZoikoSection from "./sections/WhyZoikoSection";
import HelpSupport from "./sections/HelpSupport";
import GuidesSection from "./sections/GuidesSection";
import FaqSection from "./sections/FaqSection";
import AvailabilityCta from "./sections/AvailabilityCta";
import AeoGeoBlocks from "../Components/AeoGeo/AeoGeoBlocks";
import { homeBlocks, homeSchema } from "../Components/AeoGeo/content";
import BlackFridayPopup from "../Components/BlackFridayPopup";
import BroadbandPlans from "../Components/Broadbandplans";

/**
 * Home page content. Rendered by app/page.tsx so the URL stays "/".
 * (Named HomePage.tsx, not page.tsx, so Next.js doesn't also create a /home route.)
 */
export default function HomePage() {
  return (
    <div className={figtree.className}>
      {/* Black Friday promo popup (auto-opens on load) */}
      <BlackFridayPopup />

      <HomeHero />
      <PackagesSection />

      {/* Existing address checker (BT search → plans → cart) — unchanged */}
      <div id="check-postcode" className="scroll-mt-24 xl:scroll-mt-32">
        <BroadbandPlans />
      </div>

      <ServicesSection />
      <SpeedAdviser />
      <NetworkTechnology />
      <BusinessSection />
      <DigitalPhoneLines />
      <BundlesSection />
      <SwitchingSteps />
      <InstallationWifi />
      <WhyZoikoSection />
      <HelpSupport />
      <GuidesSection />
      <FaqSection />
      <AvailabilityCta />

      {/* AEO / GEO answer blocks */}
      <AeoGeoBlocks blocks={homeBlocks} schema={homeSchema} />
    </div>
  );
}
