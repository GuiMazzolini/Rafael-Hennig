'use client';

import React from 'react';
import { getSocialLinks, siteConfig } from '@/app/lib/site';

export const ContactSection: React.FC = () => {
  const socialLinks = getSocialLinks();

  return (
    <section
      id="contact"
      className="px-6 md:px-12 max-w-screen-2xl mx-auto pb-24 md:pb-40 scroll-mt-24"
    >
      <div className="pt-12 md:pt-24">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-12 text-neutral-900">
          Let&apos;s work together
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-neutral-700 mb-10 leading-relaxed text-base md:text-lg max-w-md">
              Whether you&apos;re looking for a creative partner or just want to say
              hello, I&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-xl md:text-2xl text-neutral-900 hover:opacity-60 transition-opacity"
              >
                {siteConfig.email}
              </a>

              {socialLinks.length > 0 && (
                <div className="flex gap-8 text-sm text-neutral-600">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
