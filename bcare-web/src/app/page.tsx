import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden">
      {/* Hero Section — full-width kitchen background with left-aligned text overlay */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop')` }}
        ></div>
        {/* Gradient overlay: solid from left, transparent toward right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f33]/90 via-[#0b1f33]/60 to-transparent"></div>

        <div className="relative z-10 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
          <div className="max-w-xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] lg:leading-[64px] font-extrabold text-white tracking-tight mb-6">
              Complete Bakery &amp; Commercial Kitchen Solutions
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-md">
              Precision engineered equipment for professional chefs and B2B procurement. Built to last, designed for ultimate performance.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button className="bg-[#F97316] text-white font-semibold text-sm px-7 py-5 rounded hover:bg-orange-600 transition-colors shadow-sm">
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-primary text-white font-semibold text-sm px-7 py-5 rounded hover:bg-primary-container transition-colors shadow-sm">
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statistics — 3-column centered cards */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center py-8 px-6 border border-outline-variant/30 rounded-lg">
            <span className="font-heading text-5xl font-extrabold text-on-surface mb-2">25+</span>
            <span className="text-xs text-on-surface-variant uppercase tracking-[0.15em] font-semibold">Years Experience</span>
          </div>

          <div className="flex flex-col items-center py-8 px-6 border border-outline-variant/30 rounded-lg">
            <span className="font-heading text-5xl font-extrabold text-on-surface mb-2">10k+</span>
            <span className="text-xs text-on-surface-variant uppercase tracking-[0.15em] font-semibold">Products Delivered</span>
          </div>

          <div className="flex flex-col items-center py-8 px-6 border border-outline-variant/30 rounded-lg">
            <span className="font-heading text-5xl font-extrabold text-on-surface mb-2">500+</span>
            <span className="text-xs text-on-surface-variant uppercase tracking-[0.15em] font-semibold">Projects Completed</span>
          </div>
        </div>
      </section>
    </div>
  );
}
