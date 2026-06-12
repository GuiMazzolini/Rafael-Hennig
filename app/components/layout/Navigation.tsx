'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/app/lib/site';

interface NavigationProps {
  scrolled: boolean;
  showContactSubtitle: boolean;
}

const navLinks = [
  { href: '/photos', label: 'Photos' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  scrolled,
  showContactSubtitle,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === '/#contact') {
      return pathname === '/' && showContactSubtitle;
    }
    return pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-neutral-50/90 backdrop-blur-md py-4 shadow-sm text-neutral-900'
          : 'bg-transparent py-8 text-neutral-700'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg md:text-xl font-light tracking-tight hover:opacity-60 transition-opacity"
        >
          Rafael Hennig
          <span
            className={`block text-[11px] md:text-xs font-normal tracking-wide text-neutral-500 transition-all duration-300 overflow-hidden ${
              showContactSubtitle
                ? 'max-h-5 opacity-100 mt-1'
                : 'max-h-0 opacity-0'
            }`}
          >
            {siteConfig.email}
          </span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 hover:opacity-60 transition-opacity"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-opacity duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-current after:transition-all after:duration-300 hover:opacity-60 ${
                isActive(link.href) ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`md:hidden bg-neutral-50/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-64 border-t border-neutral-200 mt-4' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
