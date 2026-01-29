"use client";

import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto overflow-hidden">
      <div className="animate-hero">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8 md:mb-12">
          <span className="block">Photographer</span>
          <span className="block text-neutral-700">Cinematographer</span>
        </h1>

        <p className="text-lg md:text-xl text-neutral-950 max-w-xl font-light leading-relaxed">
          Crafting visual experiences that merge storytelling with aesthetic precision.
          <br />
          Based in Berlin, working globally.
        </p>
      </div>
    </section>
  );
};