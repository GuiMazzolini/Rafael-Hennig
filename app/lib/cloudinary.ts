import { v2 as cloudinary } from 'cloudinary';
import type {
  GalleryFetchResult,
  Photo,
  Video,
  VideoFetchResult,
} from '@/app/lib/types';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryFolder = {
  name: string;
};

type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  created_at?: string;
};

function formatLocationName(folderName: string): string {
  return folderName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildCloudinaryUrl(publicId: string, width: number): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
}

function buildCloudinaryVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/${publicId}`;
}

function buildVideoPosterUrl(publicId: string): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_0,w_800,f_auto,q_auto/${publicId}.jpg`;
}

function mapResourceToPhoto(resource: CloudinaryResource): Photo {
  return {
    src: buildCloudinaryUrl(resource.public_id, 600),
    fullSrc: buildCloudinaryUrl(resource.public_id, 2400),
    orientation: resource.height > resource.width ? 'portrait' : 'landscape',
  };
}

function mapResourceToVideo(resource: CloudinaryResource): Video {
  const name = resource.public_id.split('/').pop() ?? resource.public_id;

  return {
    id: resource.public_id,
    title: formatLocationName(name.replace(/\.[^.]+$/, '')),
    src: buildCloudinaryVideoUrl(resource.public_id),
    poster: buildVideoPosterUrl(resource.public_id),
  };
}

async function searchRecentImages(
  folderPrefix: string,
  limit: number,
): Promise<CloudinaryResource[]> {
  const result = await cloudinary.search
    .expression(`resource_type:image AND asset_folder:${folderPrefix}/*`)
    .sort_by('created_at', 'desc')
    .max_results(limit)
    .execute();

  return result.resources as CloudinaryResource[];
}

export async function getNewestPhotos(limit = 5): Promise<Photo[]> {
  try {
    const [analog, digital] = await Promise.all([
      searchRecentImages('analog', limit),
      searchRecentImages('digital', limit),
    ]);

    const merged = [...analog, ...digital]
      .sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime(),
      )
      .slice(0, limit);

    return merged.map(mapResourceToPhoto);
  } catch (error) {
    console.error('Error fetching newest photos:', error);
    return [];
  }
}

export async function getGalleriesByCategory(
  category: 'analog' | 'digital',
): Promise<GalleryFetchResult> {
  try {
    const result = await cloudinary.api.sub_folders(category, {
      max_results: 500,
    });

    const galleries = await Promise.all(
      (result.folders as CloudinaryFolder[]).map(async (folder) => {
        const photos = await cloudinary.search
          .expression(`asset_folder=${category}/${folder.name}`)
          .sort_by('created_at', 'asc')
          .max_results(500)
          .execute();

        return {
          id: folder.name,
          title: formatLocationName(folder.name),
          photos: (photos.resources as CloudinaryResource[]).map(
            mapResourceToPhoto,
          ),
        };
      }),
    );

    return {
      galleries: galleries
        .filter((gallery) => gallery.photos.length > 0)
        .sort((a, b) => a.id.localeCompare(b.id)),
      failed: false,
    };
  } catch (error) {
    console.error(`Error fetching ${category} galleries:`, error);
    return { galleries: [], failed: true };
  }
}

export async function getVideos(): Promise<VideoFetchResult> {
  try {
    const result = await cloudinary.search
      .expression('resource_type:video AND asset_folder:videos/*')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    return {
      videos: (result.resources as CloudinaryResource[]).map(mapResourceToVideo),
      failed: false,
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { videos: [], failed: true };
  }
}

export async function getAboutPhotoUrl(): Promise<string | null> {
  try {
    const result = await cloudinary.search
      .expression('asset_folder=about')
      .sort_by('created_at', 'desc')
      .max_results(1)
      .execute();

    const resource = result.resources[0] as CloudinaryResource | undefined;
    if (!resource) return null;

    return buildCloudinaryUrl(resource.public_id, 800);
  } catch (error) {
    console.error('Error fetching about photo:', error);
    return null;
  }
}
