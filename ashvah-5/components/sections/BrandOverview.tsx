import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";

export function BrandOverview() {
  return (
    <SectionFrame eyebrow="The House" rail="02 / About" id="about">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left column — large editorial headline */}
        <Reveal className="lg:col-span-7">
          <h2 className="text-display-lg max-w-[16ch]">
            A textile house, not
            <br />
            <span className="text-silver">a template shop.</span>
          </h2>
        </Reveal>

        {/* Right column — supporting body copy */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="space-y-6 text-base leading-relaxed text-graphite">
            <p>
              ASHVAH was founded in 2011 after more than a decade of work inside
              India&apos;s textile mills. The brand exists for one reason — to
              supply fabric to the manufacturers, designers, and resellers who
              build sportswear, gym wear, and activewear at scale.
            </p>
            <p className="text-silver">
              We carry over five hundred fabrics across eleven categories, work
              directly with mill owners, and customise constructions on order.
              Domestic, imported, and bespoke — sourced through relationships
              built over fourteen years.
            </p>
          </div>

          {/* Mini fact rail */}
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-6">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                Founded
              </dt>
              <dd className="mt-1 font-display text-xl">2011</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                Base
              </dt>
              <dd className="mt-1 font-display text-xl">Rohtak, NCR</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                Model
              </dt>
              <dd className="mt-1 font-display text-xl">B2B Supply</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                Reach
              </dt>
              <dd className="mt-1 font-display text-xl">Pan India</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
