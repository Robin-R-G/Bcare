'use client';

import { useB2B } from '@/context/B2BContext';
import { Button } from '@/components/ui/button';
import { X, Check, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToBasket } = useB2B();

  if (compareList.length === 0) {
    return (
      <div className="bg-background min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-ambient">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-primary mb-2">No Equipment Selected for Comparison</h1>
          <p className="text-on-surface-variant text-sm mb-6">
            Explore our commercial bakery & kitchen equipment catalog and click the &quot;Compare&quot; icon on products to compare specifications side-by-side.
          </p>
          <Link href="/products">
            <Button className="bg-primary text-white hover:bg-primary-container">Browse Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'Price on Request';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-outline-variant/30 pb-6">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-primary">Equipment Specification Comparison</h1>
            <p className="text-on-surface-variant text-sm mt-1">Comparing technical specifications side-by-side ({compareList.length}/4 items)</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/products">
              <Button variant="outline" className="border-outline-variant text-xs h-10 rounded-xl">
                + Add More Items
              </Button>
            </Link>
            <Button variant="outline" onClick={clearCompare} className="text-red-600 border-red-200 hover:bg-red-50 text-xs h-10 rounded-xl">
              Clear Comparison
            </Button>
          </div>
        </div>

        {/* Comparison Grid Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-5 gap-6">
            
            {/* Left Legend Column */}
            <div className="space-y-6 pt-52 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              <div className="h-10 flex items-center border-b border-outline-variant/30">Category</div>
              <div className="h-12 flex items-center border-b border-outline-variant/30">Pricing Status</div>
              <div className="h-16 flex items-center border-b border-outline-variant/30">Short Overview</div>
              <div className="h-20 flex items-center border-b border-outline-variant/30">Technical Specs</div>
              <div className="h-24 flex items-center border-b border-outline-variant/30">Key Features</div>
              <div className="h-16 flex items-center border-b border-outline-variant/30">Applications</div>
            </div>

            {/* Compared Product Columns */}
            {compareList.map((product) => (
              <div key={product.id} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-ambient flex flex-col justify-between relative">
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-red-50 hover:text-red-600 transition-colors z-10"
                  title="Remove item"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Card Details */}
                <div className="space-y-4">
                  <div className="h-44 w-full bg-[#F8FAFC] border border-outline-variant/30 rounded-xl p-3 flex items-center justify-center overflow-hidden">
                    <ProductImageWithFallback
                      src={product.featured_image || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-semibold text-on-surface-variant block mb-1">
                      SKU: {product.sku}
                    </span>
                    <h2 className="font-heading font-bold text-primary text-base line-clamp-2" title={product.name}>
                      {product.name}
                    </h2>
                  </div>
                  
                  {/* Category */}
                  <div className="h-10 flex items-center border-b border-outline-variant/30 text-xs font-semibold text-primary">
                    {product.categoryName}
                  </div>

                  {/* Pricing */}
                  <div className="h-12 flex items-center border-b border-outline-variant/30 text-xs font-bold text-orange-600">
                    {product.priceOnRequest ? 'Price on Request' : formatPrice(product.price)}
                  </div>

                  {/* Short Description */}
                  <div className="h-16 flex items-center border-b border-outline-variant/30 text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    {product.shortDescription}
                  </div>

                  {/* Specs */}
                  <div className="h-20 flex items-center border-b border-outline-variant/30 text-xs text-on-surface font-mono">
                    <div className="space-y-1">
                      {Object.entries(product.specifications).slice(0, 3).map(([k, v]) => (
                        <div key={k} className="text-[11px] truncate">
                          <span className="text-on-surface-variant font-sans font-semibold">{k}:</span> {String(v)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="h-24 flex items-center border-b border-outline-variant/30 text-xs text-on-surface-variant">
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-1 leading-tight">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div className="h-16 flex items-center border-b border-outline-variant/30 text-xs text-on-surface-variant">
                    <span className="line-clamp-2">{product.applications.join(', ') || 'Commercial Kitchens'}</span>
                  </div>
                </div>

                {/* Bottom CTAs */}
                <div className="pt-6 mt-4 space-y-2">
                  <Button
                    onClick={() => addToBasket(product)}
                    className="w-full bg-[#F97316] text-white hover:bg-orange-600 text-xs h-10 font-semibold rounded-xl gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> + Add to Quote
                  </Button>
                  <Link href={`/products/${product.slug}`} className="block">
                    <Button variant="outline" className="w-full text-xs h-9 font-semibold rounded-xl border-outline-variant">
                      View Page
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
