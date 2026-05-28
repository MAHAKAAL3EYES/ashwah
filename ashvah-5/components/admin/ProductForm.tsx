"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProduct } from "@/lib/actions";
import type { CatalogueProduct } from "@/lib/catalogue";
import type { Category } from "@/types/database";

export function ProductForm({
  product,
  categories,
}: {
  product?: CatalogueProduct;
  categories: Category[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");
  const selectedIds = new Set(product?.category_ids ?? []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const formData = new FormData(e.currentTarget);
    const result = await saveProduct(formData);
    if (result.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setStatus("error");
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      <div className="space-y-px bg-hairline">
        {/* Basic info */}
        <FormSection title="Basic information">
          <Field label="Name" required>
            <input
              name="name"
              required
              defaultValue={product?.name}
              className="admin-input"
              placeholder="e.g. PC Loop Knit"
            />
          </Field>
          <Field label="Slug" hint="URL-safe. Auto-generated if left blank.">
            <input
              name="slug"
              defaultValue={product?.slug}
              className="admin-input"
              placeholder="pc-loop-knit"
            />
          </Field>
          <Field label="Short description">
            <textarea
              name="short_description"
              rows={2}
              defaultValue={product?.short_description ?? ""}
              className="admin-input resize-none"
              placeholder="One-line summary shown on cards."
            />
          </Field>
          <Field label="Full description">
            <textarea
              name="full_description"
              rows={4}
              defaultValue={product?.full_description ?? ""}
              className="admin-input resize-none"
              placeholder="Detailed description shown on the product page."
            />
          </Field>
        </FormSection>

        {/* Categories */}
        <FormSection title="Categories">
          <div className="bg-white p-4">
            <p className="mb-3 text-[10px] uppercase tracking-wider text-silver">
              Assign to one or more categories
              <span className="ml-1 text-ink">*</span>
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 border border-hairline px-3 py-2 text-sm transition-colors hover:border-graphite"
                >
                  <input
                    type="checkbox"
                    name="category_ids"
                    value={cat.id}
                    defaultChecked={selectedIds.has(cat.id)}
                    className="h-4 w-4 accent-ink"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
            {categories.length === 0 && (
              <p className="text-sm text-silver">
                No categories found. Create categories first.
              </p>
            )}
          </div>
        </FormSection>

        {/* Specs */}
        <FormSection title="Specifications">
          <div className="grid grid-cols-2 gap-px bg-hairline">
            <Field label="GSM" bare>
              <input
                name="gsm"
                type="number"
                defaultValue={product?.gsm ?? ""}
                className="admin-input"
                placeholder="170"
              />
            </Field>
            <Field label="Width" bare>
              <input
                name="width"
                defaultValue={product?.width ?? ""}
                className="admin-input"
                placeholder={'35" Tube'}
              />
            </Field>
          </div>
          <Field label="Fabric type">
            <input
              name="fabric_type"
              defaultValue={product?.fabric_type ?? ""}
              className="admin-input"
              placeholder="Loop Knit"
            />
          </Field>
          <Field label="Used for" hint="Comma-separated">
            <input
              name="used_for"
              defaultValue={product?.used_for?.join(", ") ?? ""}
              className="admin-input"
              placeholder="Lowers, Joggers, Shorts"
            />
          </Field>
          <Field label="Functionality" hint="Comma-separated">
            <input
              name="functionality"
              defaultValue={product?.functionality?.join(", ") ?? ""}
              className="admin-input"
              placeholder="4-way stretch, Breathable"
            />
          </Field>
        </FormSection>

        {/* Flags */}
        <FormSection title="Visibility & flags">
          <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
            <Toggle name="is_active" label="Live on site" defaultChecked={product?.is_active ?? true} />
            <Toggle name="is_star" label="Star product" defaultChecked={product?.is_star ?? false} />
            <Toggle name="is_customizable" label="Customizable" defaultChecked={product?.is_customizable ?? true} />
            <Toggle name="in_stock" label="In stock" defaultChecked={product?.in_stock ?? true} />
          </div>
          <Field label="Display order" hint="Lower numbers show first" bare>
            <input
              name="display_order"
              type="number"
              defaultValue={product?.display_order ?? 0}
              className="admin-input"
            />
          </Field>
        </FormSection>
      </div>

      {status === "error" && (
        <p className="mt-4 border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving…" : product?.id ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn-outline"
        >
          Cancel
        </button>
      </div>

      <style jsx global>{`
        .admin-input {
          width: 100%;
          background: #ffffff;
          border: none;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #111111;
          outline: none;
        }
        .admin-input:focus {
          background: #faf9f6;
          outline: 2px solid #0a2540;
          outline-offset: -2px;
        }
        .admin-input::placeholder {
          color: #8a8a8a;
        }
      `}</style>
    </form>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <p className="border-b border-hairline px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">
        {title}
      </p>
      <div className="space-y-px bg-hairline">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  bare,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  bare?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block bg-white">
      <span className="flex items-baseline justify-between px-4 pt-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-silver">
          {label}
          {required && <span className="ml-1 text-ink">*</span>}
        </span>
        {hint && <span className="text-[10px] text-silver">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Toggle({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center justify-between bg-white px-4 py-3">
      <span className="text-sm">{label}</span>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-ink"
      />
    </label>
  );
}
