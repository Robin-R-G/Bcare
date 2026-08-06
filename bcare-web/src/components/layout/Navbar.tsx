'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white border-b border-outline-variant/30 sticky top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="font-heading font-extrabold text-2xl md:text-[28px] text-primary tracking-tight leading-tight shrink-0">
          BCare Bakery &amp;<br className="sm:hidden" /> Kitchen
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-on-surface font-semibold border-b-2 border-on-surface pb-0.5'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact">
            <Button className="bg-primary text-on-primary hover:bg-primary-container font-semibold text-sm px-5 h-10 rounded-md shadow-sm">
              Request Quote
            </Button>
          </Link>

          <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-outline-variant text-on-surface hover:bg-surface-container-low font-medium text-sm px-5 h-10 rounded-md">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-outline-variant/20 px-margin-mobile py-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/5 text-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-primary text-on-primary font-semibold h-10">Request Quote</Button>
            </Link>
            <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full border-outline-variant text-on-surface font-medium h-10">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
