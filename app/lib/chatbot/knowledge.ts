/**
 * Linko knowledge base (public, approved-for-chat content only).
 *
 * Rules from the Linko spec (Doc06 / Doc12 / Doc13):
 *  - Only PUBLIC information goes here. No account data, prices, fees,
 *    speeds, refund amounts, retention periods or opening hours unless the
 *    business has signed them off.
 *  - Website wording the spec flags as unverified or conflicting
 *    ("24/7", "unlimited", callback within 2 hours, cooling-off start,
 *    contract length, PCI/bank-grade claims, speed-code membership,
 *    automatic compensation) is deliberately NOT included.
 *  - Every item is still DRAFT pending Product / Legal approval.
 */
import { COMPANY } from "./linko";

export { COMPANY };

export const KNOWLEDGE = `
# About Zoiko Broadband and Linko
- Zoiko Broadband offers UK residential and business broadband services: Full Fibre (FTTP) and Part Fibre (SOGEA), digital phone lines, bundles and multi-site business connectivity.
- Linko is Zoiko Broadband's AI assistant. It can explain information and guide people to secure services or a human adviser. It is not a person and not an emergency service.

# Contact routes (no hours or response times are promised in chat)
- Phone: ${COMPANY.phone}
- Email: ${COMPANY.supportEmail} (general enquiries: ${COMPANY.infoEmail})
- Live chat with an adviser, callback requests and current opening hours: Get help page.
- Report a fault: Report a fault page.

# Availability, plans and prices
- Availability depends on the exact address, not just the postcode. A postcode can cover several premises with different connections. Customers enter a postcode, then select their exact address in the availability checker.
- Eligible plans, monthly prices, set-up or installation charges, contract term, VAT basis and any scheduled price changes are shown in the approved quote for that address, before checkout. Linko never quotes prices, speeds, fees or discounts.
- Checking availability does not create an order.
- If an address isn't listed (for example a new build), our team can check it manually.
- Compare plans: after checking an address, customers can compare eligible plans side by side.

# Broadband types (plain-language glossary)
- Full Fibre (FTTP, Fibre to the Premises): fibre runs all the way into the property. Availability and achievable speed depend on the specific address.
- Part Fibre (SOGEA, Single Order Generic Ethernet Access): fibre to the street cabinet, copper for the last stretch. It doesn't need a traditional analogue phone line. Speeds depend on the line from the cabinet.
- Download speed = receiving data (browsing, streaming). Upload speed = sending data (video calls, backups, large files).
- Speeds depend on the address and package. Customers should use the minimum and expected speeds in their own contract information. Wi-Fi can be slower than the line because of walls, distance, interference and number of devices; a wired (Ethernet) test gives the truest reading.

# Contracts and consumer rights (general information, not a decision for a specific case)
- Before a consumer (or qualifying small business) is bound, they must receive pre-contract information and a contract summary.
- For new consumer contracts since 17 January 2025, any in-contract price rises must be shown in pounds and pence with dates, not linked to inflation or percentages.
- Many distance and off-premises consumer service contracts have a statutory 14-day cancellation period, with conditions and exceptions. Whether it applies, and any charges, must be checked against the customer's contract.
- Early-exit charges, refunds and installation-fee refunds are assessed against the specific contract by our team; Linko does not calculate them.

# Switching to Zoiko
- For eligible residential (home) fixed broadband switches, the new provider manages the change through One Touch Switch. Customers should not cancel their current service themselves.
- The current provider can explain any early-exit charges.
- Keeping a phone number can't be promised in chat; the switching team checks it.
- Business switches and home moves follow a different route and go to a specialist.

# Moving home
- Check availability at the new address as early as possible. Moving may need a new order, and options for the current service are shown after secure sign-in.
- Keeping the same number can't be promised until our service team checks.
- Moving can affect alarms and telecare devices: speak to our team and the device provider first.

# Installation and router
- Whether an engineer visit or self-install applies is confirmed in the order. Linko cannot book, confirm or change engineer appointments; appointment details are shown after sign-in.
- ONT (Optical Network Terminal): a small powered box where the fibre enters the property; it connects to the router.
- Router placement: central, open, raised and ventilated; away from thick walls, metal objects and other electronics.
- The exact router and any equipment charges are shown in the customer's own approved offer.
- Router light meanings: Router LED light meanings page.
- Guides: Setup and installation, Installation and routers, Installation guide pages.

# Troubleshooting (safe steps, one at a time)
- First ask whether anyone relies on the line for a landline, emergency calls or a telecare alarm. If yes or unsure: do not suggest restarting or disconnecting equipment; send them to urgent human support.
- No connection: check whether there is a known issue, check cables are secure, then try a normal router restart (switch off, wait at least 30 seconds, switch on, allow a few minutes). Test with another device.
- Slow speed: test on a wired connection, close heavy apps and downloads, and compare with the contract speed. Wi-Fi tips: router placement, changing Wi-Fi channel.
- Wi-Fi drops: ask whether it affects all devices or one device.
- A factory reset removes personalised settings: try a normal restart first and only factory-reset when the approved guide or a support adviser says so.
- Never ask for router admin passwords. If problems continue, report a fault or speak to our team. Linko can't give repair times or outage causes.

# Digital voice, landlines and telecare (safety first)
- Full Fibre and SOGEA don't include a traditional analogue landline. Digital phone services run over broadband and can stop working in a power cut without suitable backup.
- Anyone who relies on a landline for emergency calls or uses telecare, a care alarm, security alarm or lift line should speak to our team before any change, and check with the equipment provider. Don't assume a telecare alarm will work after a digital voice change.
- Immediate emergency: use 999 or 112 from a working connection or another person's phone.
- Guidance: Digital lines and Landline pages, and Ofcom's guidance on the future of landline calls.

# Billing and account
- Account-specific figures (bills, balances, payments, refunds) are only shown after secure sign-in to the Zoiko account. Linko never asks for card or bank details; payments happen on secure pages only.
- Bills can be viewed and downloaded in the account's Billing & Payments area. Payment details are updated there too.
- Billing help: Payments & billing page.

# Complaints
- Customers can make a complaint without signing in, using the contact page or by phone.
- Eligible complaints that aren't resolved within six weeks, or where a deadlock letter is issued, may be referred to an independent ADR scheme (rule for complaints raised from 8 April 2026). Linko doesn't decide eligibility or name a scheme.
- Compensation depends on the service, contract and rules that apply; our team reviews each case. Linko doesn't promise payments.

# Business broadband
- Availability depends on the exact business premises. Static IP, support levels, response targets and any SLA are confirmed for the selected service, not in chat.
- Multiple sites: a specialist reviews each site and prepares a tailored quote.

# Privacy
- Chats are saved only in the visitor's own browser on their device (Chat history in the Linko menu) until they delete them. They aren't stored by Zoiko Broadband or passed to an adviser.
- Data requests and privacy questions: privacy notice and contact page. Linko can't promise immediate deletion of records held for legal reasons.

# Black Friday
- A Black Friday to Cyber Monday sale runs on selected fibre packages. Eligible packages, discounts and terms are shown on the Black Friday page and in the approved quote; Linko doesn't quote them.
`.trim();
