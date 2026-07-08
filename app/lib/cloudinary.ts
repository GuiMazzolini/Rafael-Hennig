import { v2 as cloudinary } from 'cloudinary';
import type { GalleryFetchResult, Photo } from '@/app/lib/types';
import { getManualTagsForPublicId } from '@/app/lib/manualPhotoTags';

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
  tags?: string[];
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

function mapResourceToPhoto(
  resource: CloudinaryResource,
  extraTags: string[],
): Photo {
  const cloudinaryTags = resource.tags ?? [];
  const manualTags = getManualTagsForPublicId(resource.public_id);
  const tags = Array.from(
    new Set<string>([...extraTags, ...cloudinaryTags, ...manualTags]),
  );

  return {
    publicId: resource.public_id,
    src: buildCloudinaryUrl(resource.public_id, 600),
    fullSrc: buildCloudinaryUrl(resource.public_id, 2400),
    tags,
    orientation: resource.height > resource.width ? 'portrait' : 'landscape',
  };
}

async function searchImagesInFolder(
  folderPrefix: string,
  limit: number,
): Promise<CloudinaryResource[]> {
  const [nested, direct] = await Promise.all([
    cloudinary.search
      .expression(`resource_type:image AND asset_folder:${folderPrefix}/*`)
      .sort_by('created_at', 'desc')
      .fields('tags')
      .max_results(limit)
      .execute(),
    cloudinary.search
      .expression(`resource_type:image AND asset_folder:${folderPrefix}`)
      .sort_by('created_at', 'desc')
      .fields('tags')
      .max_results(limit)
      .execute(),
  ]);

  const nestedResources = nested.resources as CloudinaryResource[];
  const directResources = direct.resources as CloudinaryResource[];

  const byId = new Map<string, CloudinaryResource>();
  for (const r of [...directResources, ...nestedResources]) {
    byId.set(r.public_id, r);
  }

  const merged = Array.from(byId.values()).sort(
    (a, b) =>
      new Date(b.created_at ?? 0).getTime() -
      new Date(a.created_at ?? 0).getTime(),
  );

  return merged.slice(0, limit);
}

const PHOTO_COLLECTIONS = ['Vão', 'Caminho', 'Maré'];

export async function getNewestPhotos(limit = 5): Promise<Photo[]> {
  try {
    const [vao, caminho, mare] = await Promise.all([
      searchImagesInFolder(PHOTO_COLLECTIONS[0]!, limit),
      searchImagesInFolder(PHOTO_COLLECTIONS[1]!, limit),
      searchImagesInFolder(PHOTO_COLLECTIONS[2]!, limit),
    ]);

    type TaggedResource = { resource: CloudinaryResource; tags: string[] };
    const tagged: TaggedResource[] = [
      ...vao.map((resource) => ({
        resource,
        tags: [PHOTO_COLLECTIONS[0]!],
      })),
      ...caminho.map((resource) => ({
        resource,
        tags: [PHOTO_COLLECTIONS[1]!],
      })),
      ...mare.map((resource) => ({
        resource,
        tags: [PHOTO_COLLECTIONS[2]!],
      })),
    ];

    const newest = tagged
      .sort(
        (a, b) =>
          new Date(b.resource.created_at ?? 0).getTime() -
          new Date(a.resource.created_at ?? 0).getTime(),
      )
      .slice(0, limit);

    return newest.map((t) => mapResourceToPhoto(t.resource, t.tags));
  } catch (error) {
    console.error('Error fetching newest photos:', error);
    return [];
  }
}

export async function getGalleriesByCategory(
  category: string,
): Promise<GalleryFetchResult> {
  try {
    const result = await cloudinary.api.sub_folders(category, {
      max_results: 500,
    });

    const folders = (result.folders ?? []) as CloudinaryFolder[];

    // If the user organizes photos directly under `Vão/` (no nested folders like `Berlin/`),
    // show a single gallery for the whole collection.
    if (folders.length === 0) {
      const photoResources = await searchImagesInFolder(category, 500);

      return {
        galleries: photoResources.length
          ? [
              {
                id: category,
                // Title is intentionally empty so we don't duplicate the section title ("Vão").
                title: '',
                photos: photoResources.map((r) => mapResourceToPhoto(r, [category])),
              },
            ]
          : [],
        failed: false,
      };
    }

    const galleries = await Promise.all(
      folders.map(async (folder) => {
        const photos = await cloudinary.search
          .expression(
            `resource_type:image AND asset_folder:${category}/${folder.name}/*`,
          )
          .sort_by('created_at', 'asc')
          .fields('tags')
          .max_results(500)
          .execute();

        const photoResources = photos.resources as CloudinaryResource[];
        const locationTag = formatLocationName(folder.name);
        const extraTags = [category, locationTag];

        return {
          id: folder.name,
          title: locationTag,
          photos: photoResources.map((r) => mapResourceToPhoto(r, extraTags)),
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
