// Pulls the 975x975 BCare logo from the IndiaMART seller profile and knocks out its
// white backing so the icon set can sit on any background.
// Run: node scripts/fetch-logo-master.mjs
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const URL =
  'https://5.imimg.com/data5/SELLER/Logo/2026/7/628394649/MU/AL/WG/74759165/bcare-final-logo-page-0001.jpg';
const OUT = path.resolve(import.meta.dirname, '..', 'public', 'brand');

const res = await fetch(URL, {
  headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.indiamart.com/' },
});
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const jpeg = Buffer.from(await res.arrayBuffer());

const base = sharp(jpeg).ensureAlpha();
const { width, height } = await base.metadata();
const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });

// The scan has a white card behind the mark. Anything near-white becomes transparent,
// with a soft ramp so the letter edges stay smooth instead of jagged.
const WHITE = 246; // fully transparent at/above this
const EDGE = 205; // fully opaque at/below this
for (let i = 0; i < data.length; i += info.channels) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  const neutral = Math.max(r, g, b) - Math.min(r, g, b) < 22;
  if (!neutral) continue;
  if (luma >= WHITE) data[i + 3] = 0;
  else if (luma > EDGE) data[i + 3] = Math.round(255 * (1 - (luma - EDGE) / (WHITE - EDGE)));
}

// Trim the transparent margin so the logo fills its box consistently.
const cleaned = await sharp(data, { raw: { width, height, channels: info.channels } })
  .png()
  .toBuffer();
const trimmed = await sharp(cleaned).trim({ threshold: 1 }).png().toBuffer();

await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, 'logo-master.png'), trimmed);

const meta = await sharp(trimmed).metadata();
console.log(`logo-master.png ${meta.width}x${meta.height} (from ${width}x${height} source)`);
