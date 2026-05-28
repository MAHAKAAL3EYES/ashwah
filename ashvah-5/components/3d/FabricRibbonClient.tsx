"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Heavy R3F bundle — lazy-loaded on client only, never SSR'd
const FabricRibbon = dynamic(
  () => import("./FabricRibbon").then((m) => m.FabricRibbon),
  {
    ssr: false,
    loading: () => <RibbonFallback />,
  }
);

/**
 * Static SVG fabric fallback — used on:
 *   - Mobile (< 768px)
 *   - prefers-reduced-motion: reduce
 *   - while R3F bundle loads
 *   - if WebGL is unavailable
 *
 * Renders a layered SVG mesh + curve that visually echoes the 3D ribbon
 * but ships zero JS and costs nothing on low-end devices.
 */
function RibbonFallback() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="cloth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F2F1ED" />
          <stop offset="100%" stopColor="#E5E4DF" />
        </linearGradient>
        <pattern id="weave" patternUnits="userSpaceOnUse" width="6" height="6">
          <path
            d="M0,3 L6,3 M3,0 L3,6"
            stroke="rgba(17,17,17,0.04)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      {/* Layered cloth curves — back to front for depth */}
      <path
        d="M -50,180 Q 150,80 300,170 T 650,160 L 650,290 Q 450,360 300,280 T -50,300 Z"
        fill="url(#cloth-grad)"
        opacity="0.55"
      />
      <path
        d="M -50,200 Q 150,110 300,200 T 650,190 L 650,310 Q 450,380 300,310 T -50,320 Z"
        fill="url(#cloth-grad)"
        opacity="0.85"
      />
      <path
        d="M -50,200 Q 150,110 300,200 T 650,190 L 650,310 Q 450,380 300,310 T -50,320 Z"
        fill="url(#weave)"
      />

      {/* Hairline stitch */}
      <path
        d="M -50,210 Q 150,120 300,210 T 650,200"
        stroke="rgba(17,17,17,0.12)"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="2 3"
      />
    </svg>
  );
}

/**
 * Client-side gate — only mounts R3F if the device can comfortably handle it.
 */
export function FabricRibbonClient() {
  const [mode, setMode] = useState<"3d" | "fallback" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Bail on reduced motion preference
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setMode("fallback");
      return;
    }

    // Bail on small screens — performance + battery
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setMode("fallback");
      return;
    }

    // Bail if WebGL is unavailable
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) {
        setMode("fallback");
        return;
      }
    } catch {
      setMode("fallback");
      return;
    }

    setMode("3d");
  }, []);

  // SSR + initial paint: render the fallback so first paint is identical
  if (mode === null || mode === "fallback") return <RibbonFallback />;

  return <FabricRibbon />;
}
