"use client";

import { MediaSection } from "@/components/layout/media";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { MediaSectionSkeleton } from "@/components/layout/media/media-section-skeleton";
import {
  useTrendingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
} from "@/lib/tmdb/hooks/use-movies";
import { useSearch } from "@/lib/tmdb/hooks/use-search";
import { useSearchStore } from "@/lib/stores/search-store";
import { moviesToMedia } from "@/lib/tmdb/utils/media-adapter";
import { Loader2 } from "lucide-react";

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
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xl">Buscando filmes...</span>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="min-h-screen bg-[#191919] text-white pb-20">
        <div className="px-6 md:px-10 pt-6 space-y-12">
          <h1 className="text-2xl md:text-3xl font-bold">
            Filmes - Resultados para "{query}"
          </h1>

          {searchMovies.length > 0 ? (
            <MediaSection
              title={`${searchMovies.length} filmes encontrados`}
              items={moviesToMedia(searchMovies)}
            />
          ) : (
            <div className="text-center py-20 text-zinc-500">
              Nenhum filme encontrado para "{query}"
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loadingTrending) {
    return <PageSkeleton sections={3} />;
  }

  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
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
