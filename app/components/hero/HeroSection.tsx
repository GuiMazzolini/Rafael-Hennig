import React from 'react';
import { HeroContent } from '@/app/components/hero/HeroContent';
import type { Photo } from '@/app/lib/types';

interface HeroSectionProps {
  photos: Photo[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ photos }) => {
  return (
    <section className="relative warm-surface pt-32 md:pt-48 pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="relative animate-hero max-w-screen-2xl mx-auto">
        <HeroContent photos={photos} />
      </div>
    </section>
  );
};
