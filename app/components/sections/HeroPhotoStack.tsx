'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroCrossfadeImage } from '@/app/components/sections/HeroCrossfadeImage';
import { useHeroCrossfade } from '@/app/components/sections/useHeroCrossfade';
import type { Photo } from '@/app/lib/types';

const stackLayers = [
  {
    rotate: -16,
    x: -56,
    y: 34,
    scale: 0.9,
    zIndex: 10,
    offset: 2,
    hoverRotate: -22,
    hoverX: -78,
    hoverY: 24,
  },
  {
    rotate: 7,
    x: 24,
    y: -18,
    scale: 0.95,
    zIndex: 20,
    offset: 1,
    hoverRotate: 1,
    hoverX: 4,
    hoverY: -32,
  },
  {
    rotate: 19,
    x: 64,
    y: 48,
    scale: 1,
    zIndex: 30,
    offset: 0,
    hoverRotate: 26,
    hoverX: 96,
    hoverY: 62,
  },
];

interface HeroPhotoStackProps {
  photos: Photo[];
}

function cardTransform(
  x: number,
  y: number,
  rotate: number,
  scale: number,
): string {
  return `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg) scale(${scale})`;
}

export const HeroPhotoStack: React.FC<HeroPhotoStackProps> = ({ photos }) => {
  const activeIndex = useHeroCrossfade(photos.length);
  const [hovered, setHovered] = useState(false);

  if (photos.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <HeroText />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <HeroText />

      {/* Desktop: shuffled stack */}
      <div className="hidden lg:flex items-center justify-center">
        <div
          className="relative h-[480px] w-[400px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {stackLayers.map((layer, idx) => {
            const displayIndex =
              (activeIndex + layer.offset) % photos.length;
            const x = hovered ? layer.hoverX : layer.x;
            const y = hovered ? layer.hoverY : layer.y;
            const rotate = hovered ? layer.hoverRotate : layer.rotate;

            return (
              <div
                key={idx}
                className="absolute left-1/2 top-1/2 h-[300px] w-[220px] overflow-hidden rounded-sm bg-neutral-200 shadow-[0_16px_48px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition-all duration-700 ease-out"
                style={{
                  zIndex: layer.zIndex,
                  transform: cardTransform(x, y, rotate, layer.scale),
                }}
              >
                <HeroCrossfadeImage
                  photos={photos}
                  activeIndex={displayIndex}
                  sizes="220px"
                  priority={idx === 2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function HeroText() {
  return (
    <div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight">
        Photographer
        <span className="block ml-3 md:ml-24 text-neutral-500">
          Cinematographer
        </span>
      </h1>
      <p className="mt-10 text-neutral-800 max-w-lg leading-relaxed">
        Berlin-based visual artist working between analog and digital.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/photos"
          className="px-8 py-3.5 bg-neutral-900 text-white rounded-full text-sm font-light hover:bg-neutral-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View photos
        </Link>
        <Link
          href="/videos"
          className="px-8 py-3.5 border border-neutral-400 text-neutral-900 rounded-full text-sm font-light hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
        >
          Watch films
        </Link>
      </div>
    </div>
  );
}
