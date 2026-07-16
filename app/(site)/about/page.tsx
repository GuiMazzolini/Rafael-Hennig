import type { Metadata } from 'next';
import { SiteShell } from '@/app/components/layout/SiteShell';
import { PageShell } from '@/app/components/layout/PageShell';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { getAboutData } from '@/app/lib/galleries';
import { siteConfig } from '@/app/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: siteConfig.description,
};

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <SiteShell>
      <PageShell>
        <AboutSection aboutPhotoUrl={data.aboutPhotoUrl} />
      </PageShell>
    </SiteShell>
  );
}
