// Downloads every real BCare asset referenced in the IndiaMART scrape into public/.
// Usage: node scripts/download-assets.mjs <scrape.json>
import fs from 'node:fs';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const PUBLIC = path.resolve('public');
const scrape = JSON.parse(fs.readFileSync(process.argv[2] || 'scripts/bcare-indiamart.json', 'utf8'));

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 70);

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1024) return 'cached';
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://www.indiamart.com/' } });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      // IndiaMART returns a tiny placeholder for missing variants.
      if (buf.length < 1024) return `too-small(${buf.length})`;
      fs.writeFileSync(dest, buf);
      return 'ok';
    }
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
      continue;
    }
    return `http-${res.status}`;
  }
  return 'rate-limited';
}

// Falls back through IndiaMART size variants until one returns a real file.
async function downloadImage(url, dest) {
  const variants = [url, url.replace(/(\.[a-z]+)$/i, '-1000x1000$1'), url.replace(/(\.[a-z]+)$/i, '-500x500$1')];
  for (const v of variants) {
    const r = await download(v, dest);
    if (r === 'ok' || r === 'cached') return r;
  }
  return 'failed';
}

const manifest = { products: {}, gallery: [], videos: [], logo: null };
let ok = 0;
let fail = 0;

const LOGO_SRC =
  'https://5.imimg.com/data5/SELLER/Logo/2026/7/628394649/MU/AL/WG/74759165/bcare-final-logo-page-0001.jpg';
{
  const dest = path.join(PUBLIC, 'brand', 'bcare-logo-source.jpg');
  const r = await download(LOGO_SRC, dest);
  manifest.logo = r === 'ok' || r === 'cached' ? '/brand/bcare-logo-source.jpg' : null;
  console.log(`logo: ${r}`);
}

for (const p of scrape.products) {
  const slug = slugify(p.name);
  const files = [];
  for (let i = 0; i < p.images.length; i++) {
    const ext = path.extname(new URL(p.images[i]).pathname) || '.jpg';
    const base = i === 0 ? `main${ext}` : `gallery-${i}${ext}`;
    const rel = `/products/${slug}/${base}`;
    const r = await downloadImage(p.images[i], path.join(PUBLIC, rel));
    if (r === 'ok' || r === 'cached') {
      files.push(rel);
      ok++;
    } else {
      fail++;
      console.warn(`  MISS ${p.name} [${i}] ${r}`);
    }
  }
  let brochure = null;
  if (p.brochureUrl) {
    const rel = `/documents/${slug}.pdf`;
    const r = await download(p.brochureUrl, path.join(PUBLIC, rel));
    if (r === 'ok' || r === 'cached') brochure = rel;
  }
  manifest.products[p.indiamartId] = { slug, images: files, brochure };
  console.log(`${p.name} -> ${files.length} img${brochure ? ' +pdf' : ''}`);
}

for (let i = 0; i < scrape.gallery.length; i++) {
  const g = scrape.gallery[i];
  const ext = path.extname(new URL(g.url).pathname) || '.jpg';
  const rel = `/gallery/${String(i + 1).padStart(3, '0')}-${slugify(g.title)}${ext}`;
  const r = await downloadImage(g.url, path.join(PUBLIC, rel));
  if (r === 'ok' || r === 'cached') {
    manifest.gallery.push({ path: rel, title: g.title });
    ok++;
  } else fail++;
}
console.log(`gallery: ${manifest.gallery.length}/${scrape.gallery.length}`);

for (const v of scrape.videos) {
  const rel = `/videos/${slugify(v.title)}.jpg`;
  const r = await downloadImage(v.thumbnail, path.join(PUBLIC, rel));
  manifest.videos.push({ youtubeId: v.youtubeId, title: v.title, thumbnail: r === 'ok' || r === 'cached' ? rel : null });
}

fs.writeFileSync('scripts/asset-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`\ndone: ${ok} downloaded, ${fail} failed -> scripts/asset-manifest.json`);
