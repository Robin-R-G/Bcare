import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { 
  ChefHat, Utensils, Snowflake, Layers, Cpu, 
  Ruler, Wrench, Award, Headset, MapPin, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center bg-surface-container-lowest overflow-hidden border-b border-outline-variant/30">
        <div className="absolute inset-0 z-0">
          <div 
            className="bg-cover bg-center w-full h-full opacity-25" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full py-section-padding">
          <div className="max-w-3xl">
            <span className="bg-primary/10 text-primary font-label-sm text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6">
              <ShieldCheck className="w-4 h-4 text-primary" /> Verified Commercial Kitchen Manufacturer
            </span>

            <h1 className="font-display-lg text-display-lg text-primary mb-6">
              Complete Commercial Kitchen &amp; Bakery Solutions
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
              From meticulous planning and precision manufacturing to flawless installation and dedicated after-sales support. We engineer heavy-duty elegance for the modern culinary industry.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="bg-[#F97316] text-white px-8 py-6 rounded font-label-sm text-label-sm shadow-ambient hover:shadow-ambient-hover hover:bg-orange-600 transition-all duration-300">
                  Request Quote
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-[1.5px] border-steel-silver text-on-surface px-8 py-6 rounded font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-300">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-primary-container text-on-primary border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/30 text-center">
            <div>
              <div className="font-headline-lg text-headline-lg mb-1 text-white">4.8+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Google Ratings</div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg mb-1 text-white">500+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Projects Delivered</div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg mb-1 text-white">15+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Years Experience</div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg mb-1 text-white">200+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Premium Equipment Items</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-section-padding bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary mb-4">Featured Categories</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Explore our comprehensive range of heavy-duty, professional-grade equipment engineered in Thrissur, Kerala.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Link href="/products?category=bakery-equipment">
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint group">
                <ChefHat className="w-12 h-12 text-surface-tint mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-title-md text-title-md text-on-surface">Bakery</h3>
              </div>
            </Link>

            <Link href="/products?category=commercial-kitchen-equipment">
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint group">
                <Utensils className="w-12 h-12 text-surface-tint mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-title-md text-title-md text-on-surface">Kitchen</h3>
              </div>
            </Link>

            <Link href="/products?category=refrigeration-equipment">
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint group">
                <Snowflake className="w-12 h-12 text-surface-tint mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-title-md text-title-md text-on-surface">Refrigeration</h3>
              </div>
            </Link>

            <Link href="/products?category=display-counters">
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint group">
                <Layers className="w-12 h-12 text-surface-tint mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-title-md text-title-md text-on-surface">Display Counters</h3>
              </div>
            </Link>

            <Link href="/products?category=ss-fabrication">
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint group">
                <Cpu className="w-12 h-12 text-surface-tint mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-title-md text-title-md text-on-surface">SS Fabrication</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Verified Location Banner */}
      <section className="bg-surface-container-high py-12 border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-title-md font-bold text-primary">{COMPANY_DETAILS.name}</h3>
              <p className="text-on-surface-variant text-sm">{COMPANY_DETAILS.positioningText}</p>
            </div>
          </div>
          <Link href="/locations/thrissur">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white gap-2 font-semibold shrink-0">
              Visit Thrissur HQ Page <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-section-padding bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary mb-4">Why Choose BCare</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Uncompromising quality and end-to-end service for the most demanding culinary environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline-variant/30">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Kitchen Solutions</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Customized layout planning for optimal workflow and spatial efficiency.</p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline-variant/30">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Expert Engineers</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Highly trained technicians ensuring precision installation and maintenance.</p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline-variant/30">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Quality Manufacturing</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Using highest grade stainless steel 304 for durability and hygiene compliance.</p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline-variant/30">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <Headset className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Dedicated Support</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Rapid local technical service across Kerala to minimize equipment downtime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
