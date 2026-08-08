# BCare Security Policy

## Authentication Architecture

- **Supabase Auth** handles all authentication (email/password sign-in)
- Admin access requires a `profiles` row with `role = 'admin'`
- The `handle_new_user()` trigger auto-creates profiles with `role = 'user'` — never `admin`
- Admin accounts must be seeded manually via SQL

## Authorization Architecture

- **Middleware** (`src/middleware.ts`) verifies auth + admin role on every `/admin/*` route
- **Admin layout** (`src/app/admin/layout.tsx`) provides client-side auth gate
- **RLS policies** enforce data-level access control in Supabase
- All admin mutations use the browser Supabase client, protected by RLS `is_admin()` checks

## RLS Strategy

| Table | Public SELECT | Admin Write |
|-------|--------------|-------------|
| products | Published only | is_admin() |
| product_categories | Active only | is_admin() |
| product_images | Published product images | is_admin() |
| product_specifications | Published product specs | is_admin() |
| product_documents | Published product docs | is_admin() |
| projects | Published only | is_admin() |
| project_images | All visible | is_admin() |
| gallery | All visible | is_admin() |
| videos | All visible | is_admin() |
| blogs | Published only | is_admin() |
| google_reviews | Approved only | is_admin() |
| leads | Admin only (SELECT) | is_admin() |
| admin_activity_logs | Admin only | is_admin() |
| profiles | Own profile + admin reads all | Admin update only |
| newsletter_subscribers | Admin only (SELECT) | is_admin() |
| consultation_requests | Admin only (SELECT) | is_admin() |
| seo_settings | Public read | is_admin() |
| company_settings | Public read | is_admin() |

## Storage Security

All 8 storage buckets are public-read (product images, brand assets, documents).
Write access is restricted to `is_admin()` via RLS policies on `storage.objects`.

## Rate Limiting

Database-level triggers enforce:
- **leads**: Max 5 submissions per email per hour
- **newsletter_subscribers**: Max 20 new subscriptions per hour
- **consultation_requests**: Max 3 per email per hour

## Security Headers

Applied via middleware and next.config.ts:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- Admin pages: `X-Robots-Tag: noindex, nofollow, nosnippet, noarchive`

## XSS Protection

- Blog content sanitized via DOMPurify (`src/lib/utils/sanitize.ts`)
- JSON-LD structured data uses `JSON.stringify()` (safe)
- No `dangerouslySetInnerHTML` on user-generated content

## Secret Rotation

If `SUPABASE_SERVICE_ROLE_KEY` is compromised:
1. Go to Supabase Dashboard → Settings → API → Service Role Key → Regenerate
2. Update `.env.local` with the new key
3. Redeploy

## Incident Response

1. Suspected unauthorized admin access → Check `admin_activity_logs` table
2. Suspected data breach → Rotate Supabase service role key immediately
3. Suspected RLS bypass → Check Supabase logs for anomalous queries
