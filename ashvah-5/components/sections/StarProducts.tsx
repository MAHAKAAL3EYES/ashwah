import Link from "next/link";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { FabricSwatch } from "@/components/ui/FabricSwatch";
import type { Product } from "@/types/database";

type StarProduct = Product & { primary_image_url: string | null };

interface StarProductsProps {
  products: StarProduct[];
}

export function StarProducts({ products }: StarProductsProps) {
  return (
    <SectionFrame
      eyebrow="Star Products"
      rail="04 / Highlights"
      className="bg-white"
    >
      <Reveal>
        <h2 className="max-w-[20ch] text-display-lg">
          The fabrics our customers
          <br />
          <span className="text-silver">come back for.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px bg-hairline lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal
            key={product.id}
            delay={i * 0.1}
            className="bg-white p-8 sm:p-10"
          >
            <article className="flex h-full flex-col">
              {/* Swatch / image area — aspect-square, 3D tilt on hover */}
              <TiltCard className="relative" max={9}>
                <Link
                  href={`/fabrics/${product.slug}`}
                  className="group relative block aspect-square overflow-hidden border border-hairline bg-bone"
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
                  <FabricSwatch index={i} />
                )}
                <span className="absolute left-3 top-3 bg-graphite px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">
                  Star · {String(i + 1).padStart(2, "0")}
                </span>
                </Link>
              </TiltCard>

              {/* Name + short description */}
              <div className="mt-6">
                <h3 className="font-display text-2xl font-medium tracking-tight">
                  {product.name}
                </h3>
                {product.short_description && (
                  <p className="mt-3 text-sm leading-relaxed text-silver">
                    {product.short_description}
                  </p>
                )}
              </div>

              {/* Spec sheet */}
              <dl className="mt-6 flex-1">
                <SpecRow label="Weight" value={product.gsm ? `${product.gsm} GSM` : "On enquiry"} />
                <SpecRow label="Width" value={product.width ?? "On enquiry"} />
                <SpecRow label="Type" value={product.fabric_type ?? "—"} />
                <SpecRow
                  label="Used for"
                  value={
                    product.used_for && product.used_for.length > 0
                      ? product.used_for.join(", ")
                      : "—"
                  }
                />
                {product.functionality && product.functionality.length > 0 && (
                  <SpecRow
                    label="Function"
                    value={product.functionality.join(" · ")}
                  />
                )}
              </dl>

              {/* CTA */}
              <Link
                href={`/fabrics/${product.slug}`}
                className="btn-outline mt-8"
              >
                View specifications
                <span aria-hidden>→</span>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="spec-row">
      <dt>{label}</dt>
      <dd className="text-right tabular">{value}</dd>
    </div>
  );
}
