"use client"

import React, { useState, useEffect } from 'react';
import { CustomCursor } from '@/app/components/ui/CustomCursor'
import { Lightbox } from '@/app/components/ui/Lightbox';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer'
import { HeroSection } from '@/app/components/sections/HeroSection';
import { PhotoGallerySection } from '@/app/components/sections/GallerySection';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { ContactSection } from '@/app/components/sections/ContactSection';

const PhotographyPortfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Sample images - replace with actual photographer's work
  const analogPhotos = [
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop',
  ];

  const digitalPhotos = [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=1000&fit=crop',
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
        onImageClick={setLightboxImage}
        onImageHover={setHoveredImage}
        sectionId="work"
      />
      
      <PhotoGallerySection
        title="Digital"
        photos={digitalPhotos}
        onImageClick={setLightboxImage}
        onImageHover={setHoveredImage}
      />
      
      <AboutSection />
      <ContactSection />
      <Footer />
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
};

export default PhotographyPortfolio;