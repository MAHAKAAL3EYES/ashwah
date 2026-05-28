import type { Metadata } from "next";
import { BrandOverview } from "@/components/sections/BrandOverview";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CustomFabric } from "@/components/sections/CustomFabric";
import { Marquee } from "@/components/sections/Marquee";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "ASHVAH — House of Fabrics. A B2B sportswear and activewear fabric supplier established 2011, based in Rohtak, serving manufacturers across India.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="editorial-container py-section-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-6">
            <p className="eyebrow">About ASHVAH</p>
            <p className="hidden font-mono text-xs uppercase tracking-wider text-silver sm:block">
              Established 2011
            </p>
          </div>
          <h1 className="mt-12 max-w-[18ch] text-display-xl">
            <MaskReveal
              lines={[
                "Fourteen years",
                <span key="2" className="text-silver">inside the loom.</span>,
              ]}
            />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-silver">
              ASHVAH supplies domestic and international fabrics for gym wear,
              shorts, jackets, trousers, t-shirts, track suits, sports kits,
              joggers, cargos, sandos, and activewear. We work with fabric
              resellers, garment manufacturers, sportswear brands, and designers
              — the people who actually build product.
            </p>
          </Reveal>
        </div>
      </section>

      <BrandOverview />
      <Marquee />
      <WhyChoose />
      <CustomFabric />
    </>
  );
}
