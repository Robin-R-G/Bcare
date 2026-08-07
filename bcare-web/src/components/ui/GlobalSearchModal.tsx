'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useB2B } from '@/context/B2BContext';
import { products, categories } from '@/lib/data/mock';
import { ProductImageWithFallback } from './ProductImageWithFallback';
import { Button } from './button';

const POPULAR_SEARCHES = [
  'Planetary Mixer',
  'Spiral Mixer',
  'Deck Oven',
  'Dough Sheeter',
  'Bread Slicer',
  'Rotary Rack Oven',
  'Commercial Chiller',
  'Fresh Cream Mixer',
];

export function GlobalSearchModal() {
  const { searchOpen, setSearchOpen, addToBasket, addToCompare, isInCompare, isInBasket } = useB2B();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.applications.some((app) => app.toLowerCase().includes(q))
      );
    });
  }, [query]);

  if (!searchOpen) return null;

  const formatPrice = (price?: number) => {
    if (!price) return 'Price on Request';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden mb-12 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative border-b border-outline-variant/30 p-4 flex items-center gap-3 bg-surface-container-lowest">
          <Search className="w-5 h-5 text-primary shrink-0 ml-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search equipment by name, category, application (Press Esc to close)..."
            className="w-full text-base font-medium text-on-surface bg-transparent focus:outline-none placeholder:text-on-surface-variant/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="text-xs font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1.5 rounded-lg hover:bg-surface-container-high transition-colors shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Search Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-3 block">
                  Popular B2B Equipment Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs font-semibold text-primary bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Categories */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-3 block">
                  Browse Categories
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container hover:border-primary/40 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{cat.name}</p>
                        <p className="text-xs text-on-surface-variant line-clamp-1">{cat.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 bg-surface-container text-on-surface-variant rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-on-surface">No equipment found matching &quot;{query}&quot;</h3>
              <p className="text-sm text-on-surface-variant mt-1">Try searching for spiral mixers, deck ovens, slicers, or chillers.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Search Results ({searchResults.length})
                </span>
              </div>
              <div className="divide-y divide-outline-variant/20">
                {searchResults.map((product) => {
                  const inCart = isInBasket(product.id);
                  const inComp = isInCompare(product.id);

                  return (
                    <div
                      key={product.id}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-low/50 p-2 rounded-xl transition-colors group"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 flex-1"
                      >
                        <div className="w-14 h-14 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-1 shrink-0 overflow-hidden">
                          <ProductImageWithFallback
                            src={product.featured_image || product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                            {product.categoryName} • SKU: {product.sku}
                          </span>
                          <h4 className="font-heading font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-xs font-semibold text-orange-600">
                            {product.priceOnRequest ? 'Price on Request' : formatPrice(product.price)}
                          </span>
                        </div>
                      </Link>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCompare(product)}
                          className={`text-xs h-8 px-3 rounded-lg ${inComp ? 'border-primary text-primary bg-primary/5' : ''}`}
                        >
                          {inComp ? 'Comparing' : 'Compare'}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => addToBasket(product)}
                          className="bg-primary hover:bg-primary-container text-white text-xs h-8 px-3 rounded-lg"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                          {inCart ? 'Added' : '+ Quote'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
