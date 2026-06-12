import type { Metadata } from 'next';
import { getAboutData } from '@/app/lib/galleries';
import { siteConfig } from '@/app/lib/site';
import AboutClient from './AboutClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: siteConfig.description,
};

export default async function AboutPage() {
  const data = await getAboutData();

  return <AboutClient {...data} />;
}
