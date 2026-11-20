/** Shared Tailwind classes for the login / register / reset-password forms (Figma "Sign in"). */

export const authHeading =
  "text-[30px] font-extrabold leading-tight tracking-tight text-[#0B1F45] [@media(max-height:760px)]:text-[24px]";

export const authSubheading = "mt-0.5 text-[13px] text-slate-500";

export const authLabel = "mb-1.5 [@media(max-height:760px)]:mb-1 block text-[13px] font-semibold text-[#0B1F45]";

export const authInput =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[13px] text-slate-900 " +
  "placeholder:text-slate-400 outline-none transition " +
  "focus:border-[#1257B8] focus:ring-2 focus:ring-[#1257B8]/15 " +
  "[@media(max-height:760px)]:py-1.5";

export const authEyeBtn =
  "absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700";

export const authPrimaryBtn =
  "w-full rounded-lg bg-[#0B1F45] py-3 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(11,31,69,0.3)] " +
  "transition hover:bg-[#132E63] disabled:cursor-not-allowed disabled:opacity-70 " +
  "[@media(max-height:760px)]:py-2";

export const authLink = "font-semibold text-[#0B1F45] hover:underline";
