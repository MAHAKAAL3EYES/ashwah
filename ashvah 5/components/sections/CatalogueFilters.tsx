"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { Category } from "@/types/database";
import { cn } from "@/lib/utils";

interface CatalogueFiltersProps {
  categories: Category[];
  resultCount: number;
}

export function CatalogueFilters({
  categories,
  resultCount,
}: CatalogueFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSearch = searchParams.get("search") ?? "";
  const starOnly = searchParams.get("star") === "1";
  const customOnly = searchParams.get("custom") === "1";

  const [searchInput, setSearchInput] = useState(activeSearch);

  // Keep local input in sync when params change externally
  useEffect(() => {
    setSearchInput(activeSearch);
  }, [activeSearch]);

  const setParam = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === "") params.delete(k);
        else params.set(k, v);
      });
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== activeSearch) {
        setParam({ search: searchInput || null });
      }
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const hasActiveFilters =
    activeCategory || activeSearch || starOnly || customOnly;

  return (
    <div className="sticky top-[72px] z-30 border-b border-hairline bg-bone/80 backdrop-blur-md">
      <div className="editorial-container py-5">
        {/* Search row */}
        <div className="flex items-center gap-3 border border-hairline bg-white px-4">
          <Search size={16} className="shrink-0 text-silver" aria-hidden />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by fabric name, type, or use case…"
            className="w-full bg-transparent py-3.5 text-sm text-graphite outline-none placeholder:text-silver"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="shrink-0 text-silver hover:text-graphite"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category pills + toggles */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <FilterPill
            active={!activeCategory}
            onClick={() => setParam({ category: null })}
          >
            All
          </FilterPill>
          {categories.map((cat) => (
            <FilterPill
              key={cat.id}
              active={activeCategory === cat.slug}
              onClick={() =>
                setParam({
                  category: activeCategory === cat.slug ? null : cat.slug,
                })
              }
            >
              {cat.name}
            </FilterPill>
          ))}

          <span className="mx-1 hidden h-5 w-px bg-hairline sm:block" />

          <FilterPill
            active={starOnly}
            onClick={() => setParam({ star: starOnly ? null : "1" })}
          >
            ★ Star only
          </FilterPill>
          <FilterPill
            active={customOnly}
            onClick={() => setParam({ custom: customOnly ? null : "1" })}
          >
            Customizable
          </FilterPill>
        </div>

        {/* Result count + clear */}
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <p
            className={cn(
              "font-mono text-xs uppercase tracking-wider text-silver transition-opacity",
              isPending && "opacity-40"
            )}
          >
            {resultCount} {resultCount === 1 ? "fabric" : "fabrics"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() =>
                setParam({
                  category: null,
                  search: null,
                  star: null,
                  custom: null,
                })
              }
              className="font-mono text-xs uppercase tracking-wider text-graphite underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-300",
        active
          ? "border-graphite bg-graphite text-bone"
          : "border-hairline bg-white text-silver hover:border-graphite hover:text-graphite"
      )}
    >
      {children}
    </button>
  );
}
