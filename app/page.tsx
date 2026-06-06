import type { Metadata } from 'next';
import { getPortfolioData } from '@/app/lib/galleries';
import { siteConfig } from '@/app/lib/site';
import PhotographyPortfolioClient from './PhotographyPortfolioClient';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { ogImage } = await getPortfolioData();

  return {
    title: `${siteConfig.name} - Photographer & Cinematographer`,
    description: siteConfig.description,
    openGraph: {
      title: `${siteConfig.name} - Photographer & Cinematographer`,
      description: siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: 'website',
      ...(ogImage && {
        images: [{ url: ogImage, width: 2400, height: 1600, alt: siteConfig.name }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} - Photographer & Cinematographer`,
      description: siteConfig.description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function Home() {
  const data = await getPortfolioData();

  return <PhotographyPortfolioClient {...data} />;
}
