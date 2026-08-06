import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { Button } from './button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-ambient hover:shadow-ambient-hover transition-all duration-300 border border-outline-variant/30 hover:border-surface-tint flex flex-col h-full">
      <div className="relative h-64 w-full bg-surface-container-low overflow-hidden">
        {/* Placeholder image approach since we don't have next/image configured for external domains perfectly yet, or we just use standard img for mock data to avoid Next.js domain errors */}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm">
            {product.categoryName}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-title-md text-title-md text-on-surface mb-2 line-clamp-1" title={product.name}>
          {product.name}
        </h3>
        <p className="text-on-surface-variant font-body-md text-body-md line-clamp-2 mb-6 flex-grow">
          {product.shortDescription}
        </p>
        <div className="flex items-center gap-3 mt-auto">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary-container">
              View Details
            </Button>
          </Link>
          <Link href={`/contact?product=${product.slug}`} className="flex-1">
            <Button className="w-full bg-[#F97316] text-white hover:bg-orange-600">
              Request Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
