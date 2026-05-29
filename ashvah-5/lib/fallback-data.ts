import type { Category, Product } from "@/types/database";
import type { CatalogueProduct } from "@/lib/catalogue";
import { productImage } from "@/lib/assets";

/**
 * Local mirror of seed.sql. Used whenever Supabase isn't configured or a query
 * fails, so the site is always fully browsable. Keep in sync with seed.sql.
 */

const CATEGORY_DEFS: Array<[string, string, string]> = [
  ["t-shirts", "T-Shirts", "Lightweight knit fabrics engineered for breathability, print performance, and dimensional stability across casual and sport-cut tees."],
  ["sandos", "Sandos", "Featherweight, ribbed, and stretch-engineered fabrics designed for gym vests and sleeveless activewear with high recovery."],
  ["shorts", "Shorts", "Quick-dry, four-way stretch, and performance woven fabrics built for athletic shorts, training shorts, and casual wear."],
  ["joggers", "Joggers", "Loop-knit, fleece, and structured fabrics with the drape, weight, and stretch profile required for premium joggers."],
  ["lowers", "Lowers", "The broadest category in the catalogue — covering trackpants, lowers, leggings, and athleisure bottoms in over a dozen constructions."],
  ["cargos", "Cargos", "Durable woven and stretch-woven fabrics with the structure and abrasion resistance demanded by cargo and utility wear."],
  ["track-suits", "Track Suits", "Co-ordinated knit and woven fabrics suited for two-piece track suit construction — engineered for movement, washability, and print compatibility."],
  ["sweat-shirts", "Sweat Shirts", "Fleece, loop-back, and brushed knit fabrics with the GSM and hand-feel required for premium sweatshirts and hoodies."],
  ["jackets", "Jackets", "Technical shells, woven outers, and bonded constructions engineered for jackets, windcheaters, and outerwear."],
  ["sports-kits", "Sports Kits", "Sublimation-ready knits, mesh, and interlock fabrics engineered specifically for team kits and uniform production."],
  ["lining-designing", "Lining & Designing", "Supporting fabrics — linings, mesh, accents, and designer overlays — used to finish, line, and detail finished garments."],
];

export const FALLBACK_CATEGORIES_FULL: Category[] = CATEGORY_DEFS.map(
  ([slug, name, description], i) => ({
    id: `fallback-${slug}`,
    slug,
    name,
    description,
    hero_image_url: null,
    display_order: i + 1,
    is_active: true,
    seo_title: null,
    seo_description: null,
    created_at: "",
    updated_at: "",
  })
);

function makeProduct(
  partial: Partial<Product> & { slug: string; name: string },
  categorySlugs: string[]
): CatalogueProduct {
  const base: Product = {
    id: `fallback-${partial.slug}`,
    slug: partial.slug,
    name: partial.name,
    short_description: partial.short_description ?? null,
    full_description: partial.full_description ?? null,
    gsm: partial.gsm ?? null,
    width: partial.width ?? null,
    fabric_type: partial.fabric_type ?? null,
    used_for: partial.used_for ?? null,
    functionality: partial.functionality ?? null,
    is_star: partial.is_star ?? false,
    is_customizable: partial.is_customizable ?? true,
    is_active: true,
    in_stock: partial.in_stock ?? true,
    seo_title: null,
    seo_description: null,
    meta_keywords: null,
    display_order: partial.display_order ?? 0,
    created_by: null,
    created_at: "",
    updated_at: "",
  };
  const names = categorySlugs.map(
    (s) => CATEGORY_DEFS.find((c) => c[0] === s)?.[1] ?? s
  );
  return {
    ...base,
    primary_image_url: productImage(partial.slug, base.fabric_type),
    category_ids: categorySlugs.map((s) => `fallback-${s}`),
    category_slugs: categorySlugs,
    category_names: names,
  };
}

