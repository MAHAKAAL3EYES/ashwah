# ASHVAH — House of Fabrics

Premium B2B textile platform for ASHVAH. Public website + staff-managed catalogue.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · React Three Fiber · Supabase (Postgres + Auth + Storage) · shadcn/ui · React Hook Form · Zod · TanStack Table

**Live reference site:** https://www.ashvah.in

---

## Build Plan (Multi-Phase)

This codebase is being built across multiple sessions. Track progress here.

### ✅ Phase 1 — Foundation (complete)
- [x] Project structure & folder scaffolding
- [x] `package.json` with locked versions
- [x] Next.js config + TypeScript config + Tailwind config
- [x] Design tokens (light theme, editorial typography, spacing)
- [x] Global CSS with fabric-weave background system
- [x] Supabase schema (`supabase/schema.sql`) — all 10 tables + RLS
- [x] Seed data (`supabase/seed.sql`) — 11 categories + real product list scraped from live site
- [x] TypeScript types matching DB schema
- [x] Supabase client setup (browser + server)
- [x] Environment variables template
- [x] Root layout with header/footer shells

### ✅ Phase 2 — Public Homepage (complete)
- [x] `lib/queries.ts` — server-side data fetchers with fallback data
- [x] `Reveal` + `SectionFrame` UI primitives
- [x] 3D fabric ribbon hero (R3F + drei) with vertex-displaced cloth physics
- [x] Mobile/reduced-motion/no-WebGL SVG fallback for ribbon
- [x] `Hero` section — editorial copy, dual CTA, scroll indicator
- [x] `BrandOverview` — large display headline + fact rail
- [x] `CategoryUniverse` — architectural 11-category grid with hover invert
- [x] `StarProducts` — editorial spec sheets (3 products + SVG swatch fallback)
- [x] `WhyChoose` — animated stat counters + proof point grid
- [x] `Process` — sticky horizontal scroll (desktop) / vertical stack (mobile)
- [x] `CustomFabric` — 8 customisation variables in spec sheet style
- [x] `Testimonials` — clean editorial quote grid
- [x] `Contact` + `EnquiryForm` — RHF + Zod, honeypot, posts to `/api/enquiry`
- [x] `app/api/enquiry/route.ts` — validates + persists to Supabase
- [x] Sticky frosted-glass header (already in Phase 1)
- [x] Footer with all links (already in Phase 1)

### ✅ Phase 2.5 — Immersion Pass (complete)
- [x] `CustomCursor` — trailing ring + dot, expands on interactive hover, data-cursor labels, mix-blend-difference, fine-pointer + reduced-motion gated
- [x] `Magnetic` — CTAs and wordmark drift toward cursor with spring physics
- [x] `IntroCurtain` — branded page-load reveal (wordmark + split-panel wipe), once per session, reduced-motion safe
- [x] `ScrollProgress` — ink-accent progress rail under header
- [x] `MaskReveal` — line-by-line headline reveal from behind overflow mask (hero + category headlines)
- [x] `TiltCard` — mouse-tracked 3D tilt + glare on star product swatches
- [x] `CategoryCell` — clip-path wipe-in reveal + sliding accent line on hover
- [x] `Marquee` — infinite-scroll value-prop band (graphite, ink diamonds, edge fades)
- [x] `HeroScrollCue` — animated bouncing scroll indicator
- [x] FabricRibbon upgraded — dual cloth layers, atmospheric fog, autonomous drift via Float, scroll-reactive tilt

