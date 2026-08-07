'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { X } from 'lucide-react';

interface ProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

const applicationTypes = ["Commercial Bakery", "Industrial Kitchen", "Hospitality"];

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeApplication, setActiveApplication] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.categoryId);
      return matchesCategory;
    });
  }, [initialProducts, activeCategories]);

  const toggleCategory = (id: string) => {
    setActiveCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const removeFilter = (id: string) => {
    setActiveCategories(prev => prev.filter(c => c !== id));
  };

  const activeCategoryNames = categories.filter(c => activeCategories.includes(c.id));

  return (
    <div className="flex flex-col gap-6">
      {/* Active Filters + Result count bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border border-outline-variant/30">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-on-surface-variant">Active Filters:</span>
          {activeCategoryNames.length > 0 ? (
            activeCategoryNames.map(cat => (
              <button
                key={cat.id}
                onClick={() => removeFilter(cat.id)}
                className="inline-flex items-center gap-1.5 text-sm bg-surface-container-low border border-outline-variant/40 px-3 py-1.5 rounded-md text-on-surface font-medium hover:border-on-surface transition-colors"
              >
                {cat.name} <X className="w-3.5 h-3.5 text-on-surface-variant" />
              </button>
            ))
          ) : (
            <span className="text-sm text-on-surface-variant">No filters applied</span>
          )}
        </div>
        <span className="text-sm text-on-surface-variant">
          Showing <span className="font-semibold text-on-surface">{filteredProducts.length}</span> Results
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white p-5 rounded-lg border border-outline-variant/30">
            <h3 className="font-heading font-bold text-lg text-on-surface mb-5 pb-3 border-b border-outline-variant/30">Filters</h3>

            {/* Category checkboxes */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-on-surface mb-3">Category</h4>
              <div className="space-y-2.5">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={activeCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="w-4 h-4 rounded border-outline text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Application radio buttons */}
            <div>
              <h4 className="font-semibold text-sm text-on-surface mb-3">Application</h4>
              <div className="space-y-2.5">
                {applicationTypes.map((app) => (
                  <label key={app} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="application"
                      checked={activeApplication === app}
                      onChange={() => setActiveApplication(activeApplication === app ? '' : app)}
                      className="w-4 h-4 border-outline text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{app}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main product grid */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border border-outline-variant/30">
              <p className="text-on-surface-variant text-base">No equipment matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
