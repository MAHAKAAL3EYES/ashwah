import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { getContact } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ASHVAH for sportswear and activewear fabric enquiries. Pan-India B2B supply. WhatsApp, phone, or enquiry form.",
};

export const revalidate = 300;

interface PageProps {
  searchParams: {
    category?: string;
    slug?: string;
    type?: string;
  };
}

export default async function ContactPage({ searchParams }: PageProps) {
  const contact = await getContact();
  return (
    <div className="pt-12">
      <Contact
        contact={contact}
        prefillCategory={searchParams.category}
        prefillSlug={searchParams.slug}
        prefillType={searchParams.type}
      />
    </div>
  );
}
