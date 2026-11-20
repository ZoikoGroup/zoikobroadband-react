"use client";

import React from "react";

interface ProtectionCategory {
  readonly id: string;
  readonly status: string;
  readonly title: string;
  readonly description: string;
}

const PROTECTION_CATEGORIES = [
  {
    id: "managed-firewall",
    status: "Not yet confirmed",
    title: "Managed firewall / router policies",
    description: "Network perimeter and access rules.",
  },
  {
    id: "secure-wifi",
    status: "Not yet confirmed",
    title: "Secure Wi-Fi / guest network",
    description: "Separate guest and staff wireless.",
  },
  {
    id: "dns-web-filtering",
    status: "Not yet confirmed",
    title: "DNS / web filtering",
    description: "Policy-level web and domain limits.",
  },
  {
    id: "endpoint-protection",
    status: "Not yet confirmed",
    title: "Endpoint protection",
    description: "Device-based protection scope.",
  },
  {
    id: "patch-device-posture",
    status: "Not yet confirmed",
    title: "Patch / device posture",
    description: "Visibility of updates and unmanaged devices.",
  },
  {
    id: "identity-mfa-guidance",
    status: "Not yet confirmed",
    title: "Identity / MFA guidance",
    description: "Protecting accounts and sign-in.",
  },
  {
    id: "email-phishing-protection",
    status: "Not yet confirmed",
    title: "Email / phishing protection",
    description: "Mail protection and training.",
  },
  {
    id: "security-awareness",
    status: "Not yet confirmed",
    title: "Security awareness",
    description: "Helping staff spot scams.",
  },
  {
    id: "monitoring-alerts",
    status: "Not yet confirmed",
    title: "Monitoring / alerts",
    description: "Signals and alert routing.",
  },
  {
    id: "vulnerability-review",
    status: "Not yet confirmed",
    title: "Vulnerability review",
    description: "Review of agreed assets.",
  },
  {
    id: "incident-response-support",
    status: "Not yet confirmed",
    title: "Incident response support",
    description: "Advice and containment path.",
  },
] as const satisfies readonly ProtectionCategory[];

export default function CyberProtectionOptions() {
  return (
    <section className="w-full bg-[#1963DD] py-16 md:py-20 font-sans antialiased">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-10 md:mb-11">
          <p className="text-[#FFC119] text-[12px] font-bold tracking-[0.12em] uppercase mb-3">
            PROTECTION OPTIONS
          </p>

          <h2 className="text-white text-[34px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em] mb-3.5">
            Categories we may be able to discuss
          </h2>

          <p className="text-[#DCE8FF] text-[15px] leading-[1.55] max-w-[610px]">
            These are candidate categories, not confirmed products. Each appears
            as available only once Product, Legal and Security have verified
            scope, prerequisites and terms.
          </p>
        </div>

        {/* 12-Card Grid (4x3 on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROTECTION_CATEGORIES.map((category) => (
            <article
              key={category.id}
              className="bg-white rounded-[16px] p-5 sm:p-6 shadow-[0_8px_22px_rgba(11,34,65,0.12)] flex flex-col items-start min-h-[175px]"
            >
              <span className="inline-block bg-[#FEF3C7] text-[#92400E] text-[11px] font-semibold px-3 py-1 rounded-full leading-none mb-4">
                {category.status}
              </span>

              <h3 className="text-[#0B2241] text-[15.5px] font-bold leading-[1.3] mb-2">
                {category.title}
              </h3>

              <p className="text-[#64748B] text-[13px] leading-[1.5]">
                {category.description}
              </p>
            </article>
          ))}

          {/* 12th Card: Amber CTA Card */}
          <aside className="bg-[#FFC119] rounded-[16px] p-5 sm:p-6 shadow-[0_8px_22px_rgba(11,34,65,0.14)] flex flex-col justify-between min-h-[175px]">
            <div>
              <h3 className="text-[#0B2241] text-[15.5px] font-bold leading-[1.3] mb-2">
                Not sure where to start?
              </h3>

              <p className="text-white text-[13px] leading-[1.5] mb-5">
                Tell us about your business and we will suggest next steps.
              </p>
            </div>

            <a
              href="#"
              aria-label="Discuss Your Business Security"
              className="w-full py-2.5 px-4 rounded-[8px] bg-[#0B2241] hover:bg-[#143563] text-[#0B2241]/0 select-none text-[13px] font-bold leading-[1.3] text-center inline-flex items-center justify-center transition-colors"
            >
              Discuss Your
              <br />
              Business Security
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
