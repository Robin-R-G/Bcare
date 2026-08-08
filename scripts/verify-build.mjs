// Post-build audit: no dummy content, no broken asset references.
// Usage: node scripts/verify-build.mjs
import fs from 'node:fs';
import path from 'node:path';

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const pages = walk('out').filter((f) => f.endsWith('.html'));
const DUMMY = /unsplash|placehold\.co|via\.placeholder|picsum|pexels|imimg\.com|example\.com|lorem ipsum/i;

const refs = new Set();
const dummyPages = [];
for (const f of pages) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/(?:src|href)="(\/Bcare\/[^"]+\.(?:webp|png|jpe?g|ico|pdf|svg|webmanifest))"/g)) {
    refs.add(m[1]);
  }
  const hit = s.match(DUMMY);
  if (hit) dummyPages.push(`${path.relative('out', f)} :: ${hit[0]}`);
}

const broken = [...refs].filter((r) => !fs.existsSync(path.join('out', r.replace('/Bcare', ''))));

console.log(`pages            : ${pages.length}`);
console.log(`asset references : ${refs.size}`);
console.log(`broken refs      : ${broken.length}`);
broken.slice(0, 10).forEach((b) => console.log(`  BROKEN ${b}`));
console.log(`dummy content    : ${dummyPages.length}`);
dummyPages.slice(0, 10).forEach((d) => console.log(`  DUMMY ${d}`));

if (broken.length || dummyPages.length) process.exitCode = 1;
