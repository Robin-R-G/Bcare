// Converts downloaded IndiaMART assets to WebP and generates the BCare brand/favicon set.
// Usage: node scripts/optimize-assets.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const PUBLIC = path.resolve('public');
const manifest = JSON.parse(fs.readFileSync('scripts/asset-manifest.json', 'utf8'));

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? walk(p) : [p];
      })
    : [];

// ── 1. Images -> WebP (max 1600px, quality 82) ─────────────────────────
let saved = 0;
const rewrite = new Map();
for (const dir of ['products', 'gallery', 'videos']) {
  for (const file of walk(path.join(PUBLIC, dir))) {
    if (!/\.(jpe?g|png)$/i.test(file)) continue;
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const before = fs.statSync(file).size;
    await sharp(file)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    saved += before - fs.statSync(out).size;
    fs.unlinkSync(file);
    rewrite.set(
      '/' + path.relative(PUBLIC, file).replace(/\\/g, '/'),
      '/' + path.relative(PUBLIC, out).replace(/\\/g, '/')
    );
  }
}
console.log(`webp: ${rewrite.size} images, saved ${(saved / 1024 / 1024).toFixed(1)} MB`);

const swap = (p) => (p ? rewrite.get(p) || p : p);
for (const k of Object.keys(manifest.products)) {
  manifest.products[k].images = manifest.products[k].images.map(swap);
}
manifest.gallery = manifest.gallery.map((g) => ({ ...g, path: swap(g.path) }));
manifest.videos = manifest.videos.map((v) => ({ ...v, thumbnail: swap(v.thumbnail) }));

// ── 2. Brochures: every product PDF is the same BCare catalogue ────────
const docDir = path.join(PUBLIC, 'documents');
const pdfs = walk(docDir).filter((f) => f.endsWith('.pdf'));
if (pdfs.length) {
  const hashes = new Map();
  for (const f of pdfs) {
    const h = crypto.createHash('md5').update(fs.readFileSync(f)).digest('hex');
    if (!hashes.has(h)) hashes.set(h, []);
    hashes.get(h).push(f);
  }
  const shared = path.join(docDir, 'bcare-product-catalogue.pdf');
  for (const [, group] of hashes) {
    if (group.length > 1) {
      fs.copyFileSync(group[0], shared);
      group.forEach((f) => f !== shared && fs.unlinkSync(f));
    }
  }
  const rel = '/documents/bcare-product-catalogue.pdf';
  for (const k of Object.keys(manifest.products)) {
    if (manifest.products[k].brochure) manifest.products[k].brochure = rel;
  }
  console.log(`brochures: deduped ${pdfs.length} -> ${walk(docDir).length}`);
}

// ── 3. Brand + favicon set from the real BCare logo ────────────────────
const src = path.join(PUBLIC, 'brand', 'bcare-logo-source.jpg');
const brand = path.join(PUBLIC, 'brand');

// The IndiaMART logo is a white-background JPEG; drop white to alpha so the
// mark sits correctly on the dark navbar/footer.
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += info.channels) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  if (r > 238 && g > 238 && b > 238) data[i + 3] = 0;
}
const transparent = await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .png()
  .toBuffer();
const trimmed = await sharp(transparent).trim({ threshold: 5 }).png().toBuffer();

await sharp(trimmed).resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png().toFile(path.join(brand, 'bcare-logo.png'));
await sharp(trimmed).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 92 }).toFile(path.join(brand, 'bcare-logo.webp'));
// Navbar/footer use a wide lockup slot; keep generous padding so it never crops.
await sharp(trimmed).resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 92 }).toFile(path.join(PUBLIC, 'logo.webp'));

// Favicons need an opaque background — transparent 16px marks read as noise.
const padded = await sharp(trimmed)
  .resize(896, 896, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 64, bottom: 64, left: 64, right: 64, background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .flatten({ background: '#ffffff' })
  .png()
  .toBuffer();

const icons = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-48x48.png', 48],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];
for (const [name, size] of icons) {
  await sharp(padded).resize(size, size).png().toFile(path.join(PUBLIC, name));
}

// Maskable icon: Android crops to a circle, so the mark must sit inside the 80% safe zone.
await sharp({
  create: { width: 512, height: 512, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
})
  .composite([{ input: await sharp(trimmed).resize(300, 300, { fit: 'inside' }).png().toBuffer(), gravity: 'centre' }])
  .png()
  .toFile(path.join(PUBLIC, 'icon-maskable-512.png'));
// Only public/favicon.ico — an app/favicon.ico would shadow the icons metadata in layout.tsx.
fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), await pngToIco([
  path.join(PUBLIC, 'favicon-16x16.png'),
  path.join(PUBLIC, 'favicon-32x32.png'),
  path.join(PUBLIC, 'favicon-48x48.png'),
]));

// Open Graph card: logo centred on the BCare dark brand background.
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 15, g: 23, b: 42, alpha: 1 } },
})
  .composite([{ input: await sharp(trimmed).resize(460, 460, { fit: 'inside' }).png().toBuffer(), gravity: 'centre' }])
  .png()
  .toFile(path.join(PUBLIC, 'og-image.png'));

fs.unlinkSync(src);
console.log('brand: logo + favicons + og-image generated');

fs.writeFileSync('scripts/asset-manifest.json', JSON.stringify(manifest, null, 2));
