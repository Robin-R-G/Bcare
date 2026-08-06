'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { products, categories } from '@/lib/data/mock';
import { ProductCard } from '@/components/ui/ProductCard';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Equipment Catalog</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Browse our comprehensive range of high-performance commercial kitchen and bakery equipment. Built for durability and engineered for efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          {/* Category Filters */}
          <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-4 min-w-max">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 rounded-full font-label-sm text-label-sm transition-all ${
                  activeCategory === 'all' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/50'
                }`}
              >
                All Equipment
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-label-sm text-label-sm transition-all ${
                    activeCategory === category.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant/50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
              <p className="text-on-surface-variant font-body-lg">No products found in this category.</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
