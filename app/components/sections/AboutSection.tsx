"use client"

import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">About</h2>
          <div className="space-y-6 text-neutral-600 leading-relaxed">
            <p>
              I am Rafael Hennig, a Brazilian, Berlin based photographer and filmmaker working across analog and digital. My art moves between cities 
              and continents, tracing light, texture, and the quiet moments that tell a place’s story. 
              From street corners in Berlin to coastal towns in Brazil, I seek a cinematic stillness in everyday life. 
           </p>
            <p>
              I am currently working a decolonial photography project about small acts of resistance on everyday moments as Latin immigrants in Berlin.             </p>
          </div>
        </div>
        <div className="bg-neutral-200 aspect-4/5 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=1000&fit=crop"
            alt="About Rafael Hennig"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};