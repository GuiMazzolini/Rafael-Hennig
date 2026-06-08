export type Photo = {
  src: string;
  fullSrc: string;
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
  src: string;
  poster: string;
};

export type VideoFetchResult = {
  videos: Video[];
  failed: boolean;
};
