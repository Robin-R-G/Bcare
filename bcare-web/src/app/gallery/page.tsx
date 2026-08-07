'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop', alt: 'Commercial kitchen setup', category: 'Kitchen' },
  { id: 2, src: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop', alt: 'Hotel kitchen installation', category: 'Hotel' },
  { id: 3, src: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5d6?q=80&w=1200&auto=format&fit=crop', alt: 'Bakery equipment', category: 'Bakery' },
  { id: 4, src: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop', alt: 'Restaurant kitchen', category: 'Restaurant' },
  { id: 5, src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop', alt: 'SS fabrication workshop', category: 'Fabrication' },
  { id: 6, src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop', alt: 'Refrigeration units', category: 'Refrigeration' },
  { id: 7, src: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop', alt: 'Industrial kitchen', category: 'Kitchen' },
  { id: 8, src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop', alt: 'Bakery production', category: 'Bakery' },
  { id: 9, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop', alt: 'Hospital kitchen', category: 'Hospital' },
];

export default function GalleryPage() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-outline-variant/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">Project Gallery</h1>
          <p className="text-on-surface-variant text-lg">
            A visual showcase of our completed kitchen installations, bakery setups, and custom fabrication projects across Kerala.
          </p>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-xl overflow-hidden border border-outline-variant/30 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-3 left-3">
                <span className="bg-on-surface/80 text-white font-semibold text-[11px] px-2.5 py-1 rounded uppercase tracking-wider">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
