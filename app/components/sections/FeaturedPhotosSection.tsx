'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Photo } from '@/app/lib/types';

interface FeaturedPhotosSectionProps {
  photos: Photo[];
  onImageClick: (index: number, photos: Photo[]) => void;
}

export const FeaturedPhotosSection: React.FC<FeaturedPhotosSectionProps> = ({
  photos,
  onImageClick,
}) => {
  if (photos.length === 0) return null;

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 md:mb-12 text-neutral-900">
        Recent work
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => onImageClick(idx, photos)}
            className="relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer group"
          >
            <Image
              src={photo.src}
              alt={`Recent work ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              priority={idx < 2}
              className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
              draggable={false}
            />
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-12 md:mt-16">
        <Link
          href="/photos"
          className="px-10 py-4 bg-neutral-900 text-white rounded-full text-base font-light hover:bg-neutral-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View full gallery
        </Link>
      </div>
    </section>
  );
};
