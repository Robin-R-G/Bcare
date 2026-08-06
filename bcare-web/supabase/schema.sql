-- ==========================================
-- BCARE DIGITAL BUSINESS PLATFORM SCHEMA
-- Supabase PostgreSQL Schema v2 (15 Tables)
-- ==========================================

-- ==========================================
-- 1. USERS & ROLES
-- ==========================================
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'editor', 'sales_manager');

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role user_role DEFAULT 'sales_manager'::user_role NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. PRODUCT CATEGORIES
-- ==========================================
CREATE TABLE public.product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. PRODUCTS
-- ==========================================
CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.product_categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  featured_image TEXT,
  is_featured BOOLEAN DEFAULT false,
  status product_status DEFAULT 'draft'::product_status NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. PRODUCT IMAGES
-- ==========================================
CREATE TABLE public.product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0
);

-- ==========================================
-- 5. PRODUCT SPECIFICATIONS
-- ==========================================
CREATE TABLE public.product_specifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  specification_name TEXT NOT NULL,
  specification_value TEXT NOT NULL
);

-- ==========================================
-- 6. PRODUCT DOCUMENTS
-- ==========================================
CREATE TYPE document_type AS ENUM ('brochure', 'manual', 'spec_sheet');

CREATE TABLE public.product_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  document_type document_type DEFAULT 'brochure'::document_type NOT NULL
);

-- ==========================================
-- 7. PROJECTS
-- ==========================================
CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  completion_year INTEGER,
  description TEXT,
  challenge TEXT,
  solution TEXT,
  result TEXT,
  featured_image TEXT,
  status project_status DEFAULT 'draft'::project_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 8. PROJECT IMAGES
-- ==========================================
CREATE TYPE project_image_type AS ENUM ('before', 'after', 'gallery');

CREATE TABLE public.project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type project_image_type DEFAULT 'gallery'::project_image_type NOT NULL
);

-- ==========================================
-- 9. BLOGS
-- ==========================================
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- Rich HTML or Markdown
  cover_image TEXT,
  author UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category TEXT,
  tags TEXT[],
  status blog_status DEFAULT 'draft'::blog_status NOT NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 10. TESTIMONIALS
-- ==========================================
CREATE TYPE testimonial_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  industry TEXT,
  location TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  status testimonial_status DEFAULT 'pending'::testimonial_status NOT NULL
);

-- ==========================================
-- 11. LEADS (CRM)
-- ==========================================
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'quotation_sent', 'follow_up', 'converted', 'closed');

CREATE TABLE public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  business_type TEXT,
  message TEXT,
  source TEXT,
  status lead_status DEFAULT 'new'::lead_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 12. QUOTE REQUESTS
-- ==========================================
CREATE TABLE public.quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  products JSONB, -- E.g. [{"product_id": "uuid", "name": "Mixer"}]
  quantity INTEGER,
  budget_range TEXT,
  kitchen_size TEXT,
  requirements TEXT,
  attachments TEXT[] -- Array of URLs
);

-- ==========================================
-- 13. CONSULTATION REQUESTS
-- ==========================================
CREATE TABLE public.consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  business_type TEXT,
  location TEXT,
  kitchen_size TEXT,
  requirements TEXT,
  status lead_status DEFAULT 'new'::lead_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 14. MEDIA LIBRARY
