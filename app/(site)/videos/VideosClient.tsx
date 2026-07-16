'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { SiteShell } from '@/app/components/layout/SiteShell';
import { PageShell } from '@/app/components/layout/PageShell';
import type { Video } from '@/app/lib/types';

interface VideosClientProps {
  videos: Video[];
  videosLoadFailed: boolean;
}

function VideoPlayer({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-sm bg-neutral-900 shadow-sm">
      {playing ? (
        <iframe
          src={`${video.embedUrl}?badge=0&autopause=0&autoplay=1`}
          title={video.title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 group cursor-pointer"
          aria-label={`Play ${video.title}`}
        >
          {video.poster ? (
            <Image
              src={video.poster}
              alt={`${video.title} still`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-800" />
          )}

          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform duration-300 group-hover:scale-105">
              <Play size={28} className="ml-1" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

const VideosClient: React.FC<VideosClientProps> = ({
  videos,
  videosLoadFailed,
}) => {
  return (
    <SiteShell>
      <PageShell>
        {videosLoadFailed && (
          <div
            role="alert"
            className="px-6 md:px-12 py-16 text-center text-neutral-600 max-w-screen-2xl mx-auto"
          >
            Unable to load videos. Please try again later.
          </div>
        )}

        {!videosLoadFailed && videos.length > 0 && (
          <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-14 md:space-y-20">
            {videos.map((video) => (
              <article key={video.id} className="space-y-5">
                <VideoPlayer video={video} />

                <div className="space-y-2 border-t border-neutral-400/40 pt-5">
                  <h2 className="text-xl md:text-2xl font-light text-neutral-900">
                    {video.title}
                  </h2>
                  {video.description && (
                    <p className="text-neutral-700 leading-relaxed max-w-4xl whitespace-pre-line">
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
      </PageShell>
    </SiteShell>
  );
};

export default VideosClient;
