import { products as mockProducts } from '@/lib/data/mock';
import { getProductBySlug, getProducts } from '@/lib/supabase/queries';
import { ProductDetailClient } from './ProductDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export const dynamicParams = false;

export async function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) return {};

  const title = product.seoTitle || `${product.name} | ${COMPANY_DETAILS.name}`;
  const description = product.seoDescription || product.shortDescription;
  const url = `${COMPANY_DETAILS.website}/products/${product.slug}`;
  const image = product.featured_image || product.images[0];

  return {
    // seoTitle already carries the BCare brand, so bypass the "%s | BCare" template.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: image ? [{ url: `${COMPANY_DETAILS.website}${image}`, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Supabase first
  let product = await getProductBySlug(slug).catch(() => null);

  // Fallback to mock
  if (!product) {
    product = mockProducts.find(p => p.slug === slug) || null;
  }

  if (!product) notFound();

  // Get related products
  let relatedProducts = mockProducts
    .filter(p => p.categoryId === product!.categoryId && p.id !== product!.id)
    .slice(0, 4);

  // Try to get related from Supabase
  try {
    const allProducts = await getProducts();
    if (allProducts.length > 0) {
      relatedProducts = allProducts
        .filter(p => p.categoryId === product!.categoryId && p.id !== product!.id)
        .slice(0, 4);
    }
  } catch {
    // Use mock fallback
  }

  const site = COMPANY_DETAILS.website;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: product.shortDescription || product.description,
        sku: product.sku,
        image: product.images.map((i) => `${site}${i}`),
        brand: { '@type': 'Brand', name: product.badge || 'BCARE' },
        category: product.categoryName,
        offers: {
          '@type': 'Offer',
          url: `${site}/products/${product.slug}`,
          priceCurrency: 'INR',
          // Schema.org requires an explicit price; omit it when BCare quotes on request.
          ...(product.priceOnRequest || !product.price ? {} : { price: product.price }),
          availability:
            product.availability === 'In Stock'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/PreOrder',
          seller: { '@type': 'Organization', name: COMPANY_DETAILS.name },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${site}/products` },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: `${site}/products/${product.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
