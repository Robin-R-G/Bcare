'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { COMPANY_DETAILS } from '@/lib/constants/company';
import { videos } from '@/lib/data/catalogue';

export default function VideosPage() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-white border-b border-[#94A3B8]/30 py-16">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Watch</span>
          <h1 className="font-heading text-4xl font-extrabold text-[#0b1f33] mb-4">Product Videos</h1>
          <p className="text-[#44474c] text-lg">See BCare equipment running. Real demonstrations of the machines we supply.</p>
        </div>
      </section>

      <section className="py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="relative h-64 bg-[#0b1f33] overflow-hidden">
                  {playing === video.youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(video.youtubeId)}
                      aria-label={`Play ${video.title}`}
                      className="w-full h-full relative"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute inset-0 bg-[#0b1f33]/30 flex items-center justify-center">
                        <span className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center text-white shadow-lg">
                          <Play className="w-7 h-7 ml-1" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-[#0b1f33] mb-2">{video.title}</h3>
                  <p className="text-[#44474c] text-sm leading-relaxed mb-4">{video.description}</p>
                  <Link
                    href={`/products/${video.productSlug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:underline"
                  >
                    View product details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#44474c] mb-4">Want to see more product demonstrations?</p>
            <a
              href={`${COMPANY_DETAILS.socialMedia.indiamart}videos.html`}
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
