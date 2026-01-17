"use client";

import { MediaSection } from "@/components/layout/media";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { MediaSectionSkeleton } from "@/components/layout/media/media-section-skeleton";
import {
  useTrendingShows,
  usePopularShows,
  useTopRatedShows,
  useAiringTodayShows,
} from "@/lib/tmdb/hooks/use-shows";
import { useSearch } from "@/lib/tmdb/hooks/use-search";
import { useSearchStore } from "@/lib/stores/search-store";
import { showsToMedia } from "@/lib/tmdb/utils/media-adapter";
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xl">Buscando séries...</span>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="min-h-screen bg-[#191919] text-white pb-20">
        <div className="px-6 md:px-10 pt-6 space-y-12">
          <h1 className="text-2xl md:text-3xl font-bold">
            Séries - Resultados para "{query}"
          </h1>

          {searchShows.length > 0 ? (
            <MediaSection
              title={`${searchShows.length} séries encontradas`}
              items={showsToMedia(searchShows)}
            />
          ) : (
            <div className="text-center py-20 text-zinc-500">
              Nenhuma série encontrada para "{query}"
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loadingTrending) {
    return <PageSkeleton sections={4} />;
  }

  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      <div className="px-6 md:px-10 pt-6 space-y-12">

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
