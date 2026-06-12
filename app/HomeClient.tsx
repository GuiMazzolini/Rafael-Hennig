'use client';

import React, { useState, useCallback } from 'react';
import { SiteShell } from '@/app/components/layout/SiteShell';
import { HeroSection } from '@/app/components/sections/HeroSection';
import { FeaturedPhotosSection } from '@/app/components/sections/FeaturedPhotosSection';
import { ContactSection } from '@/app/components/sections/ContactSection';
import { Lightbox } from '@/app/components/ui/Lightbox';
import type { Photo } from '@/app/lib/types';

interface HomeClientProps {
  newestPhotos: Photo[];
}

const HomeClient: React.FC<HomeClientProps> = ({ newestPhotos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const handleImageClick = useCallback((index: number, photos: Photo[]) => {
    setLightboxImages(photos.map((p) => p.fullSrc));
    setLightboxIndex(index);
  }, []);

  return (
    <SiteShell>
      <HeroSection photos={newestPhotos.slice(0, 4)} />
      <FeaturedPhotosSection
        photos={newestPhotos}
        onImageClick={handleImageClick}
      />
      <ContactSection />

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

export default HomeClient;
