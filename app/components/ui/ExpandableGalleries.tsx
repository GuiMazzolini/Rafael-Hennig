"use client";

import React, { useState } from 'react';
import { PhotoGallerySection, Photo } from '../sections/GallerySection';

export type Gallery = {
  id: string;
  title: string;
  photos: Photo[];
};

interface ExpandableGalleriesProps {
  title: string;
  galleries: Gallery[];
  onImageClick: (photo: string, index: number, photos: Photo[]) => void;
  onImageHover: (id: string | null) => void;
  initialShowCount?: number;
}

export const ExpandableGalleries: React.FC<ExpandableGalleriesProps> = ({
  title,
  galleries,
  onImageClick,
  onImageHover,
  initialShowCount = 2,
}) => {
  const [showAll, setShowAll] = useState(false);
  
  const visibleGalleries = showAll ? galleries : galleries.slice(0, initialShowCount);
  const hasMore = galleries.length > initialShowCount;

  if (galleries.length === 0) {
    return null;
  }

  return (
    <div className="py-8 md:py-12">
      <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8 px-6 md:px-12 max-w-screen-2xl mx-auto">
        {title}
      </h2>
      <div className="space-y-8 md:space-y-12">
        {visibleGalleries.map((gallery) => (
          <PhotoGallerySection
            key={gallery.id}
            title={gallery.title}
            photos={gallery.photos}
            onImageClick={onImageClick}
            onImageHover={onImageHover}
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 border-2 border-neutral-900 rounded-full text-lg font-light hover:bg-neutral-900 hover:text-white transition-all duration-300"
          >
            {showAll 
              ? '− Show Less' 
              : `+ Show ${galleries.length - initialShowCount} More`
            }
          </button>
        </div>
      )}
    </div>
  );
};