import { getProducts, getCategories } from '@/lib/supabase/queries';
import { ProductsClient } from './ProductsClient';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb + Page header */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 pb-2">
        <div className="text-xs text-on-surface-variant flex items-center gap-1.5 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-outline">&gt;</span>
          <span className="text-on-surface font-medium">Products</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-on-surface leading-tight">
          Industrial<br />Equipment<br />Catalogue
        </h1>
      </section>

      {/* Catalog Section */}
      <section className="py-8 pb-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <ProductsClient initialProducts={products} categories={categories} />
        </div>
      </section>
    </div>
  );
}
