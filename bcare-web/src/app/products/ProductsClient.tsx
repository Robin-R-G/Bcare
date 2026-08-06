'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query) ||
        (product.shortDescription && product.shortDescription.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input 
            placeholder="Search equipment..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 border-outline focus-visible:ring-primary rounded-md"
          />
        </div>

        {/* Categories list */}
        <div className="flex flex-col gap-2 bg-white p-4 rounded-xl border border-outline-variant/30">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2">Categories</h3>
          <button
            onClick={() => setActiveCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-md font-label-md text-xs transition-colors ${
              activeCategory === 'all' 
                ? 'bg-primary text-white font-bold' 
                : 'text-secondary hover:bg-muted'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md font-label-md text-xs transition-colors ${
                activeCategory === category.id 
                  ? 'bg-primary text-white font-bold' 
                  : 'text-secondary hover:bg-muted'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main product catalog grid */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-20 bg-white rounded-xl border border-outline-variant/30">
            <p className="text-on-surface-variant font-body-lg">No food equipment matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
