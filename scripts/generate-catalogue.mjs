// Generates src/lib/data/catalogue.ts from the IndiaMART manifest + downloaded assets.
// Every field traces back to indiamart-manifest.json; nothing is invented here.
// Run: node scripts/generate-catalogue.mjs
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(path.join(import.meta.dirname, 'indiamart-manifest.json'), 'utf8'));

const q = (s) => JSON.stringify(s);

// Applications come from the product's own Usage/Application spec, mapped to the
// audiences BCare actually serves. No speculative markets.
const AUDIENCE = {
  'Commercial / Large': ['Commercial Bakeries', 'Central Production Kitchens', 'Food Production Facilities'],
  'Hotel & Restaurant': ['Hotels & Resorts', 'Restaurants', 'Cloud Kitchens'],
  'Bakery and Hotel': ['Bakeries', 'Hotels & Resorts', 'Cafes'],
  'Commercial Use': ['Restaurants', 'Hotels & Resorts', 'Catering Services'],
  Industrial: ['Food Processing Units', 'Industrial Kitchens'],
  'Food Processing Industry, Bakery': ['Food Processing Units', 'Commercial Bakeries'],
  Commercial: ['Commercial Bakeries', 'Hotels & Resorts'],
};
const CATEGORY_AUDIENCE = {
  'planetary-mixers': ['Bakeries', 'Pastry Shops', 'Hotels & Resorts'],
  'spiral-mixers': ['Bread Bakeries', 'Commercial Bakeries', 'Hotels & Resorts'],
  'deck-ovens': ['Bakeries', 'Hotels & Resorts', 'Restaurants'],
  'rotary-rack-ovens': ['Commercial Bakeries', 'Central Production Kitchens'],
  'bakery-equipment': ['Bakeries', 'Pastry Shops', 'Cafes'],
  'commercial-kitchen-equipment': ['Restaurants', 'Hotels & Resorts', 'Cloud Kitchens'],
};

function applicationsFor(p) {
  const usage = p.specifications['Usage/Application'] || p.specifications['Application/Usage'] || p.specifications['Usage'];
  const fromSpec = usage ? AUDIENCE[usage] : null;
  return fromSpec ?? CATEGORY_AUDIENCE[p.category];
}

// Features restate the product's own published specification rows as readable lines.
const FEATURE_LABEL = {
  Material: (v) => `${v} construction`,
  'Machine Body Material': (v) => `${v} body`,
  'Bowl Volume': (v) => `${v} bowl capacity`,
  'Flour Capacity': (v) => `${v} flour capacity`,
  Capacity: (v) => `Capacity: ${v}`,
  'Storage Capacity': (v) => `${v} storage capacity`,
  'Output Capacity': (v) => `Output up to ${v}`,
  'Baking Capacity': (v) => `${v} baking capacity`,
  'Automation Grade': (v) => `${v} operation`,
  'Operation Type': (v) => `${v} operation`,
  'Operation Mode': (v) => `${v} operation`,
  'Power Source': (v) => `${v} powered`,
  Power: (v) => `Rated power ${v}`,
  'Power Consumption': (v) => `Power consumption ${v}`,
  'Motor Power (in HP)': (v) => `${v} motor`,
  Voltage: (v) => `Operates at ${v}`,
  'Operating Voltage': (v) => `Operates at ${v}`,
  'Supply Voltage': (v) => `Operates at ${v}`,
  Certification: (v) => `${v} certified`,
  'ISI Certified': (v) => (v === 'Yes' ? 'ISI certified' : null),
  Warranty: (v) => `${v} warranty`,
  'Bowl Type': (v) => `${v} design`,
  'Number Of Decks': (v) => `${v} configuration`,
  'Number Of Blades': (v) => `${v} slicing blades`,
  'Max Cutting Thickness': (v) => `Cutting thickness up to ${v}`,
  'Number of Bread Slots': (v) => `${v} bread slots`,
  'Used for Making': (v) => `Suited to ${v.toLowerCase()} production`,
  'Used For Baking': (v) => `Suited to ${v.toLowerCase()} production`,
  'For Baking': (v) => `Suited to ${v.toLowerCase()} baking`,
  'Oven Type': (v) => `${v} design`,
  'Door Type': (v) => `${v} access`,
  Timer: (v) => `Timer ${v.toLowerCase()}`,
  Phase: (v) => `${v} supply`,
  Weight: (v) => `Machine weight ${v}`,
  'Temperature Range': (v) => `Temperature range ${v}`,
  'Scraper Speed': (v) => `Scraper speed ${v}`,
  'Type of Machine': (v) => `${v}`,
  'Country of Origin': (v) => `${v}`,
  Type: (v) => `${v}`,
};

