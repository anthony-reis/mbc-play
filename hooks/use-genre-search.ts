"use client";

import { useMemo } from "react";
import { useSearch } from "./use-search";
import { getMovieGenreId, getTvGenreId } from "@/lib/tmdb/constants/genres";


export function useGenreSearch(searchQuery: string, genreName: string) {
  const { movies, shows, isLoading, isSearching } = useSearch(searchQuery);

  const genreIds = useMemo(() => {
    const movieId = getMovieGenreId(genreName);
    const tvId = getTvGenreId(genreName);

    return {
      movieId: movieId || null,
      tvId: tvId || null,
    };
  }, [genreName]);

  const filteredMovies = useMemo(() => {
    if (!genreIds.movieId) return movies;

    return movies.filter((movie) =>
      movie.genre_ids.includes(genreIds.movieId!),
    );
  }, [movies, genreIds.movieId]);

  const filteredShows = useMemo(() => {
    if (!genreIds.tvId) return shows;

    return shows.filter((show) => show.genre_ids.includes(genreIds.tvId!));
  }, [shows, genreIds.tvId]);

  return {
    movies: filteredMovies,
    shows: filteredShows,
    isLoading,
    isSearching,
    totalResults: filteredMovies.length + filteredShows.length,
  };
}
