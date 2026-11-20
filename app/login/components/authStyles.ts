/** Shared Tailwind classes for the login / register / reset-password forms. */

export const authHeading =
  "text-[26px] [@media(max-height:760px)]:text-[22px] font-extrabold leading-tight tracking-tight text-[#0B1F45] dark:text-white sm:text-[28px]";

export const authSubheading = "mt-1 text-[13px] text-slate-500 dark:text-slate-400";

export const authLabel =
  "mb-1 block text-[13px] font-semibold text-[#0B1F45] dark:text-slate-200";

export const authInput =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 [@media(max-height:760px)]:py-2 text-sm text-slate-900 " +
  "placeholder:text-slate-400 outline-none transition " +
  "focus:border-[#10446C] focus:ring-2 focus:ring-[#10446C]/20 " +
  "dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export const authEyeBtn =
  "absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-700 dark:text-slate-400";

export const authPrimaryBtn =
  "w-full rounded-lg bg-[#0B1F45] py-3 [@media(max-height:760px)]:py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(11,31,69,0.25)] " +
  "transition hover:bg-[#10446C] disabled:cursor-not-allowed disabled:opacity-70 " +
  "dark:bg-blue-600 dark:hover:bg-blue-700";

export const authLink =
  "font-semibold text-[#10446C] hover:underline dark:text-blue-400";
