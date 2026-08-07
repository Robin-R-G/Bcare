'use client';

import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { products, categories } from '@/lib/data/catalogue';

// Real BCare equipment photography migrated from the IndiaMART photo gallery.
const galleryImages = products.flatMap((product) =>
  product.images.map((src, i) => ({
    id: `${product.slug}-${i}`,
    src,
    alt: product.product_images?.[i]?.alt_text ?? product.name,
    category: product.categoryName,
    productName: product.name,
    slug: product.slug,
  }))
);

const filters = ['All Photos', ...categories.map((c) => c.name)];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All Photos');

  const visible = useMemo(
    () =>
      activeFilter === 'All Photos'
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeFilter),
    [activeFilter]
  );

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-outline-variant/30 py-16 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-primary mb-4">Equipment Gallery</h1>
          <p className="text-on-surface-variant text-lg">
            {galleryImages.length} photographs of the EUROPYA and BCARE machines we manufacture and
            supply from Nadathara, Thrissur.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-3 py-8 px-margin-mobile md:px-margin-desktop border-b border-outline-variant/20">
        {filters.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-sm font-medium px-5 py-2.5 rounded-md transition-all ${
              activeFilter === tab
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-transparent border border-outline-variant text-on-surface-variant hover:border-on-surface hover:text-on-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index, 8) * 0.05 }}
              className="group relative rounded-xl overflow-hidden border border-outline-variant/30 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <Link href={`/products/${img.slug}`}>
                <div className="aspect-[4/3] overflow-hidden bg-surface-container-low">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-on-surface/80 text-white font-semibold text-[11px] px-2.5 py-1 rounded uppercase tracking-wider">
                    {img.category}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-semibold">{img.productName}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
