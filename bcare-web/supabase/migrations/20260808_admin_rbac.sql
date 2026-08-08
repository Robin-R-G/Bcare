-- ========================================================
-- BCare Security Hardening — Admin RBAC Migration
-- Run this in Supabase SQL Editor after the base schema.
-- ========================================================

-- 1. PROFILES TABLE (links auth.users to application roles)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own; admins can read all
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins read all profiles" ON profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Only admins can update roles
CREATE POLICY "Admins update profiles" ON profiles
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Auto-create profile on signup (with 'user' role, never 'admin')
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ========================================================
-- HELPER: Check if current user is admin
-- ========================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ========================================================
-- 2. DROP OLD overly-permissive admin policies
-- ========================================================
DROP POLICY IF EXISTS "Admin full categories" ON product_categories;
DROP POLICY IF EXISTS "Admin full products" ON products;
DROP POLICY IF EXISTS "Admin full product_images" ON product_images;
DROP POLICY IF EXISTS "Admin full product_specifications" ON product_specifications;
DROP POLICY IF EXISTS "Admin full projects" ON projects;
DROP POLICY IF EXISTS "Admin full gallery" ON gallery;
DROP POLICY IF EXISTS "Admin full videos" ON videos;
DROP POLICY IF EXISTS "Admin full blogs" ON blogs;
DROP POLICY IF EXISTS "Admin full reviews" ON google_reviews;
DROP POLICY IF EXISTS "Admin full leads" ON leads;
DROP POLICY IF EXISTS "Admin full logs" ON admin_activity_logs;

-- ========================================================
-- 3. REPLACEMENT: Admin-only policies (role-checked)
-- ========================================================

-- product_categories: admin full, public read active
CREATE POLICY "Admin manage categories" ON product_categories
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- products: admin full, public read published
CREATE POLICY "Admin manage products" ON products
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- product_images: admin full, public read
CREATE POLICY "Admin manage product_images" ON product_images
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- product_specifications: admin full, public read
CREATE POLICY "Admin manage product_specifications" ON product_specifications
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- projects: admin full, public read published
CREATE POLICY "Admin manage projects" ON projects
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- gallery: admin full, public read
CREATE POLICY "Admin manage gallery" ON gallery
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- videos: admin full, public read
CREATE POLICY "Admin manage videos" ON videos
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- blogs: admin full, public read published
CREATE POLICY "Admin manage blogs" ON blogs
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- google_reviews: admin full, public read approved
CREATE POLICY "Admin manage reviews" ON google_reviews
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- leads: admin full, public insert (contact forms)
CREATE POLICY "Public leads insert" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin manage leads" ON leads
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- admin_activity_logs: admin-only everything
CREATE POLICY "Admin manage logs" ON admin_activity_logs
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- 4. PRODUCT DOCUMENTS — was missing RLS entirely
-- ========================================================
ALTER TABLE product_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read documents" ON product_documents
  FOR SELECT USING (true);

CREATE POLICY "Admin manage documents" ON product_documents
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- 5. STORAGE POLICIES — tighten to admin-only writes
-- ========================================================
DROP POLICY IF EXISTS "Admin write storage" ON storage.objects;

-- Admin-only write to all buckets (role-checked)
CREATE POLICY "Admin write storage" ON storage.objects
  FOR ALL TO authenticated
  USING (
    is_admin()
    AND bucket_id IN ('products','projects','gallery','videos','brand-assets','blogs','documents','media')
  )
  WITH CHECK (
    is_admin()
    AND bucket_id IN ('products','projects','gallery','videos','brand-assets','blogs','documents','media')
  );

-- ========================================================
-- 6. LEDGES: add notes column if missing
-- ========================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'notes'
  ) THEN
    ALTER TABLE leads ADD COLUMN notes TEXT;
  END IF;
END $$;

-- ========================================================
-- 7. REVIEWS TABLE (separate from google_reviews if exists)
-- ========================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  avatar_url TEXT,
  location TEXT,
  source TEXT DEFAULT 'Manual',
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read reviews" ON reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Admin manage reviews" ON reviews
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- 8. TESTIMONIALS TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  company TEXT,
  designation TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Admin manage testimonials" ON testimonials
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- 9. NEWSLETTER SUBSCRIBERS
-- ========================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public can subscribe (insert only)
CREATE POLICY "Public subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Admin can read/manage
CREATE POLICY "Admin manage subscribers" ON newsletter_subscribers
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- 10. CONSULTATION REQUESTS
-- ========================================================
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  email TEXT,
  business_type TEXT,
  location TEXT,
  kitchen_size TEXT,
  requirements TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert consultations" ON consultation_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin manage consultations" ON consultation_requests
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- 11. SEO SETTINGS (move from localStorage to DB)
-- ========================================================
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_image TEXT,
  no_index BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read seo" ON seo_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin manage seo" ON seo_settings
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- 12. COMPANY SETTINGS (move from localStorage to DB)
-- ========================================================
CREATE TABLE IF NOT EXISTS company_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read settings" ON company_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin manage settings" ON company_settings
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ========================================================
-- SEED: Create initial admin profile
-- IMPORTANT: Replace the UUID below with your actual admin
-- user's auth.users.id after they sign up.
-- ========================================================
-- INSERT INTO profiles (id, email, role) VALUES ('YOUR-ADMIN-USER-UUID', 'admin@bcare.com', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';
