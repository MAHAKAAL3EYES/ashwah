-- =====================================================================
-- ASHVAH — Seed Data
-- =====================================================================
-- Populates 11 categories + every product currently visible on
-- https://www.ashvah.in (scraped May 2026). Specs filled in where the
-- live site provides them; rest left null for staff to fill via admin.
-- =====================================================================

-- ----------- 11 Categories (display_order matches typical retail flow)
insert into public.categories (slug, name, description, display_order, seo_title, seo_description) values
  ('t-shirts',        'T-Shirts',          'Lightweight knit fabrics engineered for breathability, print performance, and dimensional stability across casual and sport-cut tees.', 1, 'T-Shirt Fabric Manufacturers & Suppliers', 'Premium T-shirt fabrics for garment manufacturers, sportswear brands, and resellers. Wide range of knit constructions with consistent quality.'),
  ('sandos',          'Sandos',            'Featherweight, ribbed, and stretch-engineered fabrics designed for gym vests and sleeveless activewear with high recovery.', 2, 'Sandos Fabric Suppliers', 'Performance Sandos fabrics for gym vests and activewear manufacturers across India.'),
  ('shorts',          'Shorts',            'Quick-dry, four-way stretch, and performance woven fabrics built for athletic shorts, training shorts, and casual wear.', 3, 'Shorts Fabric Manufacturers', 'Shorts fabric range covering knit, woven and stretch constructions. B2B supply across India.'),
  ('joggers',         'Joggers',           'Loop-knit, fleece, and structured fabrics with the drape, weight, and stretch profile required for premium joggers.', 4, 'Joggers Fabric Suppliers', 'Premium joggers fabrics — loop knit, fleece, and stretch constructions for garment manufacturers.'),
  ('lowers',          'Lowers',            'The broadest category in the catalogue — covering trackpants, lowers, leggings, and athleisure bottoms in over a dozen constructions.', 5, 'Lowers Fabric Manufacturers & Suppliers', 'Top Lowers fabric suppliers in Delhi NCR. Wide range including Spandex, Lycra, Sinker, Loop Knit, and Matty fabrics.'),
  ('cargos',          'Cargos',            'Durable woven and stretch-woven fabrics with the structure and abrasion resistance demanded by cargo and utility wear.', 6, 'Cargos Fabric Suppliers', 'Cargo pants fabrics for garment manufacturers. Durable woven constructions in stock.'),
  ('track-suits',     'Track Suits',       'Co-ordinated knit and woven fabrics suited for two-piece track suit construction — engineered for movement, washability, and print compatibility.', 7, 'Track Suit Fabric Manufacturers', 'Track suit fabrics for sportswear brands and clothing manufacturers across pan India.'),
  ('sweat-shirts',    'Sweat Shirts',      'Fleece, loop-back, and brushed knit fabrics with the GSM and hand-feel required for premium sweatshirts and hoodies.', 8, 'Sweat Shirt Fabric Suppliers', 'Sweatshirt and hoodie fabrics — fleece and loop-back constructions for B2B supply.'),
  ('jackets',         'Jackets',           'Technical shells, woven outers, and bonded constructions engineered for jackets, windcheaters, and outerwear.', 9, 'Jackets Fabric Manufacturers', 'Jacket and outerwear fabrics for manufacturers across India.'),
  ('sports-kits',     'Sports Kits',       'Sublimation-ready knits, mesh, and interlock fabrics engineered specifically for team kits and uniform production.', 10, 'Sports Kit Fabric Suppliers', 'Sports kit fabrics for team uniform manufacturers — sublimation-ready and dimensionally stable.'),
  ('lining-designing','Lining & Designing','Supporting fabrics — linings, mesh, accents, and designer overlays — used to finish, line, and detail finished garments.', 11, 'Lining & Designing Fabric Suppliers', 'Lining and designing fabrics for garment manufacturers — mesh, taffeta, and accent overlays.');

-- ----------- Products (real data from live site)


