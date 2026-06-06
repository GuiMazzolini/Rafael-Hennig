import { cache } from 'react';
import {
  getAboutPhotoUrl,
  getGalleriesByCategory,
} from '@/app/lib/cloudinary';
import type { Gallery } from '@/app/lib/types';

type PortfolioData = {
  analogGalleries: Gallery[];
  digitalGalleries: Gallery[];
  galleryLoadFailed: boolean;
  aboutPhotoUrl: string | null;
  ogImage: string | null;
};

export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const [analog, digital, aboutPhotoUrl] = await Promise.all([
    getGalleriesByCategory('analog'),
    getGalleriesByCategory('digital'),
    getAboutPhotoUrl(),
  ]);

  const ogImage =
    analog.galleries[0]?.photos[0]?.fullSrc ??
    digital.galleries[0]?.photos[0]?.fullSrc ??
    aboutPhotoUrl;

  return {
    analogGalleries: analog.galleries,
    digitalGalleries: digital.galleries,
    galleryLoadFailed: analog.failed || digital.failed,
    aboutPhotoUrl,
    ogImage,
  };
});
