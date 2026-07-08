'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Photo } from '@/app/lib/types';

const INITIAL_VISIBLE_COUNT = 8;

interface PhotoGallerySectionProps {
  title: string;
  photos: Photo[];
  onImageClick: (index: number, photos: Photo[]) => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  title,
  photos,
  onImageClick,
}) => {
  const [showAll, setShowAll] = useState(false);

  if (photos.length === 0) return null;

  const hasMore = photos.length > INITIAL_VISIBLE_COUNT;
  const visiblePhotos = showAll
    ? photos
    : photos.slice(0, INITIAL_VISIBLE_COUNT);

  const heading = title?.trim();

  return (
    <section className="py-4 md:py-8">
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
        {heading && (
          <h3 className="text-xl md:text-2xl text-neutral-700 mb-6 md:mb-8">
            {title}
          </h3>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {visiblePhotos.map((photo, idx) => (
            <button
              key={`${heading || 'photos'}-${idx}`}
              onClick={() => onImageClick(idx, photos)}
              className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group"
            >
              <Image
                src={photo.src}
                alt={`${heading || 'Photo'} photography ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={idx < 4}
                draggable={false}
                className="object-cover transition-all duration-500 ease-out group-hover:brightness-105 md:group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8 md:mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-neutral-900 text-white rounded-full text-sm font-light hover:bg-neutral-700 transition-all duration-300"
            >
              {showAll
                ? 'Show less'
                : `Show ${photos.length - INITIAL_VISIBLE_COUNT} more`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
