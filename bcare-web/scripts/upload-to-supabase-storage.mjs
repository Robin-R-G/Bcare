// Mirrors public/ assets into Supabase Storage and rewrites the DB rows to the CDN URLs.
// Requires a service_role key (the anon key cannot create buckets or write objects).
//
//   set SUPABASE_SERVICE_ROLE_KEY=...   (PowerShell: $env:SUPABASE_SERVICE_ROLE_KEY="...")
//   node scripts/upload-to-supabase-storage.mjs [--rewrite-db]
//
// Without --rewrite-db it only uploads; the site keeps serving the local copies.
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? readEnv('NEXT_PUBLIC_SUPABASE_URL');
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) {
  console.error('Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

function readEnv(name) {
  const f = path.resolve('.env.local');
  if (!fs.existsSync(f)) return undefined;
  return fs.readFileSync(f, 'utf8').match(new RegExp(`^${name}=(.*)$`, 'm'))?.[1]?.trim();
}

const db = createClient(URL, KEY, { auth: { persistSession: false } });
const rewriteDb = process.argv.includes('--rewrite-db');

const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };
const walk = (d) =>
  fs.existsSync(d)
    ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(d, e.name);
        return e.isDirectory() ? walk(p) : [p];
      })
    : [];

// localPrefix -> bucket. Everything under public/<prefix> lands in that bucket.
const BUCKETS = [
  ['public/products', 'products'],
  ['public/documents', 'documents'],
  ['public/brand', 'brand-assets'],
];

for (const [, bucket] of BUCKETS) {
  const { error } = await db.storage.createBucket(bucket, { public: true });
  if (error && !/already exists/i.test(error.message)) throw error;
}

const urlMap = new Map();
let uploaded = 0;
for (const [dir, bucket] of BUCKETS) {
  for (const file of walk(dir)) {
    const key = path.relative(dir, file).replace(/\\/g, '/');
    const { error } = await db.storage.from(bucket).upload(key, fs.readFileSync(file), {
      contentType: MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
      cacheControl: '31536000',
      upsert: true,
    });
    if (error) {
      console.error(`FAIL ${bucket}/${key}: ${error.message}`);
      continue;
    }
    const local = '/' + path.relative('public', file).replace(/\\/g, '/');
    urlMap.set(local, db.storage.from(bucket).getPublicUrl(key).data.publicUrl);
    uploaded++;
  }
  console.log(`${bucket}: done`);
}
console.log(`uploaded ${uploaded} objects`);

if (!rewriteDb) {
  console.log('DB not rewritten (pass --rewrite-db to point rows at Storage URLs).');
  process.exit(0);
}

for (const [table, col] of [
  ['products', 'featured_image'],
  ['product_images', 'image_url'],
  ['product_documents', 'file_url'],
  ['gallery', 'image_url'],
  ['product_categories', 'image_url'],
]) {
  const { data, error } = await db.from(table).select(`id, ${col}`);
  if (error) {
    console.error(`${table}: ${error.message}`);
    continue;
  }
  let n = 0;
  for (const row of data ?? []) {
    const next = urlMap.get(row[col]);
    if (!next) continue;
    await db.from(table).update({ [col]: next }).eq('id', row.id);
    n++;
  }
  console.log(`${table}.${col}: ${n} rows repointed`);
}
