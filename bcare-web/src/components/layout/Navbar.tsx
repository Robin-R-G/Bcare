'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle, Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { useState, useEffect } from 'react';
import { useB2B } from '@/context/B2BContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalSearchModal } from '@/components/ui/GlobalSearchModal';
import { EnquiryBasketDrawer } from '@/components/ui/EnquiryBasketDrawer';
import { CompareFloatingBar } from '@/components/ui/CompareFloatingBar';
import { BrochureDownloadModal } from '@/components/ui/BrochureDownloadModal';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const { basket, setSearchOpen, setBasketOpen } = useB2B();

  const totalBasketItems = basket.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const primaryLogoPath = process.env.NODE_ENV === 'production' ? '/Bcare/logo.webp' : '/logo.webp';

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/80'
            : 'bg-white py-3.5 border-b border-slate-200/50'
        }`}
      >
        <div className="flex justify-between items-center w-full px-4 sm:px-6 xl:px-8 max-w-[1440px] mx-auto gap-3">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group py-1">
            {!logoFailed ? (
              <img
                src={primaryLogoPath}
                alt="BCare Bakery & Kitchen Equipments"
                className="h-10 w-auto max-w-[42px] object-contain transition-transform duration-300 group-hover:scale-105"
                onError={() => {
                  if (primaryLogoPath !== '/logo.webp') {
                    const img = new Image();
                    img.src = '/logo.webp';
                    img.onload = () => setLogoFailed(false);
                    img.onerror = () => setLogoFailed(true);
                  } else {
                    setLogoFailed(true);
                  }
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F33] to-[#1E3A5F] flex items-center justify-center text-white font-extrabold text-sm shadow-sm group-hover:shadow-md transition-all">
                BC
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl text-[#0B1F33] leading-none tracking-tight group-hover:text-[#F97316] transition-colors">
                BCare
              </span>
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold mt-0.5">
                Bakery & Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:text-[#0B1F33] hover:bg-white/80'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#0B1F33] rounded-xl shadow-xs -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Suite */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Quick Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:shadow-xs group"
              title="Search commercial equipment (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#0B1F33] group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] text-slate-500 font-mono shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Quote Basket */}
            <button
              onClick={() => setBasketOpen(true)}
              className="relative p-2.5 text-[#0B1F33] bg-slate-100/80 hover:bg-slate-200/80 rounded-xl border border-slate-200/80 transition-all hover:scale-105 active:scale-95"
              title="Enquiry Basket"
            >
              <ShoppingBag className="w-4 h-4 text-[#0B1F33]" />
              {totalBasketItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-[#F97316] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-white"
                >
                  {totalBasketItems}
                </motion.span>
              )}
            </button>

            {/* Request Quote CTA */}
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-bold text-xs xl:text-sm px-4 xl:px-5 h-10 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5">
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-80" />
              </Button>
            </Link>

            {/* Direct WhatsApp Action */}
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${encodeURIComponent('Hello BCare, I would like to inquire about commercial kitchen & bakery equipment.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-emerald-500/30 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/80 hover:border-emerald-500/50 font-semibold text-xs xl:text-sm px-3.5 xl:px-4 h-10 rounded-xl transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600 fill-emerald-100" />
                <span>WhatsApp</span>
              </Button>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#0B1F33] p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Search equipment"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setBasketOpen(true)}
              className="relative text-[#0B1F33] p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Enquiry Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalBasketItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F97316] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {totalBasketItems}
                </span>
              )}
            </button>

            <button
              className="text-[#0B1F33] p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-[#F97316]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Animated Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-slate-200/80 px-4 py-5 space-y-2 shadow-2xl overflow-hidden"
            >
              <nav className="grid grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-2.5 px-3.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#0B1F33] text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-[#0B1F33]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-200/60 grid grid-cols-1 gap-2.5">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-bold h-11 rounded-xl shadow-sm">
                    Request Commercial Quote
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${encodeURIComponent('Hello BCare, I would like to inquire about commercial kitchen & bakery equipment.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button variant="outline" className="w-full border-emerald-500/30 text-emerald-700 bg-emerald-50/50 font-semibold h-11 rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2 text-emerald-600 fill-emerald-100" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Modals & Overlay Drawers */}
      <GlobalSearchModal />
      <EnquiryBasketDrawer />
      <CompareFloatingBar />
      <BrochureDownloadModal />
    </>
  );
}
