'use client';

import React from 'react';
import Image from 'next/image';
import type { Photo } from '@/app/lib/types';

interface HeroCrossfadeImageProps {
  photos: Photo[];
  activeIndex: number;
  altPrefix?: string;
  sizes: string;
  priority?: boolean;
}

export const HeroCrossfadeImage: React.FC<HeroCrossfadeImageProps> = ({
  photos,
  activeIndex,
  altPrefix = 'Featured work',
  sizes,
  priority = false,
}) => {
  return (
    <div className="relative h-full w-full">
      {photos.map((photo, idx) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={`${altPrefix} ${idx + 1}`}
          fill
          sizes={sizes}
          priority={priority && idx === 0}
          className={`object-cover motion-safe:transition-opacity motion-safe:duration-[1400ms] motion-safe:ease-in-out ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          draggable={false}
        />
      ))}
    </div>
  );
};
