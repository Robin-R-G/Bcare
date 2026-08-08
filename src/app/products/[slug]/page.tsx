import { products as mockProducts } from '@/lib/data/mock';
import { getProductBySlug, getProducts } from '@/lib/supabase/queries';
import { ProductDetailClient } from './ProductDetailClient';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }));
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

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
