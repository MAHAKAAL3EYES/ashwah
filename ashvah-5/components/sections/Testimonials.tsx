import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial } from "@/types/database";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <SectionFrame
      eyebrow="From our clients"
      rail="08 / Testimonials"
      className="bg-white"
    >
      <Reveal>
        <h2 className="max-w-[16ch] text-display-lg">
          What manufacturers say
          <br />
          <span className="text-silver">after the first order.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((t, i) => (
          <Reveal
            key={t.id}
            delay={i * 0.08}
            className="flex flex-col justify-between bg-white p-8 sm:p-10"
            as="article"
          >
            {/* Quote mark */}
            <p className="font-display text-4xl leading-none text-graphite" aria-hidden>
              &ldquo;
            </p>

            <blockquote className="mt-4 flex-1">
              <p className="text-base leading-relaxed text-graphite">
                {t.quote}
              </p>
            </blockquote>

            {/* Attribution */}
            <footer className="mt-8 border-t border-hairline pt-4">
              <cite className="not-italic">
                <p className="font-display text-base font-medium tracking-tight">
                  {t.author_name}
                </p>
                {(t.author_location || t.author_company) && (
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-silver">
                    {[t.author_company, t.author_location].filter(Boolean).join(" · ")}
                  </p>
                )}
              </cite>
            </footer>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
