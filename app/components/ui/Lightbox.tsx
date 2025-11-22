"use client"

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  image: string | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (image) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white hover:opacity-60 transition-opacity z-10"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>
      <img
        src={image}
        alt="Full size view"
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
