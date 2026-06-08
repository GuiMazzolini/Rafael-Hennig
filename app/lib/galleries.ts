import { cache } from 'react';
import {
  getAboutPhotoUrl,
  getGalleriesByCategory,
  getNewestPhotos,
  getVideos,
} from '@/app/lib/cloudinary';
import type { Gallery, Photo, Video } from '@/app/lib/types';

type HomeData = {
  newestPhotos: Photo[];
  aboutPhotoUrl: string | null;
  ogImage: string | null;
};

type PhotosData = {
  analogGalleries: Gallery[];
  digitalGalleries: Gallery[];
  galleryLoadFailed: boolean;
};

type VideosData = {
  videos: Video[];
  videosLoadFailed: boolean;
};

export const getHomeData = cache(async (): Promise<HomeData> => {
  const [newestPhotos, aboutPhotoUrl] = await Promise.all([
    getNewestPhotos(5),
    getAboutPhotoUrl(),
  ]);

  const ogImage = newestPhotos[0]?.fullSrc ?? aboutPhotoUrl;

  return { newestPhotos, aboutPhotoUrl, ogImage };
});

export const getPhotosData = cache(async (): Promise<PhotosData> => {
  const [analog, digital] = await Promise.all([
    getGalleriesByCategory('analog'),
    getGalleriesByCategory('digital'),
  ]);

  return {
    analogGalleries: analog.galleries,
    digitalGalleries: digital.galleries,
    galleryLoadFailed: analog.failed || digital.failed,
  };
});

export const getVideosData = cache(async (): Promise<VideosData> => {
  const result = await getVideos();

  return {
    videos: result.videos,
    videosLoadFailed: result.failed,
  };
});
