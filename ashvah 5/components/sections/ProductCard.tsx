import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import { FabricSwatch } from "@/components/ui/FabricSwatch";
import type { CatalogueProduct } from "@/lib/catalogue";

interface ProductCardProps {
  product: CatalogueProduct;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col bg-white p-6 sm:p-8">
      <TiltCard className="relative" max={8}>
        <Link
          href={`/fabrics/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden border border-hairline bg-bone"
          data-cursor="view"
        >
          {product.primary_image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.primary_image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
            />
          ) : (
            <FabricSwatch index={index} />
          )}

          {product.is_star && (
            <span className="absolute left-3 top-3 bg-graphite px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">
              Star
            </span>
          )}
          {!product.in_stock && (
            <span className="absolute right-3 top-3 border border-graphite bg-bone px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-graphite">
              On enquiry
            </span>
          )}
        </Link>
      </TiltCard>

      <div className="mt-5 flex flex-1 flex-col">
        {/* Category tags */}
        {product.category_names.length > 0 && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-silver">
            {product.category_names.slice(0, 2).join(" · ")}
          </p>
        )}

        <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
          <Link href={`/fabrics/${product.slug}`} className="hover:text-ink">
            {product.name}
          </Link>
        </h3>

        {/* Mini spec line */}
        <p className="mt-2 font-mono text-xs text-silver tabular">
          {[
            product.gsm ? `${product.gsm} GSM` : null,
            product.width,
            product.fabric_type,
          ]
            .filter(Boolean)
            .join("  ·  ") || "Specifications on enquiry"}
        </p>

        {product.short_description && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-silver">
            {product.short_description}
          </p>
        )}

        <Link
          href={`/fabrics/${product.slug}`}
          className="link-arrow mt-auto pt-5"
          data-cursor="view"
        >
          View details
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
