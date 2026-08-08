-- ========================================================
-- BCare Security Hardening — Phase 2 Migration
-- Run in Supabase SQL Editor after 20260808_admin_rbac.sql
-- ========================================================

-- 1. Fix project_images — ensure RLS + proper policies
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read project_images" ON project_images;
CREATE POLICY "Public read project_images" ON project_images
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage project_images" ON project_images;
CREATE POLICY "Admin manage project_images" ON project_images
  FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- 2. Tighten product_images SELECT — only published product images visible
DROP POLICY IF EXISTS "Public product_images read" ON product_images;
DROP POLICY IF EXISTS "Public read product_images" ON product_images;
CREATE POLICY "Public read published product_images" ON product_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.status = 'published'
    )
  );

-- 3. Tighten product_specifications SELECT — only published product specs visible
DROP POLICY IF EXISTS "Public product_specifications read" ON product_specifications;
DROP POLICY IF EXISTS "Public read product_specifications" ON product_specifications;
CREATE POLICY "Public read published product_specifications" ON product_specifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_specifications.product_id
      AND products.status = 'published'
    )
  );

-- 4. Tighten product_documents SELECT — only published product documents visible
DROP POLICY IF EXISTS "Public read documents" ON product_documents;
DROP POLICY IF EXISTS "Public read product_documents" ON product_documents;
CREATE POLICY "Public read published product_documents" ON product_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_documents.product_id
      AND products.status = 'published'
    )
  );

-- 5. Tighten leads — only admins can SELECT (hide from anonymous reads)
DROP POLICY IF EXISTS "Admin manage leads" ON leads;
DROP POLICY IF EXISTS "Admin read leads" ON leads;
CREATE POLICY "Admin read leads" ON leads
  FOR SELECT TO authenticated
  USING (is_admin());

DROP POLICY IF EXISTS "Admin update leads" ON leads;
CREATE POLICY "Admin update leads" ON leads
  FOR UPDATE TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admin delete leads" ON leads;
CREATE POLICY "Admin delete leads" ON leads
  FOR DELETE TO authenticated
  USING (is_admin());

-- 6. Add rate limiting via check constraint on leads (max 5 per email per hour)
CREATE OR REPLACE FUNCTION check_lead_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM leads
      WHERE email = NEW.email
      AND created_at > NOW() - INTERVAL '1 hour') >= 5 THEN
    RAISE EXCEPTION 'Rate limit: maximum 5 submissions per email per hour';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS lead_rate_limit ON leads;
CREATE TRIGGER lead_rate_limit
  BEFORE INSERT ON leads
  FOR EACH ROW EXECUTE FUNCTION check_lead_rate_limit();

-- 7. Rate limiting functions + newsletter_subscribers table
CREATE OR REPLACE FUNCTION check_subscribe_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM newsletter_subscribers
      WHERE created_at > NOW() - INTERVAL '1 hour') >= 20 THEN
    RAISE EXCEPTION 'Rate limit: too many subscriptions, try again later';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public subscribe" ON newsletter_subscribers;
CREATE POLICY "Public subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin manage subscribers" ON newsletter_subscribers;
CREATE POLICY "Admin manage subscribers" ON newsletter_subscribers FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'subscribe_rate_limit') THEN
    CREATE TRIGGER subscribe_rate_limit
      BEFORE INSERT ON newsletter_subscribers
      FOR EACH ROW EXECUTE FUNCTION check_subscribe_rate_limit();
  END IF;
END $$;

-- 8. Rate limiting function + consultation_requests table
CREATE OR REPLACE FUNCTION check_consultation_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM consultation_requests
      WHERE email = NEW.email
      AND created_at > NOW() - INTERVAL '1 hour') >= 3 THEN
    RAISE EXCEPTION 'Rate limit: maximum 3 consultation requests per email per hour';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
DROP POLICY IF EXISTS "Public insert consultations" ON consultation_requests;
CREATE POLICY "Public insert consultations" ON consultation_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin manage consultations" ON consultation_requests;
CREATE POLICY "Admin manage consultations" ON consultation_requests FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'consultation_rate_limit') THEN
    CREATE TRIGGER consultation_rate_limit
      BEFORE INSERT ON consultation_requests
      FOR EACH ROW EXECUTE FUNCTION check_consultation_rate_limit();
  END IF;
END $$;

-- 9. Admin activity logging function — called from app code
CREATE OR REPLACE FUNCTION log_admin_activity(
  p_action TEXT,
  p_entity TEXT,
  p_entity_id TEXT DEFAULT NULL,
  p_details TEXT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO admin_activity_logs (action, entity, entity_id, details)
  VALUES (p_action, p_entity, p_entity_id, p_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Storage: add file size limit check function
CREATE OR REPLACE FUNCTION check_storage_file_size()
RETURNS TRIGGER AS $$
BEGIN
  -- Max 10MB per file
  IF pg_column_size(NEW) > 10485760 THEN
    RAISE EXCEPTION 'File too large: maximum 10MB allowed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Ensure profiles cannot be deleted by non-admins
-- (no DELETE policy = nobody can delete via RLS, which is correct for profiles)

-- 12. Add index for auth lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
