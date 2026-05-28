"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

const ENQUIRY_TYPES = [
  "Bulk Fabric Order",
  "Custom Fabric",
  "Sample Request",
  "Reseller Enquiry",
  "Manufacturer Enquiry",
];

const FABRIC_CATEGORIES = [
  "Lowers",
  "Sweat Shirts",
  "Joggers",
  "Cargos",
  "Shorts",
  "Sandos",
  "T-Shirts",
  "Sports Kits",
  "Track Suits",
  "Jackets",
  "Lining & Designing",
  "Not sure / Other",
];

const CONTACT_METHODS = ["WhatsApp", "Call", "Email"];

interface EnquiryFormProps {
  /** Pre-fill the fabric category (e.g. from a category page) */
  prefillCategory?: string;
  /** Pre-fill the product/category slug so staff see what it's about */
  prefillSlug?: string;
  /** Pre-fill the enquiry type */
  prefillType?: string;
}

export function EnquiryForm({
  prefillCategory,
  prefillSlug,
  prefillType,
}: EnquiryFormProps = {}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fabric_category: prefillCategory ?? "",
      product_slug: prefillSlug ?? "",
      enquiry_type: prefillType ?? "",
    },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error ?? "Submission failed");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-graphite bg-white p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-ink">
          Enquiry received
        </p>
        <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
          Thanks — we&apos;ll be in touch shortly.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-silver">
          A member of our team will reach out on the number you provided within
          one working day. For urgent requests, WhatsApp us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-hairline bg-white"
      noValidate
    >
      <div className="border-b border-hairline px-6 py-4">
        <p className="font-mono text-xs uppercase tracking-wider text-silver">
          Enquiry form
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
        <Field label="Name" required error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className="enquiry-input"
            placeholder="Your full name"
          />
        </Field>
        <Field label="Phone" required error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className="enquiry-input"
            placeholder="+91 ..."
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className="enquiry-input"
            placeholder="you@brand.com"
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            type="text"
            autoComplete="organization"
            {...register("company")}
            className="enquiry-input"
            placeholder="Optional"
          />
        </Field>
        <Field label="City" error={errors.city?.message} className="sm:col-span-2">
          <input
            type="text"
            autoComplete="address-level2"
            {...register("city")}
            className="enquiry-input"
            placeholder="Where are you based?"
          />
        </Field>

        <Field label="Enquiry type" error={errors.enquiry_type?.message}>
          <select {...register("enquiry_type")} className="enquiry-input">
            <option value="">Select…</option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fabric category" error={errors.fabric_category?.message}>
          <select {...register("fabric_category")} className="enquiry-input">
            <option value="">Select…</option>
            {FABRIC_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Estimated requirement"
          error={errors.requirement_qty?.message}
        >
          <input
            type="text"
            {...register("requirement_qty")}
            className="enquiry-input"
            placeholder="e.g. 500 kg / 2000 m / ongoing"
          />
        </Field>
        <Field
          label="Preferred contact"
          error={errors.preferred_contact?.message}
        >
          <select {...register("preferred_contact")} className="enquiry-input">
            <option value="">Select…</option>
            {CONTACT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Message"
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <textarea
            {...register("message")}
            rows={4}
            className="enquiry-input resize-none"
            placeholder="Fabrics you're after, GSM ranges, quantities, anything else we should know."
          />
        </Field>
      </div>

      {/* Hidden prefill — tells staff which product/category this came from */}
      <input type="hidden" {...register("product_slug")} />

      {/* Honeypot — hidden from humans, catches bots */}
      <div className="hidden" aria-hidden>
        <label>
          Website (leave blank)
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="flex items-center justify-between border-t border-hairline px-6 py-4">
        <p className="font-mono text-xs uppercase tracking-wider text-silver">
          We reply within one working day
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send Enquiry"}
          {status !== "submitting" && <span aria-hidden>→</span>}
        </button>
      </div>

      {status === "error" && errorMsg && (
        <p className="border-t border-destructive bg-destructive/5 px-6 py-3 text-xs text-destructive">
          {errorMsg}
        </p>
      )}

      <style jsx>{`
        :global(.enquiry-input) {
          width: 100%;
          background: #ffffff;
          border: none;
          padding: 1.25rem 1.5rem;
          font-family: var(--font-inter);
          font-size: 0.9375rem;
          color: #111111;
          outline: none;
          transition: background-color 0.2s ease;
        }
        :global(.enquiry-input::placeholder) {
          color: #8a8a8a;
        }
        :global(.enquiry-input:focus) {
          background: #faf9f6;
        }
        :global(.enquiry-input:focus-visible) {
          outline: 2px solid #0a2540;
          outline-offset: -2px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "block bg-white",
        error && "ring-1 ring-inset ring-destructive/40",
        className
      )}
    >
      <span className="block px-6 pt-4 font-mono text-[10px] uppercase tracking-wider text-silver">
        {label}
        {required && <span className="ml-1 text-ink">*</span>}
      </span>
      {children}
      {error && (
        <span className="block px-6 pb-3 text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
