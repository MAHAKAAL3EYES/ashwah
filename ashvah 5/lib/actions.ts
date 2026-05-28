"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentStaff, canEdit } from "@/lib/auth";
import type { EnquiryStatus } from "@/types/database";

/** Write an audit log entry. Best-effort — never throws. */
async function audit(
  action: string,
  entityType: string,
  entityId: string | null,
  diff?: Record<string, unknown>
) {
  try {
    const supabase = createClient();
    const staff = await getCurrentStaff();
    await supabase.from("audit_logs").insert({
      actor_id: staff?.id ?? null,
      actor_email: staff?.email ?? null,
      action,
      entity_type: entityType,
      entity_id: entityId,
      diff: diff ?? null,
    });
  } catch {
    /* swallow */
  }
}

type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ===================== PRODUCTS =====================

export async function saveProduct(
  formData: FormData
): Promise<ActionResult> {
  const staff = await getCurrentStaff();
  if (!staff || !canEdit(staff.role)) {
    return { ok: false, error: "You don't have permission to edit products." };
  }

  const id = (formData.get("id") as string) || null;
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { ok: false, error: "Name is required." };

  const slug =
    (formData.get("slug") as string)?.trim() || slugify(name);

  const usedForRaw = (formData.get("used_for") as string) || "";
  const functionalityRaw = (formData.get("functionality") as string) || "";

  const payload = {
    name,
    slug,
    short_description: (formData.get("short_description") as string) || null,
    full_description: (formData.get("full_description") as string) || null,
    gsm: formData.get("gsm") ? Number(formData.get("gsm")) : null,
    width: (formData.get("width") as string) || null,
    fabric_type: (formData.get("fabric_type") as string) || null,
    used_for: usedForRaw
      ? usedForRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : null,
    functionality: functionalityRaw
      ? functionalityRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : null,
    is_star: formData.get("is_star") === "on",
    is_customizable: formData.get("is_customizable") === "on",
    in_stock: formData.get("in_stock") === "on",
    is_active: formData.get("is_active") === "on",
    display_order: formData.get("display_order")
      ? Number(formData.get("display_order"))
      : 0,
  };

  // Category assignment — checkboxes named category_ids submit one entry per
  // selected category. getAll captures all of them.
  const categoryIds = formData
    .getAll("category_ids")
    .map((v) => String(v))
    .filter(Boolean);

  try {
    const supabase = createClient();
    let productId = id;

    if (id) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", id);
      if (error) return { ok: false, error: error.message };
      await audit("update", "product", id, payload);
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert({ ...payload, created_by: staff.id })
        .select("id")
        .single();
      if (error) return { ok: false, error: error.message };
      productId = data?.id ?? null;
      await audit("create", "product", productId, payload);
    }

    // Sync category links: on edit, replace; on create, insert.
    if (productId) {
      // Remove existing links (no-op on fresh create)
      const { error: delError } = await supabase
        .from("product_categories")
        .delete()
        .eq("product_id", productId);
      if (delError) return { ok: false, error: delError.message };

      if (categoryIds.length > 0) {
        const links = categoryIds.map((category_id) => ({
          product_id: productId,
          category_id,
        }));
        const { error: linkError } = await supabase
          .from("product_categories")
          .insert(links);
        if (linkError) return { ok: false, error: linkError.message };
      }
      await audit("set_categories", "product", productId, {
        category_ids: categoryIds,
      });
    }

    revalidatePath("/admin/products");
    revalidatePath("/fabrics");
    return { ok: true, id: id ?? undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function toggleProductActive(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  const staff = await getCurrentStaff();
  if (!staff || !canEdit(staff.role)) {
    return { ok: false, error: "Permission denied." };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .update({ is_active: isActive })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    await audit(isActive ? "unhide" : "hide", "product", id);
    revalidatePath("/admin/products");
    revalidatePath("/fabrics");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

// ===================== CATEGORIES =====================

export async function saveCategory(
  formData: FormData
): Promise<ActionResult> {
  const staff = await getCurrentStaff();
  if (!staff || !canEdit(staff.role)) {
    return { ok: false, error: "Permission denied." };
  }

  const id = (formData.get("id") as string) || null;
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { ok: false, error: "Name is required." };

  const payload = {
    name,
    slug: (formData.get("slug") as string)?.trim() || slugify(name),
    description: (formData.get("description") as string) || null,
    display_order: formData.get("display_order")
      ? Number(formData.get("display_order"))
      : 0,
    is_active: formData.get("is_active") === "on",
  };

  try {
    const supabase = createClient();
    if (id) {
      const { error } = await supabase
        .from("categories")
        .update(payload)
        .eq("id", id);
      if (error) return { ok: false, error: error.message };
      await audit("update", "category", id, payload);
    } else {
      const { data, error } = await supabase
        .from("categories")
        .insert(payload)
        .select("id")
        .single();
      if (error) return { ok: false, error: error.message };
      await audit("create", "category", data?.id ?? null, payload);
    }
    revalidatePath("/admin/categories");
    revalidatePath("/fabrics");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

// ===================== ENQUIRIES =====================

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<ActionResult> {
  const staff = await getCurrentStaff();
  if (!staff || !canEdit(staff.role)) {
    return { ok: false, error: "Permission denied." };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    await audit("update_status", "enquiry", id, { status });
    revalidatePath("/admin/enquiries");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function saveEnquiryNotes(
  id: string,
  notes: string
): Promise<ActionResult> {
  const staff = await getCurrentStaff();
  if (!staff || !canEdit(staff.role)) {
    return { ok: false, error: "Permission denied." };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("enquiries")
      .update({ internal_notes: notes })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    await audit("update_notes", "enquiry", id);
    revalidatePath("/admin/enquiries");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

// ===================== SITE SETTINGS =====================

export async function saveSiteSetting(
  key: string,
  value: Record<string, unknown>
): Promise<ActionResult> {
  const staff = await getCurrentStaff();
  if (!staff || !canEdit(staff.role)) {
    return { ok: false, error: "Permission denied." };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value, updated_by: staff.id }, { onConflict: "key" });
    if (error) return { ok: false, error: error.message };
    await audit("update", "site_setting", null, { key });
    revalidatePath("/");
    revalidatePath("/contact");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed" };
  }
}
