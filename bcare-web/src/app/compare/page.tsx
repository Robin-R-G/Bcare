'use client';

import { useCompare } from '@/context/CompareContext';
import { Button } from '@/components/ui/button';
import { X, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const { compareProducts, removeFromCompare, clearCompare } = useCompare();

  if (compareProducts.length === 0) {
    return (
      <div className="bg-background min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-ambient">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="font-display-md text-2xl font-bold text-primary mb-2">No Products Selected</h1>
          <p className="text-on-surface-variant text-sm mb-6">
            Explore our product catalog and click &quot;Compare&quot; on equipment items to compare specifications side-by-side.
          </p>
          <Link href="/products">
            <Button className="bg-primary text-white hover:bg-primary-container">Browse Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-outline-variant/30 pb-6">
          <div>
            <h1 className="font-display-lg text-display-lg text-primary">Equipment Comparison</h1>
            <p className="text-on-surface-variant text-sm mt-1">Comparing technical specifications side-by-side ({compareProducts.length}/3 items)</p>
          </div>
          <Button variant="outline" onClick={clearCompare} className="text-error border-error/30 hover:bg-error/10">
            Clear All
          </Button>
        </div>

        {/* Comparison Grid Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px] grid grid-cols-4 gap-6">
            
            {/* Left Legend Column */}
            <div className="space-y-8 pt-48 text-sm font-semibold text-on-surface-variant">
              <div className="h-10 flex items-center border-b border-outline-variant/30">Category</div>
              <div className="h-16 flex items-center border-b border-outline-variant/30">Short Description</div>
              <div className="h-12 flex items-center border-b border-outline-variant/30">Capacity / Specs</div>
              <div className="h-20 flex items-center border-b border-outline-variant/30">Key Features</div>
              <div className="h-16 flex items-center border-b border-outline-variant/30">Applications</div>
            </div>

            {/* Compared Product Columns */}
            {compareProducts.map((product) => (
              <div key={product.id} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-ambient flex flex-col justify-between relative">
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Card Details */}
                <div className="space-y-4">
                  <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover rounded-xl border border-outline-variant/30" />
                  <h2 className="font-title-md font-bold text-primary text-base line-clamp-2">{product.name}</h2>
                  
                  {/* Category */}
                  <div className="h-10 flex items-center border-b border-outline-variant/30 text-xs font-semibold text-surface-tint">
                    {product.categoryName}
                  </div>

                  {/* Short Description */}
                  <div className="h-16 flex items-center border-b border-outline-variant/30 text-xs text-on-surface-variant line-clamp-3">
                    {product.shortDescription}
                  </div>

                  {/* Specs */}
                  <div className="h-12 flex items-center border-b border-outline-variant/30 text-xs text-on-surface font-mono">
                    {Object.entries(product.specifications).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' | ') || 'High Performance'}
                  </div>

                  {/* Features */}
                  <div className="h-20 flex items-center border-b border-outline-variant/30 text-xs text-on-surface-variant">
                    <ul className="space-y-1">
                      {product.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> {feat}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div className="h-16 flex items-center border-b border-outline-variant/30 text-xs text-on-surface-variant">
                    {product.applications.join(', ') || 'Commercial Kitchens'}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-4">
                  <Link href={`/products/${product.slug}`}>
                    <Button className="w-full bg-primary text-white hover:bg-primary-container text-xs h-10">
                      View Details & Quote
                    </Button>
                  </Link>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
