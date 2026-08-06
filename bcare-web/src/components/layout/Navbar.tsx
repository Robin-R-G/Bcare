'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sparkles, Scale, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/context/CompareContext';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export function Navbar() {
  const pathname = usePathname();
  const { compareProducts } = useCompare();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Solution Builder', href: '/kitchen-solution-builder', isHighlight: true },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Thrissur HQ', href: '/locations/thrissur' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 left-0 w-full z-50 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="font-heading font-extrabold text-xl md:text-2xl text-primary tracking-tight">
          BCare Bakery & Kitchen
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-label-md text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : link.isHighlight
                    ? 'text-[#F97316] font-bold flex items-center gap-1'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.isHighlight && <Sparkles className="w-3.5 h-3.5" />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/compare" className="relative p-2 rounded-lg text-secondary hover:bg-surface-container transition-colors" title="Compare Products">
            <Scale className="w-5 h-5 text-primary" />
            {compareProducts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F97316] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                {compareProducts.length}
              </span>
            )}
          </Link>

          <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-outline text-on-surface hover:bg-surface-container font-label-md text-xs px-4 h-9">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> WhatsApp
            </Button>
          </a>

          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary-container text-white font-label-md text-xs px-4 h-9 shadow-sm">
              Request Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Header Trigger */}
        <div className="flex lg:hidden items-center gap-3">
          <Link href="/compare" className="relative p-2 text-primary">
            <Scale className="w-5 h-5" />
            {compareProducts.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#F97316] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {compareProducts.length}
              </span>
            )}
          </Link>
          <button className="text-primary p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
