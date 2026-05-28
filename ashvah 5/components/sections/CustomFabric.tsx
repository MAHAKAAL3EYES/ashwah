import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/utils";

const VARIABLES = [
  "Colour",
  "Design",
  "Pattern",
  "Fabric Type",
  "Material / Stuff",
  "Technical Requirements",
  "Finish",
  "Usage",
];

export function CustomFabric() {
  return (
    <SectionFrame eyebrow="Bespoke" rail="07 / Custom orders">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="max-w-[16ch] text-display-lg">
            Standard catalogue
            <br />
            <span className="text-silver">won&apos;t cover every brief.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-silver">
            For brands building distinct product lines, we customise fabrics on
            order — working directly with mill owners on colour, construction,
            and finish. Eight variables; one shared spec sheet.
          </p>

          <a
            href={whatsappLink(
              "919053060101",
              "Hi ASHVAH, I'd like to discuss a custom fabric order."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10"
          >
            Discuss a custom order
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        {/* Variables list — mono spec sheet aesthetic */}
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="border border-hairline bg-white">
            <p className="border-b border-hairline px-6 py-4 font-mono text-xs uppercase tracking-wider text-silver">
              Customisation variables
            </p>
            <ul>
              {VARIABLES.map((v, i) => (
                <li
                  key={v}
                  className="flex items-center justify-between border-b border-hairline px-6 py-4 last:border-b-0"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-silver">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
