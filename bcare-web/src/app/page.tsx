import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts, getCategories, getGoogleReviews } from '@/lib/supabase/queries';
import { Ruler, Wrench, ShieldCheck, Headset, CheckCircle2, ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import { GoogleReviewCard } from '@/components/ui/GoogleReviewCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { asset } from '@/lib/utils';

const features = [
  { title: 'Kitchen Solutions', desc: 'Customized layout planning for optimal workflow and spatial efficiency.', Icon: Ruler },
  { title: 'Expert Engineers', desc: 'Highly trained technicians ensuring precision installation and maintenance.', Icon: Wrench },
  { title: 'Quality Manufacturing', desc: 'Using highest grade stainless steel for durability and hygiene compliance.', Icon: ShieldCheck },
  { title: 'After-Sales Support', desc: 'On-site service across Kerala, Monday to Saturday, to minimise equipment downtime.', Icon: Headset },
];

const industries = [
  'Commercial Bakeries', 'Hotels & Resorts', 'Restaurants', 'Cloud Kitchens',
  'Hospitals', 'Catering Services', 'Pastry Shops', 'Food Production',
];

const whyChooseUs = [
  'Established in 2010 — 15+ years of trust',
  'GST verified supplier',
  'In-house manufacturing & quality control',
  'EUROPYA and BCARE trusted brands',
  '1 year warranty on equipment',
  'Comprehensive after-sales support',
];

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getGoogleReviews(),
  ]);

  const featuredProducts = products.filter(p => p.badge === 'BCARE' || p.price).slice(0, 4);
  const visibleReviews = reviews.filter(r => r.isVisible);
  const featuredReviews = visibleReviews.filter(r => r.isFeatured).slice(0, 3);

  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${asset('/products/europya-3-deck-9-tray-automatic-gas-oven/main.webp')}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f33]/95 via-[#0b1f33]/70 to-transparent"></div>

        <div className="relative z-10 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
          <div className="max-w-xl">
            <span className="inline-block text-[#F97316] text-xs font-semibold uppercase tracking-[0.2em] mb-4">Since 2010 — Thrissur, Kerala</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] lg:leading-[64px] font-extrabold text-white tracking-tight mb-6">
              Complete Bakery &amp; Commercial Kitchen Solutions
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-lg">
              Premium EUROPYA and BCARE brand equipment for professional chefs, bakeries, and B2B procurement. Built to last, designed for ultimate performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button className="bg-[#F97316] text-white font-semibold text-sm px-8 py-5 rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                  Explore Products
                </Button>
              </Link>
              <a href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${encodeURIComponent('Hello BCare Bakery & Kitchen Equipments,\n\nI would like to discuss my commercial bakery / kitchen equipment requirements.\n\nThank you.')}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-white/10 text-white font-semibold text-sm px-8 py-5 rounded-lg hover:bg-white/20 transition-all border border-white/20">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statistics */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-white border-y border-[#94A3B8]/30">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { number: '15+', label: 'Years Experience' },
            { number: `${products.length}`, label: 'Equipment Models' },
            { number: '2', label: 'In-House Brands' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-8 px-6 border border-[#94A3B8]/30 rounded-lg hover:shadow-md transition-all">
              <span className="font-heading text-5xl font-extrabold text-[#0b1f33] mb-2">{stat.number}</span>
              <span className="text-xs text-[#44474c] uppercase tracking-[0.15em] font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Our Expertise</span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0b1f33] mb-4">Product Categories</h2>
            <p className="text-[#44474c] text-lg max-w-2xl mx-auto">Explore our comprehensive range of heavy-duty, professional-grade bakery and kitchen equipment.</p>
          </div>
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((cat) => (
                <Link key={cat.id} href="/products">
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#94A3B8]/20 hover:border-[#F97316]/40 group">
                    <div className="w-16 h-16 bg-[#0b1f33]/5 text-[#0b1f33] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0b1f33] group-hover:text-white transition-all duration-300">
                      <CategoryIcon categoryName={cat.name} className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-heading font-bold text-sm text-[#0b1f33] group-hover:text-[#F97316] transition-colors">{cat.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#94A3B8]">Categories coming soon.</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#F8FAFC] border-y border-[#94A3B8]/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Featured</span>
              <h2 className="font-heading text-3xl font-extrabold text-[#0b1f33]">Featured Products</h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:underline">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => {
                const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
                return (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <div className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                      <div className="h-48 bg-[#F8FAFC] flex items-center justify-center p-4 overflow-hidden">
                        <ProductImageWithFallback src={product.featured_image || product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">{product.categoryName}</span>
                        <h3 className="font-heading font-bold text-sm text-[#0b1f33] mt-1 line-clamp-2 group-hover:text-[#F97316] transition-colors">{product.name}</h3>
                        <div className="mt-2">
                          {product.priceOnRequest ? (
                            <span className="text-xs font-semibold text-[#F97316]">Price on Request</span>
                          ) : (
                            <span className="text-sm font-extrabold text-[#0b1f33]">{formatPrice(product.price!)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-[#94A3B8] py-10">Products coming soon.</p>
          )}
          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="border-[#0b1f33] text-[#0b1f33] font-semibold">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Industries</span>
            <h2 className="font-heading text-3xl font-extrabold text-[#0b1f33] mb-4">Industries We Serve</h2>
            <p className="text-[#44474c] text-lg max-w-2xl mx-auto">Our equipment powers kitchens across a wide range of commercial food service industries.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div key={industry} className="bg-white border border-[#94A3B8]/30 rounded-lg p-5 text-center hover:border-[#F97316]/40 hover:shadow-sm transition-all">
                <span className="text-sm font-semibold text-[#0b1f33]">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BCare */}
      <section className="py-20 bg-[#0b1f33]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Why BCare</span>
              <h2 className="font-heading text-3xl font-extrabold text-white mb-6">Engineered for Excellence</h2>
              <p className="text-white/60 text-lg mb-8">Uncompromising quality and end-to-end service for the most demanding culinary environments.</p>
              <ul className="space-y-3">
                {whyChooseUs.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all group">
                  <item.Icon className="w-8 h-8 text-[#F97316] mb-3" />
                  <h3 className="font-heading font-bold text-sm text-white mb-1">{item.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Testimonials</span>
            <h2 className="font-heading text-3xl font-extrabold text-[#0b1f33] mb-4">Trusted by Our Customers</h2>
            {visibleReviews.length > 0 && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F97316] text-[#F97316]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#0b1f33]">
                  {(visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length).toFixed(1)}
                </span>
                <span className="text-sm text-[#94A3B8]">({visibleReviews.length} reviews)</span>
              </div>
            )}
            <p className="text-[#44474c] text-lg max-w-2xl mx-auto">Real experiences from businesses that rely on BCare equipment every day.</p>
          </div>
          {featuredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredReviews.map((review) => (
                <GoogleReviewCard key={review.id} review={review} variant="compact" />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#94A3B8]">No reviews yet.</p>
          )}
          <div className="mt-8 text-center">
            <Link href="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:underline">
              View All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#94A3B8]/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0b1f33] mb-4">Ready to Build Your Kitchen?</h2>
          <p className="text-[#44474c] text-lg mb-10 max-w-2xl mx-auto">
            Get a custom consultation and equipment proposal tailored to your exact facility requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-[#F97316] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#F97316]/90 transition-all shadow-lg shadow-orange-500/20">
                Request Free Consultation
              </Button>
            </Link>
            <a href="https://maps.app.goo.gl/bcare" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[#0b1f33] text-[#0b1f33] font-semibold px-8 py-4 rounded-lg hover:bg-[#0b1f33]/5">
                <MapPin className="w-4 h-4 mr-2" /> Visit Our Location
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
