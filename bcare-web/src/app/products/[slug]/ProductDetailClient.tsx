'use client';

import Link from 'next/link';
import { ChevronRight, MessageCircle, FileText, CheckCircle2, Award, Zap, Download, ShieldCheck, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { useState } from 'react';

const tabs = ['Overview', 'Specifications', 'Applications', 'Features', 'Downloads'];

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeImage, setActiveImage] = useState(0);

  const whatsappMessage = encodeURIComponent(
    `Hello BCare (${COMPANY_DETAILS.name}), I am interested in the ${product.name}. Please provide details.`
  );

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="border-b border-outline-variant/30 py-4 bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center text-xs font-label-sm uppercase tracking-wider text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2" />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2" />
          <span className="text-primary font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main product display */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-[#F8FAFC] border border-outline-variant/30 rounded-xl p-6 h-[400px] md:h-[500px] flex items-center justify-center relative overflow-hidden group">
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary font-label-sm text-xs px-3 py-1 rounded border border-outline-variant/40 flex items-center gap-1 font-semibold z-10">
                <Award className="w-3.5 h-3.5 text-primary" /> Premium Series
              </span>
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden bg-[#F8FAFC] flex items-center justify-center transition-all ${
                      activeImage === i ? 'border-[#F97316]' : 'border-outline-variant/30 hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1 mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-emerald-500/10 text-emerald-600 font-label-sm text-xs px-2.5 py-1 rounded-full font-semibold">In Stock</span>
                <span className="text-on-surface-variant text-xs">SKU: {product.slug.toUpperCase().slice(0, 12)}</span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                {product.name}
              </h1>
              <p className="text-on-surface-variant font-body-lg text-base border-l-2 border-outline-variant pl-4 mb-6">
                {product.shortDescription}
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                <div key={key}>
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">{key}</span>
                  <p className="text-on-surface font-bold text-sm mt-1">{value}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8 pb-8 border-b border-outline-variant/30">
              <Link href={`/contact?product=${product.slug}`}>
                <Button className="w-full bg-[#F97316] text-white hover:bg-orange-600 h-12 text-sm font-semibold rounded-lg shadow-sm">
                  Request Quote
                </Button>
              </Link>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full border-[#0b1f33] text-[#0b1f33] hover:bg-[#0b1f33]/5 h-12 text-sm font-semibold rounded-lg">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Enquiry
                </Button>
              </a>
              {product.brochureUrl && (
                <a href={product.brochureUrl} download>
                  <Button variant="outline" className="w-full h-12 text-sm font-semibold rounded-lg">
                    <Download className="w-4 h-4 mr-2" /> Download Brochure (PDF)
                  </Button>
                </a>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>3-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-primary" />
                <span>Free Installation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-white border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Tab Navigation */}
          <div className="flex gap-0 border-b border-outline-variant/30 mb-10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold transition-colors whitespace-nowrap relative ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              {activeTab === 'Overview' && (
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-primary mb-6">Precision Engineering for High Volume</h3>
                  <p className="text-on-surface-variant leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-[#F97316]" />
                          <span className="font-semibold text-sm text-on-surface">{feature.split(' ').slice(0, 3).join(' ')}</span>
                        </div>
                        <p className="text-on-surface-variant text-xs leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Specifications' && (
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-primary mb-6">Technical Specifications</h3>
                  <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-xs">
                    <table className="w-full text-left font-body-md text-sm">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                            <th className="py-3 px-4 font-semibold text-primary w-1/3 border-r border-outline-variant/20 uppercase text-xs tracking-wider">{key}</th>
                            <td className="py-3 px-4 text-on-surface-variant">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'Applications' && (
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-primary mb-6">Ideal Applications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.applications.map((app, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-lg border border-outline-variant/20">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-on-surface text-sm font-medium">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Features' && (
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-primary mb-6">Key Features</h3>
                  <ul className="space-y-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mr-3 mt-0.5" />
                        <span className="text-on-surface-variant text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'Downloads' && (
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-primary mb-6">Downloads</h3>
                  {product.brochureUrl ? (
                    <a href={product.brochureUrl} download className="flex items-center gap-4 p-5 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-on-surface">Product Specifications Sheet</p>
                        <p className="text-xs text-on-surface-variant">PDF Document</p>
                      </div>
                      <Download className="w-5 h-5 text-on-surface-variant ml-auto" />
                    </a>
                  ) : (
                    <p className="text-on-surface-variant text-sm">No downloadable resources available for this product.</p>
                  )}
                </div>
              )}
            </div>

            {/* Right: Tech Specs Sidebar */}
            {activeTab === 'Overview' && (
              <div className="lg:col-span-4">
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 sticky top-32">
                  <h4 className="font-heading font-bold text-base text-primary mb-4 flex items-center gap-2">
                    <span className="text-lg">⚙</span> Tech Specs
                  </h4>
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], idx) => (
                        <tr key={key}>
                          <th className="py-2.5 font-semibold text-on-surface-variant uppercase tracking-wider text-[10px] w-2/5">{key}</th>
                          <td className="py-2.5 text-on-surface font-medium">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-[#F8FAFC] border-t border-outline-variant/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-heading text-2xl font-extrabold text-primary mb-10 text-center">Related Equipment Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
