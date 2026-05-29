/**
 * ASHVAH brand assets.
 *
 * Logo: the official ASHVAH wordmark, served from the live site.
 * Product imagery: curated, verified fabric-macro photos from Unsplash,
 *   mapped by FABRIC TYPE so every product shows a clean, consistent,
 *   on-brand image (the original site photos were low-res, inconsistent
 *   phone shots — many products had none). All Unsplash IDs below were
 *   verified against unsplash.com (free licence, not Unsplash+ premium).
 *
 * To self-host later: drop files in /public/brand + /public/products and
 * flip NEXT_PUBLIC_USE_LOCAL_ASSETS=true.
 */

const USE_LOCAL = process.env.NEXT_PUBLIC_USE_LOCAL_ASSETS === "true";

/** Official ASHVAH logo (wordmark). */
export const LOGO = USE_LOCAL
  ? "/brand/logo.png"
  : "https://www.ashvah.in/assets/uploads/logo-21122022085604.png";

// ---------------------------------------------------------------------------
// Verified fabric-macro photos (engin akyurt fabric series + canvas macros).
// Consistent lighting / neutral palette → catalogue reads as one premium set.
// ---------------------------------------------------------------------------
function unsplash(id: string, w = 1200, q = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

const FABRIC = {
  /** grey canvas macro — neutral workhorse */
  canvasGrey: "1650406268594-c5d310f6fbce",
  /** white/grey woven weave close-up */
  weaveWhite: "1636715986446-d58f0f9b3916",
  /** bright white canvas texture */
  canvasWhite: "1693592560460-60dc6d52dc21",
  /** grey knit / patterned weave */
  knitGrey: "1643313262763-4056bfa99dd7",
  /** denim / indigo twill */
  denim: "1671624759834-bcf0d3dd2517",
} as const;

/**
 * Map a fabric_type string to the best-fitting verified photo.
 * Falls back to the neutral grey canvas for anything unrecognised.
 */
export function imageForFabricType(fabricType: string | null): string {
  const t = (fabricType ?? "").toLowerCase();

  if (t.includes("denim")) return unsplash(FABRIC.denim);
  if (t.includes("lycra") || t.includes("spandex") || t.includes("tpu"))
    return unsplash(FABRIC.weaveWhite);
  if (t.includes("rib")) return unsplash(FABRIC.knitGrey);
  if (t.includes("terry") || t.includes("loop") || t.includes("fleece"))
    return unsplash(FABRIC.knitGrey);
  if (t.includes("sinker")) return unsplash(FABRIC.canvasWhite);
  if (t.includes("matty") || t.includes("woven") || t.includes("weave"))
    return unsplash(FABRIC.canvasGrey);
  if (t.includes("mesh")) return unsplash(FABRIC.weaveWhite);
  if (t.includes("knit")) return unsplash(FABRIC.knitGrey);

  return unsplash(FABRIC.canvasGrey);
}

/**
 * Per-slug overrides — only where a specific photo fits better than the
 * type-based default. Most products resolve via imageForFabricType().
 */
const SLUG_OVERRIDES: Record<string, string> = {
  "denim-lycra-fabric": unsplash(FABRIC.denim),
  "pc-denim": unsplash(FABRIC.denim),
  "black-creta": unsplash(FABRIC.canvasGrey),
  "tencel": unsplash(FABRIC.canvasWhite),
};

/**
 * Resolve the primary image for a product. Prefers a slug override, then a
 * fabric-type match. Always returns a real image (never null) so no product
 * card is ever empty.
 */
export function productImage(
  slug: string,
  fabricType: string | null
): string {
  return SLUG_OVERRIDES[slug] ?? imageForFabricType(fabricType);
}

/**
 * Build a small gallery (2–3 angles) for a product detail page. Uses the
 * primary plus a couple of complementary textures so the gallery isn't empty.
 */
export function productGallery(
  slug: string,
  fabricType: string | null
): string[] {
  const primary = productImage(slug, fabricType);
  const extras = [
    unsplash(FABRIC.weaveWhite, 1000),
    unsplash(FABRIC.canvasGrey, 1000),
  ].filter((u) => u !== primary);
  return [primary, ...extras].slice(0, 3);
}

/**
 * Hero / atmosphere imagery — same verified set.
 */
export const HERO_IMAGES = {
  primary: unsplash(FABRIC.canvasGrey, 1800, 82),
  secondary: unsplash(FABRIC.weaveWhite, 1400, 80),
  detail: unsplash(FABRIC.canvasWhite, 1200, 80),
};

/** Gallery page imagery — a curated wall of the verified fabric macros. */
export const GALLERY_IMAGES: string[] = [
  unsplash(FABRIC.canvasGrey, 900),
  unsplash(FABRIC.weaveWhite, 900),
  unsplash(FABRIC.canvasWhite, 900),
  unsplash(FABRIC.knitGrey, 900),
  unsplash(FABRIC.denim, 900),
  unsplash(FABRIC.canvasGrey, 900, 70),
  unsplash(FABRIC.weaveWhite, 900, 70),
  unsplash(FABRIC.canvasWhite, 900, 70),
  unsplash(FABRIC.knitGrey, 900, 70),
];
