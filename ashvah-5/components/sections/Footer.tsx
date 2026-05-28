import Link from "next/link";
import { telLink, whatsappLink } from "@/lib/utils";

const FABRIC_LINKS = [
  { label: "Lowers", href: "/fabrics/lowers" },
  { label: "Sweat Shirts", href: "/fabrics/sweat-shirts" },
  { label: "Joggers", href: "/fabrics/joggers" },
  { label: "Cargos", href: "/fabrics/cargos" },
  { label: "Shorts", href: "/fabrics/shorts" },
  { label: "Sandos", href: "/fabrics/sandos" },
  { label: "T-Shirts", href: "/fabrics/t-shirts" },
  { label: "Sports Kits", href: "/fabrics/sports-kits" },
  { label: "Track Suits", href: "/fabrics/track-suits" },
  { label: "Jackets", href: "/fabrics/jackets" },
  { label: "Lining & Designing", href: "/fabrics/lining-designing" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-section border-t border-hairline bg-bone">
      <div className="editorial-container py-section-sm">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="font-display text-2xl font-semibold tracking-tight">
              ASHVAH
            </div>
            <p className="eyebrow mt-1">House of Fabrics — Est. 2011</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-silver">
              Performance fabrics for sportswear, gym wear, and activewear
              manufacturers across India. Direct mill-owner relationships.
              Pan-India delivery.
            </p>

            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                  Address
                </dt>
                <dd className="mt-1 text-graphite">
                  Star Heights, Godown no. 1, Street no. 5,
                  <br />
                  Sheetal Nagar, Jhajjar Road, Rohtak
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                  Phone
                </dt>
                <dd className="mt-1 space-x-3 text-graphite">
                  <a href={telLink("+91 90530 60102")} className="hover:text-ink">
                    +91 90530 60102
                  </a>
                  <span className="text-hairline-strong">/</span>
                  <a href={telLink("+91 90530 60101")} className="hover:text-ink">
                    +91 90530 60101
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                  Email
                </dt>
                <dd className="mt-1">
                  <a href="mailto:info@ashvah.in" className="text-graphite hover:text-ink">
                    info@ashvah.in
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-silver">
                  Hours
                </dt>
                <dd className="mt-1 text-graphite">
                  Mon — Sat · 10:00 AM – 05:00 PM
                  <br />
                  <span className="text-silver">Sunday closed</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Fabrics */}
          <div className="lg:col-span-5">
            <p className="eyebrow">Fabrics</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {FABRIC_LINKS.map((f) => (
                <li key={f.href}>
                  <Link
                    href={f.href}
                    className="text-sm text-graphite transition-colors hover:text-ink"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links + CTA */}
          <div className="lg:col-span-3">
            <p className="eyebrow">Quick Links</p>
            <ul className="mt-6 space-y-3">
              {QUICK_LINKS.map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="text-sm text-graphite transition-colors hover:text-ink"
                  >
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink("919053060101")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-8 w-full"
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-section-sm flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-xs text-silver sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ASHVAH. All rights reserved.</p>
          <p className="font-mono uppercase tracking-wider">
            B2B fabric supplier · Delhi NCR · Pan India
          </p>
        </div>
      </div>
    </footer>
  );
}
