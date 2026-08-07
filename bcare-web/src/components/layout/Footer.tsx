import Link from 'next/link';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0b1f33] text-white w-full mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.webp" alt="BCare" className="h-10 w-10 object-contain" />
              <div>
                <span className="font-heading font-extrabold text-lg text-white leading-none block">BCare</span>
                <span className="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Bakery & Kitchen</span>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Established in 2010, delivering premium commercial bakery and kitchen equipment across Kerala. Trusted EUROPYA and BCARE brands.
            </p>
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.15em] mb-5 text-white/60">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Products', href: '/products' },
                { name: 'Projects', href: '/projects' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Reviews', href: '/reviews' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.15em] mb-5 text-white/60">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
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

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-[0.15em] mb-5 text-white/60">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">{COMPANY_DETAILS.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40 shrink-0" />
                <span className="text-white/50 text-sm">{COMPANY_DETAILS.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40 shrink-0" />
                <span className="text-white/50 text-sm">{COMPANY_DETAILS.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-white/40 shrink-0" />
                <span className="text-white/50 text-sm">Mon-Sat: 9AM - 6PM</span>
              </li>
            </ul>
            <div className="mt-5">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
