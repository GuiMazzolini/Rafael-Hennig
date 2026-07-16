export const manualPhotoTags: Record<string, string[]> = {};

export function getManualTagsForPublicId(publicId: string): string[] {
  return manualPhotoTags[publicId] ?? [];
}
