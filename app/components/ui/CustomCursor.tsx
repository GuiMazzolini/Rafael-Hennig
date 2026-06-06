'use client';

import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  isHovered: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isHovered }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="hidden md:block fixed w-4 h-4 bg-neutral-900 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
      style={{
        transform: `translate(-50%, -50%) scale(${isHovered ? 2 : 1})`,
      }}
    />
  );
};
