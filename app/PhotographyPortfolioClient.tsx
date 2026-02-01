"use client";

import React, { useState, useEffect } from 'react';
import { CustomCursor } from '@/app/components/ui/CustomCursor';
import { Lightbox } from '@/app/components/ui/Lightbox';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';
import { HeroSection } from '@/app/components/sections/HeroSection';
import { Photo } from '@/app/components/sections/GallerySection';
import { ExpandableGalleries, Gallery } from './components/ui/ExpandableGalleries';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { ContactSection } from '@/app/components/sections/ContactSection';

interface PhotographyPortfolioClientProps {
  analogGalleries: Gallery[];
  digitalGalleries: Gallery[];
}

const PhotographyPortfolioClient: React.FC<PhotographyPortfolioClientProps> = ({
  analogGalleries,
  digitalGalleries,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleImageClick = (photo: string, index: number, photos: Photo[]) => {
    setLightboxImages(photos.map(p => p.src));
    setLightboxIndex(index);
  };

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      <CustomCursor x={cursorPos.x} y={cursorPos.y} isHovered={!!hoveredImage} />
      <Navigation scrolled={scrolled} />
      <HeroSection />
      
      <ExpandableGalleries
        title="Analog"
        galleries={analogGalleries}
        onImageClick={handleImageClick}
        onImageHover={setHoveredImage}
        initialShowCount={2}
      />
      
      <ExpandableGalleries
        title="Digital"
        galleries={digitalGalleries}
        onImageClick={handleImageClick}
        onImageHover={setHoveredImage}
        initialShowCount={2}
      />
      
      <AboutSection />
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