import {
  MovieCredits,
  MovieDetails,
  MovieVideos,
} from "@/types/tmdb/movie-details";
import { tmdbFetch } from "../client";

export const movieDetailsService = {
  getDetails: async (movieId: string): Promise<MovieDetails> => {
    return tmdbFetch<MovieDetails>(`/movie/${movieId}`, {
      params: {
        language: "pt-BR",
      },
    });
  },

  getCredits: async (movieId: string): Promise<MovieCredits> => {
    return tmdbFetch<MovieCredits>(`/movie/${movieId}/credits`, {
      params: {
        language: "pt-BR",
      },
    });
  },

  getVideos: async (movieId: string): Promise<MovieVideos> => {
    return tmdbFetch<MovieVideos>(`/movie/${movieId}/videos`, {
      params: {
        language: "pt-BR",
      },
    });
  },
};
