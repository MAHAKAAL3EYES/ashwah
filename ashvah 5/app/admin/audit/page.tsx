import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { AuditLog } from "@/types/database";

export const dynamic = "force-dynamic";

async function getLogs(): Promise<AuditLog[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    return (data as AuditLog[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminAuditPage() {
  await requireRole("super_admin");
  const logs = await getLogs();

  return (
    <>
      <AdminPageHeader
        title="Audit log"
        description="Recent staff actions across the platform"
      />
      <div className="p-6 lg:p-8">
        <div className="border border-hairline bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline text-left">
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">When</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Actor</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Action</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-silver">Entity</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-silver">
                    No audit entries yet. Actions like creating or editing
                    products will appear here.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-hairline last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-silver">
                      {new Date(log.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-silver">
                      {log.actor_email ?? "System"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs uppercase tracking-wider">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-silver">
                      {log.entity_type}
                      {log.entity_id && (
                        <span className="ml-1 font-mono text-xs opacity-60">
                          {log.entity_id.slice(0, 8)}
                        </span>
                      )}
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
