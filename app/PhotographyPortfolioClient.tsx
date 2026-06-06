'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CustomCursor } from '@/app/components/ui/CustomCursor';
import { Lightbox } from '@/app/components/ui/Lightbox';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';
import { HeroSection } from '@/app/components/sections/HeroSection';
import { ExpandableGalleries } from '@/app/components/ui/ExpandableGalleries';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { ContactSection } from '@/app/components/sections/ContactSection';
import type { Gallery, Photo } from '@/app/lib/types';

interface PhotographyPortfolioClientProps {
  analogGalleries: Gallery[];
  digitalGalleries: Gallery[];
  galleryLoadFailed: boolean;
  aboutPhotoUrl: string | null;
}

const PhotographyPortfolioClient: React.FC<PhotographyPortfolioClientProps> = ({
  analogGalleries,
  digitalGalleries,
  galleryLoadFailed,
  aboutPhotoUrl,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageClick = useCallback((index: number, photos: Photo[]) => {
    setLightboxImages(photos.map((p) => p.fullSrc));
    setLightboxIndex(index);
  }, []);

  const hasGalleries =
    analogGalleries.length > 0 || digitalGalleries.length > 0;

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      <CustomCursor isHovered={isImageHovered} />
      <Navigation scrolled={scrolled} />
      <HeroSection />

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
            sectionId="work"
            galleries={analogGalleries}
            onImageClick={handleImageClick}
            onImageHover={setIsImageHovered}
            initialShowCount={2}
          />

          <ExpandableGalleries
            title="Digital"
            galleries={digitalGalleries}
            onImageClick={handleImageClick}
            onImageHover={setIsImageHovered}
            initialShowCount={2}
          />
        </>
      )}

      <AboutSection aboutPhotoUrl={aboutPhotoUrl} />
      <ContactSection />
      <Footer />

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default PhotographyPortfolioClient;
