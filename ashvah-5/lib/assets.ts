/** Compatibility alias for older catalogue/query code. */
export function primaryProductImage(slug: string, fabricType: string | null = null): string {
  return productImage(slug, fabricType);
}

/** Category image fallback for category cards/CTAs. */
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
