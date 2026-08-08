import { products, categories } from '../src/lib/data/mock';
import { COMPANY_DETAILS } from '../src/lib/constants/company';

function validateMediaAndContacts() {
  console.log('====================================================');
  console.log('BCARE MEDIA & CONTACT VALIDATION REPORT');
  console.log('====================================================\n');

  let issuesCount = 0;

  // 1. Validate Company Contact Data
  console.log('[1/4] Checking Contact Details...');
  if (COMPANY_DETAILS.phone.includes('98765') || COMPANY_DETAILS.phone.includes('00000')) {
    console.error('❌ FAIL: Company phone contains dummy number:', COMPANY_DETAILS.phone);
    issuesCount++;
  } else {
    console.log('  ✓ Phone verified:', COMPANY_DETAILS.phone);
  }

  if (COMPANY_DETAILS.whatsapp.includes('98765')) {
    console.error('❌ FAIL: Company WhatsApp contains dummy number:', COMPANY_DETAILS.whatsapp);
    issuesCount++;
  } else {
    console.log('  ✓ WhatsApp verified:', COMPANY_DETAILS.whatsapp);
  }

  if (COMPANY_DETAILS.email.includes('example.com')) {
    console.error('❌ FAIL: Company email contains example domain:', COMPANY_DETAILS.email);
    issuesCount++;
  } else {
    console.log('  ✓ Email verified:', COMPANY_DETAILS.email);
  }

  // 2. Validate Product Media
  console.log('\n[2/4] Checking Product Images (Total:', products.length, 'products)...');
  let productsWithoutImages = 0;
  let productsWithUnsplash = 0;

  products.forEach((p) => {
    const mainImg = p.featured_image || (p.images && p.images[0]);
    if (!mainImg) {
      console.error(`❌ FAIL: Product "${p.name}" (${p.slug}) has no images.`);
      productsWithoutImages++;
      issuesCount++;
    } else if (mainImg.includes('unsplash.com')) {
      console.warn(`⚠️ WARNING: Product "${p.name}" is using unsplash placeholder image.`);
      productsWithUnsplash++;
      issuesCount++;
    }
  });

  if (productsWithoutImages === 0 && productsWithUnsplash === 0) {
    console.log('  ✓ All', products.length, 'products have real BCare images configured.');
  }

  // 3. Validate Categories
  console.log('\n[3/4] Checking Category Images...');
  categories.forEach((cat) => {
    if (!cat.image) {
      console.error(`❌ FAIL: Category "${cat.name}" has no image.`);
      issuesCount++;
    } else {
      console.log(`  ✓ Category "${cat.name}": ${cat.image.substring(0, 60)}...`);
    }
  });

  // Summary
  console.log('\n====================================================');
  if (issuesCount === 0) {
    console.log('✅ VALIDATION PASSED: All product media & contact details verified successfully!');
  } else {
    console.warn(`⚠️ VALIDATION COMPLETED WITH ${issuesCount} ISSUE(S).`);
  }
  console.log('====================================================\n');
}

validateMediaAndContacts();