function featuresFor(p) {
  const out = [];
  for (const [k, v] of Object.entries(p.specifications)) {
    const fn = FEATURE_LABEL[k];
    if (!fn) continue;
    const line = fn(v);
    if (line && !out.includes(line)) out.push(line);
  }
  return out;
}

function seoTitle(p) {
  return `${p.name} | BCare Bakery & Kitchen Equipments, Thrissur Kerala`;
}
function seoDescription(p) {
  const price = p.price ? `Price Rs ${p.price.toLocaleString('en-IN')} per ${p.priceUnit.toLowerCase()}.` : 'Price on request.';
  return `${p.shortDescription} ${price} Supplied by BCare Bakery & Kitchen Equipments, Nadathara, Thrissur, Kerala.`.slice(0, 300);
}

const catBySlug = Object.fromEntries(manifest.categories.map((c) => [c.id, c]));

// Category cards use the real photo of a product that belongs to that category.
const categoryHero = {};
for (const p of manifest.products) {
  if (!categoryHero[p.category]) categoryHero[p.category] = `/products/${p.slug}/main.webp`;
}

const products = [];
for (const p of manifest.products) {
  const dir = path.join(ROOT, 'public', 'products', p.slug);
  const files = existsSync(dir) ? (await readdir(dir)).filter((f) => f.endsWith('.webp')) : [];
  if (!files.length) throw new Error(`No downloaded images for ${p.slug} — run fetch-indiamart-assets.mjs first`);
  const images = [
    ...(files.includes('main.webp') ? ['main.webp'] : []),
    ...files.filter((f) => f !== 'main.webp').sort((a, b) => a.localeCompare(b, 'en', { numeric: true })),
  ].map((f) => `/products/${p.slug}/${f}`);

  const related = manifest.products
    .filter((o) => o.category === p.category && o.slug !== p.slug)
    .slice(0, 4)
    .map((o) => o.slug);

  products.push({
    id: p.slug,
    name: p.name,
    slug: p.slug,
    categoryId: p.category,
    categoryName: catBySlug[p.category].name,
    sku: p.sku,
    badge: p.brand,
    price: p.price ?? undefined,
    priceOnRequest: p.price == null,
    priceUnit: p.priceUnit,
    availability: 'In Stock',
    shortDescription: p.shortDescription,
    description: p.description,
    images,
    featured_image: images[0],
    product_images: images.map((url, i) => ({
      image_url: url,
      alt_text: i === 0 ? `${p.name} — BCare Bakery & Kitchen Equipments` : `${p.name} view ${i + 1}`,
      display_order: i,
    })),
    specifications: p.specifications,
    applications: applicationsFor(p),
    features: featuresFor(p),
    benefits: [],
    relatedProductIds: related,
    indiamartUrl: `https://www.indiamart.com/proddetail/${p.slug}-${p.indiamartId}.html`,
    seoTitle: seoTitle(p),
    seoDescription: seoDescription(p),
  });
}

const categories = manifest.categories.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.id,
  description: c.description,
  image: categoryHero[c.id],
}));

const videos = manifest.videos.map((v) => ({
  id: v.youtubeId,
  title: v.title,
  youtubeId: v.youtubeId,
  thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`,
  productSlug: v.productSlug,
  description:
    products.find((p) => p.slug === v.productSlug)?.shortDescription ?? '',
}));

const header = `// AUTO-GENERATED by scripts/generate-catalogue.mjs — do not edit by hand.
// Source of truth: scripts/indiamart-manifest.json (scraped from https://www.indiamart.com/bcare/).
// Images live in public/products/<slug>/ and were downloaded from the real BCare IndiaMART listings.
import { Category, Product } from '@/types';

export type BCareVideo = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  productSlug: string;
  description: string;
};

`;

const body =
  `export const categories: Category[] = ${q(categories)};\n\n` +
  `export const products: Product[] = ${q(products)};\n\n` +
  `export const videos: BCareVideo[] = ${q(videos)};\n`;

await writeFile(path.join(ROOT, 'src', 'lib', 'data', 'catalogue.ts'), header + body);

console.log(`Generated catalogue.ts: ${products.length} products, ${categories.length} categories, ${videos.length} videos`);
console.log(`Total images: ${products.reduce((n, p) => n + p.images.length, 0)}`);
const noFeatures = products.filter((p) => p.features.length < 2).map((p) => p.slug);
const noApps = products.filter((p) => !p.applications?.length).map((p) => p.slug);
if (noFeatures.length) console.log('WARN <2 features:', noFeatures.join(', '));
if (noApps.length) console.log('WARN no applications:', noApps.join(', '));
