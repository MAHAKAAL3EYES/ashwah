import { SectionFrame } from "@/components/ui/SectionFrame";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { telLink, whatsappLink } from "@/lib/utils";
import type { ContactContent } from "@/types/database";

interface ContactProps {
  contact: ContactContent;
  prefillCategory?: string;
  prefillSlug?: string;
  prefillType?: string;
}

export function Contact({
  contact,
  prefillCategory,
  prefillSlug,
  prefillType,
}: ContactProps) {
  return (
    <SectionFrame eyebrow="Get in touch" rail="09 / Contact" id="contact">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left — editorial copy + details */}
        <Reveal className="lg:col-span-5">
          <h2 className="max-w-[14ch] text-display-lg">
            Tell us what you&apos;re
            <br />
            <span className="text-silver">building.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-silver">
            Sportswear brands, garment manufacturers, resellers — share your
            requirement and we&apos;ll send back the matching fabrics with
            specs, pricing, and lead times.
          </p>

          <dl className="mt-12 space-y-6 border-t border-hairline pt-8">
            <ContactRow label="Phone">
              <a href={telLink(contact.phone_primary)} className="hover:text-ink">
                {contact.phone_primary}
              </a>
              <span className="mx-3 text-hairline-strong">/</span>
              <a href={telLink(contact.phone_secondary)} className="hover:text-ink">
                {contact.phone_secondary}
              </a>
            </ContactRow>

            <ContactRow label="WhatsApp">
              <a
                href={whatsappLink(contact.whatsapp_number)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                +{contact.whatsapp_number}
              </a>
            </ContactRow>

            <ContactRow label="Email">
              <a href={`mailto:${contact.email}`} className="hover:text-ink">
                {contact.email}
              </a>
            </ContactRow>

            <ContactRow label="Address">
              <address className="not-italic">{contact.address}</address>
            </ContactRow>

            <ContactRow label="Hours">
              <p>{contact.hours}</p>
            </ContactRow>
          </dl>

          <a
            href={whatsappLink(
              contact.whatsapp_number,
              "Hi ASHVAH, I'd like to enquire about your fabrics."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10"
          >
            Open WhatsApp
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        {/* Right — enquiry form */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <EnquiryForm
            prefillCategory={prefillCategory}
            prefillSlug={prefillSlug}
            prefillType={prefillType}
          />
        </Reveal>
      </div>
    </SectionFrame>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-6">
      <dt className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-silver">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-graphite">{children}</dd>
    </div>
  );
}
