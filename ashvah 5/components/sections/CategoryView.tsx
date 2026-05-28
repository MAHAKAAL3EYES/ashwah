import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { whatsappLink } from "@/lib/utils";
import type { Category } from "@/types/database";
import type { CatalogueProduct } from "@/lib/catalogue";

interface CategoryViewProps {
  category: Category;
  products: CatalogueProduct[];
}

export function CategoryView({ category, products }: CategoryViewProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-hairline">
        <div className="editorial-container flex items-center gap-2 py-4 font-mono text-xs uppercase tracking-wider text-silver">
          <Link href="/fabrics" className="hover:text-graphite">
            Fabrics
          </Link>
          <span aria-hidden>/</span>
          <span className="text-graphite">{category.name}</span>
        </div>
      </div>

      {/* Category header */}
      <section className="border-b border-hairline">
        <div className="editorial-container py-section-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-6">
            <p className="eyebrow">Category</p>
            <p className="hidden font-mono text-xs uppercase tracking-wider text-silver sm:block">
              {products.length} {products.length === 1 ? "fabric" : "fabrics"}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-display-xl">
                <MaskReveal lines={[category.name]} />
              </h1>
            </div>
            {category.description && (
              <Reveal delay={0.2} className="lg:col-span-5">
                <p className="text-base leading-relaxed text-silver">
                  {category.description}
                </p>
                <Magnetic strength={0.3}>
                  <a
                    href={whatsappLink(
                      "919053060101",
                      `Hi ASHVAH, I'd like to enquire about your ${category.name} fabrics.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-8"
                    data-cursor="enquire"
                  >
                    Enquire about {category.name}
                    <span aria-hidden>→</span>
                  </a>
                </Magnetic>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="editorial-container py-section-sm">
        {products.length === 0 ? (
          <div className="border border-hairline bg-white py-24 text-center">
            <p className="font-display text-2xl">
              Fabrics in this category are being catalogued.
            </p>
            <p className="mt-3 text-sm text-silver">
              Contact us directly — we hold far more stock than is listed online.
            </p>
            <a
              href={whatsappLink(
                "919053060101",
                `Hi ASHVAH, what ${category.name} fabrics do you currently stock?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8"
            >
              Ask on WhatsApp
            </a>
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
