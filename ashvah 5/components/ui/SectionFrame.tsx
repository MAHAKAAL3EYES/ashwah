import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionFrameProps {
  children: ReactNode;
  className?: string;
  /** Section eyebrow label — small caps, tracked, top of section */
  eyebrow?: string;
  /** Optional right-side rail label (e.g. section number) */
  rail?: string;
  /** Section id for anchor links */
  id?: string;
  /** Remove the standard top border */
  noTopRule?: boolean;
}

/**
 * Editorial section wrapper. Top hairline, eyebrow + rail in a header bar,
 * generous vertical padding, edge-to-edge container.
 */
export function SectionFrame({
  children,
  className,
  eyebrow,
  rail,
  id,
  noTopRule = false,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        !noTopRule && "border-t border-hairline",
        className
      )}
    >
      <div className="editorial-container py-section">
        {(eyebrow || rail) && (
          <div className="mb-12 flex items-center justify-between border-b border-hairline pb-6">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : <span />}
            {rail && (
              <p className="hidden font-mono text-xs uppercase tracking-wider text-silver sm:block">
                {rail}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
