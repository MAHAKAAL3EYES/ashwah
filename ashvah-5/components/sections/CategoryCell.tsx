"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Category } from "@/types/database";

interface CategoryCellProps {
  category: Category;
  index: number;
}

/**
 * Single category grid cell. Wipes in via clip-path on scroll, inverts to
 * graphite on hover with a weave texture, and nudges its arrow. The wipe
 * direction alternates by column for a woven, architectural feel.
 */
export function CategoryCell({ category, index }: CategoryCellProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="border-r border-t border-hairline"
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/fabrics/${category.slug}`}
        className="group relative block aspect-square overflow-hidden bg-white p-4 transition-colors duration-500 ease-editorial hover:bg-graphite sm:p-5"
        data-cursor="open"
      >
        <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-wider text-silver transition-colors group-hover:text-bone/60">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Weave texture on hover */}
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 6px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 6px)",
          }}
          aria-hidden
        />

        {/* Sliding accent line on hover */}
        <span
          className="absolute left-0 top-0 h-[2px] w-0 bg-ink transition-all duration-500 ease-editorial group-hover:w-full"
          aria-hidden
        />

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 sm:inset-x-5 sm:bottom-5">
          <h3 className="font-display text-base font-medium leading-tight text-graphite transition-colors duration-500 group-hover:text-bone sm:text-lg">
            {category.name}
          </h3>
          <span
            className="font-mono text-base text-silver transition-all duration-500 group-hover:translate-x-1 group-hover:text-bone"
            aria-hidden
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
