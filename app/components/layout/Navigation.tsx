'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrolled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500
  ${
    scrolled
      ? 'bg-neutral-50/90 backdrop-blur-md py-4 shadow-sm text-neutral-900'
      : 'bg-transparent py-8 text-neutral-700'
  }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#"
          className="
    text-lg md:text-xl
    font-light tracking-tight
    hover:opacity-60 transition-opacity
  "
        >
          Rafael Hennig
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 hover:opacity-60 transition-opacity"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex gap-8 text-sm tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
    relative
    after:absolute after:left-0 after:-bottom-1
    after:h-px after:w-0 after:bg-current
    after:transition-all after:duration-300
    hover:after:w-full
    hover:opacity-60
  "
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div
        className={`md:hidden bg-neutral-50/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-48 border-t border-neutral-200 mt-4' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
