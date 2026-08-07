'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Button } from './button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { MessageCircle, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { ProductImageWithFallback } from './ProductImageWithFallback';
import { useB2B } from '@/context/B2BContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToBasket, isInBasket, addToCompare, removeFromCompare, isInCompare } = useB2B();
  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/${product.slug}` : `/products/${product.slug}`;
  const whatsappMessage = encodeURIComponent(
    `Hello BCare Bakery & Kitchen Equipments,\n\nI am interested in:\n${product.name}\n\nPlease share:\n• Latest price\n• Product specifications\n• Availability\n• Delivery details\n• Installation details\n\nThank you.\n${currentUrl}`
  );

  const specEntries = product.specifications
    ? Object.entries(product.specifications).slice(0, 3)
    : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const imageSrc = product.featured_image || (product.images && product.images[0]);
  const inCart = isInBasket(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-[#94A3B8]/30 hover:shadow-[0px_10px_20px_rgba(11,31,51,0.05)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      <div className="relative h-60 w-full bg-[#F8FAFC] overflow-hidden p-4">
        <ProductImageWithFallback
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#0B1F33] text-white font-semibold text-[11px] px-3 py-1 rounded uppercase tracking-wider">
            {product.badge || product.categoryName}
          </span>
        </div>

        {/* Quick Top Actions: Compare & Cart */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => inCompare ? removeFromCompare(product.id) : addToCompare(product)}
            className={`p-1.5 rounded-lg border text-xs font-semibold transition-all ${
              inCompare
                ? 'bg-primary text-white border-primary shadow'
                : 'bg-white/90 text-on-surface-variant hover:bg-white border-outline-variant/40'
            }`}
            title={inCompare ? 'Remove from Compare' : 'Add to Compare'}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => addToBasket(product)}
            className={`p-1.5 rounded-lg border text-xs font-semibold transition-all ${
              inCart
                ? 'bg-[#F97316] text-white border-[#F97316] shadow'
                : 'bg-white/90 text-on-surface-variant hover:bg-white border-outline-variant/40'
            }`}
            title={inCart ? 'In Quote Basket' : 'Add to Quote Basket'}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#94A3B8]">
            {product.categoryName}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
            product.availability === 'In Stock'
              ? 'bg-emerald-500/10 text-emerald-600'
              : product.availability === 'Made to Order'
              ? 'bg-amber-500/10 text-amber-600'
              : 'bg-blue-500/10 text-blue-600'
          }`}>
            {product.availability}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-heading font-bold text-lg text-[#1b1c1d] mb-2 line-clamp-2" title={product.name}>
          {product.name}
        </h3>

        {/* Price */}
        <div className="mb-3">
          {product.priceOnRequest ? (
            <span className="text-sm font-semibold text-[#F97316]">Price on Request</span>
          ) : (
            <span className="text-lg font-extrabold text-[#1b1c1d]">{formatPrice(product.price!)}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-[#44474c] text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Spec Table */}
        {specEntries.length > 0 && (
          <div className="border-t border-[#94A3B8]/20 pt-3 mb-4">
            {specEntries.map(([key, value]) => (
              <div key={key} className="flex justify-between py-1.5 text-sm">
                <span className="text-[#44474c] font-label-sm uppercase tracking-wider text-[11px]">{key}</span>
                <span className="text-[#1b1c1d] font-medium text-right text-[13px]">{String(value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex gap-2">
            <Link href={`/products/${product.slug}`} className="flex-1">
              <Button className="w-full bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 text-sm h-10 font-semibold rounded-md">
                View Details
              </Button>
            </Link>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" className="w-full border-[#0B1F33] text-[#0B1F33] hover:bg-[#0B1F33]/5 text-sm h-10 font-semibold rounded-md">
                <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600" /> WhatsApp
              </Button>
            </a>
          </div>
          <Button
            onClick={() => addToBasket(product)}
            variant="outline"
            className={`w-full text-sm h-9 font-medium rounded-md transition-all ${
              inCart
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                : 'border-[#94A3B8]/40 text-[#44474c] hover:bg-[#F8FAFC]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 mr-1.5" /> {inCart ? 'Added to Quote Basket' : '+ Add to Quote Basket'}
          </Button>
        </div>
      </div>
    </div>
  );
}
