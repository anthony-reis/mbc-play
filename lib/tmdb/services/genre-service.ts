// lib/tmdb/services/genre.service.ts
import { TMDBMovie, TMDBResponse, TMDBShow } from "@/types/tmdb/tmdb";
import { tmdbFetch } from "../client";
import { getMovieGenreId, getTvGenreId } from "../constants/genres";

export const genreService = {
  getMoviesByGenreName: async (genreName: string): Promise<TMDBMovie[]> => {
    const genreId = getMovieGenreId(genreName);

    console.log("🎬 Fetching movies for genre:", genreName, "ID:", genreId);

    if (!genreId) {
      console.error("❌ Invalid movie genre:", genreName);
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

      console.log("✅ Movies fetched:", data.results.length);
      return data.results;
    } catch (error) {
      console.error("❌ Error fetching movies:", error);
      return [];
    }
  },

  getShowsByGenreName: async (genreName: string): Promise<TMDBShow[]> => {
    const genreId = getTvGenreId(genreName);

    console.log("📺 Fetching shows for genre:", genreName, "ID:", genreId);

    if (!genreId) {
      console.error("❌ Invalid TV genre:", genreName);
      return [];
    }

    // 🔍 DEBUG: Mostrar URL completa
    const debugUrl = `https://api.themoviedb.org/3/discover/tv?api_key=***&language=pt-BR&page=1&with_genres=${genreId}&sort_by=popularity.desc`;
    console.log("📺 URL:", debugUrl);

    try {
      const data = await tmdbFetch<TMDBResponse<TMDBShow>>("/discover/tv", {
        params: {
          language: "pt-BR",
          page: 1,
          with_genres: genreId,
          sort_by: "popularity.desc",
        },
      });

      console.log("✅ Shows fetched:", data.results.length);
      console.log("📺 First show:", data.results[0]); // Ver primeiro resultado
      return data.results;
    } catch (error) {
      console.error("❌ Error fetching shows:", error);
      throw error; // Re-lança para ver o erro
    }
  },

  getMediaByGenreName: async (genreName: string) => {
    console.log("🔍 Fetching media for genre:", genreName);

    const [movies, shows] = await Promise.all([
      genreService.getMoviesByGenreName(genreName),
      genreService.getShowsByGenreName(genreName),
    ]);

    console.log("🔍 Media fetched:", {
      movies: movies.length,
      shows: shows.length,
    });

    return { movies, shows };
  },
};
