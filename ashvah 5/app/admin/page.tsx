import Link from "next/link";
import { Package, FolderTree, Inbox, Images } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCounts() {
  const defaults = { products: 0, categories: 0, enquiries: 0, newEnquiries: 0, gallery: 0 };
  try {
    const supabase = createClient();
    const [products, categories, enquiries, newEnq, gallery] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.from("enquiries").select("id", { count: "exact", head: true }),
      supabase
        .from("enquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase.from("gallery").select("id", { count: "exact", head: true }),
    ]);
    return {
      products: products.count ?? 0,
      categories: categories.count ?? 0,
      enquiries: enquiries.count ?? 0,
      newEnquiries: newEnq.count ?? 0,
      gallery: gallery.count ?? 0,
    };
  } catch {
    return defaults;
  }
}

export default async function AdminDashboard() {
  const staff = await requireStaff();
  const counts = await getCounts();

  const cards = [
    { label: "Products", value: counts.products, href: "/admin/products", icon: Package },
    { label: "Categories", value: counts.categories, href: "/admin/categories", icon: FolderTree },
    { label: "Total enquiries", value: counts.enquiries, href: "/admin/enquiries", icon: Inbox },
    { label: "Gallery items", value: counts.gallery, href: "/admin/gallery", icon: Images },
  ];

  return (
    <>
      <AdminPageHeader
        title={`Welcome, ${staff.full_name?.split(" ")[0] ?? "there"}`}
        description="Manage your catalogue, content, and enquiries."
      />

      <div className="p-6 lg:p-8">
        {/* New enquiries alert */}
        {counts.newEnquiries > 0 && (
          <Link
            href="/admin/enquiries"
            className="mb-6 flex items-center justify-between border border-ink bg-ink/5 px-5 py-4 transition-colors hover:bg-ink/10"
          >
            <div className="flex items-center gap-3">
              <Inbox size={18} className="text-ink" />
              <span className="text-sm font-medium">
                {counts.newEnquiries} new{" "}
                {counts.newEnquiries === 1 ? "enquiry" : "enquiries"} awaiting
                response
              </span>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-ink">
              Review →
            </span>
          </Link>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="group bg-white p-6 transition-colors hover:bg-muted"
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} className="text-silver" />
                  <span className="font-mono text-xs text-silver opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </div>
                <p className="mt-6 font-display text-4xl font-semibold tabular tracking-tight">
                  {card.value}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-silver">
                  {card.label}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-8">
          <p className="eyebrow mb-4">Quick actions</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/products/new" className="btn-primary">
              Add product
            </Link>
            <Link href="/admin/categories" className="btn-outline">
              Manage categories
            </Link>
            <Link href="/admin/enquiries" className="btn-outline">
              View enquiries
            </Link>
          </div>
        </div>

        {/* Setup notice if DB empty */}
        {counts.products === 0 && (
          <div className="mt-8 border border-hairline bg-white p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-silver">
              Setup
            </p>
            <h3 className="mt-3 font-display text-xl font-medium">
              No products yet
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-silver">
              If you've just connected Supabase, run the seed file
              (<code className="font-mono text-xs">supabase/seed.sql</code>) to
              preload the 11 categories and starter products, or add your first
              product manually.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
