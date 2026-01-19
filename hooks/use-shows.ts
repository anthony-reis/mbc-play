"use client";

import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/show-service";
import { showKeys } from "@/lib/tmdb/queries/keys";

export function useTrendingShows() {
  return useQuery({
    queryKey: showKeys.trending(),
    queryFn: showService.getTrending,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function usePopularShows() {
  return useQuery({
    queryKey: showKeys.popular(),
    queryFn: showService.getPopular,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useTopRatedShows() {
  return useQuery({
    queryKey: showKeys.topRated(),
    queryFn: showService.getTopRated,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useAiringTodayShows() {
  return useQuery({
    queryKey: showKeys.airingToday(),
    queryFn: showService.getAiringToday,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
}

export function useDramaShows() {
  return useQuery({
    queryKey: showKeys.drama(),
    queryFn: showService.getDrama,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}

export function useShowsByGenre(genreId: number) {
  return useQuery({
    queryKey: showKeys.byGenre(genreId),
    queryFn: () => showService.getByGenre(genreId),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
