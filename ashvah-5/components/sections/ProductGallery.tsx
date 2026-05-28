"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { FabricSwatch } from "@/components/ui/FabricSwatch";
import type { ProductImage } from "@/types/database";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  isStar: boolean;
}

export function ProductGallery({
  images,
  productName,
  isStar,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div>
      {/* Main image / swatch */}
      <TiltCard className="relative" max={6}>
        <div className="relative aspect-square overflow-hidden border border-hairline bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {hasImages ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={images[active].url}
                  alt={images[active].alt_text ?? productName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FabricSwatch index={0} />
              )}
            </motion.div>
          </AnimatePresence>

          {isStar && (
            <span className="absolute left-4 top-4 z-10 bg-graphite px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">
              Star Product
            </span>
          )}

          {/* Corner registration marks — machined detail */}
          <Corner className="left-3 top-3" />
          <Corner className="right-3 top-3 rotate-90" />
          <Corner className="bottom-3 right-3 rotate-180" />
          <Corner className="bottom-3 left-3 -rotate-90" />
        </div>
      </TiltCard>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative aspect-square w-20 overflow-hidden border transition-colors ${
                i === active ? "border-graphite" : "border-hairline"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt_text ?? `${productName} ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* If swatch fallback, show a note */}
      {!hasImages && (
        <p className="mt-4 font-mono text-xs leading-relaxed text-silver">
          Fabric swatch shown is representative. Request physical samples and
          live photographs on enquiry.
        </p>
      )}
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-3 w-3 border-l border-t border-graphite/30 ${className}`}
      aria-hidden
    />
  );
}
