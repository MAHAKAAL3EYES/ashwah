import { createClient } from "@/lib/supabase/server";
import { primaryProductImage } from "@/lib/assets";
import type {
  Category,
  Product,
  Testimonial,
  HeroContent,
  StatItem,
  ContactContent,
} from "@/types/database";

/**
 * All public-data fetchers. Server-only. RLS handles auth automatically.
 * Falls back to sensible defaults if Supabase isn't configured yet —
 * lets the homepage render even before .env.local is filled in.
 */

// ----- Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createClient() as any;

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data) return FALLBACK_CATEGORIES;

    return data as Category[];
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

// ----- Star products with primary image
export async function getStarProducts(): Promise<
  Array<Product & { primary_image_url: string | null }>
> {
  try {
    const supabase = createClient() as any;

    const { data, error } = await supabase
      .from("products")
      .select(`*, product_images ( url, is_primary, display_order )`)
      .eq("is_active", true)
      .eq("is_star", true)
      .order("display_order", { ascending: true })
      .limit(3);

    if (error || !data) return FALLBACK_STAR_PRODUCTS;

    return (data as any[]).map((p) => {
      const images = (p.product_images ?? []) as Array<{
        url: string;
        is_primary: boolean;
        display_order: number;
      }>;

      const primary =
        images.find((i) => i.is_primary)?.url ??
        [...images].sort((a, b) => a.display_order - b.display_order)[0]
          ?.url ??
        primaryProductImage(p.slug);

      const { product_images, ...rest } = p;

      return { ...rest, primary_image_url: primary };
    });
  } catch {
    return FALLBACK_STAR_PRODUCTS;
  }
}

// ----- Testimonials
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient() as any;

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("display_order", { ascending: true })
      .limit(6);

    if (error || !data) return FALLBACK_TESTIMONIALS;

    return data as Testimonial[];
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

// ----- Site settings (key/value)
export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const supabase = createClient() as any;

    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    const row = data as { value: unknown } | null;

    if (error || !row) return fallback;

    return row.value as T;
  } catch {
    return fallback;
  }
}

export async function getHero(): Promise<HeroContent> {
  return getSiteSetting<HeroContent>("hero", FALLBACK_HERO);
}

export async function getStats(): Promise<StatItem[]> {
  return getSiteSetting<StatItem[]>("stats", FALLBACK_STATS);
}

export async function getContact(): Promise<ContactContent> {
  return getSiteSetting<ContactContent>("contact", FALLBACK_CONTACT);
}

// =====================================================================
// FALLBACK DATA — used when Supabase isn't configured / errors out.
// Mirrors seed.sql so the site renders identically with or without DB.
// =====================================================================

const FALLBACK_HERO: HeroContent = {
  eyebrow: "House of Fabrics — Est. 2011",
  title:
    "Performance fabrics, engineered for the manufacturers who build India's activewear.",
  subtitle:
    "A pan-India supply of knit, woven, and technical fabrics for gym wear, sportswear, and activewear brands.",
  primary_cta_label: "Explore Fabrics",
  primary_cta_href: "/fabrics",
  secondary_cta_label: "Enquire on WhatsApp",
  secondary_cta_href: "https://api.whatsapp.com/send?phone=919053060101",
};

const FALLBACK_STATS: StatItem[] = [
  { label: "Years in textiles", value: "14+" },
  { label: "Fabrics in catalogue", value: "500+" },
  { label: "Categories served", value: "11" },
  { label: "Pan India delivery", value: "Yes" },
];

const FALLBACK_CONTACT: ContactContent = {
  address:
    "Star Heights, Godown no. 1, Street no. 5, Sheetal Nagar, Jhajjar Road, Rohtak",
  phone_primary: "+91 90530 60102",
  phone_secondary: "+91 90530 60101",
  email: "info@ashvah.in",
  hours: "Monday to Saturday · 10:00 AM – 05:00 PM. Sunday closed.",
  whatsapp_number: "919053060101",
};

