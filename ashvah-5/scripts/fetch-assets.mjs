#!/usr/bin/env node
/**
 * fetch-assets.mjs
 * ----------------
 * Downloads all real ASHVAH brand assets from the live site into /public so you
 * can self-host them (better caching, uptime, and Next.js image optimisation).
 *
 * Usage:
 *     node scripts/fetch-assets.mjs
 *     # or
 *     npm run fetch-assets
 *
 * After it completes, set NEXT_PUBLIC_USE_LOCAL_ASSETS=true in .env.local and
 * every asset in lib/assets.ts resolves to the downloaded local copy.
 *
 * It also CRAWLS each /detail/{slug} page to discover the real product image
 * IDs and prints a ready-to-paste PRODUCT_IMAGES map for lib/assets.ts.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE = "https://www.ashvah.in";

const PRODUCT_SLUGS = [
  "spandex-dot", "dobby-lycra", "airjet-sinker", "pc-sinker", "pc-loop-knit",
  "pc-matty", "airjet-loop-knit", "swead-lycra", "super-soft-lycra",
  "spandex-rib", "nylon-terry", "n-s-lycra-p", "black-creta",
  "denim-lycra-fabric",
];

const STATIC_ASSETS = [
  { url: `${BASE}/assets/uploads/logo-21122022085604.png`, out: "public/brand/logo.png" },
];

async function download(url, outRelPath) {
  const outPath = join(ROOT, outRelPath);
  await mkdir(dirname(outPath), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ✗ ${res.status}  ${url}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(outPath, buf);
    console.log(`  ✓ ${outRelPath}  (${(buf.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (e) {
    console.warn(`  ✗ ERROR  ${url}  — ${e.message}`);
    return false;
  }
}

/** Pull product_photo image URLs out of a /detail/{slug} page. */
async function discoverProductImages(slug) {
  try {
    const res = await fetch(`${BASE}/detail/${slug}`);
    if (!res.ok) return [];
    const html = await res.text();
    const re = /assets\/uploads\/product_photo\/(img-\d+-\d+\.(?:jpg|jpeg|png|jfif))/gi;
    const found = new Set();
    let m;
    while ((m = re.exec(html)) !== null) found.add(m[1]);
    return [...found];
  } catch {
    return [];
  }
}

async function main() {
  console.log("\nASHVAH asset fetch\n==================\n");

  console.log("Static assets:");
  for (const a of STATIC_ASSETS) await download(a.url, a.out);

  console.log("\nProduct images (crawling /detail pages):");
  const map = {};
  for (const slug of PRODUCT_SLUGS) {
    const files = await discoverProductImages(slug);
    if (files.length === 0) {
      console.log(`  – ${slug}: no images found`);
      continue;
    }
    map[slug] = [];
    for (const file of files) {
      const ok = await download(
        `${BASE}/assets/uploads/product_photo/${file}`,
        `public/products/${file}`
      );
      if (ok) map[slug].push(`/products/${file}`);
    }
  }

  console.log("\n\nPaste this into lib/assets.ts PRODUCT_IMAGES (local paths):\n");
  console.log("export const PRODUCT_IMAGES = {");
  for (const [slug, files] of Object.entries(map)) {
    console.log(`  "${slug}": [${files.map((f) => `"${f}"`).join(", ")}],`);
  }
  console.log("};\n");
  console.log("Done. Set NEXT_PUBLIC_USE_LOCAL_ASSETS=true to use local copies.\n");
}

main();
