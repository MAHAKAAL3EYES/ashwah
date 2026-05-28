import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { StaffUser, StaffRole } from "@/types/database";

/**
 * Returns the current staff user or null. Use in admin pages/layouts.
 */
export async function getCurrentStaff(): Promise<StaffUser | null> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("staff_users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!data || !(data as StaffUser).is_active) return null;
    return data as StaffUser;
  } catch {
    return null;
  }
}

/**
 * Require auth — redirects to login if not a staff user.
 */
export async function requireStaff(): Promise<StaffUser> {
  const staff = await getCurrentStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

/**
 * Require a minimum role. super_admin > editor > viewer.
 */
const ROLE_RANK: Record<StaffRole, number> = {
  viewer: 1,
  editor: 2,
  super_admin: 3,
};

export async function requireRole(min: StaffRole): Promise<StaffUser> {
  const staff = await requireStaff();
  if (ROLE_RANK[staff.role] < ROLE_RANK[min]) {
    redirect("/admin?error=insufficient_role");
  }
  return staff;
}

export function canEdit(role: StaffRole): boolean {
  return ROLE_RANK[role] >= ROLE_RANK.editor;
}

export function canManageStaff(role: StaffRole): boolean {
  return role === "super_admin";
}
