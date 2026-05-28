"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    index: "01",
    title: "Sourcing",
    headline: "Sourced from mills, not middlemen.",
    body: "We source from the most renowned mills working with natural fibres (cotton, linen, silk) and synthetic fibres (polyester, nylon). For exclusive constructions, we work directly with mill owners — designing dyeing, printing, and finishing protocols to brief.",
  },
  {
    index: "02",
    title: "Quality Control",
    headline: "Every metre checked, before it leaves us.",
    body: "Quality control starts at the thread stage and runs through dyeing and finishing. We test for colorfastness, strength, shrinkage, and abrasion resistance — ensuring the fabric holds its shape and shade through wash and wear. Every shipment is inspected again at our warehouses.",
  },
  {
    index: "03",
    title: "Warehousing & Supply",
    headline: "Stocked deep, shipped fast.",
    body: "Our warehouses hold every fabric in our active catalogue — natural and synthetic, ready in commercial quantities. We package, ship, and track inventory to ensure on-time delivery anywhere in India. Reorder cycles are managed continuously to prevent stockouts.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll — translate the inner track
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <SectionFrame
      eyebrow="Process"
      rail="06 / How we work"
      id="process"
      className="bg-white"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 className="max-w-[16ch] text-display-lg">
            How a fabric reaches
            <br />
            <span className="text-silver">your factory floor.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6">
          <p className="max-w-md text-base leading-relaxed text-silver">
            Three stages — sourcing, quality control, and warehousing —
            engineered so that what you order in Rohtak ships consistently to
            anywhere in India.
          </p>
        </Reveal>
      </div>

      {/* Mobile fallback — vertical stack */}
      <div className="mt-16 grid grid-cols-1 gap-px border border-hairline bg-hairline md:hidden">
        {STEPS.map((step) => (
          <StepCard key={step.index} step={step} />
        ))}
      </div>

      {/* Desktop horizontal scroll */}
      <div ref={containerRef} className="relative mt-16 hidden h-[300vh] md:block">
        <div className="sticky top-[10vh] h-[80vh] overflow-hidden border border-hairline">
          <motion.div
            style={{ x }}
            className="flex h-full"
          >
            {STEPS.map((step, i) => (
              <div
                key={step.index}
                className="flex h-full w-full shrink-0 flex-col justify-between p-10 sm:p-14 lg:p-20"
                style={{
                  borderRight: i < STEPS.length - 1 ? "1px solid #E5E5E5" : "none",
                  background: i % 2 === 0 ? "#FFFFFF" : "#FAF9F6",
                }}
              >
                {/* Top: index + title */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-sm uppercase tracking-wider text-silver">
                      Step {step.index}
                    </p>
                    <h3 className="mt-3 font-display text-display-md font-medium tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-silver">
                    0{i + 1} / 03
                  </p>
                </div>

                {/* Middle: industrial connecting line */}
                <div className="my-12 flex items-center gap-4" aria-hidden>
                  <span className="h-[1px] flex-1 bg-graphite" />
                  <span className="block h-2 w-2 rotate-45 border border-graphite" />
                  <span className="h-[1px] w-12 bg-graphite/30" />
                </div>

                {/* Bottom: copy */}
                <div className="max-w-2xl">
                  <h4 className="font-display text-2xl font-medium leading-tight tracking-tight">
                    {step.headline}
                  </h4>
                  <p className="mt-6 text-base leading-relaxed text-silver">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Progress rail at bottom of viewport */}
          <div className="absolute inset-x-0 bottom-0 border-t border-hairline bg-bone/80 backdrop-blur">
            <div className="flex items-center justify-between px-10 py-3 sm:px-14 lg:px-20">
              <p className="font-mono text-xs uppercase tracking-wider text-silver">
                Scroll to advance →
              </p>
              <div className="flex gap-2">
                {STEPS.map((_, i) => (
                  <ProgressDot
                    key={i}
                    progress={scrollYProgress}
                    start={i / STEPS.length}
                    end={(i + 1) / STEPS.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function ProgressDot({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const bg = useTransform(progress, [start, end], ["#E5E5E5", "#111111"]);
  return <motion.span className="h-[2px] w-10" style={{ backgroundColor: bg }} />;
}

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <div className="bg-bone p-8">
      <div className="flex items-baseline gap-4">
        <p className="font-mono text-sm uppercase tracking-wider text-silver">
          Step {step.index}
        </p>
        <span className="h-[1px] flex-1 bg-hairline" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
        {step.title}
      </h3>
      <h4 className="mt-2 font-display text-lg leading-snug text-graphite">
        {step.headline}
      </h4>
      <p className="mt-4 text-sm leading-relaxed text-silver">{step.body}</p>
    </div>
  );
}
