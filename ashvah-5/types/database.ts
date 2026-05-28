// =====================================================================
// Database types — kept in sync with supabase/schema.sql
// =====================================================================

export type StaffRole = "super_admin" | "editor" | "viewer";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "quoted"
  | "closed_won"
  | "closed_lost"
  | "spam";

export type EnquirySource =
  | "contact_form"
  | "product_page"
  | "whatsapp"
  | "phone"
  | "email"
  | "other";

export interface StaffUser {
  id: string;
  email: string;
  full_name: string | null;
  role: StaffRole;
  avatar_url: string | null;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  hero_image_url: string | null;
  display_order: number;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  full_description: string | null;
  gsm: number | null;
  width: string | null;
  fabric_type: string | null;
  used_for: string[] | null;
  functionality: string[] | null;
  is_star: boolean;
  is_customizable: boolean;
  is_active: boolean;
  in_stock: boolean;
  seo_title: string | null;
  seo_description: string | null;
  meta_keywords: string[] | null;
  display_order: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  storage_path: string;
  url: string;
  alt_text: string | null;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  storage_path: string;
  url: string;
  title: string | null;
  caption: string | null;
  tags: string[] | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  company: string | null;
  city: string | null;
  message: string | null;
  product_id: string | null;
  category_id: string | null;
  enquiry_type: string | null;
  requirement_qty: string | null;
  preferred_contact: string | null;
  fabric_category: string | null;
  source: EnquirySource;
  status: EnquiryStatus;
  assigned_to: string | null;
  internal_notes: string | null;
  follow_up_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_location: string | null;
  author_company: string | null;
  quote: string;
  rating: number | null;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting<T = unknown> {
  key: string;
  value: T;
  description: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  diff: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

// ----------- Composed view types for the public site
export interface ProductWithRelations extends Product {
  categories: Pick<Category, "id" | "slug" | "name">[];
  images: ProductImage[];
}

export interface CategoryWithProducts extends Category {
  products: Product[];
  product_count: number;
}

// ----------- Hero / homepage content shapes
export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface ContactContent {
  address: string;
  phone_primary: string;
  phone_secondary: string;
  email: string;
  hours: string;
  whatsapp_number: string;
}

// ----------- Supabase Database<T> shape (for typed queries later)
export type Database = {
  public: {
    Tables: {
      staff_users: { Row: StaffUser; Insert: Partial<StaffUser>; Update: Partial<StaffUser> };
      categories: { Row: Category; Insert: Partial<Category>; Update: Partial<Category> };
      products: { Row: Product; Insert: Partial<Product>; Update: Partial<Product> };
      product_images: { Row: ProductImage; Insert: Partial<ProductImage>; Update: Partial<ProductImage> };
      gallery: { Row: GalleryItem; Insert: Partial<GalleryItem>; Update: Partial<GalleryItem> };
      enquiries: { Row: Enquiry; Insert: Partial<Enquiry>; Update: Partial<Enquiry> };
      testimonials: { Row: Testimonial; Insert: Partial<Testimonial>; Update: Partial<Testimonial> };
      site_settings: { Row: SiteSetting; Insert: Partial<SiteSetting>; Update: Partial<SiteSetting> };
      audit_logs: { Row: AuditLog; Insert: Partial<AuditLog>; Update: Partial<AuditLog> };
    };
    Enums: {
      staff_role: StaffRole;
      enquiry_status: EnquiryStatus;
      enquiry_source: EnquirySource;
    };
  };
};
