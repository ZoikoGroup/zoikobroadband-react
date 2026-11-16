"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowRight, ChevronDown, Lock } from "lucide-react";

/*
 * Posts to the SAME existing endpoint and payload shape used by
 * app/business-broadband/components/GetCustomQuote.tsx — no backend changes.
 * "Number of sites" and "Preferred callback" have no backend fields, so they are
 * appended to `additional_requirements`.
 */
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SITES = ["One site", "2–5 sites", "6–20 sites", "More than 20 sites"];
const CALLBACK = ["Any time", "Morning", "Afternoon", "Evening"];
const SIZES = ["1-10 employees", "11-50 employees", "50+ employees"];

const initial = {
  business_name: "",
  contact_name: "",
  email: "",
  phone_number: "",
  business_postcode: "",
  business_size: "",
  sites: SITES[0],
  callback: CALLBACK[0],
  requirements: "",
};
type FormState = typeof initial;
type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.business_name.trim()) e.business_name = "Business name is required";
  if (!f.contact_name.trim()) e.contact_name = "Contact name is required";
  else if (!/^[A-Za-z\s'-]+$/.test(f.contact_name)) e.contact_name = "Enter a valid name";
  if (!f.email.trim()) e.email = "Work email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address";
  const phone = f.phone_number.trim().replace(/\s/g, "");
  if (!phone) e.phone_number = "Phone number is required";
  else if (!/^\+?[1-9]\d{9,14}$/.test(phone)) e.phone_number = "Enter a valid UK phone number";
  if (!f.business_postcode.trim()) e.business_postcode = "Business postcode is required";
  else if (!/^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i.test(f.business_postcode.trim())) e.business_postcode = "Enter a valid UK postcode";
  if (!f.business_size) e.business_size = "Please select a business size";
  return e;
}

const inputCls =
  "w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0B2F5B] focus:ring-2 focus:ring-[#0B2F5B]/20 dark:bg-gray-950 dark:text-white";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-[#0B2F5B] dark:text-white">
        {label}
        {required && " *"}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function BusinessQuoteForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const border = (k: keyof FormState) => (errors[k] ? "border-red-500" : "border-slate-300 dark:border-gray-700");
  const a11y = (k: keyof FormState) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `q-${k}-error` : undefined,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    const additional_requirements = [
      `Number of sites: ${form.sites}`,
      `Preferred callback: ${form.callback}`,
      form.requirements.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(`${API_URL}/api/business-broadband/business-inquiry/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: form.business_name,
          contact_name: form.contact_name,
          email: form.email,
          phone_number: form.phone_number.trim().replace(/\s/g, ""),
          business_postcode: form.business_postcode,
          business_size: form.business_size,
          additional_requirements,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Your inquiry has been submitted successfully!");
        setForm(initial);
      } else {
        toast.error("Failed to submit your inquiry. Please try again.");
      }
    } catch {
      toast.error("An error occurred while submitting your inquiry. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="quote-heading"
      className="rounded-3xl border-2 border-[#F7BE2E] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(11,47,91,0.45)] dark:bg-gray-900 sm:p-8"
    >
      <h3 id="quote-heading" className="text-2xl font-bold text-[#0B2F5B] dark:text-white">
        Request a Tailored Quote
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Tell us about your premises and we will be in touch. Fields marked * are required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="q-business_name" label="Business name" required error={errors.business_name}>
          <input id="q-business_name" value={form.business_name} onChange={set("business_name")} autoComplete="organization" className={`${inputCls} ${border("business_name")}`} {...a11y("business_name")} />
        </Field>
        <Field id="q-contact_name" label="Contact name" required error={errors.contact_name}>
          <input id="q-contact_name" value={form.contact_name} onChange={set("contact_name")} autoComplete="name" className={`${inputCls} ${border("contact_name")}`} {...a11y("contact_name")} />
        </Field>
        <Field id="q-email" label="Work email" required error={errors.email}>
          <input id="q-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" className={`${inputCls} ${border("email")}`} {...a11y("email")} />
        </Field>
        <Field id="q-phone_number" label="Phone" required error={errors.phone_number}>
          <input id="q-phone_number" type="tel" value={form.phone_number} onChange={set("phone_number")} autoComplete="tel" className={`${inputCls} ${border("phone_number")}`} {...a11y("phone_number")} />
        </Field>
        <Field id="q-business_postcode" label="Business postcode" required error={errors.business_postcode}>
          <input id="q-business_postcode" value={form.business_postcode} onChange={set("business_postcode")} autoComplete="postal-code" className={`${inputCls} ${border("business_postcode")}`} {...a11y("business_postcode")} />
        </Field>
        <Field id="q-business_size" label="Business size" required error={errors.business_size}>
          <div className="relative">
            <select id="q-business_size" value={form.business_size} onChange={set("business_size")} className={`${inputCls} ${border("business_size")} appearance-none pr-10`} {...a11y("business_size")}>
              <option value="">Select size</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </Field>
        <Field id="q-sites" label="Number of sites">
          <div className="relative">
            <select id="q-sites" value={form.sites} onChange={set("sites")} className={`${inputCls} border-slate-300 dark:border-gray-700 appearance-none pr-10`}>
              {SITES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </Field>
        <Field id="q-callback" label="Preferred callback">
          <div className="relative">
            <select id="q-callback" value={form.callback} onChange={set("callback")} className={`${inputCls} border-slate-300 dark:border-gray-700 appearance-none pr-10`}>
              {CALLBACK.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </Field>
        <div className="sm:col-span-2">
          <Field id="q-requirements" label="Your requirements">
            <textarea id="q-requirements" rows={3} value={form.requirements} onChange={set("requirements")} className={`${inputCls} border-slate-300 dark:border-gray-700 resize-y`} />
          </Field>
        </div>
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <Lock aria-hidden className="h-4 w-4 shrink-0" />
        <span>
          We use these details only to respond to your enquiry.{" "}
          <Link href="/privacy-notice" className="text-[#1d5fa8] underline underline-offset-2">
            Privacy Notice
          </Link>
        </span>
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F7BE2E] px-6 py-4 font-bold text-[#0B2F5B] transition-colors hover:bg-[#F2B015] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Request a Tailored Quote"}
        {!submitting && <ArrowRight aria-hidden className="h-4 w-4" />}
      </button>
    </form>
  );
}
