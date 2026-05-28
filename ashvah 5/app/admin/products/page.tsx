import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { requireStaff, canEdit } from "@/lib/auth";
import { getAdminProducts } from "@/lib/catalogue";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const staff = await requireStaff();
  const editable = canEdit(staff.role);
  // Fetch ALL products incl inactive — admin needs to see hidden ones too.
  const products = await getAdminProducts();

  return (
    <>
      <AdminPageHeader
        title="Products"
        description={`${products.length} fabrics in the catalogue`}
        action={
          editable ? (
            <Link href="/admin/products/new" className="btn-primary">
              <Plus size={16} />
              Add product
            </Link>
          ) : null
        }
      />
      <div className="p-6 lg:p-8">
        <ProductsTable products={products} editable={editable} />
      </div>
    </>
  );
}
