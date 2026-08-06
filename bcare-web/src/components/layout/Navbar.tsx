'use client';

import Link from 'next/link';
import { Globe, Menu, Sparkles, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/context/CompareContext';

export function Navbar() {
  const { compareProducts } = useCompare();

  return (
    <header className="bg-surface dark:bg-surface font-label-sm text-label-sm sticky top-0 border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto hidden md:flex">
        <Link href="/" className="font-title-md text-title-md font-bold text-primary dark:text-primary-fixed-dim">
          BCare Bakery & Kitchen Equipments
        </Link>
        <nav className="flex items-center gap-6">
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/products">Products</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 flex items-center gap-1 font-semibold text-primary" href="/kitchen-solution-builder">
            <Sparkles className="w-3.5 h-3.5" /> Solution Builder
          </Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/services">Services</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/projects">Projects</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/blogs">Blog</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/compare" className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors flex items-center gap-1">
            <Scale className="w-5 h-5 text-primary" />
            {compareProducts.length > 0 && (
              <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {compareProducts.length}
              </span>
            )}
          </Link>
          <Link href="/contact">
            <Button className="bg-[#F97316] text-white hover:bg-orange-600 font-label-sm px-6">
              Request Quote
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className="flex justify-between items-center w-full px-margin-mobile py-4 md:hidden">
        <Link href="/" className="font-title-md text-title-md font-bold text-primary">
          BCare Equipments
        </Link>
        <button className="text-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
