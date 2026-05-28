import Link from "next/link";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { CategoryCell } from "@/components/sections/CategoryCell";
import type { Category } from "@/types/database";

interface CategoryUniverseProps {
  categories: Category[];
}

export function CategoryUniverse({ categories }: CategoryUniverseProps) {
  return (
    <SectionFrame eyebrow="The Catalogue" rail="03 / Fabrics" id="fabrics">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-display-lg">
            <MaskReveal
              lines={[
                "Eleven categories.",
                <span key="2" className="text-silver">One archive.</span>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-silver">
              Each category is a working spec — sorted by garment type, with
              every fabric tagged by GSM, width, and use case. Browse by need;
              order by name.
            </p>
            <Link href="/fabrics" className="link-arrow mt-8 inline-flex" data-cursor="view">
              View full catalogue
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        {/* Architectural grid */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 border-b border-l border-hairline md:grid-cols-3">
            {categories.map((cat, i) => (
              <CategoryCell key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
