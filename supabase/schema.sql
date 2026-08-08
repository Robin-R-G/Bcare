-- ========================================================
-- BCare Bakery & Kitchen Equipments — Complete Supabase Schema
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCT CATEGORIES
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES product_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  badge TEXT,
  price NUMERIC(12, 2),
  price_on_request BOOLEAN DEFAULT TRUE,
  availability TEXT DEFAULT 'In Stock',
  short_description TEXT,
  description TEXT,
  featured_image TEXT,
  brochure_url TEXT,
  status TEXT DEFAULT 'published', -- 'draft', 'published', 'archived'
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCT IMAGES
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCT SPECIFICATIONS
CREATE TABLE IF NOT EXISTS product_specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  specification_name TEXT NOT NULL,
  specification_value TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- 5. PRODUCT DOCUMENTS & BROCHURES
CREATE TABLE IF NOT EXISTS product_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  document_type TEXT DEFAULT 'brochure',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PROJECTS (COMPLETED SHOWCASE)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  completion_year INT,
  description TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PROJECT IMAGES
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- 8. MEDIA GALLERY
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  album TEXT DEFAULT 'General',
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. VIDEOS SHOWCASE
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'Product Demo',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BLOG ARTICLES
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'Bakery Guide',
  author TEXT DEFAULT 'BCare Team',
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'published',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. GOOGLE REVIEWS & TESTIMONIALS
CREATE TABLE IF NOT EXISTS google_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  avatar_url TEXT,
  location TEXT,
  source TEXT DEFAULT 'Google Review',
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CRM LEADS & QUOTE REQUESTS
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  product_name TEXT,
  source TEXT DEFAULT 'Website Form',
  message TEXT,
  status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Quoted', 'Closed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ADMIN ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Public READ access for published items
CREATE POLICY "Public categories read" ON product_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public products read" ON products FOR SELECT USING (status = 'published');
CREATE POLICY "Public product_images read" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public product_specifications read" ON product_specifications FOR SELECT USING (true);
CREATE POLICY "Public projects read" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public gallery read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public videos read" ON videos FOR SELECT USING (true);
CREATE POLICY "Public blogs read" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Public reviews read" ON google_reviews FOR SELECT USING (is_approved = true);

-- Public INSERT for Leads (Quote/Contact forms)
CREATE POLICY "Public leads insert" ON leads FOR INSERT WITH CHECK (true);

-- Authenticated Admin FULL ACCESS on all tables
CREATE POLICY "Admin full categories" ON product_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full products" ON products FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full product_images" ON product_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full product_specifications" ON product_specifications FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full gallery" ON gallery FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full videos" ON videos FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full blogs" ON blogs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full reviews" ON google_reviews FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full leads" ON leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full logs" ON admin_activity_logs FOR ALL TO authenticated USING (true);

-- ========================================================
-- STORAGE BUCKETS
-- ========================================================
-- 'media' backs the admin media library (src/app/api/media/*).
INSERT INTO storage.buckets (id, name, public) VALUES
  ('products', 'products', true),
  ('projects', 'projects', true),
  ('gallery', 'gallery', true),
  ('videos', 'videos', true),
  ('brand-assets', 'brand-assets', true),
  ('blogs', 'blogs', true),
  ('documents', 'documents', true),
  ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read every published asset; only signed-in admins can write.
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT
  USING (bucket_id IN ('products','projects','gallery','videos','brand-assets','blogs','documents','media'));
CREATE POLICY "Admin write storage" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id IN ('products','projects','gallery','videos','brand-assets','blogs','documents','media'))
  WITH CHECK (bucket_id IN ('products','projects','gallery','videos','brand-assets','blogs','documents','media'));

-- ========================================================
-- SEED DATA
-- ========================================================
-- Run supabase/seed.sql after this file to load the real BCare catalogue
-- (32 products, 132 images, 183 specifications, gallery, videos, reviews).
