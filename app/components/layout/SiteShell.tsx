'use client';

import React, { useState, useEffect } from 'react';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';

interface SiteShellProps {
  children: React.ReactNode;
}

export const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      <Navigation scrolled={scrolled} />
      {children}
      <Footer />
    </div>
  );
};
