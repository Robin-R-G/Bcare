import Link from 'next/link';
import { Globe, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="bg-surface dark:bg-surface font-label-sm text-label-sm sticky top-0 border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto hidden md:flex">
        <Link href="/" className="font-title-md text-title-md font-bold text-primary dark:text-primary-fixed-dim">
          BCare Bakery & Kitchen Equipments
        </Link>
        <nav className="flex items-center gap-6">
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/products">Products</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/services">Services</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/projects">Projects</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/about">About</Link>
          <Link className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant dark:text-on-secondary-container hover:text-primary transition-colors flex items-center gap-1 scale-95 active:scale-90 transition-transform">
            <Globe className="w-[18px] h-[18px]" /> Language
          </button>
          <Button className="bg-[#F97316] text-white hover:bg-orange-600 font-label-sm px-6">
            Request Quote
          </Button>
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
