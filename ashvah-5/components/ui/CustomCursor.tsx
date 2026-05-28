"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor — a thin ring that trails the pointer and expands when
 * hovering interactive elements. Pure enhancement: hidden on touch devices
 * and when prefers-reduced-motion is set. The native cursor stays visible
 * underneath as a fallback (we only hide it on fine-pointer devices).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "drag">("default");
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Soft spring so the ring lags slightly behind — feels weighty, premium
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  const rafRef = useRef<number>();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, label, [data-cursor]"
      );
      if (interactive) {
        const cursorLabel = interactive.getAttribute("data-cursor");
        setLabel(cursorLabel);
        setVariant(cursorLabel === "drag" ? "drag" : "hover");
      } else {
        setVariant("default");
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("custom-cursor-active");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring — springy, lagging */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: variant === "default" ? 32 : variant === "drag" ? 80 : 56,
          height: variant === "default" ? 32 : variant === "drag" ? 80 : 56,
          borderColor: "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      >
        <div className="h-full w-full rounded-full border border-white/90" />
        {label && label !== "drag" && (
          <span className="absolute font-mono text-[9px] uppercase tracking-wider text-white">
            {label}
          </span>
        )}
        {variant === "drag" && (
          <span className="absolute font-mono text-[9px] uppercase tracking-wider text-white">
            drag
          </span>
        )}
      </motion.div>

      {/* Inner dot — tracks exactly, no lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 rounded-full bg-white mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: variant === "default" ? 1 : 0 }}
      />
    </>
  );
}
