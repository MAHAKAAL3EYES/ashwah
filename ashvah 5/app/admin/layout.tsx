import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getCurrentStaff } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page renders without the shell. We detect it via the x-invoke-path
  // header isn't reliable across versions, so the login route uses its own
  // full-screen layout by simply not rendering the sidebar when no staff.
  const staff = await getCurrentStaff();

  // If not authenticated, render children bare (login page handles its own UI).
  // Middleware already redirects protected routes, so this is the login screen.
  if (!staff) {
    return <div className="min-h-screen bg-bone">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-bone">
      <AdminSidebar staff={staff} />
      <div className="flex-1 lg:pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
