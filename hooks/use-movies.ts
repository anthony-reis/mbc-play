"use client";

import { useQuery } from "@tanstack/react-query";
import { movieKeys } from "../lib/tmdb/queries/keys";
import { movieService } from "../services/movie-service";

export function useTrendingMovies() {
  return useQuery({
    queryKey: movieKeys.trending(),
    queryFn: movieService.getTrending,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useUpcomingMovies() {
  return useQuery({
    queryKey: movieKeys.upcoming(),
    queryFn: movieService.getUpcoming,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: movieKeys.topRated(),
    queryFn: movieService.getTopRated,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useActionMovies() {
  return useQuery({
    queryKey: movieKeys.action(),
    queryFn: movieService.getAction,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useMoviesByGenre(genreId: number) {
  return useQuery({
    queryKey: movieKeys.byGenre(genreId),
    queryFn: () => movieService.getByGenre(genreId),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
