import { TMDBResponse, TMDBShow } from "@/types/tmdb/tmdb";
import { tmdbFetch } from "@/lib/tmdb/client";

export const showService = {
  getTrending: async (): Promise<TMDBShow[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/trending/tv/week", {
      params: { language: "pt-BR", page: 1 },
    });
    return data.results;
  },

  getPopular: async (): Promise<TMDBShow[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/tv/popular", {
      params: { language: "pt-BR", page: 1 },
    });
    return data.results;
  },

  getTopRated: async (): Promise<TMDBShow[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/tv/top_rated", {
      params: { language: "pt-BR", page: 1 },
    });
    return data.results;
  },

  getAiringToday: async (): Promise<TMDBShow[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/tv/airing_today", {
      params: { language: "pt-BR", page: 1 },
    });
    return data.results;
  },

  getByGenre: async (genreId: number): Promise<TMDBShow[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/discover/tv", {
      params: {
        language: "pt-BR",
        page: 1,
        with_genres: genreId,
      },
    });
    return data.results;
  },

  getDrama: async (): Promise<TMDBShow[]> => {
    return showService.getByGenre(18);
  },
};
