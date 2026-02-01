import { getGalleriesByCategory } from '@/app/lib/cloudinary';
import PhotographyPortfolioClient from './PhotographyPortfolioClient';

export default async function Home() {
  const analogGalleries = await getGalleriesByCategory('analog');
  const digitalGalleries = await getGalleriesByCategory('digital');

  return (
    <PhotographyPortfolioClient
      analogGalleries={analogGalleries}
      digitalGalleries={digitalGalleries}
    />
  );
}