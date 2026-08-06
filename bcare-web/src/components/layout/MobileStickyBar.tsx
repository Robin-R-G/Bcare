'use client';

import { Phone, MessageCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileStickyBar() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest border-t border-outline-variant/30 px-4 py-2.5 flex items-center justify-between shadow-ambient">
      {/* Call Button */}
      <a
        href="tel:+919876543210"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-sm text-xs font-semibold hover:bg-surface-container-high transition-colors"
      >
        <Phone className="w-4 h-4 text-primary" /> Call Us
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-label-sm text-xs font-semibold mx-2 hover:bg-emerald-700 transition-colors shadow-sm"
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>

      {/* Request Quote Button */}
      <Link
        href="/contact"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white font-label-sm text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
      >
        <FileText className="w-4 h-4" /> Quote
      </Link>
    </div>
  );
}
