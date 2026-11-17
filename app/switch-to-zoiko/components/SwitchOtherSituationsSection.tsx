import React from "react";
import Link from "next/link";
import { Home, Briefcase, User, Wifi, ArrowRight } from "lucide-react";

const OTHER_SITUATIONS_CARDS = [
  {
    icon: Home,
    title: "Moving home",
    description:
      "Switching as part of a move? Your old and new addresses each need a separate check.",
    linkLabel: "Go to Moving Home",
    href: "/moving-home",
  },
  {
    icon: Briefcase,
    title: "Business connection",
    description:
      "For a business line, head to Business Broadband — residential switching terms don't apply.",
    linkLabel: "Go to Business Broadband",
    href: "/business-broadband",
  },
  {
    icon: User,
    title: "Already a Zoiko customer",
    description:
      "Manage your plan or account, or contact support if you need a hand with a change.",
    linkLabel: "Manage My Account",
    href: "/my-account",
  },
  {
    icon: Wifi,
    title: "Assisted switching",
    description:
      "Need extra help, or have accessibility or complex voice needs? We can switch with you, step by step.",
    linkLabel: "Get switching help",
    href: "/contact-support",
  },
] as const;

export default function SwitchOtherSituationsSection() {
  return (
    <section
      id="other-situations"
      className="w-full bg-white text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              OTHER SITUATIONS
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>
          <h2 className="text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Moving, business or already with us?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Some journeys are a little different. Choose the one that fits so
            you get the right help.
          </p>
        </div>

        {/* 2x2 Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OTHER_SITUATIONS_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2FB] text-[#0A3A66] flex items-center justify-center mb-5 shrink-0">
                    <IconComponent className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="font-bold text-base text-[#0A3A66] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={card.href}
                    className="inline-flex items-center text-sm font-bold text-[#0E2F52] hover:text-[#0A3A66] transition-colors group"
                  >
                    <span>{card.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
