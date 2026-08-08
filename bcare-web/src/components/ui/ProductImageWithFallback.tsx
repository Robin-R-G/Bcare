'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { asset } from '@/lib/utils';

interface ProductImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ProductImageWithFallback({
  src,
  alt,
  className = 'w-full h-full object-contain',
  fill,
  width,
  height,
  priority = false,
}: ProductImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // If no source provided or previous load failed
  if (!src || error) {
    return (
      <div className="w-full h-full min-h-[160px] bg-[#F8FAFC] border border-[#94A3B8]/20 rounded-lg flex flex-col items-center justify-center p-4 text-center select-none">
        <div className="w-12 h-12 bg-[#0B1F33]/5 text-[#0B1F33]/60 rounded-full flex items-center justify-center mb-2">
          <Package className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold text-[#0B1F33]">BCare Equipment</span>
        <span className="text-[10px] text-[#94A3B8] mt-0.5">Image Unavailable</span>
      </div>
    );
  }

  const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 bg-[#F1F5F9] animate-pulse rounded-lg z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#0B1F33]/20 border-t-[#F97316] animate-spin" />
        </div>
      )}

      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${className} transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          unoptimized={isExternalUrl}
        />
      ) : (
        <img
          src={asset(src)}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          className={`${className} transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}
