// Downloads every real BCare asset listed in indiamart-manifest.json and writes
// optimised WebP into public/products/<slug>/ and public/brand/.
// Run: node scripts/fetch-indiamart-assets.mjs
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const manifest = JSON.parse(await readFile(path.join(import.meta.dirname, 'indiamart-manifest.json'), 'utf8'));

const HEADERS = { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.indiamart.com/' };
const MAX_EDGE = 1400;

async function download(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
}

// IndiaMART serves the original upload when the -500x500 suffix is absent, but a
// few assets only exist at the thumbnail size. Fall back rather than lose the image.
async function downloadBest(url) {
  try {
    return await download(url);
  } catch {
    const ext = path.extname(url);
    return download(url.replace(new RegExp(`${ext}$`), `-500x500${ext}`));
  }
}

async function toWebp(buf, dest, { width } = {}) {
  const img = sharp(buf).rotate();
  const meta = await img.metadata();
  const target = width ?? Math.min(meta.width ?? MAX_EDGE, MAX_EDGE);
  await img
    .resize({ width: target, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(dest);
}

let ok = 0;
let failed = [];

for (const product of manifest.products) {
  const dir = path.join(PUBLIC, 'products', product.slug);
  await mkdir(dir, { recursive: true });

  for (const [i, url] of product.images.entries()) {
    const name = i === 0 ? 'main.webp' : `gallery-${i}.webp`;
    const dest = path.join(dir, name);
    if (existsSync(dest)) { ok++; continue; }
    try {
      await toWebp(await downloadBest(url), dest);
      ok++;
      process.stdout.write('.');
    } catch (err) {
      failed.push(`${product.slug}/${name} <- ${url} (${err.message})`);
      process.stdout.write('x');
    }
  }
}

// Brand logo straight from the IndiaMART seller profile.
await mkdir(path.join(PUBLIC, 'brand'), { recursive: true });
try {
  const logo = await downloadBest(manifest.logo);
  await toWebp(logo, path.join(PUBLIC, 'brand', 'indiamart-logo.webp'), { width: 512 });
  ok++;
} catch (err) {
  failed.push(`brand logo (${err.message})`);
}

console.log(`\n\nDownloaded ${ok} assets.`);
if (failed.length) {
  console.log(`\n${failed.length} FAILED:`);
  failed.forEach((f) => console.log('  ' + f));
}

// Report actual per-product counts so the data layer can be generated from reality.
const counts = {};
for (const product of manifest.products) {
  const dir = path.join(PUBLIC, 'products', product.slug);
  counts[product.slug] = existsSync(dir)
    ? (await readdir(dir)).filter((f) => f.endsWith('.webp')).length
    : 0;
}
await writeFile(path.join(import.meta.dirname, 'asset-counts.json'), JSON.stringify(counts, null, 2));
console.log('\nWrote scripts/asset-counts.json');
