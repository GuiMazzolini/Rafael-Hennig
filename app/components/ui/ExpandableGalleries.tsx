'use client';

import React, { useState } from 'react';
import { PhotoGallerySection } from '@/app/components/sections/GallerySection';
import type { Gallery, Photo } from '@/app/lib/types';

interface ExpandableGalleriesProps {
  title: string;
  definition?: string;
  description?: string;
  galleries: Gallery[];
  onImageClick: (index: number, photos: Photo[]) => void;
  initialShowCount?: number;
}

export const ExpandableGalleries: React.FC<ExpandableGalleriesProps> = ({
  title,
  definition,
  description,
  galleries,
  onImageClick,
  initialShowCount = 2,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleGalleries = showAll
    ? galleries
    : galleries.slice(0, initialShowCount);
  const hasMore = galleries.length > initialShowCount;

  if (galleries.length === 0) {
    return null;
  }

  return (
    <div className="py-6 md:py-10 scroll-mt-24 first:pt-0">
      <div className="mb-6 md:mb-8 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-neutral-400/40 pb-6 md:pb-8">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900">
          {title}
        </h2>
        {definition && (
          <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-500 font-light tracking-wide">
            {definition}
          </p>
        )}
        {description && (
          <p className="mt-4 md:mt-5 text-base md:text-lg text-neutral-700 font-light leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-12 md:space-y-20">
        {visibleGalleries.map((gallery) => (
          <PhotoGallerySection
            key={gallery.id}
            title={gallery.title}
            photos={gallery.photos}
            onImageClick={onImageClick}
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-10 py-4 bg-neutral-900 text-white rounded-full text-base font-light hover:bg-neutral-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {showAll
              ? '− Show Less'
              : `+ Show ${galleries.length - initialShowCount} More`}
          </button>
        </div>
      )}
    </div>
  );
};
