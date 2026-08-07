import Link from 'next/link';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export function Footer() {
  return (
    <footer className="bg-[#0b1f33] text-white w-full mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl font-bold mb-4">
              BCare Bakery &amp; Kitchen Equipments
            </h3>
            <p className="text-white/50 text-sm mb-6 max-w-md leading-relaxed">
              Professional culinary solutions engineered for excellence. Delivering premium commercial kitchen and bakery equipment across Kerala.
            </p>
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved. Precision Engineered for Professionals.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.15em] mb-5 text-white/60">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.15em] mb-5 text-white/60">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Warranty', href: '/warranty' },
                { name: 'Service Centers', href: '/service-centers' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
