"use client";

import { PageSkeleton } from "@/components/layout/page-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import {
  useTrendingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
} from "@/hooks/use-movies";
import { useTrendingShows, usePopularShows } from "@/hooks/use-shows";
import { useSearch } from "@/hooks/use-search";
import { useSearchStore } from "@/lib/stores/search-store";
import {
  SearchLoadingState,
  SearchResults,
  ExploreContent,
} from "./_components";

export default function ExplorePage() {
  const query = useSearchStore((state) => state.query);

  const {
    data: trendingMovies,
    isLoading: loadingTrending,
    error: trendingError,
    refetch: refetchTrending,
  } = useTrendingMovies();

  const { data: upcomingMovies, isLoading: loadingUpcoming } =
    useUpcomingMovies();
  const { data: topRatedMovies, isLoading: loadingTopRated } =
    useTopRatedMovies();
  const { data: trendingShows, isLoading: loadingTrendingShows } =
    useTrendingShows();
  const { data: popularShows, isLoading: loadingPopular } = usePopularShows();

  const {
    movies: searchMovies,
    shows: searchShows,
    isLoading: searchLoading,
    isSearching,
  } = useSearch(query);

  if (searchLoading && isSearching) {
    return <SearchLoadingState query={query} />;
  }

  if (isSearching) {
    return (
      <SearchResults query={query} movies={searchMovies} shows={searchShows} />
    );
  }

  if (loadingTrending) {
    return <PageSkeleton withHero sections={5} />;
  }

  if (trendingError) {
    return (
      <ErrorState
        title="Não conseguimos carregar os filmes"
        message="Tivemos um problema ao buscar o conteúdo. Por favor, verifique sua conexão e tente novamente."
        onRetry={() => refetchTrending()}
        showHomeButton
      />
    );
  }

  if (!trendingMovies) {
    return (
      <ErrorState
        message="Nenhum conteúdo disponível no momento."
        onRetry={() => refetchTrending()}
      />
    );
  }

  return (
    <ExploreContent
      trendingMovies={trendingMovies}
      trendingShows={trendingShows}
      upcomingMovies={upcomingMovies}
      popularShows={popularShows}
      topRatedMovies={topRatedMovies}
      loadingTrendingShows={loadingTrendingShows}
      loadingUpcoming={loadingUpcoming}
      loadingPopular={loadingPopular}
      loadingTopRated={loadingTopRated}
    />
  );
}
