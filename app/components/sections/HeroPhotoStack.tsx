'use client';

import React from 'react';
import Link from 'next/link';
import { HeroCrossfadeImage } from '@/app/components/sections/HeroCrossfadeImage';
import { useHeroCrossfade } from '@/app/components/sections/useHeroCrossfade';
import type { Photo } from '@/app/lib/types';

interface HeroPhotoStackProps {
  photos: Photo[];
}

export const HeroPhotoStack: React.FC<HeroPhotoStackProps> = ({ photos }) => {
  const activeIndex = useHeroCrossfade(photos.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <HeroText />

      {photos.length > 0 && (
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-sm bg-neutral-200 shadow-[0_16px_48px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
            <HeroCrossfadeImage
              photos={photos}
              activeIndex={activeIndex}
              sizes="320px"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

function HeroText() {
  return (
    <div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight">
        Photographer
        <span className="block ml-3 md:ml-24 text-neutral-500">
          Cinematographer
        </span>
      </h1>
      <p className="mt-10 text-neutral-800 max-w-lg leading-relaxed">
        Berlin-based visual artist working between analog and digital.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/photos"
          className="px-8 py-3.5 bg-neutral-900 text-white rounded-full text-sm font-light hover:bg-neutral-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View photos
        </Link>
        <Link
          href="/videos"
          className="px-8 py-3.5 border border-neutral-400 text-neutral-900 rounded-full text-sm font-light hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
        >
          Watch films
        </Link>
      </div>
    </div>
  );
}
