import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <>
      <footer className="bg-surface-container dark:bg-inverse-surface w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-padding max-w-container-max mx-auto bg-surface-container-high dark:bg-tertiary-container">
          <div className="col-span-1 md:col-span-2">
            <div className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim mb-4">
              BCare Bakery & Kitchen Equipments
            </div>
            <p className="font-body-md text-body-md text-on-surface dark:text-inverse-on-surface opacity-80 mb-6 max-w-md">
              Professional culinary solutions engineered for excellence. Delivering premium commercial kitchen and bakery equipment worldwide.
            </p>
            <div className="text-on-surface-variant dark:text-surface-variant font-label-sm text-label-sm">
              © {new Date().getFullYear()} BCare Bakery & Kitchen Equipments. All rights reserved.
            </div>
          </div>
          <div>
            <h4 className="font-title-md text-title-md text-on-surface dark:text-inverse-on-surface mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/products">Products</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/services">Services</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/projects">Projects</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-title-md text-title-md text-on-surface dark:text-inverse-on-surface mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="/contact">Contact</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="https://wa.me/yourwhatsappnumber">WhatsApp</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="tel:+910000000000">Phone</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all opacity-80 hover:opacity-100 font-label-sm text-label-sm" href="mailto:info@bcare.com">Email</Link></li>
              <li><span className="text-on-surface-variant dark:text-surface-variant opacity-80 font-label-sm text-label-sm">Kerala Office Locations</span></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp CTA */}
      <a 
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-ambient hover:shadow-ambient-hover hover:-translate-y-1 transition-all z-50 flex items-center justify-center" 
        href="https://wa.me/yourwhatsappnumber"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-[28px] h-[28px]" />
      </a>
    </>
  );
}
