"use client";

import { use } from "react";
import { MediaSection } from "@/components/layout/media";
import { useMediaByGenre } from "@/lib/tmdb/hooks/use-genres";
import { useSearch } from "@/lib/tmdb/hooks/use-search";
import { useSearchStore } from "@/lib/stores/search-store";
import { moviesToMedia, showsToMedia } from "@/lib/tmdb/utils/media-adapter";
import { isValidGenre } from "@/lib/tmdb/constants/genres";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

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

  const { data, isLoading: loadingGenre } = useMediaByGenre(normalizedGenre);

  const {
    movies: searchMovies,
    shows: searchShows,
    isLoading: searchLoading,
    isSearching,
  } = useSearch(query);

  if (searchLoading && isSearching) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-xl">Buscando...</span>
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
            {normalizedGenre} - Resultados para "{query}"
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

  if (loadingGenre) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="text-white text-xl">
          Carregando {normalizedGenre}...
        </div>
      </div>
    );
  }

  const movies = data?.movies || [];
  const shows = data?.shows || [];

  return (
    <div className="min-h-screen bg-[#191919] text-white pb-20">
      <div className="px-6 md:px-10 pt-6 space-y-12">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8">
          {normalizedGenre}
        </h1>

        {movies.length > 0 && (
          <MediaSection title="Filmes" items={moviesToMedia(movies)} />
        )}

        {shows.length > 0 && (
          <MediaSection title="Séries" items={showsToMedia(shows)} />
        )}

        {movies.length === 0 && shows.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            Nenhum conteúdo encontrado para {normalizedGenre}
          </div>
        )}
      </div>
    </div>
  );
}
