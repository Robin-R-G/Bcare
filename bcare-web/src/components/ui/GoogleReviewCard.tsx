'use client';

import { Star, ExternalLink, Quote } from 'lucide-react';
import { GoogleReview } from '@/types';

interface GoogleReviewCardProps {
  review: GoogleReview;
  variant?: 'compact' | 'full' | 'product';
}

export function GoogleReviewCard({ review, variant = 'full' }: GoogleReviewCardProps) {
  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-[#F97316] text-[#F97316]' : 'fill-[#E2E8F0] text-[#E2E8F0]'
          }`}
        />
      ))}
    </div>
  );

  const sourceBadge = review.source === 'google' ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#4285F4] bg-[#4285F4]/10 px-2 py-0.5 rounded-full">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      Google
    </span>
  ) : review.source === 'indiamart' ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-full">
      IndiaMART
    </span>
  ) : null;

  if (variant === 'compact') {
    return (
      <div className="bg-white p-5 rounded-xl border border-[#94A3B8]/30 hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0b1f33] text-white flex items-center justify-center font-bold text-sm">
              {review.reviewerName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm text-[#0b1f33]">{review.reviewerName}</p>
              {renderStars(review.rating)}
            </div>
          </div>
          {sourceBadge}
        </div>
        <p className="text-[#44474c] text-sm leading-relaxed line-clamp-3">{review.reviewText}</p>
      </div>
    );
  }

  if (variant === 'product') {
    return (
      <div className="bg-[#F8FAFC] p-4 rounded-lg border border-[#94A3B8]/20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#0b1f33] text-white flex items-center justify-center font-bold text-xs">
            {review.reviewerName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-xs text-[#0b1f33]">{review.reviewerName}</p>
            {renderStars(review.rating)}
          </div>
        </div>
        <p className="text-[#44474c] text-xs leading-relaxed line-clamp-2">{review.reviewText}</p>
      </div>
    );
  }

  // Full variant
  return (
    <div className="bg-white p-6 rounded-xl border border-[#94A3B8]/30 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#0b1f33] text-white flex items-center justify-center font-bold text-lg">
            {review.reviewerName.charAt(0)}
          </div>
          <div>
            <p className="font-heading font-bold text-base text-[#0b1f33]">{review.reviewerName}</p>
            <div className="flex items-center gap-2">
              {renderStars(review.rating)}
              <span className="text-xs text-[#94A3B8]">
                {new Date(review.reviewDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {sourceBadge}
          {review.googleReviewUrl && (
            <a href={review.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-[#4285F4] transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      <div className="relative">
        <Quote className="w-6 h-6 text-[#94A3B8]/30 absolute -top-1 -left-1" />
        <p className="text-[#44474c] text-sm leading-relaxed pl-6">{review.reviewText}</p>
      </div>
      {review.category && (
        <div className="mt-4 pt-3 border-t border-[#94A3B8]/20">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">{review.category}</span>
        </div>
      )}
    </div>
  );
}
