'use client';

import Link from 'next/link';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, ShieldCheck, Award, ExternalLink, ChevronRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { asset } from '@/lib/utils';
import { useState } from 'react';

export function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);
  const primaryLogoPath = asset('/logo.webp')!;

  const equipmentCategories = [
    { name: 'Planetary & Spiral Mixers', href: '/products' },
    { name: 'Rotary Rack & Deck Ovens', href: '/products' },
    { name: 'Dough Sheeters & Slicers', href: '/products' },
    { name: 'Commercial Refrigeration', href: '/products' },
    { name: 'Stainless Steel Fabrication', href: '/products' },
  ];

  const quickLinks = [
    { name: 'About BCare', href: '/about' },
    { name: 'Kitchen Solution Builder', href: '/kitchen-solution-builder' },
    { name: 'Commercial Projects', href: '/projects' },
    { name: 'Photo & Video Gallery', href: '/gallery' },
    { name: 'Client Reviews', href: '/reviews' },
    { name: 'Industry Blogs', href: '/blogs' },
    { name: 'Service Centers & Support', href: '/service-centers' },
    { name: 'Warranty & Shipping Policy', href: '/warranty' },
  ];

  return (
    <footer className="bg-[#0B1F33] text-white w-full mt-auto relative overflow-hidden border-t border-slate-800">
      
      {/* Top Call-to-Action Pre-Footer Banner */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-[#0B1F33] via-[#112942] to-[#0B1F33] py-10 px-4 sm:px-6 xl:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-700/60 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> 15+ Years Commercial Kitchen Expertise
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Planning a Bakery or Commercial Kitchen in Kerala?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Get customized layout planning, direct factory pricing, and full installation support from BCare technical experts.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white font-bold text-sm px-6 h-12 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all hover:-translate-y-0.5">
                <span>Request B2B Quote</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${encodeURIComponent('Hello BCare team, I am interested in setting up a commercial kitchen.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 hover:border-emerald-500/80 font-bold text-sm px-5 h-12 rounded-xl transition-all">
                <MessageCircle className="w-4.5 h-4.5 mr-2 text-emerald-400 fill-emerald-900" />
                <span>Instant WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Trust Badges (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3.5 group">
              {!logoFailed ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-[#F97316]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <img
                    src={primaryLogoPath}
                    alt="BCare Bakery & Kitchen Equipments"
                    className="relative h-14 w-auto max-w-[58px] object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={() => setLogoFailed(true)}
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-[#F97316]/20">
                  BC
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl text-white leading-none tracking-tight group-hover:text-[#F97316] transition-colors">
                  BCare
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">
                  Bakery & Kitchen Equipments
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed">
              Established in 2010 in Nadathara, Thrissur, BCare is a premier manufacturer and supplier of commercial bakery machinery and commercial kitchen equipment across Kerala and South India.
            </p>

            {/* Trust Badges */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>GST Registered</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-200 font-semibold">
                <Award className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>ESTD 2010 (15+ Yrs)</span>
              </div>
            </div>

            {/* Social & Channel Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_DETAILS.socialMedia.indiamart}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 hover:border-slate-500"
                title="View BCare IndiaMART Catalogue"
              >
                <span>IndiaMART</span>
                <ExternalLink className="w-3 h-3 text-[#F97316]" />
              </a>
              <a
                href={COMPANY_DETAILS.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 hover:border-slate-500"
                title="Follow BCare on Instagram"
              >
                <Share2 className="w-3 h-3 text-pink-400" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Col 2: Equipment Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-[#F97316] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
              Equipment Range
            </h4>
            <ul className="space-y-2.5 text-sm">
              {equipmentCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group font-medium"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#F97316] group-hover:translate-x-0.5 transition-transform" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation & Support (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-[#F97316] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
              Explore & Support
            </h4>
            <ul className="space-y-2 text-xs xl:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1 group font-medium py-0.5"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Showroom Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-[#F97316] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
              Showroom & Contact
            </h4>
            
            <div className="space-y-3.5 text-sm">
              <a
                href="https://maps.google.com/?q=BCare+Bakery+Equipments+Thrissur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition-all group"
              >
                <MapPin className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="text-slate-300 text-xs leading-relaxed">
                  <span className="font-bold text-white block mb-0.5">BCare Head Office & Showroom</span>
                  {COMPANY_DETAILS.address.full}
                  <span className="text-[#F97316] font-semibold flex items-center gap-1 mt-1 group-hover:underline">
                    Get Directions <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>

              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 text-slate-200 hover:text-[#F97316] transition-colors group font-semibold text-xs xl:text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{COMPANY_DETAILS.phone} / {COMPANY_DETAILS.phoneAlt}</span>
              </a>

              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="flex items-center gap-3 text-slate-200 hover:text-[#F97316] transition-colors group font-semibold text-xs xl:text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="truncate">{COMPANY_DETAILS.email}</span>
              </a>

              <div className="flex items-center gap-3 text-slate-300 text-xs">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span>{COMPANY_DETAILS.businessHours}</span>
              </div>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${encodeURIComponent('Hello BCare team, I am interested in your products.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-700/40 mt-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Location Tag */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            {!logoFailed ? (
              <img
                src={primaryLogoPath}
                alt="BCare"
                className="h-7 w-auto object-contain opacity-60"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-white font-extrabold text-[10px]">
                BC
              </div>
            )}
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <span className="text-slate-400">{COMPANY_DETAILS.positioningText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

