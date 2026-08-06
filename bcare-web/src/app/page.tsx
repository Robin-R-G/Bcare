import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { 
  ChefHat, Utensils, Snowflake, Layers, Cpu, 
  Ruler, Wrench, Award, Headset, MapPin, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-outline-variant/30">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent"></div>

        <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-gutter py-12">
          <div className="flex flex-col gap-4">
            <span className="bg-primary/10 text-primary font-label-sm text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 w-fit">
              <ShieldCheck className="w-4 h-4 text-primary" /> Verified Commercial Equipment Manufacturer
            </span>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] lg:leading-[64px] font-extrabold text-primary tracking-tight">
              Complete Bakery &amp; Commercial Kitchen Solutions
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Precision engineered equipment for professional chefs and B2B procurement. Built to last, designed for ultimate culinary performance.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/products">
                <Button className="bg-[#F97316] text-white font-label-md text-sm px-7 py-6 rounded-md hover:bg-orange-600 transition-colors shadow-sm font-semibold">
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-primary text-white font-label-md text-sm px-7 py-6 rounded-md hover:bg-primary-container transition-colors shadow-sm font-semibold">
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statistics */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
          <div className="flex flex-col gap-2 items-center p-6 bg-white border border-outline-variant/30 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <span className="font-heading text-4xl font-extrabold text-primary">15+</span>
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Years Experience</span>
          </div>

          <div className="flex flex-col gap-2 items-center p-6 bg-white border border-outline-variant/30 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <span className="font-heading text-4xl font-extrabold text-primary">10k+</span>
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Equipment Machines Delivered</span>
          </div>

          <div className="flex flex-col gap-2 items-center p-6 bg-white border border-outline-variant/30 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <span className="font-heading text-4xl font-extrabold text-primary">500+</span>
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Kitchen Projects Completed</span>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-background">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-3">Featured Equipment Categories</h2>
            <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">
              Heavy-duty stainless steel machinery designed for commercial bakeries, hotels, restaurants, and cloud kitchens.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Link href="/products?category=bakery-equipment">
              <div className="bg-white rounded-xl p-6 text-center border border-outline-variant/30 shadow-sm hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group">
                <ChefHat className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-on-surface text-base">Bakery Equipment</h3>
              </div>
            </Link>

            <Link href="/products?category=commercial-kitchen-equipment">
              <div className="bg-white rounded-xl p-6 text-center border border-outline-variant/30 shadow-sm hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group">
                <Utensils className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-on-surface text-base">Kitchen Ranges</h3>
              </div>
            </Link>

            <Link href="/products?category=refrigeration-equipment">
              <div className="bg-white rounded-xl p-6 text-center border border-outline-variant/30 shadow-sm hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group">
                <Snowflake className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-on-surface text-base">Refrigeration</h3>
              </div>
            </Link>

            <Link href="/products?category=display-counters">
              <div className="bg-white rounded-xl p-6 text-center border border-outline-variant/30 shadow-sm hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group">
                <Layers className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-on-surface text-base">Display Counters</h3>
              </div>
            </Link>

            <Link href="/products?category=ss-fabrication">
              <div className="bg-white rounded-xl p-6 text-center border border-outline-variant/30 shadow-sm hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group">
                <Cpu className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-on-surface text-base">SS Fabrication</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Verified Single Location Banner */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F97316] text-white flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white">{COMPANY_DETAILS.name}</h3>
              <p className="text-white/80 text-sm mt-0.5">{COMPANY_DETAILS.positioningText}</p>
            </div>
          </div>
          <Link href="/locations/thrissur">
            <Button className="bg-white text-primary hover:bg-slate-100 font-bold gap-2 shrink-0 h-11 px-6">
              View Thrissur Headquarters <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Engineering Pillars */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-extrabold text-primary mb-3">Precision Engineering Standard</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              Heavy-duty durability, food grade 304 stainless steel fabrication, and seamless local service support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-on-surface text-lg mb-2">Layout Planning</h3>
              <p className="font-body-md text-on-surface-variant text-sm">Optimal workflow ergonomics designed for high-volume commercial kitchens.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-on-surface text-lg mb-2">Expert Fabrication</h3>
              <p className="font-body-md text-on-surface-variant text-sm">Custom stainless steel fabrication engineered to exact technical specs.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-on-surface text-lg mb-2">Food Grade SS 304</h3>
              <p className="font-body-md text-on-surface-variant text-sm">Hygienic, corrosion-resistant steel construction for commercial food safety.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Headset className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-on-surface text-lg mb-2">Dedicated Service</h3>
              <p className="font-body-md text-on-surface-variant text-sm">Prompt local technician support across Kerala to minimize operational downtime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
