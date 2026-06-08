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
        <div className="px-6 md:px-12 pb-24 md:pb-40 max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {videos.map((video) => (
            <article key={video.id} className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-sm bg-neutral-900">
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-lg md:text-xl font-light text-neutral-800">
                {video.title}
              </h2>
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
