/**
 * Real ASHVAH brand assets, sourced from the live site (ashvah.in).
 *
 * STRATEGY
 * --------
 * By default these point at the live ashvah.in URLs so real imagery shows up
 * immediately with zero setup. To self-host (recommended for production — you
 * control caching, uptime, and Next.js image optimisation), run:
 *
 *     npm run fetch-assets
 *
 * …which downloads every asset below into /public/brand and /public/products.
 * Then set NEXT_PUBLIC_USE_LOCAL_ASSETS=true in your env and the same keys will
 * resolve to the local copies. No code changes needed.
 */

const USE_LOCAL = process.env.NEXT_PUBLIC_USE_LOCAL_ASSETS === "true";
const REMOTE = "https://www.ashvah.in";

function asset(remotePath: string, localPath: string): string {
  return USE_LOCAL ? localPath : `${REMOTE}${remotePath}`;
}

/** The ASHVAH wordmark logo */
export const LOGO = asset(
  "/assets/uploads/logo-21122022085604.png",
  "/brand/logo.png"
);

/** Product image URLs keyed by product slug (sourced from /detail/{slug}). */
export const PRODUCT_IMAGES: Record<string, string[]> = {
  "pc-loop-knit": img([305, 304, 303]),
  // Remaining product image IDs are resolved at fetch time by the
  // fetch-assets script crawling each /detail/{slug} page. Until then these
  // products fall back to procedural swatches, which look intentional.
};

/** Gallery image URLs (from /gallery.php, pages 1–2). */
export const GALLERY_IMAGES: string[] = [
  ...["img-1-0", "img-1-1", "img-1-2", "img-1-3"].map((name) =>
    galleryUrl(name)
  ),
  ...["img-5-0", "img-5-1", "img-5-2"].map((name) => galleryUrl(name)),
  ...["img-15-0", "img-16-0", "img-22-0", "img-23-0"].map((name) =>
    galleryUrl(name, "jfif")
  ),
  ...[
    "img-132-0",
    "img-133-0",
    "img-168-0",
    "img-169-0",
    "img-170-0",
    "img-171-0",
    "img-172-0",
    "img-173-0",
    "img-174-0",
    "img-175-0",
    "img-176-0",
    "img-177-0",
    "img-178-0",
    "img-179-0",
    "img-180-0",
    "img-181-0",
    "img-182-0",
    "img-183-0",
    "img-184-0",
    "img-185-0",
    "img-186-0",
  ].map((name) => galleryUrl(name)),
];

// helpers -----------------------------------------------------------

function img(ids: number[]): string[] {
  return ids.map((id) =>
    asset(
      `/assets/uploads/product_photo/img-${id}-0.jpg`,
      `/products/img-${id}-0.jpg`
    )
  );
}

function galleryUrl(name: string, ext = "jpg"): string {
  return asset(
    `/assets/uploads/product_photo/${name}.${ext}`,
    `/products/${name}.${ext}`
  );
}

/** First image for a product slug, or null if none mapped yet. */
export function primaryProductImage(slug: string): string | null {
  return PRODUCT_IMAGES[slug]?.[0] ?? null;
}
