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
