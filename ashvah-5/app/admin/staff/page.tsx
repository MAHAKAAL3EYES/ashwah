import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { StaffUser } from "@/types/database";

export const dynamic = "force-dynamic";

async function getStaff(): Promise<StaffUser[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("staff_users")
      .select("*")
      .order("created_at", { ascending: true });
    return (data as StaffUser[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminStaffPage() {
  await requireRole("super_admin");
  const staff = await getStaff();

  return (
    <>
      <AdminPageHeader
        title="Staff"
        description={`${staff.length} staff members`}
      />
      <div className="p-6 lg:p-8">
        {/* Add staff note */}
        <div className="mb-6 border border-hairline bg-white p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-silver">
            Adding staff
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-silver">
            For security, new staff accounts are created in two steps: invite the
            user via Supabase Auth (dashboard → Authentication → Users → Invite),
            then add a matching row in the{" "}
            <code className="font-mono text-xs">staff_users</code> table with
            their role. This keeps account creation off the public surface.
          </p>
        </div>

        <div className="border border-hairline bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline text-left">
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Name</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Email</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Role</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Status</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Last login</th>
              </tr>
            </thead>
            <tbody>
              {staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-silver">
                    No staff records found. Connect Supabase and add your first
                    super admin.
                  </td>
                </tr>
              ) : (
                staff.map((s) => (
                  <tr key={s.id} className="border-b border-hairline last:border-0">
                    <td className="px-4 py-3 font-medium">{s.full_name ?? "—"}</td>
                    <td className="px-4 py-3 text-silver">{s.email}</td>
                    <td className="px-4 py-3">
                      <span className="border border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-wider">
                        {s.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-silver">
                        {s.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-silver">
                      {s.last_login_at
                        ? new Date(s.last_login_at).toLocaleDateString("en-IN")
                        : "Never"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
