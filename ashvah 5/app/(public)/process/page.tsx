import type { Metadata } from "next";
import { Process } from "@/components/sections/Process";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How ASHVAH sources, quality-checks, and warehouses fabric — from mill to your factory floor.",
};

export default function ProcessPage() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="editorial-container py-section-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-6">
            <p className="eyebrow">Our Process</p>
            <p className="hidden font-mono text-xs uppercase tracking-wider text-silver sm:block">
              Mill → QC → Warehouse → You
            </p>
          </div>
          <h1 className="mt-12 max-w-[16ch] text-display-xl">
            <MaskReveal
              lines={[
                "Sourcing to",
                <span key="2" className="text-silver">shipment.</span>,
              ]}
            />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-silver">
              Consistency is a process, not a promise. Here's how a fabric moves
              from the mill floor to your cutting table.
            </p>
          </Reveal>
        </div>
      </section>

      <Process />
    </>
  );
}
