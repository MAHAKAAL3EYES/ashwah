-- =====================================================================
-- ASHVAH — Database Schema (Supabase / PostgreSQL)
-- =====================================================================
-- Run order: schema.sql → seed.sql
-- All tables use UUID primary keys, soft delete via `is_active`,
-- and `created_at`/`updated_at` timestamps with triggers.
-- =====================================================================

-- ----------- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ----------- Helper: auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- 1. STAFF USERS — extends auth.users with role
-- =====================================================================
create type public.staff_role as enum ('super_admin', 'editor', 'viewer');

create table public.staff_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role public.staff_role not null default 'viewer',
  avatar_url text,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_staff_users_updated
  before update on public.staff_users
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 2. CATEGORIES — top-level fabric groups
-- =====================================================================
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  description text,
  hero_image_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_categories_active_order on public.categories (is_active, display_order);
create index idx_categories_slug on public.categories (slug);

create trigger trg_categories_updated
  before update on public.categories
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 3. PRODUCTS — fabric SKUs
-- =====================================================================
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  short_description text,
  full_description text,

  -- Technical specs (nullable — many products don't have full specs)
  gsm int,                       -- weight in grams per square metre
  width text,                    -- e.g. '35" Tube', '60"'
  fabric_type text,              -- e.g. 'Knit', 'Woven', 'TPU'
  used_for text[],               -- e.g. {'T-Shirts','Sandos','Gym Vest'}
  functionality text[],          -- e.g. {'4-way stretch','breathable'}

  -- Flags
  is_star boolean not null default false,
  is_customizable boolean not null default true,
  is_active boolean not null default true,
  in_stock boolean not null default true,

  -- SEO
  seo_title text,
  seo_description text,
  meta_keywords text[],

  -- Display
  display_order int not null default 0,

  created_by uuid references public.staff_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_products_active_star on public.products (is_active, is_star, display_order);
create index idx_products_slug on public.products (slug);
create index idx_products_search_gin on public.products
  using gin (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(short_description,'') || ' ' || coalesce(full_description,'')));

create trigger trg_products_updated
  before update on public.products
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 4. PRODUCT_CATEGORIES — many-to-many
-- =====================================================================
create table public.product_categories (
  product_id uuid not null references public.products(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (product_id, category_id)
);

create index idx_product_categories_category on public.product_categories (category_id);

-- =====================================================================
-- 5. PRODUCT_IMAGES — gallery per product
-- =====================================================================
create table public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,           -- supabase storage object path
  url text not null,                    -- public/signed URL
  alt_text text,
  is_primary boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_product_images_product on public.product_images (product_id, display_order);
create unique index uniq_primary_image_per_product
  on public.product_images (product_id) where is_primary = true;

-- =====================================================================
-- 6. GALLERY — site-wide gallery images (not tied to a product)
-- =====================================================================
create table public.gallery (
  id uuid primary key default uuid_generate_v4(),
  storage_path text not null,
  url text not null,
  title text,
  caption text,
  tags text[],
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_gallery_active_order on public.gallery (is_active, display_order);

create trigger trg_gallery_updated
  before update on public.gallery
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 7. ENQUIRIES — leads from contact forms
-- =====================================================================
create type public.enquiry_status as enum (
  'new', 'contacted', 'qualified', 'quoted', 'closed_won', 'closed_lost', 'spam'
);

create type public.enquiry_source as enum (
  'contact_form', 'product_page', 'whatsapp', 'phone', 'email', 'other'
);

create table public.enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text,
  phone text not null,
  company text,
  city text,
  message text,

  product_id uuid references public.products(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,

  -- Structured B2B lead fields
  enquiry_type text,
  requirement_qty text,
  preferred_contact text,
  fabric_category text,

  source public.enquiry_source not null default 'contact_form',
  status public.enquiry_status not null default 'new',

  -- CRM fields
  assigned_to uuid references public.staff_users(id),
  internal_notes text,
  follow_up_at timestamptz,

  -- Anti-spam / analytics
  ip_address inet,
  user_agent text,
  referrer text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_enquiries_status_created on public.enquiries (status, created_at desc);
create index idx_enquiries_assigned on public.enquiries (assigned_to);
create index idx_enquiries_product on public.enquiries (product_id);

create trigger trg_enquiries_updated
  before update on public.enquiries
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 8. TESTIMONIALS
-- =====================================================================
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  author_location text,
  author_company text,
  quote text not null,
  rating int check (rating between 1 and 5),
  display_order int not null default 0,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_testimonials_active_featured on public.testimonials (is_active, is_featured, display_order);

create trigger trg_testimonials_updated
  before update on public.testimonials
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 9. SITE_SETTINGS — key-value store for homepage content blocks
-- =====================================================================
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  description text,
  updated_by uuid references public.staff_users(id),
  updated_at timestamptz not null default now()
);

create trigger trg_site_settings_updated
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- =====================================================================
-- 10. AUDIT_LOGS — who did what
-- =====================================================================
create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.staff_users(id) on delete set null,
  actor_email text,                          -- captured at log time in case staff is deleted
  action text not null,                      -- 'create','update','delete','login','publish','hide'
  entity_type text not null,                 -- 'product','category','enquiry', etc.
  entity_id uuid,
  diff jsonb,                                -- before/after snapshot
  ip_address inet,
  created_at timestamptz not null default now()
);

create index idx_audit_actor_created on public.audit_logs (actor_id, created_at desc);
create index idx_audit_entity on public.audit_logs (entity_type, entity_id);

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================

-- Helper: get current user's staff role
create or replace function public.current_staff_role()
returns public.staff_role
language sql stable security definer
set search_path = public
as $$
  select role from public.staff_users where id = auth.uid() and is_active = true;
$$;

create or replace function public.is_staff()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.staff_users where id = auth.uid() and is_active = true);
$$;

