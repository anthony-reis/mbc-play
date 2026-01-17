"use client";

import { HeroCarousel } from "./_components/hero-carousel";
import { MediaSection } from "@/components/layout/media";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { MediaSectionSkeleton } from "@/components/layout/media/media-section-skeleton";
import {
  useTrendingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
} from "@/lib/tmdb/hooks/use-movies";
import { useTrendingShows, usePopularShows } from "@/lib/tmdb/hooks/use-shows";
import { useSearch } from "@/lib/tmdb/hooks/use-search";
import { useSearchStore } from "@/lib/stores/search-store";
import { moviesToMedia, showsToMedia } from "@/lib/tmdb/utils/media-adapter";
import { Loader2 } from "lucide-react";

export default function ExplorePage() {
  const query = useSearchStore((state) => state.query);

  const { data: trendingMovies, isLoading: loadingTrending } =
    useTrendingMovies();
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

  // Loading da busca
  if (searchLoading && isSearching) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xl">Buscando "{query}"...</span>
        </div>
      </div>
    );
  }

  if (isSearching) {
    const hasResults = searchMovies.length > 0 || searchShows.length > 0;

    return (
      <div className="min-h-screen bg-[#191919] text-white pb-20">
        <div className="px-6 md:px-10 pt-6 space-y-12">
          <h1 className="text-2xl md:text-3xl font-bold">
            Resultados para "{query}"
          </h1>

          {!hasResults ? (
            <div className="text-center py-20 text-zinc-500">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : (
            <>
              {searchMovies.length > 0 && (
                <MediaSection
                  title={`Filmes (${searchMovies.length})`}
                  items={moviesToMedia(searchMovies)}
                />
              )}

              {searchShows.length > 0 && (
                <MediaSection
                  title={`Séries (${searchShows.length})`}
                  items={showsToMedia(searchShows)}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  if (loadingTrending) {
    return <PageSkeleton withHero sections={5} />;
  }

  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      {trendingMovies && (
        <div className="mb-12">
          <HeroCarousel movies={trendingMovies} />
        </div>
      )}

      <div className="px-6 md:px-10 space-y-12">
        {trendingMovies && (
          <MediaSection title="Em alta" items={moviesToMedia(trendingMovies)} />
        )}

        {loadingTrendingShows ? (
          <MediaSectionSkeleton />
        ) : (
          trendingShows && (
            <MediaSection
              title="Séries em alta"
              items={showsToMedia(trendingShows)}
            />
          )
        )}

        {loadingUpcoming ? (
          <MediaSectionSkeleton />
        ) : (
          upcomingMovies && (
            <MediaSection
              title="Em breve"
              items={moviesToMedia(upcomingMovies)}
            />
          )
        )}

        {loadingPopular ? (
          <MediaSectionSkeleton />
        ) : (
          popularShows && (
            <MediaSection
              title="Populares"
              items={showsToMedia(popularShows)}
            />
          )
        )}

        {loadingTopRated ? (
          <MediaSectionSkeleton />
        ) : (
          topRatedMovies && (
            <MediaSection
              title="Aclamados"
              items={moviesToMedia(topRatedMovies)}
            />
          )
        )}
      </div>
    </div>
  );
}
