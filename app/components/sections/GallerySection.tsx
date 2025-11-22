"use client"

import React, { useRef, useState, useEffect } from 'react';
import { ScrollButton } from '../ui/ScrollButton';

interface PhotoGallerySectionProps {
  title: string;
  photos: string[];
  onImageClick: (photo: string) => void;
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
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollRef.current 
    ? scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    : false;

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section id={sectionId} className="py-12 md:py-16">
      <div className="px-6 md:px-12 mb-6 flex justify-between items-center max-w-screen-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-light tracking-tight">{title}</h3>
        <div className="flex gap-2">
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
        className="flex gap-3 overflow-x-auto scrollbar-hide px-6 md:px-12 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.map((photo, idx) => (
          <button
            key={`${title}-${idx}`}
            onClick={() => onImageClick(photo)}
            onMouseEnter={() => onImageHover(`${title}-${idx}`)}
            onMouseLeave={() => onImageHover(null)}
            className="flex-none w-64 md:w-80 lg:w-96 snap-start cursor-pointer group"
          >
            <div className="relative overflow-hidden bg-neutral-200 aspect-[3/4]">
              <img
                src={photo}
                alt={`${title} photography ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
