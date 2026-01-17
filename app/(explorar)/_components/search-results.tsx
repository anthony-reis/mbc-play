import { EmptyState } from "@/components/layout/empty-state";
import { MediaSection } from "@/components/shared/media";
import { moviesToMedia, showsToMedia } from "@/lib/tmdb/utils/media-adapter";
import { TMDBMovie, TMDBShow } from "@/types/tmdb/tmdb";

interface SearchResultsProps {
  query: string;
  movies: TMDBMovie[];
  shows: TMDBShow[];
}

export function SearchResults({ query, movies, shows }: SearchResultsProps) {
  const hasResults = movies.length > 0 || shows.length > 0;

  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      <div className="px-6 md:px-10 pt-6 space-y-12">
        <h1 className="text-2xl md:text-3xl font-bold">
          Resultados para "{query}"
        </h1>

        {!hasResults ? (
          <EmptyState type="dual" query={query} />
        ) : (
          <>
            {movies.length > 0 && (
              <MediaSection title={`Filmes`} items={moviesToMedia(movies)} />
            )}

            {shows.length > 0 && (
              <MediaSection title={`Séries`} items={showsToMedia(shows)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
