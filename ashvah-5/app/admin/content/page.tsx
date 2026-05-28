import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ContentForm } from "@/components/admin/ContentForm";
import { requireRole } from "@/lib/auth";
import { getHero, getContact } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  await requireRole("editor");
  const [hero, contact] = await Promise.all([getHero(), getContact()]);

  return (
    <>
      <AdminPageHeader
        title="Homepage content"
        description="Edit hero copy and contact details shown across the site."
      />
      <div className="p-6 lg:p-8">
        <ContentForm hero={hero} contact={contact} />
      </div>
    </>
  );
}
