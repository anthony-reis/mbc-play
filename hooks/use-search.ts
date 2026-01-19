"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/search-service";
import { searchKeys } from "@/lib/tmdb/queries/keys";

export function useSearch(searchQuery: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useQuery({
    queryKey: searchKeys.query(debouncedQuery),
    queryFn: () => searchService.searchAll(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    movies: data?.movies || [],
    shows: data?.shows || [],
    isLoading,
    isSearching: debouncedQuery.length >= 2,
  };
}
