import type { Video, VideoFetchResult } from '@/app/lib/types';

const VIMEO_API = 'https://api.vimeo.com';
const VIDEO_FIELDS =
  'uri,name,description,link,player_embed_url,pictures.sizes';

type VimeoPicture = {
  width: number;
  link: string;
};

type VimeoVideo = {
  uri: string;
  name: string;
  description: string | null;
  link: string;
  player_embed_url: string;
  pictures?: {
    sizes: VimeoPicture[];
  };
};

type VimeoListResponse = {
  data: VimeoVideo[];
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function getPoster(video: VimeoVideo): string {
  const sizes = video.pictures?.sizes ?? [];
  if (sizes.length === 0) return '';

  return [...sizes].sort((a, b) => b.width - a.width)[0].link;
}

function mapVimeoVideo(video: VimeoVideo): Video {
  const id = video.uri.split('/').pop() ?? video.uri;
  const description = video.description
    ? stripHtml(video.description)
    : null;

  return {
    id,
    title: video.name,
    description: description || null,
    embedUrl: video.player_embed_url,
    poster: getPoster(video),
    link: video.link,
  };
}

function buildVideosPath(): string {
  const userId = process.env.VIMEO_USER_ID;
  const albumId = process.env.VIMEO_ALBUM_ID;

  if (userId && albumId) {
    return `/users/${userId}/albums/${albumId}/videos`;
  }

  if (userId) {
    return `/users/${userId}/videos`;
  }

  return '/me/videos';
}

export async function getVideos(): Promise<VideoFetchResult> {
  const token = process.env.VIMEO_ACCESS_TOKEN;

  if (!token) {
    console.error('VIMEO_ACCESS_TOKEN is not set');
    return { videos: [], failed: true };
  }

  try {
    const path = buildVideosPath();
    const url = new URL(`${VIMEO_API}${path}`);
    url.searchParams.set('per_page', '100');
    url.searchParams.set('sort', 'date');
    url.searchParams.set('direction', 'desc');
    url.searchParams.set('fields', VIDEO_FIELDS);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `bearer ${token}`,
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`Vimeo API error: ${response.status} ${response.statusText}`);
      return { videos: [], failed: true };
    }

    const data = (await response.json()) as VimeoListResponse;

    return {
      videos: data.data.map(mapVimeoVideo),
      failed: false,
    };
  } catch (error) {
    console.error('Error fetching Vimeo videos:', error);
    return { videos: [], failed: true };
  }
}
