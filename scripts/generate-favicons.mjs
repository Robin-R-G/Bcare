// Generates the favicon / PWA icon set from the real BCare logo.
// Run: node scripts/generate-favicons.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
// The 975x975 master pulled from the IndiaMART seller profile, falling back to the
// small in-repo copy if the brand asset has not been downloaded yet.
const MASTER = path.join(PUBLIC, 'brand', 'logo-master.png');
const SOURCE = existsSync(MASTER) ? MASTER : path.join(PUBLIC, 'logo.webp');

const BRAND_BG = { r: 11, g: 31, b: 51, alpha: 1 }; // #0B1F33

const src = await readFile(SOURCE);
const meta = await sharp(src).metadata();
console.log(`Source logo: ${meta.width}x${meta.height} ${meta.format}`);

// Transparent, padded square — used for favicons and the PWA "any" purpose.
async function padded(size, background) {
  const inner = Math.round(size * 0.82);
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([
      {
        input: await sharp(src)
          .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'centre',
      },
    ])
    .png()
    .toBuffer();
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const outputs = [
  ['favicon-16x16.png', 16, TRANSPARENT],
  ['favicon-32x32.png', 32, TRANSPARENT],
  ['favicon-48x48.png', 48, TRANSPARENT],
  ['icon-192.png', 192, TRANSPARENT],
  ['icon-512.png', 512, TRANSPARENT],
  // Apple strips alpha to black, so this one gets the brand background baked in.
  ['apple-touch-icon.png', 180, BRAND_BG],
  // Maskable icons must fill the safe area with an opaque background.
  ['icon-maskable-512.png', 512, BRAND_BG],
];

for (const [name, size, bg] of outputs) {
  await writeFile(path.join(PUBLIC, name), await padded(size, bg));
  console.log(`  ${name} (${size}x${size})`);
}

// favicon.ico bundles 16/32/48 so browsers pick the right one.
const { default: pngToIco } = await import('png-to-ico');
const ico = await pngToIco([
  path.join(PUBLIC, 'favicon-16x16.png'),
  path.join(PUBLIC, 'favicon-32x32.png'),
  path.join(PUBLIC, 'favicon-48x48.png'),
]);
await writeFile(path.join(PUBLIC, 'favicon.ico'), ico);
console.log('  favicon.ico (16+32+48)');

// Open Graph card: 1200x630 with the logo centred on brand navy.
const og = await sharp({
  create: { width: 1200, height: 630, channels: 4, background: BRAND_BG },
})
  .composite([
    {
      input: await sharp(src).resize(320, 320, { fit: 'contain', background: TRANSPARENT }).toBuffer(),
      gravity: 'centre',
    },
  ])
  .png()
  .toBuffer();
await writeFile(path.join(PUBLIC, 'og-image.png'), og);
console.log('  og-image.png (1200x630)');

console.log('\nFavicon set generated.');
