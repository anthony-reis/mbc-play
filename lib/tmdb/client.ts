const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org";

export interface TMDBFetchOptions {
  params?: Record<string, string | number | boolean>;
  cache?: RequestCache;
}

function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

export async function tmdbFetch<T>(
  endpoint: string,
  options?: TMDBFetchOptions,
): Promise<T> {
  const url = buildUrl(endpoint, options?.params);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("TMDB API Error:", error);
    throw error;
  }
}

type PosterSize = "w185" | "w342" | "w500" | "original";
type BackdropSize = "w780" | "w1280" | "original";
type ProfileSize = "w185" | "h632" | "original";

export const getImageUrl = {
  poster: (path: string | null, size: PosterSize = "w500"): string | null => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/t/p/${size}${path}`;
  },

  backdrop: (
    path: string | null,
    size: BackdropSize = "original",
  ): string | null => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/t/p/${size}${path}`;
  },

  profile: (path: string | null, size: ProfileSize = "w185"): string | null => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/t/p/${size}${path}`;
  },
};
