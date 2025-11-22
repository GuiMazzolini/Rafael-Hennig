"use client"

import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-8 md:mb-12">
        Photographer<br />
        Cinematographer
      </h1>
      <p className="text-lg md:text-xl text-neutral-600 max-w-xl font-light leading-relaxed">
        Crafting visual experiences that merge storytelling with aesthetic precision. Based in Berlin, working globally.
      </p>
    </section>
  );
};