### ✅ Phase 3 — Catalogue & Product Pages (complete)
- [x] `/fabrics` — searchable, filterable catalogue (URL-param driven filters, debounced search, star/customizable toggles)
- [x] `/fabrics/[slug]` — dispatches category landing vs product detail from one dynamic segment
- [x] Category view — filtered product grid with category header + enquiry CTA
- [x] Product detail — editorial split layout, image gallery (with swatch fallback), spec sheet, related products
- [x] `ProductCard`, `ProductGallery`, `CatalogueFilters`, `CategoryView` components
- [x] Shared `lib/catalogue.ts` query layer + `lib/fallback-data.ts` (renders without Supabase)
- [x] `FabricSwatch` extracted to shared UI (removed duplicate from StarProducts)
- [x] WhatsApp deep-link CTAs throughout
- [x] Standalone pages: `/about`, `/process`, `/gallery`, `/contact`
- [x] Enquiry form (frontend → `/api/enquiry` → DB) — built Phase 2, wired here

### ✅ Phase 4 — Admin Dashboard (complete)
- [x] `/admin/login` with Supabase Auth + active-staff verification + last_login tracking
- [x] Role-based access (`lib/auth.ts`: requireStaff / requireRole / canEdit; super_admin > editor > viewer)
- [x] `AdminSidebar` (role-aware nav) + `AdminPageHeader` shell
- [x] Dashboard with live counts + new-enquiry alert + quick actions
- [x] Product CRUD — list (`ProductsTable`, search + hide/unhide), create/edit (`ProductForm`)
- [x] Category management (`CategoriesManager`, inline modal add/edit)
- [x] Enquiry inbox — CRM-style (`EnquiriesTable`: status filter, detail drawer, WhatsApp reply, notes)
- [x] Gallery management (read view + Supabase Storage upload guidance)
- [x] Homepage content management (`ContentForm`: edit hero + contact)
- [x] Staff user management (super_admin only)
- [x] Audit logs (last 200 actions) + audit() logging on all writes
- [x] Server actions (`lib/actions.ts`) with permission gating + revalidatePath
- Note: image upload uses Supabase Storage buckets (wired); in-app upload UI is a future iteration

