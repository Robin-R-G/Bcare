// Parses saved IndiaMART company pages into structured JSON.
// Usage: node scripts/indiamart-extract.mjs <dir-with-saved-html> <out.json>
import fs from 'node:fs';
import path from 'node:path';

const [srcDir, outFile] = process.argv.slice(2);
if (!srcDir || !outFile) throw new Error('usage: indiamart-extract.mjs <srcDir> <out.json>');

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\uFFFD,1|\uFFFD\u201a1|â‚¹|₹/g, '')
    .trim();

const stripTags = (s) => decode(s.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' '));

// IndiaMART serves the biggest public variant as the bare filename or -1000x1000.
const upscale = (url) => url.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1');

function parsePrice(raw) {
  if (!raw) return { price: null, unit: null };
  const clean = decode(raw);
  const num = clean.match(/([\d][\d,]*)/);
  const unit = clean.match(/\/\s*([A-Za-z ]+)/);
  return {
    price: num ? Number(num[1].replace(/,/g, '')) : null,
    unit: unit ? unit[1].trim() : null,
  };
}

function extractProducts(html, categoryName) {
  const out = [];
  // Each product = <article id="<pid>" class="udg-category-item"> ... </article>
  const articles = html.split('<article id="').slice(1);
  for (const chunk of articles) {
    if (!chunk.startsWith('2') && !/^\d/.test(chunk)) continue;
    const pid = chunk.slice(0, chunk.indexOf('"'));
    const body = chunk.slice(0, chunk.indexOf('</article>'));
    if (!body.includes('udg-category-item')) continue;

    const nameM = body.match(/class="udg-category-item__title">\s*<a[^>]*>([\s\S]*?)<\/a>/);
    if (!nameM) continue;
    const name = stripTags(nameM[1]);

    const detailM = body.match(/href="(\/\/www\.indiamart\.com\/proddetail\/[^"]+)"/);

    const galleryProps = body.match(/data-island="CategoryImageGallery" data-props="([\s\S]*?)"\s*data-hydrate/);
    let images = [];
    if (galleryProps) {
      try {
        const props = JSON.parse(decode(galleryProps[1]).replace(/&/g, '&'));
        images = (props.galleryMedia || []).filter((m) => m.type === 'image').map((m) => upscale(m.src));
      } catch {
        /* fall through to regex */
      }
    }
    if (!images.length) {
      images = [...body.matchAll(/class="udg-category-item__stage[^"]*"><img src="([^"]+)"/g)].map((m) => upscale(m[1]));
    }
    images = [...new Set(images)];

    const priceM = body.match(/class="udg-category-item__priceAmount">([\s\S]*?)<\/span>\s*<span class="udg-category-item__priceUnit">([\s\S]*?)<\/span>/);
    const { price } = parsePrice(priceM ? priceM[1] : '');
    const priceUnit = priceM ? decode(priceM[2]).replace(/^\//, '') : null;

    const specifications = {};
    for (const m of body.matchAll(
      /class="udg-category-item__specKey">([\s\S]*?)<\/th><td class="udg-category-item__specVal">([\s\S]*?)<\/td>/g
    )) {
      specifications[stripTags(m[1])] = stripTags(m[2]);
    }

    const descM = body.match(/class="udg-category-item__sdescRich"[^>]*>([\s\S]*?)<\/section>/);
    const rawDesc = descM ? stripTags(descM[1]) : '';

    const brochureM = body.match(/class="udg-category-item__brochure" href="(https:\/\/[^"]+\.pdf)"/);

    out.push({
      indiamartId: pid,
      name,
      category: categoryName,
      indiamartUrl: detailM ? 'https:' + detailM[1] : null,
      price,
      priceUnit,
      images,
      specifications,
      rawDescription: rawDesc,
      brochureUrl: brochureM ? brochureM[1] : null,
    });
  }
  return out;
}

function categoryTitle(html, slug) {
  const m = html.match(/<title>([^-<]+)/);
  return m ? m[1].trim() : slug;
}

const products = [];
for (const file of fs.readdirSync(srcDir).filter((f) => f.startsWith('cat_') && f.endsWith('.html'))) {
  const slug = file.slice(4, -5);
  const html = fs.readFileSync(path.join(srcDir, file), 'latin1');
  const found = extractProducts(html, categoryTitle(html, slug));
  for (const p of found) products.push({ ...p, categorySlug: slug });
}

// De-duplicate: a product can be listed under several IndiaMART categories.
const byId = new Map();
for (const p of products) {
  const prev = byId.get(p.indiamartId);
  if (!prev) byId.set(p.indiamartId, { ...p, alsoIn: [] });
  else {
    prev.alsoIn.push(p.categorySlug);
    if (p.images.length > prev.images.length) prev.images = p.images;
    if (!prev.brochureUrl) prev.brochureUrl = p.brochureUrl;
    Object.assign(prev.specifications, p.specifications);
  }
}

// Videos (JSON-LD ItemList on videos.html)
let videos = [];
const videoHtml = fs.existsSync(path.join(srcDir, 'bc_videos.html'))
  ? fs.readFileSync(path.join(srcDir, 'bc_videos.html'), 'latin1')
  : '';
const ldMatch = videoHtml.match(/<script type="application\/ld\+json">(\[[\s\S]*?"VideoObject"[\s\S]*?)<\/script>/);
if (ldMatch) {
  const list = JSON.parse(ldMatch[1])[0].itemListElement || [];
  videos = list.map((v) => ({
    title: decode(v.name),
    description: decode(v.description),
    embedUrl: v.embedUrl,
    contentUrl: v.contentUrl,
    youtubeId: (v.embedUrl.match(/embed\/([^/?]+)/) || [])[1] || null,
    thumbnail: upscale((v.thumbnailUrl?.[0] || '').replace(/^http:/, 'https:')),
    uploadDate: v.uploadDate,
  }));
}

// Gallery (photos.html) — every distinct seller image, biggest variant.
let gallery = [];
const photoHtml = fs.existsSync(path.join(srcDir, 'bc_photos.html'))
  ? fs.readFileSync(path.join(srcDir, 'bc_photos.html'), 'latin1')
  : '';
if (photoHtml) {
  const seen = new Set();
  for (const m of photoHtml.matchAll(/<img[^>]+src="(https:\/\/\d\.imimg\.com\/data5\/[^"]+)"[^>]*alt="([^"]*)"/g)) {
    const src = upscale(m[1]);
    if (src.includes('/Logo/')) continue;
    if (seen.has(src)) continue;
    seen.add(src);
    gallery.push({ url: src, title: stripTags(m[2]) || 'BCare Equipment' });
  }
}

const data = {
  scrapedAt: new Date().toISOString(),
  source: 'https://www.indiamart.com/bcare/',
  products: [...byId.values()].sort((a, b) => a.name.localeCompare(b.name)),
  videos,
  gallery,
};

fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
console.log(
  `products=${data.products.length} videos=${data.videos.length} gallery=${data.gallery.length} -> ${outFile}`
);
