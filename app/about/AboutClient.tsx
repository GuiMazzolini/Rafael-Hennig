'use client';

import React from 'react';
import { SiteShell } from '@/app/components/layout/SiteShell';
import { PageShell } from '@/app/components/layout/PageShell';
import { AboutSection } from '@/app/components/sections/AboutSection';

interface AboutClientProps {
  aboutPhotoUrl: string | null;
}

const AboutClient: React.FC<AboutClientProps> = ({ aboutPhotoUrl }) => {
  return (
    <SiteShell>
      <PageShell>
        <AboutSection aboutPhotoUrl={aboutPhotoUrl} />
      </PageShell>
    </SiteShell>
  );
};

export default AboutClient;
