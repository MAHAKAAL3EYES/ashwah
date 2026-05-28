"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteSetting } from "@/lib/actions";
import type { HeroContent, ContactContent } from "@/types/database";

export function ContentForm({
  hero,
  contact,
}: {
  hero: HeroContent;
  contact: ContactContent;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState<"hero" | "contact" | null>(null);
  const [msg, setMsg] = useState("");

  const saveHero = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving("hero");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const value: HeroContent = {
      eyebrow: fd.get("eyebrow") as string,
      title: fd.get("title") as string,
      subtitle: fd.get("subtitle") as string,
      primary_cta_label: fd.get("primary_cta_label") as string,
      primary_cta_href: fd.get("primary_cta_href") as string,
      secondary_cta_label: fd.get("secondary_cta_label") as string,
      secondary_cta_href: fd.get("secondary_cta_href") as string,
    };
    const res = await saveSiteSetting("hero", value as any);
    setSaving(null);
    setMsg(res.ok ? "Hero saved." : `Error: ${res.error}`);
    if (res.ok) router.refresh();
  };

  const saveContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving("contact");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const value: ContactContent = {
      address: fd.get("address") as string,
      phone_primary: fd.get("phone_primary") as string,
      phone_secondary: fd.get("phone_secondary") as string,
      email: fd.get("email") as string,
      hours: fd.get("hours") as string,
      whatsapp_number: fd.get("whatsapp_number") as string,
    };
    const res = await saveSiteSetting("contact", value as any);
    setSaving(null);
    setMsg(res.ok ? "Contact saved." : `Error: ${res.error}`);
    if (res.ok) router.refresh();
  };

  return (
    <div className="max-w-3xl space-y-8">
      {msg && (
        <p className="border border-hairline bg-white px-4 py-3 text-sm">
          {msg}
        </p>
      )}

      {/* Hero */}
      <form onSubmit={saveHero} className="border border-hairline bg-white">
        <p className="border-b border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">
          Hero section
        </p>
        <div className="space-y-4 p-5">
          <CField label="Eyebrow" name="eyebrow" defaultValue={hero.eyebrow} />
          <CField label="Title" name="title" defaultValue={hero.title} textarea />
          <CField label="Subtitle" name="subtitle" defaultValue={hero.subtitle} textarea />
          <div className="grid grid-cols-2 gap-4">
            <CField label="Primary CTA label" name="primary_cta_label" defaultValue={hero.primary_cta_label} />
            <CField label="Primary CTA link" name="primary_cta_href" defaultValue={hero.primary_cta_href} />
            <CField label="Secondary CTA label" name="secondary_cta_label" defaultValue={hero.secondary_cta_label} />
            <CField label="Secondary CTA link" name="secondary_cta_href" defaultValue={hero.secondary_cta_href} />
          </div>
          <button type="submit" disabled={saving === "hero"} className="btn-primary disabled:opacity-60">
            {saving === "hero" ? "Saving…" : "Save hero"}
          </button>
        </div>
      </form>

      {/* Contact */}
      <form onSubmit={saveContact} className="border border-hairline bg-white">
        <p className="border-b border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">
          Contact details
        </p>
        <div className="space-y-4 p-5">
          <CField label="Address" name="address" defaultValue={contact.address} textarea />
          <div className="grid grid-cols-2 gap-4">
            <CField label="Primary phone" name="phone_primary" defaultValue={contact.phone_primary} />
            <CField label="Secondary phone" name="phone_secondary" defaultValue={contact.phone_secondary} />
            <CField label="Email" name="email" defaultValue={contact.email} />
            <CField label="WhatsApp number" name="whatsapp_number" defaultValue={contact.whatsapp_number} />
          </div>
          <CField label="Hours" name="hours" defaultValue={contact.hours} />
          <button type="submit" disabled={saving === "contact"} className="btn-primary disabled:opacity-60">
            {saving === "contact" ? "Saving…" : "Save contact"}
          </button>
        </div>
      </form>
    </div>
  );
}

function CField({
  label,
  name,
  defaultValue,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-wider text-silver">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={2}
          defaultValue={defaultValue}
          className="mt-1.5 w-full resize-none border border-hairline px-3 py-2.5 text-sm outline-none focus:border-graphite"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          className="mt-1.5 w-full border border-hairline px-3 py-2.5 text-sm outline-none focus:border-graphite"
        />
      )}
    </label>
  );
}
