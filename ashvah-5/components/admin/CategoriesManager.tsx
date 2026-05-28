"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, X } from "lucide-react";
import { saveCategory } from "@/lib/actions";
import type { Category } from "@/types/database";

export function CategoriesManager({
  categories,
  counts,
  editable,
}: {
  categories: Category[];
  counts: Record<string, number>;
  editable: boolean;
}) {
  const [editing, setEditing] = useState<Category | "new" | null>(null);

  return (
    <>
      {editable && (
        <div className="mb-6">
          <button onClick={() => setEditing("new")} className="btn-primary">
            <Plus size={16} />
            Add category
          </button>
        </div>
      )}

      <div className="border border-hairline bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-hairline text-left">
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Order</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Name</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Products</th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Status</th>
              {editable && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-silver tabular">
                  {String(cat.display_order).padStart(2, "0")}
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium">{cat.name}</span>
                  <span className="block font-mono text-xs text-silver">{cat.slug}</span>
                </td>
                <td className="px-4 py-3 tabular text-silver">{counts[cat.slug] ?? 0}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-silver">
                    {cat.is_active ? "Live" : "Hidden"}
                  </span>
                </td>
                {editable && (
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setEditing(cat)}
                      className="inline-flex h-8 w-8 items-center justify-center border border-hairline hover:border-graphite"
                      aria-label="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <CategoryModal
          category={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

function CategoryModal({
  category,
  onClose,
}: {
  category?: Category;
  onClose: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await saveCategory(formData);
      if (result.ok) {
        onClose();
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/30 p-4">
      <div className="w-full max-w-md border border-hairline bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <p className="font-display text-lg font-medium">
            {category ? "Edit category" : "Add category"}
          </p>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          {category?.id && <input type="hidden" name="id" value={category.id} />}
          <div className="space-y-4">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-silver">Name *</span>
              <input name="name" required defaultValue={category?.name} className="mt-1.5 w-full border border-hairline px-3 py-2.5 text-sm outline-none focus:border-graphite" />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-silver">Slug</span>
              <input name="slug" defaultValue={category?.slug} className="mt-1.5 w-full border border-hairline px-3 py-2.5 text-sm outline-none focus:border-graphite" placeholder="auto from name" />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-silver">Description</span>
              <textarea name="description" rows={3} defaultValue={category?.description ?? ""} className="mt-1.5 w-full resize-none border border-hairline px-3 py-2.5 text-sm outline-none focus:border-graphite" />
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-silver">Order</span>
                <input name="display_order" type="number" defaultValue={category?.display_order ?? 0} className="w-20 border border-hairline px-3 py-2 text-sm outline-none focus:border-graphite" />
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="is_active" defaultChecked={category?.is_active ?? true} className="h-4 w-4 accent-ink" />
                <span className="text-sm">Live</span>
              </label>
            </div>
          </div>

          {error && <p className="mt-4 text-xs text-destructive">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button type="submit" disabled={isPending} className="btn-primary disabled:opacity-60">
              {isPending ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
