"use client";

import { useQuery } from "@tanstack/react-query";
import { showService } from "../services/show-service";
import { showKeys } from "../queries/keys";

export function useTrendingShows() {
  return useQuery({
    queryKey: showKeys.trending(),
    queryFn: showService.getTrending,
  });
}

export function usePopularShows() {
  return useQuery({
    queryKey: showKeys.popular(),
    queryFn: showService.getPopular,
  });
}

export function useTopRatedShows() {
  return useQuery({
    queryKey: showKeys.topRated(),
    queryFn: showService.getTopRated,
  });
}

export function useAiringTodayShows() {
  return useQuery({
    queryKey: showKeys.airingToday(),
    queryFn: showService.getAiringToday,
  });
}

export function useDramaShows() {
  return useQuery({
    queryKey: showKeys.drama(),
    queryFn: showService.getDrama,
  });
}

export function useShowsByGenre(genreId: number) {
  return useQuery({
    queryKey: showKeys.byGenre(genreId),
    queryFn: () => showService.getByGenre(genreId),
    enabled: !!genreId,
  });
}
