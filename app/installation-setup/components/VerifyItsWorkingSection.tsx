import React from 'react';
import { Info } from 'lucide-react';

const VERIFICATION_STEPS = [
  {
    number: '1',
    title: 'Check activation status',
    description:
      'Use your confirmed order or account for the real status — pending, active or needs attention.',
  },
  {
    number: '2',
    title: 'Make an ordinary call',
    description:
      'Call a normal, non-emergency number to check outgoing calls. Never call 999 to test.',
  },
  {
    number: '3',
    title: 'Check incoming & number',
    description:
      'Have someone call you to confirm incoming calls, and that your number and voicemail behave as expected.',
  },
  {
    number: '4',
    title: 'Check essential devices',
    description:
      'If any care or alarm device uses the line, don\u2019t assume a dial tone means it works — have it checked by the supplier.',
  },
] as const;

export default function VerifyItsWorkingSection() {
  return (
    <section
      id="verify"
      className="w-full bg-[#F5F8FC] text-[#0E2F52] font-sans antialiased overflow-x-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
            <span className="text-xs font-bold tracking-widest text-[#D97706] uppercase">
              VERIFY
            </span>
            <span className="h-[2px] w-8 bg-[#F59E0B]" />
          </div>

          <h2 className="text-3xl sm:text-[38px] font-extrabold text-[#0E2F52] tracking-tight mb-3 leading-tight">
            Check it&apos;s working — the right way
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Once it&apos;s set up, verify safely. A dial tone alone isn&apos;t proof, and a tick box isn&apos;t confirmation.
          </p>
        </div>

        {/* Numbered 1-4 Verification List */}
        <ol className="space-y-6 mb-10">
          {VERIFICATION_STEPS.map((step) => (
            <li key={step.number} className="space-y-1">
              <div className="text-xs font-bold text-slate-400">
                {step.number}
              </div>
              <h3 className="font-extrabold text-base text-[#0E2F52] leading-snug">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Centered Bottom Callout Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EEF4FA] text-[#0E2F52] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#0E2F52] mb-1 leading-snug">
                Handover: confirmed vs self-checked
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Checks you tick here are your own report. Live activation is confirmed by our systems, not by a tick — your account or order shows the authoritative status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}