"use client"

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-neutral-300 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
        <p>© 2025 Rafael Hennig. All rights reserved.</p>
        <p>Designed & developed with care</p>
      </div>
    </footer>
  );
};