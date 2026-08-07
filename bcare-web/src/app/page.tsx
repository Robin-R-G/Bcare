import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data/mock';
import { Ruler, Wrench, ShieldCheck, Headset } from 'lucide-react';

const features = [
  { title: 'Kitchen Solutions', desc: 'Customized layout planning for optimal workflow and spatial efficiency.', Icon: Ruler },
  { title: 'Expert Engineers', desc: 'Highly trained technicians ensuring precision installation and maintenance.', Icon: Wrench },
  { title: 'Quality Manufacturing', desc: 'Using highest grade stainless steel for durability and hygiene compliance.', Icon: ShieldCheck },
  { title: '24/7 Support', desc: 'Dedicated after-sales service to minimize equipment downtime.', Icon: Headset },
];

export default function HomePage() {
  return (
    <div className="bg-background text-on-background antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f33]/95 via-[#0b1f33]/70 to-transparent"></div>

        <div className="relative z-10 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop">
          <div className="max-w-xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] lg:leading-[64px] font-extrabold text-white tracking-tight mb-6">
              Complete Bakery &amp; Commercial Kitchen Solutions
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-lg">
              Precision engineered equipment for professional chefs and B2B procurement. Built to last, designed for ultimate performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button className="bg-[#F97316] text-white font-semibold text-sm px-8 py-5 rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-[#0b1f33] text-white font-semibold text-sm px-8 py-5 rounded-lg hover:bg-[#0a1825] transition-all border border-white/10">
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statistics — 3 columns as per target design */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-white border-y border-outline-variant/30">
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

      {/* Featured Categories */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Our Expertise</span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">Featured Categories</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Explore our comprehensive range of heavy-duty, professional-grade equipment.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href="/products">
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-outline-variant/20 hover:border-primary/30 group">
                  <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="text-2xl font-bold">{cat.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BCare */}
      <section className="py-section-padding bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Why BCare</span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary mb-4">Engineered for Excellence</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Uncompromising quality and end-to-end service for the most demanding culinary environments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/10 group">
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <item.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-padding bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F97316] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4">Ready to Build Your Kitchen?</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Get a custom consultation and equipment proposal tailored to your exact facility requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-[#F97316] text-white font-semibold px-8 py-4 rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                Request Free Consultation
              </Button>
            </Link>
            <Link href="/kitchen-solution-builder">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg">
                Kitchen Builder Wizard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
