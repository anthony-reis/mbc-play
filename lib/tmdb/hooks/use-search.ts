"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/search-service";

export function useSearch(searchQuery: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchService.searchAll(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  return {
    movies: data?.movies || [],
    shows: data?.shows || [],
    isLoading,
    isSearching: debouncedQuery.length >= 2,
  };
}
