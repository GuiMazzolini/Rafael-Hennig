import React from 'react';

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-sm bg-neutral-200/80 ${className}`} />;
}

export function HomeSkeleton() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="warm-surface pt-32 md:pt-48 pb-24 md:pb-32 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <SkeletonBlock className="h-16 md:h-24 w-4/5" />
            <SkeletonBlock className="h-12 md:h-16 w-3/5" />
            <SkeletonBlock className="h-20 w-full max-w-lg" />
            <SkeletonBlock className="h-5 w-28" />
          </div>
          <div className="hidden lg:flex justify-center">
            <SkeletonBlock className="aspect-[3/4] w-full max-w-[320px]" />
          </div>
        </div>
      </div>

      <div className="py-12 md:py-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <SkeletonBlock className="h-10 md:h-14 w-48 mb-8 md:mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBlock key={i} className="aspect-[3/4]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PhotosSkeleton() {
  return (
    <div className="relative warm-surface min-h-screen pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-10">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {Array.from({ length: 3 }).map((_, section) => (
        <div key={section} className="py-6 md:py-10">
          <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-6 md:mb-8">
            <SkeletonBlock className="h-10 md:h-14 w-40" />
          </div>
          <div className="px-6 md:px-12 max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonBlock key={i} className="aspect-square" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function VideosSkeleton() {
  return (
    <div className="relative warm-surface min-h-screen pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="px-6 md:px-12 max-w-7xl mx-auto space-y-14 md:space-y-20">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-5">
            <SkeletonBlock className="aspect-video" />
            <SkeletonBlock className="h-8 w-2/3" />
            <SkeletonBlock className="h-16 w-full max-w-4xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="relative warm-surface min-h-screen pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div className="space-y-6">
          <SkeletonBlock className="h-12 md:h-16 w-40" />
          <SkeletonBlock className="h-24 w-full max-w-xl" />
          <SkeletonBlock className="h-24 w-full max-w-xl" />
          <SkeletonBlock className="h-20 w-full max-w-xl" />
        </div>
        <SkeletonBlock className="aspect-4/5 w-full max-w-[300px] mx-auto lg:ml-auto" />
      </div>
    </div>
  );
}
