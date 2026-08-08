'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { useB2B } from '@/context/B2BContext';
import { ProductImageWithFallback } from './ProductImageWithFallback';
import { Button } from './button';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export function EnquiryBasketDrawer() {
  const { basketOpen, setBasketOpen, basket, removeFromBasket, updateQuantity, clearBasket } = useB2B();

  if (!basketOpen) return null;

  const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);

  const generateBulkWhatsappMessage = () => {
    const itemsListText = basket
      .map((item, idx) => `${idx + 1}. ${item.product.name} (Qty: ${item.quantity})`)
      .join('\n');

    return encodeURIComponent(
      `Hello BCare Bakery & Kitchen Equipments,\n\nI would like to request a formal quotation for the following equipment items:\n\n${itemsListText}\n\nPlease share:\n• Package pricing & discounts\n• Delivery schedule & installation support\n• Technical spec sheets\n\nThank you.`
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={() => setBasketOpen(false)}
    >
      <div
        className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-outline-variant/30 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-on-surface">Enquiry Basket</h2>
              <p className="text-xs text-on-surface-variant">{totalItems} item(s) selected for quote</p>
            </div>
          </div>
          <button
            onClick={() => setBasketOpen(false)}
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
            aria-label="Close basket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {basket.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 bg-surface-container text-on-surface-variant/50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-base text-on-surface">Your Enquiry Basket is Empty</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mt-1 mb-6">
                Browse our commercial equipment catalog and add products to request a combined quotation.
              </p>
              <Link href="/products" onClick={() => setBasketOpen(false)}>
                <Button className="bg-primary text-white font-semibold text-sm px-6 h-11 rounded-xl">
                  Explore Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-semibold">
                <span>SELECTED EQUIPMENT</span>
                <button onClick={clearBasket} className="text-red-600 hover:underline">
                  Clear All
                </button>
              </div>

              {basket.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30 flex items-center gap-3 group"
                >
                  <div className="w-16 h-16 bg-white border border-outline-variant/30 rounded-lg p-1 shrink-0 overflow-hidden">
                    <ProductImageWithFallback
                      src={product.featured_image || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-xs text-on-surface truncate" title={product.name}>
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-on-surface-variant block">SKU: {product.sku}</span>
                    <span className="text-xs font-semibold text-orange-600">
                      {product.priceOnRequest ? 'Price on Request' : `₹${product.price?.toLocaleString('en-IN')}`}
                    </span>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromBasket(product.id)}
                      className="text-on-surface-variant hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-white border border-outline-variant/30 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="text-on-surface hover:text-primary transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="text-on-surface hover:text-primary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {basket.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-outline-variant/30 bg-surface-container-lowest space-y-3">
            <Link
              href="/contact?type=bulk"
              onClick={() => setBasketOpen(false)}
            >
              <Button className="w-full bg-[#F97316] text-white hover:bg-orange-600 font-semibold text-sm h-12 rounded-xl shadow-md gap-2">
                <FileText className="w-4 h-4" /> Request Complete Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${generateBulkWhatsappMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-sm h-11 rounded-xl gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Bulk Enquiry
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
