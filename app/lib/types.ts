export type Photo = {
  publicId: string;
  src: string;
  fullSrc: string;
  tags: string[];
  orientation: 'portrait' | 'landscape';
};

export type Gallery = {
  id: string;
  title: string;
  photos: Photo[];
};

export type GalleryFetchResult = {
  galleries: Gallery[];
  failed: boolean;
};

export type Video = {
  id: string;
  title: string;
  description: string | null;
  embedUrl: string;
  poster: string;
  link: string;
};

export type VideoFetchResult = {
  videos: Video[];
  failed: boolean;
};
