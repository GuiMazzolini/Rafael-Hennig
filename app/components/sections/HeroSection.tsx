import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-[#f7f7f6] pt-32 md:pt-48 pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url("/grain.png")',
          backgroundRepeat: 'repeat',
          opacity: 0.12,
          mixBlendMode: 'multiply',
        }}
      />
      <div className="relative animate-hero max-w-screen-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight">
          Photographer
          <span className="block ml-12 md:ml-24 text-neutral-500">
            Cinematographer
          </span>
        </h1>
        <p className="mt-10 text-neutral-800 max-w-lg leading-relaxed">
          Berlin-based visual artist working between analog and digital.
        </p>
      </div>
    </section>
  );
};
