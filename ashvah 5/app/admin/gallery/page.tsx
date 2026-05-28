import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { FabricSwatch } from "@/components/ui/FabricSwatch";
import { requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/types/database";

export const dynamic = "force-dynamic";

async function getGallery(): Promise<GalleryItem[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("display_order", { ascending: true });
    return (data as GalleryItem[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminGalleryPage() {
  await requireStaff();
  const items = await getGallery();

  return (
    <>
      <AdminPageHeader
        title="Gallery"
        description={`${items.length} images`}
      />
      <div className="p-6 lg:p-8">
        {/* Upload note */}
        <div className="mb-6 border border-hairline bg-white p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-silver">
            Uploading images
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-silver">
            Gallery and product images are stored in Supabase Storage. Upload to
            the <code className="font-mono text-xs">gallery</code> bucket via the
            Supabase dashboard, then add a row to the{" "}
            <code className="font-mono text-xs">gallery</code> table with the
            public URL. Direct in-app upload ships in a later iteration — the
            storage buckets and table are already wired.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white">
                <FabricSwatch index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4 lg:grid-cols-6">
            {items.map((item) => (
              <div key={item.id} className="relative aspect-square bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title ?? "Gallery"}
                  className="h-full w-full object-cover"
                />
                {!item.is_active && (
                  <span className="absolute left-2 top-2 bg-graphite px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-bone">
                    Hidden
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
