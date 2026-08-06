import Link from 'next/link';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export function Footer() {
  return (
    <footer className="bg-[#0b1f33] text-white w-full mt-auto">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        {/* Top row: Brand name */}
        <h3 className="font-heading text-2xl font-bold mb-3">
          BCare Bakery &amp; Kitchen Equipments
        </h3>
        <p className="text-white/60 text-sm mb-8 max-w-lg">
          © {new Date().getFullYear()} BCare Bakery & Kitchen Equipments. All rights reserved. Precision Engineered for Professionals.
        </p>

        {/* Bottom row: Legal + Support links */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/70">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link>
          <Link href="/warranty" className="hover:text-white transition-colors">Warranty</Link>
          <Link href="/service-centers" className="hover:text-white transition-colors">Service Centers</Link>
        </div>
      </div>
    </footer>
  );
}
