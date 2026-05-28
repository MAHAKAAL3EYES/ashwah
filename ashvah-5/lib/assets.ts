/**
 * Real ASHVAH brand assets, sourced from the live site (ashvah.in).
 *
 * STRATEGY
 * --------
 * By default these point at the live ashvah.in URLs so real imagery shows up
 * immediately with zero setup. To self-host later, run:
 *
 *     npm run fetch-assets
 *
 * Then set NEXT_PUBLIC_USE_LOCAL_ASSETS=true in your env.
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

/** Product image URLs keyed by product slug. */
export const PRODUCT_IMAGES: Record<string, string[]> = {
  "pc-loop-knit": img([305, 304, 303]),

  "reebok-knit-fabric": gallery(["img-1-0", "img-1-1", "img-1-2"]),
  "ns-crush-tpu": gallery(["img-5-0", "img-5-1", "img-5-2"]),

  "spandex-dot": gallery(["img-132-0"]),
  "dobby-lycra": gallery(["img-133-0"]),
  "airjet-sinker": gallery(["img-168-0"]),
  "pc-sinker": gallery(["img-169-0"]),
  "pc-matty": gallery(["img-170-0"]),
  "airjet-loop-knit": gallery(["img-171-0"]),
  "swead-lycra": gallery(["img-172-0"]),
  "super-soft-lycra": gallery(["img-173-0"]),
  "spandex-rib": gallery(["img-174-0"]),
  "nylon-terry": gallery(["img-175-0"]),
  "n-s-lycra-p": gallery(["img-176-0"]),
  "black-creta": gallery(["img-177-0"]),
  "denim-lycra-fabric": gallery(["img-178-0"]),

  "tafta": gallery(["img-179-0"]),
  "zero-mesh": gallery(["img-180-0"]),
  "honeycomb": gallery(["img-181-0"]),
  "ns-lycra-laser-cut": gallery(["img-182-0"]),

  "pc-denim": gallery(["img-183-0"]),
  "ns-lycra-cool": gallery(["img-184-0"]),
  "mesh-fabric": gallery(["img-185-0"]),
  "platinum-milange": gallery(["img-186-0"]),

  "ottoman-memory": gallery(["img-15-0"], "jfif"),
  "ns-micro": gallery(["img-16-0"], "jfif"),
  "ns-butter": gallery(["img-22-0"], "jfif"),

  // Generic SF fabric fallbacks
  "sf-33": gallery(["img-1-3"]),
  "slub-lycra": gallery(["img-5-0"]),
  "sf-1037": gallery(["img-5-1"]),
  "sf-0147": gallery(["img-5-2"]),
  "sf-1269": gallery(["img-132-0"]),
  "sf-0191": gallery(["img-133-0"]),
  "sf-94-fabric": gallery(["img-168-0"]),
  "sf-142": gallery(["img-169-0"]),
  "sf-1101-mesh-print-fabric-d-no-2": gallery(["img-170-0"]),
  "sf-1014": gallery(["img-171-0"]),
  "sf-1101": gallery(["img-172-0"]),
  "sf-044": gallery(["img-173-0"]),
  "tencel": gallery(["img-174-0"]),
  "polymesh-stripes": gallery(["img-175-0"]),
};

/** Gallery image URLs. */
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

function gallery(names: string[], ext = "jpg"): string[] {
  return names.map((name) => galleryUrl(name, ext));
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
