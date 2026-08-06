import { getProducts, getCategories } from '@/lib/supabase/queries';
import { ProductsClient } from './ProductsClient';

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Equipment Catalog</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Browse our comprehensive range of high-performance commercial kitchen and bakery equipment. Built for durability and engineered for efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <ProductsClient initialProducts={products} categories={categories} />
        </div>
      </section>
    </div>
  );
}
