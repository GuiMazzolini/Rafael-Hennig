'use client';

import React, { useState, useCallback } from 'react';
import { SiteShell } from '@/app/components/layout/SiteShell';
import { ExpandableGalleries } from '@/app/components/ui/ExpandableGalleries';
import { Lightbox } from '@/app/components/ui/Lightbox';
import type { Gallery, Photo } from '@/app/lib/types';

interface PhotosClientProps {
  analogGalleries: Gallery[];
  digitalGalleries: Gallery[];
  galleryLoadFailed: boolean;
}

const PhotosClient: React.FC<PhotosClientProps> = ({
  analogGalleries,
  digitalGalleries,
  galleryLoadFailed,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const handleImageClick = useCallback((index: number, photos: Photo[]) => {
    setLightboxImages(photos.map((p) => p.fullSrc));
    setLightboxIndex(index);
  }, []);

  const hasGalleries =
    analogGalleries.length > 0 || digitalGalleries.length > 0;

  return (
    <SiteShell>
      <header className="pt-32 md:pt-48 pb-8 md:pb-12 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900">
          Photos
        </h1>
        <p className="mt-4 text-neutral-600 max-w-lg">
          Analog and digital photography from Berlin and beyond.
        </p>
      </header>

      {galleryLoadFailed && (
        <div
          role="alert"
          className="px-6 md:px-12 py-16 text-center text-neutral-600 max-w-screen-2xl mx-auto"
        >
          Unable to load galleries. Please try again later.
        </div>
      )}

      {!galleryLoadFailed && hasGalleries && (
        <>
          <ExpandableGalleries
            title="Analog"
            galleries={analogGalleries}
            onImageClick={handleImageClick}
            initialShowCount={2}
          />

          <ExpandableGalleries
            title="Digital"
            galleries={digitalGalleries}
            onImageClick={handleImageClick}
            initialShowCount={2}
          />
        </>
      )}

      {!galleryLoadFailed && !hasGalleries && (
        <p className="px-6 md:px-12 py-16 text-center text-neutral-600">
          No galleries yet.
        </p>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </SiteShell>
  );
};

export default PhotosClient;
