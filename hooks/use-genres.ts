"use client";

import { useQuery } from "@tanstack/react-query";
import { genreService } from "../services/genre-service";
import { genreKeys } from "@/lib/tmdb/queries/keys";

export function useMoviesByGenre(genreName: string) {
  return useQuery({
    queryKey: genreKeys.movies(genreName),
    queryFn: () => genreService.getMoviesByGenreName(genreName),
    enabled: !!genreName,
  });
}

export function useShowsByGenre(genreName: string) {
  return useQuery({
    queryKey: genreKeys.shows(genreName),
    queryFn: () => genreService.getShowsByGenreName(genreName),
    enabled: !!genreName,
  });
}

/**
 * Hook para buscar filmes e séries por gênero
 */
export function useMediaByGenre(genreName: string) {
  return useQuery({
    queryKey: genreKeys.media(genreName),
    queryFn: () => genreService.getMediaByGenreName(genreName),
    enabled: !!genreName,
  });
}
