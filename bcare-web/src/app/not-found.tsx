'use client';

import Link from 'next/link';
import { PackageSearch, Home, Search, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { useB2B } from '@/context/B2BContext';

export default function NotFound() {
  const { setSearchOpen } = useB2B();

  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center p-6 py-16">
      <div className="text-center max-w-lg bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-outline-variant/30 shadow-2xl space-y-6">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <PackageSearch className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F97316]">404 Error</span>
          <h1 className="font-heading text-3xl font-extrabold text-primary mt-1">Equipment Page Not Found</h1>
          <p className="text-on-surface-variant text-sm mt-2 leading-relaxed">
            The commercial equipment page or resource you are looking for may have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => setSearchOpen(true)}
            className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 text-sm h-11 px-5 rounded-xl gap-2 shadow"
          >
            <Search className="w-4 h-4 text-[#F97316]" /> Search Equipment
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full border-outline-variant text-sm h-11 px-5 rounded-xl gap-2">
              <Home className="w-4 h-4" /> Return Home
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-outline-variant/20 flex items-center justify-center gap-6 text-xs text-on-surface-variant font-medium">
          <a href={`tel:${COMPANY_DETAILS.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call Helpline
          </a>
          <span>•</span>
          <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Sales
          </a>
        </div>
      </div>
    </div>
  );
}
