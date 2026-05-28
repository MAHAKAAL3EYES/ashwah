import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { requireStaff, canEdit } from "@/lib/auth";
import { getCategories } from "@/lib/queries";
import { getAdminProducts } from "@/lib/catalogue";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const staff = await requireStaff();
  const [categories, products] = await Promise.all([
    getCategories(),
    getAdminProducts(),
  ]);

  const counts: Record<string, number> = {};
  for (const p of products) {
    for (const slug of p.category_slugs) {
      counts[slug] = (counts[slug] ?? 0) + 1;
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Categories"
        description={`${categories.length} fabric categories`}
      />
      <div className="p-6 lg:p-8">
        <CategoriesManager
          categories={categories}
          counts={counts}
          editable={canEdit(staff.role)}
        />
      </div>
    </>
  );
}
