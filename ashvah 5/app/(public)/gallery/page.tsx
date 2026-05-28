import type { Metadata } from "next";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Reveal } from "@/components/ui/Reveal";
import { createClient } from "@/lib/supabase/server";
import { GALLERY_IMAGES } from "@/lib/assets";
import type { GalleryItem } from "@/types/database";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual archive of ASHVAH fabrics, textures, and finishes across our sportswear and activewear range.",
};

export const revalidate = 300;

async function getGallery(): Promise<GalleryItem[]> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return (data as GalleryItem[]) ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <section className="border-b border-hairline">
        <div className="editorial-container py-section-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-6">
            <p className="eyebrow">Gallery</p>
            <p className="hidden font-mono text-xs uppercase tracking-wider text-silver sm:block">
              Textures · Finishes · Weaves
            </p>
          </div>
          <h1 className="mt-12 max-w-[16ch] text-display-xl">
            <MaskReveal
              lines={[
                "The archive,",
                <span key="2" className="text-silver">up close.</span>,
              ]}
            />
          </h1>
        </div>
      </section>

      <section className="editorial-container py-section-sm">
        {items.length === 0 ? (
          // Fallback — show the real ASHVAH gallery images pulled from the live site
          <>
            <Reveal>
              <p className="mb-12 max-w-xl text-base leading-relaxed text-silver">
                A selection from our archive of sportswear and activewear
                fabrics. Request physical samples of any construction any time.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-3 lg:grid-cols-4">
              {GALLERY_IMAGES.map((url, i) => (
                <Reveal key={i} delay={i * 0.03} className="group bg-white">
                  <div className="relative aspect-square overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`ASHVAH fabric ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04} className="group bg-white">
                <div className="relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.title ?? "ASHVAH fabric"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
                  />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-graphite/90 p-3 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="font-mono text-xs uppercase tracking-wider text-bone">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
