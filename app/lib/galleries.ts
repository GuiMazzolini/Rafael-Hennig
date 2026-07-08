import { cache } from 'react';
import {
  getAboutPhotoUrl,
  getGalleriesByCategory,
  getNewestPhotos,
} from '@/app/lib/cloudinary';
import { getVideos } from '@/app/lib/vimeo';
import type { Gallery, Photo, Video } from '@/app/lib/types';

type HomeData = {
  newestPhotos: Photo[];
  ogImage: string | null;
};

type AboutData = {
  aboutPhotoUrl: string | null;
};

type PhotosData = {
  vaoGalleries: Gallery[];
  caminhoGalleries: Gallery[];
  mareGalleries: Gallery[];
  galleryLoadFailed: boolean;
};

type VideosData = {
  videos: Video[];
  videosLoadFailed: boolean;
};

export const getHomeData = cache(async (): Promise<HomeData> => {
  const newestPhotos = await getNewestPhotos(5);
  const ogImage = newestPhotos[0]?.fullSrc ?? null;

  return { newestPhotos, ogImage };
});

export const getAboutData = cache(async (): Promise<AboutData> => {
  const aboutPhotoUrl = await getAboutPhotoUrl();

  return { aboutPhotoUrl };
});

export const getPhotosData = cache(async (): Promise<PhotosData> => {
  const [vao, caminho, mare] = await Promise.all([
    getGalleriesByCategory('Vão'),
    getGalleriesByCategory('Caminho'),
    getGalleriesByCategory('Maré'),
  ]);

  return {
    vaoGalleries: vao.galleries,
    caminhoGalleries: caminho.galleries,
    mareGalleries: mare.galleries,
    galleryLoadFailed: vao.failed || caminho.failed || mare.failed,
  };
});

export const getVideosData = cache(async (): Promise<VideosData> => {
  const result = await getVideos();

  return {
    videos: result.videos,
    videosLoadFailed: result.failed,
  };
});
