"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Branded intro overlay. Shows the ASHVAH wordmark over a bone panel that
 * splits and wipes vertically to reveal the page — like a curtain or a bolt
 * of fabric being drawn back. Runs once per session (sessionStorage), and is
 * skipped entirely under prefers-reduced-motion.
 */
export function IntroCurtain() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    // Only on first visit this session
    const seen = sessionStorage.getItem("ashvah_intro_seen");
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("ashvah_intro_seen", "1");
      document.body.style.overflow = "";
    }, 2100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Top panel */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-bone"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ borderBottom: "1px solid #E5E5E5" }}
          />
          {/* Bottom panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-bone"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center wordmark */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-display-xl font-semibold tracking-tight text-graphite"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                ASHVAH
              </motion.h1>
            </div>
            <motion.p
              className="eyebrow mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              House of Fabrics
            </motion.p>

            {/* Loading line */}
            <motion.div
              className="mx-auto mt-6 h-[1px] bg-graphite"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
