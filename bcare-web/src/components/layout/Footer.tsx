import Link from 'next/link';
import { MessageCircle, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export function Footer() {
  return (
    <>
      <footer className="bg-surface-container dark:bg-inverse-surface w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-padding max-w-container-max mx-auto bg-surface-container-high dark:bg-tertiary-container">
          <div className="col-span-1 md:col-span-2">
            <div className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim mb-4">
              {COMPANY_DETAILS.legalName}
            </div>
            <p className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface opacity-80 mb-4 max-w-md">
              {COMPANY_DETAILS.aboutBrief}
            </p>
            <p className="text-xs text-on-surface-variant font-semibold mb-6 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> {COMPANY_DETAILS.positioningText}
            </p>
            <div className="text-on-surface-variant dark:text-surface-variant font-label-sm text-label-sm">
              © {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved.
            </div>
          </div>
          <div>
            <h4 className="font-title-md text-title-md text-on-surface dark:text-inverse-on-surface mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/products">Products</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/kitchen-solution-builder">Solution Builder</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/projects">Projects</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/locations/thrissur">Thrissur HQ Location</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-title-md text-title-md text-on-surface dark:text-inverse-on-surface mb-4">Contact & Location</h4>
            <ul className="space-y-3 text-xs text-on-surface-variant">
              <li className="font-semibold text-on-surface">{COMPANY_DETAILS.address.full}</li>
              <li>Phone: {COMPANY_DETAILS.phone}</li>
              <li>Email: {COMPANY_DETAILS.email}</li>
              <li>Hours: Mon - Sat (9am - 6pm)</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp CTA */}
      <a 
        className="fixed bottom-20 md:bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-ambient hover:shadow-ambient-hover hover:-translate-y-1 transition-all z-50 flex items-center justify-center" 
        href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-[28px] h-[28px]" />
      </a>
    </>
  );
}