### ✅ Phase 5 — Polish & Ship (complete)
- [x] SEO metadata (root + per-page generateMetadata on products/categories)
- [x] `app/sitemap.ts` — dynamic, includes all product + category slugs
- [x] `app/robots.ts` — blocks /admin + /api
- [x] `app/opengraph-image.tsx` — branded dynamic OG card
- [x] LocalBusiness JSON-LD structured data in root layout
- [x] Branded `not-found.tsx` (404)
- [x] `vercel.json` — bom1 region, security headers, admin noindex
- [ ] Lighthouse pass — pending live deploy (can't run in sandbox)
- [ ] Domain cutover from ashvah.in — pending your DNS access

### ✅ Real ASHVAH assets wired (live from ashvah.in)
- Logo, 28 real gallery photos, and PC Loop Knit's 3 real product images mapped in `lib/assets.ts`
- Real product slugs verified identical to ours (`spandex-dot`, `pc-loop-knit`, …)
- `next.config.mjs` whitelists `www.ashvah.in` for next/image
- Two modes: (1) default loads from live ashvah.in URLs — zero setup; (2) run
  `npm run fetch-assets` to download all images into `/public` and crawl every
  `/detail/{slug}` page for the rest, then set `NEXT_PUBLIC_USE_LOCAL_ASSETS=true`
- Note: sandbox firewall excludes ashvah.in so the image *files* weren't downloaded
  here, but every URL is wired + verified; `fetch-assets` localises in one command

### ⚠️ Verification status — the npm registry corrupts tarball
downloads (`Z_DATA_ERROR`) consistently. Verification done via static analysis instead:
brace/paren balance (73 files, all balanced), `@/` import resolution (all resolve),
client/server boundary (no client file imports server-only modules), use-client directives,
async-client-component check, and type-contract cross-check against `types/database.ts`.
First action on a real machine: `npm install && npm run build` to confirm.

---

## Design System Lock

**Colours**
- BG: `#FAF9F6` (bone)
- Surface: `#FFFFFF` (pure white cards)
- Text primary: `#111111`
- Text secondary: `#666666`
- Border: `#E5E5E5`
- Accent: `#0A2540` (refined ink-blue, used minimally on CTAs)

**Type**
- Display/headings: Neue Haas Grotesk Display / Inter Tight (fallback)
- Body: Inter
- Mono (specs): JetBrains Mono

**Radius:** 0px default, 2px for cards, never bubbly
**Borders:** 1px solid `#E5E5E5` — primary separator
**Shadows:** Avoid. Rely on borders. Modal shadow only.

---

## Local Setup (when ready to run)

```bash
pnpm install
cp .env.example .env.local
# Fill Supabase URL + keys
pnpm supabase db push  # runs schema.sql
pnpm supabase db seed  # runs seed.sql
pnpm dev
```

---

## Real Product Data (scraped from live site)

Currently catalogued products by category:

**LOWERS:** Spandex Dot, Dobby Lycra, Airjet Sinker, PC Sinker, PC Loop Knit, PC Matty, Airjet Loop Knit, Swead Lycra, Super Soft Lycra, Spandex Rib, Nylon Terry, N S Lycra (P), Black Creta, Denim Lycra Fabric

**Star products (with full specs):**
- Reebok Knit Fabric — 170 GSM, 35" Tube — T-Shirts, Sandos, Gym Vest, Shorts
- NS Crush TPU — 135 GSM, 60" — Lowers, Shorts, Track Suits (4-way stretch)
- PC Loop Knit — 250 GSM, 42" Tube — Lowers, Joggers, Shorts

Remaining categories (Sweat Shirts, Lining & Designing, Joggers, Cargos, Shorts, Sandos, T-Shirts, Sports Kits, Track Suits, Jackets) will be populated via the admin CMS once Phase 4 ships.

---

## Round 2 — Review Fixes (post-audit)

Addressed the production-readiness review. Status of each item:

### ✅ Fixed (verified)
1. **Category assignment in ProductForm** — multi-select category checkboxes,
   pre-checked on edit. `saveProduct` now writes `product_categories`: deletes
   old links and inserts selected ones (replace-on-edit). `CatalogueProduct`
   carries `category_ids` through query → mapper → fallback.
2. **Hidden products no longer vanish from admin** — new `getAdminProducts()`
   (active + inactive) powers the admin list, edit lookup, and category counts.
   Public pages keep `getCatalogueProducts()` (active only).
3. **Seed completed** — all 41 real products from ashvah.in across every
   category, 97 product↔category links. Sweat Shirts intentionally empty
   (matches live "No record found"). SF-series, NS-series, Tafta, Zero Mesh,
   Ottoman Memory, etc. all seeded.
4. **Enquiry form upgraded** — added enquiry type (Bulk / Custom / Sample /
   Reseller / Manufacturer), fabric category dropdown, estimated requirement,
   preferred contact (WhatsApp / Call / Email). Product pages prefill
   product/category/type via query params. New DB columns + type + validation +
   admin drawer display all wired.
5. **Production security**
   - `audit_logs` insert locked to active staff (`is_staff()`), was `(true)`.
   - All 4 `security definer` functions now `set search_path = public`.
   - Enquiry API no longer returns success on a failed insert — returns a real
     error (502) so leads can't silently vanish; only returns a graceful
     "not configured" (503) when Supabase env is genuinely absent.
   - **`package-lock.json` generated** (588 packages pinned, lockfile v3).

### ⚠️ Deferred (documented, not yet built)
- **In-app image upload** (product main/swatch/gallery via Supabase Storage
  with alt text + primary selector + reorder). Buckets and `product_images`
  table are wired; the upload UI is still the documented manual-via-dashboard
  path. This is the largest remaining piece.
- **In-app staff creation** — still the safer Supabase-dashboard invite flow.
- **Visual identity push** (darker textile-lab sections, macro fabric texture
  zones) — design direction noted; not yet executed.
- **Confirmed `next build`** — still blocked by the sandbox registry tarball
  corruption. Lockfile + static checks done; run `npm ci && npm run build`
  locally to confirm.
