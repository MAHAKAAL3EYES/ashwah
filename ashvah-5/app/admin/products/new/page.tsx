import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireRole } from "@/lib/auth";
import { getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireRole("editor");
  const categories = await getCategories();
  return (
    <>
      <AdminPageHeader
        title="Add product"
        description="Create a new fabric in the catalogue."
      />
      <div className="p-6 lg:p-8">
        <ProductForm categories={categories} />
      </div>
    </>
  );
}
