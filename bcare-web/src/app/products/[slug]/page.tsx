import { products as mockProducts } from '@/lib/data/mock';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { ProductDetailClient } from './ProductDetailClient';

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

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
    },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = mockProducts.find(p => p.slug === slug);

  if (!product) notFound();

  return <ProductDetailClient product={product} relatedProducts={[]} />;
}
