import { TMDBMovie, TMDBResponse, TMDBShow } from "@/types/tmdb/tmdb";
import { tmdbFetch } from "../client";

export const searchService = {
  searchMovies: async (query: string): Promise<TMDBMovie[]> => {
    if (!query || query.trim().length < 2) return [];

    try {
      const data = await tmdbFetch<TMDBResponse<TMDBMovie>>("/search/movie", {
        params: {
          query: query.trim(),
          language: "pt-BR",
          page: 1,
        },
      });

      return data.results;
    } catch (error) {
      console.error("❌ Error searching movies:", error);
      return [];
    }
  },

  searchShows: async (query: string): Promise<TMDBShow[]> => {
    if (!query || query.trim().length < 2) return [];

    try {
      const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/search/tv", {
        params: {
          query: query.trim(),
          language: "pt-BR",
          page: 1,
        },
      });

      return data.results;
    } catch (error) {
      console.error("❌ Error searching shows:", error);
      return [];
    }
  },

  searchAll: async (query: string) => {
    const [movies, shows] = await Promise.all([
      searchService.searchMovies(query),
      searchService.searchShows(query),
    ]);

    return { movies, shows };
  },
};
