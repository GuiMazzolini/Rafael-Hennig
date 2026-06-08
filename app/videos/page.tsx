import type { Metadata } from 'next';
import { getVideosData } from '@/app/lib/galleries';
import { siteConfig } from '@/app/lib/site';
import VideosClient from './VideosClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Films — ${siteConfig.name}`,
  description: 'Cinematography and film work by Rafael Hennig.',
};

export default async function VideosPage() {
  const data = await getVideosData();

  return <VideosClient {...data} />;
}
