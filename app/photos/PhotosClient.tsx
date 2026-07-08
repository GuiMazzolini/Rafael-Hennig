'use client';

import React, { useState, useCallback, useMemo } from 'react';
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleImageClick = useCallback((index: number, photos: Photo[]) => {
    setLightboxImages(photos.map((p) => p.fullSrc));
    setLightboxIndex(index);
  }, []);

  const hasGalleries =
    vaoGalleries.length > 0 ||
    caminhoGalleries.length > 0 ||
    mareGalleries.length > 0;

  const matchPhoto = useCallback(
    (photo: Photo) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.every((tag) => photo.tags.includes(tag));
    },
    [selectedTags],
  );

  const allPhotos = useMemo(() => {
    const collect = (galleries: Gallery[]) =>
      galleries.flatMap((g) => g.photos);
    return [
      ...collect(vaoGalleries),
      ...collect(caminhoGalleries),
      ...collect(mareGalleries),
    ];
  }, [vaoGalleries, caminhoGalleries, mareGalleries]);

  const formatFilters = ['35mm'] as const;
  const toneFilters = ['color', 'b/w'] as const;

  const locationFilters = useMemo(() => {
    const formatSet = new Set<string>([...formatFilters, ...toneFilters]);
    const tags = new Set<string>();
    for (const photo of allPhotos) {
      for (const t of photo.tags) {
        if (!formatSet.has(t)) tags.add(t);
      }
    }
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [allPhotos]);

  const filteredVaoGalleries = useMemo(() => {
    return vaoGalleries
      .map((g) => ({
        ...g,
        photos: g.photos.filter(matchPhoto),
      }))
      .filter((g) => g.photos.length > 0);
  }, [vaoGalleries, matchPhoto]);

  const filteredCaminhoGalleries = useMemo(() => {
    return caminhoGalleries
      .map((g) => ({
        ...g,
        photos: g.photos.filter(matchPhoto),
      }))
      .filter((g) => g.photos.length > 0);
  }, [caminhoGalleries, matchPhoto]);

  const filteredMareGalleries = useMemo(() => {
    return mareGalleries
      .map((g) => ({
        ...g,
        photos: g.photos.filter(matchPhoto),
      }))
      .filter((g) => g.photos.length > 0);
  }, [mareGalleries, matchPhoto]);

  const matchedPhotosCount =
    filteredVaoGalleries.reduce((acc, g) => acc + g.photos.length, 0) +
    filteredCaminhoGalleries.reduce((acc, g) => acc + g.photos.length, 0) +
    filteredMareGalleries.reduce((acc, g) => acc + g.photos.length, 0);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      return [...prev, tag];
    });
  }, []);

  const clearTags = useCallback(() => setSelectedTags([]), []);

  return (
    <SiteShell>
      <PageShell>
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-10 pt-2">
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {formatFilters.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      active
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}

              {toneFilters.map((tag) => {
                const active = selectedTags.includes(tag);
                const label = tag === 'b/w' ? 'B/W' : 'Color';
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      active
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              {locationFilters.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {locationFilters.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                          active
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedTags.length > 0 && (
              <button
                onClick={clearTags}
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors underline underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>

          {selectedTags.length > 0 && (
            <p className="mt-4 text-sm text-neutral-600">
              {matchedPhotosCount} photo
              {matchedPhotosCount === 1 ? '' : 's'} matched
            </p>
          )}
        </div>

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
              galleries={filteredVaoGalleries}
              onImageClick={handleImageClick}
              initialShowCount={2}
            />

            <ExpandableGalleries
              title="Caminho"
              galleries={filteredCaminhoGalleries}
              onImageClick={handleImageClick}
              initialShowCount={2}
            />

            <ExpandableGalleries
              title="Maré"
              galleries={filteredMareGalleries}
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

        {!galleryLoadFailed && hasGalleries && matchedPhotosCount === 0 && (
          <p className="px-6 md:px-12 py-16 text-center text-neutral-600">
            No photos match these filters.
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
