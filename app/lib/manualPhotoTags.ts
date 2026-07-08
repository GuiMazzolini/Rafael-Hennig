// Manual per-photo tags for the filter UI.
// Key it by Cloudinary `public_id`.
//
// Example:
//   'Vão/berlin/photo1.jpg': ['35mm', 'color', 'Berlin']
//
// These tags are merged with any tags Cloudinary may return for the asset.
export const manualPhotoTags: Record<string, string[]> = {};

export function getManualTagsForPublicId(publicId: string): string[] {
  return manualPhotoTags[publicId] ?? [];
}

