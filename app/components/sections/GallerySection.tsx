'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ScrollButton } from '../ui/ScrollButton';

export type Photo = {
  src: string;
  orientation: 'portrait' | 'landscape';
};

interface PhotoGallerySectionProps {
  title: string;
  photos: Photo[];
  onImageClick: (photo: string, index: number, photos: Photo[]) => void;
  onImageHover: (id: string | null) => void;
  sectionId?: string;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  title,
  photos,
  onImageClick,
  onImageHover,
  sectionId,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    };

    updateScrollState();
    el.addEventListener('scroll', updateScrollState);

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, []);

  if (photos.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -el.clientWidth * 0.8 : el.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  const mobilePadding =
    photos[0]?.orientation === 'portrait'
      ? 'calc(50vw - 110px)'
      : 'calc(50vw - 37vw)';

  return (
    <section id={sectionId} className="py-4 md:py-8">
      <div className="px-6 md:px-12 flex justify-between items-center max-w-screen-2xl mx-auto">
        <h2 className="text-xl md:text-2xl text-neutral-700">{title}</h2>

        <div className="hidden md:flex gap-1">
          <ScrollButton
            direction="left"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
          />
          <ScrollButton
            direction="right"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
          />
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex items-center gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-proximity px-6 md:px-12 scroll-smooth"
        style={{
          paddingLeft: isMobile ? mobilePadding : undefined,
          paddingRight: isMobile ? mobilePadding : undefined,
          scrollPaddingLeft: '1.5rem',
          scrollPaddingRight: '1.5rem',
        }}
      >
        {photos.map((photo, idx) => {
          const isPortrait = photo.orientation === 'portrait';

          return (
            <button
              key={`${title}-${idx}`}
              onClick={() => onImageClick(photo.src, idx, photos)}
              onMouseEnter={() => onImageHover(`${title}-${idx}`)}
              onMouseLeave={() => onImageHover(null)}
              className="shrink-0 snap-center cursor-pointer group"
            >
              <div
                className={`
                  relative overflow-hidden rounded-sm
                  transition-transform duration-300
                  md:group-hover:scale-[1.02]
                  ${
                    isPortrait
                      ? 'md:w-[260px] md:h-[347px] lg:w-[280px] lg:h-[373px]'
                      : 'md:w-[320px] md:h-[240px] lg:w-[360px] lg:h-[270px]'
                  }
                `}
                style={
                  isMobile
                    ? isPortrait
                      ? { width: '220px', height: '293px' }
                      : { width: '74vw', height: 'calc(74vw * 0.75)' }
                    : undefined
                }
              >
                <img
                  src={photo.src}
                  alt={`${title} photography ${idx + 1}`}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  draggable={false}
                  className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:brightness-105 md:group-hover:shadow-xl"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};