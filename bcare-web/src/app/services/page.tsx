import { ShieldCheck, Ruler, Wrench, Headset } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {
  const services = [
    {
      icon: Ruler,
      title: "Commercial Layout Planning",
      description: "Custom CAD layouts designing optimized workflow ergonomics and safety clearances for commercial kitchens.",
    },
    {
      icon: Wrench,
      title: "Stainless Steel Fabrication",
      description: "High-grade SS 304 custom work tables, sinks, racks, hoods, and trolleys manufactured to exact dimensions.",
    },
    {
      icon: ShieldCheck,
      title: "Equipment Installation",
      description: "On-site assembly, electrical connection checks, gas line verification, and initial calibration by experts.",
    },
    {
      icon: Headset,
      title: "After-Sales Maintenance",
      description: "Prompt technician support across Kerala to minimize kitchen downtime and ensure peak efficiency.",
    },
  ];

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header */}
      <section className="bg-white border-b border-outline-variant/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">
            Industrial Services &amp; Manufacturing
          </h1>
          <p className="font-body-lg text-secondary">
            From meticulous workflow planning to high-grade fabrication and after-sales support across Kerala.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-xl border border-outline-variant/30 shadow-sm flex gap-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary mb-2">{svc.title}</h3>
                  <p className="font-body-md text-on-surface-variant text-sm mb-4 leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-primary text-white rounded-xl p-8 text-center flex flex-col items-center max-w-2xl mx-auto">
          <h3 className="font-heading text-xl font-bold mb-2">Need a Custom Kitchen Layout?</h3>
          <p className="text-white/80 text-sm mb-6 max-w-md">
            Consult our engineers today for a complete layout diagram and customized equipment proposals.
          </p>
          <Link href="/kitchen-solution-builder">
            <Button className="bg-[#F97316] text-white hover:bg-orange-600 font-bold px-6 h-11">
              Start Kitchen Builder Wizard
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
