import React from "react";
import Link from "next/link";
import { Wifi, LogOut } from "lucide-react";

export default function WhichKindOfMove() {
  return (
    <section
      id="which-path"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              WHICH PATH?
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Which kind of move is this?
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            The steps differ depending on whether your current provider is
            migrating you, or you&apos;re switching provider. Pick the closest.
          </p>
        </div>

        {/* Stacked Move Path Cards */}
        <div className="space-y-4">
          {/* Card 1: Your provider is migrating you */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
              <Wifi className="w-4 h-4 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#0E2F52] mb-1 leading-snug">
                Your provider is migrating you
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Your current provider moves your line to digital. Check any
                notice is genuine, prepare your equipment and dependencies, and
                keep your current service until it&apos;s confirmed.
              </p>
            </div>
          </div>

          {/* Card 2: You're switching provider */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
              <LogOut className="w-4 h-4 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#0E2F52] mb-1 leading-snug">
                You&apos;re switching provider
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                You choose a new service that includes digital voice. Check
                availability, keep your number with a porting check, and
                don&apos;t cancel anything until the switch is confirmed.{" "}
                <Link
                  href="/how-switching-works"
                  className="text-[#0A3A66] font-medium hover:underline transition-colors"
                >
                  How switching works
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
