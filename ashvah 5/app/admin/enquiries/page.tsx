import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";
import { requireStaff, canEdit } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Enquiry } from "@/types/database";

export const dynamic = "force-dynamic";

async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Enquiry[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminEnquiriesPage() {
  const staff = await requireStaff();
  const enquiries = await getEnquiries();
  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <>
      <AdminPageHeader
        title="Enquiries"
        description={`${enquiries.length} total · ${newCount} new`}
      />
      <div className="p-6 lg:p-8">
        <EnquiriesTable enquiries={enquiries} editable={canEdit(staff.role)} />
      </div>
    </>
  );
}
