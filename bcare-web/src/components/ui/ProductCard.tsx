'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Button } from './button';
import { useCompare } from '@/context/CompareContext';
import { Scale, Check } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants/company';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const inCompare = isInCompare(product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello BCare (${COMPANY_DETAILS.name}), I am interested in ${product.name}. Please provide quotation and specifications.`
  );

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/30 flex flex-col h-full">
      <div className="relative h-56 w-full bg-surface-container-low overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white font-label-sm text-[11px] uppercase tracking-wider px-2.5 py-1 rounded font-semibold shadow-xs">
            {product.categoryName}
          </span>
        </div>

        {/* Compare Badge */}
        <button
          onClick={handleCompareClick}
          className={`absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 shadow-xs transition-all ${
            inCompare
              ? 'bg-emerald-600 text-white'
              : 'bg-white/90 backdrop-blur-sm text-on-surface hover:bg-white border border-outline-variant/40'
          }`}
        >
          {inCompare ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
          {inCompare ? 'Compared' : 'Compare'}
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-heading font-bold text-lg text-on-surface mb-2 line-clamp-1" title={product.name}>
          {product.name}
        </h3>
        <p className="text-on-surface-variant font-body-md text-sm line-clamp-2 mb-5 flex-grow">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white text-xs h-9 font-semibold">
              View Details
            </Button>
          </Link>
          <a
            href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full bg-[#F97316] text-white hover:bg-orange-600 text-xs h-9 font-semibold">
              Request Quote
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
