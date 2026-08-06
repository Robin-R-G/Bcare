import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data/mock';
import { ProductCard } from '@/components/ui/ProductCard';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.relatedProductIds 
    ? products.filter(p => product.relatedProductIds?.includes(p.id))
    : [];

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-surface-container-low border-b border-outline-variant py-4">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center text-sm font-label-sm text-on-surface-variant">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-on-surface">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Gallery (Simplified for mock) */}
            <div className="space-y-4">
              <div className="aspect-square bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-ambient">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1).map((img, idx) => (
                    <div key={idx} className="aspect-square bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/30 opacity-70 hover:opacity-100 cursor-pointer transition-opacity">
                      <img src={img} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="text-surface-tint font-label-sm uppercase tracking-wider mb-2 block">{product.categoryName}</span>
                <h1 className="font-headline-lg text-headline-lg text-primary mb-4">{product.name}</h1>
                <p className="text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-outline-variant/30">
                <Link href={`/contact?product=${product.slug}`} className="flex-1 min-w-[200px]">
                  <Button size="lg" className="w-full bg-[#F97316] text-white hover:bg-orange-600 h-14 text-base">
                    Request Formal Quote
                  </Button>
                </Link>
                <Link href={`https://wa.me/yourwhatsappnumber?text=Hi, I want a quote for ${product.name}`} target="_blank" className="flex-1 min-w-[200px]">
                  <Button size="lg" variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 h-14 text-base">
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Enquiry
                  </Button>
                </Link>
              </div>

              {/* Specifications */}
              <div className="mb-10">
                <h3 className="font-title-md text-title-md text-on-surface mb-4">Technical Specifications</h3>
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden">
                  <table className="w-full text-left font-body-md text-body-md">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-surface-container-low/50' : 'bg-surface-container-lowest'}>
                          <th className="py-3 px-4 font-semibold text-on-surface w-1/3 border-r border-outline-variant/20">{key}</th>
                          <td className="py-3 px-4 text-on-surface-variant">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Brochure Download */}
              <Button variant="outline" className="w-fit">
                <Download className="w-4 h-4 mr-2" /> Download Product Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-title-md text-title-md text-primary mb-6">Key Features</h3>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-surface-tint shrink-0 mr-3 mt-0.5" />
                    <span className="text-on-surface-variant font-body-md">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-primary mb-6">Business Benefits</h3>
              <ul className="space-y-4">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-surface-tint shrink-0 mr-3 mt-0.5" />
                    <span className="text-on-surface-variant font-body-md">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h3 className="font-title-md text-title-md text-primary mb-8">Ideal For Applications In</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {product.applications.map((app, idx) => (
              <span key={idx} className="px-6 py-3 bg-surface-container rounded-full text-on-surface font-label-sm border border-outline-variant/50 shadow-sm">
                {app}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-section-padding bg-surface-container-low border-t border-outline-variant/30">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-10 text-center">Related Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
