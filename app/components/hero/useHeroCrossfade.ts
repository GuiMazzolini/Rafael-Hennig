'use client';

import { useEffect, useState } from 'react';

export const HERO_CROSSFADE_MS = 4500;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useHeroCrossfade(photoCount: number): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (photoCount <= 1 || prefersReducedMotion()) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % photoCount);
    }, HERO_CROSSFADE_MS);

    return () => clearInterval(interval);
  }, [photoCount]);

  return activeIndex;
}
