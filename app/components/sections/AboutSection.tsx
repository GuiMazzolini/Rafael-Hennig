import React from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  aboutPhotoUrl: string | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutPhotoUrl }) => {
  return (
    <section className="w-full px-6 md:px-12 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-10 text-neutral-900">
            About
          </h2>

          <div className="space-y-6 text-neutral-800 leading-relaxed text-base md:text-lg max-w-xl">
            <p>
              I am Rafael Hennig, a Brazilian, Berlin-based photographer and
              filmmaker working across analog and digital. My work moves between
              cities and continents, tracing light, texture, and the quiet
              moments that tell a place&apos;s story.
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

        {aboutPhotoUrl && (
          <div className="relative overflow-hidden bg-neutral-200 aspect-4/5 group rounded-sm w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[500px] mx-auto lg:ml-auto">
            <Image
              src={aboutPhotoUrl}
              alt="About Rafael Hennig"
              fill
              sizes="(max-width: 1024px) 280px, 300px"
              className="object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
          </div>
        )}
      </div>
    </section>
  );
};
