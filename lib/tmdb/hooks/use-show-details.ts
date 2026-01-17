"use client";

import { useQuery } from "@tanstack/react-query";
import { showKeys } from "../queries/keys";
import { TMDBResponse } from "@/types/tmdb/tmdb";
import { tmdbFetch } from "../client";
import {
  TMDBShowDetails,
  TMDBShowCredits,
  TMDBVideo,
} from "@/types/tmdb/show-details";

const showDetailsService = {
  getDetails: (showId: string): Promise<TMDBShowDetails> =>
    tmdbFetch(`/tv/${showId}`),

  getCredits: (showId: string): Promise<TMDBShowCredits> =>
    tmdbFetch(`/tv/${showId}/credits`),

  getVideos: (showId: string): Promise<TMDBResponse<TMDBVideo>> =>
    tmdbFetch(`/tv/${showId}/videos`),
};

export function useShowDetails(showId: string) {
  return useQuery({
    queryKey: showKeys.details(showId),
    queryFn: () => showDetailsService.getDetails(showId),
    enabled: !!showId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}

export function useShowCredits(showId: string) {
  return useQuery({
    queryKey: showKeys.credits(showId),
    queryFn: () => showDetailsService.getCredits(showId),
    enabled: !!showId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}

export function useShowVideos(showId: string) {
  return useQuery({
    queryKey: showKeys.videos(showId),
    queryFn: () => showDetailsService.getVideos(showId),
    enabled: !!showId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}
