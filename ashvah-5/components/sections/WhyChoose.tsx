"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";

const PROOF_POINTS = [
  {
    label: "Best Quality",
    body: "Quality control begins at thread sourcing and continues through dyeing, finishing, and warehousing.",
  },
  {
    label: "Best Price",
    body: "Direct mill relationships remove every middleman between us and the loom.",
  },
  {
    label: "Wide Range",
    body: "Over five hundred fabrics across eleven categories — knit, woven, technical.",
  },
  {
    label: "Custom Fabrics",
    body: "Bespoke colour, design, pattern, fabric type, and finish on special order.",
  },
];

const STATS = [
  { label: "Years in textiles", value: "14", suffix: "+" },
  { label: "Fabrics in catalogue", value: "500", suffix: "+" },
  { label: "Categories", value: "11", suffix: "" },
  { label: "Pan-India delivery", value: "100", suffix: "%" },
];

export function WhyChoose() {
  return (
    <SectionFrame
      eyebrow="Why ASHVAH"
      rail="05 / Proof"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="max-w-[12ch] text-display-lg">
            Proof, not
            <br />
            <span className="text-silver">promises.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-silver">
            Manufacturers compare suppliers on three axes: consistency, speed,
            and material confidence. We&apos;ve been earning all three since
            2011.
          </p>
        </Reveal>

        {/* Stat counters */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline">
            {STATS.map((s, i) => (
              <StatCounter key={s.label} stat={s} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>

      {/* Proof points row */}
      <div className="mt-16 grid grid-cols-1 gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
        {PROOF_POINTS.map((p, i) => (
          <Reveal
            key={p.label}
            delay={i * 0.08}
            className="bg-bone p-6 sm:p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-silver">
              0{i + 1}
            </p>
            <h3 className="mt-4 font-display text-xl font-medium tracking-tight">
              {p.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-silver">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}

/**
 * Numeric stat counter that animates from 0 to target when scrolled into view.
 */
function StatCounter({
  stat,
  delay,
}: {
  stat: { label: string; value: string; suffix: string };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const target = parseInt(stat.value, 10);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now() + delay * 1000;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-bone p-6 sm:p-8"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-silver">
        {stat.label}
      </p>
      <p className="mt-3 font-display text-display-md tabular leading-none tracking-tight text-graphite">
        {count}
        <span className="text-ink">{stat.suffix}</span>
      </p>
    </motion.div>
  );
}
