'use client';

import React, { useState, useCallback } from 'react';
import { SiteShell } from '@/app/components/layout/SiteShell';
import { PageShell } from '@/app/components/layout/PageShell';
import { ExpandableGalleries } from '@/app/components/ui/ExpandableGalleries';
import { Lightbox } from '@/app/components/ui/Lightbox';
import type { Gallery, Photo } from '@/app/lib/types';

interface PhotosClientProps {
  vaoGalleries: Gallery[];
  caminhoGalleries: Gallery[];
  mareGalleries: Gallery[];
  galleryLoadFailed: boolean;
}

const PhotosClient: React.FC<PhotosClientProps> = ({
  vaoGalleries,
  caminhoGalleries,
  mareGalleries,
  galleryLoadFailed,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const handleImageClick = useCallback((index: number, photos: Photo[]) => {
    setLightboxImages(photos.map((p) => p.fullSrc));
    setLightboxIndex(index);
  }, []);

  const hasGalleries =
    vaoGalleries.length > 0 ||
    caminhoGalleries.length > 0 ||
    mareGalleries.length > 0;

  return (
    <SiteShell>
      <PageShell>
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
              title="Vão"
              galleries={vaoGalleries}
              onImageClick={handleImageClick}
              initialShowCount={2}
            />

            <ExpandableGalleries
              title="Caminho"
              galleries={caminhoGalleries}
              onImageClick={handleImageClick}
              initialShowCount={2}
            />

            <ExpandableGalleries
              title="Maré"
              galleries={mareGalleries}
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
      </PageShell>

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
