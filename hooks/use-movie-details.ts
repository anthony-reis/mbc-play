"use client";

import { useQuery } from "@tanstack/react-query";
import { movieDetailsService } from "../services/movie-details-service";

export function useMovieDetails(movieId: string) {
  return useQuery({
    queryKey: ["movie", "details", movieId],
    queryFn: () => movieDetailsService.getDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}

export function useMovieCredits(movieId: string) {
  return useQuery({
    queryKey: ["movie", "credits", movieId],
    queryFn: () => movieDetailsService.getCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}

export function useMovieVideos(movieId: string) {
  return useQuery({
    queryKey: ["movie", "videos", movieId],
    queryFn: () => movieDetailsService.getVideos(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}
