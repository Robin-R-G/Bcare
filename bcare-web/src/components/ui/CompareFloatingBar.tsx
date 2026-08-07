'use client';

import React from 'react';
import Link from 'next/link';
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { useB2B } from '@/context/B2BContext';
import { ProductImageWithFallback } from './ProductImageWithFallback';
import { Button } from './button';

export function CompareFloatingBar() {
  const { compareList, removeFromCompare, clearCompare } = useB2B();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-[#0B1F33] text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between gap-3">
        {/* Left Label */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-white/10 text-white rounded-xl flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-[#F97316]" />
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-xs block">Compare Equipment</span>
            <span className="text-[10px] text-white/70">{compareList.length}/4 selected</span>
          </div>
        </div>

        {/* Thumbnails List */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {compareList.map((product) => (
            <div
              key={product.id}
              className="relative w-10 h-10 bg-white rounded-lg p-0.5 shrink-0 border border-white/20 group"
            >
              <ProductImageWithFallback
                src={product.featured_image || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
              <button
                onClick={() => removeFromCompare(product.id)}
                className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 shadow hover:scale-110 transition-transform"
                title={`Remove ${product.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-white/70 hover:text-white transition-colors hidden sm:block px-2"
          >
            Clear
          </button>
          <Link href="/compare">
            <Button className="bg-[#F97316] text-white hover:bg-orange-600 font-semibold text-xs h-9 px-4 rounded-xl gap-1.5 shadow">
              Compare Now <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
