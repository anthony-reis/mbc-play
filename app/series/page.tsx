"use client";

import Link from "next/link";
import { Search, Tv } from "lucide-react";
import { MediaSection } from "@/components/shared/media";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { MediaSectionSkeleton } from "@/components/shared/media/media-section-skeleton";
import {
  useTrendingShows,
  usePopularShows,
  useTopRatedShows,
  useAiringTodayShows,
} from "@/hooks/use-shows";
import { useSearch } from "@/hooks/use-search";
import { useSearchStore } from "@/lib/stores/search-store";
import { showsToMedia } from "@/lib/tmdb/utils/media-adapter";
import { EmptyState } from "@/components/layout/empty-state";

export default function SeriesPage() {
  const query = useSearchStore((state) => state.query);

  const { data: trending, isLoading: loadingTrending } = useTrendingShows();
  const { data: popular, isLoading: loadingPopular } = usePopularShows();
  const { data: topRated, isLoading: loadingTopRated } = useTopRatedShows();
  const { data: airingToday, isLoading: loadingAiring } = useAiringTodayShows();

  const {
    shows: searchShows,
    isLoading: searchLoading,
    isSearching,
  } = useSearch(query);

  if (searchLoading && isSearching) {
    return (
      <div className="min-h-screen bg-dark text-white pb-20">
        <div className="px-6 md:px-10 pt-6 space-y-8">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-zinc-500 animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold">
              Buscando séries por "{query}"...
            </h1>
          </div>

          <MediaSectionSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="min-h-screen bg-dark text-white pb-20">
        <div className="px-6 md:px-10 pt-6 space-y-12">
          <h1 className="text-2xl md:text-3xl font-bold">
            Séries - Resultados para "{query}"
          </h1>

          {searchShows.length > 0 ? (
            <MediaSection items={showsToMedia(searchShows)} />
          ) : (
            <EmptyState query={query} type="show" />
          )}
        </div>
      </div>
    );
  }

  if (loadingTrending) {
    return <PageSkeleton sections={4} />;
  }

  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      <div className="pl-6 md:pl-10 pt-6 space-y-12">
        {trending && (
          <MediaSection title="Em alta" items={showsToMedia(trending)} />
        )}

        {loadingPopular ? (
          <MediaSectionSkeleton />
        ) : (
          popular && (
            <MediaSection title="Populares" items={showsToMedia(popular)} />
          )
        )}

        {loadingAiring ? (
          <MediaSectionSkeleton />
        ) : (
          airingToday && (
            <MediaSection
              title="No ar hoje"
              items={showsToMedia(airingToday)}
            />
          )
        )}

        {loadingTopRated ? (
          <MediaSectionSkeleton />
        ) : (
          topRated && (
            <MediaSection
              title="Aclamadas pela crítica"
              items={showsToMedia(topRated)}
            />
          )
        )}
      </div>
    </div>
  );
}
