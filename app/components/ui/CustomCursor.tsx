import React from 'react';

interface CustomCursorProps {
  x: number;
  y: number;
  isHovered: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ x, y, isHovered }) => {
  return (
    <div 
      className="hidden md:block fixed w-4 h-4 bg-neutral-900 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 2 : 1})`
      }}
    />
  );
};