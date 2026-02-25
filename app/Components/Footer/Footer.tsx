
import Link from "next/link";
import FooterMenu from "./FooterMenu";

export default function Footer() {


  const footerSections = [
    {
      id: "broadband",
      title: "Zoiko Broadband",
      links: [
        { name: "Home Broadband", href: "/home-broadband" },
        { name: "Business Broadband", href: "/business-broadband" },
        { name: "Smart Bundles", href: "/smart-bundles" },
        { name: "Digital Lines", href: "/digital-lines" },
        { name: "Check my postcode", href: "/check-mypost" },
        { name: "Refer a friend", href: "/refer-friend" },
      ],
    },
    {
      id: "support",
      title: "Support",
      links: [
        { name: "Get Help", href: "/get-help" },
        { name: "Setup & Installation", href: "/setup-installation" },
        { name: "Manage My Account", href: "/manage-account" },
        { name: "Payments & Billing", href: "/payments-billing" },
        { name: "Report a Fault", href: "/report-fault" },
        { name: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      links: [
        { name: "Terms & Conditions", href: "/terms-conditions" },
        { name: "Privacy Notice", href: "/privacy-notice" },
        { name: "Cookies Policy", href: "/cookies-policy" },
        { name: "Ofcom Speed Commitment", href: "/ofcom-speed-commitment" },
        { name: "Accessibility Statement", href: "/accessibility-statement" },
      ],
    },
    {
      id: "company",
      title: "Our Company",
      links: [
        { name: "About Zoiko Broadband", href: "/about-us" },
        { name: "Our Sustainability Promise", href: "/our-sustainability" },
        { name: "Careers at Zoiko", href: "/careers" },
        { name: "Zoiko Group", href: "/zoiko-group" },
        { name: "Partners & Affiliations", href: "/partnership" },
      ],
    },
  ];

  return (
    <footer className="bg-[#10446C] w-full border-t-2 p-3 role=contentinfo">
      <div className="footer-items w-[90%] mx-auto p-5 md:p-10">
        {/* Desktop View - Standard Layout */}
        <div className="hidden lg:flex lg:flex-row justify-between">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h2 className="text-2xl md:text-2xl text-[#f5c241] font-bold my-3">
                {section.title}
              </h2>
              <ul className="text-[#CBD5E1] text-lg md:text-lg font-normal leading-10">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="hover:text-[#f5c241] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile View - Accordion Layout */}
          <FooterMenu sections={footerSections} />
      </div>

      {/* Footer Bottom - Copyright */}
      <div className="text-center p-2 border-t-2 text-white w-[90%] mx-auto">
        <p className="font-semibold text-sm md:text-base">
          &copy; 2026 Zoiko Broadband | Zoiko Broadband is a trading name of
          Zoiko Telecom Ltd., registered in England & Wales | Company No.
          15021457 | VAT No 465 1110 23|
        </p>
        <p className="font-semibold text-sm md:text-base">
          All rights reserved. Zoiko Telecom Ltd is Ofcom registered and adheres
          to the Broadband Speeds Code of Practice.
        </p>
      </div>
    </footer>
  );
}