-- ==========================================
CREATE TABLE public.media_library (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  folder TEXT,
  alt_text TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 15. SEO SETTINGS
-- ==========================================
CREATE TABLE public.seo_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT,
  og_image TEXT
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC ACCESS
CREATE POLICY "Public read active categories" ON public.product_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active products" ON public.products FOR SELECT USING (status = 'published');
CREATE POLICY "Public read active product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public read active product specs" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Public read active product documents" ON public.product_documents FOR SELECT USING (true);
CREATE POLICY "Public read active projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public read active project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public read active blogs" ON public.blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Public read active testimonials" ON public.testimonials FOR SELECT USING (status = 'approved');
CREATE POLICY "Public read seo settings" ON public.seo_settings FOR SELECT USING (true);

-- PUBLIC INSERTS (Forms)
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert quotes" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert consultations" ON public.consultation_requests FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS (Super Admin, Admin, Editor, Sales Manager)
-- Assumes any authenticated user is staff for this simplified check. Can be locked down further via JWT role claims.
CREATE POLICY "Auth full access categories" ON public.product_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access product_images" ON public.product_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access product_specifications" ON public.product_specifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access product_documents" ON public.product_documents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access project_images" ON public.project_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access quotes" ON public.quote_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access consultations" ON public.consultation_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access media" ON public.media_library FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access seo" ON public.seo_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- STORAGE BUCKETS SETUP
-- ==========================================
-- Run these as superuser (postgres) via SQL Editor or create via Dashboard
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('products', 'products', true, 5242880, '{image/png, image/jpeg, image/webp}'),
  ('projects', 'projects', true, 5242880, '{image/png, image/jpeg, image/webp}'),
  ('blogs', 'blogs', true, 5242880, '{image/png, image/jpeg, image/webp}'),
  ('documents', 'documents', true, 20971520, '{application/pdf}'),
  ('avatars', 'avatars', true, 2097152, '{image/png, image/jpeg, image/webp}'),
  ('media', 'media', true, 52428800, '{image/png, image/jpeg, image/webp, video/mp4}')
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
-- (Note: Storage policies are tricky in direct SQL without knowing exact auth setup, but here are the public read policies)
CREATE POLICY "Public read products" ON storage.objects FOR SELECT USING (bucket_id = 'products');
CREATE POLICY "Public read projects" ON storage.objects FOR SELECT USING (bucket_id = 'projects');
CREATE POLICY "Public read blogs" ON storage.objects FOR SELECT USING (bucket_id = 'blogs');
CREATE POLICY "Public read documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Public read avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Auth insert all buckets" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update all buckets" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete all buckets" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');


-- ==========================================
-- SEED DATA
-- ==========================================
-- 1. Categories
INSERT INTO public.product_categories (id, name, slug, description, image_url, seo_title, seo_description) VALUES
  ('c1000000-0000-0000-0000-000000000000', 'Bakery Equipment', 'bakery-equipment', 'Professional bakery solutions', 'https://images.unsplash.com/photo-1579697096985-41fe1430e5d6?q=80&w=800', 'Bakery Equipment in Kerala', 'Buy bakery equipment in Kerala.'),
  ('c2000000-0000-0000-0000-000000000000', 'Commercial Kitchen Equipment', 'commercial-kitchen-equipment', 'Heavy duty kitchen equipment', 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800', 'Commercial Kitchen Equipment', 'Heavy duty kitchen equipment.'),
  ('c3000000-0000-0000-0000-000000000000', 'Refrigeration Equipment', 'refrigeration-equipment', 'Commercial cooling solutions', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800', 'Refrigeration Equipment', 'Commercial cooling solutions.')
ON CONFLICT (id) DO NOTHING;

-- 2. Products
INSERT INTO public.products (id, category_id, name, slug, short_description, description, featured_image, is_featured, status) VALUES
  ('p1000000-0000-0000-0000-000000000000', 'c1000000-0000-0000-0000-000000000000', 'Industrial Rotary Rack Oven', 'industrial-rotary-rack-oven', 'High-capacity rotary rack oven.', 'Ideal for large scale bread and pastry production.', 'https://images.unsplash.com/photo-1584285418504-0359837267eb?q=80&w=1200', true, 'published'),
  ('p2000000-0000-0000-0000-000000000000', 'c1000000-0000-0000-0000-000000000000', 'Planetary Mixer 60L', 'planetary-mixer-60l', 'Heavy-duty 60-liter planetary mixer.', 'Designed for versatility and endurance.', 'https://images.unsplash.com/photo-1621252178553-6a37829871db?q=80&w=1200', true, 'published'),
  ('p3000000-0000-0000-0000-000000000000', 'c1000000-0000-0000-0000-000000000000', 'Spiral Dough Mixer', 'spiral-dough-mixer', 'High torque spiral dough mixer.', 'Perfect for heavy dough mixing.', 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200', false, 'published'),
  ('p4000000-0000-0000-0000-000000000000', 'c3000000-0000-0000-0000-000000000000', 'Double Door Chiller', 'double-door-chiller', '1000L vertical chiller.', 'Keep your ingredients fresh.', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200', true, 'published')
ON CONFLICT (id) DO NOTHING;

-- 3. Projects
INSERT INTO public.projects (id, title, client_name, slug, industry, location, completion_year, description, featured_image, status) VALUES
  ('pr100000-0000-0000-0000-000000000000', 'Hotel Kitchen Installation', 'Grand Hyatt', 'hotel-kitchen-installation', 'Hospitality', 'Kochi, Kerala', 2023, 'Complete turnkey project.', 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200', 'published'),
  ('pr200000-0000-0000-0000-000000000000', 'Commercial Bakery Setup', 'BakeHouse Chain', 'commercial-bakery-setup', 'Bakery', 'Thrissur, Kerala', 2024, '10,000 sq ft central production facility.', 'https://images.unsplash.com/photo-1579697096985-41fe1430e5d6?q=80&w=1200', 'published')
ON CONFLICT (id) DO NOTHING;
