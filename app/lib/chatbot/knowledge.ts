/**
 * Zoiko Broadband chatbot knowledge base.
 *
 * This is the ONLY information the assistant is allowed to answer from.
 * Content is taken from the FAQ sections already published on the site.
 * When you change an FAQ or policy on the website, update it here too.
 *
 * Keep this text stable between requests: it is sent as a cached prompt
 * prefix, and any change invalidates the cache (costs a little more once).
 */

export const COMPANY = {
  name: "Zoiko Broadband",
  website: "https://www.zoikobroadband.com",
  phone: "+44 (0)20 7164 6399",
  phoneHref: "tel:+442071646399",
  supportEmail: "support@zoikobroadband.com",
  infoEmail: "info@zoikobroadband.com",
};

/** Site pages the assistant may link to (relative URLs). */
export const PAGES: Record<string, string> = {
  "Check availability / postcode checker": "/check-availability",
  "All plans": "/all-plans",
  "All broadband deals": "/all-broadband-deals",
  "Compare plans": "/compare-plans",
  "Full fibre (FTTP)": "/full-fibre",
  "Part fibre (SOGEA)": "/part-fibre",
  "Fibre packages": "/fibre-packages",
  Bundles: "/bundles",
  Landline: "/landline",
  "Digital lines (digital phone)": "/digital-lines",
  "Business broadband": "/business-broadband",
  "Business broadband plans": "/business-broadband-plans",
  "Multi-site connectivity": "/multi-site-connectivity",
  "Switch to Zoiko": "/switch-to-zoiko",
  "Moving home": "/moving-home",
  "Which speed do I need?": "/which-speed-do-i-need",
  "Setup & installation": "/setup-installation",
  "Installation & routers": "/installation-routers",
  "Installation guide": "/installation-guide",
  "Router LED light meanings": "/led-light-meanings",
  "Change Wi-Fi channel": "/change-wi-fi-channel",
  "Wired vs wireless speed": "/wired-a-wireless-speed",
  "Report a fault": "/report-a-fault",
  "Payments & billing": "/payments-billing",
  "Get help": "/get-help",
  "Contact us": "/contact-us",
  "Ofcom speed commitment": "/ofcom-speed-commitment",
  "Refer a friend": "/refer-a-friend",
  "Black Friday offers": "/black-friday",
  "Log in / My Zoiko account": "/login",
  "Privacy notice": "/privacy-notice",
  "Terms & conditions": "/terms-conditions",
};

