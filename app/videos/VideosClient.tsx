'use client';

import React from 'react';
import { SiteShell } from '@/app/components/layout/SiteShell';
import type { Video } from '@/app/lib/types';

interface VideosClientProps {
  videos: Video[];
  videosLoadFailed: boolean;
}

const VideosClient: React.FC<VideosClientProps> = ({
  videos,
  videosLoadFailed,
}) => {
  return (
    <SiteShell>
      <header className="pt-32 md:pt-48 pb-8 md:pb-12 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900">
          Films
        </h1>
        <p className="mt-4 text-neutral-600 max-w-lg">
          Cinematography and moving image work.
        </p>
      </header>

      {videosLoadFailed && (
        <div
          role="alert"
          className="px-6 md:px-12 py-16 text-center text-neutral-600 max-w-screen-2xl mx-auto"
        >
          Unable to load videos. Please try again later.
        </div>
      )}

      {!videosLoadFailed && videos.length > 0 && (
        <div className="px-6 md:px-12 pb-24 md:pb-40 max-w-screen-2xl mx-auto space-y-12 md:space-y-16">
          {videos.map((video) => (
            <article key={video.id} className="space-y-5">
              <div className="relative aspect-video overflow-hidden rounded-sm bg-neutral-900">
                <iframe
                  src={`${video.embedUrl}?badge=0&autopause=0`}
                  title={video.title}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-light text-neutral-900">
                  {video.title}
                </h2>
                {video.description && (
                  <p className="text-neutral-600 leading-relaxed max-w-3xl whitespace-pre-line">
                    {video.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {!videosLoadFailed && videos.length === 0 && (
        <p className="px-6 md:px-12 py-16 text-center text-neutral-600">
          No videos yet.
        </p>
      )}
    </SiteShell>
  );
};

export default VideosClient;