-- ----------- Products (full catalogue from ashvah.in)
insert into public.products (slug, name, gsm, width, fabric_type, used_for, full_description, short_description, is_star, is_customizable, in_stock, is_active, display_order) values
  ('reebok-knit-fabric', 'Reebok Knit Fabric', 170, '35" Tube', 'Knit', array['T-Shirts','Sandos','Gym Vest','Shorts'], 'Reebok Knit Fabric is a versatile and durable fabric engineered for a wide range of activewear applications. Its unique blend of natural and synthetic fibres delivers a soft, comfortable feel while retaining toughness and resistance to wear.', 'Reebok Knit Fabric is a versatile and durable fabric engineered for a wide range of activewear applications.', true, true, true, true, 1),
  ('ns-crush-tpu', 'NS Crush TPU', 135, '60"', 'TPU Knit', array['Lowers','Shorts','Track Suits','Jackets'], 'NS Crush TPU is a technical performance fabric featuring four-way stretch and a refined TPU finish, engineered for high-mobility garments where recovery, breathability, and weight matter.', 'NS Crush TPU is a technical performance fabric featuring four-way stretch and a refined TPU finish, engineered for high-mobility garments where recovery, breathability, and weight matter.', true, true, true, true, 2),
  ('pc-loop-knit', 'PC Loop Knit', 250, '42" Tube', 'Loop Knit', array['Lowers','Joggers','Shorts'], 'PC Loop Knit is a versatile and durable poly-cotton loop-back knit known for its strength and resistance to wear. Its blend of natural and synthetic fibres provides a soft feel while retaining toughness, ideal for lowers, joggers and shorts.', 'PC Loop Knit is a versatile and durable poly-cotton loop-back knit known for its strength and resistance to wear.', true, true, true, true, 3),
  ('spandex-dot', 'Spandex Dot', null, null, 'Spandex Knit', array['Lowers','Joggers','Shorts'], null, 'Spandex Dot — premium spandex knit fabric for Lowers, Joggers.', false, true, true, true, 4),
  ('dobby-lycra', 'Dobby Lycra', null, null, 'Lycra Weave', array['Lowers','Shorts','Cargos','Track Suits'], null, 'Dobby Lycra — premium lycra weave fabric for Lowers, Shorts.', false, true, true, true, 5),
  ('airjet-sinker', 'Airjet Sinker', null, null, 'Sinker Knit', array['Lowers','Shorts','T-Shirts'], null, 'Airjet Sinker — premium sinker knit fabric for Lowers, Shorts.', false, true, true, true, 6),
  ('pc-sinker', 'PC Sinker', null, null, 'Sinker Knit', array['Lowers','Shorts','T-Shirts'], null, 'PC Sinker — premium sinker knit fabric for Lowers, Shorts.', false, true, true, true, 7),
  ('pc-matty', 'PC Matty', null, null, 'Matty Weave', array['Lowers','Joggers','Shorts','T-Shirts'], null, 'PC Matty — premium matty weave fabric for Lowers, Joggers.', false, true, true, true, 8),
  ('airjet-loop-knit', 'Airjet Loop Knit', null, null, 'Loop Knit', array['Lowers','Shorts','T-Shirts'], null, 'Airjet Loop Knit — premium loop knit fabric for Lowers, Shorts.', false, true, true, true, 9),
  ('swead-lycra', 'Swead Lycra', null, null, 'Lycra Knit', array['Lowers','Shorts','T-Shirts'], null, 'Swead Lycra — premium lycra knit fabric for Lowers, Shorts.', false, true, true, true, 10),
  ('super-soft-lycra', 'Super Soft Lycra', null, null, 'Lycra Knit', array['Lowers','Shorts'], null, 'Super Soft Lycra — premium lycra knit fabric for Lowers, Shorts.', false, true, true, true, 11),
  ('spandex-rib', 'Spandex Rib', null, null, 'Rib Knit', array['Lowers'], null, 'Spandex Rib — premium rib knit fabric for Lowers.', false, true, true, true, 12),
  ('nylon-terry', 'Nylon Terry', null, null, 'Terry Knit', array['Lowers','Cargos','Track Suits','Jackets'], null, 'Nylon Terry — premium terry knit fabric for Lowers, Cargos.', false, true, true, true, 13),
  ('n-s-lycra-p', 'N S Lycra (P)', 140, '60"', 'Lycra Woven', array['Lowers','Shorts','Track Suits'], 'N S Lycra (P) is a flexible, breathable woven fabric blend ideal for crafting lowers, track pants, joggers, shorts and track suits. With Lycra content it offers excellent stretch, comfort and shape retention.', 'N S Lycra (P) is a flexible, breathable woven fabric blend ideal for crafting lowers, track pants, joggers, shorts and track suits.', false, true, true, true, 14),
  ('black-creta', 'Black Creta', null, null, 'Knit', array['Lowers','Joggers'], null, 'Black Creta — premium knit fabric for Lowers, Joggers.', false, true, true, true, 15),
  ('denim-lycra-fabric', 'Denim Lycra Fabric', null, null, 'Lycra Weave', array['Lowers','Joggers','Cargos'], null, 'Denim Lycra Fabric — premium lycra weave fabric for Lowers, Joggers.', false, true, true, true, 16),
  ('tencel', 'Tencel', null, null, 'Knit', array['T-Shirts'], null, 'Tencel — premium knit fabric for T-Shirts.', false, true, true, true, 17),
  ('honeycomb', 'Honeycomb', null, null, 'Knit', array['T-Shirts','Shorts','Sports Kits','Lining & Designing'], null, 'Honeycomb — premium knit fabric for T-Shirts, Shorts.', false, true, true, true, 18),
  ('mesh-fabric', 'Mesh Fabric', null, null, 'Mesh', array['T-Shirts'], null, 'Mesh Fabric — premium mesh fabric for T-Shirts.', false, true, true, true, 19),
  ('sf-33', 'SF 33', null, null, 'Knit', array['T-Shirts','Sandos','Shorts'], null, 'SF 33 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 20),
  ('platinum-milange', 'Platinum Milange', null, null, 'Milange Knit', array['T-Shirts','Sandos','Shorts'], null, 'Platinum Milange — premium milange knit fabric for T-Shirts, Sandos.', false, true, true, true, 21),
  ('slub-lycra', 'Slub Lycra', null, null, 'Lycra Knit', array['T-Shirts','Sandos','Shorts'], null, 'Slub Lycra — premium lycra knit fabric for T-Shirts, Sandos.', false, true, true, true, 22),
  ('sf-1037', 'SF 1037', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF 1037 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 23),
  ('sf-0147', 'SF 0147', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF 0147 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 24),
  ('sf-1269', 'SF 1269', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF 1269 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 25),
  ('sf-0191', 'SF 0191', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF 0191 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 26),
  ('polymesh-stripes', 'Polymesh Stripes', null, null, 'Poly Mesh', array['T-Shirts'], null, 'Polymesh Stripes — premium poly mesh fabric for T-Shirts.', false, true, true, true, 27),
  ('sf94-fabric', 'SF-94 Fabric', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF-94 Fabric — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 28),
  ('sf142', 'SF-142', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF-142 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 29),
  ('sf1101-mesh-print-fabric-dno2', 'SF-1101 Mesh Print Fabric (D.No.2)', null, null, 'Mesh Print', array['T-Shirts','Sandos'], null, 'SF-1101 Mesh Print Fabric (D.No.2) — premium mesh print fabric for T-Shirts, Sandos.', false, true, true, true, 30),
  ('sf1014', 'SF-1014', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF-1014 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 31),
  ('sf1101', 'SF-1101', null, null, 'Mesh Print', array['T-Shirts','Sandos'], null, 'SF-1101 — premium mesh print fabric for T-Shirts, Sandos.', false, true, true, true, 32),
  ('sf044', 'SF-044', null, null, 'Knit', array['T-Shirts','Sandos'], null, 'SF-044 — premium knit fabric for T-Shirts, Sandos.', false, true, true, true, 33),
  ('pc-denim', 'PC Denim', null, null, 'Denim Weave', array['Shorts','Cargos','Track Suits'], null, 'PC Denim — premium denim weave fabric for Shorts, Cargos.', false, true, true, true, 34),
  ('ottoman-memory', 'Ottoman Memory', null, null, 'Memory Weave', array['Jackets'], null, 'Ottoman Memory — premium memory weave fabric for Jackets.', false, true, true, true, 35),
  ('ns-micro', 'NS Micro', null, null, 'Micro Woven', array['Jackets','Track Suits'], null, 'NS Micro — premium micro woven fabric for Jackets, Track Suits.', false, true, true, true, 36),
  ('ns-lycra-cool', 'NS Lycra Cool', null, null, 'Lycra Woven', array['Jackets','Shorts','Track Suits'], null, 'NS Lycra Cool — premium lycra woven fabric for Jackets, Shorts.', false, true, true, true, 37),
  ('ns-butter', 'NS Butter', null, null, 'Woven', array['Jackets'], null, 'NS Butter — premium woven fabric for Jackets.', false, true, true, true, 38),
  ('zero-mesh', 'Zero Mesh', null, null, 'Mesh', array['Lining & Designing'], null, 'Zero Mesh — premium mesh fabric for Lining & Designing.', false, true, true, true, 39),
  ('tafta', 'Tafta', null, null, 'Woven Lining', array['Lining & Designing'], null, 'Tafta — premium woven lining fabric for Lining & Designing.', false, true, true, true, 40),
  ('ns-lycra-laser-cut', 'NS Lycra Laser Cut', null, null, 'Lycra Woven', array['Lining & Designing'], null, 'NS Lycra Laser Cut — premium lycra woven fabric for Lining & Designing.', false, true, true, true, 41);

-- ----------- Product ↔ Category links
insert into public.product_categories (product_id, category_id)
  select p.id, c.id from public.products p, public.categories c where p.slug = 'reebok-knit-fabric' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'reebok-knit-fabric' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'reebok-knit-fabric' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-crush-tpu' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-crush-tpu' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-crush-tpu' and c.slug = 'track-suits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-crush-tpu' and c.slug = 'jackets'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-loop-knit' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-loop-knit' and c.slug = 'joggers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-loop-knit' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'spandex-dot' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'spandex-dot' and c.slug = 'joggers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'spandex-dot' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'dobby-lycra' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'dobby-lycra' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'dobby-lycra' and c.slug = 'cargos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'dobby-lycra' and c.slug = 'track-suits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'airjet-sinker' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'airjet-sinker' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'airjet-sinker' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-sinker' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-sinker' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-sinker' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-matty' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-matty' and c.slug = 'joggers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-matty' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-matty' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'airjet-loop-knit' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'airjet-loop-knit' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'airjet-loop-knit' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'swead-lycra' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'swead-lycra' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'swead-lycra' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'super-soft-lycra' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'super-soft-lycra' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'spandex-rib' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'nylon-terry' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'nylon-terry' and c.slug = 'cargos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'nylon-terry' and c.slug = 'track-suits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'nylon-terry' and c.slug = 'jackets'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'n-s-lycra-p' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'n-s-lycra-p' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'n-s-lycra-p' and c.slug = 'track-suits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'black-creta' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'black-creta' and c.slug = 'joggers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'denim-lycra-fabric' and c.slug = 'lowers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'denim-lycra-fabric' and c.slug = 'joggers'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'denim-lycra-fabric' and c.slug = 'cargos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'tencel' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'honeycomb' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'honeycomb' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'honeycomb' and c.slug = 'sports-kits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'honeycomb' and c.slug = 'lining-designing'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'mesh-fabric' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-33' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-33' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-33' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'platinum-milange' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'platinum-milange' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'platinum-milange' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'slub-lycra' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'slub-lycra' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'slub-lycra' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-1037' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-1037' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-0147' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-0147' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-1269' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-1269' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-0191' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf-0191' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'polymesh-stripes' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf94-fabric' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf94-fabric' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf142' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf142' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf1101-mesh-print-fabric-dno2' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf1101-mesh-print-fabric-dno2' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf1014' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf1014' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf1101' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf1101' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf044' and c.slug = 't-shirts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'sf044' and c.slug = 'sandos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-denim' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-denim' and c.slug = 'cargos'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'pc-denim' and c.slug = 'track-suits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ottoman-memory' and c.slug = 'jackets'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-micro' and c.slug = 'jackets'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-micro' and c.slug = 'track-suits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-lycra-cool' and c.slug = 'jackets'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-lycra-cool' and c.slug = 'shorts'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-lycra-cool' and c.slug = 'track-suits'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-butter' and c.slug = 'jackets'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'zero-mesh' and c.slug = 'lining-designing'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'tafta' and c.slug = 'lining-designing'
  union all
  select p.id, c.id from public.products p, public.categories c where p.slug = 'ns-lycra-laser-cut' and c.slug = 'lining-designing';

-- ----------- Testimonials (from live site)
insert into public.testimonials (author_name, author_location, quote, rating, is_featured, display_order) values
  ('Gaurav Mehta',     'Surat',   'I have been working with this fabrics supplier for over five years now and I couldn''t be happier with the quality of their products. Their fabrics are always top-notch and their customer service is exceptional. They have a wide variety of fabrics to choose from and they always have the latest trends in stock.', 5, true, 1),
  ('Rajnish Manjanekar','Pune',   'I was in a bind and needed a specific fabric for a rush order and ASHVAH came through for me. Not only did they have the fabric I needed in stock, but they were able to get it to me in record time. Their attention to detail and customer service is outstanding.', 5, true, 2),
  ('Rahul Awasthi',    'Delhi',   'I have been working with ASHVAH for all of my fabric needs for my clothing line for the past two years. The quality of their fabrics is consistently great and their prices are very reasonable. They also have a huge variety of fabrics to choose from which makes it easy to find the perfect fabric for my designs.', 5, true, 3),
  ('Rajiv Gupta',      'Patna',   'I have been a customer of ASHVAH for several years and I have always been impressed with the quality of their fabrics. Their customer service is exceptional and they are always willing to go the extra mile to ensure that I am satisfied with my order.', 5, false, 4),
  ('Armaan Malik',     'Udaipur', 'I recently started my own sportswear and gym wear business and was in need of a reliable fabric supplier. I found ASHVAH and I couldn''t be happier with my choice. Their fabrics are of high quality and their prices are very reasonable.', 5, false, 5);

-- ----------- Site settings — homepage content blocks
insert into public.site_settings (key, value, description) values
  ('hero', jsonb_build_object(
    'eyebrow', 'House of Fabrics — Est. 2011',
    'title', 'Performance fabrics, engineered for the manufacturers who build India''s activewear.',
    'subtitle', 'A pan-India supply of knit, woven, and technical fabrics for gym wear, sportswear, and activewear brands.',
    'primary_cta_label', 'Explore Fabrics',
    'primary_cta_href', '/fabrics',
    'secondary_cta_label', 'Enquire on WhatsApp',
    'secondary_cta_href', 'https://api.whatsapp.com/send?phone=919053060101'
  ), 'Homepage hero copy'),

  ('stats', jsonb_build_array(
    jsonb_build_object('label', 'Years in textiles', 'value', '14+'),
    jsonb_build_object('label', 'Fabrics in catalogue', 'value', '500+'),
    jsonb_build_object('label', 'Categories served', 'value', '11'),
    jsonb_build_object('label', 'Pan India delivery', 'value', 'Yes')
  ), 'Why-choose-us stat block'),

  ('contact', jsonb_build_object(
    'address', 'Star Heights, Godown no. 1, Street no. 5, Sheetal Nagar, Jhajjar Road, Rohtak',
    'phone_primary', '+91 90530 60102',
    'phone_secondary', '+91 90530 60101',
    'email', 'info@ashvah.in',
    'hours', 'Monday to Saturday · 10:00 AM – 05:00 PM. Sunday closed.',
    'whatsapp_number', '919053060101'
  ), 'Contact details');
