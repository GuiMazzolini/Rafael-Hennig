"use client";

import React, { useRef, useState, useEffect } from "react";
import { ScrollButton } from "../ui/ScrollButton";

export type Photo = {
  src: string;
  orientation: "portrait" | "landscape";
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

  const [photoHeights] = useState(() => 
    photos.map((photo) => {
      const min = photo.orientation === 'portrait' ? 260 : 180;
      const max = photo.orientation === 'portrait' ? 380 : 340; // Increased from 320 to 340
      
      // Generate random height within range
      return Math.floor(Math.random() * (max - min + 1)) + min;
    })
  );

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState);

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section id={sectionId} className="py-16 md:py-24">
      <div className="px-6 md:px-12 mb-8 flex justify-between items-center max-w-screen-2xl mx-auto">
        <h3 className="text-4xl md:text-6xl font-light tracking-tight">
          {title}
        </h3>

        <div className="flex gap-1">
          <ScrollButton
            direction="left"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          />
          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="
          flex items-center gap-3 md:gap-4
          px-6 md:px-12
          overflow-x-auto
          snap-x snap-mandatory
          scrollbar-hide
          pb-4
        "
        style={{
          scrollPaddingLeft: "1.5rem",
          scrollPaddingRight: "1.5rem",
        }}
      >
        {photos.map((photo, idx) => (
<button
  key={`${title}-${idx}`}
  onClick={() => onImageClick(photo.src, idx, photos)}
  onMouseEnter={() => onImageHover(`${title}-${idx}`)}
  onMouseLeave={() => onImageHover(null)}
  className="flex-none snap-start group cursor-pointer hover:z-10"
  style={{ 
    height: `${photoHeights[idx]}px`,
  }}
>
  <div className="relative overflow-hidden h-full flex items-center justify-center rounded-sm min-w-45 max-w-[320px]">
    <img
      src={photo.src}
      alt={`${title} photography ${idx + 1}`}
      loading={idx < 4 ? "eager" : "lazy"}
      draggable={false}
      className="
        max-h-full max-w-full object-contain
        transition-all duration-500 ease-out
        group-hover:brightness-105
        group-hover:shadow-xl
      "
    />
  </div>
</button>
        ))}
      </div>
    </section>
  );
};