'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants/company';

const videos = [
  {
    title: 'EUROPYA Dough Sheeter — Commercial Operation',
    description: 'Watch the EUROPYA Dough Sheeter in action, laminating dough sheets for croissant and puff pastry production.',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    youtubeId: null,
    link: `${COMPANY_DETAILS.socialMedia.indiamart}videos.html`,
  },
  {
    title: 'EUROPYA 7 LTR Fresh Cream Mixer',
    description: 'See the compact fresh cream mixer whipping cream and meringue for pastry applications.',
    thumbnail: 'https://images.unsplash.com/photo-1621252178553-6a37829871db?q=80&w=800&auto=format&fit=crop',
    youtubeId: null,
    link: `${COMPANY_DETAILS.socialMedia.indiamart}videos.html`,
  },
  {
    title: 'EUROPYA 1 Deck 1 Tray Gas Oven',
    description: 'Compact single-deck gas oven demonstration for small bakeries and cafes.',
    thumbnail: 'https://images.unsplash.com/photo-1584285418504-0359837267eb?q=80&w=800&auto=format&fit=crop',
    youtubeId: null,
    link: `${COMPANY_DETAILS.socialMedia.indiamart}videos.html`,
  },
  {
    title: 'BCare Kitchen Installation — Grand Hyatt Kochi',
    description: 'Complete turnkey kitchen installation at Grand Hyatt Kochi, featuring custom SS fabrication and high-end equipment.',
    thumbnail: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=800&auto=format&fit=crop',
    youtubeId: null,
    link: `${COMPANY_DETAILS.socialMedia.indiamart}videos.html`,
  },
];

export default function VideosPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#94A3B8]/30 py-16">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Watch</span>
          <h1 className="font-heading text-4xl font-extrabold text-[#0b1f33] mb-4">Product Videos</h1>
          <p className="text-[#44474c] text-lg">See our equipment in action. Watch product demonstrations, installations, and kitchen setups.</p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="relative h-64 bg-[#F8FAFC] overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#0b1f33]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={video.link} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white hover:bg-[#F97316]/90 transition-colors">
                      <Play className="w-7 h-7 ml-1" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-[#0b1f33] mb-2 group-hover:text-[#F97316] transition-colors">{video.title}</h3>
                  <p className="text-[#44474c] text-sm leading-relaxed mb-4">{video.description}</p>
                  <a href={video.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:underline">
                    Watch on IndiaMART <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-[#44474c] mb-4">Want to see more product demonstrations?</p>
            <a
              href={COMPANY_DETAILS.socialMedia.indiamart}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#F97316]/90 transition-colors"
            >
              Visit Our IndiaMART Store <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
