/**
 * ASHVAH brand assets.
 *
 * Logo: official ASHVAH wordmark from the live site.
 * Product imagery: curated fabric macro placeholders for stable rendering.
 */

const USE_LOCAL = process.env.NEXT_PUBLIC_USE_LOCAL_ASSETS === "true";

/** Official ASHVAH logo. */
export const LOGO = USE_LOCAL
  ? "/brand/logo.png"
  : "https://www.ashvah.in/assets/uploads/logo-21122022085604.png";

function unsplash(id: string, w = 1200, q = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

const FABRIC = {
  canvasGrey: "1650406268594-c5d310f6fbce",
  weaveWhite: "1636715986446-d58f0f9b3916",
  canvasWhite: "1693592560460-60dc6d52dc21",
  knitGrey: "1643313262763-4056bfa99dd7",
  denim: "1671624759834-bcf0d3dd2517",
} as const;

export const HERO_IMAGES = {
  primary: unsplash(FABRIC.canvasGrey, 1800, 82),
  secondary: unsplash(FABRIC.weaveWhite, 1400, 80),
  detail: unsplash(FABRIC.canvasWhite, 1200, 80),
};

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

export function imageForFabricType(fabricType: string | null): string {
  const t = (fabricType ?? "").toLowerCase();

  if (t.includes("denim")) return unsplash(FABRIC.denim);
  if (t.includes("lycra") || t.includes("spandex") || t.includes("tpu")) {
    return unsplash(FABRIC.weaveWhite);
  }
  if (t.includes("rib")) return unsplash(FABRIC.knitGrey);
  if (t.includes("terry") || t.includes("loop") || t.includes("fleece")) {
    return unsplash(FABRIC.knitGrey);
  }
  if (t.includes("sinker")) return unsplash(FABRIC.canvasWhite);
  if (t.includes("matty") || t.includes("woven") || t.includes("weave")) {
    return unsplash(FABRIC.canvasGrey);
  }
  if (t.includes("mesh")) return unsplash(FABRIC.weaveWhite);
  if (t.includes("knit")) return unsplash(FABRIC.knitGrey);

  return unsplash(FABRIC.canvasGrey);
}

const SLUG_OVERRIDES: Record<string, string> = {
  "denim-lycra-fabric": unsplash(FABRIC.denim),
  "pc-denim": unsplash(FABRIC.denim),
  "black-creta": unsplash(FABRIC.canvasGrey),
  tencel: unsplash(FABRIC.canvasWhite),
  "pc-loop-knit": unsplash(FABRIC.knitGrey),
  "reebok-knit-fabric": unsplash(FABRIC.knitGrey),
  "ns-crush-tpu": unsplash(FABRIC.weaveWhite),
};

export function productImage(
  slug: string,
  fabricType: string | null = null
): string {
  return SLUG_OVERRIDES[slug] ?? imageForFabricType(fabricType);
}

export function primaryProductImage(
  slug: string,
  fabricType: string | null = null
): string {
  return productImage(slug, fabricType);
}

export function productGallery(
  slug: string,
  fabricType: string | null = null
): string[] {
  const primary = productImage(slug, fabricType);

  const extras = [
    unsplash(FABRIC.weaveWhite, 1000),
    unsplash(FABRIC.canvasGrey, 1000),
    unsplash(FABRIC.canvasWhite, 1000),
    unsplash(FABRIC.knitGrey, 1000),
  ].filter((url) => url !== primary);

  return [primary, ...extras].slice(0, 3);
}

export function categoryImage(slug: string): string {
  const s = slug.toLowerCase();

  if (s.includes("t-shirt") || s.includes("sando") || s.includes("sports")) {
    return unsplash(FABRIC.knitGrey, 1200, 80);
  }

  if (s.includes("short") || s.includes("lower") || s.includes("jogger")) {
    return unsplash(FABRIC.weaveWhite, 1200, 80);
  }

  if (s.includes("cargo") || s.includes("jacket") || s.includes("track")) {
    return unsplash(FABRIC.canvasGrey, 1200, 80);
  }

  if (s.includes("sweat")) {
    return unsplash(FABRIC.knitGrey, 1200, 80);
  }

  if (s.includes("lining") || s.includes("design")) {
    return unsplash(FABRIC.canvasWhite, 1200, 80);
  }

  return unsplash(FABRIC.canvasGrey, 1200, 80);
}
