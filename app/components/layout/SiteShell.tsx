'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/app/components/layout/Navigation';
import { Footer } from '@/app/components/layout/Footer';

interface SiteShellProps {
  children: React.ReactNode;
}

export const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setContactInView(false);
      return;
    }

    const contactEl = document.getElementById('contact');
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '-72px 0px 0px 0px' },
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, [pathname]);

  const contactInViewActive = pathname === '/' && contactInView;

  return (
    <div className="bg-neutral-50 min-h-screen font-sans">
      <Navigation scrolled={scrolled} contactInView={contactInViewActive} />
      {children}
      <Footer />
    </div>
  );
};