export const FALLBACK_ALL_PRODUCTS: CatalogueProduct[] = [
  // Star products
  makeProduct(
    {
      slug: "reebok-knit-fabric",
      name: "Reebok Knit Fabric",
      short_description:
        "Versatile, durable blended knit with a soft hand and high abrasion resistance — built for high-rotation activewear.",
      full_description:
        "Reebok Knit Fabric is a versatile and durable fabric engineered for a wide range of activewear applications. Its unique blend of natural and synthetic fibres delivers a soft, comfortable feel while retaining toughness and resistance to wear. Suitable for t-shirts, sandos, gym vests and shorts where breathability and durability are equally critical.",
      gsm: 170,
      width: '35" Tube',
      fabric_type: "Knit",
      used_for: ["T-Shirts", "Sandos", "Gym Vest", "Shorts"],
      is_star: true,
      display_order: 1,
    },
    ["t-shirts", "sandos", "shorts"]
  ),
  makeProduct(
    {
      slug: "ns-crush-tpu",
      name: "NS Crush TPU",
      short_description:
        "Lightweight 4-way stretch performance fabric with TPU finish — engineered for high-mobility lowers and training shorts.",
      full_description:
        "NS Crush TPU is a technical performance fabric featuring four-way stretch and a refined TPU finish. The construction is engineered for high-mobility garments where recovery, breathability, and weight matter — making it a preferred choice for lowers, shorts, and track suit applications.",
      gsm: 135,
      width: '60"',
      fabric_type: "TPU Knit",
      used_for: ["Lowers", "Shorts", "Track Suits"],
      functionality: ["4-way stretch"],
      is_star: true,
      display_order: 2,
    },
    ["lowers", "shorts", "track-suits"]
  ),
  makeProduct(
    {
      slug: "pc-loop-knit",
      name: "PC Loop Knit",
      short_description:
        "Heavyweight poly-cotton loop knit with structured drape — the workhorse fabric for premium joggers and lowers.",
      full_description:
        "PC Loop Knit is a heavyweight poly-cotton loop-back knit engineered for structure, drape, and durability. Its construction delivers the weight and hand-feel required for premium joggers, lowers, and shorts — making it one of the most consistently specified fabrics in our catalogue.",
      gsm: 250,
      width: '42" Tube',
      fabric_type: "Loop Knit",
      used_for: ["Lowers", "Joggers", "Shorts"],
      is_star: true,
      display_order: 3,
    },
    ["lowers", "joggers", "shorts"]
  ),
  // LOWERS catalogue
  makeProduct({ slug: "spandex-dot", name: "Spandex Dot", short_description: "Stretch-engineered spandex with dot texture — premium hand for lowers and athleisure.", fabric_type: "Spandex Knit", used_for: ["Lowers"], display_order: 10 }, ["lowers"]),
  makeProduct({ slug: "dobby-lycra", name: "Dobby Lycra", short_description: "Dobby-weave lycra blend with structured texture and high recovery.", fabric_type: "Lycra Weave", used_for: ["Lowers"], display_order: 11 }, ["lowers"]),
  makeProduct({ slug: "airjet-sinker", name: "Airjet Sinker", short_description: "Airjet-spun sinker construction — clean surface, smooth hand, ideal for everyday lowers.", fabric_type: "Sinker Knit", used_for: ["Lowers"], display_order: 12 }, ["lowers"]),
  makeProduct({ slug: "pc-sinker", name: "PC Sinker", short_description: "Poly-cotton sinker with balanced weight and dimensional stability.", fabric_type: "Sinker Knit", used_for: ["Lowers"], display_order: 13 }, ["lowers"]),
  makeProduct({ slug: "pc-matty", name: "PC Matty", short_description: "Poly-cotton matty weave — structured surface with breathability for lowers and trackwear.", fabric_type: "Matty Weave", used_for: ["Lowers"], display_order: 14 }, ["lowers"]),
  makeProduct({ slug: "airjet-loop-knit", name: "Airjet Loop Knit", short_description: "Airjet-spun loop knit with refined hand and consistent loop structure.", fabric_type: "Loop Knit", used_for: ["Lowers", "Joggers"], display_order: 15 }, ["lowers", "joggers"]),
  makeProduct({ slug: "swead-lycra", name: "Swead Lycra", short_description: "Lycra-blended fabric with sweat-management properties for active lowers.", fabric_type: "Lycra Knit", used_for: ["Lowers"], display_order: 16 }, ["lowers"]),
  makeProduct({ slug: "super-soft-lycra", name: "Super Soft Lycra", short_description: "Premium soft-handle lycra blend — high recovery, low surface friction.", fabric_type: "Lycra Knit", used_for: ["Lowers"], display_order: 17 }, ["lowers"]),
  makeProduct({ slug: "spandex-rib", name: "Spandex Rib", short_description: "Ribbed spandex with high vertical recovery — used for structured lowers and rib detailing.", fabric_type: "Rib Knit", used_for: ["Lowers"], display_order: 18 }, ["lowers"]),
  makeProduct({ slug: "nylon-terry", name: "Nylon Terry", short_description: "Nylon-based terry construction — moisture-managing and abrasion-resistant.", fabric_type: "Terry Knit", used_for: ["Lowers"], display_order: 19 }, ["lowers"]),
  makeProduct({ slug: "n-s-lycra-p", name: "N S Lycra (P)", short_description: "NS lycra blend with premium finish — engineered for lowers and athleisure.", fabric_type: "Lycra Knit", used_for: ["Lowers"], display_order: 20 }, ["lowers"]),
  makeProduct({ slug: "black-creta", name: "Black Creta", short_description: "Solution-dyed black fabric with consistent shade integrity wash after wash.", fabric_type: "Knit", used_for: ["Lowers"], display_order: 21 }, ["lowers"]),
  makeProduct({ slug: "denim-lycra-fabric", name: "Denim Lycra Fabric", short_description: "Denim-look lycra blend — combines the aesthetic of denim with the stretch of lycra.", fabric_type: "Lycra Weave", used_for: ["Lowers"], display_order: 22 }, ["lowers"]),
];
