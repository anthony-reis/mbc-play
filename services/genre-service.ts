import { TMDBMovie, TMDBResponse, TMDBShow } from "@/types/tmdb/tmdb";
import { tmdbFetch } from "@/lib/tmdb/client";
import { getMovieGenreId, getTvGenreId } from "@/lib/tmdb/constants/genres";

export const genreService = {
  getMoviesByGenreName: async (genreName: string): Promise<TMDBMovie[]> => {
    const genreId = getMovieGenreId(genreName);

    console.log("🎬 Fetching movies for genre:", genreName, "ID:", genreId);

    if (!genreId) {
      return [];
    }

    try {
      const data = await tmdbFetch<TMDBResponse<TMDBMovie>>("/discover/movie", {
        params: {
          language: "pt-BR",
          page: 1,
          with_genres: genreId,
          sort_by: "popularity.desc",
        },
      });

      return data.results;
    } catch (error) {
      return [];
    }
  },

  getShowsByGenreName: async (genreName: string): Promise<TMDBShow[]> => {
    const genreId = getTvGenreId(genreName);

    if (!genreId) {
      return [];
    }

    try {
      const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/discover/tv", {
        params: {
          language: "pt-BR",
          page: 1,
          with_genres: genreId,
          sort_by: "popularity.desc",
        },
      });

      return data.results;
    } catch (error) {
      throw error;
    }
  },

  getMediaByGenreName: async (genreName: string) => {
    const [movies, shows] = await Promise.all([
      genreService.getMoviesByGenreName(genreName),
      genreService.getShowsByGenreName(genreName),
    ]);

    return { movies, shows };
  },
};
