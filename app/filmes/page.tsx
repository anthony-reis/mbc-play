"use client";

import Link from "next/link";
import { Search, Film } from "lucide-react";
import { MediaSection } from "@/components/shared/media";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { MediaSectionSkeleton } from "@/components/shared/media/media-section-skeleton";
import {
  useTrendingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
} from "@/lib/tmdb/hooks/use-movies";
import { useSearch } from "@/lib/tmdb/hooks/use-search";
import { useSearchStore } from "@/lib/stores/search-store";
import { moviesToMedia } from "@/lib/tmdb/utils/media-adapter";
import { EmptyState } from "@/components/layout/empty-state";

export default function FilmesPage() {
  const query = useSearchStore((state) => state.query);

  const { data: trending, isLoading: loadingTrending } = useTrendingMovies();
  const { data: upcoming, isLoading: loadingUpcoming } = useUpcomingMovies();
  const { data: topRated, isLoading: loadingTopRated } = useTopRatedMovies();

  const {
    movies: searchMovies,
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
              Buscando filmes por "{query}"...
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
            Filmes - Resultados para "{query}"
          </h1>

          {searchMovies.length > 0 ? (
            <MediaSection items={moviesToMedia(searchMovies)} />
          ) : (
            <EmptyState query={query} type="movie" />
          )}
        </div>
      </div>
    );
  }

  if (loadingTrending) {
    return <PageSkeleton sections={3} />;
  }

  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      <div className="px-6 md:px-10 pt-6 space-y-12">
        {trending && (
          <MediaSection title="Em alta" items={moviesToMedia(trending)} />
        )}

        {loadingUpcoming ? (
          <MediaSectionSkeleton />
        ) : (
          upcoming && (
            <MediaSection title="Lançamentos" items={moviesToMedia(upcoming)} />
          )
        )}

        {loadingTopRated ? (
          <MediaSectionSkeleton />
        ) : (
          topRated && (
            <MediaSection
              title="Aclamados pela crítica"
              items={moviesToMedia(topRated)}
            />
          )
        )}
      </div>
    </div>
  );
}
