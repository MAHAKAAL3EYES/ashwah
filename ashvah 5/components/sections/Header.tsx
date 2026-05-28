"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Fabrics", href: "/fabrics" },
  { label: "Process", href: "/process" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial",
        scrolled ? "glass-header" : "bg-transparent"
      )}
    >
      <div className="editorial-container flex h-[72px] items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-graphite"
          aria-label="ASHVAH — Home"
        >
          ASHVAH
          <span className="ml-2 hidden text-eyebrow text-silver sm:inline">
            House of Fabrics
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-graphite transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink("919053060101", "Hi ASHVAH, I'd like to enquire about your fabrics.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden btn-primary lg:inline-flex"
          >
            WhatsApp Enquiry
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center border border-hairline lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-hairline bg-bone lg:hidden">
          <nav className="editorial-container flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 text-sm font-medium text-graphite"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink("919053060101")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 w-full"
            >
              WhatsApp Enquiry
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
