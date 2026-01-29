"use client";

import React, { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  startIndex,
  onClose,
}) => {
  const [index, setIndex] = useState(startIndex);

  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) setIndex((i) => i - 1);
  }, [hasPrev]);

  const goNext = useCallback(() => {
    if (hasNext) setIndex((i) => i + 1);
  }, [hasNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, goPrev, goNext]);

  if (!images.length) return null;

  const image = images[index];

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white hover:opacity-60 transition-opacity z-10"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-6 md:left-10 text-white opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft size={48} />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-6 md:right-10 text-white opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight size={48} />
        </button>
      )}

      <img
        src={image}
        alt="Full size view"
        className="max-w-full max-h-full object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      <div
        className="absolute left-0 top-0 bottom-0 w-1/3"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
      />
    </div>
  );
};
