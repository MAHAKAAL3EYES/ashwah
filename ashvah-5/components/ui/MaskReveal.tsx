"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaskRevealProps {
  /** Each child is treated as one line and revealed in sequence */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

/**
 * Editorial headline reveal — each line slides up from behind an overflow
 * mask, staggered. The signature motion of high-end fashion/agency sites.
 */
export function MaskReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: MaskRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
