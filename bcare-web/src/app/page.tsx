import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChefHat, UtensilsCrossed, Snowflake, Construction, HardHat, Cog, ShieldCheck, HeadphonesIcon } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center bg-surface-container-lowest overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="bg-cover bg-center w-full h-full opacity-30" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=2564&auto=format&fit=crop')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full py-section-padding">
          <div className="max-w-3xl">
            <h1 className="font-display-lg text-display-lg text-primary mb-6 leading-tight">
              Complete Commercial Kitchen & Bakery Solutions
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
              From meticulous planning and precision manufacturing to flawless installation and dedicated after-sales support. We engineer heavy-duty elegance for the modern culinary industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#F97316] text-white hover:bg-orange-600 font-label-sm h-14 px-8 rounded shadow-ambient hover:shadow-ambient-hover transition-all duration-300">
                Request Quote
              </Button>
              <Button size="lg" variant="outline" className="border-[1.5px] border-steel-silver text-on-surface hover:bg-surface-container transition-colors duration-300 font-label-sm h-14 px-8 rounded">
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-primary-container text-on-primary border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/30 text-center">
            <div>
              <div className="font-headline-lg text-headline-lg mb-1">4.8+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Google Reviews</div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg mb-1">500+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Projects Delivered</div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg mb-1">15+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Years Experience</div>
            </div>
            <div>
              <div className="font-headline-lg text-headline-lg mb-1">200+</div>
              <div className="font-label-sm text-label-sm text-primary-fixed-dim">Premium Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-section-padding bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary mb-4">Featured Categories</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Explore our comprehensive range of heavy-duty, professional-grade equipment.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint flex flex-col items-center">
              <ChefHat className="w-12 h-12 text-surface-tint mb-4" />
              <h3 className="font-title-md text-title-md text-on-surface">Bakery</h3>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint flex flex-col items-center">
              <UtensilsCrossed className="w-12 h-12 text-surface-tint mb-4" />
              <h3 className="font-title-md text-title-md text-on-surface">Kitchen</h3>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint flex flex-col items-center">
              <Snowflake className="w-12 h-12 text-surface-tint mb-4" />
              <h3 className="font-title-md text-title-md text-on-surface">Refrigeration</h3>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint flex flex-col items-center">
              <ChefHat className="w-12 h-12 text-surface-tint mb-4" />
              <h3 className="font-title-md text-title-md text-on-surface">Counters</h3>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-6 text-center shadow-ambient hover:-translate-y-1 hover:shadow-ambient-hover transition-all cursor-pointer border border-transparent hover:border-surface-tint flex flex-col items-center">
              <Construction className="w-12 h-12 text-surface-tint mb-4" />
              <h3 className="font-title-md text-title-md text-on-surface">SS Fabrication</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-section-padding bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary mb-4">Why Choose BCare</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Uncompromising quality and end-to-end service for the most demanding culinary environments.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Kitchen Solutions</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Customized layout planning for optimal workflow and spatial efficiency.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <Cog className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Expert Engineers</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Highly trained technicians ensuring precision installation and maintenance.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">Quality Manufacturing</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Using highest grade stainless steel for durability and hygiene compliance.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-6 h-6" />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-2">24/7 Support</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Dedicated after-sales service to minimize equipment downtime.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
