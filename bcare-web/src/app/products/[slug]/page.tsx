import { products } from '@/lib/data/mock';
import { ProductDetailClient } from './ProductDetailClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) notFound();

  const relatedProducts = product.relatedProductIds
    ? products.filter(p => product.relatedProductIds?.includes(p.id))
    : [];

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
