'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

export interface BasketItem {
  product: Product;
  quantity: number;
}

interface B2BContextType {
  basket: BasketItem[];
  addToBasket: (product: Product, quantity?: number) => void;
  removeFromBasket: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearBasket: () => void;
  isInBasket: (productId: string) => boolean;

  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  basketOpen: boolean;
  setBasketOpen: (open: boolean) => void;

  brochureModalProduct: Product | null;
  setBrochureModalProduct: (product: Product | null) => void;
}

const B2BContext = createContext<B2BContextType | undefined>(undefined);

const BASKET_STORAGE_KEY = 'bcare_enquiry_basket';
const COMPARE_STORAGE_KEY = 'bcare_compare_list';

export function B2BProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);
  const [brochureModalProduct, setBrochureModalProduct] = useState<Product | null>(null);

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedBasket = localStorage.getItem(BASKET_STORAGE_KEY);
      if (savedBasket) setBasket(JSON.parse(savedBasket));

      const savedCompare = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (savedCompare) setCompareList(JSON.parse(savedCompare));
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Save basket changes
  useEffect(() => {
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
    } catch {
      // Ignore storage write errors
    }
  }, [basket]);

  // Save compare changes
  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareList));
    } catch {
      // Ignore storage write errors
    }
  }, [compareList]);

  // Ctrl+K Global Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Basket Handlers
  const addToBasket = (product: Product, quantity = 1) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setBasketOpen(true);
  };

  const removeFromBasket = (productId: string) => {
    setBasket((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setBasket((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BasketItem[]
    );
  };

  const clearBasket = () => setBasket([]);

  const isInBasket = (productId: string) =>
    basket.some((item) => item.product.id === productId);

  // Compare Handlers
  const addToCompare = (product: Product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 equipment items at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (productId: string) =>
    compareList.some((p) => p.id === productId);

  return (
    <B2BContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        clearBasket,
        isInBasket,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        searchOpen,
        setSearchOpen,
        basketOpen,
        setBasketOpen,
        brochureModalProduct,
        setBrochureModalProduct,
      }}
    >
      {children}
    </B2BContext.Provider>
  );
}

export function useB2B() {
  const context = useContext(B2BContext);
  if (!context) {
    throw new Error('useB2B must be used within a B2BProvider');
  }
  return context;
}
