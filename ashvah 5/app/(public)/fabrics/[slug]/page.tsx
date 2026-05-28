import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductCard } from "@/components/sections/ProductCard";
import { CategoryView } from "@/components/sections/CategoryView";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  getProductBySlug,
  getAllProductSlugs,
  getCategoryBySlug,
  getAllCategorySlugs,
  getCatalogueProducts,
} from "@/lib/catalogue";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const [productSlugs, categorySlugs] = await Promise.all([
    getAllProductSlugs(),
    getAllCategorySlugs(),
  ]);
  // Both share the /fabrics/[slug] space
  return [...categorySlugs, ...productSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Category first
  const category = await getCategoryBySlug(params.slug);
  if (category) {
    return {
      title: category.seo_title ?? category.name,
      description:
        category.seo_description ??
        category.description ??
        `${category.name} fabrics from ASHVAH.`,
    };
  }

  const result = await getProductBySlug(params.slug);
  if (!result) return { title: "Fabric not found" };
  const { product } = result;
  return {
    title: product.seo_title ?? product.name,
    description:
      product.seo_description ??
      product.short_description ??
      `${product.name} — available from ASHVAH, House of Fabrics.`,
  };
}

export default async function FabricSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // 1. Is this a category?
  const category = await getCategoryBySlug(params.slug);
  if (category) {
    const products = await getCatalogueProducts({ category: params.slug });
    return <CategoryView category={category} products={products} />;
  }

  // 2. Otherwise treat as a product
  const result = await getProductBySlug(params.slug);
  if (!result) notFound();

  const { product, images, related } = result;

  const enquiryMessage = `Hi ASHVAH, I'd like to enquire about ${product.name}${
    product.gsm ? ` (${product.gsm} GSM)` : ""
  }. Please share pricing and availability.`;

  const specs: Array<[string, string | null]> = [
    ["Weight", product.gsm ? `${product.gsm} GSM` : null],
    ["Width", product.width],
    ["Construction", product.fabric_type],
    ["Used for", product.used_for?.join(", ") ?? null],
    ["Functionality", product.functionality?.join(" · ") ?? null],
    ["Customizable", product.is_customizable ? "Yes — on order" : "Standard only"],
    ["Availability", product.in_stock ? "In stock" : "On enquiry"],
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-hairline">
        <div className="editorial-container flex items-center gap-2 py-4 font-mono text-xs uppercase tracking-wider text-silver">
          <Link href="/fabrics" className="hover:text-graphite">
            Fabrics
          </Link>
          <span aria-hidden>/</span>
          {product.category_slugs[0] && (
            <>
              <Link
                href={`/fabrics/${product.category_slugs[0]}`}
                className="hover:text-graphite"
              >
                {product.category_names[0]}
              </Link>
              <span aria-hidden>/</span>
            </>
          )}
          <span className="text-graphite">{product.name}</span>
        </div>
      </div>

      {/* Hero — split editorial layout */}
      <section className="border-b border-hairline">
        <div className="editorial-container grid grid-cols-1 gap-px bg-hairline lg:grid-cols-2">
          <div className="bg-bone p-6 sm:p-10 lg:p-14">
            <ProductGallery
              images={images}
              productName={product.name}
              isStar={product.is_star}
            />
          </div>

          <div className="flex flex-col bg-bone p-6 sm:p-10 lg:p-14">
            <div className="flex flex-wrap gap-2">
              {product.category_names.map((name, i) => (
                <Link
                  key={i}
                  href={`/fabrics/${product.category_slugs[i]}`}
                  className="border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-silver transition-colors hover:border-graphite hover:text-graphite"
                >
                  {name}
                </Link>
              ))}
            </div>

            <h1 className="mt-6 text-display-lg">
              <MaskReveal lines={[product.name]} />
            </h1>

            {product.short_description && (
              <Reveal delay={0.15}>
                <p className="mt-6 text-base leading-relaxed text-silver">
                  {product.short_description}
                </p>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <dl className="mt-10 border-t border-hairline">
                {specs.map(([label, value]) => (
                  <div key={label} className="spec-row">
                    <dt>{label}</dt>
                    <dd className="text-right tabular">
                      {value ?? (
                        <span className="text-silver">Available on enquiry</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={0.3} className="flex-1">
                <a
                  href={whatsappLink("919053060101", enquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                  data-cursor="enquire"
                >
                  Enquire on WhatsApp
                  <span aria-hidden>→</span>
                </a>
              </Magnetic>
              <Link
                href={`/contact?slug=${product.slug}${
                  product.category_names[0]
                    ? `&category=${encodeURIComponent(product.category_names[0])}`
                    : ""
                }&type=${encodeURIComponent("Bulk Fabric Order")}`}
                className="btn-outline flex-1"
              >
                Request a quote
              </Link>
            </div>

            <p className="mt-6 font-mono text-xs leading-relaxed text-silver">
              Specifications available on enquiry for any field marked above.
              Most constructions can be customised by colour, GSM, and finish on
              order.
            </p>
          </div>
        </div>
      </section>

      {product.full_description && (
        <section className="border-b border-hairline bg-white">
          <div className="editorial-container py-section-sm">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="eyebrow">About this fabric</p>
              </div>
              <Reveal className="lg:col-span-9">
                <p className="max-w-3xl text-lg leading-relaxed text-graphite">
                  {product.full_description}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="editorial-container py-section-sm">
          <div className="mb-12 flex items-center justify-between border-b border-hairline pb-6">
            <p className="eyebrow">Related fabrics</p>
            <Link href="/fabrics" className="link-arrow" data-cursor="view">
              All fabrics <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