create or replace function public.is_super_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.staff_users where id = auth.uid() and role = 'super_admin' and is_active = true);
$$;

create or replace function public.is_editor_or_above()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.staff_users where id = auth.uid() and role in ('super_admin','editor') and is_active = true);
$$;

-- Enable RLS on all tables
alter table public.staff_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_images enable row level security;
alter table public.gallery enable row level security;
alter table public.enquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;
alter table public.audit_logs enable row level security;

-- ---------- Public read policies (active rows only)
create policy "public_read_categories" on public.categories
  for select using (is_active = true);

create policy "public_read_products" on public.products
  for select using (is_active = true);

create policy "public_read_product_categories" on public.product_categories
  for select using (true);

create policy "public_read_product_images" on public.product_images
  for select using (true);

create policy "public_read_gallery" on public.gallery
  for select using (is_active = true);

create policy "public_read_testimonials" on public.testimonials
  for select using (is_active = true);

create policy "public_read_site_settings" on public.site_settings
  for select using (true);

-- ---------- Public insert for enquiries (form submissions)
create policy "public_insert_enquiries" on public.enquiries
  for insert with check (true);

-- ---------- Staff write policies
create policy "staff_all_categories" on public.categories
  for all using (public.is_editor_or_above()) with check (public.is_editor_or_above());

create policy "staff_all_products" on public.products
  for all using (public.is_editor_or_above()) with check (public.is_editor_or_above());

create policy "staff_all_product_categories" on public.product_categories
  for all using (public.is_editor_or_above()) with check (public.is_editor_or_above());

create policy "staff_all_product_images" on public.product_images
  for all using (public.is_editor_or_above()) with check (public.is_editor_or_above());

create policy "staff_all_gallery" on public.gallery
  for all using (public.is_editor_or_above()) with check (public.is_editor_or_above());

create policy "staff_read_enquiries" on public.enquiries
  for select using (public.is_staff());

create policy "staff_update_enquiries" on public.enquiries
  for update using (public.is_editor_or_above()) with check (public.is_editor_or_above());

create policy "staff_all_testimonials" on public.testimonials
  for all using (public.is_editor_or_above()) with check (public.is_editor_or_above());

create policy "staff_write_site_settings" on public.site_settings
  for all using (public.is_editor_or_above()) with check (public.is_editor_or_above());

-- ---------- Audit logs: staff read; insert restricted to active staff.
-- Writes happen via server actions running with the staff member's session,
-- so the actor must be an active staff user. Prevents anonymous log spoofing.
create policy "staff_read_audit" on public.audit_logs
  for select using (public.is_staff());

create policy "staff_insert_audit" on public.audit_logs
  for insert with check (public.is_staff());

-- ---------- Staff users: super admin only manages, self can read own row
create policy "staff_read_own" on public.staff_users
  for select using (auth.uid() = id or public.is_super_admin());

create policy "super_admin_manage_staff" on public.staff_users
  for all using (public.is_super_admin()) with check (public.is_super_admin());

-- =====================================================================
-- STORAGE BUCKETS (run separately or via Supabase dashboard)
-- =====================================================================
-- Create these in the Supabase Storage section:
--   1. 'product-images'  (public)
--   2. 'gallery'         (public)
--   3. 'category-heroes' (public)
-- =====================================================================
