import fs from 'fs';
import path from 'path';

const mockPath = path.join(__dirname, '../src/lib/data/mock.ts');
let content = fs.readFileSync(mockPath, 'utf8');

// Mapping of image URLs by product ID / keywords
const imageMap: Record<string, string[]> = {
  'pm10': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/planetary-mixer-10ltr-500x500.jpg'],
  'pm20': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/planetary-mixer-20ltr-500x500.jpg'],
  'pm30': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/planetary-mixer-30ltr-500x500.jpg'],
  'pm40': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/planetary-mixer-40ltr-500x500.jpg'],
  'pm60': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/bcare-planetary-mixer-60ltr-500x500.jpg'],
  'pm100': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/bcare-planetary-mixer-100ltr-500x500.jpg'],
  'fcm7': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/fresh-cream-mixer-7ltr-500x500.jpg'],
  'sm8': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/spiral-mixer-8kg-500x500.jpg'],
  'sm12': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/spiral-mixer-12kg-500x500.jpg'],
  'sm25': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/spiral-mixer-25kg-500x500.jpg'],
  'sm50': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/spiral-mixer-50kg-500x500.jpg'],
  'do11': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/deck-oven-1deck-1tray-500x500.jpg'],
  'do12': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/deck-oven-1deck-2tray-500x500.jpg'],
  'do13': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/deck-oven-1deck-3tray-500x500.jpg'],
  'do24': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/deck-oven-2deck-4tray-500x500.jpg'],
  'do26': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/deck-oven-2deck-6tray-500x500.jpg'],
  'do36': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/deck-oven-3deck-6tray-500x500.jpg'],
  'do39': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/deck-oven-3deck-9tray-500x500.jpg'],
  'ro48': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/rotary-rack-oven-48tray-500x500.jpg'],
  'bs-hot-a': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/hot-bread-slicer-500x500.jpg'],
  'bs-hot-b': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/hot-bread-slicer-500x500.jpg'],
  'ds-table': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/dough-sheeter-tabletop-500x500.jpg'],
  'dk15': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/dough-kneader-15kg-500x500.jpg'],
  'wm1': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/waffle-machine-500x500.jpg'],
  'bt1': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/bread-toaster-500x500.jpg'],
  'im1': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/icing-machine-500x500.jpg'],
  'mm1': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/meat-mincer-500x500.jpg'],
  'ck-burner': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/4-burner-cooking-range-500x500.jpg'],
  'ref-4door': ['https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/4-door-commercial-chiller-500x500.jpg'],
};

// Replace unsplash URLs in mock.ts
content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[^'"]+/g, (match) => {
  return 'https://5.imimg.com/data5/SELLER/Default/2026/7/628394649/MU/AL/WG/74759165/bcare-bakery-equipment-500x500.jpg';
});

fs.writeFileSync(mockPath, content, 'utf8');
console.log('Updated mock.ts images successfully.');
