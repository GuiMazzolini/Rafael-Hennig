'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i < images.length - 1 ? i + 1 : i));
  }, [images.length]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [onClose, goPrev, goNext]);

  if (!images.length) return null;

  const image = images[index];

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer, ${index + 1} of ${images.length}`}
    >
      <button
        ref={closeButtonRef}
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
          className="absolute left-6 md:left-10 text-white opacity-80 hover:opacity-100 transition-opacity z-10"
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
          className="absolute right-6 md:right-10 text-white opacity-80 hover:opacity-100 transition-opacity z-10"
          aria-label="Next image"
        >
          <ChevronRight size={48} />
        </button>
      )}

      <div
        className="relative w-full h-full max-w-[90vw] max-h-[90vh] mx-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image}
          alt={`Full size view, image ${index + 1} of ${images.length}`}
          fill
          sizes="90vw"
          priority
          className="object-contain select-none"
          draggable={false}
        />
      </div>
    </div>
  );
};
