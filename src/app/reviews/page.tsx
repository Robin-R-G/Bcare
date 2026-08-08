'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Filter } from 'lucide-react';
import { googleReviews } from '@/lib/data/mock';
import { GoogleReviewCard } from '@/components/ui/GoogleReviewCard';
import { COMPANY_DETAILS } from '@/lib/constants/company';

const filters = [
  { value: 'all', label: 'All Reviews' },
  { value: '5', label: '5 Star' },
  { value: '4', label: '4 Star' },
  { value: 'recent', label: 'Recent' },
];

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleReviews = googleReviews.filter(r => r.isVisible);

  const filteredReviews = useMemo(() => {
    switch (activeFilter) {
      case '5':
        return visibleReviews.filter(r => r.rating === 5);
      case '4':
        return visibleReviews.filter(r => r.rating === 4);
      case 'recent':
        return [...visibleReviews].sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime());
      default:
        return visibleReviews;
    }
  }, [activeFilter, visibleReviews]);

  const avgRating = visibleReviews.length > 0
    ? (visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length).toFixed(1)
    : '0';

  const fiveStarCount = visibleReviews.filter(r => r.rating === 5).length;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-[#0b1f33] py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Customer Reviews</span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">Trusted by Our Customers</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Real experiences from businesses that rely on BCare equipment every day.</p>

          {/* Rating Summary */}
          <div className="inline-flex items-center gap-8 bg-white/5 border border-white/10 rounded-xl px-8 py-5">
            <div className="text-center">
              <span className="font-heading text-4xl font-extrabold text-[#F97316] block">{avgRating}</span>
              <div className="flex items-center gap-0.5 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(parseFloat(avgRating)) ? 'fill-[#F97316] text-[#F97316]' : 'fill-white/20 text-white/20'}`} />
                ))}
              </div>
              <span className="text-white/40 text-xs mt-1 block">Average Rating</span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <span className="font-heading text-4xl font-extrabold text-white block">{visibleReviews.length}</span>
              <span className="text-white/40 text-xs mt-1 block">Total Reviews</span>
            </div>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="text-center">
              <span className="font-heading text-4xl font-extrabold text-white block">{fiveStarCount}</span>
              <span className="text-white/40 text-xs mt-1 block">5-Star Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Reviews */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          {/* Filter Tabs */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <Filter className="w-4 h-4 text-[#94A3B8]" />
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeFilter === f.value
                    ? 'bg-[#0b1f33] text-white'
                    : 'bg-white border border-[#94A3B8]/30 text-[#44474c] hover:border-[#0b1f33]/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <GoogleReviewCard review={review} variant="full" />
              </motion.div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-[#94A3B8]/30">
              <p className="text-[#94A3B8]">No reviews match this filter.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-[#44474c] mb-4">Have you worked with BCare? Share your experience.</p>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${encodeURIComponent('Hello BCare, I would like to share my feedback about your products and services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#F97316]/90 transition-colors"
            >
              Share Your Experience
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
