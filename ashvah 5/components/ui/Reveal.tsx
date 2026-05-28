"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  /** Translate distance in px. Default 24 */
  y?: number;
}

/**
 * Scroll-triggered fade-up. Honors `prefers-reduced-motion`.
 * Use as a transparent wrapper around any element you want to animate in.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 24,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
