import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MessageCircle, FileText, CheckCircle2, Award, Zap, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data/mock';
import { ProductCard } from '@/components/ui/ProductCard';
import { COMPANY_DETAILS } from '@/lib/constants/company';

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
          {/* Main Image View */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-[#F8FAFC] border border-outline-variant/30 rounded-xl p-6 h-[400px] md:h-[500px] flex items-center justify-center relative overflow-hidden group">
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary font-label-sm text-xs px-3 py-1 rounded border border-outline-variant/40 flex items-center gap-1 font-semibold">
                <Award className="w-3.5 h-3.5 text-primary" /> Premium Series
              </span>
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-6">
              <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-widest font-bold mb-2 block">
                {product.categoryName}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">
                {product.name}
              </h1>
              <p className="text-on-surface-variant font-body-lg text-base border-l-2 border-outline-variant pl-4 mb-6">
                {product.shortDescription}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-outline-variant/30">
              <Link href={`/contact?product=${product.slug}`} className="flex-1 min-w-[160px]">
                <Button className="w-full bg-[#F97316] text-white hover:bg-orange-600 h-12 text-sm font-semibold">
                  Request Quote
                </Button>
              </Link>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px]"
              >
                <Button variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 h-12 text-sm font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Enquiry
                </Button>
              </a>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="font-heading font-bold text-base text-primary mb-4 uppercase tracking-wider">Technical Specifications</h3>
              <div className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-xs">
                <table className="w-full text-left font-body-md text-xs md:text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                        <th className="py-3 px-4 font-semibold text-primary w-1/3 border-r border-outline-variant/20">{key}</th>
                        <td className="py-3 px-4 text-on-surface-variant">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Download Brochure */}
            {product.brochureUrl && (
              <a href={product.brochureUrl} download className="w-fit">
                <Button variant="outline" className="h-10 border-primary text-primary text-xs">
                  <FileText className="w-4 h-4 mr-2" /> Download Product Specifications Sheet
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 bg-white border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-heading font-bold text-lg text-primary mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F97316]" /> Key Engineering Features
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mr-3 mt-0.5" />
                    <span className="text-on-surface-variant font-body-md text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-primary mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F97316]" /> Commercial Benefits
              </h3>
              <ul className="space-y-4">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mr-3 mt-0.5" />
                    <span className="text-on-surface-variant font-body-md text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
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
