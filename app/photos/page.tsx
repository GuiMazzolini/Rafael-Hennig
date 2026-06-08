import type { Metadata } from 'next';
import { getPhotosData } from '@/app/lib/galleries';
import { siteConfig } from '@/app/lib/site';
import PhotosClient from './PhotosClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Photos — ${siteConfig.name}`,
  description: 'Analog and digital photography by Rafael Hennig.',
};

export default async function PhotosPage() {
  const data = await getPhotosData();

  return <PhotosClient {...data} />;
}
