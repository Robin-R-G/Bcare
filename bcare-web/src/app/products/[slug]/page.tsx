import { getProductBySlug, getAllProductSlugs, getProducts } from '@/lib/supabase/queries';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { ProductDetailClient } from './ProductDetailClient';



export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = product.seoTitle || `${product.name} | ${COMPANY_DETAILS.name}`;
  const description = product.seoDescription || product.shortDescription;
  const url = `${COMPANY_DETAILS.website}/products/${product.slug}`;
  const image = product.images[0];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: image ? [{ url: image.startsWith('http') ? image : `${COMPANY_DETAILS.website}${image}`, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const site = COMPANY_DETAILS.website;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description: product.shortDescription || product.description,
        sku: product.sku,
        image: product.images.map((i) => i.startsWith('http') ? i : `${site}${i}`),
        brand: { '@type': 'Brand', name: product.badge || 'BCARE' },
        category: product.categoryName,
        offers: {
          '@type': 'Offer',
          url: `${site}/products/${product.slug}`,
          priceCurrency: 'INR',
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
