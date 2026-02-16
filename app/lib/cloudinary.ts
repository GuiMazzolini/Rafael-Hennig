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

type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
};

export async function getGalleriesByCategory(
  category: 'analog' | 'digital',
): Promise<Gallery[]> {
  try {
    const result = await cloudinary.api.sub_folders(category, {
      max_results: 500,
    });

    const galleries = await Promise.all(
      result.folders.map(async (folder: any) => {
        const photos = await cloudinary.search
          .expression(`asset_folder=${category}/${folder.name}`)
          .sort_by('created_at', 'asc')
          .max_results(500)
          .execute();

        return {
          id: folder.name,
          title: formatLocationName(folder.name),
          photos: photos.resources.map((photo: CloudinaryResource) => ({
            src: buildCloudinaryUrl(photo.public_id),
            orientation: photo.height > photo.width ? 'portrait' : 'landscape',
          })),
        };
      }),
    );

    return galleries
      .filter((g) => g.photos.length > 0)
      .sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error(`Error fetching ${category} galleries:`, error);
    return [];
  }
}

function formatLocationName(folderName: string): string {
  return folderName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildCloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1200/${publicId}`;
}

export async function getGalleryByLocation(
  category: 'analog' | 'digital',
  location: string,
): Promise<Gallery | null> {
  try {
    const photos = await cloudinary.search
      .expression(`asset_folder=${category}/${location}`)
      .sort_by('created_at', 'asc')
      .max_results(500)
      .execute();

    if (photos.resources.length === 0) return null;

    return {
      id: location,
      title: formatLocationName(location),
      photos: photos.resources.map((photo: any) => ({
        src: buildCloudinaryUrl(photo.public_id),
        orientation:
          photo.height > photo.width ? 'portrait' : 'landscape',
      })),
    };
  } catch (error) {
    console.error(`Error fetching gallery ${category}/${location}:`, error);
    return null;
  }
}