export const KNOWLEDGE = `
# About Zoiko Broadband
- UK broadband provider offering Full Fibre (FTTP) and Part Fibre (SOGEA) broadband for homes and businesses, plus digital phone lines, bundles and multi-site business connectivity.
- Friendly UK-based support team.

# Contact & support channels
- Phone: ${COMPANY.phone}
- Email support: ${COMPANY.supportEmail} (response within 24 hours)
- General enquiries: ${COMPANY.infoEmail}
- Request a call back: usually within 2 hours.
- Live chat with a human agent: available 24/7 from the Get help page (/get-help).
- Report a fault: /report-a-fault

# Availability & prices
- Availability, speeds and prices depend on the exact property, not just the postcode. Customers must enter their postcode and pick their address in the availability checker (/check-availability) to see eligible plans.
- Prices shown after the address check are confirmed for that property, including VAT and contract terms. Residential prices include VAT; business plan prices are shown excluding VAT.
- Total contract cost = all monthly charges for the full term plus any one-off setup or installation fees.
- Checking availability never creates an order or obligation.
- If an address isn't found (e.g. a new build), the support team can verify serviceability manually.
- Compare plans: check your address, filter and sort, then select up to three plans for a side-by-side comparison of technology, speed, cost, setup and contract (/compare-plans).

# Broadband types
- Full Fibre (FTTP, Fibre to the Premises): fibre all the way into the property. Highest speeds and reliability, less distance-related signal loss.
- Part Fibre (SOGEA, Single Order Generic Ethernet Access): fibre to the street cabinet, copper for the final stretch. Data-only line, no traditional analogue phone line. Speeds depend on line length from the cabinet and copper quality.
- If Full Fibre isn't available, the checker shows other verified options such as Part Fibre.
- Other UK broadband types in general: part fibre FTTC, copper ADSL (being phased out), mobile 4G/5G broadband.
- Full Fibre in rented homes or flats is possible if the network is built to the building and landlord/freeholder/wayleave permissions are in place.

# Speeds
- Advertised speeds are illustrative estimates. After an address check, the customer sees property-specific estimated speeds and a minimum guaranteed download speed before ordering.
- Which speed you need depends on how many people use the internet at the same time and what they do (streaming, video calls, gaming, uploads). Speed finder: /which-speed-do-i-need
- Download speed = receiving data (browsing, streaming, downloads). Upload speed = sending data (video calls, cloud backups, sending large files).
- Wi-Fi speed can be lower than line speed due to walls, distance, interference and number of devices. Test over an Ethernet cable for the truest reading.
- Speed testing tips: use the Zoiko speed test in the Support section, connect by Ethernet, close other apps and downloads. Results show download, upload and latency (ping). If results are consistently below the guaranteed minimum, contact support for diagnostics (Ofcom Speed Commitment: /ofcom-speed-commitment).

# Switching to Zoiko
- Check eligibility at your address, choose a plan, then follow the confirmed order steps. Switching uses the One Touch Switch process, and the Zoiko team handles the transfer with the old provider to keep downtime minimal.
- Don't cancel the old service until the new order steps are confirmed. Whether the old service cancels automatically depends on the provider and connection type.
- Leaving a current provider early may incur early-termination fees; the current provider can confirm these.
- Switching time varies by provider, connection type and whether an engineer is needed. Dates are confirmed during the order.
- Keeping your phone number may be possible subject to eligibility but can't be guaranteed in all cases.

# Moving home
- Check availability at the new address as soon as you know it. A new plan may be needed if the new home uses different technology or speed tiers.
- If there's no service at the new property, contact support or check your account to review your agreement options.
- Moving can affect monitored alarms, personal care alarms and telecare devices; check with the alarm provider and Zoiko first.
- Guidance: /moving-home

# Installation & setup
- An engineer is needed for Full Fibre if the property has no ONT fitted. If an active ONT or compatible master socket exists, self-install may be possible. The confirmed order states whether self-install or an engineer visit applies.
- ONT (Optical Network Terminal): small powered box on an indoor wall where the fibre enters; converts the fibre signal for the router.
- Routers arrive pre-configured with a step-by-step guide. Most customers are online within 15–30 minutes once the line is active; it can take up to 24 hours to fully stabilise.
- Activation day: the service can go live any time up to midnight, so keep equipment connected.
- Renters should check with their landlord or managing agent before an engineer visit in case drilling or cabling permission is needed.
- To reschedule an engineer appointment, use Track Your Order or contact support as early as possible.
- Router placement: central, open, raised, ventilated spot; away from thick walls, metal objects, TVs and other electronics.
- Own router: a compatible third-party router (FTTP WAN or SOGEA VDSL) may work, but full support/diagnostics only cover equipment supplied by Zoiko.
- Setup worked if: Power, Broadband/DSL and Internet lights are steady green or blue; a device can load a webpage; a speed test matches the plan.
- Guides: /setup-installation, /installation-routers, /installation-guide

# Router lights
- Power: router is on. Broadband/DSL: line active and talking to the network. Internet: connected to the internet. Wi-Fi/WLAN: wireless signal available. LAN/Ethernet: a cabled device is connected.
- A red, unexpectedly flashing or off light usually means a problem: see /led-light-meanings or contact support.

# Troubleshooting
- Soft reset (try first): switch router off, wait at least 30 seconds, switch on, allow up to 5 minutes to reconnect.
- Factory reset: ONLY when Zoiko support instructs it. Hold the reset pinhole for 10 seconds until lights flash; this erases custom settings, and the Wi-Fi name and password on the back of the router must be re-entered.
- Lost service: 1) check the Service Status page for local outages, 2) check all cables, 3) soft reset the router, 4) test with another device. Still offline: contact support (live chat, phone or email). Business customers and customers with registered accessibility needs may qualify for priority fault repair.
- Report a fault: /report-a-fault

# Phone, landline & digital lines
- Zoiko broadband does not need a landline; no line rental. Services are ready for the UK PSTN (copper landline) switch-off.
- Full Fibre and SOGEA do not include a traditional analogue landline by default. This can affect telecare devices, care alarms, security alarms, lift lines and old handsets; tell Zoiko before installation if you rely on any of these and check with the equipment supplier.
- Digital Lines run over broadband and need an active broadband connection. Zoiko can port (transfer) an existing number; if a port fails, Zoiko handles it with the old provider and the customer keeps a working Zoiko number meanwhile.
- Power cuts: digital phone services need mains power and broadband, so they may not work in a power cut. Battery backup solutions are available for vulnerable customers; keeping a mobile phone as a backup is recommended.
- Admin charges only apply in limited cases (e.g. incorrect details delaying a port, missed appointments); all fees are listed in the agreement and confirmed in advance.
- Broadband-only customers have no dial tone on a home phone and can't make or receive landline calls; use a mobile or internet calling apps instead. A landline can be added later by contacting support (extra charges may apply).
- Guidance: /digital-lines, /landline

# Billing & account
- Bills: log in to My Zoiko Account > Billing & Payments > choose the statement period > Download PDF. Bills show a breakdown of charges, discounts/credits and VAT. Bill Alerts can email you when a new bill is ready.
- Update payment details: My Zoiko Account > Billing & Payments > Update Payment Method. Payment details are protected by encryption and PCI DSS-compliant systems.
- Log in: /login. Billing help: /payments-billing

# Business broadband
- Availability depends on the exact business premises; check with the business address.
- Business prices are shown excluding VAT.
- Static IP addresses are available on selected business plans or as an add-on.
- Business plans typically have 24-month terms with UK-based support and response commitments; each plan lists its support hours, fault response targets and optional SLA upgrades before checkout.
- Multi-site: each site is checked, designed and priced separately (setup, equipment and monthly charges itemised with the VAT basis shown). WAN/multi-site networking to link sites is available. Resilience and failover options can be discussed, without a zero-downtime guarantee. Rollout timelines are agreed after a site review.
- Pages: /business-broadband, /business-broadband-plans, /multi-site-connectivity

# Black Friday
- Black Friday to Cyber Monday sale, 27–30 November 2026, on eligible fibre packages. The discount applies to the monthly price for the first six months, then the standard price applies.
- Exact eligible packages, end time and other terms: direct customers to /black-friday or support. Do not guess these details.
`.trim();
