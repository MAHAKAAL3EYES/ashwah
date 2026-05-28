"use client";

import { motion } from "framer-motion";

export function HeroScrollCue() {
  return (
    <div className="flex items-end justify-between border-t border-hairline pt-6">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-[1px] overflow-hidden bg-graphite/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-graphite"
            animate={{ y: ["-100%", "200%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-silver">
          Scroll to explore
        </p>
      </div>
      <p className="font-mono text-xs uppercase tracking-wider text-silver">
        01 / Hero
      </p>
    </div>
  );
}