const FALLBACK_CATEGORIES: Category[] = [
  [
    "t-shirts",
    "T-Shirts",
    "Lightweight knit fabrics engineered for breathability, print performance, and dimensional stability.",
  ],
  [
    "sandos",
    "Sandos",
    "Featherweight, ribbed, and stretch-engineered fabrics for gym vests and sleeveless activewear.",
  ],
  [
    "shorts",
    "Shorts",
    "Quick-dry, four-way stretch, and performance woven fabrics built for athletic and training shorts.",
  ],
  [
    "joggers",
    "Joggers",
    "Loop-knit, fleece, and structured fabrics with the drape and stretch profile required for premium joggers.",
  ],
  [
    "lowers",
    "Lowers",
    "The broadest category — trackpants, lowers, leggings, and athleisure bottoms in over a dozen constructions.",
  ],
  [
    "cargos",
    "Cargos",
    "Durable woven and stretch-woven fabrics with the structure and abrasion resistance demanded by cargo wear.",
  ],
  [
    "track-suits",
    "Track Suits",
    "Co-ordinated knit and woven fabrics suited for two-piece track suit construction.",
  ],
  [
    "sweat-shirts",
    "Sweat Shirts",
    "Fleece, loop-back, and brushed knit fabrics for premium sweatshirts and hoodies.",
  ],
  [
    "jackets",
    "Jackets",
    "Technical shells, woven outers, and bonded constructions engineered for jackets and outerwear.",
  ],
  [
    "sports-kits",
    "Sports Kits",
    "Sublimation-ready knits, mesh, and interlock fabrics engineered for team kits and uniforms.",
  ],
  [
    "lining-designing",
    "Lining & Designing",
    "Supporting fabrics — linings, mesh, accents, and designer overlays for finishing garments.",
  ],
].map(([slug, name, description], i) => ({
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
}));

const FALLBACK_STAR_PRODUCTS: Array<
  Product & { primary_image_url: string | null }
> = [
  {
    id: "fallback-reebok-knit-fabric",
    slug: "reebok-knit-fabric",
    name: "Reebok Knit Fabric",
    short_description:
      "Versatile, durable blended knit with a soft hand and high abrasion resistance — built for high-rotation activewear.",
    full_description: null,
    gsm: 170,
    width: '35" Tube',
    fabric_type: "Knit",
    used_for: ["T-Shirts", "Sandos", "Gym Vest", "Shorts"],
    functionality: null,
    is_star: true,
    is_customizable: true,
    is_active: true,
    in_stock: true,
    seo_title: null,
    seo_description: null,
    meta_keywords: null,
    display_order: 1,
    created_by: null,
    created_at: "",
    updated_at: "",
    primary_image_url: primaryProductImage("reebok-knit-fabric"),
  },
  {
    id: "fallback-ns-crush-tpu",
    slug: "ns-crush-tpu",
    name: "NS Crush TPU",
    short_description:
      "Lightweight 4-way stretch performance fabric with TPU finish — engineered for high-mobility lowers and training shorts.",
    full_description: null,
    gsm: 135,
    width: '60"',
    fabric_type: "TPU Knit",
    used_for: ["Lowers", "Shorts", "Track Suits"],
    functionality: ["4-way stretch"],
    is_star: true,
    is_customizable: true,
    is_active: true,
    in_stock: true,
    seo_title: null,
    seo_description: null,
    meta_keywords: null,
    display_order: 2,
    created_by: null,
    created_at: "",
    updated_at: "",
    primary_image_url: primaryProductImage("ns-crush-tpu"),
  },
  {
    id: "fallback-pc-loop-knit",
    slug: "pc-loop-knit",
    name: "PC Loop Knit",
    short_description:
      "Heavyweight poly-cotton loop knit with structured drape — the workhorse fabric for premium joggers and lowers.",
    full_description: null,
    gsm: 250,
    width: '42" Tube',
    fabric_type: "Loop Knit",
    used_for: ["Lowers", "Joggers", "Shorts"],
    functionality: null,
    is_star: true,
    is_customizable: true,
    is_active: true,
    in_stock: true,
    seo_title: null,
    seo_description: null,
    meta_keywords: null,
    display_order: 3,
    created_by: null,
    created_at: "",
    updated_at: "",
    primary_image_url: primaryProductImage("pc-loop-knit"),
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "f1",
    author_name: "Gaurav Mehta",
    author_location: "Surat",
    author_company: null,
    quote:
      "I have been working with ASHVAH for over five years and I couldn't be happier with the quality. Their fabrics are always top-notch, the variety is wide, and customer service is exceptional.",
    rating: 5,
    display_order: 1,
    is_featured: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "f2",
    author_name: "Rajnish Manjanekar",
    author_location: "Pune",
    author_company: null,
    quote:
      "I was in a bind and needed a specific fabric for a rush order — ASHVAH came through. They had what I needed in stock and delivered in record time. Outstanding attention to detail.",
    rating: 5,
    display_order: 2,
    is_featured: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "f3",
    author_name: "Rahul Awasthi",
    author_location: "Delhi",
    author_company: null,
    quote:
      "Working with ASHVAH for the past two years for my clothing line. Quality is consistently great, prices are reasonable, and the variety makes it easy to find the perfect fabric for any design.",
    rating: 5,
    display_order: 3,
    is_featured: true,
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];
