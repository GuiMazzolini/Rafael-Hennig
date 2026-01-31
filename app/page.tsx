"use client"

import React, { useState, useEffect } from 'react';
import { CustomCursor } from '@/app/components/ui/CustomCursor'
import { Lightbox } from '@/app/components/ui/Lightbox';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer'
import { HeroSection } from '@/app/components/sections/HeroSection';
import { Photo, PhotoGallerySection } from '@/app/components/sections/GallerySection';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { ContactSection } from '@/app/components/sections/ContactSection';

const PhotographyPortfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);



const analogPhotos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=1600",
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1600",
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200",
    orientation: "portrait",
  },
];

const digitalPhotos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600",
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600",
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200",
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
    orientation: "portrait",
  },
];

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

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      <CustomCursor x={cursorPos.x} y={cursorPos.y} isHovered={!!hoveredImage} />
      <Navigation scrolled={scrolled} />
      <HeroSection />
      
      <PhotoGallerySection
        title="Analog"
        photos={analogPhotos}
        onImageClick={(photo, index, photos) => {
          setLightboxImages(photos.map(p => p.src));;
          setLightboxIndex(index);
        }}
        onImageHover={setHoveredImage}
        sectionId="work"
      />
      
      <PhotoGallerySection
        title="Digital"
        photos={digitalPhotos}
        onImageClick={(photo, index, photos) => {
          setLightboxImages(photos.map(p => p.src));;
          setLightboxIndex(index);
        }}
        onImageHover={setHoveredImage}
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

export default PhotographyPortfolio;