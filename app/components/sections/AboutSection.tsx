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
              I'm a photographer and cinematographer specializing in capturing authentic moments through both analog and digital mediums. My work explores the relationship between light, composition, and emotion.
            </p>
            <p>
              Based in Berlin, I collaborate with clients worldwide, bringing a unique perspective that bridges traditional film photography with contemporary digital techniques.
            </p>
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