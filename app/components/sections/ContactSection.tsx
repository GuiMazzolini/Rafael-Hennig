'use client';

import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { getSocialLinks } from '@/app/lib/site';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function getFormspreeEndpoint(): string | null {
  const value = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
  if (!value) return null;

  // Accept either the form ID (`maqrbbzr`) or the full Formspree URL.
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value.replace(/\/$/, '');
  }

  return `https://formspree.io/f/${value}`;
}

const FORMSPREE_ENDPOINT = getFormspreeEndpoint();

export const ContactSection: React.FC = () => {
  const instagram = getSocialLinks().find((link) => link.label === 'Instagram');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      form.reset();
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 warm-surface">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="relative px-6 md:px-12 max-w-screen-2xl mx-auto py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6 text-neutral-900">
              Let&apos;s work together
            </h2>

            <p className="text-neutral-700 mb-8 leading-relaxed text-base md:text-lg max-w-md">
              Whether you&apos;re looking for a creative partner or just want to
              say hello, I&apos;d love to hear from you.
            </p>

            {instagram && (
              <a
                href={instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                <Instagram size={26} strokeWidth={1.5} />
              </a>
            )}
          </div>

          <div>
            {status === 'success' ? (
              <div className="space-y-4">
                <p className="text-xl font-light text-neutral-900">
                  Thanks — your message was sent.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="block text-sm text-neutral-600"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full bg-transparent border-b border-neutral-400/60 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm text-neutral-600"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-transparent border-b border-neutral-400/60 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm text-neutral-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-neutral-400/60 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors resize-y min-h-[120px]"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {status === 'error' && errorMessage && (
                  <p role="alert" className="text-sm text-red-700">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || !FORMSPREE_ENDPOINT}
                  className="mt-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full text-sm font-light hover:bg-neutral-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
