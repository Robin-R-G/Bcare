'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { useState, useEffect } from 'react';
import { useB2B } from '@/context/B2BContext';
import { GlobalSearchModal } from '@/components/ui/GlobalSearchModal';
import { EnquiryBasketDrawer } from '@/components/ui/EnquiryBasketDrawer';
import { CompareFloatingBar } from '@/components/ui/CompareFloatingBar';
import { BrochureDownloadModal } from '@/components/ui/BrochureDownloadModal';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { basket, setSearchOpen, setBasketOpen } = useB2B();

  const totalBasketItems = basket.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/kitchen-solution-builder' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className={`bg-white sticky top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-md border-b border-outline-variant/20 py-3' : 'border-b border-outline-variant/30 py-4'}`}>
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.webp" alt="BCare Bakery & Kitchen Equipments" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <span className="font-heading font-extrabold text-lg text-primary leading-none block">BCare</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Bakery & Kitchen</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-outline-variant/30 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              title="Search B2B equipment (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-primary" />
              <span>Search</span>
              <kbd className="bg-white border border-outline-variant/40 px-1.5 py-0.5 rounded text-[10px] text-on-surface-variant font-mono">⌘K</kbd>
            </button>

            {/* Quote Basket Trigger */}
            <button
              onClick={() => setBasketOpen(true)}
              className="relative p-2 text-on-surface hover:bg-surface-container rounded-xl transition-colors"
              title="Enquiry Basket"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              {totalBasketItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F97316] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalBasketItems}
                </span>
              )}
            </button>

            <Link href="/contact">
              <Button className="bg-[#F97316] text-white hover:bg-orange-600 font-semibold text-sm px-5 h-10 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                Request Quote
              </Button>
            </Link>

            <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-outline-variant text-on-surface hover:bg-surface-container-low font-medium text-sm px-4 h-10 rounded-lg">
                <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600" /> WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-primary p-2 rounded-lg hover:bg-surface-container-low transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setBasketOpen(true)}
              className="relative text-primary p-2 rounded-lg hover:bg-surface-container-low transition-colors"
              aria-label="Enquiry Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalBasketItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F97316] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalBasketItems}
                </span>
              )}
            </button>

            <button
              className="text-primary p-2 rounded-lg hover:bg-surface-container-low transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-outline-variant/20 px-margin-mobile py-4 space-y-1 shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/5 text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-3">
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-[#F97316] text-white font-semibold h-11 rounded-lg">Request Quote</Button>
              </Link>
              <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-outline-variant text-on-surface font-medium h-11 rounded-lg">
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals & Overlay Drawers */}
      <GlobalSearchModal />
      <EnquiryBasketDrawer />
      <CompareFloatingBar />
      <BrochureDownloadModal />
    </>
  );
}
