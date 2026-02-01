import { v2 as cloudinary } from 'cloudinary';
import { Photo } from '@/app/components/sections/GallerySection';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type Gallery = {
  id: string;
  title: string;
  photos: Photo[];
};

export async function getGalleriesByCategory(
  category: 'analog' | 'digital'
): Promise<Gallery[]> {
  try {
    const result = await cloudinary.api.sub_folders(category);
    
    const galleries = await Promise.all(
      result.folders.map(async (folder: any) => {
        const photos = await cloudinary.api.resources({
          type: 'upload',
          prefix: `${category}/${folder.name}`,
          max_results: 500,
          resource_type: 'image',
        });

        return {
          id: folder.name,
          title: formatLocationName(folder.name),
          photos: photos.resources.map((photo: any) => ({
            src: buildCloudinaryUrl(photo.public_id),
            orientation: photo.height > photo.width ? 'portrait' as const : 'landscape' as const,
          })),
        };
      })
    );

    return galleries
      .filter(g => g.photos.length > 0)
      .sort((a, b) => a.title.localeCompare(b.title));
      
  } catch (error) {
    console.error(`Error fetching ${category} galleries:`, error);
    return [];
  }
}

function formatLocationName(folderName: string): string {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildCloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1200/${publicId}`;
}

export async function getGalleryByLocation(
  category: 'analog' | 'digital',
  location: string
): Promise<Gallery | null> {
  try {
    const photos = await cloudinary.api.resources({
      type: 'upload',
      prefix: `${category}/${location}`,
      max_results: 500,
      resource_type: 'image',
    });

    if (photos.resources.length === 0) return null;

    return {
      id: location,
      title: formatLocationName(location),
      photos: photos.resources.map((photo: any) => ({
        src: buildCloudinaryUrl(photo.public_id),
        orientation: photo.height > photo.width ? 'portrait' as const : 'landscape' as const,
      })),
    };
  } catch (error) {
    console.error(`Error fetching gallery ${category}/${location}:`, error);
    return null;
  }
}