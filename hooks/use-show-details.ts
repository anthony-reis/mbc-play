"use client";

import { useQuery } from "@tanstack/react-query";
import { TMDBResponse } from "@/types/tmdb/tmdb";

import {
  TMDBShowDetails,
  TMDBShowCredits,
  TMDBVideo,
} from "@/types/tmdb/show-details";
import { tmdbFetch } from "@/lib/tmdb/client";
import { showKeys } from "@/lib/tmdb/queries/keys";

const showDetailsService = {
  getDetails: (showId: string): Promise<TMDBShowDetails> =>
    tmdbFetch(`/tv/${showId}?language=pt-BR`),

  getCredits: (showId: string): Promise<TMDBShowCredits> =>
    tmdbFetch(`/tv/${showId}/credits?language=pt-BR`),

  getVideos: (showId: string): Promise<TMDBResponse<TMDBVideo>> =>
    tmdbFetch<TMDBResponse<TMDBVideo>>(
      `/tv/${showId}/videos?language=pt-BR`,
    ).then((response) => {
      if (response.results && response.results.length > 0) {
        return response;
      }
      return tmdbFetch<TMDBResponse<TMDBVideo>>(
        `/tv/${showId}/videos?language=en-US`,
      );
    }),
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
