"use client";

import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 md:py-40"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-10">
            About
          </h2>

          <div className="space-y-6 text-neutral-900 leading-relaxed text-base md:text-lg max-w-xl">
            <p>
              I am Rafael Hennig, a Brazilian, Berlin-based photographer and
              filmmaker working across analog and digital. My work moves between
              cities and continents, tracing light, texture, and the quiet
              moments that tell a place’s story.
            </p>

            <p>
              From street corners in Berlin to coastal towns in Brazil, I seek a
              cinematic stillness in everyday life.
            </p>

            <p>
              I am currently developing a decolonial photography project about
              small acts of resistance in the everyday lives of Latin American
              immigrants in Berlin.
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden bg-neutral-200 aspect-4/5 group">
          <img
            src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=1000&fit=crop"
            alt="About Rafael Hennig"
            className="w-full h-full object-cover transition-transform duration-1200ms ease-out group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
        </div>
      </div>
    </section>
  );
};
