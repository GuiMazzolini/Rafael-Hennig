"use client";

import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 md:pt-48 pb-24 md:pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto overflow-hidden">
      <div className="animate-hero">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight">
          Photographer<br />
          Cinematographer
        </h1>

        <p className="mt-10 text-neutral-800 max-w-lg leading-relaxed">
          Berlin-based visual artist working between analog and digital.
        </p>
      </div>
    </section>
  );
};