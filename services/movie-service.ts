import { tmdbFetch } from "@/lib/tmdb/client";
import { TMDBMovie, TMDBResponse } from "@/types/tmdb/tmdb";

export const movieService = {
  getTrending: async (): Promise<TMDBMovie[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBMovie>>(
      "/trending/movie/week",
      {
        params: { language: "pt-BR", page: 1 },
      },
    );
    return data.results;
  },

  getUpcoming: async (): Promise<TMDBMovie[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBMovie>>("/movie/upcoming", {
      params: { language: "pt-BR", page: 1 },
    });
    return data.results;
  },

  getTopRated: async (): Promise<TMDBMovie[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBMovie>>("/movie/top_rated", {
      params: { language: "pt-BR", page: 1 },
    });
    return data.results;
  },

  getByGenre: async (genreId: number): Promise<TMDBMovie[]> => {
    const data = await tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/movie", {
      params: {
        language: "pt-BR",
        page: 1,
        with_genres: genreId,
      },
    });
    return data.results;
  },

  getAction: async (): Promise<TMDBMovie[]> => {
    return movieService.getByGenre(28);
  },
};
