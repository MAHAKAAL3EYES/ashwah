import type { MetadataRoute } from "next";
import { getAllProductSlugs, getAllCategorySlugs } from "@/lib/catalogue";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ashvah.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs] = await Promise.all([
    getAllProductSlugs(),
    getAllCategorySlugs(),
  ]);

  const staticRoutes = [
    "",
    "/fabrics",
    "/about",
    "/process",
    "/gallery",
    "/contact",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/fabrics/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = productSlugs.map((slug) => ({
    url: `${BASE_URL}/fabrics/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
