"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Inline SVG social icons (lucide-react version doesn't include these)
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import { fetchFormFields, formSubmit, fetchSocial } from "@/lib/api";

interface InquiryFormSectionProps {
  data: InquiryFormSectionData;
  settings?: Array<{ key: string; value: string }>;
  productData?: {
    name: string;
    segmentName: string;
  };
}

declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

export default function InquiryFormSection({
  data,
  settings,
  productData,
}: InquiryFormSectionProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modal, setModal] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    async function loadSocials() {
      try {
        const fetchedSocials = await fetchSocial();
        setSocials(fetchedSocials || []);
      } catch {
        setSocials([]);
      }
    }
    loadSocials();
  }, []);

  const getSocials = (key: string): string | undefined =>
    socials.find((item) => item.socialKey === key)?.socialValue;

  useEffect(() => {
    async function loadFields() {
      if (!data.formId) return;

      try {
        const fetchedFields = await fetchFormFields(data.formId);

        const sortedFields = [...fetchedFields].sort(
          (a, b) => a.order - b.order,
        );

        setFormFields(sortedFields);
      } catch {
        setFormFields([]);
      }
    }

    loadFields();
  }, [data.formId]);

  const getSetting = (key: string) => {
    return settings?.find((s) => s.key === key)?.value || "";
  };

  const companyPhone = getSetting("hospital_phone");
  const companyEmail = getSetting("hospital_email");
  const companyAddress = getSetting("hospital_address");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;

    if (!siteKey) {
      setModal({
        show: true,
        message: "Security verification failed.",
        type: "error",
      });

      return;
    }

    if (!window.grecaptcha) {
      setModal({
        show: true,
        message: "Security check is loading. Please wait a moment.",
        type: "error",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await window.grecaptcha.execute(siteKey, {
        action: "submit_inquiry",
      });

      const formData = new FormData(formElement);

      const formValues: Record<string, string | File> = {};

      formData.forEach((value, key) => {
        formValues[key] = value as string | File;
      });

      if (productData) {
        formValues["Product_Name"] = productData.name;
        formValues["Product_Segment"] = productData.segmentName;
        formValues["Form_Title"] = "New Product Inquiry";
      }

      await formSubmit({
        formValues,
        recaptchaToken,
      });

      formElement.reset();

      setModal({
        show: true,
        message:
          "Your enquiry has been submitted successfully. Our team will contact you shortly.",
        type: "success",
      });
    } catch {
      setModal({
        show: true,
        message: "Failed to submit enquiry. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#F7A707] focus:ring-2 focus:ring-[#F7A707]/20";

  const textareaClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#F7A707] focus:ring-2 focus:ring-[#F7A707]/20 resize-none";

  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500";

  const renderFormField = (field: FormField) => {
    switch (field.fieldType) {
      case "TEXT":
      case "EMAIL":
      case "NUMBER": {
        const inputType =
          field.fieldType === "NUMBER" ? "tel" : field.fieldType.toLowerCase();

        return (
          <div key={field.id}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>

            <input
              id={field.name}
              name={field.name}
              type={inputType}
              required={field.isRequired}
              placeholder={field.placeholder || `Enter ${field.label}`}
              className={inputClass}
            />
          </div>
        );
      }

      case "TEXTAREA":
        return (
          <div key={field.id} className="sm:col-span-2">
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>

            <textarea
              id={field.name}
              name={field.name}
              rows={5}
              required={field.isRequired}
              placeholder={field.placeholder || `Enter ${field.label}`}
              className={textareaClass}
            />
          </div>
        );

      case "SELECT": {
        const options = field.options ? field.options.split(",") : [];

        return (
          <div key={field.id}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>

            <select
              id={field.name}
              name={field.name}
              required={field.isRequired}
              className={`${inputClass} appearance-none`}
            >
              <option value="">
                {field.placeholder || `Select ${field.label}`}
              </option>

              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      }

      case "FILE":
        return (
          <div key={field.id} className="sm:col-span-2">
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>

            <input
              id={field.name}
              name={field.name}
              type="file"
              required={field.isRequired}
              className="block w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2.5 file:text-xs file:font-semibold file:text-white hover:file:bg-teal-700"
            />
          </div>
        );

      case "DATE":
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>

            <input
              id={field.name}
              name={field.name}
              type="date"
              required={field.isRequired}
              className={inputClass}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-orange-50/20 py-16 md:py-20"
      id="inquiry-form"
    >
      {/* Dynamic vector waves & plus accents in background (pushed to corners for clean content area) */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none z-0"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft plus signs in corners */}
        <path
          d="M 80, 280 L 80, 300 M 70, 290 L 90, 290"
          stroke="#F7A707"
          strokeWidth="2"
          strokeOpacity="0.20"
          strokeLinecap="round"
        />
        <path
          d="M 1360, 200 L 1360, 220 M 1350, 210 L 1370, 210"
          stroke="#F7A707"
          strokeWidth="2"
          strokeOpacity="0.15"
          strokeLinecap="round"
        />

        {/* Left corner wave decoration */}
        <path
          d="M -50, 480 C 120, 440 180, 320 -50, 220"
          stroke="#F7A707"
          strokeWidth="1.5"
          strokeOpacity="0.15"
          fill="none"
        />
        <path
          d="M -50, 510 C 140, 470 200, 340 -50, 240"
          stroke="#F7A707"
          strokeWidth="1.5"
          strokeOpacity="0.10"
          fill="none"
        />
        <path
          d="M -50, 540 C 160, 500 220, 360 -50, 260"
          stroke="#F7A707"
          strokeWidth="1.5"
          strokeOpacity="0.06"
          fill="none"
        />

        {/* Right corner wave decoration */}
        <path
          d="M 1490, 180 C 1320, 220 1260, 340 1490, 440"
          stroke="#F7A707"
          strokeWidth="1.5"
          strokeOpacity="0.15"
          fill="none"
        />
        <path
          d="M 1490, 150 C 1300, 190 1240, 320 1490, 420"
          stroke="#F7A707"
          strokeWidth="1.5"
          strokeOpacity="0.10"
          fill="none"
        />
        <path
          d="M 1490, 120 C 1280, 160 1220, 300 1490, 400"
          stroke="#F7A707"
          strokeWidth="1.5"
          strokeOpacity="0.06"
          fill="none"
        />
      </svg>

      {/* Warm gradient accents */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#F7A707]/10 blur-[120px] z-0" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-orange-400/10 blur-[100px] z-0" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Centered Header (above both panels) ── */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {data.title}
          </h2>

          {data.subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-slate-500 text-sm leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          {/* ── Left: Contact Details + Social ── */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              {companyPhone && (
                <a
                  href={`tel:${companyPhone}`}
                  className="group flex items-center gap-4 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 group-hover:bg-[#F7A707] group-hover:border-[#F7A707] transition-all duration-200">
                    <Phone className="h-5 w-5 text-[#F7A707] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                      Phone
                    </p>
                    <p className="text-base md:text-lg font-bold text-slate-800 group-hover:text-[#F7A707] transition-colors">
                      {companyPhone}
                    </p>
                  </div>
                </a>
              )}

              {companyEmail && (
                <a
                  href={`mailto:${companyEmail}`}
                  className="group flex items-center gap-4 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 group-hover:bg-[#F7A707] group-hover:border-[#F7A707] transition-all duration-200">
                    <Mail className="h-5 w-5 text-[#F7A707] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                      Email
                    </p>
                    <p className="text-base md:text-lg font-bold text-slate-800 break-all group-hover:text-[#F7A707] transition-colors">
                      {companyEmail}
                    </p>
                  </div>
                </a>
              )}

              {companyAddress && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(companyAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 group-hover:bg-[#F7A707] group-hover:border-[#F7A707] transition-all duration-200 mt-1">
                    <MapPin className="h-5 w-5 text-[#F7A707] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                      Address
                    </p>
                    <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed group-hover:text-[#F7A707] transition-colors">
                      {companyAddress}
                    </p>
                  </div>
                </a>
              )}
            </div>

            {/* Divider & Social Links */}
            {socials.length > 0 && socials.some((item) => item.socialValue) && (
              <>
                <div className="h-px w-full bg-slate-200" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    {getSocials("facebook") && (
                      <a
                        href={getSocials("facebook")}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FacebookIcon />
                      </a>
                    )}
                    {getSocials("instagram") && (
                      <a
                        href={getSocials("instagram")}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600"
                      >
                        <InstagramIcon />
                      </a>
                    )}
                    {getSocials("youtube") && (
                      <a
                        href={getSocials("youtube")}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <YoutubeIcon />
                      </a>
                    )}
                    {getSocials("twitter") && (
                      <a
                        href={getSocials("twitter")}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter / X"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-600"
                      >
                        <TwitterIcon />
                      </a>
                    )}
                    {getSocials("linkedin") && (
                      <a
                        href={getSocials("linkedin")}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <LinkedinIcon />
                      </a>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Right: Form Panel ── */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              {/* Product info banner (if present) */}
              {productData && (
                <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Product
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {productData.name}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Segment
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {productData.segmentName}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {siteKey && (
                <Script
                  src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
                  strategy="lazyOnload"
                />
              )}

              {formFields.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-400">
                  No fields available.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    {formFields.map((field) => renderFormField(field))}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                      We&apos;ll get back to you within 24 hours.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-11 items-center justify-center rounded-lg bg-[#F7A707] px-7 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e09a06] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Send Enquiry"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="mt-0.5">
                {modal.type === "success" ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 border border-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 border border-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">
                  {modal.type === "success"
                    ? "Inquiry Submitted"
                    : "Submission Failed"}
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  {modal.message}
                </p>

                <button
                  onClick={() =>
                    setModal({
                      ...modal,
                      show: false,
                    })
                  }
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-[#F7A707] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#e09a06]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
