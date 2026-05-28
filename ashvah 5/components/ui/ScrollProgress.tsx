"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Ultra-thin scroll progress bar pinned just under the header.
 * Ink-blue accent, the one place colour is allowed to assert itself.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-[72px] z-40 h-[2px] origin-left bg-ink"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
