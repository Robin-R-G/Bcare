'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Product, Category } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { X, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface ProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

const applicationTypes = ['Commercial Bakery', 'Hotel & Restaurant', 'Industrial Kitchen', 'Catering'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'alpha', label: 'Alphabetical' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'category', label: 'Category' },
];

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeApplication, setActiveApplication] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(true);

  const filteredProducts = useMemo(() => {
    const result = initialProducts.filter((product) => {
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.categoryId);
      const matchesApplication = !activeApplication || product.applications.some(app =>
        app.toLowerCase().includes(activeApplication.toLowerCase())
      );
      const matchesSearch = !searchQuery || [
        product.name,
        product.categoryName,
        product.shortDescription,
        product.description,
        ...product.applications,
        ...product.features,
      ].some(field => field.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesApplication && matchesSearch;
    });

    // Sort
    switch (sortBy) {
      case 'alpha':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        result.sort((a, b) => {
          if (a.priceOnRequest && !b.priceOnRequest) return 1;
          if (!a.priceOnRequest && b.priceOnRequest) return -1;
          return (a.price || 0) - (b.price || 0);
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          if (a.priceOnRequest && !b.priceOnRequest) return 1;
          if (!a.priceOnRequest && b.priceOnRequest) return -1;
          return (b.price || 0) - (a.price || 0);
        });
        break;
      case 'category':
        result.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
        break;
      default:
        break;
    }

    return result;
  }, [initialProducts, activeCategories, activeApplication, searchQuery, sortBy]);

  const toggleCategory = useCallback((id: string) => {
    setActiveCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }, []);

  const removeFilter = useCallback((id: string) => {
    setActiveCategories(prev => prev.filter(c => c !== id));
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveCategories([]);
    setActiveApplication('');
    setSearchQuery('');
  }, []);

  const activeCategoryNames = categories.filter(c => activeCategories.includes(c.id));
  const hasActiveFilters = activeCategories.length > 0 || activeApplication !== '' || searchQuery !== '';

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products by name, category, or application..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#94A3B8]/30 rounded-lg text-sm text-[#1b1c1d] placeholder:text-[#94A3B8] focus:border-[#0B1F33] focus:ring-2 focus:ring-[#0B1F33]/10 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1b1c1d] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Active Filters + Result count bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg border border-[#94A3B8]/30">
        <div className="flex items-center gap-3 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-[#44474c]" />
          <span className="text-sm font-medium text-[#44474c]">Filters:</span>
          {activeCategoryNames.map(cat => (
            <button
              key={cat.id}
              onClick={() => removeFilter(cat.id)}
              className="inline-flex items-center gap-1.5 text-sm bg-[#0B1F33]/5 border border-[#0B1F33]/20 px-3 py-1.5 rounded-md text-[#0B1F33] font-medium hover:border-[#0B1F33]/40 transition-colors"
            >
              {cat.name} <X className="w-3.5 h-3.5" />
            </button>
          ))}
          {activeApplication && (
            <button
              onClick={() => setActiveApplication('')}
              className="inline-flex items-center gap-1.5 text-sm bg-[#F97316]/10 border border-[#F97316]/30 px-3 py-1.5 rounded-md text-[#F97316] font-medium hover:border-[#F97316]/50 transition-colors"
            >
              {activeApplication} <X className="w-3.5 h-3.5" />
            </button>
          )}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-1.5 text-sm bg-[#94A3B8]/10 border border-[#94A3B8]/30 px-3 py-1.5 rounded-md text-[#44474c] font-medium hover:border-[#94A3B8]/50 transition-colors"
            >
              &quot;{searchQuery}&quot; <X className="w-3.5 h-3.5" />
            </button>
          )}
          {!hasActiveFilters && (
            <span className="text-sm text-[#94A3B8]">No filters applied</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#F97316] font-medium hover:underline"
            >
              Clear All
            </button>
          )}
          <span className="text-sm text-[#44474c]">
            Showing <span className="font-semibold text-[#1b1c1d]">{filteredProducts.length}</span> Results
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white p-5 rounded-lg border border-[#94A3B8]/30">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden w-full flex items-center justify-between mb-4"
            >
              <h3 className="font-heading font-bold text-lg text-[#1b1c1d]">Filters</h3>
              <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <h3 className="hidden md:block font-heading font-bold text-lg text-[#1b1c1d] mb-5 pb-3 border-b border-[#94A3B8]/30">Filters</h3>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
              {/* Category checkboxes */}
              <div>
                <h4 className="font-semibold text-sm text-[#1b1c1d] mb-3">Category</h4>
                <div className="space-y-2.5">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={activeCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="w-4 h-4 rounded border-[#94A3B8] text-[#0B1F33] focus:ring-[#0B1F33]/20 accent-[#0B1F33]"
                      />
                      <span className="text-sm text-[#44474c] group-hover:text-[#1b1c1d] transition-colors">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Application radio buttons */}
              <div>
                <h4 className="font-semibold text-sm text-[#1b1c1d] mb-3">Application</h4>
                <div className="space-y-2.5">
                  {applicationTypes.map((app) => (
                    <label key={app} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="application"
                        checked={activeApplication === app}
                        onChange={() => setActiveApplication(activeApplication === app ? '' : app)}
                        className="w-4 h-4 border-[#94A3B8] text-[#0B1F33] focus:ring-[#0B1F33]/20 accent-[#0B1F33]"
                      />
                      <span className="text-sm text-[#44474c] group-hover:text-[#1b1c1d] transition-colors">{app}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-semibold text-sm text-[#1b1c1d] mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#94A3B8]/30 rounded-md text-sm text-[#1b1c1d] focus:border-[#0B1F33] focus:ring-2 focus:ring-[#0B1F33]/10 transition-all"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
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
            <div className="text-center py-20 bg-white rounded-lg border border-[#94A3B8]/30">
              <p className="text-[#44474c] text-base mb-2">No equipment matching your filters.</p>
              <button
                onClick={clearAllFilters}
                className="text-[#F97316] font-medium text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
