"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { MediaSection } from "@/components/shared/media";
import { PageSkeleton } from "@/components/layout/page-skeleton";
import { MediaSectionSkeleton } from "@/components/shared/media/media-section-skeleton";
import { useMediaByGenre } from "@/hooks/use-genres";
import { useGenreSearch } from "@/hooks/use-genre-search";
import { useSearchStore } from "@/lib/stores/search-store";
import { moviesToMedia, showsToMedia } from "@/lib/tmdb/utils/media-adapter";
import { isValidGenre, getGenreDisplayName } from "@/lib/tmdb/constants/genres";

interface GenrePageProps {
  params: Promise<{ genre: string }>;
}

export default function GenrePage({ params }: GenrePageProps) {
  const { genre } = use(params);
  const query = useSearchStore((state) => state.query);

  const decodedGenre = decodeURIComponent(genre);
  const normalizedGenre =
    decodedGenre.charAt(0).toUpperCase() + decodedGenre.slice(1).toLowerCase();

  if (!isValidGenre(normalizedGenre)) {
    notFound();
  }

  const genreDisplayName = getGenreDisplayName(normalizedGenre);

  const { data, isLoading: loadingGenre } = useMediaByGenre(normalizedGenre);

  const {
    movies: searchMovies,
    shows: searchShows,
    isLoading: searchLoading,
    isSearching,
    totalResults,
  } = useGenreSearch(query, normalizedGenre);

  if (searchLoading && isSearching) {
    return (
      <div className="min-h-screen bg-dark text-white pb-20">
        <div className="pl-6 md:pl-10 pt-6 space-y-8">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-zinc-500 animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold">
              Buscando em {genreDisplayName}...
            </h1>
          </div>
          <MediaSectionSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (isSearching) {
    const hasResults = searchMovies.length > 0 || searchShows.length > 0;

    return (
      <div className="min-h-screen bg-dark text-white pb-20">
        <div className="pl-6 md:pl-10 pt-6 space-y-12">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Resultados para "{query}"
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-zinc-400">Filtrado por:</span>
              <span className="px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-full text-sm text-red-400 font-semibold">
                {genreDisplayName}
              </span>
              {hasResults && (
                <span className="text-sm text-zinc-500">
                  ({totalResults}{" "}
                  {totalResults === 1 ? "resultado" : "resultados"})
                </span>
              )}
            </div>
          </div>

          {!hasResults ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="relative mb-6">
                <Search className="w-20 h-20 text-zinc-700" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Nenhum resultado de {genreDisplayName}
              </h2>

              <p className="text-zinc-400 text-lg mb-2 max-w-md">
                Não encontramos filmes ou séries de {genreDisplayName} com "
                {query}"
              </p>

              <div className="mt-6 bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 max-w-md">
                <p className="text-zinc-400 text-sm">
                  💡 Tente buscar sem filtro na{" "}
                  <a href="/" className="text-red-400 hover:underline">
                    página inicial
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <>
              {searchMovies.length > 0 && (
                <MediaSection
                  title={`Filmes de ${genreDisplayName} (${searchMovies.length})`}
                  items={moviesToMedia(searchMovies)}
                />
              )}

              {searchShows.length > 0 && (
                <MediaSection
                  title={`Séries de ${genreDisplayName} (${searchShows.length})`}
                  items={showsToMedia(searchShows)}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  if (loadingGenre) {
    return <PageSkeleton sections={2} />;
  }

  const movies = data?.movies || [];
  const shows = data?.shows || [];

  return (
    <div className="min-h-screen bg-dark text-white pb-20">
      <div className="pl-6 md:pl-10 pt-6 space-y-12">
        {movies.length > 0 && (
          <MediaSection title="Filmes" items={moviesToMedia(movies)} />
        )}

        {shows.length > 0 && (
          <MediaSection title="Séries" items={showsToMedia(shows)} />
        )}

        {movies.length === 0 && shows.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            Nenhum conteúdo encontrado para {genreDisplayName}
          </div>
        )}
      </div>
    </div>
  );
}
