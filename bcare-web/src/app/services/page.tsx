'use client';

import { motion } from 'framer-motion';
import { PenTool, Ruler, Factory, Wrench, Settings, FileCheck, Hammer, MessageSquareHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    title: 'Kitchen Planning',
    description: 'Strategic layout optimization to maximize efficiency and workflow for high-volume commercial kitchens.',
    icon: <Ruler className="w-8 h-8" />,
  },
  {
    title: 'Kitchen Design',
    description: 'Detailed CAD designs and 3D modeling ensuring every equipment fits perfectly and meets hygiene standards.',
    icon: <PenTool className="w-8 h-8" />,
  },
  {
    title: 'Manufacturing',
    description: 'In-house custom fabrication using premium stainless steel for unparalleled durability.',
    icon: <Factory className="w-8 h-8" />,
  },
  {
    title: 'Installation',
    description: 'Professional setup and commissioning by expert technicians, ensuring minimal downtime.',
    icon: <Wrench className="w-8 h-8" />,
  },
  {
    title: 'Maintenance',
    description: 'Regular servicing schedules to keep your equipment running at peak performance year-round.',
    icon: <Settings className="w-8 h-8" />,
  },
  {
    title: 'AMC (Annual Maintenance Contract)',
    description: 'Comprehensive coverage plans protecting your investment with priority support.',
    icon: <FileCheck className="w-8 h-8" />,
  },
  {
    title: 'Repairs',
    description: 'Swift and reliable repair services utilizing genuine spare parts for commercial equipment.',
    icon: <Hammer className="w-8 h-8" />,
  },
  {
    title: 'Consultation',
    description: 'Expert advice on equipment selection, regulatory compliance, and operational scale-up.',
    icon: <MessageSquareHeart className="w-8 h-8" />,
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-surface-container-low py-20 border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-display-lg text-display-lg text-primary mb-6">Our Services</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Comprehensive end-to-end solutions for the modern culinary industry. We support your business from the initial blueprint to daily operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient hover:shadow-ambient-hover hover:-translate-y-1 transition-all border border-transparent hover:border-surface-tint"
              >
                <div className="w-16 h-16 bg-surface-container text-surface-tint rounded-full flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-3">{service.title}</h3>
                <p className="text-on-surface-variant font-body-md text-body-md">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-padding bg-primary-container text-on-primary text-center">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-xl text-headline-xl mb-6">Ready to Upgrade Your Kitchen?</h2>
          <p className="font-body-lg text-body-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Contact our engineering team today for a free consultation and discover how we can optimize your culinary operations.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#F97316] text-white hover:bg-orange-600 font-label-sm h-14 px-8 rounded shadow-ambient">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
