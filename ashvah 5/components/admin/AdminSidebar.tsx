"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Images,
  Inbox,
  Users,
  FileText,
  ScrollText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { StaffUser } from "@/types/database";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, minRole: "viewer" },
  { label: "Products", href: "/admin/products", icon: Package, minRole: "viewer" },
  { label: "Categories", href: "/admin/categories", icon: FolderTree, minRole: "viewer" },
  { label: "Gallery", href: "/admin/gallery", icon: Images, minRole: "viewer" },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox, minRole: "viewer" },
  { label: "Homepage", href: "/admin/content", icon: FileText, minRole: "editor" },
  { label: "Staff", href: "/admin/staff", icon: Users, minRole: "super_admin" },
  { label: "Audit Log", href: "/admin/audit", icon: ScrollText, minRole: "super_admin" },
] as const;

const ROLE_RANK = { viewer: 1, editor: 2, super_admin: 3 } as const;

export function AdminSidebar({ staff }: { staff: StaffUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const visibleNav = NAV.filter(
    (item) => ROLE_RANK[staff.role] >= ROLE_RANK[item.minRole]
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-hairline bg-white px-4 lg:hidden">
        <span className="font-display font-semibold tracking-tight">ASHVAH</span>
        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          className="inline-flex h-9 w-9 items-center justify-center border border-hairline"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-hairline bg-white transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="border-b border-hairline px-6 py-5">
            <div className="font-display text-lg font-semibold tracking-tight">
              ASHVAH
            </div>
            <p className="eyebrow mt-0.5">Staff Platform</p>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {visibleNav.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "mb-1 flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-graphite text-bone"
                      : "text-graphite hover:bg-muted"
                  )}
                >
                  <Icon size={16} className="shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User + sign out */}
          <div className="border-t border-hairline p-4">
            <div className="mb-3 px-1">
              <p className="truncate text-sm font-medium">
                {staff.full_name ?? staff.email}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-silver">
                {staff.role.replace("_", " ")}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 border border-hairline px-3 py-2.5 text-sm text-graphite transition-colors hover:bg-graphite hover:text-bone"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-graphite/20 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
