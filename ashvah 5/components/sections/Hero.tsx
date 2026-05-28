import Link from "next/link";
import { FabricRibbonClient } from "@/components/3d/FabricRibbonClient";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroScrollCue } from "@/components/sections/HeroScrollCue";
import type { HeroContent } from "@/types/database";

interface HeroProps {
  hero: HeroContent;
}

export function Hero({ hero }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden grain">
      {/* 3D layer */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-y-0 right-0 w-full md:w-[68%] lg:w-[62%]">
          <FabricRibbonClient />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #FAF9F6 0%, rgba(250,249,246,0.92) 35%, rgba(250,249,246,0.4) 60%, rgba(250,249,246,0.1) 100%)",
          }}
        />
      </div>

      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,17,17,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="editorial-container relative z-10 flex min-h-[calc(100vh-72px)] flex-col justify-between py-section-sm">
        {/* Top eyebrow rail */}
        <div className="flex items-center justify-between border-b border-hairline pb-6">
          <p className="eyebrow">{hero.eyebrow}</p>
          <p className="hidden font-mono text-xs uppercase tracking-wider text-silver sm:block">
            Delhi NCR · Pan India · B2B Supply
          </p>
        </div>

        {/* Main hero */}
        <div className="flex flex-1 flex-col justify-center py-16">
          <h1 className="text-display-2xl">
            <MaskReveal
              lines={[
                "Performance fabrics,",
                <span key="2" className="text-silver">engineered for India&apos;s</span>,
                "activewear makers.",
              ]}
            />
          </h1>

          <MaskReveal
            className="mt-10 block max-w-xl text-base leading-relaxed text-silver md:text-lg"
            delay={0.3}
            lines={[
              <>
                {hero.subtitle}{" "}
                <span className="text-graphite">
                  Built for manufacturers who demand consistency, speed, and
                  material confidence.
                </span>
              </>,
            ]}
          />

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.4}>
              <Link href={hero.primary_cta_href} className="btn-primary" data-cursor="explore">
                {hero.primary_cta_label}
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a
                href={hero.secondary_cta_href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                {hero.secondary_cta_label}
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Scroll cue */}
        <HeroScrollCue />
      </div>
    </section>
  );
}
