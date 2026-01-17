"use client";

import { useQuery } from "@tanstack/react-query";
import { movieKeys } from "../queries/keys";
import { movieService } from "../services/movie-service";

export function useTrendingMovies() {
  return useQuery({
    queryKey: movieKeys.trending(),
    queryFn: movieService.getTrending,
  });
}

export function useUpcomingMovies() {
  return useQuery({
    queryKey: movieKeys.upcoming(),
    queryFn: movieService.getUpcoming,
  });
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: movieKeys.topRated(),
    queryFn: movieService.getTopRated,
  });
}

export function useActionMovies() {
  return useQuery({
    queryKey: movieKeys.action(),
    queryFn: movieService.getAction,
  });
}

export function useMoviesByGenre(genreId: number) {
  return useQuery({
    queryKey: movieKeys.byGenre(genreId),
    queryFn: () => movieService.getByGenre(genreId),
    enabled: !!genreId,
  });
}
