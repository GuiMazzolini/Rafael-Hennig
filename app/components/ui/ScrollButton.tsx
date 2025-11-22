"use client"

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick, disabled }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
      className={`p-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-all ${
        disabled ? 'opacity-30 cursor-not-allowed' : ''
      }`}
    >
      <Icon size={20} />
    </button>
  );
};