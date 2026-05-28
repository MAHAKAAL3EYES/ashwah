import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireRole } from "@/lib/auth";
import { getAdminProducts } from "@/lib/catalogue";
import { getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  await requireRole("editor");
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getCategories(),
  ]);
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <>
      <AdminPageHeader title="Edit product" description={product.name} />
      <div className="p-6 lg:p-8">
        <ProductForm product={product} categories={categories} />
      </div>
    </>
  );
}
