import type { Metadata } from "next";
import { CatalogueFilters } from "@/components/sections/CatalogueFilters";
import { ProductCard } from "@/components/sections/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { getCategories } from "@/lib/queries";
import { getCatalogueProducts, type ProductFilters } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Fabric Catalogue",
  description:
    "Browse ASHVAH's full range of sportswear and activewear fabrics — knit, woven, and technical constructions. Filter by category, GSM, and use case.",
};

export const revalidate = 300;

interface PageProps {
  searchParams: {
    category?: string;
    search?: string;
    star?: string;
    custom?: string;
  };
}

export default async function FabricsPage({ searchParams }: PageProps) {
  const filters: ProductFilters = {
    category: searchParams.category,
    search: searchParams.search,
    starOnly: searchParams.star === "1",
    customizableOnly: searchParams.custom === "1",
  };

  const [categories, products] = await Promise.all([
    getCategories(),
    getCatalogueProducts(filters),
  ]);

  return (
    <>
      {/* Page header */}
      <section className="border-b border-hairline">
        <div className="editorial-container py-section-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-6">
            <p className="eyebrow">The Catalogue</p>
            <p className="hidden font-mono text-xs uppercase tracking-wider text-silver sm:block">
              500+ fabrics · 11 categories
            </p>
          </div>
          <h1 className="mt-12 text-display-xl">
            <MaskReveal
              lines={[
                "Every fabric,",
                <span key="2" className="text-silver">one archive.</span>,
              ]}
            />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-silver">
              Filter by garment category, search by fabric name or use case, and
              open any fabric for full specifications. Customisation is available
              on most constructions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <CatalogueFilters categories={categories} resultCount={products.length} />

      {/* Grid */}
      <section className="editorial-container py-section-sm">
        {products.length === 0 ? (
          <div className="border border-hairline bg-white py-24 text-center">
            <p className="font-display text-2xl">No fabrics match those filters.</p>
            <p className="mt-3 text-sm text-silver">
              Try clearing a filter or searching a different term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
