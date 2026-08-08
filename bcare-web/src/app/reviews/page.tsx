import { Star } from 'lucide-react';
import { getGoogleReviews } from '@/lib/supabase/queries';
import { COMPANY_DETAILS } from '@/lib/constants/company';

export default async function ReviewsPage() {
  const reviews = await getGoogleReviews();
  const visibleReviews = reviews.filter(r => r.isVisible);

  const avgRating = visibleReviews.length > 0
    ? (visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length).toFixed(1)
    : '0';

  const fiveStarCount = visibleReviews.filter(r => r.rating === 5).length;

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-[#0b1f33] py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="text-[#F97316] font-label-sm text-xs uppercase tracking-[0.2em] font-semibold mb-3 block">Customer Reviews</span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">Trusted by Our Customers</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Real experiences from businesses that rely on BCare equipment every day.</p>

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

      <section className="py-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-[#94A3B8]/20 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#0b1f33] text-white flex items-center justify-center font-bold text-sm">
                  {review.reviewerName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0b1f33]">{review.reviewerName}</p>
                  <p className="text-xs text-[#94A3B8]">{review.reviewDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-[#F97316] text-[#F97316]' : 'fill-[#E2E8F0] text-[#E2E8F0]'}`} />
                ))}
              </div>
              <p className="text-[#44474c] text-sm leading-relaxed">{review.reviewText}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
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
      </section>
    </div>
  );
}
