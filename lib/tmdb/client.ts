const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const tmdbConfig = {
  baseUrl: TMDB_BASE_URL,
  imageBase: TMDB_IMAGE_BASE,
  apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
};

export async function tmdbFetch<T>(
  endpoint: string,
  options?: {
    params?: Record<string, string | number>;
    cache?: RequestCache;
    revalidate?: number;
  },
): Promise<T> {
  const {
    params = {},
    cache = "force-cache",
    revalidate = 3600,
  } = options || {};

  const url = new URL(`${tmdbConfig.baseUrl}${endpoint}`);

  url.searchParams.append("api_key", tmdbConfig.apiKey || "");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString(), {
    next: { revalidate },
    cache,
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.statusText}`);
  }

  return response.json();
}

export const getImageUrl = {
  poster: (
    path: string,
    size: "w185" | "w342" | "w500" | "original" = "w500",
  ) => (path ? `${tmdbConfig.imageBase}/${size}${path}` : null),

  backdrop: (path: string, size: "w780" | "w1280" | "original" = "original") =>
    path ? `${tmdbConfig.imageBase}/${size}${path}` : null,
};
