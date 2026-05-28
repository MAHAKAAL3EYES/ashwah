"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Best Quality",
  "Best Price",
  "500+ Fabrics",
  "10+ Years",
  "Pan India Delivery",
  "Custom Fabrics",
  "Direct Mill Relationships",
  "Wide Range",
];

/**
 * Infinite horizontal marquee. Two identical tracks sit side by side and
 * translate -50% on loop, creating a seamless scroll. A single accent diamond
 * separates each term. Pauses on hover.
 */
export function Marquee() {
  return (
    <div className="group relative overflow-hidden border-y border-hairline bg-graphite py-5">
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ animationPlayState: "running" }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-display text-2xl font-medium tracking-tight text-bone sm:text-3xl">
              {item}
            </span>
            <span
              className="block h-1.5 w-1.5 rotate-45 bg-ink"
              aria-hidden
            />
          </span>
        ))}
      </motion.div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-graphite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-graphite to-transparent" />
    </div>
  );
}
