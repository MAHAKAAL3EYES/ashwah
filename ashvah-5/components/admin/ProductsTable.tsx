"use client";

import { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import { Search, Eye, EyeOff, Pencil } from "lucide-react";
import { toggleProductActive } from "@/lib/actions";
import { cn } from "@/lib/utils";
import type { CatalogueProduct } from "@/lib/catalogue";

export function ProductsTable({
  products,
  editable,
}: {
  products: CatalogueProduct[];
  editable: boolean;
}) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.fabric_type ?? "").toLowerCase().includes(q) ||
        p.category_names.some((c) => c.toLowerCase().includes(q))
    );
  }, [products, query]);

  const handleToggle = (id: string, current: boolean) => {
    setPendingId(id);
    startTransition(async () => {
      await toggleProductActive(id, !current);
      setPendingId(null);
    });
  };

  return (
    <div className="border border-hairline bg-white">
      {/* Search */}
      <div className="flex items-center gap-3 border-b border-hairline px-4">
        <Search size={16} className="text-silver" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-silver"
        />
        <span className="font-mono text-xs text-silver">{filtered.length}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-hairline text-left">
              <Th>Name</Th>
              <Th>Categories</Th>
              <Th>GSM</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {p.is_star && (
                      <span className="font-mono text-[10px] text-ink">★</span>
                    )}
                    <span className="font-medium">{p.name}</span>
                  </div>
                  <span className="font-mono text-xs text-silver">{p.slug}</span>
                </td>
                <td className="px-4 py-3 text-silver">
                  {p.category_names.join(", ") || "—"}
                </td>
                <td className="px-4 py-3 tabular">{p.gsm ?? "—"}</td>
                <td className="px-4 py-3 text-silver">{p.fabric_type ?? "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider",
                      p.is_active ? "text-graphite" : "text-silver"
                    )}
                  >
                    <span
                      className={cn(
                        "block h-1.5 w-1.5 rounded-full",
                        p.is_active ? "bg-ink" : "bg-hairline-strong"
                      )}
                    />
                    {p.is_active ? "Live" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {editable ? (
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center border border-hairline transition-colors hover:border-graphite"
                        aria-label="Edit"
                      >
                        <Pencil size={13} />
                      </Link>
                      <button
                        onClick={() => handleToggle(p.id, p.is_active)}
                        disabled={isPending && pendingId === p.id}
                        className="inline-flex h-8 w-8 items-center justify-center border border-hairline transition-colors hover:border-graphite disabled:opacity-40"
                        aria-label={p.is_active ? "Hide" : "Show"}
                      >
                        {p.is_active ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-silver">View only</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-silver">
                  No products match "{query}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 font-mono text-[10px] font-medium uppercase tracking-wider text-silver">
      {children}
    </th>
  );
}
