'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Button } from './button';
import { COMPANY_DETAILS } from '@/lib/constants/company';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello BCare (${COMPANY_DETAILS.name}), I am interested in ${product.name}. Please provide quotation and specifications.`
  );

  // Extract spec entries for the spec table display
  const specEntries = product.specifications 
    ? Object.entries(product.specifications).slice(0, 3) 
    : [];

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-outline-variant/30 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative h-60 w-full bg-[#F8FAFC] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-on-surface/80 text-white font-semibold text-[11px] px-3 py-1 rounded uppercase tracking-wider">
            {product.categoryName || 'Pro Series'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow border-t border-outline-variant/20">
        <h3 className="font-heading font-bold text-lg text-on-surface mb-2 line-clamp-2" title={product.name}>
          {product.name}
        </h3>
        <p className="text-on-surface-variant text-sm line-clamp-3 mb-4 leading-relaxed flex-grow">
          {product.shortDescription}
        </p>

        {/* Spec Table */}
        {specEntries.length > 0 && (
          <div className="border-t border-outline-variant/20 pt-3 mb-4">
            {specEntries.map(([key, value]) => (
              <div key={key} className="flex justify-between py-1.5 text-sm">
                <span className="text-on-surface-variant">{key}:</span>
                <span className="text-on-surface font-medium text-right">{String(value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <Button className="w-full bg-primary text-on-primary hover:bg-primary-container text-sm h-10 font-semibold rounded-md">
              View Details
            </Button>
          </Link>
          <a
            href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" className="w-full border-outline text-on-surface hover:bg-surface-container-low text-sm h-10 font-medium rounded-md">
              Request Quote
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
