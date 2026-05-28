import { createClient } from "@/lib/supabase/server";
import type { Product, Category, ProductImage } from "@/types/database";
import {
  FALLBACK_ALL_PRODUCTS,
  FALLBACK_CATEGORIES_FULL,
} from "@/lib/fallback-data";
import { PRODUCT_IMAGES } from "@/lib/assets";

export interface ProductFilters {
  category?: string; // slug
  search?: string;
  useCase?: string;
  starOnly?: boolean;
  customizableOnly?: boolean;
  inStockOnly?: boolean;
}

export interface CatalogueProduct extends Product {
  primary_image_url: string | null;
  category_ids: string[];
  category_slugs: string[];
  category_names: string[];
}

/**
 * Fetch all active products with their categories + primary image, applying
 * optional filters. Falls back to local data when Supabase is unconfigured.
 */
export async function getCatalogueProducts(
  filters: ProductFilters = {}
): Promise<CatalogueProduct[]> {
  const products = await fetchProducts({ includeInactive: false });
  return applyFilters(products, filters);
}

/**
 * Admin variant — returns BOTH active and inactive products so staff can see
 * and unhide hidden products. Never use this for public pages.
 */
export async function getAdminProducts(): Promise<CatalogueProduct[]> {
  return fetchProducts({ includeInactive: true });
}

/** Shared fetch. Public callers pass includeInactive:false. */
async function fetchProducts({
  includeInactive,
}: {
  includeInactive: boolean;
}): Promise<CatalogueProduct[]> {
  try {
    const supabase = createClient() as any;

    let query = supabase
      .from("products")
      .select(
        `*,
         product_images ( url, is_primary, display_order ),
         product_categories ( categories ( id, slug, name ) )`
      );

    if (!includeInactive) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query
      .order("is_star", { ascending: false })
      .order("display_order", { ascending: true });

    if (error || !data) {
      return FALLBACK_ALL_PRODUCTS;
    }

    return (data as any[]).map(mapCatalogueRow);
  } catch {
    return FALLBACK_ALL_PRODUCTS;
  }
}

/** Single product by slug with all images + categories */
export async function getProductBySlug(
  slug: string
): Promise<{
  product: CatalogueProduct;
  images: ProductImage[];
  related: CatalogueProduct[];
} | null> {
  let all: CatalogueProduct[];

  try {
    all = await getCatalogueProducts();
  } catch {
    all = FALLBACK_ALL_PRODUCTS;
  }

  const product = all.find((p) => p.slug === slug);

  if (!product) {
    return null;
  }

  // Related: same category, different product, max 3
  const related = all
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category_slugs.some((s) => product.category_slugs.includes(s))
    )
    .slice(0, 3);

  // Images: try DB, else synthesize from the real asset config
  let images: ProductImage[] = [];

  try {
    const supabase = createClient() as any;

    const { data } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", product.id)
      .order("display_order", { ascending: true });

    images = (data as ProductImage[]) ?? [];
  } catch {
    images = [];
  }

  // Fallback: build gallery from PRODUCT_IMAGES (real ashvah.in URLs)
  if (images.length === 0) {
    const urls = PRODUCT_IMAGES[product.slug] ?? [];

    images = urls.map((url, i) => ({
      id: `${product.slug}-img-${i}`,
      product_id: product.id,
      storage_path: url,
      url,
      alt_text: `${product.name} — view ${i + 1}`,
      is_primary: i === 0,
      display_order: i,
      created_at: "",
    }));
  }

  return { product, images, related };
}

/** Category by slug */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  try {
    const supabase = createClient() as any;

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return FALLBACK_CATEGORIES_FULL.find((c) => c.slug === slug) ?? null;
    }

    return data as Category;
  } catch {
    return FALLBACK_CATEGORIES_FULL.find((c) => c.slug === slug) ?? null;
  }
}

/** All category slugs — for static generation */
export async function getAllCategorySlugs(): Promise<string[]> {
  try {
    const supabase = createClient() as any;

    const { data } = await supabase
      .from("categories")
      .select("slug")
      .eq("is_active", true);

    const rows = data as Array<{ slug: string }> | null;

    if (rows && rows.length > 0) {
      return rows.map((c) => c.slug);
    }
  } catch {
    /* fall through */
  }

  return FALLBACK_CATEGORIES_FULL.map((c) => c.slug);
}

/** All product slugs — for static generation */
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const products = await getCatalogueProducts();
    return products.map((p) => p.slug);
  } catch {
    return FALLBACK_ALL_PRODUCTS.map((p) => p.slug);
  }
}

// ---------- helpers

function mapCatalogueRow(row: any): CatalogueProduct {
  const images = (row.product_images ?? []) as Array<{
    url: string;
    is_primary: boolean;
    display_order: number;
  }>;

  const primary =
    images.find((i) => i.is_primary)?.url ??
    [...images].sort((a, b) => a.display_order - b.display_order)[0]?.url ??
    PRODUCT_IMAGES[row.slug]?.[0] ??
    null;

  const cats = (row.product_categories ?? [])
    .map((pc: any) => pc.categories)
    .filter(Boolean) as Array<{ id: string; slug: string; name: string }>;

  const { product_images, product_categories, ...rest } = row;

  return {
    ...(rest as Product),
    primary_image_url: primary,
    category_ids: cats.map((c) => c.id),
    category_slugs: cats.map((c) => c.slug),
    category_names: cats.map((c) => c.name),
  };
}

function applyFilters(
  products: CatalogueProduct[],
  filters: ProductFilters
): CatalogueProduct[] {
  let out = products;

  if (filters.category) {
    out = out.filter((p) => p.category_slugs.includes(filters.category!));
  }

  if (filters.starOnly) {
    out = out.filter((p) => p.is_star);
  }

  if (filters.customizableOnly) {
    out = out.filter((p) => p.is_customizable);
  }

  if (filters.inStockOnly) {
    out = out.filter((p) => p.in_stock);
  }

  if (filters.useCase) {
    const uc = filters.useCase.toLowerCase();

    out = out.filter((p) =>
      (p.used_for ?? []).some((u) => u.toLowerCase().includes(uc))
    );
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();

    out = out.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.short_description ?? "").toLowerCase().includes(q) ||
        (p.fabric_type ?? "").toLowerCase().includes(q) ||
        (p.used_for ?? []).some((u) => u.toLowerCase().includes(q)) ||
        p.category_names.some((c) => c.toLowerCase().includes(q))
    );
  }

  return out;
}
